<template>
  <view>
    <j-goods-item
      v-for="(item,index) in list"
      :key="index"
      :goods="item"
    ></j-goods-item>
  </view>
</template>

<script>
import JGoodsItem from '../../components/goods/JGoodsItem';

export default {
  name: 'goodsList',
  components: {
    JGoodsItem
  },
  data() {
    return {
      list: [
        {
          goodsName: '海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高品质滚筒洗衣机……'
        },
        {
          goodsName: '海尔BCD-123123家用250L对开门冰箱  高品质除菌保鲜只能无氟速冻冰箱……'
        },
        {
          goodsName: '海尔BCD-123123家用250L对开门冰箱  高品质除菌保鲜只能无氟速冻冰箱……'
        },
        {
          goodsName: '海尔BCD-123123家用250L对开门冰箱  高品质除菌保鲜只能无氟速冻冰箱……'
        },
        {
          goodsName: '海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高品质滚筒洗衣机……'
        },
        {
          goodsName: '海尔BCD-123123家用250L对开门冰箱  高品质除菌保鲜只能无氟速冻冰箱……'
        },
        {
          goodsName: '海尔BCD-123123家用250L对开门冰箱  高品质除菌保鲜只能无氟速冻冰箱……'
        }
      ]
    };
  }
};
</script>

<style>

</style>
