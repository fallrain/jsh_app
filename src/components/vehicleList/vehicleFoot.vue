<template>
  <view class="v-foot">
    <view class="v-foot-lin">
      <view class="v-foot-lin-tex1">车型：<span class="v-foot-lin-tex3">X8.7K - 8.7厢式（开顶）</span></view>
      <view class="v-foot-lin-tex2">已装车体积：<span class="v-foot-lin-tex4">0.81m³ / 2%</span></view>
    </view>
    <view class="v-foot-btn">
      <view class="v-foot-btn-text"><i class="iconfont icongouwuchezhengpin v-foot-lin-tex5"></i>购物车&nbsp;(10)</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vehicleFoot'
};
</script>

<style scoped>
  .v-foot{
    display: flex;
  }
  .v-foot-lin{
    align-items: center;
    width: 65%;
  }
  .v-foot-lin-tex1{
    padding: 4px 10px 4px 18px;
    font-size: 24px;
    color: #333333;
  }
  .v-foot-lin-tex2{
    padding: 4px 10px 4px 18px;
    font-size: 20px;
    color: #999999;
  }
  .v-foot-lin-tex3{
    font-size: 28px;
    color: #ED2856;
  }
  .v-foot-lin-tex4{
    color: #ED2856;
  }
  .v-foot-lin-tex5{
    font-size: 30px;
    padding-right: 6px;
  }
  .v-foot-btn{
    display: flex;
    font-size: 28px;
    align-items: center;
    width: 35%;
  }
  .v-foot-btn-text {
    background-color: #ED2856;
    color: #FFFFFF;
    border-radius: 28px;
    padding: 10px;
    width: 220px;
    text-align: center;
    font-weight: 300;
  }
</style>
