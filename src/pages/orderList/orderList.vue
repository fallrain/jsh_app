<template>
  <view class="orList">
    <view class="paddingleftright-15">
      <view style="display:flex">
        <view class="inputsjtab">
          <view class="tab-brand-child">
            <order-j-tab :offset="offset" :tabs="tabs" :hasRightSlot="true" @tabClick="tabClick">
            </order-j-tab>
          </view>
          <view class="tab-brand-child1">
            <i @tap="moreAction" class="iconfont iconshaixuan1 iconscreen"></i>
          </view>
        </view>
      </view>
      <mescroll-body
        ref="mescrollRef"
        @init="mescrollInit"
        :up="jMescrollUpOptions"
        :down="jMescrollDownOptions"
        @down="jMescrollDownCallback"
        @up="upCallback"
      >
        <order-list-item
          :linkNum="linkNum"
          :info="item"
          :key="index"
          v-for="(item,index) in orderListInfo"
          :index="index"
          @change="orderItemChange($event,index)"
          @goDetail="goDetail"
        >
        </order-list-item>
      </mescroll-body>
    </view>
    <j-drawer-order
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"
    >
      <template>
        <view >
          <view class="orderList-drawer-filter-head">
            <view class="basejustify">
              <text @tap="getType">{{orderTypeStr}}<i class="iconfont iconxia dropdownstyle"></i></text>
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
              placeholder-style="color:#DBDBDB"
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
                placeholder-style="color:#DBDBDB"
                v-model="translateInput"
                disabled="false"
              >
              <i @tap="industryAction" class="iconfont iconxia dropdownstyle"></i>
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
                placeholder-style="color:#DBDBDB"
                disabled="false"
              >
              <i @tap="productBandAction" class="iconfont iconxia dropdownstyle"></i>
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
          placeholder-style="color:#DBDBDB"
          v-model="songda"
          >
          </view>
        </view>
        <view>
          <view class="addressee">
            <view>
              <text @tap="getModel">{{orderModelStr}}<i class="iconfont iconxia dropdownstyle"></i></text>
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
            placeholder-style="color:#DBDBDB"
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
                <text @tap="orderBegainTimeAction" >{{orderBegainTime.length>0?orderBegainTime:'开始时间'}}</text>
              </view>
              <view class="box2">
                <text>至</text>
              </view>
              <view class="box3">
                <text @tap="orderEndTimeAction">{{orderEndTime.length>0?orderEndTime:'结束时间'}}</text>
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
              <text @tap="deductionBegainTimeAction">{{deductionBegainTime.length>0?deductionBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @tap="deductionEndTimeAction">{{deductionEndTime.length>0?deductionEndTime:'结束时间'}}</text>
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
              <text @tap="invoiceTimeAction">{{invoiceBegainTime.length>0?invoiceBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @tap="invoiceEndTimeAction">{{invoiceEndTime.length>0?invoiceEndTime:'结束时间'}}</text>
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
              <text @tap="goldTaxinvoiceTimeAction">{{goldTaxInvoiceBegainTime.length>0?goldTaxInvoiceBegainTime:'开始时间'}}</text>
            </view>
            <view class="box2">
              <text>至</text>
            </view>
            <view class="box3">
              <text @tap="goldTaxinvoiceEndTimeAction">{{goldTaxInvoiceEndTime.length>0?goldTaxInvoiceEndTime:'结束时间'}}</text>
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
                  placeholder-style="color:#DBDBDB"
                  v-model="orderReviewStr"
                  disabled="false"
                  >
                  <i @tap="getReview"  class="iconfont iconxia dropdownstyle"></i>
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
                  placeholder-style="color:#DBDBDB"
                  v-model="orderMarkStr"
                  disabled="false"
                  >
                  <i @tap="getMarketing" class="iconfont iconxia dropdownstyle"></i>
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
                      placeholder-style="color:#DBDBDB"
                      v-model="orderBuyStr"
                      disabled="false"
                    >
                    <i @tap="getBuy" class="iconfont iconxia dropdownstyle"></i>
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
                    placeholder-style="color:#DBDBDB"
                    v-model="orderDistributionStr"
                    disabled="false"
                    >
                    <i @tap="getDistribution" class="iconfont iconxia dropdownstyle"></i>
                </view>
              <order-list-distribution :is-order-distribution="orderDistribution" @selectInfoOrderDistribution="selectInfoOrderDistribution"></order-list-distribution>
            </view>
          </view>
        </view>
        <view class="">
          <view class="timeFont">
            <text>筛选</text>
          </view>
          <u-checkbox-group max="3">
            <u-checkbox
                    label-size="22"
                    icon-size="12"
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
              label-size="22"
              v-for="(item, index) in labellist" :key="index"
              :name="item.name"
              :disabled="item.disabled"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group>
        </view>
      </template>
    </j-drawer-order>
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
            <view @tap="calentCancleAction" class="calentCancle">取消</view>
            <view class="calentdarTitle">
                选择时间
            </view>
            <view @tap="calentVerifyAction" class="calentVerify">确定</view>
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
import OrderJTab from '../../components/orderList/OrderJTab';
import JDrawerOrder from '../../components/orderList/JDrawerOrder';
import OrderListType from '../../components/orderList/order-list-type';
import OrderListModel from '../../components/orderList/order-list-model';
import OrderListReview from '../../components/orderList/order-list-review';
import OrderListMarketing from '../../components/orderList/order-list-marketing';
import OrderListBuy from '../../components/orderList/order-list-purchasemethod';
import OrderListDistribution from '../../components/orderList/order-list-distribution';
import OrderListIndustry from '../../components/orderList/order-list-industry';
import JPopPicker from '../../components/form/JPopPicker';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
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
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    orderListItem,
    OrderJTab,
    JDrawerOrder,
    JPopPicker,
    OrderListType,
    OrderListModel,
    OrderListReview,
    OrderListMarketing,
    OrderListBuy,
    OrderListDistribution,
    OrderListIndustry,
    MescrollBody
  },
  data() {
    return {
      offset: 0,
      currentID: 0,
      currentID2: 0,
      linkNum: '',
      formDataJson: {},
      orderNoshow: false,
      orderModelshow: false,
      orderIndustry: false,
      orderReviewshow: false,
      orderMarketing: false,
      orderBuy: false,
      orderDistribution: false,
      orderTypeStr: '订单号',
      orderTypeVue: '1',
      serviNO: '',
      bstnk: '',
      brand: '',
      jshi_sendto_code: '',
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
        }
        /* {
          name: '周转样机带结算',
          disabled: false
        } */
      ],
      // lableValue: '工程',
      // 产业
      industryList: [],
      // 品牌
      productBandList: [],
      isProductBandShow: false,
      choseProductBandKeys: [],
      producntBandValue: '',
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
      producntBandName: '',
    };
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE
    }),
  },
  onLoad(options) {
    console.log(options);
    this.offset = Number(options.index) * 50;
    this.sexID = options.index * 1;
    this.currentID = this.tabs[this.sexID].id;
    this.currentID2 = this.tabs[this.sexID].id2;
    this.getUserInfById();
  },
  created() {
    console.log(this.sexID);
    // this.orderList(this.tabs[this.sexID].id2, this.pageNo);
    this.tabs.forEach((each) => {
      each.active = false;
    });
    this.tabs[this.sexID].active = true;
  },
  methods: {
    ...mapMutations([
      ORDER.UPDATE_ORDER
    ]),
    // 获取上上签验证联系方式
    async getUserInfById() {
      /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
      const { code, data } = await this.orderService.sendVerify(this.userInf.customerCode);
      if (code === '1') {
        const abc = data.data.account;
        this.linkNum = abc.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
    },
    /* async jMescrollDownCallback() {
      this.tabs.forEach((each) => {
        if (each.active) {
          // this.orderList(each.id2, this.pageNo);
          this.currentID2 = each.id2;
        }
      });
      /!* 下拉刷新 *!/
      const scrollView = await this.orderList(this.tabs[this.sexID].id2, 1);
      if (scrollView) {
        this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
      }
    }, */
    async upCallback(pages) {
      /* 上推加载 */
      const scrollView = await this.orderList(this.tabs[this.sexID].id2, pages.num);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
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
      this.orderReviewValue = '',
      this.orderMarkValue = '',
      this.orderBuyValue = '',
      this.orderDistributionValue = '',
      this.priceTypeJudgment = '',
      this.pricetypeall = false, // 样品机
      this.jshiordersource = false, // 整车
      this.farweeklyall = false, // 运周次
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
      console.log(pgNo);
      let dingdan = '';
      let zhengdan = '';
      let gvs = '';
      let wuliu = '';
      let xinghao = '';
      let bianhao = '';
      let songda = '';
      if (this.orderTypeVue === '1') {
        console.log(this.serviNO);
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
      songda = this.songda;
      const param = {
        industry: this.industry,
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
        jshi_created_start_time: '',
        jshi_created_end_time: '',
        jshi_pay_start_time: '',
        jshi_pay_end_time: '',
        sap_sys_invoice_start_time: '',
        sap_sys_invoice_end_time: '',
        sap_tax_invoice_start_time: '',
        sap_tax_invoice_end_time: '',
        product_brand_all: this.producntBandValue,
        jshi_sendto_code: songda,
        jshi_order_channel: this.userInf.channelGroup,
        jshi_saleto_code: this.userInf.customerCode,
        orderStatusSelf: this.currentID2,
        pageNo: pgNo,
        pageSize: 15
      };
      if (this.orderBegainTime) {
        param.jshi_created_start_time = `${this.orderBegainTime} 00:00:00`;
      }
      if (this.orderEndTime) {
        param.jshi_created_end_time = `${this.orderEndTime} 00:00:00`;
      }
      if (this.deductionBegainTime) {
        param.jshi_pay_start_time = `${this.deductionBegainTime} 00:00:00`;
      }
      if (this.deductionEndTime) {
        param.jshi_pay_end_time = `${this.deductionEndTime} 00:00:00`;
      }
      if (this.invoiceBegainTime) {
        param.sap_sys_invoice_start_time = `${this.invoiceBegainTime} 00:00:00`;
      }
      if (this.invoiceEndTime) {
        param.sap_sys_invoice_end_time = `${this.invoiceEndTime} 00:00:00`;
      }
      if (this.goldTaxInvoiceBegainTime) {
        param.sap_tax_invoice_start_time = `${this.goldTaxInvoiceBegainTime} 00:00:00`;
      }
      if (this.goldTaxInvoiceEndTime) {
        param.sap_tax_invoice_end_time = `${this.goldTaxInvoiceEndTime} 00:00:00`;
      }
      if (this.currentID === 8) {
        // param.yjPay = 'MFYJ';
        param.orderStatusSelf = 7;
        param.jshi_gvs_order_type = 'ZGBR';
      }

      const { code, data } = await this.orderService.orderList(param);
      if (code === '200') {
        for (let index = 0; index < data.dataList.length; index++) {
          const element = data.dataList[index];
          element.btnsInfo = {
            estimateButton: '0',
            invalidButton: '0',
            orderNo: '',
            selfPayButton: '0',
            signInButton: '0',
            tctpConfirmButton: '0',
          };
          element.receivedOrderButton = '';
          data.dataList[index] = element;
        }

        if (pgNo === 1) {
          this.orderListInfo = data.dataList;
        } else {
          this.orderListInfo = this.orderListInfo.concat(data.dataList);
        }
        console.log(this.orderListInfo);
        if (this.orderListInfo.length === 0) {
          uni.showToast({
            title: '暂无数据！',
            icon: 'none'
          });
        }
        // 遍历循环
        for (let index = 0; index < this.orderListInfo.length; index++) {
          const element = this.orderListInfo[index];
          this.buttonLogicJudgmentAction(element.info, index);
          if (this.currentID === 7) {
            // 物流拒单按钮是否出现判断 请求
            this.buttonReceivedOrder({ dn: element.info.dnLogistics }, index);
          }
        }
        // 当前页码的数据
        const scrollView = {};
        scrollView.pageSize = 15;
        scrollView.total = data.totalNums;
        return scrollView;
      }
      return null;
    },
    // 获取按钮显示的数据
    async buttonLogicJudgmentAction(param, index) {
      const { code, data } = await this.orderService.buttonLogicJudgment(param);
      if (code === '200') {
        const element = this.orderListInfo[index];
        element.btnsInfo = data;
        this.$set(this.orderListInfo, index, element);
      }
    },
    // 获取物流拒单按钮显示的数据
    async buttonReceivedOrder(form, index) {
      const { code, data } = await this.orderService.buttonReceivedOrder(form);
      if (code === '200') {
        const element = this.orderListInfo[index];
        element.receivedOrderButton = data;
        this.$set(this.orderListInfo, index, element);
      }
    },
    orderItemChange(item, index) {
      /* 订单条目chanage */
      this.orderListInfo[index] = item;
    },
    goDetail(info) {
      const orderDetail = JSON.stringify(info);
      /* this[ORDER.UPDATE_ORDER]({
        orderDetail: this.orderListInfo[e]
      }); */
      uni.navigateTo({
        url: `/pages/orderList/orderDetail?orderDetail=${orderDetail}`
      });
    },
    tabClick(e) {
      // 清空筛选值
      this.filterReset();
      this.tabs = e;
      console.log(e);
      this.tabs.forEach((each) => {
        if (each.active) {
          this.currentID = each.id;
          this.currentID2 = each.id2;
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
      if (e.name === '样品机') {
        this.pricetypeall = !e.value;
      }
      if (e.name === '整车') {
        this.jshiordersource = !e.value;
      }
      if (e.name === '远周次') {
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
