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
          class="jPopPicker-pop-head-icon iconfont iconcross"
          @tap="close"
        ></view>
      </view>

      <scroll-view
        :scroll-y="true"
        class="jPopPicker-pop-item-wrap"
      >
        <view
          :class="[
            'jPopPicker-pop-item',
            choseKeys.find(v=>v===item[keyName]) && 'active'
          ]"
          v-for="(item) in options"
          :key="item[keyName]"
          @tap="check(item)"
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
      </scroll-view>
    </view>
  </uni-popup>
</template>

<script>
import './css/jPopPicker.scss';

export default {
  name: 'JPopPicker',
  components: {
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
    }
  },
  data() {
    return {
      // 选中的选项
      choseOptions: [],
    };
  },
  created() {
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
    change({ show }) {
      this.$emit('update:show', show);
    },
    check(item) {
      /* 选中 */
      // 不能被选中的时候直接返回
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
    confirm() {
      /* 确定 */
      this.$emit('update:show', false);
    }
  }
};
</script>
