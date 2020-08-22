<template>
  <view class="jRechargeAddressCardCell-wrap">
    <view class="jRechargeAddressCardCell-head">
      <view class="name">{{title}}</view>
      <view
        class="right iconfont iconyou"
        v-if="hasArrow"
      ></view>
    </view>
    <view class="jRechargeAddressCardCell-default">
      <slot>
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JRechargeAddressCardCell',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // hasArrow
    hasArrow: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss">
  .jRechargeAddressCardCell-wrap {
    width: 100%;
    background: #fff;
    border-radius: 20px;
    padding: 24px;
  }

  .jRechargeAddressCardCell-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      font-size: 32px;
      color: #333;
      line-height: 32px;
    }

    .right {
      font-weight: 600;
      font-size: 34px;
      color: #ccc;
    }
  }

  .jRechargeAddressCardCell-default {
    margin-top: 20px;
  }
</style>
