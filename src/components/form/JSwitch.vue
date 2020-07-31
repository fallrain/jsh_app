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
import './css/jSwitch.scss';

export default {
  name: 'JSwitch',
  props: {
    active: {
      type: Boolean,
      default: true
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
  watch: {
    active(val) {
      this.forwardEnd = val;
    }
  },
  created() {
    this.handleAnimationend();
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
