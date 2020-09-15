<template>
  <view class="produceDetailItem">
    <view class="produceDetailItem-head">
      <button type="button" class="produceDetailItem-head-btn">{{info.info.combinationTag}}</button>
      <text class="produceDetailItem-head-text">{{titleAndNoFun}}</text>
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
          <button v-if="invalidButton" @click="orderCancle" type="button" class="produceDetailItem-fot-btn">订单作废</button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row">
        <!--<view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>-->
        <!-- <view class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>自助作废
        </view> -->
        <view v-if="ggfkf" class="produceDetailItem-btm">
          <view class="iconfont iconcancel iconStyle"></view>更改付款方
        </view>
        <view v-if="tctpConfirmButtonFun"  @click="tctpConfirmButtonAction" class="produceDetailItem-btm">
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
          <view v-if="ggfkf" class="iconfont iconcancel iconStyle"></view>更改付款方
        </view>
        <view v-if="tctpConfirmButtonFun" @click="tctpConfirmButtonAction" class="col-25 produceDetailItem-btm">
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
  ORDER
} from '../../store/mutationsTypes';


export default {
  name: 'orderListItem',
  components: {
    orderListItemMore
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
      isOrderMore: false,
      tctpConfirmButton: false,
      ggfkf:false,
      selfPayButton:false,
      jshi_order_gvs_status:false,
      titleAndNo:''
    };
  },
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
  },
  created() {
    console.log('11111111');
    console.log(this.info)
    this.isOrderMore = !this.isOrderMore;

    if(this.info.btnsInfo) {
      this.tctpConfirmButton = this.info.btnsInfo.tctpConfirmButton == '1';
     this.selfPayButton = this.info.btnsInfo.selfPayButton  == '1';
    }
    
    const info = this.info.info
    // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
    if((info.jshi_order_type == 'ZK')||(info.jshi_order_type == 'ZJ')||(info.jshi_order_type == 'JK')) {
      if((info.jshi_order_status == '11')||(info.jshi_order_status == '22')) {
        this.ggfkf = true;
      } else {
        this.ggfkf = false;
      }
    } else {
      this.ggfkf = false;
    }
    if(info.jshi_order_gvs_status == '1') {
      this.jshi_order_gvs_status = true;
    } else {
      this.jshi_order_gvs_status = false;
    }
    // console.log('this.info.details.jshd_price_type'+this.info.details.jshd_price_type)
    
  },
  computed: {
    titleAndNoFun() {
      if(this.info.details[0].jshd_price_type == 'MFYJ') {
        return '版本号:'+this.info.details[0].jshd_price_version;
      } else {
        return '整单订单：'+this.info.info.jshi_grouping_no;
      }
    },
    tctpConfirmButtonFun() {
      return (this.info.btnsInfo.tctpConfirmButton == 1);
    },
    invalidButton() {
      return (this.info.btnsInfo.invalidButton  != '0');
    },
    showNode() {
      const details = this.info.details[0];
      const info = this.info.info;
      // 判断订单节点是否存在
      if (details.jshd_tags == 'CROWD_FUNDING'
      && details.jshd_product_type == '3'
      && info.jshi_order_gvs_status == '1')
      {
        if( info.jshi_stock_type == 'ZCN'
        || info.jshi_stock_type == 'KXZF'){
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
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
      const bstnk = this.info.info.bstnk
      const dnLogistics = this.info.info.dnLogistics;
      const { code } = await this.orderService.tctpConfirm(dnLogistics,bstnk);
      if (code === '1') {
        const that = this;
        uni.showToast({
          title: '成功'
        });
      }
    },
    getMore() {
      const info = this[ORDER.GET_ORDER].orderDetail.info;
      console.log('=====getMore=======')
      console.log(this.info)
      this.isOrderMore = !this.isOrderMore;
      console.log(this.index);
      console.log(this.isOrderMore);
      this.tctpConfirmButton = this.info.btnsInfo.tctpConfirmButton;
      this.selfPayButton = this.info.btnsInfo.selfPayButton;

      // 更改付款方 jshi_order_type IN('ZK','ZJ','JK')&jshi_order_status IN(11,12)
      if((info.jshi_order_type == 'ZK')||(info.jshi_order_type == 'ZJ')||(info.jshi_order_type == 'JK')) {
        if((info.jshi_order_status == '11')||(info.jshi_order_status == '22')) {
          this.ggfkf = true;
        } else {
          this.ggfkf = false;
        }
      } else {
        this.ggfkf = false;
      }

      if(info.jshi_order_gvs_status == '1') {
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
      if(this.info.info.selfUseOrderStatus == '下单失败') {
        uni.showModal({
          title: '提示',
          content: this.info.info.jshi_error_msg,
          showCancel:false
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
