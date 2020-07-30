<template>
    <view class="transferGoods">
        <view class="transfer-search">
            <!-- <uni-search-bar :radius="100" @confirm="search"  cancelButton="none" bgColor="#fff" class="transfer-input"></uni-search-bar> -->
            <input type="text" class="transfer-input" placeholder="冰箱" placeholder-style="text-align:center">
            <button class="transfer-btn">搜索</button>
        </view>
        <transfer-goods-head
         class="mb12"
         :tabs="tabs"
         @tabClick="tabClick" 
        ></transfer-goods-head>
        <view class="goodsList-items-wrap">
            <transfer-goods-item
                v-for="(item,index) in list"
                :key="index"
                :goods="item"
            ></transfer-goods-item>
        </view>

    </view>

    
</template>
<script>
// import {
//   uniSearchBar
// } from '@dcloudio/uni-ui';
import transferGoodsHead from './transferGoodsHead';
import transferGoodsItem from './transferGoodsItem';
// import {jGet} from '../../lib/request';
export default {
    name:'transferGoods',
    components:{
        transferGoodsHead,
        transferGoodsItem
        // uniSearchBar

    },
    data() {
     return {
      list: [],
      transferList:[],
      transferPriceList:[],

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
      
     }
    },
    created() {
    this.getPageInf();
   
  },
  methods: {
    getPageInf() {
      this.gettransferList();
      this.gettransferPriceList();
    },
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
        const {
          data
        } = page;
        this.list = data;
        console.log(this.list)
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
        console.log(data)
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
}
</script>
<style lang="scss" scoped>
// ::v-deep .uni-searchbar{
//     height: 80px;
//   }
.transfer-input{
    width:520px;
    height:56px;
    background:rgba(255,255,255,1);
    border-radius:28px;
    border:1px solid rgba(189,189,189,1);
    z-index: 100;
    margin:24px 22px 24px 24px;
 }
.transfer-search{
    background:rgba(255,255,255,1);
    display:flex;
 
 .transfer-btn{
    width:160px;
    height:56px;
    background:rgba(237,40,86,1);
    border-radius:28px;
    font-size:28px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:56px;
    z-index: 100;
    margin:24px 24px 24px 0px;
 }
}
.goodsList {
  min-height: 100vh;
  background: #F5F5F5;

  .uni-drawer__content {
    width: 608px !important;
  }
}

.goodsList-drawer {
  position: relative;
  height: 100%;
}

.goodsList-drawer-cnt-list {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding-left: 32px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.goodsList-drawer-filter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  color: #666;
  height: 42px;
  margin-bottom: 24px;
  margin-top: 32px;
  padding-right: 30px;

  .iconxia {
    font-size: 20px;
  }

  .reverse {
    display: inline-block;
    transform: rotateX(180deg);
  }
}

.goodsList-drawer-filter-head-icon-right {
  color: #999;
  font-size: 28px;
}

.goodsList-drawer-filter-head-tips {
  font-size: 24px;
  color: #999;
}

.goodsList-drawer-filter-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
}

.goodsList-drawer-filter-list-item {
  width: 160px;
  height: 52px;
  margin-bottom: 32px;
  margin-right: 32px;
  background: #F7F7F8;
  border-radius: 26px;
  color: #666;
  text-align: center;
  line-height: 60px;
  font-size: 24px;


  &.active {
    color: #ED2856;
    background: #FFF5F7;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }
}

.goodsList-drawer-filter-head-ads-wrap {
  padding-right: 30px;

  .goodsList-drawer-filter-head {
    padding-right: 0;
  }
}

.goodsList-drawer-filter-head-ads {
  width: 100%;
  height: 52px;
  line-height: 52px;
  background: #F7F7F8;
  border-radius: 24px;
  color: #666;
  font-size: 24px;
  padding-left: 32px;
  padding-right: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goodsList-drawer-filter-price-range {
  display: flex;
  align-items: center;
}


.goodsList-drawer-filter-price-ipt {
  width: 160px;
  height: 52px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #DBDBDB;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 24px;
}

.goodsList-drawer-filter-price-line {
  width: 52px;
  height: 1px;
  background: #DBDBDB;
  margin-left: 34px;
  margin-right: 34px;
}


</style>