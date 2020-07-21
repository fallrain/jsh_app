<template>
  <view class="orList">
    <view class="padding-8">
      <view>111</view>
      <order-list-item v-for="(iten,index) in productList" :key="index" :info="iten" :index="index"></order-list-item>
    </view>
  </view>
</template>

<script>
import orderListItem from '../../components/orderList/order-list-item';

export default {
  name: 'orderList',
  components: {
    orderListItem
  },
  data() {
    return {
      productList: [{ name: '111' }, { name: '121' }, { name: '131' }]
    };
  }
};
</script>

<style scoped>
  .orList{
    background: #F5F5F5;
  }
</style>
