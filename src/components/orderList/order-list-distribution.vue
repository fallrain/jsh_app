<template>
  <view v-show="isOrderDistribution" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view @tap="orderNoClick('6')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>直发</view>
      <view @tap="orderNoClick('1')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>自提</view>
      <view @tap="orderNoClick('2')" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>配送</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'isOrderDistribution',
  props: {
    isOrderDistribution: {
      type: Boolean,
      default: false
    },
    tctpConfirmButton: {
      type: String,
    }
  },
  methods: {
    orderNoClick(val) {
      if (val === '6') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderDistribution', val, '直发');
      }
      if (val === '1') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderDistribution', val, '自提');
      }
      if (val === '2') {
        /* 回馈抽屉值，修改props.show */
        this.$emit('selectInfoOrderDistribution', val, '配送');
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
