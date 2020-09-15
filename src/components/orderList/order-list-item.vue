<template>
  <view class="produceDetailItem">
    <view class="produceDetailItem-head">
      <button type="button" class="produceDetailItem-head-btn">{{info.info.combinationTag}}</button>
      <text class="produceDetailItem-head-text">{{titleAndNo}}</text>
      <text @click="orderFailsAction" class="produceDetailItem-head-text-status">{{info.info.selfUseOrderStatus}}</text>
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
            <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥{{parseFloat(info.details[0].jshd_amount).toFixed(2)}}</span></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-cnt-price">预定金金额:¥{{info.details[0].jshd_pre_amount}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{parseFloat(info.details[0].jshd_invoice_price).toFixed(2)}}</span></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-fot-info">预定金比例:<span class="produceDetailItem-fot-color">{{(info.details[0].jshd_pre_rate*1).toFixed(2)}}%</span></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view v-if="info.details[0].jshd_pre_rate!==''" class="produceDetailItem-fot-info">尾款:<span class="produceDetailItem-fot-color">{{(parseFloat(info.details[0].jshd_invoice_price) - parseFloat(info.details[0].jshd_pre_amount)).toFixed(2)}}</span></view>
          </view>
        </view>
        <view class=" col-25 padding-4">
          <button v-if="invalidButton == 1" @click="orderCancle" type="button" class="produceDetailItem-fot-btn">订单作废</button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row">
        <!--<view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>-->
        <!-- <view class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>自助作废
        </view> -->
        <view v-if="ggfkf" @tap="changePayer" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>更改付款方
        </view>
        <view v-if="tctpConfirmButton" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>统舱统配确认
        </view>
        <view v-if="selfPayButton" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>前往结算
        </view>
        <view v-if="invalidButton"  @click="orderCancle" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>订单作废
        </view>
        <view v-if="showNode" @click="nodeClick" class="produceDetailItem-btm">
          <view class="iconfont icontree iconStyle"></view>订单节点
        </view>
        <view v-if="jshi_order_gvs_status" @click="checkWL" class="produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>查看物流
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
            <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥{{item.jshd_amount}}</span></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-cnt-price">预定金金额:¥{{item.jshd_pre_amount}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{parseFloat(item.jshd_invoice_price).toFixed(2)}}</span></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-fot-info">预定金比例:<span class="produceDetailItem-fot-color">{{(item.jshd_pre_rate*1).toFixed(2)}}%</span></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-line"></view>
            <view v-if="item.jshd_pre_rate!==''" class="produceDetailItem-fot-info">尾款:<span class="produceDetailItem-fot-color">{{parseFloat(product.jshd_pre_amount).toFixed(2)}}</span></view>
          </view>
        </view>
        <view v-if="invalidButton"  class=" col-25 padding-4">
          <button @click="orderCancle" type="button" class="produceDetailItem-fot-btn">订单作废</button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row2" v-if="index < info.details.length-1">
        <!--<view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>-->
        <!-- <view class="col-25 produceDetailItem-btm">
          <view v-if="invalidButton" class="iconfont iconcancel iconStyle"></view>自助作废
        </view> -->
        <view class="col-25 produceDetailItem-btm">
          <view v-if="ggfkf" @tap="changePayer"
                class="iconfont iconcancel iconStyle"></view>
          更改付款方
        </view>
        <view v-if="tctpConfirmButton"  class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>统舱统配确认
        </view>
        <view v-if="selfPayButton" class="col-25 produceDetailItem-btm">
          <view  class="iconfont iconcancel iconStyle"></view>前往结算
        </view>
        <view v-if="invalidButton" @click="orderCancle" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>订单作废
        </view>
        <view v-if="showNode" @click="nodeClick" class="col-25 produceDetailItem-btm">
          <view class="iconfont icontree iconStyle"></view>订单节点
        </view>
        <view v-if="jshi_order_gvs_status" @click="checkWL" class="col-25 produceDetailItem-btm">
          <view class="iconfont iconcar iconStyle iconTransform"></view>查看物流
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
        <view @click="orderCancle" class="col-25 produceDetailItem-btm"><view class="iconfont iconcancel iconStyle"></view>订单作废</view>
        <view v-if="showNode" @click="nodeClick" class="col-25 produceDetailItem-btm"><view class="iconfont icontree iconStyle"></view>订单节点</view>
        <view @click="checkWL" class="col-25 produceDetailItem-btm"><view class="iconfont iconcar iconStyle iconTransform"></view>查看物流</view>
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

export default {
  name: 'orderListItem',
  components: {
    orderListItemMore,
    JPopPicker
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
      payerPickerShow: false, // 是否显示付款方
      payerOptions: [], // 更改付款方选项列表
      currentchosePayerOption: [], // 当前选择的付款方
      currentPayerOption: {},
      isOrderMore: false,
      tctpConfirmButton: false,
      invalidButton: false,
      showNode: false,
      ggfkf: false,
      selfPayButton: false,
      jshi_order_gvs_status: false,
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
    }
  },
  created() {
    console.log(this.saleInfo);
    console.log(this.info);

    const details = this[ORDER.GET_ORDER].orderDetail.details;
    // 判断订单节点是否存在
    if (details.jshd_tags == 'CROWD_FUNDING'
    && details.jshd_product_type == '3'
    && details.jshi_order_gvs_status == '1'
    && details.jshi_stock_type == 'ZCN'
    && details.jshi_stock_type == 'KXZF') {
      this.showNode = true;
    } else {
      this.showNode = false;
    }

    this.isOrderMore = !this.isOrderMore;
    console.log(this.index);
    console.log(this.isOrderMore);
    // debugger
    if (this.info.btnsInfo) {
      this.tctpConfirmButton = this.info.btnsInfo.tctpConfirmButton == '1';
      this.invalidButton = this.info.btnsInfo.invalidButton == '1';
      this.selfPayButton = this.info.btnsInfo.selfPayButton == '1';
    }

    const info = this.info.info;
    // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
    if ((info.jshi_order_type == 'ZK') || (info.jshi_order_type == 'ZJ') || (info.jshi_order_type == 'JK')) {
      if ((info.jshi_order_status == '11') || (info.jshi_order_status == '22')) {
        this.ggfkf = true;
      }
    }
    if (info.jshi_order_gvs_status == '1') {
      this.jshi_order_gvs_status = true;
    } else {
      this.jshi_order_gvs_status = false;
    }

    // console.log('this.info.details.jshd_price_type'+this.info.details.jshd_price_type)

    // debugger
    this.titleAndNo = this.info.details[0].jshd_price_type == 'MFYJ' ? (`版本号:${this.info.details[0].jshd_price_version}`) : (`整单订单：${this.info.info.jshi_grouping_no}`);
    // jshd_tags=CROWD_FUNDING&jshd_product_type=3
    // &jshi_order_gvs_status=1&(jshi_stock_type:"ZCN"|jshi_stock_type:"KXZF")
  },
  methods: {
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
            });
          } else if (res.cancel) {
            uni.showToast({
              title: '取消更改付款方',
              icon: 'none'
            });
            that.payerPickerShow = false;
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
      this.invalidButton = this.info.btnsInfo.invalidButton;
      this.selfPayButton = this.info.btnsInfo.selfPayButton;
      // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
      if ((info.jshi_order_type == 'ZK') || (info.jshi_order_type == 'ZJ') || (info.jshi_order_type == 'JK')) {
        if ((info.jshi_order_status == '11') || (info.jshi_order_status == '22')) {
          this.ggfkf = true;
        }
      }
      if (info.jshi_order_gvs_status == '1') {
        this.jshi_order_gvs_status = true;
      } else {
        this.jshi_order_gvs_status = false;
      }

      console.log(this);
      console.log(`===========${this.invalidButton}`);
    },
    goDetail() {
      this.$emit('goDetail', this.index);
    },
    nodeClick() {
      uni.navigateTo({
        url: '/pages/orderList/orderNode'
      });
    },
    // 查看物流
    checkWL() {
      uni.navigateTo({
        url: '/pages/orderList/orderWL'
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
    async  orderCancle() {
      const { code } = await this.orderService.cancelOrderBybstnk(this[ORDER.GET_ORDER].orderDetail.info.bstnk);
      if (code === '1') {
        const that = this;
        uni.showToast({
          title: '取消订单成功'
        });
        setTimeout(() => {
          that.goIndex();
        }, 1000);
      }
    }
  }
};
</script>
