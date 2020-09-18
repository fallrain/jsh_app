<template>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view class="oPopPicker-pop">
      <view class="oPopPicker-pop-head">
        <view class="oPopPicker-pop-head-title">{{title}}</view>
        <view
          v-if="isShowClose"
          class="oPopPicker-pop-head-icon iconfont iconcross j-common-icon-close-wrap"
          @tap="close"
        ></view>
      </view>
      <slot></slot>
      <view @tap="confirm" class="pop-sure">确定</view>
    </view>
  </uni-popup>
</template>

<script>
import './css/OrderPopPicker.scss';

export default {
  name: 'OrderPopPicker',
  components: {
  },
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
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
