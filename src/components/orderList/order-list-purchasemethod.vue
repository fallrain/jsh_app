<template>
  <view v-show="isOrderBuy" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view @tap="orderNoClick('XY')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>信用模式</view>
      <view @tap="orderNoClick('BB')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>版本调货</view>
      <view @tap="orderNoClick('RZ')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>融资订单</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'isOrderBuy',
  props: {
    isOrderBuy: {
      type: Boolean,
      default: false
    },
    tctpConfirmButton: {
      type: String,
    }
  },
  methods: {
    orderNoClick(val) {
      if (val === 'XY') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderBuy', val, '信用模式');
      }
      if (val === 'BB') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderBuy', val, '版本调货');
      }
      if (val === 'RZ') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderBuy', val, '融资订单');
      }
    },
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
