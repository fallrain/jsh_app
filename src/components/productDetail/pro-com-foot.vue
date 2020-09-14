<template>
  <view class="proCom-foot-con">
    <view class="proCom-foot-line">
      <view class="col-25 proCom-foot-inf" @click="goCarList">
        <view class="proCom-foot-shoppingCart iconfont icongouwuchezhengpin"></view>
        <view class="proCom-foot-shoppingCart-text">购物车</view>
      </view>
<!--      (info.isSale && !info.isflash)||(!info.isSale&&info.isSaleLe)-->
      <view v-if="info.isSale ||(!info.isSale&&info.isSaleLe)" class="proCom-foot-inf2" @click="putcar">
        <view class="proCom-foot-inf3">加入购物车</view>
      </view>
<!--      !info.isSale&&!info.isSaleLe || info.isflash   -->
      <view v-if="!info.isSale&&!info.isSaleLe" class="proCom-foot-inf2">
        <view class="proCom-foot-inf4">加入购物车</view>
      </view>
      <view v-show="info.isActi" class="proCom-foot-inf2" @click="putplay">
        <view :class="{'proCom-foot-inf5':0<1,'proCom-foot-inf6':1<1}">参加活动</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'proComFoot',
  props: {// 父级传来的数据
    info: {// 是否显示图标以及图标变色问题
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goCarList() {
      this.$emit('goCarList');
    },
    putcar() {
      this.$emit('putcar');
      console.log(2);
    },
    putplay() {
      this.$emit('putplay');
    }
  }
};
</script>

<style scoped>
  .proCom-foot-con {
    border-top:  1px solid #CDCDCD;
    height: 88px;
  }
  .proCom-foot-line{
    position: relative;
    display: flex;
    margin: auto;
  }
  .proCom-foot-shoppingCart{
    color: #ED2856;
    font-size: 50px;
    padding-left: 4px;
  }
  .proCom-foot-shoppingCart-text{
    position: absolute;
    padding-top: 50px;
    font-size: 24px;
    color: #ED2856;
    font-weight:400;
  }
  .proCom-foot-inf {
    display: flex;
    padding-left: 10%;
    margin-right: 30px;
  }
  .proCom-foot-inf2 {
    display: flex;
    font-size: 28px;
    padding-top: 12px;
    width: 260px;
  }
  .proCom-foot-inf3 {
    background-color: #ED2856;
    color: #FFFFFF;
    border-radius: 28px;
    padding: 10px;
    width: 220px;
    text-align: center;
  }
  .proCom-foot-inf4 {
    background-color: #999;
    color: #FFFFFF;
    border-radius: 28px;
    padding: 10px;
    width: 220px;
    text-align: center;
  }
  .proCom-foot-inf5 {
    background-color: #F5A623;
    color: #FFFFFF;
    border-radius: 28px;
    padding: 10px;
    width: 220px;
    text-align: center
  }

</style>
