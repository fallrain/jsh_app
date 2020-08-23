<template>
  <view class="vehicleHead">
    <view class="VHD-tab-wrap">
      <view class="VHDTab-list">
        <view class="VHD-item" :class="{'active':true}" v-for="(item,index) in tabs" :key="index" @tap="tabHandle(item,index)">
          <text>{{item.name}}</text>
          <view v-if="item.icon" :class="['iconfont',item.icon]"></view>
        </view>
      </view>
      <view :class="['VHD-pop-tab-list',isExpend && 'isExpend']">
        <view :class="['VHD-pop-tab-item',item.show && 'active']" v-for="(item,index) in popTabs" :key="index">
          <view @tap="showSecondCategory(item)" class="VHD-pop-tab-item-text-wrap">
            <text class="VHD-pop-tab-item-text">{{item.name}}</text>
            <view class="iconfont iconxia VHD-pop-tab-item-icon"></view>
          </view>
        </view>
      </view>
    </view>
    <j-head-tab-picker v-for="(pickerItem,pIndex) in popTabs" :key="pIndex" :index="pIndex" :show.sync="pickerItem.show"
      @showChange="tabPickerShowChange" v-model="pickerItem.children" @change="tabPickerChange"></j-head-tab-picker>
  </view>
</template>

<script>
import JHeadTabPicker from '../form/JHeadTabPicker';

export default {
  name: 'VehicleHead',
  components: {
    JHeadTabPicker
  },
  data() {
    return {
      isExpend: true,
      tabs: [
        {
          name: '综合',
          active: true
        },
        {
          name: '最新上架',
          active: false,
          condition: {
            sortDirection: 'desc',
            sortType: 'saletime'
          }
        },
        {
          id: 'price',
          name: '价格',
          icon: [
            'iconpaixujiantoushang',
            'iconpaixujiantouxia'
          ],
          iconClass: '',
          active: false,
          condition: {
            sortDirection: 'desc',
            sortType: 'price'
          }
        },
        {
          name: '筛选',
          icon: [
            'iconshaixuan'
          ],
          handler: 'showFilter',
          noSearch: true,
          active: false
        }
      ],
      popTabs: [
        {
          name: '发货基地',
          show: false,
        },
        {
          name: '基地拼车',
          show: false,
        },
        {
          name: '配送类型',
          show: false,
        },
        {
          name: '整车类型',
          show: false,
        },
      ],
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
    showSecondCategory(item) {
      /* 展示二级类目 */
      item.show = !item.show;
      this.isExpend = item.show;
    },
    tabPickerShowChange(show) {
      this.isExpend = show;
      console.log(show);
    },
    tabPickerChange(children, index) {
      this.popTabs[index].children = children;
    }
  }
};
</script>

<style lang='scss' scoped>
  .vehicleHead{
    position: relative;
    background: #fff;
    height: 130px;
  }
  .VHD-tab-wrap{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .VHDTab-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    padding-left: 28px;
    padding-right: 28px;
    background: #fff;
    height: 38px;
  }
  .VHD-item {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;

    &.active {
       color: $theme-color;
     }

    .iconfont {
      font-size: 20px;
    }
  }
  .VHD-pop-tab-list {
    display: flex;
    padding:24px 12px;
    background: #fff;
    height: 96px;

    &.isExpend {
      padding-bottom: 0;
    }
  }
  .VHD-pop-tab-item {
    position: relative;
    height: 44px;
    background: #F2F2F7;
    border-radius: 22px;
    font-size: 24px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right:32px;
    font-family:PingFangSC-Light,PingFang SC;
    font-weight:300;
    color:rgba(102,102,102,1);
    line-height:34px;

    &.active {
      height: 44px + 24px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .VHD-pop-tab-item-text-wrap {
        top: calc(50% - 12px);
      }
    }
  }
  .VHD-pop-tab-item-text-wrap {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  .VHD-pop-tab-item-text {
    margin-right: 8px;
  }
  .VHD-pop-tab-item-icon {
    font-size: 14px;
  }
</style>
