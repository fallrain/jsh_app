<template>
  <view :class="['jRechargePayCard-wrap','type'+type]">
    <view
      :class="['jRechargePayCard-check iconfont',isChecked ? 'iconradio':'iconradio1']"
      @tap="handleCheck"
    ></view>
    <view class="jRechargePayCard-check-img">
      <image></image>
    </view>
    <view class="jRechargePayCard-inf">
      <view class="jRechargePayCard-inf-title">{{title}}</view>
      <view :class="['jRechargePayCard-inf-type','type'+type]">{{typeName}}</view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'JRechargePayCard',
  props: {
    // 类型
    type: {
      type: Number,
      default: 0
    },
    // 是否被选中
    isChecked: {
      type: Boolean,
      default: false
    },
    // 索引
    index: {
      type: Number
    }
  },
  computed: {
    title() {
      return {
        0: '个人账号打款',
        1: '个人储蓄打款',
      }[this.type];
    },
    typeName() {
      return {
        0: '网银支付',
        1: '快捷支付',
      }[this.type];
    },
  },
  methods: {
    handleCheck() {
      const isChecked = !this.isChecked;
      this.$emit('update:isChecked', isChecked);
      this.$emit('checkChange', isChecked, this.index);
    }
  },
};
</script>

<style lang="scss">
  .jRechargePayCard-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 132px;
    padding: 18px 24px;
    border-radius: 12px;
    font-size: 36px;
    color: #333;
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }

    &.type0 {
      background: #F2F7FF;
      border: 1px solid #F2F7FF;

      &.active {
        border: 1px solid #3D96EE;
      }

      .jRechargePayCard-check {
        color: #2283E2;
      }
    }

    &.type1 {
      background: #FFF5F6;
      border: 1px solid #FFF5F6;

      &.active {
        border: 1px solid #ED2856;
      }

      .jRechargePayCard-check {
        color: #ED2856;
      }
    }
  }

  .jRechargePayCard-check {
    font-size: 36px;

    &.active {

    }
  }

  .jRechargePayCard-check-img {
    width: 120px;
    height: 120px;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .jRechargePayCard-inf {
    margin-left: 40px;
  }

  .jRechargePayCard-inf-title {
    color: #333;
    font-size: 36px;
    line-height: 50px;
  }

  .jRechargePayCard-inf-type {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    padding-left: 18px;
    padding-right: 18px;
    color: #fff;
    font-size: 24px;

    &.type0 {
      background: #3D96EE;
    }

    &.type1 {
      background: #ED2856;
    }
  }
</style>
