<template>
  <view class="tShoppingCartBtm">
    <view
      class="tShoppingCartBtm-check"
      @tap="choose"
    >
      <view :class="['iconfont', checked ? 'iconradio active':'iconradio1']"></view>
      <text :class="['tShoppingCartBtm-check-text',checked && 'active']">全选</text>
    </view>
    <text class="tShoppingCartBtm-check-edit" @tap="edit" v-show="!isShowClear">编辑</text>
    <button class="tShoppingCartBtm-check-delete" type="button" @tap="editDelete" v-show="isShowClear">删除选中产品</button>
    <button class="tShoppingCartBtm-check-cancel" @tap="cancel" v-show="isShowClear">取消</button>

    <view class="tShoppingCartBtm-text">
      已选中<text class="tShoppingCartBtm-text-highlight">{{allChooseNum}}</text>种
    </view>
    <view class="tShoppingCartBtm-text-row">|</view>
    <view class="tShoppingCartBtm-total">
      <text>合计：</text>
      <view class="tShoppingCartBtm-total-price">¥{{settlement}}</view>
    </view>
    <button
      type="button"
      :class="['tShoppingCartBtm-btn',active ? 'background:red' : 'ackground:#ccc']"
      @tap="tlement"
      v-show="!isShowClear"
    >结算
    </button>
  </view>
</template>

<script>

export default {
  name: 'TShoppingCartBtm',
  props: {
    // 全选
    checked: {
      type: Boolean,
      default: false
    },
    // 结算
    settlement: {
      type: Number,
      default: 0
    },
    // 选中的数据
    allChooseNum: {
      type: Number,
      default: 0
    },
    // 显示隐藏编辑
    isShowClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active:false
    }
  },
  methods: {
    choose() {
      const checked = !this.checked;
      this.$emit('update:checked', checked);
      this.$emit('checkAll', checked);
    },
    // 结算
    tlement() {
      this.$emit("query")
    },
    // 编辑
    edit() {
      this.$emit("edit")
    },
    // 删除选中的产品
    editDelete() {
      this.$emit("editDelete")
    },
    cancel() {
      this.$emit("cancel")
    }

  }
};
</script>

<style lang="scss">
  .tShoppingCartBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
  }

  .tShoppingCartBtm-check {
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

  .tShoppingCartBtm-check-text {
    color: #333;
    font-size: 24px;
    margin-left: 16px;

    &.active {
      color: $theme-color;
    }
  }

  .tShoppingCartBtm-check-edit {
    color: $theme-color;
    font-size: 24px;
    margin-left: 26px;
    margin-right: 30px;
  }
  
  .tShoppingCartBtm-check-delete {
    height: 42px;
    line-height: 42px;
    color: #fff;
    font-size: 24px;
    margin-left: 10px;
    margin-right: 10px;
    background: $theme-color;
    border-radius: 40px;
  }
  .tShoppingCartBtm-check-cancel {
    height: 42px;
    line-height: 42px;
    color: #fff;
    font-size: 24px;
    margin-left: 10px;
    margin-right: 10px;
    background: $theme-color;
    border-radius: 40px;
  }

  .tShoppingCartBtm-text {
    color: #666;
    font-size: 20px;
  }

  .tShoppingCartBtm-text-highlight {
    color: $theme-color;
    font-size: 28px;
  }
  .tShoppingCartBtm-text-row{
    font-size: 24px;
    color: #B3B3B3;
    margin-left:8px;
  }
  .tShoppingCartBtm-total {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;
    margin-left: 18px;
  }

  .tShoppingCartBtm-total-price {
    color: $theme-color;
    font-size: 22px;
  }

  .tShoppingCartBtm-btn {
    display: inline-block;
    width: 116px;
    height: 42px;
    margin-left: 6px;
    line-height: 42px;
    text-align: center;
    background: $theme-color;
    border-radius: 21px;
    color: #fff;
    font-size: 24px;
  }
</style>
