<template>
  <view class="jSearchInput-wrap j-flex-aic">
    <view class="jSearchInput-icon iconfont iconsousuo"></view>
    <input
      class="jSearchInput"
      type="text"
      confirm-type="search"
      :placeholder="placeholder"
      :placeholderClass="placeholderClass"
    >
  </view>
</template>

<script>
import './css/jSearchInput.scss';

export default {
  name: 'JSearchInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: ''
    },
  },
};
</script>

<style scoped>

</style>
