<template>
  <view class="jSearchInput-wrap j-flex-aic">
    <view class="jSearchInput-icon iconfont iconsousuo"></view>
    <input
      class="jSearchInput"
      type="text"
      confirm-type="search"
      :placeholder="placeholder"
      :placeholderClass="placeholderClass"
      v-model="selfValue"
      @confirm="search"
    >
  </view>
</template>

<script>
import './css/jSearchInput.scss';

export default {
  name: 'JSearchInput',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selfValue: this.value
    };
  },
  watch: {
    selfValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    search({ detail: { value } }) {
      /* 键盘搜索事件 */
      this.$emit('search', value);
    }
  }
};
</script>
