<template>
  <view v-show="isShowAct">
    <view class="mask" @click="close"></view>
    <view class="popup">
      <view class="top" @click="close">
        <view style="color: #333333; font-size: 15px;">营销活动</view>
        <view style="color: #ED2856;">X</view>
      </view>
      <view class="sorrowC">
        <view class="lineHigt"></view>
        <view class="textTalRow" v-for="(act,indexA) in info" :key="act.name">
          <view class="uni-flex uni-row">
            <view class="text col-90 borderLeft">
              <view class="afterr">{{act.name}}</view>
            </view>
            <view class="text borderLeft iconfont iconxia"></view>
          </view>
          <view v-for="(ls,index) in act.list" :key="ls.name" class="textTalRow" @click="checkAct(indexA,index)">
            <view class="uni-flex uni-row textSenRow" :class="{'isNoCheck':!ls.isCheck,'isYesCheckTop':ls.isCheck}">
              <view class="textRow col-60">{{ls.num}}名称：TJ2020033333</view>
              <view class="textRow col-40">价格：¥ 5949.71</view>
            </view>
            <view class="uni-flex uni-row textSenRow" :class="{'isNoCheck':!ls.isCheck,'isYesCheckBot':ls.isCheck}">
              <view class="textRow col-40">有效期：2021-01-01</view>
              <view class="textRow col-25">直扣：0.00</view>
              <view class="textRow col-33">数量：0.00</view>
            </view>
          </view>
        </view>
        <view class="lineHigt"></view>
      </view>
      <view class="uni-flex uni-row">
        <view class="col-50">
          <input @click="putAct" disabled="disabled" class="button-left col-50" type="button" value="确定"/>
        </view>
        <view class="col-50">
          <input @click="refresh" disabled="disabled" class="button-right col-50" type="button" value="重置"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script scoped>
export default {
  name: 'proComAct',
  components: {
  },
  props: {// 父级传来的数据
    isShowAct: {// 页面是否显示
      type: Boolean,
      default: true
    },
    info: {// 数据
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      numberValue: 0
    };
  },
  methods: {
    close() {
      this.$emit('closeAct', 'close');
    },
    checkAct(a, b) { // 选择活动
      for (let i = 0; i < this.info.length; i++) {
        for (let j = 0; j < this.info[i].list.length; j++) {
          this.info[i].list[j].isCheck = false;
        }
      }
      console.log(a);
      console.log(b);
      this.info[a].list[b].isCheck = true;
      console.log(this.info);
    },
    putAct() { // 确认
      this.$emit('checkedAct', this.numberValue);
    },
    refresh() { // 重置

    }
  }
};
</script>
<style scoped>
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
    margin-top: -63%;
    z-index: 999;
    background-color: #ffffff;
    height: 70%;
    width: 100%;
    position:fixed;
  }
  .sorrowC{
    overflow-x: hidden;
    overflow-y: scroll;
    height: 80%;
  }
  .top{
    width: 92%;
    margin: 0 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #FFFFFF;
  }
  .button-left {
    float: right;
    width: 183px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    background-color: #ED2856;
    color: #FFFFFF;
    margin-top: 30px;
    margin-bottom: 20px;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
  }
  .button-right {
    width: 183px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    background-color: #F2F2F7;
    color: #666666;
    margin-top: 30px;
    margin-bottom: 20px;
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
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
    padding-bottom: 10px;
  }
  .textRow {
    text-align: left;
    font-size: 20px;
  }
  .lineHigt {
    background-color: #F0F0F0;
    height: 2px;
  }
  .isNoCheck {
    background-color: #F2F2F7;
    color: #999999;
  }
  .isYesCheckTop {
    background-color: #FFF5F7;
    color: #ED2856;
    border: 1px #ED2856 solid;
    border-bottom: none;
  }
  .isYesCheckBot {
    background-color: #FFF5F7;
    color: #ED2856;
    border: 1px #ED2856 solid;
    border-top: none;
  }
</style>
