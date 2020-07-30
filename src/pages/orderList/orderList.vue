<template>
  <view class="orList">
    <view class="padding-15">
      <view><j-tab :tabs="tabs" :hasRightSlot="true" @tabClick="tabClick"></j-tab></view>
      <order-list-item v-for="(iten,index) in orderListInfo" :key="index" :info="iten" :index="index" @goDetail="goDetail"></order-list-item>
    </view>
  </view>
</template>

<script>
import orderListItem from '../../components/orderList/order-list-item';
import JTab from '../../components/common/JTab';
import { ORDER } from '../../store/mutationsTypes';
import { mapMutations } from 'vuex';

export default {
  name: 'orderList',
  components: {
    orderListItem,
    JTab
  },
  data() {
    return {
      orderListInfo: [{ name: '111' }, { name: '121' }, { name: '131' }],
      tabs: [
        {
          id: 7,
          name: '全部订单',
          active: true
        },
        {
          id: 0,
          name: '待扣款',
          active: false
        },
        {
          id: 1,
          name: '待发货',
          active: false
        },
        {
          id: 2,
          name: '已发货',
          active: false
        },
        {
          id: 3,
          name: '已签收',
          active: false
        },
        {
          id: 5,
          name: '已开票',
          active: false
        },
        {
          id: 6,
          name: '已取消',
          active: false
        },
        {
          id: 8,
          name: '物流拒单',
          active: false
        },
        {
          id: '7',
          name: '退货订单',
          active: false
        }
      ],
      total: 0,
      pageNo: 1
    };
  },
  created() {
    this.orderList(7, this.pageNo);
  },
  methods: {
    ...mapMutations([
      ORDER.UPDATE_ORDER
    ]),
    async orderList(e, pgNo) {
      const { code, data } = await this.orderServer.orderList({
        jshi_order_channel: 'ZY',
        jshi_saleto_code: '8800012497',
        orderStatusSelf: e,
        pageNo: pgNo,
        pageSize: 10
      });
      if (code === '200') {
        this.orderListInfo = data.dataList;
      }
      console.log(data);
    },
    goDetail(e) {
      console.log(e);
      this[ORDER.UPDATE_ORDER]({
        orderDetail: this.orderListInfo[e]
      });
      uni.navigateTo({
        url: `/pages/orderList/orderDetail?id=${this.orderListInfo[e]}`
      });
    },
    tabClick(e) {
      this.tabs = e;
      console.log(e);
      this.tabs.forEach((each) => {
        if (each.active) {
          this.orderList(each.id, this.pageNo);
        }
      });
    }
  }
};
</script>

<style scoped>
  .orList{
    background: #F5F5F5;
  }
</style>
