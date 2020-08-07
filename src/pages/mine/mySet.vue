<template>
  <view class="mineSet">
    <view class="topView">
      <view class="headerIcon"></view>
      <view class="name">8800101954</view>
    </view>

    <view class="line"></view>

    <view class="inputView">
      <view class="cell">
        <view class="leftTitle">用户职位</view>
        <input placeholder="请设置员工职位"></input>
      </view>

      <view class="lineOne"></view>

      <view class="cell">
        <view class="leftTitle">员工号</view>
        <input placeholder="请设置员工号"></input>
      </view>

      <view class="lineOne"></view>

      <view class="cell">
        <view class="leftTitle">姓名</view>
        <input placeholder="请设置姓名"></input>
      </view>

      <view class="lineOne"></view>

      <view class="cell">
        <view class="leftTitle">电子邮箱</view>
        <input placeholder="请设置电子邮箱"></input>
      </view>

    </view>

    <view class="line"></view>

    <view
        class="addWx"
        @click="addWX"
      >+ 添加绑定微信
      </view>

  </view>
</template>

<script>

export default {
  name: 'mySet',
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    // 添加绑定微信
    addWX() {

    }
  },

};
</script>

<style scoped>
  .mineSet{
    min-height:1400px;
    background:rgba(245,245,245,1);
  }
  .topView {
    background: white;
  }
  .headerIcon {
    width: 180px;
    height: 180px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 120px;
    background-color: seagreen;
    /* background: url('~@/assets/img/login/login-haier.png') no-repeat;
     */
  }
  .name {
    font-size: 36px;
    color:rgba(51,51,51,1);
    line-height:50px;
    text-align: center;
    margin-top: 24px;
    padding-bottom: 24px;
    background: white;
  }
  .line {
    height: 12px;
    background:rgba(245,245,245,1);
  }
  .inputView {
    background: white;
  }
  .cell {
    padding: 24px;
    display: flex;
  }
  .leftTitle {
    font-size:34px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:48px;
    width: 170px;
  }
  .input {
    margin-left: 24px;
  }
  .lineOne {
    height: 1px;
    background:rgba(245,245,245,1);
  }
  .addWx {
    font-size:36px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(34,131,226,1);
    line-height:50px;
    padding-left: 36px;
    padding-top: 24px;
    padding-bottom: 24px;
    background: white;
  }

</style>
