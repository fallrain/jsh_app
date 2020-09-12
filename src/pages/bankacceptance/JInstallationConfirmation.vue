<template>
  <view class="inscom-bg">
    <view class="inscom-row">
      <view class="inscom-left">终端POS装机确认</view>
      <view class="inscom-right" @click="bottomclose">x</view>
    </view>
    <view class="inscom-center">装机年费</view>
    <view class="inscom-row">
      <view v-show="switch1" class="inscom-input">￥</view>
      <input
        class="inscom-input"
        v-model="textinput"
        placeholder-class="inscom-inputplahol"
        placeholder="请输入装机年费"
        @focus="startwrite"
        selection-start="-2"
    /></view>
    <view class="inscom-line"></view>
    <view class="inscom-button">
      <view class="inscom-buttitle">确定</view>
    </view>
  </view>
</template>

<script>
import './css/inscom.scss';

export default {
  data() {
    return {
      textinput: '',
      switch1: false
    };
  },
  methods: {
    startwrite() {
      this.switch1 = true;
    },
    bottomclose() {
      this.$emit('bottomclose');
    }
  }
};
</script>

<style></style>
