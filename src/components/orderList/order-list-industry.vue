<template>
  <view v-show="isOrderIndustry" class="order_more">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view v-for="(item,index) in industryList" :key="item.key">
        <view @tap="orderNoClick(item.key,item.value)" class="order_more_text"><view class="iconfont iconcancel order_more_iconStyle"></view>{{item.value}}</view>
      </view>
<!--      <view class="order_more_text" @tap="orderNoClick('2')"><view class="iconfont iconcancel order_more_iconStyle"></view>整单号</view>-->
<!--      <view class="order_more_text" @tap="orderNoClick('3')"><view class="iconfont iconcancel order_more_iconStyle"></view>GVC单号</view>-->
<!--      <view class="order_more_text" @tap="orderNoClick('4')"><view class="iconfont iconcancel order_more_iconStyle"></view>物流单号</view>-->
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderListItemType',
  props: {
    orderNo: String,
    isOrderIndustry: {
      type: Boolean,
      default: false
    },
    industryList: {
      type: Array,
    }
  },
  methods: {
    orderNoClick(val, name) {
      /* 回馈抽屉值，修改props.show */
      this.$emit('selectInfoIndustry', val, name);
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
    margin-left: 10px;
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
