<template>
  <view v-show="isOrderreview" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view @tap="orderNoClick('Y')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>通过</view>
      <view @tap="orderNoClick('N')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>失败</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderListReview',
  props: {
    isOrderreview: {
      type: Boolean,
      default: false
    },
    tctpConfirmButton: {
      type: String,
    }
  },
  methods: {
    orderNoClick(val) {
      if (val === 'Y') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderReview', val, '通过');
      }
      if (val === 'N') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderReview', val, '失败');
      }
    },
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
