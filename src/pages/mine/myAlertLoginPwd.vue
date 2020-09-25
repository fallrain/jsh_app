<template>
  <view class="bg">
    <view class="topLine"></view>
    <view class="row">
      <view class="title">登录密码</view>
      <input class="inputView" placeholder="请输入登录密码">
    </view>

    <view class="lineView"></view>

    <view class="row">
      <view class="title">新密码</view>
      <input class="inputView" placeholder="请输入支付密码">
    </view>

    <view class="lineView"></view>

    <view class="row">
      <view class="title">确认密码</view>
      <input class="inputView" placeholder="请输入支付密码">
    </view>

    <button class="btnStyle">修改</button>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {}
};
</script>

<style lang="scss">
  .bg {
    width: 750px;
    min-height: 1400px;
    background: rgba(245, 245, 245, 1)
  }

  .topLine {
    height: 12px;
    background: rgba(245, 245, 245, 1)
  }

  .row {
    height: 96px;
    background: white;
    display: flex;
  }

  .title {
    margin-left: 24px;
    width: 180px;
    height: 48px;
    font-size: 34px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 96px;
  }

  .inputView {
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
    color: rgba(22, 119, 255, 1);
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

</style>
