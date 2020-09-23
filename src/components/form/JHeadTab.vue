<template>
  <view class="jHeadTab-wrap">
    <view class="jHeadTab-list-wrap">
      <view class="jHeadTab-list">
        <view
          :class="['jHeadTab-item', item.active && 'active']"
          v-for="(item,index) in tabs"
          :key="index"
          @tap="tabHandle(item,index)"
        >
          <text>{{item.name}}</text>
          <view
            v-if="item.icon"
            :class="['jHeadTab-icon-wrap',item.iconClass]"
          >
            <view
              v-for="(iconItem,iconIndex) in item.icon"
              :key="iconIndex"
              :class="['iconfont',iconItem]"
            ></view>
          </view>
        </view>
      </view>
      <scroll-view
        :class="['jHeadTab-pop-tab-list',isExpend && 'isExpend']"
        scroll-x
      >
        <view
          :class="[
          'jHeadTab-pop-tab-item',
          item.show && 'active',
        ]"
          v-for="(item,index) in popTabs"
          :key="index"
        >
          <view
            @tap="showSecondCategory(item)"
            class="jHeadTab-pop-tab-item-text-wrap"
          >
            <text class="jHeadTab-pop-tab-item-text">{{item.name}}</text>
            <view class="iconfont iconxia jHeadTab-pop-tab-item-icon"></view>
          </view>
        </view>
      </scroll-view>
    </view>
    <j-head-tab-picker
      v-for="(pickerItem,pIndex) in popTabs"
      :key="pIndex"
      :index="pIndex"
      :show.sync="pickerItem.show"
      @showChange="tabPickerShowChange"
      v-model="pickerItem.children"
      @change="tabPickerChange"
      @confirm="confirmPup"
    >
    </j-head-tab-picker>
  </view>
</template>

<script>
import JHeadTabPicker from './JHeadTabPicker';
import './css/jHeadTab.scss';

export default {
  name: 'JHeadTab',
  components: {
    JHeadTabPicker
  },
  props: {
    // 顶部tab配置信息
    tabs: {
      type: Array,
      default: () => []
    },
    popTabs: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      // 扩展
      isExpend: false
    };
  },
  methods: {
    tabHandle(item, index) {
      /* tab 点击事件 */
      // 除去不能点击的item
      this.$emit('tabClick', this.tabs, item, index);
    },
    tabTagHandle() {
      /* tag tab 点击事件 */
    },
    showSecondCategory(item) {
      /* 展示二级类目 */
      const isShow = !item.show;
      this.popTabs.forEach((inf) => {
        inf.show = false;
      });
      item.show = isShow;
      this.isExpend = isShow;
      this.$emit('tabPickerChange', this.popTabs);
    },
    tabPickerShowChange(show) {
      this.isExpend = show;
    },
    tabPickerChange(children, index) {
      /* 整车专用：拼车跟基地只能选一 */
      if (index === 0) {
        this.popTabs[1].children.forEach((v) => {
          v.checked = false;
        });
      }
      if (index === 1) {
        this.popTabs[0].children.forEach((v) => {
          v.checked = false;
        });
      }
      /* 整车专用：拼车跟基地只能选一 */
      this.popTabs[index].children = children;
      this.$emit('tabPickerChange', this.popTabs);
    },
    confirmPup(index, choseChildItem) {
      if (this.popTabs[0].children[0].type === 'ZCJD') {
        let num = 0;
        this.popTabs[0].children.forEach((v) => {
          if (v.checked) {
            num = 1;
          }
        });
        this.popTabs[1].children.forEach((v) => {
          if (v.checked) {
            num = 2;
          }
        });
        if (num === 0) {
          this.popTabs[0].children[4].checked = true;
        }
      }
      this.$emit('tabconfirmPup', this.popTabs, index, choseChildItem);
    }
  }
};
</script>
