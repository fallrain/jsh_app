<template>
  <view class="sampleMachineList">
    <view class="sampleMachineList-head-wrap">
      <view class="sampleMachineList-search-tab j-flex-aic">
        <j-search-input
          v-model="filterForm.name"
          @search="silentReSearch"
        ></j-search-input>
        <button
          type="button"
          class="sampleMachineList-search-tab-btn ml22"
          @tap="silentReSearch"
        >搜索
        </button>
      </view>
      <j-market-head-tab
        class="mb12"
        :tabs="tabs"
        :typeShow="isShowType"
        @tabClick="tabClick"
        @tabPickerConfirm="tabPickerConfirm"
      ></j-market-head-tab>
    </view>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      :up="jMescrollUpOptions"
      :down="jMescrollDownOptions"
      @down="jMescrollDownCallback"
      @up="upCallback"
    >
      <view class="sampleMachineList-items-wrap">
        <j-sample-machine-item
          v-for="(item,index) in list"
          :key="index"
          :goods="item"
          :index="index"
          :saletoCode="userInf.saletoCode"
          :sendtoCode="userInf.sendtoCode"
          :allPrice="item.$allPrice"
          @change="goodsChange"
        ></j-sample-machine-item>
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
        <view class="sampleMachineList-drawer-filter-head-ads-wrap">
          <view
            class="sampleMachineList-drawer-filter-head"
            @tap="showDeliveryAddress"
          >
            <view>
              <text>配送至</text>
            </view>
            <i class="iconfont iconyou sampleMachineList-drawer-filter-head-icon-right"></i>
          </view>
          <view class="sampleMachineList-drawer-filter-head-ads">
            ({{curChoseDeliveryAddress.addressCode}}){{curChoseDeliveryAddress.addressName}} </view>
        </view>
      </template>
    </j-drawer>
    <j-choose-delivery-address
      :show.sync="isShowAddressDrawer"
      :list="deliveryAddressList"
      @change="deliveryAddressListChange"
    ></j-choose-delivery-address>
  </view>
</template>

<script>
import JSampleMachineItem from '../../components/sampleMachine/JSampleMachineItem';
import JMarketHeadTab from '../../components/market/JMarketHeadTab';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import JSearchInput from '../../components/form/JSearchInput';
import JDrawer from '../../components/form/JDrawer';
import JDrawerFilterItem from '../../components/form/JDrawerFilterItem';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import './css/sampleMachineList.scss';
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
  name: 'sampleMachineList',
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    JDrawerFilterItem,
    JDrawer,
    JSearchInput,
    JChooseDeliveryAddress,
    JMarketHeadTab,
    JSampleMachineItem,
    MescrollBody
  },
  data() {
    return {
      isShowType: false,
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
          name: '品牌',
          isExpand: true,
          type: 'radio',
          data: []
        },
        {
          name: '产品组',
          isExpand: true,
          type: 'radio',
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
      },
      // 配送地址数据
      deliveryAddressList: [],
      // 当前选中的配送地址
      curChoseDeliveryAddress: {}
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  methods: {
    async init() {
      await this.getAddressList();
      await this.getIndustryList();
    },
    async getAddressList() {
      // 获取地址
      const { code, data } = await this.customerService.addressesList('1');
      if (code === '1') {
        this.deliveryAddressList = data;
      }
      debugger
      data.forEach((item) => {
        if (item.defaultFlag === 1) {
          this.curChoseDeliveryAddress = item;
        }
      });
      if (JSON.stringify(this.curChoseDeliveryAddress) === '{}') {
        this.curChoseDeliveryAddress = data[0];
      }
      console.log(this.curChoseDeliveryAddress);
      // this.filterForm.saletoCode = this.curChoseDeliveryAddress.customerCode;
      // this.filterForm.sendtoCode = this.curChoseDeliveryAddress.addressCode;
    },
    async getIndustryList() {
      // 获取产品组
      const { code, data } = await this.marketService.getIndustryList();
      if (code === '1') {
        data.forEach((item) => {
          item.isChecked = false;
          item.key = item.code;
          item.value = item.codeName;
          item.isChecked = false;
        });
        this.filterList[1].data = data;
      }
    },
    getPageInf() {
      this.setFilterData();
      this.getDeliveryAddress();
    },
    silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
    },
    async upCallback(pages) {
      /* 上推加载 */
      const scrollView = await this.getsampleMachineList(pages);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
    getSearchCondition(pages) {
      /* 获取不同条件下搜索的传参 */
      let condition = {
        mktid: '12A02',
        pageNum: pages.num,
        pageSize: pages.size,
        customerCode: this.userInf.customerCode,
        sendTo: this.userInf.sendtoCode,
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
    async getsampleMachineList(pages) {
      /* 搜索产品列表 */
      // 公共用户信息
      const userInf = this.userInf;
      const condition = this.getSearchCondition(pages);
      const { code, data } = await this.commodityService.goodsList(condition);
      // const { code, data } = await this.specimenService.queryInventory(condition);
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
            v.$allPrice = allPriceData[v.productCode];
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
    goodsChange(goods, index) {
      /* 商品数据change */
      this.list[index] = goods;
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
