<template>
  <view class="jTab">
    <scroll-view
      class="jTab-list"
      id="jTabList"
      scroll-x
      scroll-with-animation
      :scroll-into-view="activeItemName"
    >
      <view
        :class="['jTab-item',tab.active && 'active']"
        v-for="(tab,index) in tabs"
        :key="tab.id"
        :id="'item'+index"
        @tap="tabClick(tab,index)"
      >
        <text>{{tab.name}}</text>
      </view>
    </scroll-view>
    <view
      class="jTab-right"
    >
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
import './css/JTab.scss';

export default {
  name: 'orderJTab',
  props: {
    // tab数据
    // 例： [
    //     {
    //       id: 'gwc',
    //       name: '购物车',
    //       active: true
    //     }
    // ]
    tabs: {
      type: Array,
      default: () => []
    },
    // 选中的tab
    activeItemName: {
      type: String,
      default: 'item0'
    }
  },
  data() {
    return {
      scrollLeft: 0,
      selfActiveItemName: this.activeItemName
    };
  },
  watch: {
    selfActiveItemName(val) {
      this.$emit('update:activeItemName', val);
    },
    activeItemName(val) {
      this.selfActiveItemName = val;
    }
  },
  methods: {
    tabClick(item, index) {
      console.log(item);
      console.log(index);
      /* tab 点击事件 */
      this.tabs.forEach((v) => {
        v.active = false;
      });
      item.active = true;
      this.$emit('tabClick', this.tabs);
      // 移动tab到中间位置
      // this.$nextTick(() => {
      //   const query = uni.createSelectorQuery();
      //   const activeItem = query.select(`#item${index}`);
      //   const parentNode = query.select('#jTabList');
      //   const {
      //     scrollWidth,
      //     offsetWidth
      //   } = parentNode.boundingClientRect;
      //   parentNode.fields({
      //     size: true,
      //     scrollOffset: true
      //   }, (data) => {
      //     debugger;
      //     if (scrollWidth > offsetWidth) {
      //       const {
      //         offsetWidth: activeItemWidth,
      //         offsetLeft: activeItemLeft
      //       } = activeItem;
      //       // 计算中间位置
      //       const scrollToLeftLength = activeItemLeft - offsetWidth / 2 + activeItemWidth / 2;
      //       // parentNode.scrollTo(scrollToLeftLength, 0);
      //       parentNode.scrollLeft = scrollToLeftLength;
      //     }
      //   }).exec();
      // });
      this.selfActiveItemName = `item${index}`;
    }
  }
};
</script>
