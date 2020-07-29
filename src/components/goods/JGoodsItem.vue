<template>
  <view class="jGoodsItem">
    <view class="jGoodsItem-left">
      <image :src="goods.image.masterImage"></image>
    </view>
    <view class="jGoodsItem-cnt">
      <view class="jGoodsItem-cnt-goodsName j-goods-title">
        {{goods.productName | rmHtml}}
      </view>
      <view class="jGoodsItem-cnt-price-tips">
        <view class="jGoodsItem-cnt-price-tips-item">直扣：92.31%</view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：COM</view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：0</view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ 3456.00</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥5892.21</view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：3434</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
        >加入购物车</button>
        <button
          class="jGoodsItem-cnt-opts-default ml26"
          type="button"
        >参加活动</button>
      </view>
      <view class="jGoodsItem-tags">
        <view class="jGoodsItem-tag-item">特价</view>
        <view class="jGoodsItem-tag-item">组合</view>
        <view class="jGoodsItem-tag-item">样机</view>
        <view class="jGoodsItem-tag-item">新品</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/jGoodsItem.scss';

export default {
  name: 'JGoodsItem',
  components: {
    uniNumberBox
  },
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
