<template>
  <view class="marketList">
    <j-market-head-tab
      class="mb12"
      :tabs="tabs"
      :typeShow="isShowType"
      @tabClick="tabClick"
    ></j-market-head-tab>
    <j-activity-item
      v-for="(item,index) in list"
      :key="index"
      :activity="item"
    ></j-activity-item>
    <j-drawer
      ref="filterDrawer"
      :show.sync="isShowFilterDrawer"
      @filterReset="filterReset"
      @filterConfirm="filterConfirm"
    >
      <view
        v-for="(item,index) in filterInputs"
        :key="index+'^-^'"
        class="marketList-drawer-filter">
        <view class="marketList-drawer-filter-head">
          <view>
            <text>{{item.name}}</text>
          </view>
        </view>
        <view
          class="marketList-drawer-filter-list"
        >
          <input
            class="marketList-drawer-filter-input"
            type="text"
            v-model="item.value"
            :placeholder="`请输入${item.name}`"
          >
        </view>
      </view>
      <view
        v-for="(item,index) in filterList"
        :key="index"
      >
        <view class="marketList-drawer-filter">
          <view class="marketList-drawer-filter-head">
            <view>
              <text>{{item.name}}</text>
              <text class="marketList-drawer-filter-head-tips">{{item.tips}}</text>
            </view>
            <i
              class="iconfont iconxia"
              :class="[
                      !item.isExpand && 'reverse'
                    ]"
              @click="toggleExpand(item)"
            ></i>
          </view>
          <view
            class="marketList-drawer-filter-list"
            v-show="item.isExpand"
          >
            <view
              v-for="(filterItem,filterIndex) in item.data"
              :key="filterIndex"
              class="marketList-drawer-filter-list-item"
              :class="[filterItem.isChecked && 'active']"
              @click="choose(filterItem,item.data,item.type)"
            >{{filterItem.value}}
            </view>
          </view>
        </view>
      </view>
      <view class="marketList-drawer-filter-head-ads-wrap">
        <view
          class="marketList-drawer-filter-head"
          @tap="showDeliveryAddress"
        >
          <view>
            <text>配送至</text>
          </view>
          <i class="iconfont iconyou marketList-drawer-filter-head-icon-right"></i>
        </view>
        <view class="marketList-drawer-filter-head-ads">
          (8800212607)李沧区重庆中路420号沃李沧区重庆中路420号沃
        </view>
      </view>
    </j-drawer>
    <j-choose-delivery-address
      :show.sync="isShowAddressDrawer"
    ></j-choose-delivery-address>
  </view>
</template>

<script>

import JDrawer from '../../components/form/JDrawer';
import JActivityItem from '../../components/market/JActivityItem';
import JMarketHeadTab from '../../components/market/JMarketHeadTab';
import JChooseDeliveryAddress from '../../components/market/JChooseDeliveryAddress';
import './css/marketList.scss';


export default {
  name: 'marketList',
  components: {
    JChooseDeliveryAddress,
    JMarketHeadTab,
    JActivityItem,
    JDrawer
  },
  data() {
    return {
      // type 0 :套餐  1：组合 2：失效组合
      list: [
        {
          marketName: '10月营销活动-买大送小',
          type: 1,
          price: '1234',
          endTime: '2019-07-20',
          scale: '5:1',
          productCount: '1998',
          productList: [
            {
              name: '海尔滚筒洗衣高端ES60H海尔滚筒洗衣高端ES60H',
              src: require('@/assets/img/market/product1.png')
            }
          ]
        },
        {
          marketName: '10月营销活动-买大送小',
          type: 0,
          endTime: '2019-07-20',
          scale: '5:1',
          productCount: '1998',
          productList: [
            {
              name: '海尔滚筒洗衣高端ES60H海尔滚筒洗衣高端ES60H',
              src: require('@/assets/img/market/product1.png')
            }
          ]
        },
        {
          marketName: '10月营销活动-买大送小',
          type: 2,
          endTime: '2019-07-20',
          scale: '5:1',
          productCount: '1998',
          productList: [
            {
              name: '海尔滚筒洗衣高端ES60H海尔滚筒洗衣高端ES60H',
              src: require('@/assets/img/market/product1.png')
            }
          ]
        },
        {
          marketName: '10月营销活动-买大送小',
          type: 1,
          price: '1234',
          endTime: '2019-07-20',
          scale: '5:1',
          productCount: '1998',
          productList: [
            {
              name: '海尔滚筒洗衣高端ES60H海尔滚筒洗衣高端ES60H',
              src: require('@/assets/img/market/product1.png')
            }
          ]
        }
      ],
      // 是否展示筛选侧边抽屉
      isShowFilterDrawer: false,
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      isShowType: false,
      tabs: [
        {
          name: '活动类别',
          icon: 'iconxia',
          show: false,
          handler: 'showType',
          children: [
            { name: '全部', checked: false },
            { name: '套餐', checked: false },
            { name: '组合', checked: false }
          ]
        },
        {
          name: '筛选',
          icon: 'iconshaixuan',
          handler: 'showFilter'
        }
      ],
      filterInputs: [
        {
          name: '产品名称',
          val: ''
        },
        {
          name: '产品编码',
          val: ''
        },
        {
          name: '活动名称',
          val: ''
        }
      ],
      filterList: [
        {
          name: '产品组',
          isExpand: true,
          type: 'checkbox',
          data: [
            {
              key: '1',
              value: '冰箱',
              isChecked: false
            },
            {
              key: '2',
              value: '洗衣机',
              isChecked: false
            }, {
              key: '3',
              value: '热水器',
              isChecked: false
            }, {
              key: '4',
              value: '电视机',
              isChecked: false
            }, {
              key: 'sp',
              value: '电脑',
              isChecked: false
            }, {
              key: 'CHD',
              value: '厨房用品',
              isChecked: false
            }
          ]
        },
        {
          name: '产品状态',
          isExpand: true,
          type: 'radio',
          data: [
            {
              key: '1',
              value: '全部',
              isChecked: false
            }, {
              key: '2',
              value: '有效',
              isChecked: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    tabClick(handler) {
      if (handler) {
        this[handler]();
      }
    },
    showFilter() {
      /* 展示filter */
      this.isShowFilterDrawer = true;
    },
    showType() {
      /* 展示类别 */
      this.isShowType = !this.isShowType;
    },
    filterReset() {
      console.log('重置');
    },
    filterConfirm() {
      console.log('确认');
    },
    toggleExpand(item) {
      /* 展开或者收起 */
      item.isExpand = !item.isExpand;
    },
    choose(filterItem, list, type) {
      /* 选择选项 */
      if (type === 'radio') {
        if (!filterItem.isChecked) {
          list.forEach((v) => {
            if (v.isChecked) {
              v.isChecked = false;
            }
          });
          filterItem.isChecked = true;
        }
      } else {
        // 多选翻转
        filterItem.isChecked = !filterItem.isChecked;
      }
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    }
  }
};
</script>

<style>

</style>
