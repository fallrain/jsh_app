<template>
  <view v-show="isMessage">
    <p style="height: 10px;"><span class="sanjiao"></span></p>
    <view class="background" >
      <view v-for="(item,index) in list">
        <view @tap="goMessage(item,index)" class="v_More_text">{{item.typeNameShow}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'messageInfoListMore',
  props: {
    isMessage: {
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
  data() {
    return {
      list: [
        { typeNameShow: '全部消息' },
        { typeName: 'typeName', typeNameShow: '其他' },
        { typeName: '扣款成功提醒', typeNameShow: '扣款提醒' },
        { typeName: '经营分析报告', typeNameShow: '经营分析' },
        { typeName: '到货提醒', typeNameShow: '到货提醒' },
        { typeName: '样机管理样机到期可销售通知', typeNameShow: '样机管理' },
        { typeName: '订单详情', typeNameShow: '订单详情' },
        { typeName: '建店押金缴纳', typeNameShow: '建店押金' },
        { typeName: '订单作废', typeNameShow: '订单作废' },
        { typeName: '返利不良品', typeNameShow: '返利兑现' },
        { typeName: '发票签收', typeNameShow: '发票签收' },
        { typeName: '短消息', typeNameShow: '短消息' },
        { typeName: '整车订单提醒', typeNameShow: '整车提醒' },
        { typeName: '电子签章', typeNameShow: '电子签章' }
      ]
    };
  },
  methods: {
    goMessage(item, index) {
      this.$emit('messageName', item, index);
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
