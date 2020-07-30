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
        <view class="jGoodsItem-cnt-price-tips-item">直扣：{{jshUtil.arithmetic(goods.$PtPrice.rebateRate,100)}}%</view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：{{goods.$PtPrice.rebateMoney}}</view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：{{goods.$PtPrice.rebatePolicy | rebatePolicy}}</view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ {{goods.$PtPrice.invoicePrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥{{goods.$PtPrice.supplyPrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：{{goods.$stock.stockTotalNum}}</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
        >加入购物车
        </button>
        <button
          class="jGoodsItem-cnt-opts-default ml26"
          type="button"
        >参加活动
        </button>
      </view>
      <view class="jGoodsItem-tags">
        <view
          class="jGoodsItem-tag-item"
          v-for="(item,index) in goods.tags"
          :key="index"
        >{{item}}
        </view>
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
      default: () => {
      }
    }
  }
};
</script>
