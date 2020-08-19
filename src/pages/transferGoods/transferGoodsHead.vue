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
      @confirm="confirm"
    >
    </j-head-tab-picker>
  </view>
</template>

<script>
import JHeadTabPicker from '../../components/form/JHeadTabPicker';
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
    },
    cargoWareHome: {
      type: Array,
      default: () => []
    },
    cargoSendWay: {
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
          children:[]
        },
        {
          name: '配送类型',
          show: false,
          children:[]
        },
      ],
      // 扩展
      isExpend: false
    };
  },
  created() {
      
  },
  methods: {
    setPopTabs(wareHome, sendWay) {   
      if (wareHome) {
        const tempArray = []
        wareHome.map(item => {
          // console.log(item.OUTWHNAME)
          const temp = {
            name: item.OUTWHNAME,
            checked: false,
            type: item.OUTWHCODE
          }
          tempArray.push(temp)  
        })
        this.popTabs[0].children = tempArray
      }
      if (sendWay) {
        const tempArray = []
        sendWay.map(item => {
          // console.log(item.sendWay)
          const temp = {
            name: item.sendWay,
            checked: false,
            type: item.brandGroup
          }
          tempArray.push(temp)  
        })
        this.popTabs[1].children = tempArray
      }
      console.log(this.popTabs)
       this.popTabs[0].children[0].checked = true;
       this.popTabs[1].children[1].checked = true;
       this.popTabs[1].children[0].ycFlag = "JSHSW"
       this.popTabs[1].children[1].ycFlag = ""
    },
    
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
      console.log(this.popTabs)
      this.$emit("confirm", this.popTabs)
    }
  }
};
</script>
<style lang='scss' scoped>
// ::v-deep .jHeadTabPicker-item{
//   position: relative;
//   width: 50%;
//   overflow: hidden;
//   margin-top:10px;
  
// }

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

