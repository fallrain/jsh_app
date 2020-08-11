<template>
  <view class="orderConfirm">
    <j-order-confirm-address
      :sendtoCode="dataInfo.sendtoCode"
      :sendtoAddress="dataInfo.sendtoAddress"
    ></j-order-confirm-address>
    <view v-if="dataInfo.composeProductList" class="orderConfirm-list">
      <j-order-confirm-item
        v-for="(goods,index) in composeProductList"
        :key="index"
        :index="index"
        @change="goodsChange"
        :goodsList="goods"
      ></j-order-confirm-item>
    </view>
    <view v-if="dataInfo.disableComposeProductList" class="mt24">
      <j-failure-order-item
        :goodsList="disableComposeProductList"
      ></j-failure-order-item>
    </view>
    <view class="mt24">
      <j-overage-pay
      ></j-overage-pay>
    </view>
    <view class="orderConfirm-btm j-flex-aic">
      <view class="orderConfirm-btm-text">实付总额：</view>
      <view class="orderConfirm-btm-price">¥22383945.12</view>
      <button
        type="button"
        class="orderConfirm-btm-btn ml20"
        @tap="showPayer"
      >下一步</button>
    </view>
    <j-pop-picker
      title="付款方"
      :show.sync="payerPickerShow"
      :options="payerOptions"
      :choseOptions.sync="chosePayerOptions"
    ></j-pop-picker>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import JOrderConfirmItem from '../../components/shoppingCart/JOrderConfirmItem';
import JFailureOrderItem from '../../components/shoppingCart/JFailureOrderItem';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import JPopPicker from '../../components/form/JPopPicker';
import './css/orderConfirm.scss';


export default {
  name: 'orderConfirm',
  components: {
    JPopPicker,
    JOveragePay,
    JFailureOrderItem,
    JOrderConfirmItem,
    JOrderConfirmAddress
  },
  data() {
    return {
      // 结算接口返回数据
      dataInfo: {
        sendtoCode: '8700010462',
        saletoCode: '8700010462',
        sendtoAddress: '漯河市源汇区五一路南段开源物流',
        lastPayDate: '2020-08-11 18:26:22',
        totalMoney: 1250.0,
        totalPreMoney: 0,
        composeProductList: [{
          composeId: '1445944',
          composeOrderNo: '20200811175620639452',
          activityId: 25632682221,
          yjBigVersion: null,
          activityName: '43U1六月通过套餐开单',
          crowdFundingFlag: null,
          intentionMoney: null,
          activityType: '3',
          yunCangType: '',
          yunCangCode: '',
          number: 1,
          totalMoney: 1250.0,
          totalPreAmount: 0,
          composeEnable: 1,
          composeEnableMsg: null,
          productRatio: null,
          splitProductDtoList: null,
          splitOrderDetailList: [{
            orderNo: '601499638',
            orderNoSeq: 1499638,
            placeOrderSeq: 1,
            planInDate: '2020-08-13',
            totalMoney: 1250.0,
            storeCode: 'LH',
            sellFactory: null,
            relSaleFactory: null,
            sellOrganization: '2110',
            whCode: 'LHS2',
            storeType: '1',
            stockType: '1',
            isHaveWdLevel: false,
            stockTypeName: '日日顺库存',
            isTCTP: true,
            enable: null,
            enableMsg: null,
            splitOrderProductList: [{
              composeId: null,
              productCode: 'DH1WD1A34',
              productName: '海尔平板电视43U1',
              productModel: '43U1',
              productBrand: '000',
              productGroup: 'EA',
              unit: 'TAI',
              productSeries: '',
              number: 1,
              farWeek: '0',
              creditModel: '0',
              isCheckCreditModel: '0',
              kuanXian: null,
              isCheckKuanXian: null,
              isCheckFarWeek: '0',
              farWeekDate: null,
              price: 1250.0,
              productImageUrl: 'http://file.c.haier.net/docs/2020/05/22/d23cddf8cf691554e61a684985b79a78.png75',
              totalMoney: 1250.0,
              priceInfo: {
                productCode: 'DH1WD1A34',
                priceType: 'TJ',
                versionCode: '114805',
                price: 1250.0,
                supplyPrice: 1398.0,
                profitPrice: 1250.0,
                invoicePrice: 1250.0,
                rebateRate: 0,
                discountRate: 0,
                discount: 0,
                rebateMoney: 0,
                usableQty: 2735,
                rebatePolicy: 1,
                perLoss: null,
                machineCode: null,
                difference: 0.0,
                recommendsalePrice: null,
                endDate: '2020-08-31',
                deliveryAddr: null,
                invLocation: null
              },
              transferVersion: '',
              isTransferVersion: '0',
              priceType: 'TJ',
              priceVersion: '114805',
              saleModelList: ['1', '2', '3', '4', '5', '6'],
              productEnable: 1,
              productEnableMsg: null,
              isBbOrProject: false,
              priceSource: null,
              ylhCode: null,
              storeNum: 1,
              stockType: null,
              stockTypeName: null,
              storeType: '1',
              isScf: '0',
              isStock: '1',
              province: null,
              city: null,
              area: null,
              address: null,
              isEcdemic: null,
              deliveryWarehouseType: null,
              deliveryYd: null
            }],
            preAmount: null
          }]
        }],
        disableComposeProductList: []
      },
      goodsList: [
        [
          {
            isCreditMode: false
          },
          {
            isCreditMode: false
          }
        ]
      ],
      failureGoodsList: [
        [
          {
            isCreditMode: false
          },
          {
            isCreditMode: false
          }
        ]
      ],
      // 配送地址显示隐藏
      payerPickerShow: false,
      // 配送地址options
      payerOptions: [
        {
          key: 1,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 2,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 3,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 4,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        }
      ],
      // 选中的
      chosePayerOptions: []
    };
  },
  methods: {
    goodsChange(list, index) {
      /* 商品 change */
      this.$set(this.goodsList, index, list);
    },
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    }
  }
};
</script>
