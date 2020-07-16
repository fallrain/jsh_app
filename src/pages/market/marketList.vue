<template>
  <view class="marketList">
    <j-market-head-tab
      class="mb12"
      :tabs="tabs"
      @tabClick="tabClick"
    ></j-market-head-tab>
    <j-activity-item
      v-for="(item,index) in list"
      :key="index"
      :activity="item"
    ></j-activity-item>
    <uni-drawer
      ref="marketFilterDrawer"
      mode="right"
    >
      <view class="marketList-drawer">
        <view class="marketList-drawer-cnt-list">
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
          <view class="marketList-drawer-filter-head-ads-wrap">
            <view class="marketList-drawer-filter-head">
              <view>
                <text>价格区间</text>
              </view>
            </view>
            <view class="marketList-drawer-filter-price-range">
              <input
                class="marketList-drawer-filter-price-ipt"
                type="text"
                placeholder="最低价格"
              >
              <view class="marketList-drawer-filter-price-line"></view>
              <input
                class="marketList-drawer-filter-price-ipt"
                type="text"
                placeholder="最高价格"
              >
            </view>
          </view>
        </view>
        <view class="marketList-drawer-btn-wrap">
          <button
            type="button"
            class="marketList-drawer-btn-confirm"
          >确定
          </button>
          <button
            type="button"
            class="marketList-drawer-btn-reset"
          >重置
          </button>
        </view>
      </view>
    </uni-drawer>
    <j-choose-delivery-address
      :show.sync="isShowAddressDrawer"
    ></j-choose-delivery-address>
  </view>
</template>

<script>
import {
  uniDrawer
} from '@dcloudio/uni-ui';
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
    uniDrawer
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
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      tabs: [
        {
          name: '活动类别',
          icon: 'iconxia'
        },
        {
          name: '筛选',
          icon: 'iconshaixuan',
          handler: 'showFilter'
        }
      ],
      filterList: [
        {
          name: '筛选',
          isExpand: true,
          type: 'checkbox',
          data: [
            {
              key: '1',
              value: '抢单',
              isChecked: false
            },
            {
              key: '2',
              value: '反向定制',
              isChecked: false
            }, {
              key: '3',
              value: '套餐',
              isChecked: false
            }, {
              key: '4',
              value: '组合',
              isChecked: false
            }, {
              key: 'sp',
              value: '商品',
              isChecked: false
            }, {
              key: 'CHD',
              value: '特价',
              isChecked: false
            },
            {
              key: 'gc',
              value: '工程',
              isChecked: false
            },
            {
              key: 'yj',
              value: '样机',
              isChecked: false
            },
            {
              key: 'rz',
              value: '融资',
              isChecked: false
            }
          ]
        },
        {
          name: '筛选',
          isExpand: true,
          type: 'radio',
          data: [
            {
              key: '1',
              value: '机壳',
              isChecked: false
            }, {
              key: '2',
              value: '巨划算',
              isChecked: false
            }
          ]
        },
        {
          name: '有货商品',
          isExpand: true,
          type: 'checkbox',
          data: [
            {
              key: '1',
              value: 'RRS库存',
              isChecked: false
            }, {
              key: '2',
              value: 'TC库存',
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
      this.$refs.marketFilterDrawer.open();
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
