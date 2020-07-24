<template>
  <view>
    <view class="mineSign-title">2019年度海尔&卡萨帝热水器产品</view>
    <view class="mineSign-line"></view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">区协议编码域</view>
      <view class="col-67 mineSign-text-right">QDCPHT2019110182558</view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">产品组编码</view>
      <view class="col-67 mineSign-text-right">电热水器,燃气热水器,海尔施特劳斯,海尔施特劳斯</view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">签约品牌编码</view>
      <view class="col-67 mineSign-text-right2">
        <view class="mineSign-text-right2-but">海尔</view>
        <view class="mineSign-text-right2-but">卡萨帝</view>
        <view class="mineSign-text-right2-but">施特劳斯</view>
        <view class="mineSign-text-right2-but">施特劳斯</view>
        <view class="mineSign-text-right2-but">海尔施特劳斯</view>
      </view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">有效期</view>
      <view class="col-67 mineSign-text-right">2019-01-01 至 2019-12-31</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mineSignItem'
};
</script>

<style scoped>
  .mineSign-title{
    height: 88px;
    line-height: 88px;
    color: #2283E2;
    font-size: 28px;
  }
  .mineSign-line{
    border-bottom: 1px dashed #B1B1B1;
  }
  .mineSign-text{
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .mineSign-text-left{
    color: #333333;
    font-size: 24px;
  }
  .mineSign-text-right{
    text-align: right;
    color: #999999;
    font-size: 24px;
  }
  .mineSign-text-right2{
  }
  .mineSign-text-right2-but{
    float:right;
    font-size: 24px;
    width:23%;
    background-color: #2283E2;
    color: #FFFFFF;
    border-radius: 16px;
    text-align: center;
    margin-right: 2%;
    margin-bottom: 2%;
  }

</style>
