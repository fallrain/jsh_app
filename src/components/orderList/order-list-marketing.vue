<template>
  <view v-show="isOrderremarketing" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>单品</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>抢单</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>套餐</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>成套</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>组合</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>反向定制</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderListMarketing',
  props: {
    isOrderremarketing: {
      type: Boolean,
      default: false
    },
    tctpConfirmButton:{
      type:String,
    }
  },
};
</script>

<style scoped>
  .background{
    background-color: #FFFFFF;
  }
  .sanjiao {
    border: 10px solid transparent;
    border-bottom-color: #F5F5F5;
    width: 0;
    height: 0;
    margin-left: 40px;
    position: absolute;
  }
  .order_more{
    margin-left: -20px;
    position: absolute;
    z-index: 100;
    margin-top: -18px;
  }
  .order_more_text {
    display: flex;
    color: #999999;
    font-size: 24px;
    padding-left: 20px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 20px;
  }
  .order_more_iconStyle {
    /*transform: rotateY(180deg);*/
    margin-top: auto;
    margin-right: 6px;
  }
</style>
