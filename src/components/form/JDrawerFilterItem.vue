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
        @tap="toggleExpand(filterItem)"
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
        :class="[item.isChecked && 'active']"
        @tap="choose(item,filterItem.data)"
      >{{item.value}}
      </view>
    </view>
  </view>
</template>

<script>
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
    toggleExpand(item) {
      /* 展开或者收起 */
      item.isExpand = !item.isExpand;
      this.$emit('change', item, this.index);
    },
    choose(item, list) {
      /* 选择选项 */
      if (this.filterItem.type === 'radio') {
        if (!item.isChecked) {
          list.forEach((v) => {
            if (v.isChecked) {
              v.isChecked = false;
            }
          });
        }
      }
      // 翻转
      item.isChecked = !item.isChecked;
      this.filterItem.data = list;
      this.$emit('change', this.filterItem, this.index);
    },
  }
};
</script>
