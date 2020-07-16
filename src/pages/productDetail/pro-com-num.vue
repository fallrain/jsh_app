<template>
  <view v-show="isShow">
    <view class="mask" @click="close"></view>
    <view class="popup">
      <view class="top" @click="close">
        <view></view>
        <view style="color: #ED2856;">X</view>
      </view>
      <view class="content">
        <view class="uni-flex uni-row">
          <view class="text uni-flex" style="width: 88px;height: 88px;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
            <image src="/static/logo.png" style="width: 88px;height: 88px;"></image>
          </view>
          <view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;padding-left: 20px;">
            <view class="uni-flex uni-row" style="font-size: 16px;color: #333333;">
              海尔1215DHB(C) 家用静音全自动10KG洗烘一体高高品质……
            </view>
            <view class="uni-flex uni-row">
              <view style="font-size: 20px;color: #ED2856;"> ¥ 29384.21</view>
            </view>

          </view>
        </view>
        <view class="lineHigt"></view>
        <view class="uni-flex uni-row" style="padding-left: 5px;">
          <view class="text col-40" style="-webkit-flex: 1;flex: 1;">供&nbsp;&nbsp;&nbsp;价：￥ 4099.00</view>
          <view class="text col-25" style="-webkit-flex: 1;flex: 1;">台&nbsp;&nbsp;&nbsp;返：0.00</view>
          <view class="text " style="-webkit-flex: 1;flex: 1;">返&nbsp;&nbsp;&nbsp;利：0.00</view>
        </view>
        <view class="uni-flex uni-row" style="padding-left: 5px;">
          <view class="text col-40" style="-webkit-flex: 1;flex: 1;">库&nbsp;&nbsp;&nbsp;存：￥ 4099.00</view>
          <view class="text col-25" style="-webkit-flex: 1;flex: 1;">直扣价：0.00</view>
          <view class="text " style="-webkit-flex: 1;flex: 1;"></view>
        </view>
        <view class="uni-flex uni-row" style="padding-left: 5px;">
          <view class="text text2 col-20" style="-webkit-flex: 1;flex: 1;">数&nbsp;&nbsp;&nbsp;量：</view>
          <view class="text col-25" style="-webkit-flex: 1;flex: 1;">
            <uni-number-box :value="numberValue" @change="change" />
          </view>
        </view>
      </view>
      <button class="button" style="margin-top: 35px;" @click="putNum">确定</button>
    </view>
  </view>
</template>

<script>
import UniNumberBox from '../../components/uniUi/uni-extend/uni-number-box';

export default {
  name: 'proComNum',
  components: {
    UniNumberBox
  },
  props: {// 父级传来的数据
    isShow: {// 页面是否显示
      type: Boolean,
      default: false
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
      this.$emit('closeNum', 'close');
    },
    change(value) {
      this.numberValue = value;
    },
    putNum() {
      this.$emit('checkedNum', this.numberValue);
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
    margin-top: -50%;
    z-index: 999;
    background-color: #ffffff;
    height: 55%;
    width: 100%;
    position:fixed;
  }
  .top{
    width: 92%;
    margin: 0 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #FFFFFF;
  }
  .button {
    background-color: #ED2856;
    color: #FFFFFF;
    margin: 10px 40px 10px 40px;
    border-radius: 50px;
  }
  .text {
    margin: 10px 5px;
    padding: 10px;
    text-align: left;
    color: #777;
    font-size: 24px;
  }
  .text2 {
    height: 70px;
    line-height: 70px;
  }
  .lineHigt {
    background-color: #F5F5F5;
    height: 5px;
    margin-top: 10px;
  }
</style>
