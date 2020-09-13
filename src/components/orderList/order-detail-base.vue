<template>
  <view class="order-base-con">
    <view class="order-base-tou">订单信息</view>
    <view class="order-base-line"></view>
    <view class="order-base-inf">订单号：{{baseInfo.bstnk}}</view>
    <view class="order-base-inf">物流单号：{{baseInfo.dnLogistics == '-0' ?'':baseInfo.dnLogistics}}</view>
    <view class="order-base-inf">GVS单号：{{baseInfo.jshi_gvs_so_order_no}}</view>
    <view class="order-base-inf">满足方式：{{baseInfo.stockTypeShow}}</view>
    <view class="order-base-inf">版本调货：{{baseInfo.credit_model_all == '0' ? '否' : '是'}}</view>
    <view class="order-base-inf">信用模式：{{baseInfo.credit_model_all==='0' ? '否' : '是'}}</view>
  </view>
</template>

<script>
export default {
  name: 'orderDetailBase',
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
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
