<template>
  <view class="VHIItem">
    <view class="VHIItem-left">
      <image :src="goods.listImage"></image>
    </view>
    <view class="VHIItem-cnt">
      <view class="VHIItem-cnt-goodsName j-goods-title">
        {{goods.name}}海尔1215DHB(C) 全自动10KG洗烘一体高温杀菌家用静音全自动10KG洗烘一体高温杀菌除高品质滚筒洗衣机……
      </view>
      <view class="VHIItem-cnt-price-tips">
        <view class="VHIItem-cnt-price-tips-item">直扣：92.31%</view>
        <view class="VHIItem-cnt-price-tips-item">返利：COM</view>
        <view class="VHIItem-cnt-price-tips-item">台返：0</view>
      </view>
      <view class="VHIItem-cnt-price-inf">
        <view class="VHIItem-cnt-price">¥ 3456.00</view>
        <view class="VHIItem-cnt-price-inf-item">供价：¥5892.21</view>
      </view>
      <view class="VHIItem-cnt-opts">
        <view class="numberVHI"><uni-number-box @change="goodsNumChange"></uni-number-box></view>
        <button class="VHIItem-cnt-opts-primary ml26" type="button" @tap="addTransfer">加入整车</button>
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
      this.goods.number = val;
      this.$emit('change', this.goods, this.index);
    }
  }
};
</script>
