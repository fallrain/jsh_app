<template>
  <view class="goodsList">
    <view class="goodsList-head-wrap">
      <view class="goodsList-search-tab j-flex-aic">
        <j-search-input
          v-model="filterForm.name"
          @search="silentReSearch"
        ></j-search-input>
        <button
          type="button"
          class="goodsList-search-tab-btn ml22"
          @tap="silentReSearch"
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

    <j-drawer
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"
    >
      <template>
        <j-drawer-filter-item
          v-for="(item,index) in filterList"
          :key="index"
          :filterItem="item"
          :index="index"
          @change="filterListChange"
        ></j-drawer-filter-item>
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
              type="number"
              placeholder="最低价格"
              v-model="filterForm.lowPrice"
            >
            <view class="goodsList-drawer-filter-price-line"></view>
            <input
              class="goodsList-drawer-filter-price-ipt"
              type="number"
              placeholder="最高价格"
              v-model="filterForm.highPrice"
            >
          </view>
        </view>
      </template>
    </j-drawer>
    <j-choose-delivery-address
      :show.sync="isShowAddressDrawer"
    ></j-choose-delivery-address>
  </view>
</template>

<script>
import JGoodsItem from '../../components/goods/JGoodsItem';
import JHeadTab from '../../components/form/JHeadTab';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import JSearchInput from '../../components/form/JSearchInput';
import JDrawer from '../../components/form/JDrawer';
import JDrawerFilterItem from '../../components/form/JDrawerFilterItem';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import './css/goodsList.scss';
import {
  getGoodsTag,
  getGoodsType
} from '@/lib/dataDictionary';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'goodsList',
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    JDrawerFilterItem,
    JDrawer,
    JSearchInput,
    JChooseDeliveryAddress,
    JHeadTab,
    JGoodsItem,
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
      // 筛选抽屉
      isShowGoodsFilterDrawer: false,
      // 筛选抽屉数据
      filterList: [
        {
          name: '筛选',
          isExpand: true,
          type: 'radio',
          data: []
        },
        {
          name: '标签',
          isExpand: true,
          type: 'radio',
          data: []
        },
        {
          name: '有货商品',
          isExpand: true,
          type: 'checkbox',
          data: []
        }
      ],
      // 筛选栏表单
      filterForm: {
        // 搜索栏
        name: '',
        // 最低价
        lowPrice: '',
        // 最高价
        highPrice: ''
      }
    };
  },
  created() {
    this.getPageInf();
  },
  computed: {
    ...mapGetters([
      USER.GET_USER
    ]),
  },
  methods: {
    getPageInf() {
      this.setFilterData();
    },
    silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
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
        customerCode: this[USER.GET_USER].customerCode,
        sendTo: this[USER.GET_USER].sendtoCode,
      };
      // tab条件
      const tab = this.tabs.find(v => v.active);
      // 其他条件
      const filtersMap = {
        name: this.filterForm.name
      };
      // 右侧筛选栏搜索数据
      this.filterList.forEach((item) => {
        item.data.forEach((v) => {
          if (v.isChecked) {
            filtersMap[v.key] = 1;
          }
        });
      });
      // 最高价格，最低价格
      const {
        lowPrice,
        highPrice
      } = this.filterForm;
      if (lowPrice) {
        filtersMap.lowPrice = lowPrice * 1;
      }
      if (highPrice) {
        filtersMap.highPrice = highPrice * 1;
      }
      // 反转大小
      if (lowPrice !== '' && highPrice !== '' && filtersMap.highPrice < filtersMap.lowPrice) {
        [filtersMap.lowPrice, filtersMap.highPrice] = [filtersMap.highPrice, filtersMap.lowPrice];
        this.filterForm.lowPrice = filtersMap.lowPrice;
        this.filterForm.highPrice = filtersMap.highPrice;
      }
      // 如果存在条件，则塞入条件
      condition = {
        ...condition,
        ...tab.condition,
        ...filtersMap
      };
      return condition;
    },
    async getGoodsList(pages) {
      /* 搜索产品列表 */
      // 公共用户信息
      const userInf = this[USER.GET_USER];
      const condition = this.getSearchCondition(pages);
      const { code, data } = await this.commodityService.goodsList(condition);
      const scrollView = {};
      if (code === '1') {
        const {
          page
        } = data;
          // 当前页码的数据
        const curList = page.result;
        scrollView.pageSize = page.pageSize;
        scrollView.total = page.total;
        // 组合下面3个接口所需的数据
        const productCodes = curList.map(v => v.productCode);
        const priceArgsObj = {
          productCodes,
          saletoCode: userInf.saletoCode,
          sendtoCode: userInf.sendtoCode,
        };
        // 获取价格
        const getAllPrice = this.commodityService.getAllPrice(priceArgsObj);
        // 获取库存
        const getStock = this.commodityService.getStock(priceArgsObj);
        // 获取收藏
        const getProductQueryInter = this.productDetailService.productQueryInter({
          productCodes,
          account: userInf.customerCode
        });
        const [
          allPriceRes,
          stockRes,
          productQueryInterRes
        ] = await Promise.all([getAllPrice, getStock, getProductQueryInter]);
        if (allPriceRes.code === '1') {
          // 添加价格
          const allPriceData = allPriceRes.data;
          // 注：$为了防止后端属性命名重复，pt为拼音，是为了和后端字段命名保持一致
          curList.forEach((v) => {
            v.$PtPrice = allPriceData[v.productCode].pt;
          });
        }
        if (stockRes.code === '1') {
          // 添加库存
          const stockData = stockRes.data;
          curList.forEach((v) => {
            v.$stock = stockData[v.productCode];
          });
        }
        if (productQueryInterRes.code === '1') {
          // 添加点赞
          const productQueryInterData = productQueryInterRes.data;
          curList.forEach((v) => {
            v.$favorite = !!productQueryInterData.find(productCode => v.productCode === productCode);
          });
        }
        if (pages.num === 1) {
          this.list = curList;
        } else {
          this.list = this.list.concat(curList);
        }
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
      this.isShowGoodsFilterDrawer = true;
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
      this.mescroll.resetUpScroll(true);
    },
    filterReset() {
      /* 抽屉筛选重置 */
      this.filterList.forEach((item) => {
        item.data.forEach((v) => {
          v.isChecked = false;
        });
      });
      // 重新搜索
      this.mescroll.resetUpScroll(true);
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    }
  }
};
</script>
