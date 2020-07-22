<template>
  <view class="jFailureOrderItem">
    <view class="jFailureOrderItem-head">失败订单</view>
    <view class="jFailureOrderItem-cnt j-flex-aic mt16">
      <view class="jFailureOrderItem-cnt-portrait">
        <image src="@/assets/img/goods/example-fridge.jpg"></image>
      </view>
      <view class="jFailureOrderItem-cnt-right">
        <view class="j-goods-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀品质家用静音全自动10KG洗烘一体高温杀品质</view>
        <view class="jFailureOrderItem-cnt-price-wrap j-flex-aic">
          <view class="jFailureOrderItem-cnt-price">¥ 3456.00</view>
          <view class="jFailureOrderItem-cnt-text ml14">*2</view>
        </view>
      </view>
    </view>
    <view class="jFailureOrderItem-btm mt24">
      失败原因：此版本已经没有可用数量，无法保存，请查看开单记录。
    </view>
  </view>
</template>

<script>
export default {
  name: 'JFailureOrderItem'
};
</script>

<style lang="scss">
  .jFailureOrderItem {
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
