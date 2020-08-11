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
          @query="getOrderList"

          ref="TShoppingCartItem"
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
        :settlement="settlement"
        :allChooseNum="allChooseNum"
      ></t-shopping-cart-btm>

    </view>
</template>
<script>
import TShoppingCartItem from '../../components/transfer/TShoppingCartItem';
import TShoppingCartBtm from '../../components/transfer/TShoppingCartBtm';
import JTab from '../../components/common/JTab';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
// import { mapState, mapActions, mapMutations } from "vuex"
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
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
      // 结算
      settlement: 0,
      // 订单详情
      allOrderList: [],
      // 失效订单
      invalid:[],
      invalidList: [],
      // 选中的数据
      allChooseNum: 0,
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
      // 是否全选
      isCheckAll: true,
    }
  },
  created() {
    this.getShopInfo();
  },
   computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    })
  },
  // computed: {
  //   // ...mapState("transfer",["allOrderList","settlement","invalidList"])
  // },
  methods: {
    // ...mapActions("transfer",["getOrderList"]),
    // ...mapMutations("transfer",["setinvalid", "calSettlement"]),
    getShopInfo() {
      // this.setlist()
      this.getOrderList()
      // this.getShoppingCartNum()
    },
    // setlist() {
    //   this.getOrderList()
    //   // this.setAllOrderLis()
    //   // this.setinvalid()
    //   // this.calSettlement()
    // },
    // set() {

    // }
    async getOrderList() {
      // 调货购物车数据
      const { code, data } = await this.transfergoodsService.allOrderList({
        timestamp: 1596606815956,
        longfeiUSERID: 8700010462
      })
      if(code === "1") {   
        const temp = data.data.slice(0,2)
        const setinvalid = data.data.slice(2)
        this.invalid = setinvalid
       
        const allList = []
        temp.map(item => {
          const list = {
            checked: true,
            data:item
          }
          allList.push(list)
        })
        // console.log(this.allOrderList)
        const productCodes = []
        let chooseNum = 0
        allList.forEach(item => {
          console.log(item)
          const tempList = item.data.orderList.map(item =>item.GBID)
          console.log(tempList)
          productCodes.push(...tempList)
          // 总价保留两位小数
          item.data.SUMMONEY = Number(item.data.SUMMONEY).toFixed(2)
          item.data.orderList.forEach(v => {
            v.IBL_NUM = v.IBL_NUM ? Number(v.IBL_NUM) : 1,
            v.IBL_MAXNUM = v.IBL_MAXNUM ? Number(v.IBL_MAXNUM) : 0
            v.ADVICEPRICE = Number(v.ADVICEPRICE).toFixed(2)
            v.SUMMONEY = Number(v.SUMMONEY).toFixed(2)
            
            // if (v.IBL_MAXNUM === 0) {
            //   v.IBL_NUM = 0
            // }
          })
         
          if(item.checked) {
            chooseNum += item.data.orderList.length
            console.log(item)
            console.log(chooseNum)
          }else{
            chooseNum = 0
          }        
        })
        this.allChooseNum = chooseNum
        console.log(this.allChooseNum)
        console.log(productCodes)
        // 获取收藏列表
        const getProductQueryInter = await this.customerService.queryCustomerInterestProductByAccount({
          account: "8700010462",
          productCodeList: productCodes
        });
        console.log(getProductQueryInter)
        if (getProductQueryInter.code === "1") {
          const productQueryInterData = getProductQueryInter.data
          allList.forEach(item => {            
            item.data.orderList.forEach(v => {
              v.$favorite = !!productQueryInterData.find(productCode => v.GBID === productCode);

            })
          })
        }
        this.allOrderList = allList
        this.calSettlement()
        console.log(this.allOrderList)
        // this.$refs.TShoppingCartItem.delivery(this.allOrderList)
        this.setAllinvalid()
        this.getShoppingCartNum()
        this.getpayerList()
      }
     
    },
    // 设置失效产品
    setAllinvalid() {
      const failure = []
      this.invalid.map(item => {
          const list = {
          checked: true,
          data:item
        }
        failure.push(list)
      })
      this.invalidList = failure
      console.log(this.invalidList)
    },
    // 结算方法
    calSettlement() {
      let sum = 0;
      this.allOrderList.forEach(ele => {
        if (ele.checked) {
          sum += Number(ele.data.SUMMONEY)
        }
      })
        this.settlement = sum
    },
    async getShoppingCartNum() {
      // 购物车商品数量 
      const shoppingCart = await this.transfergoodsService.shoppingCartNum({
        timestamp: 1596606815954,
        longfeiUSERID: 8700010462
      })
      if(shoppingCart.code === "1") {   
        this.shoppingCartNum = shoppingCart.data.allNum
        console.log(this.shoppingCartNum)
        // console.log(data)
      }
    },
    // 付款方数据
    async getpayerList() {
      console.log(this.userInf);
      const { code, data } = await this.customerService.getcustomersList(this.userInf.saletoCodeTwo, {
        salesGroupCode: this.userInf.salesGroupCodeTwo,
        status: 1
      });
      if (code === '1') {
        console.log(data)
        this.allOrderList.forEach(ele => {
          ele.data.orderList.map(item => {
            item.payer = data
          })
        })
        console.log(this.allOrderList)
        this.invalidList.map(ele => {
          ele.data.orderList.map(item => {
            item.payer = data
          })
        })
        console.log(this.invalid)
      }

    },
    goodsChange(list, index) {
      this.allOrderList[index] = list;
      this.allOrderList = JSON.parse(JSON.stringify(this.allOrderList));
      this.calSettlement()
      this.isCheck()
    },
    isCheck() {
      this.isCheckAll = true
      let chooseNum = 0
      this.allOrderList.forEach(ele => {
        if (!ele.checked) {
          this.isCheckAll = false
          return
        }
        if(ele.checked) {
          chooseNum += ele.data.orderList.length
          console.log(ele)
          console.log(chooseNum)
        }else{
          chooseNum = 0
        }        
      })
      this.allChooseNum = chooseNum
    },
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.allOrderList.forEach((v) => {
        v.checked = checked;
      });
      this.calSettlement()
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