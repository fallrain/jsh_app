<template>
  <view class="jShoppingCartBtm">
    <view
      class="jShoppingCartBtm-check"
      @tap="choose"
    >
      <view :class="['iconfont', checked ? 'iconradio active':'iconradio1']"></view>
      <text :class="['jShoppingCartBtm-check-text',checked && 'active']">全选</text>
    </view>
    <text class="jShoppingCartBtm-check-edit">编辑</text>
    <view class="jShoppingCartBtm-text">
      已选中<text class="jShoppingCartBtm-text-highlight">7</text>种
    </view>
    <view class="jShoppingCartBtm-total">
      <text>合计：</text>
      <view class="jShoppingCartBtm-total-price">¥283945.12</view>
    </view>
    <button
      type="button"
      class="jShoppingCartBtm-btn"
    >结算
    </button>
  </view>
</template>

<script>
export default {
  name: 'JShoppingCartBtm',
  props: {
    // 全选
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    choose() {
      const checked = !this.checked;
      this.$emit('update:checked', checked);
      this.$emit('checkAll', checked);
    }
  }
};
</script>

<style lang="scss">
  .jShoppingCartBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
  }

  .jShoppingCartBtm-check {
    display: flex;
    align-items: center;

    .iconfont {
      font-size: 30px;
      color: #CFCFCF;

      &.active {
        color: $theme-color;
      }
    }
  }

  .jShoppingCartBtm-check-text {
    color: #333;
    font-size: 24px;
    margin-left: 16px;

    &.active {
      color: $theme-color;
    }
  }

  .jShoppingCartBtm-check-edit {
    color: $theme-color;
    font-size: 24px;
    margin-left: 26px;
    margin-right: 30px;
  }

  .jShoppingCartBtm-text {
    color: #666;
    font-size: 20px;
  }

  .jShoppingCartBtm-text-highlight {
    color: $theme-color;
    font-size: 28px;
  }

  .jShoppingCartBtm-total {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;
    margin-left: 18px;
  }

  .jShoppingCartBtm-total-price {
    color: $theme-color;
    font-size: 22px;
  }

  .jShoppingCartBtm-btn {
    display: inline-block;
    width: 116px;
    height: 42px;
    margin-left: auto;
    line-height: 42px;
    text-align: center;
    background: $theme-color;
    border-radius: 21px;
    color: #fff;
    font-size: 24px;
  }
</style>
