<template>
  <view class="ovedueret-bg">
    <view class="ovedueret-box1">
      <view class="ovedueret-box1-row1">报修单号：21747682314</view>
      <view class="ovedueret-line"></view>
      <view class="ovedueret-box1-row2">
        <view class="ovedueret-row2-left">商品编码：</view>
        <view class="ovedueret-row2-right">BJ0VN009E</view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">提报时间：</view>
        <view class="ovedueret-row2-right">2019-04-25</view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">超期天数：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">2天</view>
        </view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">处理状态：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">处理完成</view>
        </view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">鉴定结果：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">无机器</view>
        </view>
      </view>
      <view class="ovedueret-line2"></view>
      <view class="ovedueret-button">
        <view class="ovedueret-button-title" @click="tourl">查看</view>
      </view>
    </view>
    <view class="ovedueret-box2">
      <view class="ovedueret-box1-row1">报修单号：21747682314</view>
      <view class="ovedueret-line"></view>
      <view class="ovedueret-box1-row2">
        <view class="ovedueret-row2-left">商品编码：</view>
        <view class="ovedueret-row2-right">BJ0VN009E</view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">提报时间：</view>
        <view class="ovedueret-row2-right">2019-04-25</view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">超期天数：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">2天</view>
        </view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">处理状态：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">处理完成</view>
        </view>
      </view>
      <view class="ovedueret-box1-row3">
        <view class="ovedueret-row2-left">鉴定结果：</view>
        <view class="ovedueret-row2-right">
          <view class="ovedueret-text-color">可修</view>
        </view>
      </view>
      <view class="ovedueret-line2"></view>
      <view class="ovedueret-button">
        <view class="ovedueret-button-title">查看</view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/overduereturn.scss';

export default {
  methods: {
    tourl() {
      uni.navigateTo({
        url: '/pages/aftersale/JOverdueReturnDetails'
      });
    }
  }
};
</script>

<style></style>
