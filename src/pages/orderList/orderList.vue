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
            <view  @click="moreAction" class="iconfont iconshaixuan1"></view>
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
        <view >
          <view class="orderList-drawer-filter-head">
            <view class="basejustify">
              <text @click="getType">{{orderTypeStr}}<i class="iconfont iconxia left-10"></i></text>
            </view>
          </view>
          <order-list-type
            :is-order-type="orderNoshow"
            @selectInfoOrderNo="selectInfoOrderNo"
          ></order-list-type>
          <view
            class="orderList-drawer-filter-list"
            >
            <input
              class="orderList-drawer-filter-input"
              type="text"
              :placeholder="`请输入${orderTypeStr}`"
              v-model="serviNO"
            >
          </view>
        </view>

        <view class="industry-brand">
          <view class="industry-brand-child">
            <view >
              <text>产业</text>
            </view>
            <view class="inputs">
              <input
                class="orderList-drawer-filter-down-input"
                type="text"
                :placeholder="`请选择`"
                v-model="translateInput"
              >
              <i @click="industryAction" class="iconfont iconxia left-10"></i>
            </view>
            <order-list-industry
                    :is-order-industry="orderIndustry"
                    :industry-list="industryList"
                    @selectInfoIndustry="selectInfoIndustry"
            ></order-list-industry>
          </view>
          <view   class="industry-brand-child">
            <view >
              <text>品牌</text>
            </view>
            <view class="inputs">
              <input
                class="orderList-drawer-filter-down-input"
                type="text"
                v-model="producntBandName"
                :placeholder="`请选择`"
              >
              <i @click="productBandAction" class="iconfont iconxia left-10"></i>
            </view>
          </view>
        </view>
        <view>
          <view class="addressee">
            <view>
              <text>送达方</text>
            </view>
          </view>
          <view
            class="orderList-drawer-filter-list"
          >
          <input
          class="orderList-drawer-filter-input"
          type="text"
          :placeholder="`请输入送达方`"
          v-model="songda"
          >
          </view>
        </view>
        <view>
          <view class="addressee">
            <view>
              <text @click="getModel">{{orderModelStr}}<i class="iconfont iconxia left-10"></i></text>
            </view>
          </view>
          <order-list-model :is-order-model="orderModelshow"
           @selectInfoOrderModel="selectInfoOrderModel"
          ></order-list-model>
          <view
            class="orderList-drawer-filter-list"
          >
            <input
            class="orderList-drawer-filter-input"
            type="text"
            :placeholder="`请输入${orderModelStr}`"
            v-model="addresseeInput"
            >
          </view>
        </view>
        <view>
            <view class="addressee">
              <view >
                <text>下单时间</text>
              </view>
            </view>
            <view
             class="timeParent"
            >
              <view class="box1">
                <text @click="orderBegainTimeAction" >{{orderBegainTime.length>0?orderBegainTime:'开始时间'}}</text>
              </view>
              <view class="box2">
                <text>至</text>
              </view>
              <view class="box3">
                <text @click="orderEndTimeAction">{{orderEndTime.length>0?orderEndTime:'结束时间'}}</text>
              </view>
            </view>
        </view>
        <view>
          <view class="addressee">
            <view >
              <text>扣款时间</text>
            </view>
          </view>
          <view
           class="timeParent"
          >
            <view class="box1">
              <text @click="deductionBegainTimeAction">{{deductionBegainTime.length>0?deductionBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @click="deductionEndTimeAction">{{deductionEndTime.length>0?deductionEndTime:'结束时间'}}</text>
            </view>
          </view>
        </view>
        <view>
          <view class="addressee">
            <view >
              <text>系统开票时间</text>
            </view>
          </view>
          <view
            class="timeParent"
          >
            <view class="box1">
              <text @click="invoiceTimeAction">{{invoiceBegainTime.length>0?invoiceBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @click="invoiceEndTimeAction">{{invoiceEndTime.length>0?invoiceEndTime:'结束时间'}}</text>
            </view>
          </view>
        </view>
        <view>
          <view class="addressee">
            <view >
              <text>金税开票时间</text>
            </view>
          </view>
          <view
            class="timeParent"
          >
            <view class="box1">
              <text @click="goldTaxinvoiceTimeAction">{{goldTaxInvoiceBegainTime.length>0?goldTaxInvoiceBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @click="goldTaxinvoiceEndTimeAction">{{goldTaxInvoiceEndTime.length>0?goldTaxInvoiceEndTime:'结束时间'}}</text>
            </view>
          </view>
        </view>
        <view>
            <view class="industry-brand">
              <view class="industry-brand-child">
                <view >
                  <text>评审状态</text>
                </view>
                  <view class="inputs">
                  <input
                  class="orderList-drawer-filter-down-input"
                  type="text"
                  :placeholder="`请选择`"
                  v-model="orderReviewStr"
                  disabled="false"
                  >
                  <i class="iconfont iconxia"  @click="getReview"></i>
                  </view>
                <order-list-review :is-orderreview="orderReviewshow" @selectInfoOrderReview="selectInfoOrderReview"></order-list-review>
              </view>
              <view class="industry-brand-child">
                <view >
                  <text >营销活动</text>
                </view>
                  <view class="inputs">
                  <input
                  class="orderList-drawer-filter-down-input"
                  type="text"
                  :placeholder="`请选择`"
                  v-model="orderMarkStr"
                  disabled="false"
                  >
                  <i class="iconfont iconxia" @click="getMarketing"></i>
                  </view>
                <order-list-marketing :is-orderremarketing="orderMarketing" @selectInfoOrderMarketing="selectInfoOrderMarketing"></order-list-marketing>
            </view>
          </view>
        </view>
        <view>
          <view class="industry-brand">
            <view class="industry-brand-child">
              <view >
                <text>购买方式</text>
              </view>
                <view class="inputs">
                    <input
                      class="orderList-drawer-filter-down-input"
                      type="text"
                      :placeholder="`请选择`"
                      v-model="orderBuyStr"
                      disabled="false"
                    >
                    <i class="iconfont iconxia" @click="getBuy"></i>
                </view>
              <order-list-buy :is-order-buy="orderBuy" @selectInfoOrderBuy="selectInfoOrderBuy"></order-list-buy>
            </view>
            <view class="industry-brand-child">
              <view >
                <text>配送方式</text>
              </view>
                <view class="inputs">
                    <input
                    class="orderList-drawer-filter-down-input"
                    type="text"
                    :placeholder="`请选择`"
                    v-model="orderDistributionStr"
                    disabled="false"
                    >
                    <i class="iconfont iconxia" @click="getDistribution"></i>
                </view>
              <order-list-distribution :is-order-distribution="orderDistribution" @selectInfoOrderDistribution="selectInfoOrderDistribution"></order-list-distribution>
            </view>
          </view>
        </view>
        <view class="">
          <view class="timeFont">
            <text>筛选</text>
          </view>
          <u-checkbox-group max="3" size="18">
            <u-checkbox
                    label-size="10"
                    @change="checkboxChange"
                    v-model="item.checked"
                    v-for="(item, index) in screenlist" :key="index"
                    :name="item.name"
            >{{item.name}}</u-checkbox>
          </u-checkbox-group>

        </view>
        <view class="">
          <view class="timeFont">
            <text>标签</text>
          </view>
          <u-radio-group @change="radioChange">
            <u-radio
              icon-size="10"
              label-size="10"
              v-for="(item, index) in labellist" :key="index"
              :name="item.name"
              :disabled="item.disabled"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group>
        </view>
        <!-- <view style="width: 100px;">
          <u-tabs ref="tabs" :list="list" current="2"></u-tabs>
        </view> -->
      </template>
    </j-drawer>
    <j-pop-picker
        keyName="key"
        title="品牌"
        :options="productBandList"
        :show.sync="isProductBandShow"
        :choseKeys.sync="choseProductBandKeys"
        @change="productBandChange"
      ></j-pop-picker>
    <uni-popup
      ref="popCalendar"
      type="bottom"
      @change="change"
      >
      <template>
        <view class="calentdarContent">
          <view style="display:flex">
            <view @click="calentCancleAction" class="calentCancle">取消</view>
            <view class="calentdarTitle">
                选择时间
            </view>
            <view @click="calentVerifyAction" class="calentVerify">确定</view>
          </view>
          <uni-calendar
          :insert="true"
          :lunar="false"
          :showMonth='false'
          :start-date="'2000-3-2'"
          :end-date="'2100-5-20'"
          @change="calendarChange"
          />
        </view>
      </template>
    </uni-popup>
  </view>
</template>

<script>
import orderListItem from '../../components/orderList/order-list-item';
import JTab from '../../components/common/JTab';
import JDrawer from '../../components/form/JDrawer';
import OrderListType from '../../components/orderList/order-list-type';
import OrderListModel from '../../components/orderList/order-list-model';
import OrderListReview from '../../components/orderList/order-list-review';
import OrderListMarketing from '../../components/orderList/order-list-marketing';
import OrderListBuy from '../../components/orderList/order-list-purchasemethod';
import OrderListDistribution from '../../components/orderList/order-list-distribution';
import OrderListIndustry from '../../components/orderList/order-list-industry';
import JPopPicker from '../../components/form/JPopPicker';
import './css/orderlist.scss';


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
    JDrawer,
    JPopPicker,
    OrderListType,
    OrderListModel,
    OrderListReview,
    OrderListMarketing,
    OrderListBuy,
    OrderListDistribution,
    OrderListIndustry
  },
  data() {
    return {
      formDataJson: {},
      orderNoshow: false,
      orderIndustry: false,
      orderModelshow: false,
      orderReviewshow: false,
      orderMarketing: false,
      orderBuy: false,
      orderDistribution: false,
      orderTypeStr: '订单号',
      orderTypeVue: '1',
      serviNO: '',
      bstnk: '',
      brand: '',
      brandInput: '',
      jshi_grouping_no: '',
      jshi_gvs_so_order_no: '',
      sap_dn5: '',
      industry: '',
      product_brand_all: '',
      product_model_all: '',
      product_code_all: '',
      addresseeInput: '',
      translateInput: '',
      songda: '',
      modelInput: '',
      orderModelStr: '产品型号',
      orderModelValue: '1',
      orderReviewStr: '',
      orderReviewValue: '',
      orderMarkStr: '',
      orderMarkValue: '',
      orderBuyStr: '',
      orderBuyValue: '',
      orderDistributionStr: '',
      orderDistributionValue: '',
      pricetypeall: false, // 样品机
      jshiordersource: false, // 整车
      farweeklyall: false, // 运周次
      priceTypeJudgment: '',
      yjPay: '',
      isShowGoodsFilterDrawer: false,
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
      ],

      screenlist: [
        {
          name: '样品机',
          checked: false,
          disabled: false
        },
        {
          name: '整车',
          checked: false,
          disabled: false
        },
        {
          name: '远周次',
          checked: false,
          disabled: false
        }
      ],
      labellist: [
        {
          name: '工程',
          disabled: false
        },
        {
          name: '特价',
          disabled: false
        },
        {
          name: '样机',
          disabled: false
        },
        {
          name: '周转样机带结算',
          disabled: false
        }
      ],
      // lableValue: '工程',
      // 产业
      industryList: [],

      // 品牌
      productBandList: [],
      isProductBandShow: false,
      choseProductBandKeys: [],
      producntBandValue: '',
      producntBandName: '',
      isShowCalendarDrawer: true,
      // 用户选中的日期
      selectData: '',
      // 下单开始时间
      orderBegainTime: '',
      orderBegainTimeBool: false,
      // 下单结束时间
      orderEndTime: '',
      orderEndTimeBool: false,
      // 扣款开始时间
      deductionBegainTime: '',
      deductionBegainTimeBool: false,
      // 扣款结束
      deductionEndTime: '',
      deductionEndTimeBool: false,
      // 开票开始
      invoiceBegainTime: '',
      invoiceBegainTimeBool: false,
      // 开票结束
      invoiceEndTime: '',
      invoiceEndTimeBool: false,
      // 金税开票开始
      goldTaxInvoiceBegainTime: '',
      goldTaxInvoiceBegainTimeBool: false,
      // 金税开票结束
      goldTaxInvoiceEndTime: '',
      goldTaxInvoiceEndTimeBool: false,
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
    console.log(this.sexID);
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
      this.orderList(this.tabs[this.sexID].id2, this.pageNo);
      this.tabs.forEach((each) => {
        each.active = false;
      });
      this.tabs[this.sexID].active = true;
    },
    filterReset() {
      this.orderTypeStr = '订单号';
      this.orderTypeVue = '1';
      this.serviNO = '';
      this.songda = '';
      this.translateInput = '';
      this.producntBandName = '';
      this.producntBandValue = '';
      this.addresseeInput = '';
      this.orderModelStr = '产品型号';
      this.orderModelValue = '1';
      this.orderBegainTime = '';
      this.orderEndTime = '';
      this.deductionBegainTime = '';
      this.deductionEndTime = '';
      this.invoiceBegainTime = '';
      this.invoiceEndTime = '';
      this.goldTaxInvoiceBegainTime = '';
      this.goldTaxInvoiceEndTime = '';
      this.orderReviewStr = '';
      this.orderMarkStr = '';
      this.orderBuyStr = '';
      this.orderDistributionStr = '';
      this.screenlist.map((val) => {
        val.checked = false;
      });
      this.industry = '';
    },
    // 选择品牌后
    productBandChange(data, productBandOptions) {
      console.log('=======productBandChange========');
      this.producntBandName = productBandOptions[0].value;
      this.producntBandValue = productBandOptions[0].key;
      this.isProductBandShow = false;
      this.isShowGoodsFilterDrawer = true;
    },
    async productBandAction() {
      this.isShowGoodsFilterDrawer = false;
      await this.getDictionaryByWhereFun({
        dictionaryType: 'PRODUCT_BRAND'
      });
      this.isProductBandShow = true;
    },
    // 产业
    async industryAction() {
      this.getIndustry();
      await this.getDictionaryByWhereFun({
        dictionaryType: 'INDUSTRIAL'// 产业筛选
      });
    },
    // 过滤条件
    async moreAction() {
      console.log('==============');
      this.isShowGoodsFilterDrawer = true;
      console.log(this.productBandList);
    },
    unique(newarr) {
      const res = new Map();
      this.industryList = newarr.filter(newarr => !res.has(newarr.key) && res.set(newarr.key, 1));
    },
    async getDictionaryByWhereFun(param) {
      const { code, data } = await this.productService.getDictionaryByWhere(param);
      if (code === '1') {
        if (param.dictionaryType == 'INDUSTRIAL') {
          const industryLists = [];
          // this.industryList = data;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const indus = {
              key: element.code,
              value: element.codeName
            };
            industryLists.push(indus);
          }
          this.unique(industryLists);
        } else {
          console.log('===========getDictionaryByWhereFun===========');
          // [{key:1,value:'馒头'}，{key:2,value:'米饭'}]
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const pb = {
              key: element.code,
              value: element.codeName
            };
            this.productBandList.push(pb);
          }
        }
        console.log(data);
      }
      console.log('===========getDictionaryByWhereFun===========');
    },
    async orderList(e, pgNo) {
      let dingdan;
      let zhengdan;
      let gvs;
      let wuliu;
      let xinghao;
      let bianhao;
      if (this.orderTypeVue === '1') {
        dingdan = this.serviNO;
      }
      if (this.orderTypeVue === '2') {
        zhengdan = this.serviNO;
      }
      if (this.orderTypeVue === '3') {
        gvs = this.serviNO;
      }
      if (this.orderTypeVue === '4') {
        wuliu = this.serviNO;
      }
      if (this.orderModelValue === '1') {
        xinghao = this.addresseeInput;
      }
      if (this.orderModelValue === '2') {
        bianhao = this.addresseeInput;
      }

      const param = {

        industry: this.industry,
        product_brand_all: this.product_brand_all,
        product_model_all: xinghao,
        product_code_all: bianhao,
        sap_judge_status: this.orderReviewValue,
        product_type_all: this.orderMarkValue,
        waysOfPurchasing: this.orderBuyValue,
        bstnk: dingdan,
        jshi_grouping_no: zhengdan,
        jshi_gvs_so_order_no: gvs,
        sap_dn5: wuliu,
        jshi_delivery_type: this.orderDistributionValue,
        price_type_all: this.pricetypeall,
        jshi_order_source: this.jshiordersource,
        far_weekly_all: this.farweeklyall,
        priceTypeJudgment: this.priceTypeJudgment,
        yjPay: this.yjPay,
        jshi_created_start_time: `${this.orderBegainTime} 00:00:00`,
        jshi_created_end_time: `${this.orderEndTime} 00:00:00`,
        jshi_pay_start_time: `${this.deductionBegainTime} 00:00:00`,
        jshi_pay_end_time: `${this.deductionEndTime} 00:00:00`,
        sap_sys_invoice_start_time: `${this.invoiceBegainTime} 00:00:00`,
        sap_sys_invoice_end_time: `${this.invoiceEndTime} 00:00:00`,
        sap_tax_invoice_start_time: `${this.goldTaxInvoiceBegainTime} 00:00:00`,
        sap_tax_invoice_end_time: `${this.goldTaxInvoiceEndTime} 00:00:00`,
        product_brand_all: this.producntBandValue,
        jshi_order_channel: this.userInf.channelGroup,
        jshi_saleto_code: this.userInf.customerCode,
        orderStatusSelf: e,
        pageNo: pgNo,
        pageSize: 10
      };


      if (e == 8) {
        param.yjPay = 'MFYJ';
        param.orderStatusSelf = 7;
      }

      const { code, data } = await this.orderService.orderList(param);
      if (code === '200') {
        this.orderListInfo = data.dataList;
        // 遍历循环
        for (let index = 0; index < this.orderListInfo.length; index++) {
          const element = this.orderListInfo[index];
          this.buttonLogicJudgmentAction(element.info, index);
        }
      }
      console.log(`===========orderList===========${e}`);
      console.log(data);
    },
    // 获取按钮显示的数据
    async buttonLogicJudgmentAction(param, index) {
      const { code, data } = await this.orderService.buttonLogicJudgment(param);
      if (code === '200') {
        const element = this.orderListInfo[index];
        element.btnsInfo = data;
        this.orderListInfo[index] = element;
        console.log(this.orderListInfo);
        // this.buttonLogicJudgment = data;
        console.log('============');
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
    },

    getType() {
      this.orderNoshow = !this.orderNoshow;
      console.log(this.orderNoshow);
    },
    getIndustry() {
      this.orderIndustry = !this.orderIndustry;
      console.log(this.orderIndustry);
    },
    getModel() {
      this.orderModelshow = !this.orderModelshow;
      console.log(this.orderModelshow);
    },
    getReview() {
      this.orderReviewshow = !this.orderReviewshow;
      console.log(this.orderReviewshow);
    },
    getMarketing() {
      this.orderMarketing = !this.orderMarketing;
      console.log(this.orderMarketing);
    },
    getBuy() {
      this.orderBuy = !this.orderBuy;
      console.log(this.orderBuy);
    },
    getDistribution() {
      this.orderDistribution = !this.orderDistribution;
      console.log(this.orderDistribution);
    },
    selectInfoOrderNo(value, data) {
      this.orderTypeVue = value;
      this.orderNoshow = !this.orderNoshow;
      this.orderTypeStr = data;
      if (value === '1') {
        this.jshi_sendto_code = '';
        this.jshi_gvs_so_order_no = '';
        this.sap_dn5 = '';
        this.bstnk = this.serviNO;
      }
      if (value === '2') {
        this.jshi_grouping_no = this.serviNO;
        this.jshi_gvs_so_order_no = '';
        this.sap_dn5 = '';
        this.bstnk = '';
      }
      if (value === '3') {
        console.log(value);
        this.jshi_grouping_no = '';
        this.jshi_gvs_so_order_no = this.serviNO;
        this.sap_dn5 = '';
        this.bstnk = '';
      }
      if (value === '4') {
        console.log(value);
        this.jshi_grouping_no = '';
        this.jshi_gvs_so_order_no = '';
        this.sap_dn5 = this.serviNO;
        this.bstnk = '';
      }
    },
    selectInfoOrderModel(value, data) {
      this.orderModelValue = value;
      this.orderModelshow = !this.orderModelshow;
      this.orderModelStr = data;
      if (value === '1') {
        this.product_model_all = this.addresseeInput;
        this.product_code_all = '';
      }
      if (value === '2') {
        this.product_model_all = '';
        this.product_code_all = this.addresseeInput;
      }
    },
    selectInfoOrderReview(value, data) {
      this.orderReviewValue = value;
      this.orderReviewshow = !this.orderReviewshow;
      this.orderReviewStr = data;
    },
    selectInfoOrderMarketing(value, data) {
      this.orderMarkValue = value;
      this.orderMarketing = !this.orderMarketing;
      this.orderMarkStr = data;
    },
    selectInfoOrderBuy(value, data) {
      this.orderBuyValue = value;
      this.orderBuy = !this.orderBuy;
      this.orderBuyStr = data;
    },
    selectInfoOrderDistribution(value, data) { // 点击子组件按钮时触发事件
      this.orderDistributionValue = value;
      this.orderDistribution = !this.orderDistribution;
      this.orderDistributionStr = data; // 改变了父组件的值
    },
    selectInfoIndustry(value, data) { // 点击子组件按钮时触发事件
      console.log(`-------${value}`);
      this.industry = value;
      this.orderIndustry = !this.orderIndustry;
      this.translateInput = data; // 改变了父组件的值
    },

    // 选中某个复选框时，由checkbox时触发
    checkboxChange(e) {
      console.log(e.name);
      if (!e.value && e.name === '样品机') {
        this.pricetypeall = !e.value;
      }
      if (!e.value && e.name === '整车') {
        this.jshiordersource = !e.value;
      }
      if (!e.value && e.name === '远周次') {
        this.farweeklyall = !e.value;
      }
    },
    radioChange(e) {
      console.log(e);
      if (e === '工程') {
        this.priceTypeJudgment = 'GC';
        this.yjPay = '';
      }
      if (e === '特价') {
        this.priceTypeJudgment = 'TJ';
        this.yjPay = '';
      }
      if (e === '样机') {
        this.priceTypeJudgment = 'YJ';
        this.yjPay = '';
      }
      if (e === '周转样机带结算') {
        this.priceTypeJudgment = '';
        this.yjPay = 'MFYJ';
      }
    },
    // 时间取消
    calentCancleAction() {
      this.$refs.popCalendar.close();
    },
    // 时间确定
    calentVerifyAction() {
      if (this.orderBegainTimeBool) {
        this.orderBegainTime = this.selectData;
      }
      if (this.orderEndTimeBool) {
        this.orderEndTime = this.selectData;
      }
      if (this.deductionBegainTimeBool) {
        this.deductionBegainTime = this.selectData;
      }
      if (this.deductionEndTimeBool) {
        this.deductionEndTime = this.selectData;
      }
      if (this.invoiceBegainTimeBool) {
        this.invoiceBegainTime = this.selectData;
      }
      if (this.invoiceEndTimeBool) {
        this.invoiceEndTime = this.selectData;
      }
      if (this.goldTaxInvoiceBegainTimeBool) {
        this.goldTaxInvoiceBegainTime = this.selectData;
      }
      if (this.goldTaxInvoiceEndTimeBool) {
        this.goldTaxInvoiceEndTime = this.selectData;
      }

      this.orderBegainTimeBool = false;
      this.orderEndTimeBool = false;
      this.deductionBegainTimeBool = false;
      this.deductionEndTimeBool = false;
      this.invoiceBegainTimeBool = false;
      this.invoiceEndTimeBool = false;
      this.goldTaxInvoiceBegainTimeBool = false;
      this.goldTaxInvoiceEndTimeBool = false;
      this.$refs.popCalendar.close();
      this.isShowGoodsFilterDrawer = true;
    },
    // 选中的时间
    calendarChange(e) {
      console.log(e);
      this.selectData = e.fulldate;
    },
    // 下单开始时间
    orderBegainTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.orderBegainTimeBool = true;
    },
    // 下单开始时间
    orderEndTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.orderEndTimeBool = true;
    },
    // 扣款开始时间
    deductionBegainTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.deductionBegainTimeBool = true;
    },
    // 扣款结束时间
    deductionEndTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.deductionEndTimeBool = true;
    },
    // 开票开始时间
    invoiceTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.invoiceBegainTimeBool = true;
    },
    // 开票结束时间
    invoiceEndTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.invoiceEndTimeBool = true;
    },
    // 金税开票开始时间
    goldTaxinvoiceTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.goldTaxInvoiceBegainTimeBool = true;
    },
    // 金税开票结束时间
    goldTaxinvoiceEndTimeAction() {
      this.isShowGoodsFilterDrawer = false;
      this.$refs.popCalendar.open();
      this.goldTaxInvoiceEndTimeBool = true;
    },

  }
};
</script>

<style lang="scss" scoped>
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
