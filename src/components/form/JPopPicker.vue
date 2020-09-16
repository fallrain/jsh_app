<template>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view class="jPopPicker-pop">
      <view class="jPopPicker-pop-head">
        <view class="jPopPicker-pop-head-title">{{title}}</view>
        <view
          v-if="isShowSure"
          class="jPopPicker-pop-head-icon"
          @tap="confirm"
        >确定</view>
        <view
          v-if="isShowClose"
          class="jPopPicker-pop-head-icon iconfont iconcross j-common-icon-close-wrap"
          @tap="close"
        ></view>
      </view>
      <view
        class="jPopPicker-pop-search-wrap"
        v-if="isShowSearch"
      >
        <j-search-input
          @change="search"
          @search="search"
          placeholder="请输入搜索信息"
          v-model="searchValue"
        ></j-search-input>
      </view>
      <slot name="head"></slot>
      <scroll-view
        :scroll-y="true"
        class="jPopPicker-pop-item-wrap"
      >
        <template v-for="(item) in options">
          <view
            :class="[
            'jPopPicker-pop-item',
            choseKeys.find(v=>v===item[keyName]) && 'active'
          ]"
            :key="item[keyName]"
            @tap="check(item)"
            v-if="!item.isHide"
          >
            <view
              :class="[
            'jPopPicker-pop-item-icon iconfont icontick',
          ]"
            ></view>
            <view class="jPopPicker-pop-item-cnt">
              <text v-if="isShowValue">{{item.value}}</text>
              <slot v-bind:data="item"></slot>
            </view>
          </view>
        </template>
        <view
          class="jPopPicker-pop-item-empty"
          v-if="isEmpty"
        >没有匹配的相关数据~</view>
      </scroll-view>
    </view>
  </uni-popup>
</template>

<script>
import './css/jPopPicker.scss';
import JSearchInput from './JSearchInput';

export default {
  name: 'JPopPicker',
  components: {
    JSearchInput
  },
  props: {
    // 类型：radio/checkbox
    type: {
      type: String,
      default: 'radio'
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 可否被点击
    isCanBeCheck: {
      type: Boolean,
      default: true
    },
    // picker 标题
    title: {
      type: [
        String,
        Number
      ],
      default: ''
    },
    keyName: {
      type: String,
      default: 'key'
    },
    // picker选项
    // 例:[{key:1,value:'馒头'}，{key:2,value:'米饭'}]
    options: {
      type: Array,
      default: () => []
    },
    // 选中的key
    choseKeys: {
      type: Array,
      default: () => []
    },
    // 是否显示value
    isShowValue: {
      type: Boolean,
      default: true
    },
    // 不能点击时候的回调
    cantCheckedCallback: {
      type: Function
    },
    // 是否显示搜索框
    isShowSearch: {
      type: Boolean,
      default: false
    },
    // 搜索的key
    searchKeys: {
      type: Array,
      default: () => ['value']
    },
    // 是否显示确定
    isShowSure: {
      type: Boolean,
      default: false
    },
    // 是否显示 x
    isShowClose: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      // 选中的选项
      choseOptions: [],
      // 搜索的值
      searchValue: ''
    };
  },
  created() {
    console.log(this.options);
  },
  computed: {
    isEmpty() {
      /* 是否是空的 */
      return !(this.options && this.options.length && this.options.filter(v => !v.isHide).length);
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.pop.open();
      } else {
        this.$refs.pop.close();
      }
    },
    choseOptions(val) {
    }
  },
  methods: {
    close() {
      /* 关闭 */
      this.$emit('update:show', false);
    },
    confirm() {
      /* 确定按钮 */
      this.$emit('confirm');
      this.$emit('update:show', false);
    },
    change({ show }) {
      this.$emit('update:show', show);
    },
    check(item) {
      /* 选中 */
      // 不能被选中的时候直接返回
      console.log(item);
      if (item.isCanChecked === false) {
        if (this.cantCheckedCallback) {
          this.cantCheckedCallback(item);
        }
        return;
      }
      const {
        [this.keyName]: key
      } = item;

      let choseKeysAy;
      if (this.type === 'radio') {
        choseKeysAy = [key];
      } else {
        const index = this.choseKeys.findIndex(v => v === key);
        if (index > -1) {
          this.choseKeys.splice(index, 1);
        } else {
          this.choseKeys.push(key);
        }
        choseKeysAy = [...this.choseKeys];
      }
      // choseOptions只有在check之后才组合数据，减少watch
      if (choseKeysAy.length) {
        this.choseOptions = this.options.filter(option => choseKeysAy.find(v => v === option[this.keyName]));
      } else {
        this.choseOptions = [];
      }

      this.$emit('update:choseKeys', choseKeysAy);
      this.$emit('change', choseKeysAy, this.choseOptions);
    },
    handleClick(version, list) {
      /* 选择版本 */
      const curChecked = version.checked;
      list.forEach((v) => {
        v.checked = false;
      });
      version.checked = !curChecked;
      this.$emit('change', this.data);
    },
    search() {
      /* 搜索 */
      this.$u.throttle(() => {
        const searchKeys = this.searchKeys;
        const searchValue = this.searchValue.trim();
        if (searchValue === '') {
          this.options.forEach((v) => {
            this.$set(v, 'isHide', false);
          });
        } else {
          this.options.forEach((v) => {
            const isContain = !!searchKeys.find(key => v[key].includes(searchValue));
            this.$set(v, 'isHide', !isContain);
          });
        }
      }, 250, false);
    }
  }
};
</script>
