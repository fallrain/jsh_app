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
      :show.sync="pickerItem.show"
      v-model="pickerItem.children"
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
    typeShow: false
  },
  data() {
    return {
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
      this.tabs.forEach((v) => {
        v.active = false;
      });
      item.active = true;
      this.$emit('tabClick', this.tabs, item, index);
    },
    tabTagHandle() {
      /* tag tab 点击事件 */
    },
    tabPickerConfirm() {
      // 确认选择
      this.$emit('tabPickerConfirm', this.tabs);
    },
    tabPickerChange(children, index) {
      this.tabs[index].children = children;
      console.log(this.tabs);
    }
  }
};
</script>
