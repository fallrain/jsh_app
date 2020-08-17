<template>
  <view class="vehicleDetailGood">
    <view class="v-d-g-wrap">
      <view class="v-d-g-detail" v-for="(goods,index) in goodsList" :key="index">
        <view class="v-d-g-detail-odd">
          调货单号：<text class="v-d-g-detail-odd-num">ZK2100008608001</text>
          <view class="v-d-g-detail-close iconfont iconcross"></view>
        </view>
        <view class="v-c-i-cnt">
          <view class="v-c-i-cnt-img-wrap">
            <image src="@/assets/img/goods/example-fridge.jpg"></image>
          </view>
          <view class="">
            <view class="v-c-i-cnt-inf-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高......</view>
            <view class="v-c-i-btm-version">
              <view class="v-c-i-cnt-price v-c-i-flox3">¥ 45996.00</view>
            </view>
            <view class="v-c-i-cnt-inf-picker v-c-i-flox10" @tap="showPayer">
              <view class="v-c-i-flox3">付款方<i class="iconfont iconxia"></i></view>
              <view class="v-c-i-cnt-inf-picker-rk">家用静音全自动10KG洗烘一体高温eeeeeee杀菌除高...</view>
            </view>
          </view>
        </view>
        <view class="v-c-i-cnt-foot">
          <view class="v-c-i-flox4">
            <text class="v-c-i-cnt-check"> 210</text>
            <text class="v-c-i-cnt-foot-text">件起售 | 限购</text>
            <text class="v-c-i-cnt-check"> 2100</text>
          </view>
          <view class="v-c-i-flox4">
            <text class="v-c-i-cnt-foot-text">小计： </text>
            <text class="v-c-i-cnt-foot-value"> ¥ 45996.00</text>
          </view>
          <view class="">
            <uni-number-box></uni-number-box>
          </view>
        </view>
        <view class="v-d-g-detail-mark-item-name">
            <text class="v-d-g-detail-mark-item-name-star">直扣:92.31% </text>|
            <view class="v-d-g-detail-mark-item-name-end">返利：COM </view>|
            <text class="v-d-g-detail-mark-item-name-star">台返:0</text>|
            <view class="v-d-g-detail-mark-item-name-end">供价:￥5892.21</view>
          <view v-if="index < goodsList.length-1" class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
            <view class="jOrderConfirmItem-semicircle"></view>
          </view>
          <view v-if="index < goodsList.length-1" class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
            <view class="jOrderConfirmItem-semicircle"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="v-d-g-total">
      <view class="v-d-g-total-text ml48">共计金额:</view>
      <view class="v-d-g-total-price ml20">¥ 3456.00</view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/vehicleDetailGood.scss';
import './css/vehicleCarItem.scss';
import '../shoppingCart/css/jOrderConfirmItem.scss';

export default {
  name: 'vehicleDetailGood',
  components: {
    uniNumberBox
  },
  props: {
    goodsList: {// 商品列表
      type: Array,
      default: () => []
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  methods: {
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goodsList, this.index);
    },
  }
};
</script>

<style scoped>

</style>
