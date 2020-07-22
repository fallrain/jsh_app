<template>
  <view v-show="isShowShip">
    <view class="mask-ship" @click="close"></view>
    <view class="popup-ship">
      <view class="top-ship" @click="close">
        <view class="top-ship-title">配送至</view>
        <view class="top-ship-but">X</view>
      </view>
      <view class="sorrowC-ship">
        <view @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow-ship">
            <view class="textTick-ship col-15 iconfont icontick"></view>
            <view class="textRow-ship col-80">(8800212607)李沧区重庆中路420号</view>
          </view>
        </view>
        <view class="line-ship"></view>
        <view @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow-ship ">
            <view class="textTick-ship col-15 iconfont icontick"></view>
            <view class="textRow-ship col-80">(8800212607)李沧区重庆中路420号沃尔豪大楼G区A座2008室</view>
          </view>
        </view>
        <view class="line-ship"></view>
        <view @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow-ship">
            <view class="textTick-ship col-15 iconfont icontick"></view>
            <view class="textRow-ship col-80">(8800212607)李沧区黑龙江中路342号甲A栋G座2039室</view>
          </view>
        </view>
        <view class="line-ship"></view>
        <view @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow-ship">
            <view class="textTick-ship col-15 iconfont icontick"></view>
            <view class="textRow-ship col-80">(8800212607)李沧区重庆中路420号</view>
          </view>
        </view>
        <view class="line-ship"></view>
        <view @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow-ship">
            <view class="textTick-ship col-15 iconfont icontick" :class="checkShip ? 'cheched' :''"></view>
            <view class="textRow-ship col-80" :class="checkShip ? 'cheched' :''">(8800212607)李沧区重庆中路420号</view>
          </view>
        </view>
        <view class="line-ship"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'proComShip',
  components: {
  },
  props: {// 父级传来的数据
    isShowShip: {// 页面是否显示
      type: Boolean,
      default: true
    },
    info: {// 图片以及产品数据
      type: String,
      default: 'hello'
    }
  },
  data() {
    return {
      checkShip: false
    };
  },
  methods: {
    close() {
      this.$emit('closeShip', 'close');
    },
    checkAct() { // 选择活动
      this.checkShip = !this.checkShip;
      this.$emit('checkedShip', this.checkShip);
    }
  }
};
</script>

<style>
  .mask-ship {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: -webkit-flex;
  }
  .popup-ship {
    margin-top: -60%;
    z-index: 999;
    background-color: #ffffff;
    height: 70%;
    width: 100%;
    position:fixed;
  }
  .top-ship{
    width: 92%;
    margin: 0 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #FFFFFF;
  }
  .top-ship-title{
    padding: 20px 0 20px 30px;
    color: #333333;
    font-size: 30px;
  }
  .top-ship-but{
    padding: 20px 1px 20px 0;
    color: #ED2856;
    font-size: 18px;
  }
  .sorrowC-ship{
    overflow-x: hidden;
    overflow-y: scroll;
    height: 75%;
  }
  .textSenRow-ship {
    padding: 20px;
  }
  .textRow-ship {
    text-align: left;
    color: #666666;
    font-size: 28px;
  }
  .textTick-ship {
    text-align: center;
    color: #ffffff;
    font-size: 32px;
  }
  .line-ship {
    background-color: #F0F0F0;
    height: 2px;
  }
  .cheched {
    color: #ED2856;
  }
</style>
