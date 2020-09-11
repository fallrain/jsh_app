<template>
  <view class="extide-bg">
    <view class="extide-box1">
      <view class="extide-box1-row1">报修单号：21747682314</view>
      <view class="extide-line"></view>
      <view class="extide-box1-row2">
        <view class="extide-row2-left">商品编码：</view>
        <view class="extide-row2-right">BJ0VN009E</view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">提报时间：</view>
        <view class="extide-row2-right">2019-04-25</view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">超期天数：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">2天</view>
        </view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">处理状态：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">处理完成</view>
        </view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">鉴定结果：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">无机器</view>
        </view>
      </view>
      <view class="extide-line2"></view>
      <view class="extide-button">
        <view class="extide-button-title" @click="tourl">查看</view>
      </view>
    </view>
    <view class="extide-box2">
      <view class="extide-box1-row1">报修单号：21747682314</view>
      <view class="extide-line"></view>
      <view class="extide-box1-row2">
        <view class="extide-row2-left">商品编码：</view>
        <view class="extide-row2-right">BJ0VN009E</view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">提报时间：</view>
        <view class="extide-row2-right">2019-04-25</view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">超期天数：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">2天</view>
        </view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">处理状态：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">处理完成</view>
        </view>
      </view>
      <view class="extide-box1-row3">
        <view class="extide-row2-left">鉴定结果：</view>
        <view class="extide-row2-right">
          <view class="extide-text-color">可修</view>
        </view>
      </view>
      <view class="extide-line2"></view>
      <view class="extide-button">
        <view class="extide-button-title">查看</view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/extendedidentification.scss';

export default {
  methods: {
    tourl() {
      uni.navigateTo({
        url: '/pages/aftersale/JExtendedIdentificationDetails'
      });
    }
  }
};
</script>

<style></style>
