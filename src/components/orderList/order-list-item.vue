<template>
  <view class="produceDetailItem">
    <view class="produceDetailItem-head">
      <button type="button" class="produceDetailItem-head-btn">组合</button>
      <text class="produceDetailItem-head-text">整单订单：202006191745435</text>
      <text class="produceDetailItem-head-text-status">订单成功</text>
    </view>
    <view class="produceDetailItem-cnt">
      <view class="produceDetailItem-cnt-img">
        <image src="@/assets/img/goods/example-fridge.jpg"></image>
      </view>
      <view class="">
        <view class="produceDetailItem-cnt-text">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
        <view class="produceDetailItem-cnt-inf">
          <view class="produceDetailItem-cnt-info">下单时间：2019-10-10 12:2</view>
          <view class="produceDetailItem-cnt-info">数量：2</view>
        </view>
        <view class="produceDetailItem-cnt-inf">
          <view class="produceDetailItem-cnt-info">订单类型：普通订单</view>
        </view>
      </view>
    </view>
    <view class="produceDetailItem-fot">
      <view class="">
        <view class="produceDetailItem-cnt-inf">
          <view class="produceDetailItem-fot-info">合计:<span class="produceDetailItem-cnt-tiem">¥45799.00</span></view>
          <view class="produceDetailItem-cnt-price">预定金金额:¥28282.11</view>
        </view>
        <view class="produceDetailItem-cnt-inf">
          <view class="produceDetailItem-fot-info">单价:<span class="produceDetailItem-fot-color">¥1799.00</span></view>
          <view class="produceDetailItem-line"></view>
          <view class="produceDetailItem-fot-info">预定金比例:<span class="produceDetailItem-fot-color">45%</span></view>
          <view class="produceDetailItem-line"></view>
          <view class="produceDetailItem-fot-info">尾款:<span class="produceDetailItem-fot-color">45%</span></view>
        </view>
      </view>
      <button type="button" class="produceDetailItem-fot-btn">订单作废</button>
    </view>
    <view class="uni-flex uni-row produceDetailItem-btm-row">
      <view class="col-25 produceDetailItem-btm" style="padding-left: 10px;" @click="getMore">...</view>
      <view class="col-25 produceDetailItem-btm"><view class="iconfont iconqiche iconStyle"></view>订单作废</view>
      <view class="col-25 produceDetailItem-btm"><view class="iconfont iconqiche iconStyle"></view>查看物流</view>
      <view class="col-25 produceDetailItem-btm"><view class="iconfont iconqiche iconStyle"></view>订单节点</view>
    </view>
    <order-list-item-more :isOrderMore="isOrderMore"></order-list-item-more>
  </view>
</template>

<script>
import './css/orderListItem.scss';
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
    }
  }
};
</script>
