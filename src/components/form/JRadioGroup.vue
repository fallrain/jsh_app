<template>
  <view class="jRadioGroup">
    <j-radio
      v-for="(radio,index) in groups"
      :key="index"
      :inf="radio.inf"
      :checked.sync="radio.checked"
      :index="index"
      @change="groupChange"
    ></j-radio>
  </view>
</template>

<script>
import JRadio from './JRadio';
import './css/jRadioGroup.scss';

export default {
  name: 'JRadioGroup',
  components: {
    JRadio
  },
  props: {
    // radio group数据
    groups: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    groupChange(checked, index) {
      /* 处理多个radio选中 */
      this.groups.forEach((v) => {
        v.checked = false;
      });
      this.groups[index].checked = checked;
      this.$emit('change', this.groups);
    }
  }
};
</script>
