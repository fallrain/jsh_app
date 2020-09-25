<template>
  <view v-show="isVehicleMore" :class="{'v_More':fromWhere==='GWCAN','v_More_f':fromWhere==='ZCFKF'}">
    <p v-show="fromWhere==='GWCAN'" style="height: 10px;"><span class="sanjiao"></span></p>
    <view v-show="fromWhere==='GWCAN'" class="background">
      <view @tap="goVehicle('1')" class="v_More_text"><view class="iconfont iconfunction v_More_iconStyle"></view>选购其他</view>
      <view @tap="goVehicle('2')" class="v_More_text"><view class="iconfont iconorder v_More_iconStyle"></view>设置挂单</view>
      <view @tap="goVehicle('3')" class="v_More_text"><view class="iconfont iconcar1 v_More_iconStyle"></view>拼整车</view>
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
    },
    fromWhere: {
      type: String
    },
    index: {
      type: [String, Number]
    }
  },
  methods: {
    goVehicle(zind) {
      this.$emit('anNiuVehicle', !this.isVehicleMore, zind);
    },
  }
};
</script>

<style lang="scss" scoped>
  .background{
    background-color: #FFFFFF;
  }
  .FKF_backGm{
    background-color: #eeeeee;
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
  .v_More_f{
    position: absolute;
    z-index: 100;
    width: 80%;
    margin-left: 20%;
    margin-top: 25%;
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
  .v_textSenRow-ship{
    padding: 10px;
  }
  .v_textTick-ship {
    text-align: center;
    color: #eeeeee;
    font-size: 32px;
  }
  .v_textRow-ship {
    text-align: left;
    color: #666666;
    font-size: 24px;
  }
  .V_cheched{
    color: #ED2856;
  }
</style>
