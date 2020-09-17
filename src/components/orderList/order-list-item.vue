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
          <view class="iconfont iconcancel iconStyle"></view>
          更改付款方
        </view>
        <view @click="tctpConfirmButtonAction" class="produceDetailItem-btm" v-if="tctpConfirmButtonFun">
          <view class="iconfont iconcancel iconStyle"></view>
          统舱统配确认
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
              @click="selfDeduction(info.btnsInfo.selfPayButton)" class="produceDetailItem-btm">
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
          <view class="iconfont iconcancel iconStyle"></view>
          统舱统配确认
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
              @click="selfDeduction(info.btnsInfo.selfPayButton)" class="produceDetailItem-btm">
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
    <j-modal
      :title="currentTitle"
      :show.sync="show"
      @confirm="modalConfirm"
    >
      <template>
        <!--信用订单-->
        <view
          v-if="info.btnsInfo.selfPayButton==='1'"
          class="jmodal-style"
        >
          <view class="orderListItem-model-item">
            <view
              class="orderListItem-model-item-name"
            >价格：</view>
            <view
              class="orderListItem-model-item-val j-common-color"
            >¥{{jshUtil.formatNumber(info.details[0].jshd_invoice_price,2)}}</view>
          </view>
          <view class="orderListItem-model-item">
            <view
              class="orderListItem-model-item-name"
            >数量：</view>
            <view
              class="orderListItem-model-item-val"
            >{{info.details[0].jshd_qty}}</view>
          </view>
          <view class="orderListItem-model-item">
            <view
              class="orderListItem-model-item-name"
            >合计：</view>
            <view
              class="orderListItem-model-item-val j-common-color"
            >¥{{jshUtil.formatNumber(info.details[0].jshd_amount,2)}}</view>
          </view>
          <view class="orderListItem-model-item">
            <view
              class="orderListItem-model-item-name"
            >付款方：</view>
            <view
              class="orderListItem-model-item-val"
            >{{info.info.jshi_payto_name}}</view>
          </view>
        </view>
        <!--整车、反向定制订单-->
        <view
          class="jmodal-style"
          v-if="info.btnsInfo.selfPayButton==='3' || info.btnsInfo.selfPayButton==='4'"
        >
          <view class="orderListItem-model-item">
            <view class="orderListItem-model-item-name">付款方：</view>
            <view class="orderListItem-model-item-val">{{info.info.jshi_payto_name}}</view>
          </view>
          <view class="orderListItem-model-item">
            <view class="orderListItem-model-item-name">余额：</view>
            <view
              class="orderListItem-model-item-val j-common-color"
            >{{currentPayerInfo.balance||currentPayerInfo.bookBalance}}</view>
          </view>
        </view>
      </template>
    </j-modal>
  </view>
</template>

<script>
import './css/orderListItem.scss';
import '../shoppingCart/css/jOrderConfirmItem.scss';
import {
  mapGetters
} from 'vuex';
import {
  ORDER,
  USER
} from '../../store/mutationsTypes';
import JPopPicker from '../form/JPopPicker';
import JModal from '../form/JModal';

export default {
  name: 'orderListItem',
  components: {
    JPopPicker,
    JModal
  },
  props: {
    info: {
      type: Object
    },
    index: {
      type: [String, Number]
    }
  },
  data() {
    return {
      show: false,
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
    // console.log('this.info.details.jshd_price_type'+this.info.details.jshd_price_type)
  },
  methods: {
    tctpConfirmButtonAction() {
      uni.showModal({
        title: '提示',
        content: '是否确认统舱统配',
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
      if (code === '1') {
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
      const paytoCode = that.defaultSendToInf.customerCode;
      const paytoName = that.defaultSendToInf.customerName;

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
      this.$emit('goDetail', this.index);
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
    async selfDeduction(state) {
      /* 自主扣款 */
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
        const { msg } = await this.trafficService.payByCustomer(orderNo);
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
      console.log('queding');
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
    orderCancel() {
      /* 是否确认作废此订单 */
      uni.showModal({
        title: '提示',
        content: '是否确认作废此订单？',
        success: async (res) => {
          if (res.confirm) {
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
      });
    }
  }
};
</script>
