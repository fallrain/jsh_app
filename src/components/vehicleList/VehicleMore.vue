<template>
  <view v-show="isVehicleMore" class="v_More">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background">
      <view class="v_More_text" @click="goVehicle('1')"><view class="iconfont iconfunction v_More_iconStyle"></view>选购其他</view>
      <view class="v_More_text" @click="goVehicle('2')"><view class="iconfont iconorder v_More_iconStyle"></view>设置挂单</view>
      <view class="v_More_text" @click="goVehicle('3')"><view class="iconfont iconcar1 v_More_iconStyle"></view>拼整车</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'VehicleMore',
  props: {
    isVehicleMore: {
      type: Boolean,
      default: false
    },
    anNiuINfo: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    goVehicle(zind) {
      this.$emit('anNiuVehicle', !this.isVehicleMore, zind);
    }
  }
};
</script>

<style lang="scss" scoped>
  .background{
    background-color: #FFFFFF;
  }
  .sanjiao {
    border: 14px solid transparent;
    border-bottom-color: #FFFFFF;
    width: 0;
    height: 0;
    margin-left: 76%;
    position: absolute;
  }
  .v_More{
    margin-left: 63.5%;
    position: absolute;
    z-index: 100;
    margin-top: -13%;
    width: 29%;
  }
  .v_More_text {
    display: flex;
    color: #999999;
    font-size: 28px;
    padding: 10px 20px 20px 20px;
    .iconfont{
      font-size: 32px;
    }
  }
  .v_More_iconStyle {
    /*transform: rotateY(180deg);*/
    margin-top: auto;
    margin-right: 6px;
    font-size: 24px;
  }
</style>
