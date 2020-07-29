<template>
  <view class="goodsList">
    <view class="goodsList-head-wrap">
      <view class="goodsList-search-tab j-flex-aic">
        <j-search-input></j-search-input>
        <button
          type="button"
          class="goodsList-search-tab-btn ml22"
        >搜索
        </button>
      </view>
      <j-head-tab
        class="mb12"
        :tabs="tabs"
        @tabClick="tabClick"
      ></j-head-tab>
    </view>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      :up="jMescrollUpOptions"
      :down="jMescrollDownOptions"
      @down="jMescrollDownCallback"
      @up="upCallback"
    >
      <view class="goodsList-items-wrap">
        <j-goods-item
          v-for="(item,index) in list"
          :key="index"
          :goods="item"
        ></j-goods-item>
      </view>
    </mescroll-body>

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
import JSearchInput from '../../components/form/JSearchInput';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import './css/goodsList.scss';


export default {
  name: 'goodsList',
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    JSearchInput,
    JChooseDeliveryAddress,
    JHeadTab,
    JGoodsItem,
    uniDrawer,
    MescrollBody
  },
  data() {
    return {
      list: [],
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
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
    },
    async upCallback(pages) {
      /* 上推加载 */
      const scrollView = await this.getGoodsList(pages);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
    getSearchCondition(pages) {
      /* 获取不同条件下搜索的传参 */
      let condition = {
        pageNum: pages.num,
        pageSize: pages.size,
        customerCode: 8800273632,
        sendTo: 8800273632,
      };
      const tab = this.tabs.find(v => v.active);
      // 如果存在条件，则塞入条件
      condition = {
        ...condition,
        ...tab.condition
      };
      return condition;
    },
    async getGoodsList(pages) {
      /* 搜索产品列表 */
      const condition = this.getSearchCondition(pages);
      const { code, data } = await this.commodityService.goodsList(condition);
      const scrollView = {};
      if (code === '1') {
        const {
          page
        } = data;
        if (pages.num === 1) {
          this.list = page.result;
        } else {
          this.list = this.list.concat(page.result);
        }
        scrollView.pageSize = page.pageSize;
        scrollView.total = page.total;
      } else {
        this.mescroll.endErr();
      }
      return scrollView;
    },
    tabClick(tabs, tab, index) {
      /* 顶部双层tab栏目，第一层点击事件 */
      this.tabs = tabs;
      // tab为价格的时候，降序升序操作
      if (tab.id === 'price') {
        const sortDirection = tab.condition.sortDirection;
        tab.condition.sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        tab.iconClass = tab.condition.sortDirection;
        this.tabs[index] = tab;
      }
      if (!tab.noSearch) {
        this.mescroll.resetUpScroll(true);
      }
      if (tab.handler) {
        this[tab.handler]();
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
