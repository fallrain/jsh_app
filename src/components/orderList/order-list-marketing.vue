<template>
  <view v-show="isOrderremarketing" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view @tap="orderNoClick('1')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>单品</view>
      <view @tap="orderNoClick('2')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>组合</view>
      <view @tap="orderNoClick('3')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>抢单</view>
      <view @tap="orderNoClick('4')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>套餐</view>
      <view @tap="orderNoClick('5')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>成套</view>
      <view @tap="orderNoClick('6')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>反向定制</view>
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
    tctpConfirmButton: {
      type: String,
    }
  },
  methods: {
    orderNoClick(val) {
      if (val === '1') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '单品');
      }
      if (val === '2') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '组合');
      }
      if (val === '3') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '抢单');
      }
      if (val === '4') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '套餐');
      }
      if (val === '5') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '成套');
      }
      if (val === '6') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderMarketing', val, '反向定制');
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
