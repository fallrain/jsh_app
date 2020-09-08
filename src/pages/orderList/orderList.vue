<template>
  <view class="orList">
    <view class="padding-15">
      <view style="display:flex">
        <view style="width:320px">
        <j-tab :tabs="tabs" :hasRightSlot="true" @tabClick="tabClick">
          <template #right>
            <!-- <view @click="moreAction" class="jtabRight">
              MORE
            </view> -->
            <view  @click="moreAction" class="iconfont iconshaixuan"></view>
          </template>
        </j-tab>
        </view>
      </view>
      <order-list-item v-for="(iten,index) in orderListInfo" :key="index" :info="iten" :index="index" @goDetail="goDetail"></order-list-item>
    </view>
    <j-drawer
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"
    >
      <template>
        <view>222{{isShowGoodsFilterDrawer}}</view>
      </template>
    </j-drawer>
  </view>
</template>

<script>
import orderListItem from '../../components/orderList/order-list-item';
import JTab from '../../components/common/JTab';
import JDrawer from '../../components/form/JDrawer';

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
    JTab,
    JDrawer
  },
  data() {
    return {
      isShowGoodsFilterDrawer:false,
      orderListInfo: [],
      total: 0,
      pageNo: 1,
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
        },
         {
          id: 9,
          id2: '8',
          name: '待结算',
          active: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE
    }),
  },
  onLoad(options) {
    console.log(options);
    this.sexID = options.index * 1;
    console.log(this.tabs[this.sexID]);
  },
  created() {
    this.orderList(this.tabs[this.sexID].id2, this.pageNo);
    this.tabs.forEach((each) => {
      each.active = false;
    });
    this.tabs[this.sexID].active = true;
  },
  methods: {
    ...mapMutations([
      ORDER.UPDATE_ORDER
    ]),
    filterConfirm() {

    },
    filterReset() {

    },
    // 过滤条件
    moreAction() {
      console.log('==============')
      this.isShowGoodsFilterDrawer = true;
    },
    async orderList(e, pgNo) {
      const param = {
        jshi_order_channel: this.userInf.channelGroup,
        jshi_saleto_code: this.userInf.customerCode,
        orderStatusSelf: e,
        pageNo: pgNo,
        pageSize: 10
      };

      if(e == 8) {
        param.yjPay = "MFYJ";
      }

      const { code, data } = await this.orderService.orderList(param);
      if (code === '200') {
        this.orderListInfo = data.dataList;
        // 遍历循环
        for (let index = 0; index < this.orderListInfo.length; index++) {
          const element = this.orderListInfo[index];
          this.buttonLogicJudgmentAction(element.info,index)
        }
      }
      console.log('===========orderList==========='+e);
      console.log(data);
    },
    // 获取按钮显示的数据
    async buttonLogicJudgmentAction(param,index) {
      const { code, data } = await this.orderService.buttonLogicJudgment(param);
      if (code === '200') {
        var element = this.orderListInfo[index];
        element.btnsInfo = data
        this.orderListInfo[index] = element;
        console.log(this.orderListInfo)
        // this.buttonLogicJudgment = data;
        console.log('============')
        // console.log(this.buttonLogicJudgment)
        // console.log(this.invalidButton)
        // console.log(this.invalidButton)
    //     selfPayButton": "0",
		// "tctpConfirmButton": "0",
		// "orderNo": "2000426027",
		// "invalidButton": "0",
		// "estimateButton": "0",
    // "signInButton": "0"
//     tctpConfirmButton:统仓统配确认按钮
// orderNo:订单号
// invalidButton:订单作废按钮
// estimateButton:
// signInButton:"自主签收按
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
  .iconfont iconshaixuan{
    width: 116px;
    height: 74px;
    background: red;
    position: relative;
    display: flex;
    align-items: center;
  }
</style>
