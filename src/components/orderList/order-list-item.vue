<template>
  <view class="produceDetailItem">
    <view class="produceDetailItem-head">
      <button type="button" class="produceDetailItem-head-btn">{{info.info.combinationTag}}</button>
      <text class="produceDetailItem-head-text">{{titleAndNoFun}}</text>
      <text @click="orderFailsAction"
            class="produceDetailItem-head-text-status">
        {{info.info.selfUseOrderStatus}}
      </text>
    </view>
    <view v-if="info.details.length<2">
      <view class="produceDetailItem-cnt" @click="goDetail">
        <view class="produceDetailItem-cnt-img">
          <image :src="info.details[0].jshd_product_img"></image>
        </view>
        <view class="">
          <view class="produceDetailItem-cnt-text">{{info.details[0].jshd_product_name}}</view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-cnt-info">下单时间：{{info.details[0].jshd_created_time}}</view>
            <view class="produceDetailItem-cnt-info">数量：{{info.details[0].jshd_qty}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-cnt-info">购买方式：{{info.info.waysOfPurchasingDto}}</view>
          </view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
      </view>
      <view class="produceDetailItem-fot">
        <view class="col-75 padding-left-15">
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥{{parseFloat(info.details[0].jshd_amount).toFixed(2)}}</span>
            </view>
            <view class="produceDetailItem-cnt-price" v-if="info.details[0].jshd_pre_rate!==''">
              预定金金额:¥{{parseFloat(info.details[0].jshd_pre_amount).toFixed(2)}}
            </view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{parseFloat(info.details[0].jshd_invoice_price).toFixed(2)}}</span>
            </view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info" v-if="info.details[0].jshd_pre_rate!==''">预定金比例:<span
              class="produceDetailItem-fot-color">{{(info.details[0].jshd_pre_rate*1).toFixed(2)}}%</span></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info" v-if="info.details[0].jshd_pre_rate!==''">尾款:<span
              class="produceDetailItem-fot-color">{{(parseFloat(info.details[0].jshd_invoice_price) - parseFloat(info.details[0].jshd_pre_amount)).toFixed(2)}}</span>
            </view>
          </view>
        </view>
        <view class=" col-25 padding-4">
          <button v-if="info.btnsInfo.signInButton === '1'"
                  @click="orderSelfSignedFun"
                  type="button"
                  class="produceDetailItem-fot-btn">
            签收
          </button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row">
        <view v-if="isChangePayer" @tap="changePayer" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>更改付款方
        </view>
        <view v-if="tctpConfirmButtonFun"  @click="tctpConfirmButtonAction" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>统仓确认
        </view>
        <view
          @click="orderCancel"
          class="produceDetailItem-btm"
          v-if="invalidButton"
        >
          <view class="iconfont iconcancel iconStyle"></view>
          订单作废
        </view>
        <view v-if="showNode" @click="nodeClick" class="produceDetailItem-btm">
          <view class="iconfont icontree iconStyle"></view>
          订单节点
        </view>
        <view v-if="info.btnsInfo.selfPayButton==='1'
                  ||info.btnsInfo.selfPayButton==='3'
                  ||info.btnsInfo.selfPayButton==='4'"
              @click="selfDeduction(info.btnsInfo.selfPayButton)" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          自主扣款
        </view>
        <view v-if="info.btnsInfo.selfPayButton==='2'"
              @click="sampleMachineAccounts()" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          样机结算
        </view>
        <view v-if="zcck" @click="zcckAction" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          整车查看(作废)
        </view>
        <view v-if="jshi_order_gvs_status" @click="checkWL" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          查看物流
        </view>
      </view>
      <!--<order-list-item-more :isOrderMore="isOrderMore"></order-list-item-more>-->
    </view>
    <view v-else-if="info.details.length>0" v-for="(item,index) in info.details" :key="index">
      <view class="produceDetailItem-cnt" @click="goDetail">
        <view class="produceDetailItem-cnt-img">
          <image :src="item.jshd_product_img"></image>
        </view>
        <view class="">
          <view class="produceDetailItem-cnt-text">{{item.jshd_product_name}}</view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-cnt-info">下单时间：{{item.jshd_created_time}}</view>
            <view class="produceDetailItem-cnt-info">数量：{{item.jshd_qty}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-cnt-info">购买方式：{{item.waysOfPurchasingDto}}</view>
          </view>
        </view>
      </view>
      <view class="produceDetailItem-fot">
        <view class="col-75 padding-left-15">
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">合计:<span
              class="produceDetailItem-cnt-tiem">¥{{item.jshd_amount}}</span></view>
            <view class="produceDetailItem-cnt-price" v-if="item.jshd_pre_rate!==''">
              预定金金额:¥{{parseFloat(item.jshd_pre_amount).toFixed(2)}}
            </view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{parseFloat(item.jshd_invoice_price).toFixed(2)}}</span>
            </view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info" v-if="item.jshd_pre_rate!==''">预定金比例:<span
              class="produceDetailItem-fot-color">{{(item.jshd_pre_rate*1).toFixed(2)}}%</span></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info" v-if="item.jshd_pre_rate!==''">尾款:<span
              class="produceDetailItem-fot-color">{{parseFloat(product.jshd_pre_amount).toFixed(2)}}</span></view>
          </view>
        </view>
        <view class=" col-25 padding-4" v-if="invalidButton">
          <button
            @click="orderCancel"
            class="produceDetailItem-fot-btn"
            type="button"
          >订单作废
          </button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row2" v-if="index < info.details.length-1">
        <view class="col-25 produceDetailItem-btm">
          <view v-if="isChangePayer" @tap="changePayer"
                class="iconfont iconcancel iconStyle"></view>
          更改付款方
        </view>
        <view v-if="tctpConfirmButtonFun" @click="tctpConfirmButtonAction" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>统仓确认
        </view>
        <view @click="orderCancel" class="col-25 produceDetailItem-btm" v-if="invalidButton">
          <view class="iconfont iconcancel iconStyle"></view>
          订单作废
        </view>
        <view v-if="showNode" @click="nodeClick" class="col-25 produceDetailItem-btm">
          <view class="iconfont icontree iconStyle"></view>
          订单节点
        </view>
        <view v-if="info.btnsInfo.selfPayButton==='1'
                  ||info.btnsInfo.selfPayButton==='3'
                  ||info.btnsInfo.selfPayButton==='4'"
              @click="selfDeduction(info.btnsInfo.selfPayButton)"
              class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          自主扣款
        </view>
        <view v-if="info.btnsInfo.selfPayButton==='2'"
              @click="sampleMachineAccounts()" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          样机结算
        </view>
        <view v-if="zcck" @click="zcckAction" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          整车查看(作废)
        </view>
        <view v-if="jshi_order_gvs_status" @click="checkWL" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          查看物流
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row" v-if="index === info.details.length-1">
        <view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>
        <view @click="orderCancel" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>
          订单作废
        </view>
        <view @click="nodeClick" class="col-25 produceDetailItem-btm" v-if="showNode">
          <view class="iconfont icontree iconStyle"></view>
          订单节点
        </view>
        <view @click="checkWL" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>
          查看物流
        </view>
      </view>
      <!--<order-list-item-more
        :isOrderMore="isOrderMore"
        :tctpConfirmButton="tctpConfirmButton"
        >
      </order-list-item-more>-->
    </view>
    <j-pop-picker
      title="付款方"
      :isShowSure="true"
      :isShowClose="false"
      :isShowSearch="true"
      :cantCheckedCallback="isNoCanChecked"
      :show.sync="payerPickerShow"
      :options="payerOptions"
      :choseKeys.sync="currentchosePayerOption"
      @confirm="confirmPayer"
    >
      <template v-slot:head>
        <view class="balance-style">
          可用余额：￥{{currentPayerOption.balance||currentPayerOption.bookBalance}}
        </view>
      </template
      >
    </j-pop-picker>

    <order-pop-picker
      title="自主扣款"
      :show.sync="show"
      @confirm="modalConfirm"
    >
      <template>
        <!--信用订单-->
        <view v-if="info.btnsInfo.selfPayButton==='1'" class="jmodal-style">
          <view class="jmodal-item">
            <view class="key-style">信用订单：</view>
            <view class="val-style">{{info.info.bstnk}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">价格：</view>
            <view class="val-style">¥{{parseFloat(info.details[0].jshd_invoice_price).toFixed(2)}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">数量：</view>
            <view class="val-style">{{parseFloat(info.details[0].jshd_qty).toFixed(2)}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">合计：</view>
            <view class="val-style">¥{{parseFloat(info.details[0].jshd_amount)}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">付款方：</view>
            <view class="val-style">{{info.info.jshi_payto_name}}</view>
          </view>
        </view>
        <!--整车、反向定制订单-->
        <view v-if="info.btnsInfo.selfPayButton==='3'||info.btnsInfo.selfPayButton==='4'"
              class="jmodal-style">
          <view v-if="info.btnsInfo.selfPayButton==='3'" class="jmodal-item">
            <view class="key-style">反向定制订单：</view>
            <view class="val-style">{{info.info.bstnk}}</view>
          </view>
          <view v-if="info.btnsInfo.selfPayButton==='4'" class="jmodal-item">
            <view class="key-style">整车订单：</view>
            <view class="val-style">{{info.info.jshi_grouping_no}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">付款方：</view>
            <view class="val-style">{{info.info.jshi_payto_name}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">余额：</view>
            <view class="val-style">{{currentPayerInfo.balance||currentPayerInfo.bookBalance}}</view>
          </view>
        </view>
      </template>
    </order-pop-picker>
    <order-pop-picker
      title="周转样机结算"
      :show.sync="sampleMachineShow"
      @confirm="sampleMachineModalConfirm"
    >
      <template>
        <view class="jmodal-style">
          <view class="jmodal-item">
            <view class="key-style">版本号：</view>
            <view class="val-style">{{sampleMachine.detailEntity.priceVersion}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">价格：</view>
            <view class="val-style text-theme">¥{{(sampleMachine.detailEntity.supplyPrice).toFixed(2)}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">数量：</view>
            <view class="val-style">{{sampleMachine.detailEntity.discount}}</view>
          </view>
          <view class="jmodal-item">
            <view class="key-style">合计：</view>
            <view class="val-style">¥{{sampleMachine.detailEntity.amount}}</view>
          </view>
          <view @tap="changePay" class="jmodal-item">
            <view class="key-style">付款方：</view>
            <view class="val-style">{{currentSampleMachinePayer.value}}</view>
            <i class="iconfont iconyou"></i>
          </view>
          <view class="jmodal-item">
            <view class="key-style">余额：</view>
            <view class="val-style">{{currentSampleMachinePayer.payerBalance.balance||currentSampleMachinePayer.payerBalance.bookBalance}}</view>
          </view>
        </view>
      </template>
    </order-pop-picker>
    <!--样机结算付款方-->
    <j-pop-picker
      title="付款方"
      :isShowSearch="true"
      :cantCheckedCallback="isNoCanChecked"
      :show.sync="sampleMachinePayerPickerShow"
      :options="payersSampleMachine"
      :choseKeys.sync="choosedPayersSampleMachine"
    >
    </j-pop-picker>
    <j-modal
      :show.sync="modalShow"
      title="请输入验证码"
      @confirm="submitOrder"
    >
      <template>
        <view class="Verification-model">
          <view class="Verification-row">
            <view class="Verification-send">发送至</view>
            <input
              class="Verification-inputView"
              placeholder="请输入手机号"
              placeholder-class="col_c"
              v-model="linkNum"
            >
          </view>
          <view class="Verification-row">
            <view class="Verification-send">验证码</view>
            <input
              class="Verification-inputView"
              placeholder="请输入验证码"
              placeholder-class="col_c"
              v-model="formSubmit.bestSignVerifyCodeDto.verifyCode"
            >
          </view>
          <view
            class="send-btn">
            <text v-if="!sendMessageStatus" @tap="sendMessage">发送验证码</text>
            <text v-if="sendMessageStatus">{{time}}s后重新发送</text>
          </view>
        </view>
      </template>
    </j-modal>
  </view>
</template>

<script>
import './css/orderListItem.scss';
import '../shoppingCart/css/jOrderConfirmItem.scss';
import orderListItemMore from './order-list-itemMore';
import {
  mapGetters
} from 'vuex';
import {
  ORDER, USER
} from '../../store/mutationsTypes';
import JPopPicker from '../form/JPopPicker';
import OrderPopPicker from './OrderPopPicker';
import JModal from '../form/JModal';

export default {
  name: 'orderListItem',
  components: {
    orderListItemMore,
    OrderPopPicker,
    JPopPicker,
    JModal
  },
  props: {
    info: {
      type: Object
    },
    index: {
      type: [String, Number]
    },
    // 发送验证码的联系方式
    linkNum: {
      type: String
    }
  },
  data() {
    return {
      modalShow: false,
      sendMessageStatus: false, // 是否发送了验证码
      time: 60,
      userInfMianMi: false, // 是否免密
      // 订单提交信息
      formSubmit: {
        // 上上签验证信息
        bestSignVerifyCodeDto: {
          note: '',
          verifyCode: '',
          verifyKey: ''
        },
        orderNo: '',
        paytoCode: '',
        paytoName: '',
        paytoType: '',
        productCode: '',
        saletoCode: '',
        sendtoCode: ''
      },
      show: false,
      sampleMachineShow: false,
      sampleMachinePayerPickerShow: false,
      sampleMachine: {
        detailEntity: {
          priceVersion: '',
          supplyPrice: 0,
          discount: 0,
          amount: 0
        },
        infoEntity: {
          paytoCode: '',
          paytoName: ''
        }
      }, // 样机结算数据展示
      payersSampleMachine: [],
      choosedPayersSampleMachine: [],
      currentSampleMachinePayer: {
        value: '',
        paytoCode: '',
        paytoName: '',
        payerBalance: {}
      },
      // 样机付款方数据
      currentTitle: '',
      currentPayerInfo: {}, // 当前付款方 自主扣款
      state: '', // 自主扣款类型
      payerPickerShow: false, // 是否显示付款方
      payerOptions: [], // 更改付款方选项列表
      currentchosePayerOption: [], // 当前选择的付款方
      currentPayerOption: {},
      isOrderMore: false,
      tctpConfirmButton: false,
      ggfkf: false,
      titleAndNo: ''
    };
  },
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
    ...mapGetters({
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    }),
    titleAndNoFun() {
      if (this.info.details[0].jshd_price_type == 'MFYJ') {
        return `版本号:${this.info.details[0].jshd_price_version}`;
      }
      return `整单订单：${this.info.info.jshi_grouping_no}`;
    },
    tctpConfirmButtonFun() {
      return (this.info.btnsInfo.tctpConfirmButton == 1);
    },
    invalidButton() {
      return (this.info.btnsInfo.invalidButton != '0');
    },
    showNode() {
      const details = this.info.details[0];
      const info = this.info.info;
      // 判断订单节点是否存在
      if (details.jshd_tags == 'CROWD_FUNDING'
        && details.jshd_product_type == '3'
        && info.jshi_order_gvs_status == '1') {
        if (info.jshi_stock_type == 'ZCN'
          || info.jshi_stock_type == 'KXZF') {
          return true;
        }
        return false;
      }
      return false;
    },
    zcck() {
      // jshi_order_type IN('ZK','ZJ')&jshi_order_gvs_status=1
      const details = this.info.details[0];
      const info = this.info.info;
      if (info.jshi_order_gvs_status == '1') {
        if (info.jshi_order_type == 'ZK'
          || info.jshi_order_type == 'ZJ') {
          return true;
        }
        return false;
      }
      return false;
    },
    jshi_order_gvs_status() {
      const info = this.info.info;
      if (info.jshi_order_gvs_status == '1') {
        return true;
      }
      return false;
    },
    // 更改付款方
    isChangePayer() {
      const info = this.info.info;
      // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
      if ((info.jshi_order_type === 'ZK') || (info.jshi_order_type === 'ZJ') || (info.jshi_order_type === 'JK')) {
        if ((info.jshi_order_status === '11') || (info.jshi_order_status === '12')) {
          return true;
        }
        return false;
      }
      return false;
    }
  },
  watch: {
    choosedPayersSampleMachine(val) {
      this.payersSampleMachine.forEach((item) => {
        if (item.key === val[0]) {
          this.currentSampleMachinePayer = item;
        }
      });
    },
    currentchosePayerOption(newVal, oldVal) {
      if (newVal[0] !== oldVal[0]) {
        // 查询余额
        const itemPayer = this.payerOptions.find(v => v.customerCode === newVal[0]);
        this.customerService.payerBalance(itemPayer.customerCode, itemPayer.salesGroupCode).then((res) => {
          if (res.code === '1') {
            itemPayer.bookBalance = res.data.bookBalance;
            itemPayer.balance = res.data.balance;
            this.currentPayerOption = itemPayer;
            console.log(itemPayer);
          } else {
            this.currentPayerOption = itemPayer;
            console.log(itemPayer);
          }
        });
      }
    },
    info(val) {
      console.log(val);
    }
  },
  created() {
    console.log(this.info);
    this.isOrderMore = !this.isOrderMore;

    if (this.info.btnsInfo) {
      this.tctpConfirmButton = this.info.btnsInfo.tctpConfirmButton == '1';
    }
  },
  methods: {
    tctpConfirmButtonAction() {
      uni.showModal({
        title: '提示',
        content: '是否确认统仓统配',
        success: (res) => {
          if (res.confirm) {
            this.tctpConfirmNet();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async tctpConfirmNet() {
      console.log(this.info.info.bstnk);
      const bstnk = this.info.info.bstnk;
      const dnLogistics = this.info.info.dnLogistics;
      const { code } = await this.orderService.tctpConfirm(dnLogistics, bstnk);
      if (code === '200') {
        const that = this;
        uni.showToast({
          title: '成功'
        });
      }
    },
    // 不可以选中的付款方
    isNoCanChecked() {
      uni.showToast({
        title: '风险账号005，请联系当地财务解冻',
        icon: 'none'
      });
    },
    // 更改付款方
    async changePayer() {
      const bstnk = this.info.info.bstnk;
      // 查询付款方列表
      const { code, data } = await this.vehicleService.queryPayCode(
        this.saleInfo.customerCode, '', '', '', bstnk
      );
      if (code === '1') {
        data.data.items.forEach((item) => {
          item.key = item.customerCode;
          item.value = `(${item.customerCode})${item.customerName}`;
        });
        this.payerOptions = data.data.items;
        this.payerPickerShow = true;
        console.log(this.payerOptions);
      }
    },
    confirmPayer() {
      const that = this;
      const OrderNo = that.info.info.bstnk;
      console.log(this.currentPayerOption);
      const paytoCode = that.currentPayerOption.customerCode;
      const paytoName = that.currentPayerOption.customerName;

      console.log(that.defaultSendToInf);
      uni.showModal({
        title: '提示',
        content: '是否确认更改付款方',
        success(res) {
          if (res.confirm) {
            that.trafficService.xyChangePayTo(OrderNo, paytoCode, paytoName).then((res) => {
              if (res.code === '1') {
                uni.showToast({
                  title: '更改付款方成功',
                  icon: 'none'
                });
                that.payerPickerShow = false;
              } else {
                that.payerPickerShow = false;
              }
              that.currentchosePayerOption = [];
            });
          } else if (res.cancel) {
            uni.showToast({
              title: '取消更改付款方',
              icon: 'none'
            });
            that.payerPickerShow = false;
            that.currentchosePayerOption = [];
          }
        }
      });
    },
    getMore() {
      const info = this[ORDER.GET_ORDER].orderDetail.info;
      console.log('=====getMore=======');
      console.log(this.info);
      this.isOrderMore = !this.isOrderMore;
      console.log(this.index);
      console.log(this.isOrderMore);
      this.tctpConfirmButton = this.info.btnsInfo.tctpConfirmButton;
      this.selfPayButton = this.info.btnsInfo.selfPayButton;

      // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
      if ((info.jshi_order_type == 'ZK') || (info.jshi_order_type == 'ZJ') || (info.jshi_order_type == 'JK')) {
        if ((info.jshi_order_status == '11') || (info.jshi_order_status == '12')) {
          this.ggfkf = true;
        } else {
          this.ggfkf = false;
        }
      } else {
        this.ggfkf = false;
      }

      if (info.jshi_order_gvs_status == '1') {
        this.jshi_order_gvs_status = true;
      } else {
        this.jshi_order_gvs_status = false;
      }

      console.log(this);
    },
    goDetail() {
      this.$emit('goDetail', this.info);
    },
    nodeClick() {
      const itemInfo = JSON.stringify(this.info);
      uni.navigateTo({
        url: `/pages/orderList/orderNode?currentInfo=${itemInfo}`
      });
    },
    // 查看物流
    checkWL() {
      uni.navigateTo({
        url: '/pages/orderList/orderWL'
      });
    },
    // 自主扣款
    async selfDeduction(state) {
      const orderNo = this.info.info.bstnk;
      const paytoCode = this.info.info.jshi_payto_code;
      const salesGroupCode = this.saleInfo.salesGroupCode;
      let title = '';
      if (state === '1') {
        // 信用订单
        title = '信用订单';
      } else if (state === '3') {
        // 反向定制
        title = '反向定制订单';
      } else if (state === '4') {
        // 整车
        title = '整车订单';
      } else if (state === '2') {

      }
      this.state = state;
      this.currentTitle = `${title} ${orderNo}`;
      if (state === '3' || state === '4') {
        // 查询付款方余额
        const { code, data } = await this.customerService.payerBalance(paytoCode, salesGroupCode);
        if (code === '1') {
          this.currentPayerInfo = data;
          this.show = true;
        }
      } else {
        this.show = true;
      }
    },
    // 样机结算
    async sampleMachineAccounts() {
      // 查询付款方列表
      const form = [{
        isCheckCreditModel: '',
        orderNo: this.info.info.jshi_order_no,
        priceType: this.info.details[0].jshd_price_type,
        priceVersion: this.info.details[0].jshd_price_version,
        productGroup: this.info.details[0].jshd_product_group,
        saletoCode: this.info.info.jshi_saleto_code,
        sendtoCode: this.info.info.jshi_sendto_code,
      }];
      const { data, code } = await this.orderService.paytoInfo(form);
      if (code === '1') {
        data[this.info.info.jshi_order_no].forEach((item) => {
          item.key = item.customerCode;
          item.value = `(${item.customerCode})${item.customerName}`;
          if (item.defaultFlag === '1') {
            this.currentSampleMachinePayer = item;
          }
        });
        this.payersSampleMachine = data[this.info.info.jshi_order_no];
        if (JSON.stringify(this.currentSampleMachinePayer.payerBalance) === '{}') {
          this.currentSampleMachinePayer = this.payersSampleMachine[0];
        }
        console.log(this.currentSampleMachinePayer);
      }
      // 获取免费样机信息
      const orderNo = this.info.info.jshi_order_no;
      const res = await this.orderService.generateOfmyyjjsRecord({
        orderNo
      }, { noToast: true });
      this.sampleMachine = res.data;
      this.sampleMachineShow = true;
    },
    // 更改样机结算付款方
    changePay() {
      this.sampleMachinePayerPickerShow = true;
    },
    // 自主扣款点击确定
    async modalConfirm() {
      console.log(this.state);
      if (this.state === '1') {
        // 信用订单
        const orderNo = this.info.info.bstnk;
        const { msg } = await this.trafficService.XyCutPayment(orderNo);
        uni.showToast({
          titel: msg,
          icon: 'none'
        });
      } else if (this.state === '3') {
        // 反向定制
        const orderNo = this.info.info.bstnk;
        const { msg } = await this.orderService.payByCustomer(orderNo);
        uni.showToast({
          titel: msg,
          icon: 'none'
        });
      } else if (this.state === '4') {
        // 整车
        const orderNo = this.info.info.jshi_grouping_no;
        const { msg } = await this.trafficService.payByCustomer(orderNo);
        uni.showToast({
          titel: msg,
          icon: 'none'
        });
      }
    },
    // 样机结算点击确定
    async sampleMachineModalConfirm() {
      // 判断是否免密，免密则直接支付否则弹出发送验证码弹窗
      await this.getUserInfMianMi();
      if (this.userInfMianMi) {
        console.log('true,提交');
        this.submitOrder();
      } else {
        this.modalShow = true;
      }
    },
    async getUserInfMianMi() {
      /* 获取免密 */
      const data = await this.orderService.mianMi();
      if (data.code === '1') {
        this.userInfMianMi = data.data;
      }
    },
    // 发送验证码
    async sendMessage() {
      const { code, data } = await this.orderService.send(this.formData.saletoCode);
      if (code === '1') {
        this.sendMessageStatus = true;
        this.formSubmit.bestSignVerifyCodeDto.verifyKey = data.data.verifyKey;
        uni.showToast({
          title: '短信发送成功',
        });
      }
    },
    // 提交周转样机订单
    async submitOrder() {
      if (!this.formSubmit.bestSignVerifyCodeDto.verifyCode && !this.userInfMianMi) {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        });
        return;
      }
      // const balance = this.currentSampleMachinePayer.payerBalance.balance || this.currentSampleMachinePayer.payerBalance.bookBalance;
      // const amount = this.sampleMachine.detailEntity.amount;
      this.formSubmit.orderNo = this.sampleMachine.detailEntity.orderNo;
      this.formSubmit.paytoCode = this.currentSampleMachinePayer.customerCode;
      this.formSubmit.paytoName = this.currentSampleMachinePayer.customerName;
      this.formSubmit.paytoType = this.currentSampleMachinePayer.payerType;
      this.formSubmit.productCode = this.sampleMachine.detailEntity.productCode;
      this.formSubmit.saletoCode = this.sampleMachine.infoEntity.saletoCode;
      this.formSubmit.sendtoCode = this.sampleMachine.infoEntity.sendtoCode;
      const { code, data } = await this.orderService.toPayMfyjjsRecord(this.formSubmit);
      if (code === '1') {
        console.log(data);
        const groupings = JSON.stringify([{ groupingNo: data.groupingNo }]);
        uni.navigateTo({
          url: `/pages/shoppingCart/orderConfirmAccept?groupings=${groupings}`
        });
      } else {
        uni.showToast({
          title: data.msg,
          icon: 'none'
        });
      }
    },
    zcckAction() {
      uni.showModal({
        title: '提示',
        content: '正在开发',
        showCancel: false
      });
    },
    orderFailsAction() {
      if (this.info.info.selfUseOrderStatus == '下单失败') {
        uni.showModal({
          title: '提示',
          content: this.info.info.jshi_error_msg,
          showCancel: false
        });
      }
    },
    async orderSelfSignedFun() {
      const { code } = await this.orderService.orderSelfSigned(this.infoList.info.bstnk);
      if (code === '1') {
        uni.showToast({
          title: '订单签收成功',
          icon: 'none'
        });
      }
    },
    async  orderCancle() {
      const { code } = await this.orderService.cancelOrderBybstnk(this[ORDER.GET_ORDER].orderDetail.info.bstnk);
      if (code === '1') {
        const that = this;
        uni.showToast({
          title: '取消订单成功',
          icon: 'none'
        });
        setTimeout(() => {
          that.goIndex();
        }, 1000);
      }
    }
  }
};
</script>
