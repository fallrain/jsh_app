<template>
  <view class="jShoppingCartItem">
    <view class="jShoppingCartItem-head">
      <button
        type="button"
        class="jShoppingCartItem-btn-primary mr12"
      >反向定制
      </button>
      <text class="jShoppingCartItem-head-text">活动到期日：2020-09-30 10:07:00</text>
      <view class="jShoppingCartItem-head-line"></view>
      <text class="jShoppingCartItem-head-text">预定金比例：16%</text>
      <view class="jShoppingCartItem-head-line"></view>
      <text class="jShoppingCartItem-head-text">直发订单</text>
      <view class="jShoppingCartItem-head-close iconfont iconguanbi"></view>
    </view>
    <view class="jShoppingCartItem-cnt">
      <view
        class="jShoppingCartItem-cnt-check"
        @tap="choose(goods)"
      >
        <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <view class="jShoppingCartItem-cnt-img-wrap">
        <image src="@/assets/img/goods/example-fridge.jpg"></image>
      </view>
      <view class="jShoppingCartItem-cnt-inf">
        <view class="jShoppingCartItem-cnt-inf-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
        <view class="jShoppingCartItem-cnt-price-inf">
          <view class="jShoppingCartItem-cnt-price">¥ 3456.00</view>
          <view class="jShoppingCartItem-cnt-price-inf-item">小计：¥333456.02</view>
          <uni-number-box></uni-number-box>
        </view>
      </view>
      <view :class="['jShoppingCartItem-cnt-like iconfont',goods.checked ? 'iconicon3':'iconshoucang1']"></view>
    </view>
    <view class="jShoppingCartItem-btm">
      <view class="jShoppingCartItem-btm-tags mr34">
        <view class="jShoppingCartItem-btm-tag">异</view>
        <view class="jShoppingCartItem-btm-tag">云</view>
        <view class="jShoppingCartItem-btm-tag">统</view>
      </view>
      <view class="jShoppingCartItem-btm-text">库存：10</view>
      <view class="jShoppingCartItem-btm-switch-wrap">
        <switch
          class="jShoppingCartItem-btm-switch"
          color="#ED2856"
        ></switch>
        <text class="jShoppingCartItem-btm-switch-text mr32">信用模式</text>
      </view>
      <view class="jShoppingCartItem-btm-version-picker">
        <text>版本规格</text>
        <i class="iconfont iconxia"></i>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/JShoppingCartItem.scss';

export default {
  name: 'JShoppingCartItem',
  components: {
    uniNumberBox
  },
  props: {
    goods: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    choose(item) {
      /* 选中本商品 */
      this.$set(item, 'checked', !item.checked);
    }
  }
};
</script>
