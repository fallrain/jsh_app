<template>
  <view class="produceDetailItem" @click="goDetail">
    <view class="produceDetailItem-head">
      <button type="button" class="produceDetailItem-head-btn">{{info.info.combinationTag}}</button>
      <text class="produceDetailItem-head-text">整单订单：{{info.info.jshi_grouping_no}}</text>
      <text class="produceDetailItem-head-text-status">{{info.info.selfUseOrderStatus}}</text>
    </view>
    <view v-if="info.details.length>2">
      <view class="produceDetailItem-cnt">
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
            <view class="produceDetailItem-cnt-info">订单类型：{{info.details[0].waysOfPurchasingDto}}</view>
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
            <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥{{info.details[0].jshd_amount}}</span></view>
            <view class="produceDetailItem-cnt-price">预定金金额:¥{{info.details[0].jshd_invoice_price}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{info.details[0].jshd_invoice_price}}</span></view>
            <view class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info">预定金比例:<span class="produceDetailItem-fot-color">45%</span></view>
            <view class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info">尾款:<span class="produceDetailItem-fot-color">45%</span></view>
          </view>
        </view>
        <view class=" col-25 padding-4">
          <button type="button" class="produceDetailItem-fot-btn">订单作废</button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row">
        <view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcancel iconStyle"></view>订单作废</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont icontree iconStyle"></view>订单节点</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcar iconStyle iconTransform"></view>查看物流</view>
      </view>
      <order-list-item-more :isOrderMore="isOrderMore"></order-list-item-more>
    </view>
    <view v-else-if="info.details.length>0" v-for="(item,index) in info.details" :key="index">
      <view class="produceDetailItem-cnt">
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
            <view class="produceDetailItem-cnt-info">订单类型：{{item.waysOfPurchasingDto}}</view>
          </view>
        </view>
      </view>
      <view class="produceDetailItem-fot">
        <view class="col-75 padding-left-15">
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥{{item.jshd_amount}}</span></view>
            <view class="produceDetailItem-cnt-price">预定金金额:¥{{item.jshd_invoice_price}}</view>
          </view>
          <view class="produceDetailItem-cnt-inf">
            <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥{{item.jshd_invoice_price}}</span></view>
            <view class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info">预定金比例:<span class="produceDetailItem-fot-color">45%</span></view>
            <view class="produceDetailItem-line"></view>
            <view class="produceDetailItem-fot-info">尾款:<span class="produceDetailItem-fot-color">45%</span></view>
          </view>
        </view>
        <view class=" col-25 padding-4">
          <button type="button" class="produceDetailItem-fot-btn">订单作废</button>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row2" v-if="index < info.details.length-1">
        <view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcancel iconStyle"></view>订单作废</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont icontree iconStyle"></view>订单节点</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcar iconStyle iconTransform"></view>查看物流</view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
      </view>
      <view class="uni-flex uni-row produceDetailItem-btm-row" v-if="index === info.details.length-1">
        <view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcancel iconStyle"></view>订单作废</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont icontree iconStyle"></view>订单节点</view>
        <view class="col-25 produceDetailItem-btm"><view class="iconfont iconcar iconStyle iconTransform"></view>查看物流</view>
      </view>
      <order-list-item-more :isOrderMore="isOrderMore"></order-list-item-more>
    </view>
  </view>
</template>

<script>
import './css/orderListItem.scss';
import '../shoppingCart/css/jOrderConfirmItem.scss';
import orderListItemMore from './order-list-itemMore';

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
      isOrderMore: false
    };
  },
  methods: {
    getMore() {
      this.isOrderMore = !this.isOrderMore;
      console.log(this.index);
      console.log(this.isOrderMore);
    },
    goDetail() {
      this.$emit('goDetail', this.index);
    }
  }
};
</script>
