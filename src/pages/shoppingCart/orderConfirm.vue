<template>
  <view class="orderConfirm">
    <j-order-confirm-address
      :sendtoCode="dataInfo.sendtoCode"
      :sendtoAddress="dataInfo.sendtoAddress"
    ></j-order-confirm-address>
    <view v-if="dataInfo.composeProductList" class="orderConfirm-list">
      <j-order-confirm-item
        v-for="(orderItem,index) in dataInfo.composeProductList"
        :key="index"
        :index="index"
        @change="goodsChange"
        @payerMoneyInfo="dealPayerMoneyInfo"
        :orderItem="orderItem"
        :payInfoData.sync="payInfoData"
      ></j-order-confirm-item>
    </view>
    <view v-if="dataInfo.disableComposeProductList" class="mt24">
      <j-failure-order-item
        v-for="(orderItem,index) in dataInfo.composeProductList"
        :key="index"
        :index="index"
        :orderItem="orderItem"
      ></j-failure-order-item>
    </view>
    <view class="mt24">
      <j-overage-pay
        :payerMoneyList="payerMoneyList"
      ></j-overage-pay>
    </view>
    <view class="orderConfirm-btm j-flex-aic">
      <view class="orderConfirm-btm-text">实付总额：</view>
      <view class="orderConfirm-btm-price">¥{{dataInfo.totalMoney}}</view>
      <button
        type="button"
        class="orderConfirm-btm-btn ml20"
        @tap="showPayer"
      >下一步</button>
    </view>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import JOrderConfirmItem from '../../components/shoppingCart/JOrderConfirmItem';
import JFailureOrderItem from '../../components/shoppingCart/JFailureOrderItem';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import './css/orderConfirm.scss';


export default {
  name: 'orderConfirm',
  components: {
    JOveragePay,
    JFailureOrderItem,
    JOrderConfirmItem,
    JOrderConfirmAddress
  },
  data() {
    return {
      // 结算接口返回数据
      dataInfo: {
        sendtoCode: '8800101954',
        saletoCode: '8800101954',
        sendtoAddress: '测试账号',
        lastPayDate: '2020-08-12 14:45:01',
        totalMoney: 13094.60,
        totalPreMoney: 0,
        composeProductList: [
          {
            composeId: '11121',
            composeOrderNo: '20200812141459345262',
            activityId: null,
            yjBigVersion: null,
            activityName: null,
            crowdFundingFlag: null,
            intentionMoney: null,
            activityType: '1',
            yunCangType: '',
            yunCangCode: '',
            number: 10,
            totalMoney: 5095.60,
            totalPreAmount: 0,
            composeEnable: 1,
            composeEnableMsg: null,
            productRatio: null,
            splitProductDtoList: null,
            splitOrderDetailList: [
              {
                orderNo: '601334560',
                orderNoSeq: 1334560,
                placeOrderSeq: 1,
                planInDate: '2020-08-15',
                totalMoney: 2038.24,
                storeCode: 'WF',
                sellFactory: '2002',
                relSaleFactory: null,
                sellOrganization: '2130',
                whCode: 'WFU1',
                storeType: '3',
                stockType: '2',
                isHaveWdLevel: false,
                stockTypeName: 'TC库存',
                isTCTP: true,
                enable: null,
                enableMsg: null,
                splitOrderProductList: [
                  {
                    spareAddress: {},
                    composeId: null,
                    productCode: 'CEAAJU017',
                    productName: '卡萨帝滚筒洗衣机C1 D12G3LU1新欧卡',
                    productModel: 'C1 D12G3LU1',
                    productBrand: '051',
                    productGroup: 'DB',
                    unit: 'TAI',
                    productSeries: '',
                    number: 10,
                    farWeek: '0',
                    creditModel: '0',
                    isCheckCreditModel: '0',
                    kuanXian: null,
                    isCheckKuanXian: null,
                    isCheckFarWeek: '0',
                    farWeekDate: null,
                    price: 509.56,
                    productImageUrl: 'https://file.c.haier.net/docs/2019/01/03/55426c4656305b97d306c31c896bf97d.png75',
                    totalMoney: 2038.24,
                    priceInfo: {
                      productCode: 'CEAAJU017',
                      priceType: 'YJCY',
                      versionCode: 'ZK20200226173738261',
                      price: 3919.71,
                      supplyPrice: 9999.0,
                      profitPrice: 4960.0,
                      invoicePrice: 509.56,
                      rebateRate: 0,
                      discountRate: 0.87,
                      discount: 0.87,
                      rebateMoney: 0,
                      usableQty: 33,
                      rebatePolicy: 1,
                      perLoss: null,
                      machineCode: null,
                      difference: null,
                      recommendsalePrice: null,
                      endDate: '2021-01-01',
                      deliveryAddr: null,
                      invLocation: null
                    },
                    transferVersion: '',
                    isTransferVersion: '0',
                    priceType: 'YJCY',
                    priceVersion: 'ZK20200226173738261',
                    saleModelList: null,
                    productEnable: 1,
                    productEnableMsg: null,
                    isBbOrProject: false,
                    priceSource: null,
                    ylhCode: null,
                    storeNum: 4,
                    stockType: null,
                    stockTypeName: null,
                    storeType: '3',
                    isScf: '0',
                    isStock: '1',
                    province: null,
                    city: null,
                    area: null,
                    address: null,
                    isEcdemic: null,
                    deliveryWarehouseType: null,
                    deliveryYd: null
                  }
                ],
                preAmount: null
              },
              {
                orderNo: '601334561',
                orderNoSeq: 1334561,
                placeOrderSeq: 2,
                planInDate: '2020-09-04',
                totalMoney: 3057.36,
                storeCode: null,
                sellFactory: null,
                relSaleFactory: null,
                sellOrganization: '2130',
                whCode: 'JO81',
                storeType: null,
                stockType: '7',
                isHaveWdLevel: true,
                stockTypeName: '周承诺',
                isTCTP: true,
                enable: null,
                enableMsg: null,
                splitOrderProductList: [{
                  spareAddress: {},
                  composeId: null,
                  productCode: 'CEAAJU017',
                  productName: '卡萨帝滚筒洗衣机C1 D12G3LU1新欧卡',
                  productModel: 'C1 D12G3LU1',
                  productBrand: '051',
                  productGroup: 'DB',
                  unit: 'TAI',
                  productSeries: '',
                  number: 10,
                  farWeek: '0',
                  creditModel: '0',
                  isCheckCreditModel: '0',
                  kuanXian: null,
                  isCheckKuanXian: null,
                  isCheckFarWeek: '0',
                  farWeekDate: null,
                  price: 509.56,
                  productImageUrl: 'https://file.c.haier.net/docs/2019/01/03/55426c4656305b97d306c31c896bf97d.png75',
                  totalMoney: 3057.36,
                  priceInfo: {
                    productCode: 'CEAAJU017',
                    priceType: 'YJCY',
                    versionCode: 'ZK20200226173738261',
                    price: 3919.71,
                    supplyPrice: 9999.0,
                    profitPrice: 4960.0,
                    invoicePrice: 509.56,
                    rebateRate: 0,
                    discountRate: 0.87,
                    discount: 0.87,
                    rebateMoney: 0,
                    usableQty: 33,
                    rebatePolicy: 1,
                    perLoss: null,
                    machineCode: null,
                    difference: null,
                    recommendsalePrice: null,
                    endDate: '2021-01-01',
                    deliveryAddr: null,
                    invLocation: null
                  },
                  transferVersion: '',
                  isTransferVersion: '0',
                  priceType: 'YJCY',
                  priceVersion: 'ZK20200226173738261',
                  saleModelList: null,
                  productEnable: 1,
                  productEnableMsg: null,
                  isBbOrProject: false,
                  priceSource: null,
                  ylhCode: null,
                  storeNum: 6,
                  stockType: null,
                  stockTypeName: null,
                  storeType: null,
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
              }
            ]
          },
          {
            composeId: '11119',
            composeOrderNo: '20200812141459240155',
            activityId: null,
            yjBigVersion: null,
            activityName: null,
            crowdFundingFlag: null,
            intentionMoney: null,
            activityType: '1',
            yunCangType: '',
            yunCangCode: '',
            number: 1,
            totalMoney: 7999.00,
            totalPreAmount: 0,
            composeEnable: 1,
            composeEnableMsg: null,
            productRatio: null,
            splitProductDtoList: null,
            splitOrderDetailList: [
              {
                orderNo: '601334562',
                orderNoSeq: 1334562,
                placeOrderSeq: 1,
                planInDate: '2020-09-04',
                totalMoney: 7999.00,
                storeCode: null,
                sellFactory: null,
                relSaleFactory: null,
                sellOrganization: '2130',
                whCode: 'JO81',
                storeType: null,
                stockType: '30',
                isHaveWdLevel: true,
                stockTypeName: '款先直发',
                isTCTP: true,
                enable: null,
                enableMsg: null,
                splitOrderProductList: [{
                  spareAddress: {},
                  composeId: null,
                  productCode: 'FA08F000M',
                  productName: '卡萨帝中式洗碗机CW9-B88U1',
                  productModel: 'CW9-B88U1',
                  productBrand: '051',
                  productGroup: 'GG',
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
                  price: 7999.00,
                  productImageUrl: 'https://file.c.haier.net/docs/2018/12/04/99031fd7eaad42882240064f0813dcfd.png75',
                  totalMoney: 7999.00,
                  priceInfo: {
                    productCode: 'FA08F000M',
                    priceType: 'PT',
                    versionCode: null,
                    price: 7999.00,
                    supplyPrice: 7999.00,
                    profitPrice: 3760.00,
                    invoicePrice: 7999.00,
                    rebateRate: 0,
                    discountRate: 0,
                    discount: 0,
                    rebateMoney: 0,
                    usableQty: null,
                    rebatePolicy: 0,
                    perLoss: null,
                    machineCode: null,
                    difference: null,
                    recommendsalePrice: null,
                    endDate: null,
                    deliveryAddr: null,
                    invLocation: null
                  },
                  transferVersion: '',
                  isTransferVersion: '0',
                  priceType: 'PT',
                  priceVersion: null,
                  saleModelList: null,
                  productEnable: 1,
                  productEnableMsg: null,
                  isBbOrProject: true,
                  priceSource: null,
                  ylhCode: null,
                  storeNum: 1,
                  stockType: null,
                  stockTypeName: null,
                  storeType: null,
                  isScf: '1',
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
              }
            ]
          }
        ],
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
      // 付款信息
      payInfoData: {},
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
      chosePayerOptions: [],
      // 所有订单的账户支付信息
      totalPayerMoneyInfo: {},
      // 余额支付信息
      payerMoneyList: []
    };
  },
  onLoad() {
    uni.$on('confirmremarks', (data) => {
      const remarksData = JSON.parse(data);
      const orderIndex = remarksData.orderIndex;
      const productIndex = remarksData.productIndex;
      this.dataInfo.composeProductList[orderIndex].splitOrderDetailList[productIndex].splitOrderProductList[0].spareAddress = remarksData;
      console.log(this.dataInfo);
    });
    this.getPayInfo();
  },
  methods: {
    dealPayerMoneyInfo(payerMoneyInfoItem) {
      this.totalPayerMoneyInfo = {
        ...this.totalPayerMoneyInfo,
        ...payerMoneyInfoItem
      };
      console.log(this.totalPayerMoneyInfo);
      const payerList = [];
      const payerObj = {};
      for (const k in this.totalPayerMoneyInfo) {
        console.log(this.totalPayerMoneyInfo[k]);
        if (payerObj[this.totalPayerMoneyInfo[k].customerCode]) {
          const totalmoney = parseFloat(payerObj[this.totalPayerMoneyInfo[k].customerCode].totalMoney)
            + parseFloat(this.totalPayerMoneyInfo[k].totalMoney);
          payerObj[this.totalPayerMoneyInfo[k].customerCode].totalMoney = this.jshUtil.formatFloat(totalmoney, 2);
        } else {
          payerObj[this.totalPayerMoneyInfo[k].customerCode] = this.totalPayerMoneyInfo[k];
        }
      }
      for (const k in payerObj) {
        payerList.push(payerObj[k]);
      }
      this.payerMoneyList = payerList;
      console.log(payerList);
    },
    goodsChange(list, index) {
      /* 商品 change */
      this.$set(this.dataInfo.composeProductList, index, list);
    },
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    },
    getPayForm() {
      const payFormArr = [];
      this.dataInfo.composeProductList.forEach((item, index) => {
        item.splitOrderDetailList.forEach((v) => {
          const conditionItem = {
            isCheckCreditModel: v.splitOrderProductList[0].isCheckCreditModel,
            orderNo: v.orderNo,
            priceType: v.splitOrderProductList[0].priceType,
            priceVersion: v.splitOrderProductList[0].priceVersion,
            productCode: v.productCode,
            productGroup: v.productCode,
            saletoCode: this.dataInfo.saletoCode,
            sendtoCode: this.dataInfo.sendtoCode,
            yunCangFlag: '',
          };
          if (v.isTCTP) {
            conditionItem.yunCangFlag = 'TCTP';
          }
          payFormArr.push(conditionItem);
        });
      });
      console.log(payFormArr);
      return payFormArr;
    },
    async getPayInfo() {
      /* 获取支付信息 */
      const condition = this.getPayForm();
      const { code, data } = await this.orderServer.paytoInfo(condition);
      if (code === '1') {
        this.payInfoData = data;
      }
    }
  }
};
</script>
