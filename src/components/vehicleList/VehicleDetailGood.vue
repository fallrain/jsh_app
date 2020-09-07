<template>
  <view class="vehicleDetailGood">
    <view class="v-d-g-wrap">
      <view class="v-d-g-detail" v-for="(goods,index) in (goodsList.orderList)" :key="index">
        <view class="v-d-g-detail-odd">
          整车单号：<text class="v-d-g-detail-odd-num">{{goods.IBL_KORDERNO}}</text>
          <view class="v-d-g-detail-close iconfont iconcross"></view>
        </view>
        <view class="v-c-i-cnt">
          <view class="v-c-i-cnt-img-wrap">
            <image :src="goods.THUMBNAIL" @tap="goDetail(goods)"></image>
          </view>
          <view class="">
            <view class="v-c-i-cnt-inf-title">{{goods.PRODUCTNAME}}</view>
            <view class="v-c-i-btm-version">
              <view class="v-c-i-cnt-price v-c-i-flox3">¥ {{goods.UNITPRICE}}</view>
            </view>
            <view class="v-c-i-cnt-inf-picker v-c-i-flox10"  @tap="getPayer(goods ,index)">
              <view class="v-c-i-flox3">付款方<i class="iconfont iconxia"></i></view>
              <view class="v-d-g-total-price-info" v-if="goods.payCheck">
                <view class="v-c-i-cnt-price-info-li" v-for="(it,index2) in goods.payVehiList.data.items" :key="index2"
                      :class="[it.checked && 'active']" @click="payVehicle(index, index2),getPayer(goods, index)">{{it.TMCF_NAME}}</view>
              </view>
              <view class="v-c-i-cnt-inf-picker-rk">{{goods.payVehCheck.TMCF_NAME}}</view>
            </view>
          </view>
        </view>
        <view class="v-c-i-cnt-foot">
          <view class="v-c-i-flox4">
            <text class="v-c-i-cnt-check"> {{goods.IBL_MINNUM==='0' ? '1' : goods.IBL_MINNUM}}</text>
            <text class="v-c-i-cnt-foot-text">件起售 | 限购</text>
            <text class="v-c-i-cnt-check"> {{goods.IBL_MAXNUM}}</text>
          </view>
          <view class="v-c-i-flox4">
            <text class="v-c-i-cnt-foot-text">小计： </text>
            <text class="v-c-i-cnt-foot-value"> ¥ {{goods.SUMMONEY}}</text>
          </view>
          <view class="">
            <uni-number-box :value="goods.IBL_NUM" :max="Number(goods.IBL_MAXNUM)"
                            :disabled="Number(goods.IBL_MAXNUM) === 0" @change="changeNum($event, goods)">
            </uni-number-box>
          </view>
        </view>
        <view class="v-d-g-detail-mark-item-name">
            <text class="v-d-g-detail-mark-item-name-star">直扣:{{(goods.$MYprice.BateRate*1*100).toFixed(2)}}% </text>|
            <view class="v-d-g-detail-mark-item-name-end">返利:
              <span v-if="goods.$MYprice.ReLossRate==='0'">COM</span>
              <span v-else-if="goods.$MYprice.ReLossRate==='1'">BF</span>
              <span v-else-if="goods.$MYprice.ReLossRate==='2'">FHQ</span>
              <span v-else-if="goods.$MYprice.ReLossRate==='5'">BZK</span>
            </view>|
            <text class="v-d-g-detail-mark-item-name-star">台返:{{goods.$MYprice.ReBateMoney}}</text>|
            <view class="v-d-g-detail-mark-item-name-end">供价:￥{{goods.$MYprice.RetailPrice}}</view>
          <view v-if="index < goodsList.orderList.length-1" class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
            <view class="jOrderConfirmItem-semicircle"></view>
          </view>
          <view v-if="index < goodsList.orderList.length-1" class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
            <view class="jOrderConfirmItem-semicircle"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="v-d-g-total">
      <view class="v-d-g-total-text ml48">共计金额:</view>
      <view class="v-d-g-total-price ml20">¥ {{goodsList.SUMMONEY}}</view>
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
  name: 'VehicleDetailGood',
  components: {
    uniNumberBox
  },
  props: {
    goodsList: {// 商品列表
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  methods: {
    goDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?productCode=${item.GBID}`
      });
    },
    getPayer(item, index) { // 显示付款方
      item.payCheck = !item.payCheck;
      console.log(item.payCheck);
      this.$emit('change', this.goodsList, index);
    },
    payVehicle(index, index2) { // 选择付款方
      this.goodsList.orderList[index].payCheck = false;
      this.goodsList.orderList[index].payVehiList.data.items.forEach((inf) => {
        inf.checked = false;
      });
      this.goodsList.orderList[index].payVehiList.data.items[index2].checked = true;
      this.goodsList.orderList[index].payVehCheck = this.goodsList.orderList[index].payVehiList.data.items[index2];
      this.goodsList.orderList[index].payCheck = false;
      this.$emit('change', this.goodsList, index);
    },
    async changeNum(value, item) {
      if (value !== (item.IBL_NUM * 1)) {{
        // this.$emit('changeNum', value, this.goodsList, item);
      }}
    },
  }
};
</script>
