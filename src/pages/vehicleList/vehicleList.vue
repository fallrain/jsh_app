<template>
  <view class="vehicleList">
    <view class="vehicleList-tab">
      <view class="vehicle-search j-flex-aic">
        <j-search-input></j-search-input>
        <button type="button" class="vehicle-btn">搜索</button>
      </view>
      <view>
        <j-head-tab class="mb12" :tabs="tabs" @tabClick="tabClick"></j-head-tab>
      </view>
    </view>
    <mescroll-body ref="mescrollRef"><!-- 产品列表 -->
      <view class="vehicle-listItem" v-if="list">
        <vehicle-item v-for="(item,index) in list" :key="index" :goods="item"></vehicle-item>
      </view>
      <view v-else>暂无数据</view>
    </mescroll-body>
    <j-drawer :show.sync="isShowSeach" @filterConfirm="filterConfirm" @filterReset="filterReset">
      <template>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head">
            <view><text>是否限制高端型号</text></view>
            <view :class="['vehicle-drawer-filter-status',switchType&&'active']">{{switchType ? '是' : '否'}}</view>
            <j-switch :active.sync="switchType" @change="isCreditModeChange"></j-switch>
          </view>
        </view>
        <j-drawer-filter-item v-for="(item,index) in filterList" :key="index" :filterItem="item"
           :index="index" @change="filterListChange"></j-drawer-filter-item>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head" @tap="showDeliveryAddress">
            <view><text>配送至</text></view>
            <i class="iconfont iconyou vehicle-drawer-filter-head-icon-right"></i>
          </view>
          <view class="vehicle-drawer-filter-head-ads">{{curChoseDeliveryAddress.name}}</view>
        </view>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head">
            <view><text>价格区间</text></view>
          </view>
          <view class="vehicle-drawer-filter-price-range">
            <input class="vehicle-drawer-filter-price-ipt"
              type="number" placeholder="最低价格" v-model="filterForm.lowPrice">
            <view class="vehicle-drawer-filter-price-line"></view>
            <input class="vehicle-drawer-filter-price-ipt"
              type="number" placeholder="最高价格" v-model="filterForm.highPrice">
          </view>
        </view>
      </template>
    </j-drawer>
    <j-choose-delivery-address :show.sync="isShowAddressDrawer" :list="deliveryAddressList" @change="deliveryAddressListChange"></j-choose-delivery-address>
  </view>
</template>

<script>
import './css/vehicleList.scss';
import JHeadTab from '../../components/form/JHeadTab';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import JSearchInput from '../../components/form/JSearchInput';
import vehicleItem from '../../components/vehicleList/vehicleItem';
import JDrawer from '../../components/form/JDrawer';
import JDrawerFilterItem from '../../components/form/JDrawerFilterItem';
import JSwitch from '../../components/form/JSwitch';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import {
  getGoodsTag,
  getGoodsType
} from '@/lib/dataDictionary';

export default {
  name: 'vehicleList',
  components: {
    JHeadTab,
    MescrollBody,
    JSearchInput,
    vehicleItem,
    JDrawer,
    JDrawerFilterItem,
    JSwitch,
    JChooseDeliveryAddress
  },
  data() {
    return {
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
      isShowSeach: false, // 筛选抽屉
      // 筛选抽屉数据
      filterList: [
        {
          name: '品牌',
          isExpand: true,
          type: 'radio',
          data: []
        },
        {
          name: '类目',
          isExpand: true,
          type: 'radio',
          data: []
        }
      ],
      filterForm: { // 侧边筛选表单
        name: '', // 搜索栏
        lowPrice: '', // 最低价
        highPrice: '' // 最高价
      },
      switchType: true, // 是否限制高端型号
      isShowAddressDrawer: false, // 是否展示地址侧边抽屉
      deliveryAddressList: [], // 配送地址数据
      curChoseDeliveryAddress: {}, // 当前选中的配送地址
      list: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }]
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      this.setFilterData();
      this.getDeliveryAddress();
    },
    tabClick(tabs, tab, index) {
      console.log(tabs);
      console.log(tab);
      console.log(index);
      /* 顶部双层tab栏目，第一层点击事件 */
      this.tabs = tabs;
      // tab为价格的时候，降序升序操作
      if (tab.id === 'price') {
        const sortDirection = tab.condition.sortDirection;
        tab.condition.sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        tab.iconClass = tab.condition.sortDirection;
        this.tabs[index] = tab;
      }
      // if (!tab.noSearch) {
      //   this.mescroll.resetUpScroll(true);
      // }
      if (tab.handler) {
        this[tab.handler]();
      }
    },
    showFilter() {
      /* 展示filter */
      this.isShowSeach = true;
    },
    setFilterData() {
      /* 设置右侧抽屉筛选的数据 */
      // 商品删选类型
      const goodsTypeData = getGoodsType();
      this.filterList[0].data = Object.keys(goodsTypeData).map(key => ({
        key,
        value: goodsTypeData[key],
        isChecked: false
      }));
      // 商品标签
      const goodsTagData = getGoodsTag();
      this.filterList[1].data = Object.keys(goodsTagData).map(key => ({
        key,
        value: goodsTagData[key],
        isChecked: false
      }));
    },
    filterListChange(item, index) {
      /* 抽屉筛选选中change */
      this.$set(this.filterList, index, item);
    },
    filterConfirm() {
      /* 抽屉筛选确认 */
      // 重新搜索
      // this.mescroll.resetUpScroll(true);
    },
    filterReset() {
      /* 抽屉筛选重置 */
      this.filterList.forEach((item) => {
        item.data.forEach((v) => {
          v.isChecked = false;
        });
      });
      // 重新搜索
      // this.mescroll.resetUpScroll(true);
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    },
    getDeliveryAddress() {
      /* 获取配送地址 */
      this.customerService.addressesList(1).then(({ code, data }) => {
        if (code === '1') {
          // 配送地址列表
          this.deliveryAddressList = data.map(v => ({
            id: v.customerCode,
            name: `(${v.customerCode})${v.address}`
          }));
          // 当前配送地址修改
          if (this.deliveryAddressList[0]) {
            this.deliveryAddressList[0].checked = true;
            this.curChoseDeliveryAddress = this.deliveryAddressList[0];
          }
          console.log(this.deliveryAddressList);
        }
      });
    },
    deliveryAddressListChange(list, item) {
      /* 地址数据改变 */
      this.deliveryAddressList = list;
      this.curChoseDeliveryAddress = item;
    }
  }
};
</script>

<style scoped>

</style>
