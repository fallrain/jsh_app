<template>
    <view class="transferShoppingCart">
      <j-tab
        :tabs="tabs"
        :hasRightSlot="true"
        @tabClick="tabClick"
      >  
      </j-tab>
      <view class="cumulative-shoppingCart">共4件宝贝</view>
      <view class="shoppingCart-list">
        <t-shopping-cart-item
          v-for="(list,index) in allOrderList"
          :key="index"
          :list="list"
          :index="index"
          @change="goodsChange"
        ></t-shopping-cart-item>
      </view>
       <!--余额支付信息 -->
      <view class="mt24">
        <j-overage-pay
        ></j-overage-pay>
      </view>
      <!-- 失效宝贝 -->
      <t-failure-goods-list
        :list="invalidList"
        @change="invalidListChange"
      ></t-failure-goods-list>
      <!-- 底部 -->
      <t-shopping-cart-btm
        :checked.sync="isCheckAll"
        @checkAll="checkAll"
      ></t-shopping-cart-btm>

    </view>
</template>
<script>
import TShoppingCartItem from '../../components/transfer/TShoppingCartItem';
import TShoppingCartBtm from '../../components/transfer/TShoppingCartBtm';
import JTab from '../../components/common/JTab';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import './css/transferShoppingCart.scss';
export default {
  name: "transferShoppingCart",
  components: {
    JTab,
    TShoppingCartItem,
    JOveragePay,
    TFailureGoodsList,
    TShoppingCartBtm
  },
  data(){
    return {
      // 订单详情
      allOrderList: [],
      // 失效订单
      invalidList: [],
      tabs: [
        {
          id: 'gwc',
          name: '购物车',
          active: false
        },
        {
          id: 'zc',
          name: '整车直发',
          active: false
        },
        {
          id: 'zx',
          name: '中心调货',
          active: true
        }
      ],
      //  shoppingList: [
      //   {
      //       checked: false,
      //       data:[
      //         {
      //          show: true, 
      //         },
      //         {
      //          show: true, 
      //         }
      //       ]
          
      //   },
      //   {
      //     checked: true,
      //     data:[
      //       {
      //          show: true, 
      //       }
      //     ]
        
      //   },
      // ],
      // failureGoodsList: [
      //   {
      //     checked: false,
      //   },
      //   {
      //     checked: false,
      //   }
      
      // ],
      // 是否全选
      isCheckAll: false,
    }
  },
  created() {
    this.getShopInfo();
  },
  methods: {
    getShopInfo() {
      this.getOrderList()
    },
    async getOrderList() {
      // 调货购物车数据
      const { code, data } = await this.transfergoodsService.allOrderList({
        timestamp: 1596606815956,
        longfeiUSERID: 8700010462
      })
      if(code === "1") {   
        const temp = data.data.slice(0,2)
        const invalid = data.data.slice(2)
        const failure = []
        const allList = []
        temp.map(item => {
          const list = {
            checked: true,
            data:item
          }
          allList.push(list)
        })
        this.allOrderList = allList
        console.log(this.allOrderList)

        invalid.map(item => {
           const list = {
            checked: true,
            data:item
          }
          failure.push(list)
        })
        this.invalidList = failure
        console.log(this.invalidList)
       
      }
    },
    goodsChange(list, index) {
      this.allOrderList[index] = list;
      this.allOrderList = JSON.parse(JSON.stringify(this.allOrderList));
    },
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.allOrderList.forEach((v) => {
        v.checked = checked;
      });
    },
    invalidListChangeChange(list) {
      this.invalidListChange = list;
    },
    tabClick(tabs) {
       this.tabs = tabs;
    }
  



  }
  
    
}
</script>
<style scoped>


</style>