<template>
    <view class="transferGoods">
      <view class="transfer-search">
          <j-search-input
            v-model="filterForm.name"
            @search="silentReSearch"
          ></j-search-input>
          <button
            type="button"
            class="transfer-btn"
            @tap="silentReSearch"
          >搜索
          </button>
      </view>
      <transfer-goods-head
          class="mb12"
          :tabs="tabs"
          @tabClick="tabClick"
          :cargoWareHome="cargoWareHome"
          :cargoSendWay="cargoSendWay" 
          ref="transferGoodsHead"
      ></transfer-goods-head>

      <mescroll-body
        ref="mescrollRef"
        @init="mescrollInit"
        :up="jMescrollUpOptions"
        :down="jMescrollDownOptions"
        @down="jMescrollDownCallback"
        @up="upCallback"
      >
        <!-- 产品列表 -->
        <view class="transferList-items-wrap" v-if="list">
          <transfer-goods-item
            v-for="(item,index) in list"
            :key="index"
            :code="item.code"
            :goods="item"
            :saletoCode="userInf.saletoCode"
            :sendtoCode="userInf.sendtoCode"
            :allPrice="item.$allPrice"
            @change="goodsChange"
          ></transfer-goods-item>
        </view>
        <view v-else>暂无数据</view>
      </mescroll-body>
      <!-- 抽屜 -->
    <t-drawer
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"

    >
      <template>
        <t-drawer-filter-item
          v-for="(item,index) in filterList"
          :key="index"
          :filterItem="item"
          :index="index"
          @change="filterListChange"
        ></t-drawer-filter-item>
        <view class="transferList-drawer-filter-head-ads-wrap">
          <view
            class="transferList-drawer-filter-head"
            @tap="showDeliveryAddress"
          >
            <view>
              <text>配送至</text>
            </view>
            <i class="iconfont iconyou transferList-drawer-filter-head-icon-right"></i>
          </view>
          <view class="transferList-drawer-filter-head-ads">{{curChoseDeliveryAddress.name}} </view>
        </view>
        <view class="transferList-drawer-filter-head-ads-wrap">
          <view class="transferList-drawer-filter-head">
            <view>
              <text>价格区间</text>
            </view>
          </view>
          <view class="transferList-drawer-filter-price-range">
            <input
              class="transferList-drawer-filter-price-ipt"
              type="number"
              placeholder="最低价格"
              v-model="filterForm.lowPrice"
            >
            <view class="transferList-drawer-filter-price-line"></view>
            <input
              class="transferList-drawer-filter-price-ipt"
              type="number"
              placeholder="最高价格"
              v-model="filterForm.highPrice"
            >
          </view>
        </view>
      </template>
    </t-drawer>
  </view>
</template>
<script>

import transferGoodsHead from './transferGoodsHead';
import transferGoodsItem from './transferGoodsItem';
import JSearchInput from '../../components/form/JSearchInput';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import TDrawer from '../../components/transfer/TDrawer';
import TDrawerFilterItem from '../../components/transfer/TDrawerFilterItem';
import './css/transferGoods.scss';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
export default {
    name:'transferGoods',
    mixins: [
      mescrollMixin,
      selfMescrollMixin
    ],
    components:{
      transferGoodsHead,
      transferGoodsItem,
      JSearchInput,
      MescrollBody,
      TDrawer,
      TDrawerFilterItem

    },
    data() {
     return {
      list: null,
      sortType: '',
      sortDirection: '',
      conditionList:[],
      transferList:[],
      // 调出库位
      cargoWareHome: [],
      // 配送类型
      cargoSendWay: [],
      priceList: [],
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
      filterList: [],
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
     }
  },
  created() {
    this.getPageInfo();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  methods: {
    getPageInfo() {
      // this.setFilterData();
      this.getDeliveryAddress();
      this.getTransferList();
      this.getCargoQuery()
    },
    silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
    },
    async upCallback(pages) {
      /* 上推加载 */
      const scrollView = await this.getTransferList(pages);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
    getSearchCondition(pages) {
      // console.log(pages.num)
      /* 获取不同条件下搜索的传参 */
      let condition = {
        pageNum: pages ? pages.num : 1,
        pageSize: pages ? pages.size : 15,
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
    async getTransferList(pages) {
      console.log(pages)
      const userInf = this.userInf;
      const condition = this.getSearchCondition(pages);
      console.log(condition)
      const scrollView = {};
      const { code, data } = await this.transfergoodsService.transferList({
        ...condition,
        timestamp: 1595922509073,
        categoryCode: '',
        attributeName: '',
        attributeValue: '',
        customerCode: 8700010462,
        dstCode: 8700010462,
        center: 12E02,
        group: '',
        brandName: '',
        sortDirection: this.sortDirection,
        sortType: this.sortType,
        tags: '',
        brandGroup:'AA,AB,DA,DB,EA,CA,FA,FB,GB,GC,GD,GF:000;AA,AB,DA,DB,EA,CA,FA,FB,GB,GC,GD,GF:051;',
        productCode: '',
        highPrice: '',
        lowPrice: '',
        stock: '',
      });
      const page = JSON.parse(data.data)
      if (code === '1') {
       
        const curList = page.data;
        scrollView.pageSize = page.pageSize;
        scrollView.total = page.total;
        this.conditionList = page.condition;
        const productCodes = curList.map(v => v.code);
        const priceArgsObj = {
          productCodes,
          saletoCode: userInf.saletoCode,
          sendtoCode: userInf.sendtoCode,
        };
        // 获取价格
        const getAllPrice = this.commodityService.getAllPrice(priceArgsObj);
         // 获取库存
        // const getStock = this.commodityService.getStock(priceArgsObj);
        // 获取收藏
        const getProductQueryInter = this.productDetailService.productQueryInter({
          productCodes,
          account: userInf.customerCode
        });
        const [
          allPriceRes,
          stockRes,
          productQueryInterRes
        ] = await Promise.all([getAllPrice, getProductQueryInter]);
        if (allPriceRes.code === '1') {
          // 添加价格
          console.log(allPriceRes)
          const allPriceData = allPriceRes.data;
          // 注：$为了防止后端属性命名重复，pt为拼音，是为了和后端字段命名保持一致
          curList.forEach((v) => {
            v.$PtPrice = allPriceData[v.code].pt;
            v.$allPrice = allPriceData[v.code];
          });
        }
        // if (stockRes.code === '1') {
        //   // 添加库存
        //   const stockData = stockRes.data;
        //   curList.forEach((v) => {
        //     v.$stock = stockData[v.productCode];
        //   });
        // }
        // if (productQueryInterRes.code === '1') {
        //   // 添加点赞
        //   const productQueryInterData = productQueryInterRes.data;
        //   curList.forEach((v) => {
        //     v.$favorite = !!productQueryInterData.find(productCode => v.productCode === productCode);
        //   });
        // }
        if (pages && pages.num === 1) {
          this.list = curList;
        } else {
          if (!this.list) {
            this.list = []
          }
          this.list = this.list.concat(curList);        
        }
        
        this.filterList = this.conditionList.map(item => ({
          name: item.title,
          isExpand: true,
          type: 'radio',
          data: item.data.map(it => ({
             key: it.Code,
             value: it.Name,
             isChecked: false
          }))
        }))
        console.log(this.filterList);
      }else {
        this.mescroll.endErr();
      }
      return scrollView;
    },
    // 调出库位数据
    async getCargoQuery() {
      const { code, data } = await this.transfergoodsService.cargoWareHome({
        timestamp: 1596530440135,
        sendToCode: 8700010462,
        sendToMktid: 12E02
      })
      if(code === "1") {   
        this. cargoWareHome = data.data
      }
    // 配送类型数据
  
      const temp = await this.transfergoodsService.cargoSendWay({
        timestamp: 1596533915450,
        longfeiUSERID: 8700010462,
        sendtoCode: 8700010462,
        sendtoMktid: 12E02,
      })
      if(temp.code === "1") {   
        this.cargoSendWay = temp.data.data
      }
      this.$refs.transferGoodsHead.setPopTabs(this.cargoWareHome, this.cargoSendWay)
    },
    goodsChange(goods, index) {
      /* 商品数据change */
      this.list[index] = goods;
    },

    tabClick(tabs, tab, index) {
      /* 顶部双层tab栏目，第一层点击事件 */
      console.log(tabs)
      console.log(tab)
      console.log(tab)
      this.tabs = tabs;
      if (tab.condition) {
        this.sortType = tab.condition.sortType;
        this.sortDirection = tab.condition.sortDirection;
      } else {
        this.sortType = '';
        this.sortDirection = '';
      }
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
      this.getTransferList();
    },
    showFilter() {
      /* 展示filter */
       this.isShowGoodsFilterDrawer = true;
    },
    // setFilterData() {
     
    // },
  
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
          console.log(this.deliveryAddressList)
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
}
</script>
<style  scoped>
/deep/ .jSearchInput-wrap{
  margin:24px 22px 24px 24px;
  z-index:100;
 }
/deep/ .jSearchInput{
   margin:24px 22px 24px 24px;
   z-index:100;
 }

</style>