<template>
  <view class="specs-cont">
    <view class="uni-flex uni-row specs-head-border">
      <view class="specs-head-text">主体</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">品牌</view>
      <view class="specs-head-info-right">卡萨帝</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">型号</view>
      <view class="specs-head-info-right">BCD-520WICHU1</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">机身颜色</view>
      <view class="specs-head-info-right">帛拉帝【钛金】</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">类别</view>
      <view class="specs-head-info-right">三门</view>
    </view>
    <view class="uni-flex uni-row specs-head-border">
      <view class="specs-head-text">主体</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">品牌</view>
      <view class="specs-head-info-right">卡萨帝</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">型号</view>
      <view class="specs-head-info-right">BCD-520WICHU1</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">机身颜色</view>
      <view class="specs-head-info-right">帛拉帝【钛金】</view>
    </view>
    <view class="uni-flex uni-row specs-info-border">
      <view class="specs-head-info-left col-40">类别</view>
      <view class="specs-head-info-right">三门</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'proSpecs'
};
</script>

<style scoped>
  .specs-cont {
    padding: 10px;
  }
  .specs-head-border {
    border: 2px solid #EFEFEF;
  }
  .specs-info-border {
    border: 2px solid #EFEFEF;
    border-top: none;
  }
  .specs-head-text {
    margin: 5px 5px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    color: #333333;
    font-size: 24px;
  }
  .specs-head-info-left {
    margin: 5px 5px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #999999;
    text-align: right;
    border-right: 2px solid #EFEFEF;
  }
  .specs-head-info-right {
    margin: 5px 5px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #999999;
  }
</style>
