<template>
  <view class="jShoppingCartBtm">
    <view
      class="jShoppingCartBtm-check"
      @tap="checkAll"
    >
      <view :class="['iconfont', isCheckedAll ? 'iconradio active':'iconradio1']"></view>
      <text :class="['jShoppingCartBtm-check-text',isCheckedAll && 'active']">全选</text>
    </view>
    <text
      @tap="exitEditMode"
      class="jShoppingCartBtm-check-edit"
      v-if="isEdit"
    >完成</text>
    <text
      @tap="toEditMode"
      class="jShoppingCartBtm-check-edit"
      v-else
    >编辑</text>
    <view
      class="jShoppingCartBtm-btns-edit-wrap"
      v-if="isEdit"
    >
      <button
        @tap="handleDel"
        class="jShoppingCartBtm-btn-default"
        type="button"
      >删除
      </button>
      <button
        @tap="handleFollow"
        class="jShoppingCartBtm-btn-default ml80"
        type="button"
      >关注
      </button>
    </view>
    <block v-else>
      <view class="jShoppingCartBtm-text">
        已选中<text class="jShoppingCartBtm-text-highlight">{{total}}</text>种
      </view>
      <view class="jShoppingCartBtm-total">
        <text>合计：</text>
        <view class="jShoppingCartBtm-total-price">¥{{totalPrice}}</view>
      </view>
      <button
        class="jShoppingCartBtm-btn-primary"
        type="button"
        @tap="handleSubmit"
      >提交订单
      </button>
    </block>
  </view>
</template>

<script>
export default {
  name: 'JShoppingCartBtm',
  props: {
    // 是否选中所有
    isCheckedAll: {
      type: Boolean,
      default: false
    },
    // 是否是编辑模式
    isEdit: {
      type: Boolean,
      default: false
    },
    // 选择的商品总数
    total: {
      type: Number,
      default: 0
    },
    // 选择的商品总价
    totalPrice: {
      type: [
        Number,
        String
      ],
      default: 0
    }
  },
  methods: {
    checkAll() {
      /* 选中所有 */
      const isCheckedAll = !this.isCheckedAll;
      this.$emit('update:isCheckedAll', isCheckedAll);
      this.$emit('checkAll', isCheckedAll);
    },
    toEditMode() {
      /* 进入编辑模式 */
      this.$emit('update:isEdit', true);
      this.$emit('editModeChange', true);
    },
    exitEditMode() {
      /* 退出编辑模式 */
      this.$emit('update:isEdit', false);
      this.$emit('editModeChange', false);
    },
    handleShowFilter() {
      /* 点击了筛选 */
      this.$emit('onFilter');
    },
    handleDel() {
      /* 删除操作 */
      this.$emit('del');
    },
    handleFollow() {
      /* 关注操作 */
      this.$emit('follow');
    },
    handleSubmit() {
      /* 关注操作 */
      this.$emit('submit');
    }
  },
};
</script>

<style lang="scss">
  .jShoppingCartBtm {
    position: fixed;
    bottom: var(--window-bottom);
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
    z-index: 10;
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

  .jShoppingCartBtm-btns-edit-wrap {
    margin-left: auto;
    height: 42px;
  }

  .jShoppingCartBtm-btn-primary {
    display: inline-block;
    height: 42px;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 42px;
    text-align: center;
    background: $theme-color;
    border-radius: 21px;
    color: #fff;
    font-size: 24px;
  }

  .jShoppingCartBtm-btn-default {
    display: inline-block;
    min-width: 174px;
    height: 42px;
    line-height: 42px;
    border: 1px solid $theme-color;
    border-radius: 21px;
    background: #fff;
    text-align: center;
    font-size: 24px;
    color: $theme-color;
  }
</style>
