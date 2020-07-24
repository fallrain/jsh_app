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
      :value="selfValue"
      @input="valChange"
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
    valChange({ detail: { value } }) {
      this.selfValue = value;
    }
  }
};
</script>

<style lang="scss">
  .jInput-wrap {
    display: flex;
    align-items: center;
    border-bottom: 1.5px solid #d3d3d3;
    width: 100%;
  }

  .jInput {
    box-sizing: border-box;
    flex-grow: 1;
    height: 84px;
    padding-left: 40px;
    padding-right: 40px;
    color: #666;
    font-size: 28px;

    &::-webkit-input-placeholder {
      color: #BDCADA;
    }
  }

  .jInput-right {

  }

  .jInput-left {

  }

</style>
