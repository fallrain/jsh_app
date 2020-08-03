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
          v-for="(goods,index) in shoppingList"
          :key="index"
          :goods="goods"
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
        :list="failureGoodsList"
        @change="failureGoodsListChange"
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
      tabs: [
        {
          id: 'gwc',
          name: '购物车',
          active: true
        },
        {
          id: 'zc',
          name: '整车直发',
          active: false
        },
        {
          id: 'zx',
          name: '中心调货',
          active: false
        }
      ],
       shoppingList: [
        {
            checked: false,
            data:[
              {
               show: true, 
              },
              {
               show: true, 
              }
            ]
          
        },
        {
          checked: true,
          data:[
            {
               show: true, 
            }
          ]
        
        },
      ],
      failureGoodsList: [
        {
          checked: false,
        },
        {
          checked: false,
        }
      
      ],
      // 是否全选
      isCheckAll: false,
    }
  },
  methods: {
    goodsChange(goods, index) {
      this.shoppingList[index] = goods;
      this.shoppingList = JSON.parse(JSON.stringify(this.shoppingList));
    },
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.shoppingList.forEach((v) => {
        v.checked = checked;
      });
    },
    failureGoodsListChange(list) {
      this.failureGoodsList = list;
    },
    tabClick(tabs) {
       this.tabs = tabs;
    }
  }
  
    
}
</script>
<style scoped>


</style>