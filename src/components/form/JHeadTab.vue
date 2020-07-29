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
      <view :class="['jHeadTab-pop-tab-list',isExpend && 'isExpend']">
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
      </view>
    </view>
    <j-head-tab-picker
      v-for="(pickerItem,pIndex) in popTabs"
      :key="pIndex"
      :index="pIndex"
      :show.sync="pickerItem.show"
      @showChange="tabPickerShowChange"
      v-model="pickerItem.children"
      @change="tabPickerChange"
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
    }
  },
  data() {
    return {
      popTabs: [
        {
          name: '品牌',
          show: false,
          children: [
            {
              name: '海尔',
              checked: false
            },
            {
              name: '卡萨帝',
              checked: false
            },
            {
              name: '统帅',
              checked: false
            },
            {
              name: '摩卡',
              checked: false
            },
            {
              name: 'GE',
              checked: false
            },
            {
              name: '超长品牌测试尼古拉斯海尔兄弟铁柱',
              checked: false
            }
          ]
        },
        {
          name: '类目',
          show: false,
        },
        {
          name: '一级类目',
          show: false,
        },
        {
          name: '二级类目',
          show: false,
        }
      ],
      // 扩展
      isExpend: false
    };
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
    showSecondCategory(item) {
      /* 展示二级类目 */
      item.show = !item.show;
      this.isExpend = item.show;
    },
    tabPickerShowChange(show) {
      this.isExpend = show;
    },
    tabPickerChange(children, index) {
      this.popTabs[index].children = children;
    }
  }
};
</script>
