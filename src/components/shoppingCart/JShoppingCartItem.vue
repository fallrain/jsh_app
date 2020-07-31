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
      <view class="jShoppingCartItem-head-close iconfont iconcross"></view>
    </view>
    <view class="jShoppingCartItem-cnt">
      <view
        class="jShoppingCartItem-cnt-check"
        @tap="choose"
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
        <j-switch
          :active.sync="goods.isCreditMode"
          @change="isCreditModeChange"
        >
        </j-switch>
        <text class="jShoppingCartItem-btm-switch-text mr32 ml8">信用模式</text>
      </view>
      <view
        class="jShoppingCartItem-btm-version-picker"
        @tap="showSpecifications"
      >
        <text>版本规格</text>
        <i class="iconfont iconxia"></i>
      </view>
    </view>
    <j-version-specifications
      :show.sync="isShowSpecifications"
    >
      <template #head>
        <view class="jVersionSpecifications-pop-head">
          <view class="jVersionSpecifications-pop-head-left">
            <image src="@/assets/img/goods/example-fridge.jpg"></image>
          </view>
          <view class="jVersionSpecifications-pop-head-cnt">
            <view class="jVersionSpecifications-pop-head-cnt-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高高品质家用静音全自动10KG洗烘一体高高品质
            </view>
            <view class="mt16 jVersionSpecifications-pop-head-cnt-item">
              <view class="jVersionSpecifications-pop-head-cnt-text">建议零售价：</view>
              <view class="jVersionSpecifications-pop-head-cnt-price">¥5920.00</view>
              <view class="jVersionSpecifications-pop-head-cnt-text ml20">供价：￥ 4099.00</view>
            </view>
            <view class="mt8 jVersionSpecifications-pop-head-cnt-item">
              <view class="jVersionSpecifications-pop-head-cnt-text">台返 ：0.00</view>
              <view class="jVersionSpecifications-pop-head-cnt-text ml20">返利：FHQ</view>
              <view class="jVersionSpecifications-pop-head-cnt-text ml20">直扣率：0.70%</view>
            </view>
          </view>
        </view>
      </template>
    </j-version-specifications>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import JSwitch from '../form/JSwitch';
import JVersionSpecifications from './JVersionSpecifications';
import './css/JShoppingCartItem.scss';

export default {
  name: 'JShoppingCartItem',
  components: {
    JVersionSpecifications,
    JSwitch,
    uniNumberBox
  },
  props: {
    // 商品数据
    goods: {
      type: Object
    },
    // 商品索引
    index: {
      type: [String, Number]
    },
    // 所有版本的价格
    allPrice: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 是否显示版本规格
      isShowSpecifications: false
    };
  },
  methods: {
    choose() {
      /* 选中本商品 */
      const {
        checked
      } = this.goods;
      this.goods.checked = !checked;
      this.$emit('change', this.goods, this.index);
    },
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    }
  }
};
</script>
