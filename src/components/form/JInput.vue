<template>
  <view class="jInput-wrap">
    <view class='jInput-left'>
      <slot name="left"></slot>
    </view>
    <input
      class='jInput'
      :type="type"
      :password="password"
      :placeholder="placeholder"
    >
    <view class='jInput-right'>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
    },
    password: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
};
</script>

<style lang="scss">
  .jInput-wrap {
    display: flex;
    align-items: center;
    border-bottom: 1.5rpx solid #d3d3d3;
    width: 100%;
  }

  .jInput {
    box-sizing: border-box;
    flex-grow: 1;
    height: 84rpx;
    padding-left: 40rpx;
    padding-right: 40rpx;
    color: #666;
    font-size: 28rpx;

    &::-webkit-input-placeholder {
      color: #BDCADA;
    }
  }

  .jInput-right {

  }

  .jInput-left {

  }

</style>
