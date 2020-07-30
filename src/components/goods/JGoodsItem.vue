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
        <uni-number-box
          @change="goodsNumChange"
        ></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
          @tap="addToCart"
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
    },
    // 商品下标
    index: {
      type: Number,
    },
    // 售达方编码
    saletoCode: {
      type: String,
      default: ''
    },
    // 送达方编码
    sendtoCode: {
      type: String,
      default: ''
    },
  },
  methods: {
    addToCart() {
      /* 添加到购物车 */
      const {
        productCode,
        activityType,
        activityId,
        priceType,
        number
      } = this.goods;
      debugger;
      const {
        saletoCode,
        sendtoCode
      } = this;
      this.cartService.addToCart({
        // 商品组合编码
        activityId,
        // 组合类型(1单品2组合3抢购4套餐5成套)
        activityType: activityType || 1,
        // 购买的数量(组合就是组合的数量)
        number,
        //  促销活动价格类型
        //  PT:普通价格,TJ:特价,GC:工程,YJCY:样机出样(折扣样机),MFJK:免费机壳,MFYJ:免费样机,MFYJJS:免费样机结算,YPJ:样品机,CTYJ:成套样机
        priceType,
        // 价格版本号
        priceVersion: '',
        // 产品编码
        productCode,
        productList: [{
          // 是否有信用模式(0否1是)
          creditModel: 1,
          //  产品购买的数量
          number,
          //  价格类型
          priceType: 'PT',
          // 价格版本号
          priceVersion: '',
          // 产品编码
          productCode,
          //  调货版本号
          stockVersion: '',
          //  是否有周承诺(0否1是)
          weekPromise: '0'
        }],
        // 售达方编码
        saletoCode,
        // 送达方编码
        sendtoCode,
        // 版本调货版本号
        transferVersionCode: '',
        // 促销活动版本号
        versionCode: '',
      });
    },
    goodsNumChange(val) {
      /* 商品数量change */
      this.goods.number = val;
      this.$emit('change', this.goods, this.index);
    }
  }
};
</script>
