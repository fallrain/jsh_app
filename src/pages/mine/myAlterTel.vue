<template>
  <view class="bg">
    <j-top-warning
      content="如果您的手机号已废弃收不到验证码，请拨打4008939888 转 1"
    ></j-top-warning>
    <view class="topLine"></view>
    <view class="myAlterTel-row">
      <view class="title">原手机号</view>
      <view class="value">18953205108</view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">验证码</view>
      <input class="inputView" placeholder="请输入验证码">
      <view class="myAlterTel-row-right-wrap">
        <view class="myAlterTel-row-right-gap"></view>
        <view class="authCode">发送验证码</view>
      </view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">新手机号</view>
      <input
        class="inputView"
        placeholder="请输入新手机号"
      >
    </view>
    <view class="myAlterTel-row">
      <view class="title">验证码</view>
      <input class="inputView" placeholder="请输入验证码">
      <view class="myAlterTel-row-right-wrap">
        <view class="myAlterTel-row-right-gap"></view>
        <view class="authCode">发送验证码</view>
      </view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">图形验证码</view>
      <input class="inputView" placeholder="请输入图形验证码">
    </view>

    <button class="btnStyle">修改</button>
  </view>
</template>
<script>

import JTopWarning from '../../components/common/JTopWarning';


export default {
  name: 'myAlterTel',
  components: {
    JTopWarning
  },
  data() {
    return {};
  },
  computed: {},
  created() {

  },
  methods: {}
};
</script>

<style scoped>
  .bg {
    width: 750px;
    min-height: 1400px;
    background: rgba(245, 245, 245, 1)
  }

  .topLine {
    height: 24px;
    background: rgba(245, 245, 245, 1)
  }

  .myAlterTel-row {
    display: flex;
    align-items: center;
    height: 96px;
    background: #fff;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: 0;
    }
  }

  .title {
    width: 180px;
    height: 48px;
    margin-left: 24px;
    margin-right: 24px;
    font-size: 34px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }

  .inputView {
    width: 278px;
    height: 96px;
  }

  .uni-input-placeholder {
    font-size: 34px;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }

  .lineView {
    height: 2px;
    background: rgba(245, 245, 245, 1);
  }

  .authCode {
    height: 96px;
    font-size: 34px;
    font-weight: 400;
    color: #1677FF;
    line-height: 96px;
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

  .myAlterTel-row-right-wrap {
    display: flex;
    align-items: center;
  }

  .myAlterTel-row-right-gap {
    width: 1px;
    height: 44px;
    background: #eee;
    margin-left: 24px;
    margin-right: 24px;
  }

</style>
