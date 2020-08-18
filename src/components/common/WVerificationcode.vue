<template>
  <button
    :class="['JVerificationCode-send-code',disabled && 'disabled']"
    :disabled="disabled"
    @click="sendCode"
    type="button"
  >{{btnText}}
  </button>
</template>
<script>
export default {
  name: 'JVerificationCode',
  props: {
    // 倒计时时间
    time: {
      type: Number,
      default: 60
    },
    getMethod: {
      type: Function,
      required: true
    },
    beforeSend: {
      type: Function
    },
    // 回调函数
    callBack: {
      type: Function
    },
    // 错误回调
    errorCallBack: {
      type: Function,
    },
    afterSend: {
      type: Function,
    }
  },
  data() {
    return {
      btnText: '发送验证码',
      disabled: false,
      trueTime: this.time
    };
  },
  methods: {
    async sendCode() {
      /* 发送验证码 */
      if (this.beforeSend && !this.beforeSend()) {
        return;
      }
      this.$nextTick(() => {
        this.getMethod().then((data) => {
          if (this.callBack) {
            this.callBack(data);
          }
        });

        if (this.afterSend) {
          this.afterSend();
        }
        let time = this.trueTime;
        this.disabled = true;
        this.btnText = `重新获取(${time}s)`;
        const interval = setInterval(() => {
          this.btnText = `重新获取(${--time}s)`;
          if (time < 1) {
            this.btnText = '发送验证码';
            this.disabled = false;
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  }
};
</script>
<style lang="scss">
  .JVerificationCode-send-code {
    background: transparent;
    color: #1677FF;
    font-size: 30px;
    padding-left: 10px;
    padding-right: 10px;

    &.disabled {
      color: #474E66;
    }
  }
</style>
