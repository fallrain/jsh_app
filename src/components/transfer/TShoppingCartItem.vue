<template>
  <view class="tShoppingCartItem">
      <!-- 头部 -->
    <view class="tShoppingCartItem-head">
      <view class="tShoppingCartItem-head-top">
        <view
        class="tShoppingCartItem-cnt-check"
        @tap="choose"
        >
        <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
        </view>
        <button
            type="button"
            class="tShoppingCartItem-btn-primary mr12"
        >调货
        </button>     
        <view class="tShoppingCartItem-head-middle">
            <text class="tShoppingCartItem-head-text">申请单号:</text>
            <text class="tShoppingCartItem-head-oddnum">21000086080</text>
        </view>     
        <view>
            <text class="tShoppingCartItem-head-text">装车体积:</text>
            <text class="tShoppingCartItem-head-volume">97%</text>
        </view>
      </view>
      <view class="tShoppingCartItem-head-data">
        <text class="tShoppingCartItem-head-cata mll">库位：</text>
        <text class="tShoppingCartItem-head-local">WFS2日日顺潍坊H2库</text>
        <view class="tShoppingCartItem-head-line"></view>
         <text class="tShoppingCartItem-head-cata">预下单日期：</text>
        <text class="tShoppingCartItem-head-local">2020/07/19</text>
        <view class="tShoppingCartItem-head-line"></view>
        <text class="tShoppingCartItem-head-cata">总装车体积：</text>
        <text class="tShoppingCartItem-head-local mls">146.49m</text>
      </view>
      <view class="tShoppingCartItem-head-data">
        <text class="tShoppingCartItem-head-cata">车型: </text>
        <text class="tShoppingCartItem-head-local">X8.7K - 8.7厢式（高底盘)</text>
      </view>
    </view>
    <!-- 产品列表 -->
    <view 
     class="tShoppingCartItem-list" 
     v-for="(item,index) in goods.data"
     :key="index"
     >
      <view class="tShoppingCartItem-cnt">
        <view class="tShoppingCartItem-cnt-img-wrap">
            <image src="@/assets/img/goods/example-fridge.jpg"></image>
        </view>
        <view class="jShoppingCartItem-cnt-inf">
          <view class="tShoppingCartItem-cnt-inf-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高......</view>
            <view class="tShoppingCartItem-btm-version">
              <view
                class="tShoppingCartItem-btm-version-picker"
                @tap="showSpecifications"
              >
                <text>版本规格</text>
                <i class="iconfont iconxia"></i>
              </view>
              <view  
                class="tShoppingCartItem-cnt-price-inf-picker" 
                @tap="showPayer"
              >
                <view class="tShoppingCartItem-cnt-price-inf-mrr">付款方</view>
                <i class="iconfont iconxia"></i>
                <view class="tShoppingCartItem-cnt-price-inf-item">请选择付款方</view>
              </view>
            </view>
          <view class="tShoppingCartItem-cnt-price-inf">
            <view class="tShoppingCartItem-cnt-price">¥ 45996.00</view>
            <view class="tShoppingCartItem-cnt-stock">库存：20</view>
          </view>
        </view>  
      <view class="tShoppingCartItem-head-close iconfont iconcross"></view>
      <view :class="['tShoppingCartItem-cnt-like iconfont',goods.checked ? 'iconicon3':'iconshoucang1']"></view>
     </view>
     <view class="tShoppingCartItem-cnt-price-foottotal">
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal">调货单号： </text>
        <text class="tShoppingCartItem-cnt-price-subprice"> 21000086080</text>   
      </view> 
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal mla">小计： </text>
        <text class="tShoppingCartItem-cnt-price-subprice mlb"> ¥ 45996.00</text>   
      </view>
      <uni-number-box></uni-number-box>     
     </view>
    </view>
    <view class="tShoppingCartItem-btm">
      <view class="tShoppingCartItem-btm-tags mr34">
        <view class="tShoppingCartItem-btm-tagt">统仓统配 </view>
        <view class="tShoppingCartItem-btm-tag">| （8800101954）青岛鸿程永泰商贸有限公司</view>
      </view>
      <view class="tShoppingCartItem-btm-text">
        <text class="tShoppingCartItem-btm-text-cata">总计总额： </text>
        <text class="tShoppingCartItem-btm-text-price"> ¥22383945.12</text>  
      </view>
    </view>
   
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/TShoppingCartItem.scss';

export default {
  name: 'TShoppingCartItem',
  components: {
    // JVersionSpecifications,
    // JSwitch,
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
      isShowSpecifications: false,
      isShowPayer: false,

    };
  },
  methods: {
    choose() {
      /* 选中本商品 */
      const {
        checked,data
      } = this.goods;
      this.goods.checked = !checked;
      console.log(data)
      this.$emit('change', this.goods, this.index);
    },
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    },
    showPayer() {
      // 显示付款方
      this.isShowPayer = true;
    }
  }
};
</script>
