<template>
  <view @tap="cellClick" class="jCell">
    <view :class="['jCell-title',titleWrap && 'wrap']">
      {{title}}
      <slot name="title"></slot>
    </view>
    <view class="jCell-cnt">
      <slot></slot>
    </view>
    <view class="jCell-right">
      <slot name="right"></slot>
    </view>
  </view>
</template>
<script>
export default {
  name: 'JCell',
  props: {
    title: {
      type: String
    },
    hasIcon: {
      default: true
    },
    // title是否换行
    titleWrap: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cellClick() {
      this.$emit('cellClick')
    }
  }
};
</script>
<style lang="scss">
  .jCell {
    //position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 88px;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-right: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &:last-child {
      border-bottom: 0;
    }
  }

  .jCell-cnt {
    flex-grow: 1;
    word-break: break-all;
  }

  .jCell-icon {
    //position: absolute;
    //font-size: 16px;
    //top: 50%;
    //transform: translateY(-50%);
    //right: 0;
  }

  .jCell-title {
    min-width: 158px;
    padding-right: 14px;
    overflow: hidden;
    color: #333;
    font-size: 30px;
    line-height: 1;

    &.wrap {
      width: 158px;
    }
  }
</style>
