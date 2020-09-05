<template>
  <view class="jSearchInput-wrap j-flex-aic">
    <view class="jSearchInput-icon iconfont iconsousuo"></view>
    <u-input
      class="jSearchInput"
      type="text"
      confirm-type="search"
      :placeholder="placeholder"
      :placeholderClass="placeholderClass"
      :placeholderStyle="placeholderStyle"
      v-model="selfValue"
      @confirm="search"
    ></u-input>
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
    placeholderStyle: {
      type: String,
      default: 'font-size:12px'
    }
  },
  data() {
    return {
      selfValue: this.value
    };
  },
  watch: {
    selfValue(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    }
  },
  methods: {
    search(value) {
      /* 键盘搜索事件 */
      this.$emit('search', value);
    }
  }
};
</script>
