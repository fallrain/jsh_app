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
import {
  ORDER,
  USER
} from '../../store/mutationsTypes';
import {
  mapMutations,
  mapGetters
} from 'vuex';

export default {
  name: 'orderList',
  components: {
    orderListItem,
    JTab
  },
  onLoad(options) {
    this.sexID = options.sexID;
    console.log(options.sexID);
  },
  data() {
    return {
      orderListInfo: [],
      tabs: [
        {
          id: 0,
          id2: 7,
          name: '全部订单',
          active: true
        },
        {
          id: 1,
          id2: 0,
          name: '待扣款',
          active: false
        },
        {
          id: 2,
          id2: 1,
          name: '待发货',
          active: false
        },
        {
          id: 3,
          id2: 2,
          name: '已发货',
          active: false
        },
        {
          id: 4,
          id2: 3,
          name: '已签收',
          active: false
        },
        {
          id: 5,
          id2: 5,
          name: '已开票',
          active: false
        },
        {
          id: 6,
          id2: 6,
          name: '已取消',
          active: false
        },
        {
          id: 7,
          id2: 8,
          name: '物流拒单',
          active: false
        },
        {
          id: 8,
          id2: '7',
          name: '退货订单',
          active: false
        }
      ],
      total: 0,
      pageNo: 1
    };
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  created() {
    const ind = (this.sexID !== undefined && this.sexID !== null) ? this.sexID : 0;
    this.orderList(this.tabs[ind].id2, this.pageNo);
  },
  methods: {
    ...mapMutations([
      ORDER.UPDATE_ORDER
    ]),
    async orderList(e, pgNo) {
      const { code, data } = await this.orderService.orderList({
        jshi_order_channel: this.userInf.channelGroup,
        jshi_saleto_code: this.userInf.customerCode,
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
        url: '/pages/orderList/orderDetail'
      });
    },
    tabClick(e) {
      this.tabs = e;
      console.log(e);
      this.tabs.forEach((each) => {
        if (each.active) {
          this.orderList(each.id2, this.pageNo);
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
