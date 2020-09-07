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
    <transfer-goods-head-tab-picker ref="transferGoodsHeadTabPicker"
      v-for="(pickerItem,pIndex) in popTabs"
      :key="pIndex"
      :index="pIndex"
      :disable="pickerItem.disable"
      :show.sync="pickerItem.show"
      @showChange="tabPickerShowChange"
      v-model="pickerItem.children"
      @change="tabPickerChange"
      @confirm="confirm"
    >
    </transfer-goods-head-tab-picker>
  </view>
</template>

<script>
import transferGoodsHeadTabPicker from './transferGoodsHeadTabPicker';

export default {
  name: 'transferGoodsHead',
  components: {
    transferGoodsHeadTabPicker
  },
  props: {
    // 顶部tab配置信息
    tabs: {
      type: Array,
      default: () => []
    },
    cargoWareHome: {
      type: Array,
      default: () => []
    },
    cargoSendWay: {
      type: Array,
      default: () => []
    },
    popTabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 扩展
      isExpend: false
    };
  },
  created() {

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
    },
    confirm(index) {
      console.log(this.popTabs);
      this.$emit('confirm', this.popTabs);
    }
  }
};
</script>
<style lang='scss' scoped>
::v-deep .jHeadTabPicker-list {
  margin-top: 68px;
}
 ::v-deep .jHeadTabPicker-item{
   position: relative;
   width: 50%;
   height: 54px;
   line-height: 54px;
   display: flex;
   align-items: center;
   padding-left: 30px;
   text-align: center;
 }
.jHeadTab-wrap {
  //position: absolute;
  //background: #fff;
  //height: 130px;
  //width: 100%;
  //top: 4px;
  //z-index: 100;
  position: relative;
  background: #fff;
  height: 65px;
}


.jHeadTab-list-wrap{
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
}

.jHeadTab-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-left: 28px;
  padding-right: 28px;
  background: #fff;
  height: 66px;
}

.jHeadTab-item {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 24px;

  &.active {
    color: #ED2856;
  }

  .iconfont {
    font-size: 20px;
  }
}

$jHeadTab-pop-tab-list: 24px;
.jHeadTab-pop-tab-list {
  display: flex;
  justify-content: start;
  padding-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: $jHeadTab-pop-tab-list;
  background: #fff;
  height: 92px;
  margin-top: -2px;
  &.isExpend {
    padding-bottom: 0;
  }
}

.jHeadTab-pop-tab-item {
  position: relative;
  height: 44px;
  background: #F2F2F7;
  border-radius: 22px;
  color: #666;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 24px;

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
