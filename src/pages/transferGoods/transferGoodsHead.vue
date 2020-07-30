<template>
  <view class="jHeadTab-wrap">
    <view class="jHeadTab-list-wrap">
      <view class="jHeadTab-list">
        <view
          class="jHeadTab-item"
          v-for="(item,index) in tabs"
          :key="index"
          @tap="tabHandle(item.handler)"
        >
          <text>{{item.name}}</text>
          <view
            v-if="item.icon"
            :class="['iconfont',item.icon]"
          ></view>
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
// import transferGoodsHeadPicker from './transferGoodsHeadPicker';
import JHeadTabPicker from '../../components/form/JHeadTabPicker';
// import '../../components/form/css/jHeadTab.scss';
export default {
  name: 'transferGoodsHead',
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
          name: '调出库位',
          show: false,
        },
        // {
        //   name: '品牌',
        //   show: false,
        //   children: [
        //     {
        //       name: '海尔',
        //       checked: false
        //     },
        //     {
        //       name: '卡萨帝',
        //       checked: false
        //     },
        //     {
        //       name: '统帅',
        //       checked: false
        //     },
        //     {
        //       name: '摩卡',
        //       checked: false
        //     },
        //     {
        //       name: 'GE',
        //       checked: false
        //     },
        //     {
        //       name: '超长品牌测试尼古拉斯海尔兄弟铁柱',
        //       checked: false
        //     }
        //   ]
        // },
        {
          name: '配送类型',
          show: false,
        },
      ],
      // 扩展
      isExpend: false
    };
  },
  methods: {
    tabHandle(handler) {
      /* tab 点击事件 */
      this.$emit('tabClick', handler);
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
<style lang='scss' scoped>
.jHeadTab-wrap {
  position: relative;
  background: #fff;
  height: 130px;
}

.jHeadTab-list-wrap{
  position: absolute;
  left: 0;
  right: 0;
  z-index: 99;
}

.jHeadTab-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-left: 28px;
  padding-right: 28px;
  background: #fff;
  height: 38px;
}

.jHeadTab-item {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 24px;

  &.active {
    color: #2283E2;
  }

  .iconfont {
    font-size: 20px;
  }
}

$jHeadTab-pop-tab-list: 24px;
.jHeadTab-pop-tab-list {
  display: flex;
//   justify-content: space-between;
  padding-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: $jHeadTab-pop-tab-list;
  background: #fff;
  height: 92px;

  &.isExpend {
    padding-bottom: 0;
  }
}

.jHeadTab-pop-tab-item {
  position: relative;
  height: 44px;
  background: #F2F2F7;
  border-radius: 22px;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right:40px;
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  color:rgba(102,102,102,1);
  line-height:34px;

  &.active {
    height: 44px + $jHeadTab-pop-tab-list;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    .jHeadTab-pop-tab-item-text-wrap {
      top: calc(50% - 12px);
    }
  }
}

.jHeadTab-pop-tab-item-text-wrap {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.jHeadTab-pop-tab-item-text {
  margin-right: 8px;
}

.jHeadTab-pop-tab-item-icon {
  font-size: 14px;
}


</style>

