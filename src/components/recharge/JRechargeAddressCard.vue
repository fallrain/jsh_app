<template>
  <view class="jRechargeAddressCard-wrap">
    <view
      :key="index"
      class="jRechargeAddressCard-item"
      v-for="(item,index) in data"
    >
      <block v-if="index<data.length-1">
        <view class="jRechargeAddressCard-icon-wrap-l">
          <view class="jRechargeAddressCard-icon-left"></view>
        </view>
        <view class="jRechargeAddressCard-icon-wrap-r">
          <view class="jRechargeAddressCard-icon-right"></view>
        </view>
      </block>
      <view class="jRechargeAddressCard-item-name-item">
        <view class="name">{{item.title}}</view>
        <view class="right iconfont iconyou"></view>
      </view>
      <view class="jRechargeAddressCard-item-value-item">{{item.value}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JRechargeAddressCard',
  props: {
    // item数据
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
  .jRechargeAddressCard-wrap {
    border-radius: 20px;
    min-height: 378px;
    background: #fff;
  }

  .jRechargeAddressCard-item {
    position: relative;
    padding: 40px 24px 38px 24px;
    border-bottom: 1px dashed #C3C3C3;

    &:last-child {
      border-bottom: 0;
    }
  }

  .jRechargeAddressCard-item-name-item {
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

  .jRechargeAddressCard-item-value-item {
    margin-top: 20px;
    font-size: 32px;
    color: #999;
    line-height: 44px;
  }

  @mixin jRechargeAddressCard-icon-wrap {
    position: absolute;
    top: 100%;
    width: 18px;
    height: 36px;
    overflow: hidden;
  }

  .jRechargeAddressCard-icon-wrap-l{
    @include jRechargeAddressCard-icon-wrap;
    left: 0;
    transform: translateY(-50%);
  }

  .jRechargeAddressCard-icon-wrap-r{
    @include jRechargeAddressCard-icon-wrap;
    right: 0;
    transform: translateY(-50%);
  }

  @mixin jRechargeAddressCard-icon {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #f5f5f5;
  }

  .jRechargeAddressCard-icon-left {
    @include jRechargeAddressCard-icon;
    transform: translateX(-50%);
  }

  .jRechargeAddressCard-icon-right {
    @include jRechargeAddressCard-icon;
  }
</style>
