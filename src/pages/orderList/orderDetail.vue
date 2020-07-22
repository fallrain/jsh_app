<template>
  <view>
    <view class="background-one">
      <view class="orderDetail-head">
        <view class="">
          <view class="orderDetail-head-one">已发货</view>
          <view class="orderDetail-head-two">发货时间：2020-08-12</view>
          <view class="orderDetail-head-two">预计到货日期：2019-07-20</view>
        </view>
        <view class="orderDetail-head-img">
          <image src="@/assets/img/orderDetail/car.png" style="width: 100%;height: 100%;margin-top: 5px;"></image>
        </view>
      </view>
      <view>
        <order-detail-address></order-detail-address>
      </view>
    </view>
    <view class="order-detail-line"></view>
    <view class="background-two">
      <view>
        <order-detail-info></order-detail-info>
      </view>
      <view>
        <order-detail-base></order-detail-base>
      </view>
      <view>
        <order-detail-flow></order-detail-flow>
      </view>
    </view>
    <view class="order-detail-line"></view>
  </view>
</template>

<script>
import orderDetailAddress from '../../components/orderList/order-detail-address';
import orderDetailInfo from '../../components/orderList/order-detail-info';
import orderDetailBase from '../../components/orderList/order-detail-base';
import orderDetailFlow from '../../components/orderList/order-detail-flow';

export default {
  name: 'orderDetail',
  components: {
    orderDetailAddress,
    orderDetailInfo,
    orderDetailBase,
    orderDetailFlow
  },
  onLoad(option) {
    console.log(option.id); // 打印出上个页面传递的参数。
    console.log(option.name); // 打印出上个页面传递的参数。
  }
};
</script>

<style scoped>
  .background-one{
    margin-top: -4px;
    height: 100%;
    background: linear-gradient(to bottom, #ED2856 60%, #F5F5F5 40%);
  }
  .order-detail-line {
    margin-top: -24px;
    margin-bottom: -30px;
    height: 40px;
    background-color: #F5F5F5;
    z-index: -1;
  }
  .background-two{
    height: 100%;
    background: #F5F5F5;
  }
  .orderDetail-head {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px 20px 20px 80px;
  }
  .orderDetail-head-img {
    margin-left: 60px;
    flex-shrink: 0;
    width: 190px;
    height: 170px;
  }
  .orderDetail-head-one {
    color: #FFFFFF;
    font-size: 34px;
    margin-bottom: 20px;
    font-weight:300;
  }
  .orderDetail-head-two {
    color: #FFFFFF;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight:300;
  }
</style>
