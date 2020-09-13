<template>
  <view class="confirm-bg">
    <view class="con-box">
      <view class="con-row1">退货单号：21747682314</view>
      <view class="line"></view>
      <view class="con-row2">
        <view class="row2-left1">用户名：</view>
        <view class="row2-right">刘玉德</view>
      </view>
      <view class="con-row3">
        <view class="row2-left2">客户电话：</view>
        <view class="row2-right">13987654263</view>
      </view>
      <view class="con-row3">
        <view class="row2-left2">退货产品：</view>
        <view class="row2-right">BJ0VN0090E</view>
      </view>
      <view class="con-row3">
        <view class="row2-left2">购机时间：</view>
        <view class="row2-right">2018-01-21</view>
      </view>
      <view class="con-row4">
        <view class="row2-left2">发票金额：</view>
        <view class="row2-right2">¥2345.23</view>
      </view>
      <view class="con-row5">
        <view class="row2-left2">折旧费：</view>
        <view class="row2-right2">¥2345.23</view>
      </view>
      <view class="line2"></view>
      <view class="button">
        <view class="button-title" @click="tourl">确认</view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/wherebuyreturnconfirm.scss';

export default {
  methods: {
    tourl() {
      uni.navigateTo({
        url: '/pages/aftersale/JWhereBuyReturnConfirm2'
      });
    }
  }
};
</script>

<style></style>
