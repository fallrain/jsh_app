<template>
  <view v-show="isOrderMore" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view v-if="invalidButton == 1" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>自助作废</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>更改付款方</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>统舱统配确认</view>
      <view class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>前往结算</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderListItemMore',
  props: {
    isOrderMore: {
      type: Boolean,
      default: false
    },
    invalidButton:{
      type:String,
      default:'1',
    }
  }
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
