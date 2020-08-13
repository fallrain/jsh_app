<template>
  <view class="JOrderConfirmItem-par">
    <view
      class="jOrderConfirmItem-wrap"
    >
      <view
        class="jOrderConfirmItem"
        v-for="(goods,index) in orderItem.splitOrderDetailList"
        :key="index"
      >
        <view v-if="goods.splitOrderProductList"
              class="jOrderConfirmItem-detail">
          <view class="jOrderConfirmItem-detail-portrait">
            <image
              :src="goods.splitOrderProductList[0].productImageUrl"
            >
            </image>
          </view>
          <view class="jOrderConfirmItem-detail-cnt">
            <view class="jOrderConfirmItem-detail-cnt-title">
              {{goods.splitOrderProductList[0].productName}}
            </view>
            <view class="jOrderConfirmItem-detail-cnt-price-wrap">
              <view class="jOrderConfirmItem-detail-cnt-price">
                ¥{{goods.splitOrderProductList[0].price}}
                <view class="jOrderConfirmItem-detail-cnt-text ml10 mr34">
                  *{{goods.splitOrderProductList[0].storeNum}}</view>
              </view>
              <view class="jOrderConfirmItem-detail-cnt-text">预计到货时间：{{goods.planInDate}}</view>
            </view>
          </view>
        </view>
        <view class="jOrderConfirmItem-detail-match-type">
          <j-switch
            v-if="goods.splitOrderProductList[0].isCheckCreditModel === '1'"
            :active.sync="goods.splitOrderProductList[0].isCheckCreditModel === '1'"
            inf="信用模式"
            @change="isCreditModeChange"
          ></j-switch>
          <j-switch
            v-if="goods.isTCTP"
            :active.sync="goods.isTCTP"
            inf="统仓统配"
            @change="isCreditModeChange"
          ></j-switch>
          <view class="jOrderConfirmItem-detail-match-type-text">
            满足方式：{{goods.stockTypeName}}
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
      <view class="jOrderConfirmItem-total-text">{{orderItem.composeOrderNo}}</view>
      <view class="jOrderConfirmItem-total-text ml48">共计金额：</view>
      <view class="jOrderConfirmItem-total-price ml20">¥ {{orderItem.totalMoney}}</view>
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
    // 单个订单
    orderItem: {
      type: Object,
      default: () => {}
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
