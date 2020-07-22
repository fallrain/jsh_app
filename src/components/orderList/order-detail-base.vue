<template>
  <view class="order-base-con">
    <view class="order-base-tou">订单信息</view>
    <view class="order-base-line"></view>
    <view class="order-base-inf">订单号：8570384729</view>
    <view class="order-base-inf">物流单号：B70U21017</view>
    <view class="order-base-inf">GVS单号：3654534532</view>
    <view class="order-base-inf">满足方式：周承诺</view>
    <view class="order-base-inf">版本调货：否</view>
    <view class="order-base-inf">信用模式：否</view>
  </view>
</template>

<script>
export default {
  name: 'orderDetailBase'
};
</script>

<style scoped>
  .order-base-con {
    border-radius: 20px;
    background-color: #FFFFFF;
    margin: 24px;
  }
  .order-base-tou{
    color: #333333;
    font-size: 30px;
    padding: 24px;
  }
  .order-base-line{
    background-color: #DBDBDB;
    height: 1px;
    margin-left: 20px;
  }
  .order-base-inf {
    color: #666666;
    font-size: 24px;
    padding-left: 30px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

</style>
