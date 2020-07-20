<template>
  <view
    :class="[
      'jSwitch-wrap',
      active && animationIng && 'active',
      !active && animationIng && 'active-reverse',
    ]"
    @tap="handleClick"
  >
    <view
      :class="[
        'jSwitch',
        forwardEnd && 'jSwitch-forwardEnd'
      ]"
    >
      <view
        @animationend="handleAnimationend"
        :class="['jSwitch-dot',forwardEnd ?'jSwitch-dot-end':'jSwitch-dot-begin']"
      ></view>
    </view>
    <view
      v-if="inf"
      :class="['jSwitch-cnt',active && 'active']"
    >{{inf}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'JSwitch',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    inf: {
      type: [Number, String]
    }
  },
  data() {
    return {
      animationIng: false,
      forwardEnd: false
    };
  },
  methods: {
    handleClick() {
      this.animationIng = true;
      this.$emit('update:active', !this.active);
      this.$emit('change', !this.active);
    },
    handleAnimationend() {
      this.animationIng = false;
      this.forwardEnd = this.active;
    }
  }
};
</script>

<style lang="scss">
  .jSwitch-wrap {
    display: flex;
    align-items: center;

    &.active {
      .jSwitch-dot {
        animation: jSwitch-move .2s;
      }
    }

    &.active-reverse {
      .jSwitch-dot {
        animation: jSwitch-move-reverse .2s;
      }
    }
  }

  .jSwitch {
    position: relative;
    width: 40px;
    height: 24px;
    border-radius: 11px;
    border: 1px solid #EDE9E9;
    background: #EDE9E9;
  }

  .jSwitch-forwardEnd {
    background: $theme-color;
    border: 0;
  }

  .jSwitch-dot {
    position: absolute;
    top: 50%;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #EDE9E9;
  }

  .jSwitch-dot-begin {
    left: 0;
    transform: translateY(-50%);
  }

  .jSwitch-dot-end {
    left: 100%;
    transform: translateX(-105%) translateY(-50%);
  }

  @keyframes jSwitch-move {
    from {
      left: 0;
    }
    to {
      left: 100%;
      transform: translateX(-100%) translateY(-50%);
    }
  }

  @keyframes jSwitch-move-reverse {
    from {
      left: 100%;
      transform: translateX(-100%) translateY(-50%);
    }
    to {
      left: 0;
      transform: translateX(1%) translateY(-50%);
    }
  }

  .jSwitch-cnt {
    color: #333;
    margin-left: 8px;
    font-size: 24px;

    &.active {
      color: $theme-color;
    }
  }
</style>
