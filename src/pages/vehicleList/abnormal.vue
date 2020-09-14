<template>
  <view>
    <view class="abnormal">
      <image src="../../assets/img/exception/jianshe.png" class="abnormal-img"></image>
      <view class="abnormal-title">功能开发中，敬请期待!</view>
      <button class="abnormal-btn" @tap="goIndex">返回</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'abnormal',
  methods: {
    goIndex() {
      console.log('111111');
      uni.reLaunch({
        url: '/pages/index/index'
      });
    }
  }
};
</script>
<style scoped>
.abnormal {
  padding-top: 100px;
}
.abnormal-title {
  margin: 10% 20% 10% 30%;
  color: #666;
  font-size: 30px;
}
.abnormal-btn {
  width: 90%;
  height: 88px;
  background: #2283E2;
  color: #fff;
  margin: 0 auto;
  border-radius: 44px;
}
.abnormal-img {
  width: 270px;
  height: 270px;
  margin: 0px 240px;
}
</style>
