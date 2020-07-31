<template>
  <view class="order-address-con">
    <view class="uni-flex uni-row padding-15 order-address-juzhong">
      <view class="col-10"><view class="order-detail-quan">付</view></view>
      <view class="col order-detail-text">{{addressInfo.jshi_payto_code}} {{addressInfo.jshi_payto_name}}</view>
    </view>
    <view class="order-address-line"></view>
    <view class="uni-flex uni-row padding-15 order-address-juzhong">
      <view class="col-10"><view class="order-detail-quan">送</view></view>
      <view class="order-detail-text">{{addressInfo.jshi_sendto_code}} {{addressInfo.jshi_sendto_name}}</view>
    </view>
    <view class="order-address-line"></view>
    <view class="uni-flex uni-row padding-15 order-address-juzhong">
      <view class="col-10"><view class="order-detail-quan">收</view></view>
      <view class="order-detail-text">{{addressInfo.receivingAddress}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderDetailAddress',
  addressInfo: {
    type: Object,
    default() {
      return {};
    }
  }
};
</script>

<style scoped>
  .order-address-juzhong {
    align-items:center;
    display: -webkit-flex;
  }
  .order-address-con {
    border-radius: 20px;
    background-color: #FFFFFF;
    margin: 24px;
  }
  .order-detail-quan {
    border:1px solid #ED2856;
    border-radius: 50px;
    width:56px;
    height:56px;
    color: #ED2856;
    font-weight:400;
    font-size:28px;
    padding-left: 20%;
    padding-top: 15%;
  }
  .order-detail-text{
    color: #666666;
    font-size: 24px;
  }
  .order-address-line {
    height: 2px;
    background-color: #DBDBDB;
    margin-left: 10px;
    margin-right: 10px;
  }

</style>
