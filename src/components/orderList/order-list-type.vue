<template>
  <view v-show="isOrderType" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view class="order_more_text" @click="orderNoClick('1')"><view class="iconfont iconcancel order_more_iconStyle"></view>订单号</view>
      <view class="order_more_text" @click="orderNoClick('2')"><view class="iconfont iconcancel order_more_iconStyle"></view>整单号</view>
      <view class="order_more_text" @click="orderNoClick('3')"><view class="iconfont iconcancel order_more_iconStyle"></view>GVS单号</view>
      <view class="order_more_text" @click="orderNoClick('4')"><view class="iconfont iconcancel order_more_iconStyle"></view>物流单号</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'orderListItemType',
  props: {
    orderNo: String,
    isOrderType: {
      type: Boolean,
      default: false
    },
    tctpConfirmButton: {
      type: String,
    }
  },
  methods: {
    orderNoClick(val) {
      if (val === '1') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderNo', val, '订单号');
      }
      if (val === '2') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderNo', val, '整单号');
      }
      if (val === '3') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderNo', val, 'GVS单号');
      }
      if (val === '4') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderNo', val, '物流单号');
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
