<template>
  <view class="j-radio" @tap="toggle">
    <template v-if="type===1">
      <template v-if="checked">
        <view class="iconfont iconradio active"></view>
      </template>
      <template v-else>
        <view class="iconfont iconradio1"></view>
      </template>
    </template>
    <template v-else>
      <template v-if="checked">
        <view class="iconfont iconbaseline-check_box-px active"></view>
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
  props: {
    type: {
      type: Number,
      default: 1
    }, // 单选框类型
    color: String, // 颜色
    inf: String, // 文字
    // 选中状态
    checked: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
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
      const checked = !this.checked;
      this.$emit('update:checked', checked);
      this.$emit('change', checked, this.index);
    }
  }
};
</script>
<style lang="scss">
  .j-radio {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #969796;
    margin-top: 5px;

    .iconfont {
      font-size: 36px;
      color: #CFCFCF;

      &:before {
      }

      &:after {
        background: #fff;
        border-radius: 100%;
      }

      &.active {
        color: $theme-color;
      }
    }
  }

  .j-radio-inf {
    margin-left: 5px;
    color: #474E66;
  }
</style>
