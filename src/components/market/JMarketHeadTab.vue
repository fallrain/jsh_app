<template>
  <view class="JMarketHeadTab">
    <view class="jMarketTab-warp">
      <view class="jMarketTab-list">
        <view
          :class="['jMarketTab-item', item.active && 'active']"
          v-for="(item,index) in tabs"
          :key="index"
          @tap="tabHandle(item,index)"
        >
          <text>{{item.name}}</text>
          <view
            v-if="item.icon"
            :class="['iconfont',item.icon]"
          ></view>
        </view>
      </view>
    </view>
    <j-head-tab-picker
      v-for="(pickerItem,pIndex) in tabs"
      :key="pIndex"
      :index="pIndex"
      :checkedIndex="childCheckedIndex"
      :show="pIndex === showIndex"
      v-model="pickerItem.children"
      @checkedIndexChange="checkedIndexChange"
      @confirm="tabPickerConfirm"
      @change="tabPickerChange"
    >
    </j-head-tab-picker>
  </view>
</template>

<script>
import './css/JMarketHeadTab.scss';
import JHeadTabPicker from '../form/JHeadTabPicker';

export default {
  name: 'JMarketHeadTab',
  components: {
    JHeadTabPicker
  },
  props: {
    // 顶部tab配置信息
    tabs: {
      type: Array,
      default: () => []
    },
    // 类别下拉菜单控制
    typeShow: false,
    // 搜索条目选中的index
    childCheckedIndex: {
      type: [Number, Object],
      default: null
    }
  },
  data() {
    return {
      // 展开的条目的index
      showIndex: null,
    };
  },
  watch: {
    typeShow(val) {
      this.tabs[0].show = val;
    }
  },
  methods: {
    tabHandle(item, index) {
      /* tab 点击事件 */
      if (!item.noActive) {
        if (this.showIndex === index) {
          this.showIndex = null;
        } else {
          this.showIndex = index;
        }
      } else {
        this.showIndex = null;
      }
      this.$emit('tabClick', this.tabs, item, index);
    },
    tabTagHandle() {
      /* tag tab 点击事件 */
    },
    checkedIndexChange(index) {
      /* 选中的活动类型选中change */
      this.$emit('update:childCheckedIndex', index);
    },
    tabPickerConfirm(index, choseChildItem) {
      // 确认选择
      // 确认则关闭弹出框
      this.showIndex = null;
      this.$emit('tabPickerConfirm', this.tabs, choseChildItem);
    },
    tabPickerChange(children, index) {
      this.tabs[index].children = children;
    }
  }
};
</script>
