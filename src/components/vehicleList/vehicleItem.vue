<template>
  <view class="VHIItem">
    <view class="VHIItem-left" @click="goNext">
      <image :src="goods.searchImage"></image>
    </view>
    <view class="VHIItem-cnt">
      <view @click="goNext" v-html="goods.name" class="VHIItem-cnt-goodsName j-goods-title"></view>
      <view @click="goNext" class="VHIItem-cnt-price-tips">
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
        <view class="VHIItem-cnt-price">¥ {{goods.$PtPrice.invoicePrice}}</view>
        <view class="VHIItem-cnt-price-inf-item">供价：¥{{goods.$PtPrice.supplyPrice}}</view>
      </view>
      <view class="VHIItem-cnt-opts">
        <view class="numberVHI"><uni-number-box :value="goods.$num" @change="goodsNumChange"></uni-number-box></view>
        <button
          @tap="addTransfer"
          class="VHIItem-cnt-opts-primary ml26"
          type="button"
        >加入整车</button>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/vehicleItem.scss';

export default {
  name: 'vehicleItem',
  components: {
    uniNumberBox
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
