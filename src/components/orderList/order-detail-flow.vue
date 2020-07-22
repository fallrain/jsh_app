<template>
  <view class="order-flow-con">
    <view class="order-flow-tou">订单信息</view>
    <view class="order-flow-line"></view>
    <view class="order-flow-steps">
      <view class="position-r">
        <view v-show="0!==active&&0<active" class="order-detail-judge1"></view><!--已经进行完成的流程-->
        <view v-show="0!==active&&0>active" class="order-detail-judge2"></view><!--还未进行完成的流程-->
        <view v-show="0===active" class="order-detail-judge1"></view><!--当前步骤-->
        <view v-show="0!==active&&0<active" class="order-detail-judge3"></view>
        <view v-show="0!==active&&0>active" class="order-detail-judge4"></view>
        <view v-show="0===active" class="order-detail-judge5"></view>
        <view v-show="0===active" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单创建</view>
          <view class="order-flow-steps__column-desc">创建时间：2020-06-24 11:27:44</view>
        </view>
      </view>
      <view class="position-r">
        <view v-show="1!==active&&1<active" class="order-detail-judge1"></view>
        <view v-show="1!==active&&1>active" class="order-detail-judge2"></view>
        <view v-show="1===active" class="order-detail-judge1"></view>
        <view v-show="1!==active&&1<active" class="order-detail-judge3"></view>
        <view v-show="1!==active&&1>active" class="order-detail-judge4"></view>
        <view v-show="1===active" class="order-detail-judge5"></view>
        <view v-show="1===active" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单评审</view>
          <view class="order-flow-steps__column-desc">评审时间：2020-06-24 11:27:44</view>
        </view>
      </view>
      <view class="position-r">
        <view v-show="2!==active&&2<active" class="order-detail-judge1"></view>
        <view v-show="2!==active&&2>active" class="order-detail-judge2"></view>
        <view v-show="2===active" class="order-detail-judge1"></view>
        <view v-show="2!==active&&2<active" class="order-detail-judge3"></view>
        <view v-show="2!==active&&2>active" class="order-detail-judge4"></view>
        <view v-show="2===active" class="order-detail-judge5"></view>
        <view v-show="2===active" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">工厂发货</view>
          <view class="order-flow-steps__column-desc">预计发货时间：</view>
          <view class="order-flow-steps__column-desc">发货时间：</view>
        </view>
      </view>
      <view class="position-r">
        <view v-show="3!==active&&3<active" class="order-detail-judge1"></view>
        <view v-show="3!==active&&3>active" class="order-detail-judge2"></view>
        <view v-show="3===active" class="order-detail-judge1"></view>
        <view v-show="3!==active&&3<active" class="order-detail-judge3"></view>
        <view v-show="3!==active&&3>active" class="order-detail-judge4"></view>
        <view v-show="3===active" class="order-detail-judge5"></view>
        <view v-show="3===active" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单签收</view>
          <view class="order-flow-steps__column-desc">预计发货时间：</view>
          <view class="order-flow-steps__column-desc">发货时间：</view>
        </view>
      </view>
      <view class="position-r">
        <view v-show="4!==active&&4<active" class="order-detail-judge1"></view>
        <view v-show="4!==active&&4>active" class="order-detail-judge2"></view>
        <view v-show="4===active" class="order-detail-judge1"></view>
        <view v-show="4!==active&&4<active" class="order-detail-judge3"></view>
        <view v-show="4!==active&&4>active" class="order-detail-judge4"></view>
        <view v-show="4===active" class="order-detail-judge5"></view>
        <view v-show="4===active" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">发票开具</view>
          <view class="order-flow-steps__column-desc">金税开票时间：</view>
          <view class="order-flow-steps__column-desc">开票时间：</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniIcons
} from '@dcloudio/uni-ui';

export default {
  name: 'orderDetailFlow',
  components: {
    uniIcons
  },
  data() {
    return {
      type: 1, // 1:五项；2：4项
      activeColor: '#3388FF',
      active: 2
    };
  }
};
</script>

<style scoped>
  .order-flow-con {
    border-radius: 20px;
    background-color: #FFFFFF;
    margin: 24px;
  }
  .order-flow-tou{
    color: #333333;
    font-size: 30px;
    padding: 24px;
  }
  .order-flow-line{
    background-color: #DBDBDB;
    height: 1px;
    margin-left: 20px;
  }
  .order-flow-steps {
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    padding: 50px;
  }
  .position-r {
    position: relative;
    padding-bottom: 20px;
  }
  .order-detail-judge1{
    height: 100%;
    width: 1px;
    background: #3388FF;
    position: absolute;
    left: 21px;
  }
  .order-detail-judge2{
    height: 100%;
    width: 1px;
    background: #DCDEE0;
    position: absolute;
    left: 21px;
  }
  .order-detail-judge3{
    height: 16px;
    width: 16px;
    background: #3388FF;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge4{
    height: 16px;
    width: 16px;
    background: #DCDEE0;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge5{
    height: 16px;
    width: 16px;
    background: #FFffff;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge6{
    position: absolute;
    top:-20px;
    left: 8px;
  }
  .order-flow-steps__column-title {
    font-size: 28px;
    text-align: left;
    color: #333333;
    padding-bottom: 10px;
  }
  .order-flow-steps__column-desc {
    font-size: 24px;
    text-align: left;
    color: #999999;
    padding-bottom: 10px;
  }

</style>
