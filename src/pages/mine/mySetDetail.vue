<template>
  <view class="bg">
    <view class="topLine"></view>
    <view @tap="personInforClick" class="row">
      <view @tap="personInforClick" class="title">个人资料</view>
    </view>
    <view class="line"></view>
    <!--<view @tap="alertUrl" class="row">
      <view @tap="alertUrl" class="title">修改手机号</view>
    </view>
    <view class="line"></view>
    <view @tap="alertUrl" class="row">
      <view @tap="alertUrl" class="title">修改登录密码</view>
    </view>
    <view class="line"></view>
    <view @tap="alertUrl" class="row">
      <view @tap="alertUrl" class="title">更改支付密码</view>
    </view>-->
    <view class="middleLine"></view>
    <!-- <view class="row">
        <view class="title">评价</view>
    </view>
    <view class="line"></view>
    <view class="row">
        <view class="title">新消息提醒</view>
    </view> -->
    <view class="line"></view>
    <view class="row">
      <view class="title">清除缓存</view>
    </view>
    <view class="middleLine"></view>

    <view class="row">
      <view class="title">检查更新</view>
      <view class="version">{{version}}{{$jConfig.version || ''}}</view>
    </view>

    <button @tap="loginOutAction" class="btnStyle">退出登录</button>

  </view>
</template>

<script>
export default {
  data() {
    // 这里存放数据
    return {
      version: ''
    };
  },
  created() {
    if (AlipayJSBridge) {
      AlipayJSBridge.call('myApiAppVersion', {}, (result) => {
        this.version = result.version;
      });
    }
  },
  methods: {
    // 退出登录
    loginOutAction() {
      // 先重新定位到首页
      uni.reLaunch({
        url: '/pages/applicationsIndex/applicationsIndex'
      });
      // 清理code token
      uni.setStorageSync('token', '');
      uni.setStorageSync('code', '');
      AlipayJSBridge && AlipayJSBridge.call('popWindow');
    },
    //   个人资料
    personInforClick() {
      uni.navigateTo({
        url: '/pages/mine/myBaseInfo'
      });
    },
    //   修改手机号
    alertTelClick() {
      uni.navigateTo({
        url: '/pages/mine/myAlterTel'
      });
    },
    //   修改登录密码
    alertLoginPwdClick() {
      uni.navigateTo({
        url: '/pages/mine/myAlertLoginPwd'
      });
    },
    // 修改支付密码
    alertPayPwdClick() {
      uni.navigateTo({
        url: '/pages/mine/myPayAlertPwd'
      });
    },
    alertUrl() {
      // uni.navigateTo({
      //   url: '/pages/mine/myAlertUrl'
      // });
    }
  }
};
</script>

<style scoped>
  .bg {
    background: rgba(245, 245, 245, 1);
    min-height: 1400px;
  }

  .topLine {
    height: 12px;
    background: rgba(245, 245, 245, 1);
  }

  .middleLine {
    height: 60px;
  }

  .row {
    height: 96px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
  }

  .version {
    line-height: 96px;
    font-size: 25px;
    margin-right: 30px;
  }

  .line {
    margin-left: 24px;
    height: 2px;
    background: rgba(245, 245, 245, 1);
  }

  .title {
    height: 96px;
    font-size: 36px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 96px;
    margin-left: 24px;
  }

  .btnStyle {
    margin-top: 60px;
    width: 700px;
    height: 88px;
    background: rgba(237, 40, 86, 1);
    border-radius: 48px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    font-weight: 400;
    font-size: 30px;
    line-height: 88px;
  }

</style>
