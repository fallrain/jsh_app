<template>
  <view class="jTopWarning-wrap">
    <view class="iconjinggao iconfont jTopWarning-icon"></view>
    <view
      class="jTopWarning-cnt"
    >{{content}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'JTopWarning',
  props: {
    // 内容
    content: {
      type: String,
      default: ''
    },
  },
};
</script>

<style lang="scss">
  .jTopWarning-wrap {
    display: flex;
    align-items: center;
    padding: 20px 24px 20px 38px;
    background: #FFF0F0;
    border-bottom: 1px solid $theme-color;
  }

  .jTopWarning-icon {
    font-size: 40px;
    color: $theme-color;
    margin-bottom: 8px;
  }

  .jTopWarning-cnt {
    margin-left: 34px;
    font-size: 28px;
    line-height: 38px;
    color: $theme-color;
  }
</style>
