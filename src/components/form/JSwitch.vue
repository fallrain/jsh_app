<template>
  <view
    :class="[
      'jSwitch-wrap',
      active===stateMap[0] && animationIng && 'active',
      active===stateMap[1] && animationIng && 'active-reverse',
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
      :class="['jSwitch-cnt',active===stateMap[0] && 'active']"
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
    },
    inf: {
      type: [Number, String]
    },
    // 点击之前事件，return false阻止点击
    beforeChange: {
      type: Function
    },
    // 状态映射
    // 数组 第一个代表true值，第二个代表false
    stateMap: {
      type: Array,
      default: () => [true, false]
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
    getStateMap() {
      /* 检查state是否是正确的属性 */
      if (!this.stateMap || this.stateMap.length !== 2) {
        return [true, false];
      }
      return this.stateMap;
    },
    handleClick() {
      if (this.beforeChange) {
        if (this.beforeChange.bind(this.$parent)() === false) {
          return;
        }
      }
      this.animationIng = true;
      const stateMap = this.getStateMap();
      let keyIndex = stateMap.findIndex(v => v === this.active);
      keyIndex = keyIndex === 1 ? 0 : 1;
      const isActive = stateMap[keyIndex];
      this.$emit('update:active', isActive);
      this.$emit('change', isActive);
    },
    handleAnimationend() {
      this.animationIng = false;
      this.forwardEnd = this.active === this.getStateMap()[0];
    }
  }
};
</script>
