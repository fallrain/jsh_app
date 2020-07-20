<template>
  <view class="JOrderConfirmItem-par">
    <view
      class="jOrderConfirmItem-wrap"
    >
      <view
        class="jOrderConfirmItem"
        v-for="(goods,index) in goodsList"
        :key="index"
      >
        <view class="jOrderConfirmItem-detail">
          <view class="jOrderConfirmItem-detail-portrait">
            <image
              :src="`${baseUrl}public/assets/img/goods/example-fridge.jpg`"
            >
            </image>
          </view>
          <view class="jOrderConfirmItem-detail-cnt">
            <view class="jOrderConfirmItem-detail-cnt-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀品家用静音全自动10KG洗烘一体高温杀品</view>
            <view class="jOrderConfirmItem-detail-cnt-price-wrap">
              <view class="jOrderConfirmItem-detail-cnt-price">
                ¥ 3456.00<view class="jOrderConfirmItem-detail-cnt-text ml10 mr34">*2</view>
              </view>
              <view class="jOrderConfirmItem-detail-cnt-text">预计到货时间：2020-08-04</view>
            </view>
          </view>
        </view>
        <view class="jOrderConfirmItem-detail-match-type">
          <j-switch
            :active.sync="goods.isCreditMode"
            inf="信用模式"
            @change="isCreditModeChange"
          ></j-switch>
          <j-switch
            :active.sync="goods.isCreditMode"
            inf="统仓统配"
            @change="isCreditModeChange"
          ></j-switch>
          <view class="jOrderConfirmItem-detail-match-type-text">
            满足方式：日日顺库存JOS2
          </view>
        </view>
        <view class="jOrderConfirmItem-detail-mark-wrap mt24">
          <view class="jOrderConfirmItem-detail-mark-item">
            <view class="jOrderConfirmItem-detail-mark-item-name">
              <text class="jOrderConfirmItem-detail-mark-item-name-star">*</text>付款方
              <view class="jOrderConfirmItem-detail-mark-item-name-icon iconfont iconxia"></view>
            </view>
            <view class="jOrderConfirmItem-detail-mark-item-val">请选择付款方</view>
          </view>
          <view class="jOrderConfirmItem-detail-mark-item">
            <view class="jOrderConfirmItem-detail-mark-item-name">
              <text class="jOrderConfirmItem-detail-mark-item-name-star">*</text>备注信息
              <view class="jOrderConfirmItem-detail-mark-item-name-icon iconfont iconxia"></view>
            </view>
            <view class="jOrderConfirmItem-detail-mark-item-val">请选择付款方</view>
          </view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
      </view>
    </view>
    <view class="jOrderConfirmItem-total">
      <view class="jOrderConfirmItem-total-text">20200702152819167002</view>
      <view class="jOrderConfirmItem-total-text ml48">共计金额：</view>
      <view class="jOrderConfirmItem-total-price ml20">¥ 3456.00</view>
    </view>
  </view>
</template>

<script>
import JSwitch from '../form/JSwitch';
import './css/jOrderConfirmItem.scss';

export default {
  name: 'JOrderConfirmItem',
  components: {
    JSwitch
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
