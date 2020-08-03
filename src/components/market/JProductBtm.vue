<template>
  <view class="jProductBtm">
    <view  v-if="groupType === 'zuhe'" class="jProductBtm-left">
      <view class="fs24 text-333">
        合计：<text class="text-theme">￥2893.12</text>
      </view>
      <view class="fs20 text-999">
        剩余可购买套数：<text class="text-theme">94</text>
      </view>
    </view>
    <view v-if="groupType === 'taocan'" class="jProductBtm-left">
      <view class="fs24 text-333">
        合计：<text class="text-theme">￥2893.12</text>
      </view>
    </view>
    <view v-if="groupType === 'zuhe'" class="jProductBtm-right">
      <uni-number-box></uni-number-box>
      <button
        type="button"
        class="jProductBtm-right-btn"
      >成套下单</button>
    </view>
    <view v-if="groupType === 'taocan'" class="jProductBtm-right">
      <view class="condition-style" v-if="!conditionStatus">未满足</view>
      <view class="condition-style" v-if="conditionStatus">满足</view>
      <button
        type="button"
        class="jProductBtm-right-btn"
      >成套下单</button>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/JProductBtm.scss';

export default {
  name: 'jProductBtm',
  components: {
    uniNumberBox
  },
  props: {
    // 全选
    checked: {
      type: Boolean,
      default: false
    },
    groupType: {
      type: [String, Number]
    },
    conditionStatus: {
      type: Boolean
    }
  },
  methods: {
    choose() {
      const checked = !this.checked;
      this.$emit('update:checked', checked);
      this.$emit('checkAll', checked);
    }
  }
};
</script>
