<template>
  <view class="j-radio" @tap="toggle">
    <template v-if="type===1">
      <template v-if="checked===1">
        <view class="iconfont iconradio"></view>
      </template>
      <template v-else>
        <view class="iconfont iconradio1"></view>
      </template>
    </template>
    <template v-else>
      <template v-if="checked===1">
        <view class="iconfont iconbaseline-check_box-px"></view>
      </template>
      <template v-else>
        <view class="iconfont iconcheck-box-outline-bl"></view>
      </template>
    </template>
    <span class="j-radio-inf">{{inf}}<slot></slot></span>
  </view>
</template>
<script>
export default {
  name: 'JRadio',
  // 修改双向绑定的属性和事件
  props: {
    type: {
      type: Number,
      default: 1
    }, // 单选框类型
    color: String, // 颜色
    inf: String, // 文字
    // 选中状态
    checked: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      styleToggle: 0
    };
  },
  methods: {
    toggle() {
      /* 切换选中状态 */
      this.$emit('update:checked', this.checked ^ 1);
    }
  }
};
</script>
<style lang="scss">
  .j-radio {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #969796;
    margin-top: 5rpx;

    .iconfont {
      font-size: 36rpx;
      color: #2283E2;

      &:before {
      }

      &:after {
        background: #fff;
        border-radius: 100%;
      }
    }

    .icon-radiounchecked {
      color: #474E66;

      &.active {
        color: #2283E2;
      }
    }
  }

  .j-radio-inf {
    margin-left: 5rpx;
    color: #474E66;
  }
</style>
