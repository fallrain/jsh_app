<template>
  <view class="transferDetailItem">
    <view
      class="transferDetailItem-wrap"
    >
      <view
        class="transferDetailItem-detail"
        v-for="(goods,index) in goodsList"
        :key="index"
      >
        <view class="transferDetailItem-detail-odd">
          调货单号：<text class="transferDetailItem-detail-odd-num">ZK2100008608001</text>
          <view class="transferDetailItem-detail-close iconfont iconcross"></view>
        </view>
        <view class="transferDetailItem-detail-cnt">
          <view class="transferDetailItem-detail-cnt-img-wrap">
            <image
              :src="`${baseUrl}public/assets/img/goods/example-fridge.jpg`"
            >
          </view>
          <view class="transferDetailItem-detail-cnt-inf">
            <view>            
              <view class="transferDetailItem-detail-cnt-inf-title">海尔1215DHB(C) 家用静音全自动</view>
              <view class="transferDetailItem-detail-like iconfont"></view>
            </view>
            <view class="transferDetailItem-detail-cnt-price-inf">
                <view class="transferDetailItem-detail-cnt-price">¥ 45996.00</view>
            </view>
            <view class="transferDetailItem-detail-cnt-version">
              <view class="transferDetailItem-detail-cnt-inf-mrr">付款方</view>
              <i class="iconfont iconxia transferDetailItem-detail-cnt-inf-icon"></i>
              <view class="transferDetailItem-detail-cnt-inf-item">(880087654)青岛鸿程永泰工贸有限公司</view>
            </view>
          </view>  
         
        </view>  
        <view class="transferDetailItem-price-foottotal">
          <view class="transferDetailItem-cnt-price-total">
            库存：
            <text class="transferDetailItem-cnt-stock">10</text>
          </view> 
            <text class="transferDetailItem-cnt-price-subtotal mla">小计： </text>
            <text class="transferDetailItem-cnt-price-subprice mlb"> ¥ 45996.00</text>   
          
          <uni-number-box></uni-number-box>     
        </view>         
        <view class="transferDetailItem-detail-mark-item-name">
            <text class="transferDetailItem-detail-mark-item-name-star">直扣:92.31% </text>|
            <view class="transferDetailItem-detail-mark-item-name-end">返利：COM </view>|
            <text class="transferDetailItem-detail-mark-item-name-star">台返:0</text>|
            <view class="transferDetailItem-detail-mark-item-name-end">供价:￥5892.21</view>          
        </view>
      </view>
    </view>
    <view class="transferDetailItem-total">
      <view class="transferDetailItem-total-text ml48">共计金额:</view>
      <view class="transferDetailItem-total-price ml20">¥ 3456.00</view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/transferDetailItem.scss';

export default {
  name: 'transferDetailItem',
  components: {
    uniNumberBox
  },
  props: {
    // 商品列表
    goodsList: {
      type: Array,
      default: () => []
    },
    // 索引
    index: {
      type: Number
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  methods: {
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goodsList, this.index);
    },
  }
};
</script>

<style scoped>

</style>
