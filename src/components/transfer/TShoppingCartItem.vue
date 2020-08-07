<template>
  <view class="tShoppingCartItem">
      <!-- 头部 -->
    <view class="tShoppingCartItem-head">
      <view
        class="tShoppingCartItem-cnt-check"
        @tap="choose"
      >
      <i :class="['iconfont', list.checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <button
          type="button"
          class="tShoppingCartItem-btn-primary mr12"
      >{{list.data.IBR_ISFLAG}}
      </button>     
      <view class="tShoppingCartItem-head-middle">
        <text class="tShoppingCartItem-head-cata mll">库位：</text>
        <text class="tShoppingCartItem-head-local">{{list.data.T5_OUTWHNAME}}</text>
      </view>     
      <view>
          <text class="tShoppingCartItem-head-text">装车体积:</text>
          <text class="tShoppingCartItem-head-volume">({{Math.round(list.data.IBR_JSTIJI/15*100)}})%</text>
      </view>     
    </view>
    <!-- 产品列表 -->
    <view 
     class="tShoppingCartItem-list" 
     v-for="(item,index) in list.data.orderList"
     :key="index"
    >
      <view class="tShoppingCartItem-cnt">
        <view class="tShoppingCartItem-cnt-img-wrap">
            <image :src="item.THUMBNAIL"></image>
        </view>
        <view class="jShoppingCartItem-cnt-inf">
          <view class="tShoppingCartItem-cnt-inf-title">{{item.DH_INVSTD}}</view>
          <view class="tShoppingCartItem-cnt-price-inf">
            <view class="tShoppingCartItem-cnt-price">¥ {{item.ADVICEPRICE}}</view>
            <view class="tShoppingCartItem-cnt-stock">库存：{{item.IBL_MAXNUM}}</view>
          </view>
           <view class="tShoppingCartItem-btm-version">
            <view  
              class="tShoppingCartItem-cnt-price-inf-picker" 
              @tap="showPayer"
            >
              <view class="tShoppingCartItem-cnt-price-inf-mrr">付款方</view>
              <i class="iconfont iconxia"></i>
              <view class="tShoppingCartItem-cnt-price-inf-item">{{item.IBL_PAYMONEYNAME}}</view>
            </view>
          </view>
        </view>  
        <view class="tShoppingCartItem-head-close iconfont iconcross"></view>
        <view :class="['tShoppingCartItem-cnt-like iconfont',list.checked ? 'iconicon3':'iconshoucang1']"></view>
     </view>
     <view class="tShoppingCartItem-cnt-price-foottotal">
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal">调货单号： </text>
        <text class="tShoppingCartItem-cnt-price-subprice"> {{item.IBL_KORDERNO}}</text>   
      </view> 
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal mla">小计： </text>
        <text class="tShoppingCartItem-cnt-price-subprice mlb"> ¥ {{item.SUMMONEY}}</text>   
      </view>
      <uni-number-box></uni-number-box>     
     </view>
    </view>
    <view class="tShoppingCartItem-btm">
      <view class="tShoppingCartItem-btm-text">        
        <text><i class="iconfont iconxiangqing tShoppingCartItem-btm-text-icon "></i>点击查看详情</text>
        <text class="tShoppingCartItem-btm-text-cata">总计总额： </text>
        <text class="tShoppingCartItem-btm-text-price"> ¥{{list.data.SUMMONEY}}</text>  
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
    uniNumberBox
  },
  props: {
    // 商品数据
    list: {
      type: Object,
      default: () => {}
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
