<template>
  <view class="jGoodsHoverButton-wrap">
    <view
      @tap="goShoppingCart"
      class="jGoodsHoverButton-shopping-cart-icon"
    >
      <view
        class="jGoodsHoverButton-num"
        v-if="cartNumber"
      >{{cartNumber}}
      </view>
      <view class="iconfont iconxuanfugouwuche1"></view>
    </view>
    <view
      @tap="goTop"
      class="jGoodsHoverButton-shopping-to-top-icon"
    >
      <view class="iconfont icondingbu"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JGoodsHoverButton',
  props: {
    cartNumber: {
      type: Number,
      default: 0
    },
  },
  methods: {
    goShoppingCart() {
      /* 跳转购物车 */
      uni.switchTab({
        url: '/pages/shoppingCart/shoppingCart'
      });
    },
    goTop() {
      /* 回到顶部 */
      uni.pageScrollTo({
        scrollTop: 0
      });
      this.$emit('toTop');
    }
  },
};
</script>

<style lang="scss">
  .jGoodsHoverButton-wrap {
    position: fixed;
    right: 26px;
    bottom: 46px;
  }

  .jGoodsHoverButton-shopping-cart-icon {
    position: absolute;
    right: 0;
    bottom: 134px;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background: linear-gradient(159deg, #F7518F 0%, #ED2856 100%);
    border-radius: 100%;

    .iconfont {
      font-size: 50px;
      color: #fff;
    }
  }

  .jGoodsHoverButton-num {
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    line-height: 32px;
    border-radius: 32px;
    min-width: 32px;
    max-width: 66px;
    padding: 0 4px;
    font-size: 20px;
    text-align: center;
    white-space: nowrap;
    color: #fff;
    background-color: #f43530;
    transform: translate(40%,-20%);
  }

  .jGoodsHoverButton-shopping-to-top-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    border: 1px solid #C3C3C3;
    background: #fff;
    border-radius: 100%;

    .iconfont {
      font-size: 50px;
      color: #999;
    }
  }
</style>
