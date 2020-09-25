<template>
  <view v-show="isOrderMore" class="transfer_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view class="transfer_more_text"><view class="iconfont iconcancel transfer_more_iconStyle"></view>选购其他</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TShoppingCartMore',
  props: {
    isOrderMore: {
      type: Boolean,
      default: false
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
  .transfer_more{
    margin-left: -20px;
    position: absolute;
    z-index: 100;
    margin-top: -18px;
  }
  .transfer_more_text {
    display: flex;
    color: #999999;
    font-size: 24px;
    padding-left: 20px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 20px;
  }
  .transfer_more_iconStyle {
    /*transform: rotateY(180deg);*/
    margin-top: auto;
    margin-right: 6px;
  }
</style>
