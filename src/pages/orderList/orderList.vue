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
        <view>
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
              :placeholder="`请输入订单号`"
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
              >
              <i @click="industryAction" class="iconfont iconxia left-10"></i>
            </view>
          </view>
          <view   class="industry-brand-child">
            <view >
              <text>品牌</text>
            </view>
            <view class="inputs">
              <input
                class="orderList-drawer-filter-down-input"
                type="text"
                v-model="producntBandValue"
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
          >
          </view>
        </view>
        <view>
          <view class="addressee">
            <view>
              <text @click="getModel">{{orderModelStr}}<i class="iconfont iconxia left-10"></i></text>
            </view>
          </view>
          <order-list-model :is-order-model="orderModelshow"></order-list-model>
          <view
            class="orderList-drawer-filter-list"
          >
            <input
            class="orderList-drawer-filter-input"
            type="text"
            :placeholder="`请输入产品型号`"
            >
          </view>
        </view>
        <view>
          <view
            v-for="(item,index) in timeInputs"
            :key="index+'b'"
          >
            <view class="addressee">
              <view >
                <text>{{item.name}}</text>
              </view>
            </view>
            <view
             class="timeParent"
            >
              <view class="box1">
                <text>开始时间</text>
              </view>
              <view class="box2">
                <text>至</text>
              </view>
              <view class="box3">
                <text>结束时间</text>
              </view>
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
                  >
                  <i class="iconfont iconxia"  @click="getReview"></i>
                  </view>
                <order-list-review :is-orderreview="orderReviewshow"></order-list-review>
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
                  >
                  <i class="iconfont iconxia" @click="getMarketing"></i>
                  </view>
                <order-list-marketing :is-orderremarketing="orderMarketing"></order-list-marketing>
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
                    >
                    <i class="iconfont iconxia" @click="getBuy"></i>
                </view>
              <order-list-buy :is-order-buy="orderBuy"></order-list-buy>
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
                    >
                    <i class="iconfont iconxia" @click="getDistribution"></i>
                </view>
              <order-list-distribution :is-order-distribution="orderDistribution"></order-list-distribution>
            </view>
          </view>
        </view>
        <view class="">
          <view class="timeFont">
            <text>筛选</text>
          </view>
          <u-checkbox-group max="3" size="16" @change="checkboxGroupChange">
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
          <u-radio-group v-model="lableValue"  @change="radioGroupChange" >
            <u-radio
                    icon-size="10"
                    label-size="10"
                    @change="radioChange"
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
    OrderListDistribution
  },
  data() {
    return {
      orderNoshow: false,
      orderModelshow: false,
      orderReviewshow: false,
      orderMarketing: false,
      orderBuy: false,
      orderDistribution: false,
      orderTypeStr: '订单号',
      orderModelStr: '产品型号',
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
      filterInputs: [

        {
          key: 'Addressee',
          name: '送达方',
          value: ''
        },
        {
          key: 'model',
          name: '产品型号',
          value: ''
        }
      ],
      timeInputs: [
        {
          key: 'ordertime',
          name: '下单时间',
          value: ''
        },
        {
          key: 'deductiontime',
          name: '扣款时间',
          value: ''
        },
        {
          key: 'billingtime',
          name: '系统开票时间',
          value: ''
        }
      ],
      inputs: [
        {
          key: 'reviewstatus',
          name: '评审状态',
          value: ''
        },
        {
          key: 'marketingactivities',
          name: '营销活动',
          value: ''
        },
        {
          key: 'purchasemethod',
          name: '购买方式',
          value: ''
        },
        {
          key: 'distributionmode',
          name: '配送方式',
          value: ''
        }
      ],
      screenlist: [
        {
          name: '样品机',
          checked: true,
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
      lableValue: 'orange',
      // 产业
      industryList: [],
      // 品牌
      productBandList: [],
      isProductBandShow: false,
      choseProductBandKeys: [],
      producntBandValue: ''
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
    async moreAction() {
      console.log('==============');
      this.isShowGoodsFilterDrawer = true;
      console.log(this.productBandList);
    },
    async getDictionaryByWhereFun(param) {
      const { code, data } = await this.productService.getDictionaryByWhere(param);
      if (code === '1') {
        if (param.dictionaryType == 'INDUSTRIAL') {
          this.industryList = data;
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
      const param = {
        jshi_order_channel: this.userInf.channelGroup,
        jshi_saleto_code: this.userInf.customerCode,
        orderStatusSelf: e,
        pageNo: pgNo,
        pageSize: 10
      };

      if (e == 8) {
        param.yjPay = 'MFYJ';
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
    selectInfoOrderNo(data) { // 点击子组件按钮时触发事件
      console.log(data);
      this.orderNoshow = !this.orderNoshow;
      this.orderTypeStr = data; // 改变了父组件的值
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
