<template>
  <view class="tOveragePay-wrap" v-show="isShowpayer">
    <view class="tOveragePay-wrap-head j-flex-aic">
      <view class="iconfont iconmoney tOveragePay-wrap-head-icon"></view>
      <view class="tOveragePay-wrap-head-text ml24">余额支付信息</view>
    </view>
    <view class="tOveragePay-cnt"
      v-for="(payer,index) in payerBalance"
      :key="index"
    >
      <view class="tOveragePay-cnt-item">
        <view class="tOveragePay-cnt-item-head j-flex-aic">
          <view class="tOveragePay-cnt-item-head-dot"></view>
          {{payer.CodeName}}
        </view>
        <view class="tOveragePay-cnt-item-total j-flex-aic">
          <view class="tOveragePay-cnt-item-total-item">
            <view class="tOveragePay-cnt-item-total-text">可用余额：</view>
            <view class="tOveragePay-cnt-item-total-price">¥ {{payer.balance}}</view>
          </view>
          <view class="tOveragePay-cnt-item-total-item-line">
          </view>
          <view class="tOveragePay-cnt-item-total-item">
            <view class="tOveragePay-cnt-item-total-text">待支付余额：</view>
            <view class="tOveragePay-cnt-item-total-price">¥ {{payer.toBePaid}}</view>
          </view>
          <button
            type="button"
            class="tOveragePay-cnt-item-total-btn"
          >{{payer.pay}}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TOveragePay',
  props: {
    payerBalance: {
      type: Array,
      default: () => []
    },
    isShowpayer: {
      type: Boolean
    }
  },
  created() {
  
  },
  
};
</script>

<style lang="scss">
  .tOveragePay-wrap {
    padding: 24px 0 24px 24px;
    background: #fff;
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.15);
    border-radius:20px;
  }

  .tOveragePay-wrap-head {
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 24px;
    padding-right: 24px;
    line-height: 40px;
    font-size: 28px;
  }

  .tOveragePay-wrap-head-icon {
    font-size: 36px;
    color: $theme-color;
  }

  .tOveragePay-cnt {
    padding-right: 24px;
  }

  .tOveragePay-cnt-item {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 24px;
    border-bottom: 1px solid #D9D9D9;
  }

  .tOveragePay-cnt-item {

  }

  .tOveragePay-cnt-item-head {
    color: #666;
    font-size: 24px;
    padding-left: 8px;
  }

  .tOveragePay-cnt-item-head-dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: $theme-color;
    margin-right: 24px;
  }

  .tOveragePay-cnt-item-total{
    margin-top: 12px;
    margin-bottom: 2px;
    padding-left: 36px;
  }

  .tOveragePay-cnt-item-total-text {
    font-size: 20px;
    line-height: 28px;
    color: #999;
  }

  .tOveragePay-cnt-item-total-price {
    font-size: 32px;
    line-height: 44px;
    color: $theme-color;
  }

  .tOveragePay-cnt-item-total-item-line{
    width: 1px;
    height: 40px;
    background: #E4E4E4;
    margin-left: 18px;
    margin-right: 18px;
  }

  .tOveragePay-cnt-item-total-btn{
    align-self: flex-end;
    display: inline-block;
    color: #fff;
    background: $theme-color;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 24px;
    margin-left: auto;
  }
</style>
