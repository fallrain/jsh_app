<template>
  <view class="goodsList">
    <j-head-tab
      class="mb12"
      :tabs="tabs"
      @tabClick="tabClick"
    ></j-head-tab>
    <view class="goodsList-items-wrap">
      <j-goods-item
        v-for="(item,index) in list"
        :key="index"
        :goods="item"
      ></j-goods-item>
    </view>
    <uni-drawer
      ref="goodsFilterDrawer"
      mode="right"
    >
      <view class="goodsList-drawer">
        <view class="goodsList-drawer-cnt-list">
          <view
            v-for="(item,index) in filterList"
            :key="index"
          >
            <view class="goodsList-drawer-filter">
              <view class="goodsList-drawer-filter-head">
                <view>
                  <text>{{item.name}}</text>
                  <text class="goodsList-drawer-filter-head-tips">{{item.tips}}</text>
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
                class="goodsList-drawer-filter-list"
                v-show="item.isExpand"
              >
                <view
                  v-for="(filterItem,filterIndex) in item.data"
                  :key="filterIndex"
                  class="goodsList-drawer-filter-list-item"
                  :class="[filterItem.isChecked && 'active']"
                  @click="choose(filterItem,item.data,item.type)"
                >{{filterItem.value}}
                </view>
              </view>
            </view>
          </view>
          <view class="goodsList-drawer-filter-head-ads-wrap">
            <view
              class="goodsList-drawer-filter-head"
              @tap="showDeliveryAddress"
            >
              <view>
                <text>配送至</text>
              </view>
              <i class="iconfont iconyou goodsList-drawer-filter-head-icon-right"></i>
            </view>
            <view class="goodsList-drawer-filter-head-ads">
              (8800212607)李沧区重庆中路420号沃李沧区重庆中路420号沃
            </view>
          </view>
          <view class="goodsList-drawer-filter-head-ads-wrap">
            <view class="goodsList-drawer-filter-head">
              <view>
                <text>价格区间</text>
              </view>
            </view>
            <view class="goodsList-drawer-filter-price-range">
              <input
                class="goodsList-drawer-filter-price-ipt"
                type="text"
                placeholder="最低价格"
              >
              <view class="goodsList-drawer-filter-price-line"></view>
              <input
                class="goodsList-drawer-filter-price-ipt"
                type="text"
                placeholder="最高价格"
              >
            </view>
          </view>
        </view>
        <view class="goodsList-drawer-btn-wrap">
          <button
            type="button"
            class="goodsList-drawer-btn-confirm"
          >确定
          </button>
          <button
            type="button"
            class="goodsList-drawer-btn-reset"
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
import JGoodsItem from '../../components/goods/JGoodsItem';
import JHeadTab from '../../components/form/JHeadTab';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import './css/goodsList.scss';

export default {
  name: 'goodsList',
  components: {
    JChooseDeliveryAddress,
    JHeadTab,
    JGoodsItem,
    uniDrawer
  },
  data() {
    return {
      list: [],
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      tabs: [
        {
          name: '综合'
        },
        {
          name: '最新上架'
        },
        {
          name: '价格',
          icon: 'iconpaixu-'
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
  created() {
    this.getPageInf();
  },
  methods: {
    getPageInf() {
      this.getGoodsList();
    },
    async getGoodsList() {
      const { code, data } = await this.commodityService.goodsList({
        pageNum: 1,
        pageSize: 15,
        customerCode: 8800273632,
        sendTo: 8800273632,
        name: '排名第一'
      });
      if (code === '1') {
        const {
          page
        } = data;
        this.list = page.result;
      }
    },
    tabClick(handler) {
      if (handler) {
        this[handler]();
      }
    },
    showFilter() {
      /* 展示filter */
      this.$refs.goodsFilterDrawer.open();
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
