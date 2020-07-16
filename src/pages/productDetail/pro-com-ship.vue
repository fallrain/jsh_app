<template>
  <view v-show="isShowShip">
    <view class="mask" @click="close"></view>
    <view class="popup">
      <view class="top" @click="close">
        <view style="color: #333333; font-size: 15px;">配送至</view>
        <view style="color: #ED2856;">X</view>
      </view>
      <view class="content sorrowC">
        <view class="lineHigt"></view>
        <view class="uni-flex uni-row textTalRow">
          <view class="text col-90 borderLeft">
            <view class="afterr">特价版本</view>
          </view>
          <view class="text borderLeft">2</view>
        </view>
        <view class="textTalRow" @click="checkAct('11')">
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-60">名称：TJ2020033333</view>
            <view class="textRow col-40">价格：¥ 5949.71</view>
          </view>
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-40">有效期：2021-01-01</view>
            <view class="textRow col-25">直扣：0.00</view>
            <view class="textRow col-33">数量：0.00</view>
          </view>
        </view>
        <view class="lineHigt"></view>
        <view class="uni-flex uni-row textTalRow">
          <view class="text col-90 borderLeft">
            <view class="afterr">特价版本</view>
          </view>
          <view class="text borderLeft">2</view>
        </view>
        <view class="textTalRow">
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-60">名称：TJ2020033333</view>
            <view class="textRow col-40">价格：¥ 5949.71</view>
          </view>
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-40">有效期：2021-01-01</view>
            <view class="textRow col-25">直扣：0.00</view>
            <view class="textRow col-33">数量：0.00</view>
          </view>
        </view>
        <view class="textTalRow">
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-60">名称：TJ2020033333</view>
            <view class="textRow col-40">价格：¥ 5949.71</view>
          </view>
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-40">有效期：2021-01-01</view>
            <view class="textRow col-25">直扣：0.00</view>
            <view class="textRow col-33">数量：0.00</view>
          </view>
        </view>
        <view class="lineHigt"></view>
        <view class="uni-flex uni-row textTalRow">
          <view class="text col-90 borderLeft">
            <view class="afterr">特价版本</view>
          </view>
          <view class="text borderLeft">2</view>
        </view>
        <view class="textTalRow">
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-60">名称：TJ2020033333</view>
            <view class="textRow col-40">价格：¥ 5949.71</view>
          </view>
          <view class="uni-flex uni-row textSenRow">
            <view class="textRow col-40">有效期：2021-01-01</view>
            <view class="textRow col-25">直扣：0.00</view>
            <view class="textRow col-33">数量：0.00</view>
          </view>
        </view>
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
      numberValue: 0
    };
  },
  methods: {
    close() {
      this.$emit('closeShip', 'close');
    },
    checkAct(value) { // 选择活动
      this.numberValue = value;
    },
    putAct() { // 确认
      this.$emit('checkedShip', this.numberValue);
    },
    refresh() { // 重置

    }
  }
};
</script>

<style>
  .mask {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: -webkit-flex;
  }
  .popup {
    margin-top: -60%;
    z-index: 999;
    background-color: #ffffff;
    height: 70%;
    width: 100%;
    position:fixed;
  }
  .sorrowC{
    overflow-x: hidden;
    overflow-y: scroll;
    height: 75%;
  }
  .top{
    width: 92%;
    margin: 0 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #FFFFFF;
  }
  .textTalRow {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
  }
  .borderLeft {
    height: 70px;
    line-height: 70px;
  }
  .afterr {
    margin-top: 20px;
    padding-left: 10px;
    border-left: 6px solid #ED2856;
    font-size: 24px;
    color: #ED2856;
    height: 30px;
    line-height: 30px;
  }
  .textSenRow {
    padding-left: 20px;
  }
  .textRow {
    text-align: left;
    color: #999999;
    font-size: 20px;
  }
  .lineHigt {
    background-color: #F0F0F0;
    height: 2px;
  }
</style>
