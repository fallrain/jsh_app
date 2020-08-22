<template>
  <view class="jTextarea">
    <textarea
      class="jTextarea-ta"
      :placeholder="placeholder"
      :maxlength="maxNumber"
      v-model="taValue"
      @input="handleInput"
      :disabled="disabled"
      :readonly="readonly"
      :placeholderClass="placeholderClass"
    />
    <view
      v-if="countMaxNumber"
      class="jTextarea-fontNumber"
    >
      <text class="jTextarea-fontNumber-done">{{taValueLength}}</text>/{{maxNumber}}
    </view>
  </view>
</template>
<script>
export default {
  name: 'JTextarea',
  props: {
    value: {
      type: String
    },
    countMaxNumber: {
      type: Boolean,
      default: false
    },
    maxNumber: {
      type: Number,
      default: 200
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholderClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      taValue: this.value
    };
  },
  watch: {
    value(newV, oldV) {
      if (oldV !== newV) {
        this.taValue = newV;
      }
    },
    taValue(newV, oldV) {
      if (oldV !== newV) {
        this.$emit('input', newV);
        this.$emit('change', newV);
      }
    }
  },
  computed: {
    taValueLength() {
      return this.taValue.length;
    }
  },
  methods: {
    handleInput() {
      this.$emit('handelInput');
    }
  }
};
</script>
<style lang="scss">
  .jTextarea {
    border-radius: 5px;
  }

  .jTextarea-ta {
    width: 100%;
    background: transparent;
    border: 0;
    resize: none;
    padding: 10px;
    font-size: 30px;
    -webkit-appearance: none;
  }

  .jTextarea-fontNumber {
    text-align: right;
    color: #999;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .jTextarea-fontNumber-done {
    color: $theme-color;
  }
</style>
