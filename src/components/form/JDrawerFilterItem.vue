<template>
  <view class="jDrawerFilterItem">
    <view class="jDrawerFilterItem-head">
      <view>
        <text>{{filterItem.name}}</text>
        <text class="jDrawerFilterItem-head-tips">{{filterItem.tips}}</text>
      </view>
      <i
        class="iconfont iconxia"
        :class="[
                  !filterItem.isExpand && 'reverse'
                ]"
        @tap="toggleExpand"
      ></i>
    </view>
    <view
      class="jDrawerFilterItem-list"
      v-show="filterItem.isExpand"
    >
      <view
        v-for="(item,filterIndex) in filterItem.data"
        :key="filterIndex"
        class="jDrawerFilterItem-list-item"
        :class="[
          item.isChecked && 'active'
        ]"
        @tap="choose(filterIndex)"
      >{{item.value}}
      </view>
    </view>
  </view>
</template>

<script>
import {
  produce
} from 'immer';
import './css/jDrawerFilterItem.scss';

export default {
  name: 'JDrawerFilterItem',
  props: {
    // 筛选列表
    filterItem: {
      type: Object,
      default: () => {}
    },
    // 索引（小程序bug）
    index: {
      type: Number
    },
  },
  methods: {
    toggleExpand() {
      /* 展开或者收起 */
      const filterItem = produce(this.filterItem, (item) => {
        item.isExpand = !item.isExpand;
      });
      this.$emit('change', filterItem, this.index);
    },
    choose(index) {
      /* 选择选项 */
      const nextState = produce(this.filterItem, (filterItem) => {
        const item = filterItem.data[index];
        if (filterItem.type === 'radio') {
          if (!item.isChecked) {
            filterItem.data.forEach((v) => {
              if (v.isChecked) {
                v.isChecked = false;
              }
            });
          }
        }
        // 翻转
        item.isChecked = !item.isChecked;
      });

      this.$emit('change', nextState, this.index);
    },
  }
};
</script>
