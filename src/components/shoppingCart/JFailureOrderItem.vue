<template>
  <view class="jFailureOrderItem">
    <view class="jFailureOrderItem-head">失败订单</view>
    <view
      v-for="(goods,index) in orderItem.splitOrderDetailList"
      :key="index"
      class="jFailureProductItem">
      <view
        v-if="goods.splitOrderProductList"
        class="jFailureOrderItem-cnt j-flex-aic mt16">
        <view class="jFailureOrderItem-cnt-portrait">
          <image
            :src="goods.splitOrderProductList[0].productImageUrl">
          </image>
        </view>
        <view class="jFailureOrderItem-cnt-right">
          <view class="j-goods-title">
            {{goods.splitOrderProductList[0].productName}}
          </view>
          <view class="jFailureOrderItem-cnt-price-wrap j-flex-aic">
            <view class="jOrderConfirmItem-detail-cnt-price">
              ¥{{goods.splitOrderProductList[0].price}}
              <view class="jOrderConfirmItem-detail-cnt-text ml10 mr34">
                *{{goods.splitOrderProductList[0].storeNum}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="jFailureOrderItem-btm mt24">
      失败原因：{{orderItem.composeEnableMsg}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'JFailureOrderItem',
  props: {
    // 单个失败订单
    orderItem: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number
    }
  },
};
</script>

<style lang="scss">
  .jFailureOrderItem {
    margin-bottom: 16px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 20px;
  }

  .jFailureOrderItem-head {
    line-height: 40px;
    font-size: 28px;
    color: #333;
  }

  .jFailureOrderItem-cnt-portrait {
    flex-shrink: 0;
    width: 152px;
    height: 152px;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .jFailureOrderItem-cnt-price-wrap {
    line-height: 44px;
    margin-top: 12px;
  }

  .jFailureOrderItem-cnt-price {
    color: #666;
    font-size: 32px;
  }

  .jFailureOrderItem-cnt-text{
    color: #333;
    font-size: 24px;
  }

  .jFailureOrderItem-btm{
    background: #F7F4F8;
    border-radius:18px;
    padding: 8px 20px;
    min-height: 36px;
    line-height: 28px;
    font-size: 20px;
    color: #333;
  }
</style>
