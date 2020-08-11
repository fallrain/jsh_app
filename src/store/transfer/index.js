import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default {  
    namespaced: true,  
    state:{
         // 商品购物车页面订单详情
      allOrderList: [],
      // 商品购物车页面订单结算
      settlement: 0,
      invalid: [],
      invalidList: []
    },
    actions:{
        // 请求cinema页面的数据
        async getOrderList(item) {
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
              // console.log(this.allOrderList)
              const productCodes = []
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
              })
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
              context.commit("allOrderList",allList)
            //   this.allOrderList = allList
            //   this.calSettlement()         
            }
        },


    },
    mutations:{
        setAllOrderList(state,allList){
            state.allOrderList = allList
        },
        // 设置失效产品
        setinvalid(item) {
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
        // 结算
        calSettlement() {
            let sum = 0;
            this.allOrderList.forEach(ele => {
              if (ele.checked) {
                sum += Number(ele.data.SUMMONEY)
              }
            })
              this.settlement = sum
          },
    }

}