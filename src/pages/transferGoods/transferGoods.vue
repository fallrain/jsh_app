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
      ></transfer-goods-head>

      <mescroll-body
        ref="mescrollRef"
      >
        <!-- 产品列表 -->
        <view class="transferList-items-wrap" v-if="list">
          <transfer-goods-item
            v-for="(item,index) in list"
            :key="index"
            :goods="item"
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
import TDrawer from '../../components/transfer/TDrawer';
import TDrawerFilterItem from '../../components/transfer/TDrawerFilterItem';
import './css/transferGoods.scss';
export default {
    name:'transferGoods',
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
      transferList:[],
      transferPriceList:[],
      condList: [],
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
      // 筛选抽屉
      isShowGoodsFilterDrawer: false,
      filterList: [
        {
          name: '',
          isExpand: true,
          type: 'radio',
          data: [
            {
              key: '1',
              value: '海尔',
              isChecked: false
            },
            {
              key: '2',
              value: '卡萨帝',
              isChecked: false
            }, {
              key: '3',
              value: '施特劳斯',
              isChecked: false
            }, {
              key: '4',
              value: '统帅',
              isChecked: true
            }
          ]
        },
        {
          name: '',
          isExpand: true,
          type: 'radio',
          data: [
            {
              key: '1',
              value: '洗衣机',
              isChecked: false
            }, {
              key: '2',
              value: '热水器',
              isChecked: false
            },{
              key: '3',
              value: '冰箱',
              isChecked: false
            }, {
              key: '4',
              value: '冷柜',
              isChecked: true
            },
            {
              key: '5',
              value: '电视',
              isChecked: false
            },
            {
              key: '6',
              value: '空调',
              isChecked: false
            }
          ]
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
      
     }
    },
    created() {
    this.getPageInf();
   
  },
  methods: {
    getPageInf() {
      this.setFilterData();
      this.gettransferList();
      this.gettransferPriceList();
      
    },
      silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
    },
    // async upCallback(pages) {
    //   /* 上推加载 */
    //   // const scrollView = await this.getGoodsList(pages);
    //   this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    // },
    async gettransferList() {
      const { code, data } = await this.transfergoodsService.transferList({
       timestamp: 1595922509073,
        categoryCode:'',
        name:'',
        attributeName:'', 
        attributeValue:'', 
        pageNum: 1,
        pageSize: 15,
        customerCode: 8700010462,
        dstCode: 8700010462,
        center: 12E02,
        group:'', 
        brandName:'', 
        sortDirection:'', 
        sortType:'', 
        tags:'', 
        brandGroup:'AA,AB,DA,DB,EA,CA,FA,FB,GB,GC,GD,GF:000;AA,AB,DA,DB,EA,CA,FA,FB,GB,GC,GD,GF:051;',
        productCode:'', 
        highPrice:'',
        lowPrice:'',
        stock:'',
      });
      const page = JSON.parse(data.data)
      
      if (code === '1') {
        console.log(page)
        const {
          data,
          condition
        } = page;
        this.list = data;
        this.condList = condition
     
       
        // console.log(this.list)
      }
    },
    async gettransferPriceList() {
      const { code, data } = await this.transferpriceService.transferPriceList({
          saletoCode: "8700010462",
          sendtoCode: "8700010462",
          productCodes: [
            "GA0SZB000", 
            "GA0SZ0009", 
            "GA0SRE005", 
            "GA0SZQ005", 
            "GA0SZ1004", 
            "BA0AM00AA", 
            "CBAL70000",
            "BB0V210A1",
            "AAABT600K",
            "AAABTT071",
            "AAAKX006T",
            "CA0KQ1000",
            "CE0JP400N",
            "BB0B6809E",
            "BH03Y50AE",
          ]
      });
    //   const page = JSON.parse(data.data)
      if (code === '1') {
        // const {
        //   data
        // } = page;
        // this.list = data;
        // console.log(data)
      }
    },
  

    tabClick(handler) {
      if (handler) {
        this[handler]();
      }
    },
    setFilterData() {
      /* 设置右侧抽屉筛选的数据 */
      // 商品删选类型
      
      // // 商品标签
      // const goodsTagData = getGoodsTag();
      // this.filterList[1].data = Object.keys(goodsTagData).map(key => ({
      //   key,
      //   value: goodsTagData[key],
      //   isChecked: false
      // }));
    },
    showFilter() {
      /* 展示filter */
       this.isShowGoodsFilterDrawer = true;
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