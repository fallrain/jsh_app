<template>
  <view class="VHIItem">
    <view @tap="goNext" class="VHIItem-left">
      <image :src="goods.searchImage"></image>
    </view>
    <view class="VHIItem-cnt">
      <view @tap="goNext" class="VHIItem-cnt-goodsName j-goods-title" v-html="goods.name"></view>
      <view @tap="goNext" class="VHIItem-cnt-price-tips">
        <view class="VHIItem-cnt-price-tips-item">直扣：{{goods.$PtPrice.rebateRate*100}}%</view>
        <view class="VHIItem-cnt-price-tips-item">返利：
          <span v-if="goods.$PtPrice.rebatePolicy===0">COM</span>
          <span v-else-if="goods.$PtPrice.rebatePolicy===1">BF</span>
          <span v-else-if="goods.$PtPrice.rebatePolicy===2">FHQ</span>
          <span v-else-if="goods.$PtPrice.rebatePolicy===5">BZK</span>
        </view>
        <view class="VHIItem-cnt-price-tips-item">台返：{{goods.$PtPrice.rebateMoney}}</view>
      </view>
      <view class="VHIItem-cnt-price-inf">
        <view class="VHIItem-cnt-price">¥ {{goods.$PtPrice.invoicePrice.toFixed(2)}}</view>
        <view class="VHIItem-cnt-price-inf-item">供价：¥{{goods.$PtPrice.supplyPrice.toFixed(2)}}</view>
      </view>
      <view class="VHIItem-cnt-opts">
        <view class="numberVHI"><j-number-box :value="goods.$num" @change="goodsNumChange"></j-number-box></view>
        <button v-if="goods.$PtPrice.invoicePrice!==''&&goods.$PtPrice.invoicePrice!==undefined&&goods.$PtPrice.invoicePrice!==null" @tap="addTransfer" class="VHIItem-cnt-opts-primary ml26" type="button">加入整车</button>
        <button v-else class="VHIItem-cnt-opts-primary-hui ml26" type="button">加入整车</button>
      </view>
    </view>
  </view>
</template>

<script>
import './css/vehicleItem.scss';
import JNumberBox from '../common/JNumberBox';

export default {
  name: 'VehicleItem',
  components: {
    JNumberBox
  },
  props: {
    goods: {// 商品对象
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
    }
  },
  data() {
    return {
      isChecked: false
    };
  },
  methods: {
    goodsNumChange(val) {
      /* 商品数量change */
      this.goods.$num = val;
      this.$emit('change', this.goods, this.index);
    },
    addTransfer() {
      this.$emit('addCar', this.goods, this.index);
    },
    goNext() {
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?productCode=${this.goods.code}`
      });
    }
  }
};
</script>
