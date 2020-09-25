<template>
  <view class="jFailureGoodsItem">
    <view
      v-if="showCheck"
      class="jShoppingCartItem-cnt-check"
      @tap="choose"
    >
      <i :class="['iconfont', checked ? 'iconradio active':'iconradio1',checkDisabled && 'disabled']"></i>
    </view>
    <view class="jShoppingCartItem-cnt-img-wrap">
      <image :src="goods.productList && goods.productList[0].productImageUrl"></image>
    </view>
    <view class="jFailureGoodsItem-cnt">
      <view class="jFailureGoodsItem-cnt-head">
        <view class="jFailureGoodsItem-cnt-head-tag mr10">失效</view>
        <text class="jFailureGoodsItem-cnt-head-text">{{goods.productList && goods.productList[0].productName}}</text>
      </view>
      <view class="jFailureGoodsItem-cnt-btm">
        <view class="jFailureGoodsItem-cnt-btm-tag">{{goods.composeEnableMsg || (goods.$errorMsg && goods.$errorMsg.join('，'))}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JFailureGoodsItem',
  props: {
    // 商品数据
    goods: {
      type: Object,
      default: () => {
      }
    },
    // 选中
    checked: {
      type: Boolean,
      default: false
    },
    // 禁止选中
    checkDisabled: {
      type: Boolean,
      default: false
    },
    // 显示选中
    showCheck: {
      type: Boolean,
      default: true
    },
    // 索引
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    choose() {
      /* 选中 */
      if (!this.checkDisabled) {
        const checked = !this.checked;
        this.$emit('update:checked', checked);
        this.$emit('change', checked, this.index);
      }
    }
  }
};
</script>

<style lang="scss">
  .jFailureGoodsItem {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 198px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #EDE9E9;
  }

  .jFailureGoodsItem-cnt {
    display: flex;
    min-height: 150px;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 40px;
  }

  .jFailureGoodsItem-cnt-head {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
  }

  .jFailureGoodsItem-cnt-head-text {
    color: #999;
    font-size: 24px;
  }

  .jFailureGoodsItem-cnt-head-tag {
    display: inline-block;
    height: 28px;
    background: #999;
    border-radius: 14px;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    padding-left: 12px;
    padding-right: 12px;
    color: #fff;
  }

  .jFailureGoodsItem-cnt-btm-tag {
    color: #999;
    font-size: 24px;
  }
</style>
