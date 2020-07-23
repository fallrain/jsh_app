<template>
  <view class="orList">
    <view class="padding-8">
      <view><j-tab :tabs="tabs" :hasRightSlot="true" @tabClick="tabClick"></j-tab></view>
      <order-list-item v-for="(iten,index) in productList" :key="index" :info="iten" :index="index" @goDetail="goDetail"></order-list-item>
    </view>
  </view>
</template>

<script>
import orderListItem from '../../components/orderList/order-list-item';
import JTab from '../../components/common/JTab';

export default {
  name: 'orderList',
  components: {
    orderListItem,
    JTab
  },
  data() {
    return {
      productList: [{ name: '111' }, { name: '121' }, { name: '131' }],
      tabs: [
        {
          id: 'qbdn',
          name: '全部订单',
          active: true
        },
        {
          id: 'dkk',
          name: '待扣款',
          active: false
        },
        {
          id: 'dfh',
          name: '待发货',
          active: false
        },
        {
          id: 'yfh',
          name: '已发货',
          active: false
        },
        {
          id: 'yqs',
          name: '已签收',
          active: false
        },
        {
          id: 'ykp',
          name: '已开票',
          active: false
        },
        {
          id: 'yqx',
          name: '已取消',
          active: false
        },
        {
          id: 'wljd',
          name: '物流拒单',
          active: false
        },
        {
          id: 'thdd',
          name: '退货订单',
          active: false
        }
      ],
    };
  },
  methods: {
    goDetail(e) {
      uni.navigateTo({
        url: '/pages/orderList/orderDetail?id=1&name=uniapp'
      });
      console.log(e);
    },
    tabClick(e) {
      this.tabs = e;
      console.log(e);
    }
  }
};
</script>

<style scoped>
  .orList{
    background: #F5F5F5;
  }
</style>
