<template>
  <view class="order-flow-con">
    <view class="order-flow-tou">订单信息</view>
    <view class="order-flow-line"></view>
    <view class="order-flow-steps">
      <view class="position-r" v-if="processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'||processJudgement.orderType==='4'">
        <view v-show="'1'===processJudgement.orderCreation" class="order-detail-judge1"></view><!--已经进行完成的流程-xian-->
        <view v-show="'0'===processJudgement.orderCreation" class="order-detail-judge2"></view><!--还未进行完成的流程-->
        <view v-show="'1'===processJudgement.orderCreation" class="order-detail-judge3"></view><!--圆点-->
        <view v-show="'0'===processJudgement.orderCreation" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.orderCreation" class="order-detail-judge5"></view><!--圆点对号白底-->
        <view v-show="'1'===processJudgement.orderCreation" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单创建</view>
          <view class="order-flow-steps__column-desc">创建时间：{{processJudgement.jshi_created_time}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'">
        <view v-show="'1'===processJudgement.orderReview" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.orderReview" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.orderReview" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.orderReview" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.orderReview" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.orderReview" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单评审</view>
          <view class="order-flow-steps__column-desc">评审时间：{{processJudgement.sap_judge_date}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'">
        <view v-show="'1'===processJudgement.factoryDelivery" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.factoryDelivery" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.factoryDelivery" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.factoryDelivery" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.factoryDelivery" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.factoryDelivery" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">工厂发货</view>
          <view class="order-flow-steps__column-desc">预计发货时间：{{processJudgement.sap_dn1date}}</view>
          <view class="order-flow-steps__column-desc">发货时间：{{processJudgement.sap_ptd_send_date}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='4'">
        <view v-show="'1'===processJudgement.centralShipment" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.centralShipment" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.centralShipment" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.centralShipment" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.centralShipment" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.centralShipment" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">中心发货</view>
          <view class="order-flow-steps__column-desc">发货时间：{{processJudgement.sap_dn5date}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='2'">
        <view v-show="'1'===processJudgement.centerEntry" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.centerEntry" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.centerEntry" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.centerEntry" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.centerEntry" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.centerEntry" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">中心入库</view>
          <view class="order-flow-steps__column-desc">入库时间：{{processJudgement.sap_center_recieve_date}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='2'||processJudgement.orderType==='3'">
        <view v-show="'1'===processJudgement.deduction" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.deduction" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.deduction" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.deduction" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.deduction" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.deduction" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">扣款</view>
          <view class="order-flow-steps__column-desc">扣款时间：{{processJudgement.jshi_pay_time}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'||processJudgement.orderType==='4'">
        <view v-show="'1'===processJudgement.customerSignIn" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.customerSignIn" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.customerSignIn" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.customerSignIn" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.customerSignIn" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.customerSignIn" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">订单签收</view>
          <view class="order-flow-steps__column-desc">预计到货时间：{{processJudgement.sap_reorder_date}}</view>
          <view class="order-flow-steps__column-desc">签收时间：{{processJudgement.jshi_plan_in_date}}</view>
        </view>
      </view>
      <view class="position-r" v-if="processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'||processJudgement.orderType==='4'">
        <view v-show="'1'===processJudgement.invoiceOpening" class="order-detail-judge1"></view>
        <view v-show="'0'===processJudgement.invoiceOpening" class="order-detail-judge2"></view>
        <view v-show="'1'===processJudgement.invoiceOpening" class="order-detail-judge3"></view>
        <view v-show="'0'===processJudgement.invoiceOpening" class="order-detail-judge4"></view>
        <view v-show="'1'===processJudgement.invoiceOpening" class="order-detail-judge5"></view>
        <view v-show="'1'===processJudgement.invoiceOpening" class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">发票开具</view>
          <view class="order-flow-steps__column-desc">金税开票时间：{{processJudgement.sap_sys_invoice_time}}</view>
          <view class="order-flow-steps__column-desc">开票时间：{{processJudgement.sap_tax_invoice_time  }}</view>
        </view>
      </view>
      <view class="position-r" v-if="(processJudgement.orderType==='1'||processJudgement.orderType==='2'||processJudgement.orderType==='3'||processJudgement.orderType==='4')&&processJudgement.toVoid==='1'">
        <view class="order-detail-judge1"></view>
        <view class="order-detail-judge5"></view>
        <view class="order-detail-judge6">
          <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
        </view>
        <view style="margin-left: 30px">
          <view class="order-flow-steps__column-title">作废</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniIcons
} from '@dcloudio/uni-ui';

export default {
  name: 'orderDetailFlow',
  components: {
    uniIcons
  },
  props: {
    processJudgement: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // orderType: '1', // 1 生产订单  2 信用  3 整车单据  4 库存订单  5 不属于上面的类型
      // orderCreation: '1', // 订单创建1234
      // orderReview: '1', // 订单评审123
      // centralShipment: '0', // 中心发货4
      // factoryDelivery: '0', // 工厂发货123
      // centerEntryTime: '0', // 中心入库时间2
      // deductionTime: '0', // 扣款时间23
      // customerSignIn: '0', // 客户签收1234
      // invoiceOpening: '0', // 发票开具1234
      // toVoid: '1', // 作废1234
      type: 1, // 1:五项；2：4项::::
      activeColor: '#ED2856'
    };
  }
};
</script>

<style scoped>
  .order-flow-con {
    border-radius: 20px;
    background-color: #FFFFFF;
    margin: 24px;
  }
  .order-flow-tou{
    color: #333333;
    font-size: 30px;
    padding: 24px;
  }
  .order-flow-line{
    background-color: #DBDBDB;
    height: 1px;
    margin-left: 20px;
  }
  .order-flow-steps {
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    padding: 50px;
  }
  .position-r {
    position: relative;
    padding-bottom: 20px;
  }
  .order-detail-judge1{
    height: 90%;
    width: 2px;
    background: #ED2856;
    position: absolute;
    left: 21px;
  }
  .order-detail-judge2{
    height: 90%;
    width: 2px;
    background: #DCDEE0;
    position: absolute;
    left: 21px;
  }
  .order-detail-judge3{
    height: 16px;
    width: 16px;
    background: #ED2856;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge4{
    height: 16px;
    width: 16px;
    background: #DCDEE0;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge5{
    height: 18px;
    width: 18px;
    background: #FFffff;
    position: absolute;
    left: 14px;
    border-radius: 7px;
  }
  .order-detail-judge6{
    position: absolute;
    top:-20px;
    left: 8px;
  }
  .order-flow-steps__column-title {
    font-size: 28px;
    text-align: left;
    color: #333333;
    padding-bottom: 10px;
  }
  .order-flow-steps__column-desc {
    font-size: 24px;
    text-align: left;
    color: #999999;
    padding-bottom: 10px;
  }

</style>
