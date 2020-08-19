<template>
    <view class="applicationsIndex">
      <view class="app-nav">
        <view class="app-nav-left">
          <view class="app-nav-left-menu">
            <image src="@/assets/img/appIndex/liebiao.png"></image>
          </view>
          <view class="fs24 text-333">王芬芬，您好！</view>
          <view class="logo">
            <image src="@/assets/img/appIndex/haier.png"></image>
          </view>
        </view>
        <view class="app-nav-right">
          <image src="@/assets/img/appIndex/kefu.png"></image>
        </view>
      </view>
      <view class="app-header">
        <view class="app-header-swiper">
          <image src="@/assets/img/appIndex/yuncang-pic.png"></image>
        </view>
        <view class="app-header-quickly">
          <view v-if="appFlag" class="lately-app-list">
            <view @tap="goIndex" class="app-list-item">
              <view class="icon-img">
                <image src="@/assets/img/appIndex/video.png"></image>
              </view>
              <view class="fs24 text-333">默认</view>
            </view>
            <view class="app-list-item">
              <view class="icon-img">
                <image src="@/assets/img/appIndex/video.png"></image>
              </view>
              <view class="fs24 text-333">直播</view>
            </view>
            <view class="app-list-item">
              <view class="icon-img">
                <image src="@/assets/img/appIndex/video.png"></image>
              </view>
              <view class="fs24 text-333">直播</view>
            </view>
          </view>
          <view v-if="!appFlag" class="my-app-list">
            <view class="app-list-item">
              <view class="icon-img">
                <image src="@/assets/img/appIndex/video.png"></image>
              </view>
              <view class="fs24 text-333">直播</view>
            </view>
            <view class="app-list-item">
              <view class="icon-img">
                <image src="@/assets/img/appIndex/video.png"></image>
              </view>
              <view class="fs24 text-333">直播</view>
            </view>
          </view>
          <view class="quickly-status">
            <view :class="['quickly-status-lately',appFlag&&'active']">
              最近使用
            </view>
            <view :class="['quickly-status-my',!appFlag&&'active']">
              我的应用
            </view>
          </view>
        </view>
      </view>
      <view class="app-function">
        <view class="app-function-titel">
          功能区域
        </view>
      </view>
    </view>
</template>
<script>
import './css/applicationsIndex.scss';

export default {
  name: 'applicationsIndex',
  data() {
    return {
      appFlag: true
    };
  },
  methods: {
    goIndex() {
      uni.navigateTo({
        url: '/pages/nav/nav'
      });
    }
  }
};
</script>
