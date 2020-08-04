<template>
  <view class="vehicleList">
    <view class="vehicleList-tab">
      <view class="vehicle-search j-flex-aic">
        <j-search-input></j-search-input>
        <button type="button" class="vehicle-btn">搜索</button>
      </view>
      <view>
        <j-head-tab
          class="mb12"
          :tabs="tabs"
          @tabClick="tabClick"
        ></j-head-tab>
<!--        <vehicle-head @tabClick="tabClick"></vehicle-head>-->
      </view>
    </view>
    <mescroll-body ref="mescrollRef"><!-- 产品列表 -->
      <view class="vehicle-listItem" v-if="list">
        <vehicle-item v-for="(item,index) in list" :key="index" :goods="item"></vehicle-item>
      </view>
      <view v-else>暂无数据</view>
    </mescroll-body>
    <j-drawer :show.sync="isShowSeach"></j-drawer>
  </view>
</template>

<script>
import './css/vehicleList.scss';
import JHeadTab from '../../components/form/JHeadTab';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import JSearchInput from '../../components/form/JSearchInput';
import vehicleHead from '../../components/vehicleList/vehicleHead';
import vehicleItem from '../../components/vehicleList/vehicleItem';
import JDrawer from '../../components/form/JDrawer';

export default {
  name: 'vehicleList',
  components: {
    MescrollBody,
    JSearchInput,
    vehicleHead,
    vehicleItem,
    JDrawer,
    JHeadTab
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
      list: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }]
    };
  },
  methods: {
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
      // if (tab.handler) {
      //   this[tab.handler]();
      // }
    },
    showFilter() {
      /* 展示filter */
      this.isShowSeach = true;
    },
  }
};
</script>

<style scoped>

</style>
