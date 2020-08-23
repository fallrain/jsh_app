<template>
  <view class="vehiclerDetailSend">
    <view class="v-d-s-title">
      <view class="v-d-s-fox1">京东异地</view>
      <view class="v-d-s-fox2">|</view>
      <view class="v-d-s-fox3">北京市大兴区采育镇彩伟路奥</view>
    </view>
    <view v-if="sendType" class="v-d-s-inp">
      <j-input v-model="name" placeholder='请输入手机号' handChange="this.valChange">
        <template #left>
          <view class="jInput-left">姓名：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType" class="v-d-s-inp">
      <j-input v-model="mobile" placeholder='请输入手机号' handChange="this.valChange">
        <template #left>
          <view class="jInput-left">手机号：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType" class="v-d-s-inp">
      <j-input v-model="pake" placeholder='请输入手机号'>
        <template #left>
          <view class="jInput-left">身份证号：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType" class="v-d-s-but" @click="changeSend"><view class="v-d-s-but-kong">确认</view></view>
    <view v-if="!sendType" class="v-d-s-fox4">姓名：杨广</view>
    <view v-if="!sendType" class="v-d-s-fox4">手机号：18962543281</view>
    <view v-if="!sendType" class="v-d-s-fox4">身份证号：371325198910182339</view>
    <view v-if="!sendType" class="v-d-s-but" @click="changeSend"><view class="v-d-s-but-kong">修改</view></view>
  </view>
</template>

<script>
import JInput from '../form/JInput';

export default {
  name: 'VehicleDetailSend',
  components: {
    JInput
  },
  data() {
    return {
      sendType: true,
      name: '杨广',
      mobile: '18962543281',
      pake: '371325198910182339'
    };
  },
  methods: {
    changeSend() {
      this.sendType = !this.sendType;
    }
  }
};
</script>

<style lang="scss" scoped>
  .vehiclerDetailSend {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.32);
    padding: 24px 0 24px 24px;
  }
  .v-d-s-title {
    display: flex;
  }
  .v-d-s-fox1 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 15%;
    color: #2283E2;
    font-size: 24px;
  }
  .v-d-s-fox2 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 5%;
    color: #999999;
    font-size: 24px;
    padding-left: 2%;
  }
  .v-d-s-fox3 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 80%;
    color: #333333;
    font-size: 24px;
  }
  .v-d-s-fox4 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    color: #333333;
    font-size: 24px;
  }
  .v-d-s-but {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
  }
  .v-d-s-but-kong {
    margin-left: 80%;
    width: 15%;
    text-align: center;
    border-radius: 18px;
    background-color: #2283E2;
    color: #FFFFFF;
    font-size: 24px;
  }
  .v-d-s-inp {
    .jInput-wrap{
      height: 80px;
      .jInput-left{
        color: #333333;
        font-size: 24px;
      }
      .jInput{
        height: 80px;
      }
    }
  }
</style>
