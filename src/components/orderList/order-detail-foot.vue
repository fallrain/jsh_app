<template>
  <view class="order-foot-con">
    <view class="uni-flex uni-row order-foot-line">
      <view class="col-25 order-foot-inf" @click="getMore">...</view>
      <view v-for="item in buttonList" :key="item.name">
        <view class="order-foot-inf2" @click="ckickBot(item)">
          <view :class="{'order-foot-inf4':!item.ischeck,'order-foot-inf5':item.ischeck}">{{item.name}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'orderDetailFoot',
  data() {
    return {
      buttonList: [
        { name: '查看物流', ischeck: false },
        { name: '订单节点', ischeck: false },
        { name: '签收', ischeck: true }
      ]
    };
  },
  methods: {
    ckickBot() {
      // this.buttonList.forEach((v) => {
      //   v.ischeck = false;
      // });
      // e.ischeck = !e.ischeck;
    }
  }
};
</script>

<style scoped>
  .order-foot-con {
    border-top:  1px solid #CDCDCD;
    height: 88px;
  }
  .order-foot-line{
    position: relative;
    display: flex;
    margin: auto;
  }
  .order-foot-inf {
    display: flex;
    color: #999999;
    font-size: 50px;
    padding-left: 10%;
  }
  .order-foot-inf2 {
    display: flex;
    font-size: 28px;
    padding-top: 12px;
    width: 180px;
  }
  .order-foot-inf4 {
    color: #666666;
    border:  1px solid #DADADA;
    border-radius: 28px;
    padding: 10px;
    width: 160px;
    text-align: center;
  }
  .order-foot-inf5 {
    background-color: #ED2856;
    color: #FFFFFF;
    border:  1px solid #ED2856;
    border-radius: 28px;
    padding: 10px;
    width: 160px;
    text-align: center
  }

</style>
