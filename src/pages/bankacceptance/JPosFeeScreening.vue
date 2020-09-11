<template>
  <view class="posfeescr-bg">
    <view class="posfeescr-top ">订单号</view>
    <view class="posfeescr-topinput">
      <input
        class="posfeescr-input"
        placeholder-class="posfeescr-plahodsty"
        placeholder="请输入产品名称"
      />
    </view>
    <view class="posfeescr-buttom ">日期</view>
    <view class="posfeescr-timepicker">
      <view class="posfeescr-timeleft">开始时间</view>
      <view class="posfeescr-timecenter">至</view>
      <view class="posfeescr-timeright">结束时间</view>
    </view>
    <view class="posfeescr-row ">
      <view class="posfeescr-buttonleft">
        <view class="posfeescr-buttonlefttitle">确认</view>
      </view>
      <view class="posfeescr-buttonright">
        <view class="posfeescr-buttonrighttitle">重置</view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/posfeescr.scss';

export default {};
</script>

<style></style>
