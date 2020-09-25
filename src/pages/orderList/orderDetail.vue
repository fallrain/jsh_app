<template>
  <view>
    <view class="background-one">
      <view class="orderDetail-head">
        <view class="">
          <view class="orderDetail-head-one">{{infoList.info.selfUseOrderStatus}}</view>
          <view class="orderDetail-head-two">发货时间：{{infoList.info.sap_dn5date}}</view>
          <view class="orderDetail-head-two">预计到货日期：{{infoList.info.jshi_plan_in_date}}</view>
        </view>
        <view class="orderDetail-head-img">
          <image src="@/assets/img/orderDetail/car.png" style="width: 100%;height: 100%;margin-top: 5px;"></image>
        </view>
      </view>
      <view>
        <order-detail-address :addressInfo="infoList.info"></order-detail-address>
      </view>
    </view>
    <view class="background-two">
      <view>
        <order-detail-info :info="infoList"></order-detail-info>
      </view>
      <view>
        <order-detail-base :baseInfo="infoList.info" :details="infoList.details[0]" ></order-detail-base>
      </view>
      <view>
        <order-detail-flow :showTPL="showTPL" :processJudgement="processJudgement"></order-detail-flow>
      </view>
      <view class="order-detail-fot-high"></view>
      <view class="orderDetail-foot">
        <order-detail-foot
          :infoList="infoList"
        ></order-detail-foot>
      </view>
    </view>
  </view>
</template>

<script>
import orderDetailAddress from '../../components/orderList/order-detail-address';
import orderDetailInfo from '../../components/orderList/order-detail-info';
import orderDetailBase from '../../components/orderList/order-detail-base';
import orderDetailFlow from '../../components/orderList/order-detail-flow';
import orderDetailFoot from '../../components/orderList/order-detail-foot';
import {
  ORDER, USER
} from '../../store/mutationsTypes';
import {
  mapGetters
} from 'vuex';

export default {
  name: 'orderDetail',
  components: {
    orderDetailAddress,
    orderDetailInfo,
    orderDetailBase,
    orderDetailFlow,
    orderDetailFoot
  },
  data() {
    return {
      showTPL: false,
      infoList: {},
      processJudgement: {
        outFactoryStatus: []
      } // 物流信息
    };
  },
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
    ...mapGetters({
      saleInfo: USER.GET_SALE
    }),
  },
  onLoad(options) {
    if (options.orderDetail) {
      this.infoList = JSON.parse(options.orderDetail);
    }
    console.log(this.infoList);
    this.getOrderTPL();
    /* this.processJudgement = JSON.parse(this.infoList.info.processJudgement);
    this.processJudgement.jshi_created_time = this.infoList.info.jshi_created_time;
    this.processJudgement.sap_judge_date = this.infoList.info.sap_judge_date;
    this.processJudgement.sap_dn1date = this.infoList.info.sap_dn1date;
    this.processJudgement.sap_ptd_send_date = this.infoList.info.sap_ptd_send_date;
    this.processJudgement.sap_dn5date = this.infoList.info.sap_dn5date;
    this.processJudgement.sap_center_recieve_date = this.infoList.info.sap_center_recieve_date;
    this.processJudgement.jshi_pay_time = this.infoList.info.jshi_pay_time;
    this.processJudgement.sap_reorder_date = this.infoList.info.sap_reorder_date;
    this.processJudgement.jshi_plan_in_date = this.infoList.info.jshi_plan_in_date;
    this.processJudgement.sap_sys_invoice_time = this.infoList.info.sap_sys_invoice_time;
    this.processJudgement.sap_tax_invoice_time = this.infoList.info.sap_tax_invoice_time; */
  },
  methods: {
    getOrderTPL() {
      const that = this;
      const url = 'http://testhaier.jushanghui.com/bspfront/order/orderTPL';
      const token = uni.getStorageSync('token');
      const orderID = this.infoList.info.bstnk;
      // const orderID = 'QFA1400600133';
      const userid = this.saleInfo.customerCode;
      uni.request({
        url,
        method: 'POST',
        data: {
          systemId: '365AppNew',
          orderID,
          userid
        },
        success(response) {
          if (response.data.code === '200') {
            that.processJudgement = response.data.data.orderxq;
          }
          that.showTPL = true;
        },
        fail(e) {
          let msg = '请求失败';
          if (e && e.errMsg && e.errMsg === 'request:fail timeout') {
            msg = '请求超时';
          }
          uni.showToast({
            titele: msg,
            icon: 'none'
          });
        }
      });
    }
  }
};
</script>

<style scoped>
  .background-one{
    margin-top: -4px;
    height: 100%;
    background: linear-gradient(to bottom, #ED2856 60%, #F5F5F5 40%);
  }
  .order-detail-line {
    margin-top: -24px;
    margin-bottom: -30px;
    height: 40px;
    background-color: #F5F5F5;
    z-index: -1;
  }
  .background-two{
    height: 100%;
    background: #F5F5F5;
    padding-top: 1px;
  }
  .orderDetail-head {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px 20px 20px 80px;
  }
  .orderDetail-head-img {
    margin-left: 60px;
    flex-shrink: 0;
    width: 190px;
    height: 170px;
  }
  .orderDetail-head-one {
    color: #FFFFFF;
    font-size: 34px;
    margin-bottom: 20px;
    font-weight:300;
  }
  .orderDetail-head-two {
    color: #FFFFFF;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight:300;
  }
  .order-detail-fot-high {
    background-color: #F5F5F5;
    height: 94px;
  }
  .orderDetail-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
    background-color: #FFFFFF;
  }
</style>
