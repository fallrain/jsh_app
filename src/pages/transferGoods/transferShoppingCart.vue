<template>
    <view class="transferShoppingCart">
      <!-- 验证码弹窗 -->
      <t-alert-verification 
        :show.sync="isShowVf"
        :form="form"
        :allOrderList="allOrderList"
      ></t-alert-verification>
      <j-tab
        :tabs="tabs"
        :hasRightSlot="true"
        @tabClick="tabClick"
      >  
      </j-tab> 
      <view class="cumulative-shoppingCart">共{{transferNum}}件宝贝</view>
      <view class="shoppingCart-list">
        <t-shopping-cart-item
          v-for="(list,index) in allOrderList"
          :key="index"
          :list="list"
          :index="index"
          @change="goodsChange"
          @query="getOrderList"
          ref="TShoppingCartItem"
          @calBalance="calBalance"
          @goTransferDetail="goTransferDetail"
          :isShowClear="isShowClear"
        ></t-shopping-cart-item>
      </view>
       <!--余额支付信息 -->
      <view class="mt24" v-show="isShowpayer">
        <t-overage-pay
          :payerBalance="payerBalance"
          :isShowpayer="isShowpayer"
        ></t-overage-pay>
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
        @query="Settlement"
        @edit="edit"
        @editDelete="editDelete"
        @cancel="cancel"
        :isShowClear="isShowClear"
      ></t-shopping-cart-btm>
     
    </view>
</template>
<script>
import TShoppingCartItem from '../../components/transfer/TShoppingCartItem';
import TShoppingCartBtm from '../../components/transfer/TShoppingCartBtm';
import JTab from '../../components/common/JTab';
import TOveragePay from '../../components/transfer/TOveragePay';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import TAlertVerification from "../../components/form/TAlertVerification";
// import { mapState, mapActions, mapMutations } from "vuex"
import {
  mapGetters,mapMutations
} from 'vuex';
import {
  USER,TRANSFER
} from '../../store/mutationsTypes';
import './css/transferShoppingCart.scss';
import sampleMachineListVue from '../sampleMachine/sampleMachineList.vue';

export default {
  name: "transferShoppingCart",
  components: {
    JTab,
    TShoppingCartItem,
    TOveragePay,
    TFailureGoodsList,
    TShoppingCartBtm,
    TAlertVerification
  },
  data(){
    return {
      // 验证码弹窗
      isShowVf: false, // 验证码弹窗，判断是否展示
      // 产品数量
      transferNum: 0,
      // 结算
      settlement: 0,
      // 订单详情
      allOrderList: [],
      // 失效订单
      invalid: [],
      invalidList: [],
      // 选中的数据
      allChooseNum: 0,
      // 付款方编码
      payerCodeAll: [],
      // 付款方余额缓冲
      payeAll: [],
      // 付款方余额
      payerBalance: [],
      payer: [],
      // 余额支付信息显示隐藏
      isShowpayer: false,
      // // 验证码
      // YZM:"",
      form: {
        // 手机号
        phone: '',
        // 手机号验证码
        verificationCode: '',
      },
      // 是否免密
      userInfMianMi:false,
      // 编辑选中显示
      isShowClear: false,

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
      isCheckAll: false,
      
    }
  },
  onLoad(option) {
    console.log(option)
  },
  created() {
    this.getShopInfo();
    console.log(this.defaultSendToInf)
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    })
    
  },

  methods: {
    ...mapMutations([
      TRANSFER.UPDATE_TSHOPCART
    ]),
    // 显示验证码弹窗
    changeVf () { 
      this.isShowVf = true;
    },
    getShopInfo() {
      (async() => {
        await this.getUserInfById()
        await this.getOrderList();  
        await this.getpayerList()
      })()
      // this.getOrderList();
      // this.getpayerList();
      this.calBalance();   
      
      // this.getShoppingCartNum()
    },
    async getOrderList() {
      // 调货购物车数据
      // console.log(this.defaultSendToInf.customerCode)
      const { code, data } = await this.transfergoodsService.allOrderList({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.defaultSendToInf.customerCode
      })
      if(code === "1") { 
        console.log(data.data) 
        const page = data.data 
        let setinvalid =[]
        page.forEach((item,i) =>  {
          console.log(item)
          if(item.IBR_ISFLAG === "失效产品") {
            setinvalid = page.splice(i,1)
          }
        })
        console.log(setinvalid)
        console.log(page)
        const temp = page
        // const setinvalid = data.data.slice(2)
        this.invalid = setinvalid
       
        const allList = []
        temp.map(item => {
          const list = {
            checked: false,
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
          account: this.defaultSendToInf.customerCode,
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
        let sum1 = 0
        this.allOrderList.map(item => {
          sum1 += item.data.orderList.length
          
        })
        this.transferNum = sum1
        console.log(this.transferNum)
        // this.$refs.TShoppingCartItem.delivery(this.allOrderList)
        this.setAllinvalid()
        this.getShoppingCartNum()
        this.getpayerList()

      }
     
    },
    // 跳转到详情页
    goTransferDetail(seq,list,e) {
      console.log(seq,list)
      this[TRANSFER.UPDATE_TSHOPCART]({
         allOrderList: list,
      });
      
      uni.navigateTo({
         url: '/pages/transferGoods/transferDetail?IBR_SEQ='+ seq
      });
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
      let sum = 0
      this.allOrderList.forEach(ele => {
        console.log(ele)
        if (ele.checked) {
          sum += Number(ele.data.SUMMONEY)
        }
      })
        this.settlement = sum

    },
    // 结算跳转
    async Settlement() {
      let flag = true
      let sum = 0
      let volume = 0
      let no = false

      this.allOrderList.forEach(ele => {
        if (ele.checked) {
          console.log(1)
          no = true
          sum += Number(ele.data.SUMMONEY)
          volume = Math.round(ele.data.IBR_JSTIJI/15*100)
          if (volume < 100) {
            flag = false
          }      
        } 
        // else {
        //   console.log(2)
        //   uni.showToast({
        //     title: "请先选择订单",
        //     duration: 3000
        //   });    
        // }
      })
      if(!no) {
        this.allOrderList.forEach(ele => {
          if (!ele.checked) {
            uni.showToast({
              title: "请先选择订单",
              duration: 3000
            }); 
          }
        }) 
      }
      if (!flag) {
        // confirm('体积小于15，无法结算，请继续添加商品')
        this.allOrderList.forEach(ele => {
          if (ele.checked) {
            console.log(ele)
            uni.showToast({
              title:`单号${ele.data.IBR_SEQ};体积不满足，无法提交`,
              duration: 3000
            });
          }
        })     
      } else {

        flag = true
        this.payerBalance.forEach(ele => {
          if(ele.balance > ele.toBePaid) {
            // this.getUserInfMianMi()          
            if(this.userInfMianMi) {
              console.log("true,提交")
              // 提交订单
              this. getsubmitDhOrderTwo()
            } else {
              console.log("谈验证码")
              this.changeVf()     
   
            }
          } else {
              this.payerBalance.forEach(ele => {
                uni.showModal({
                  title: '提示',
                  content: `付款方${ele.CodeName}余额不足，无法提交！`,
                });
              })         
          }
        })     
      }    
    
    },
    async getUserInfById() {
      /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
      const {code, data} =  await this.orderService.sendVerify(this.defaultSendToInf.customerCode);
        if (code === "1") {
          const abc = data.data.account
          
          console.log(abc)
        this.form.phone = abc.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
      console.log(this.form.phone)
    },
    async getUserInfMianMi() {
      /* 获取免密 */
      const data =  await this.orderService.mianMi();
      
      // console.log(data)
      if(data.code === "1") {
        console.log(data.data)
        this.userInfMianMi = data.data
      }  
    },
    //提交订单
    async getsubmitDhOrderTwo() {
      let SEQ = ""
      this.allOrderList.forEach(ele => {
        if(ele.checked) {
          SEQ = ele.IBR_SEQ
        }        
      })
      const submitDhOrder  = await this.transfergoodsService.submitDhOrder({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.defaultSendToInf.customerCode,
        orderNo: SEQ,
        verifyCode: this.form.verificationCode,
        verifyKey: '',
      })
      if(submitDhOrder.code === "1") {
        uni.showToast({
            title: '调货订单提交成功',
        });
      } else {
          uni.showToast({
              title: '提交失败请重试',
          });
      }
    },


    // 编辑
    edit() {
      this.isShowClear = !this.isShowClear
      console.log(this.allOrderList)
      
    },
    // 取消
    cancel() {
      this.isShowClear = !this.isShowClear
    },
    // 清除选中产品
    editDelete() {
      // confirm("确认要删除选中订单") 
       uni.showModal({
        title: '',
        content: '确认要删除选中订单吗',
        success: function(res) {
          if (res.confirm) {
            this.deleteOrderForm()
            console.log(res);
          } else if (res.cancel) {
              console.log('用户点击取消');
          }
        }
      });
      
      
      
    },
    async deleteOrderForm() {
      // console.log(item)
       // 删除购物车订单产品
      const temp = []
      this.allOrderList.map(item => {
        if(item.checked) {
          temp.push(item.data.IBR_SEQ)
           console.log(item)         
        }
      })
      console.log(this.defaultSendToInf.customerCode)
      const deleteForm = await this.transfergoodsService.deleteOrderForm ({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.defaultSendToInf.customerCode,
        SEQ: temp.join(',')
      });
      if(deleteForm.code === "1") {
        console.log(deleteForm.data)
        this.getOrderList()       
      }

    },
    async getShoppingCartNum() {
      // 购物车商品数量 
      const shoppingCart = await this.transfergoodsService.shoppingCartNum({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.defaultSendToInf.customerCode
      })
      if(shoppingCart.code === "1") {   
        this.shoppingCartNum = shoppingCart.data.allNum
        console.log(this.shoppingCartNum)
        // console.log(data)
      }
    },
    goodsChange(list, item, index) {
      this.allOrderList[index] = list;
      this.allOrderList = JSON.parse(JSON.stringify(this.allOrderList));
      this.calSettlement()
      this.isCheck()
    },
    // 全选
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
        } else {
          chooseNum = 0
        }        
      })
      this.allChooseNum = chooseNum
      this.calBalance()
    },
    // 付款方数据
    async getpayerList() {
      // console.log(this.userInf);
      const { code, data } = await this.customerService.getcustomersList(this.defaultSendToInf.customerCode, {
        salesGroupCode: this.defaultSendToInf.salesGroupCode,
        status: 1
      });
      if (code === '1') {
        console.log(data)
        const page = data
        // let code = [] 
        // page.forEach((item, index) => {
          // console.log(item)
          // code.push(item.payerCode)
          // item.isChecked = true
        // })
        this.payer = page
        this.payerCodeAll = page
        console.log(this.payerCodeAll)
        this.allOrderList.forEach(ele => {
          ele.data.orderList.map(item => {
            item.checkedTwo = false
            item.payer = [...page]
            item.payer.forEach(ele1 => {
              if (ele1.payerCode === item.IBL_PAYMONEY) {
                ele1.isChecked = true
              } else {
                ele1.isChecked = false
              }
            })
            item.isExpand = false      
          })
        })
        console.log(this.allOrderList)
        this.invalidList.map(ele => {
          ele.data.payer = page
          ele.data.orderList.map(item => {
            item.isExpand = false
            item.Checked = false
          })
        })
       console.log(this.invalid)
        this.getInquire()
      }

    },
    
    // 请求余额支付信息
    async getInquire() {
      let code = []
      let temp = {}
      let payerCode = ""
      console.log(this.payerCodeAll) 
      if(this.payerCodeAll && this.payerCodeAll.length > 0) {
           this.payerCodeAll.forEach(item => {
            code.push({
            payerCode: item.payerCode,
            salesGroupCode: this.defaultSendToInf.salesGroupCode
          })
        })
      console.log(code)
      const allInquire =  await this.customerService.inquire(code);
      if(allInquire.code === "1") {
        // 付款方余额信息
       console.log(allInquire.data)
        const payerBal = allInquire.data
        console.log(payerBal)
        this.payer.forEach(item => {
          console.log(item)
          item.CodeName = "(" + item.payerCode + ")" + item.payerName
          const same = payerBal.find(ele => item.payerCode === ele.payerCode)
          console.log(same)
          if (same) {
            item.balance = same.balance
          }
        })  
          // console.log(a)
        console.log(this.payer) 
      }
   
      }
     
     
    },
    // 付款方  余额支付信息
    calBalance() {
      const all = []
      console.log(this.payer)
      console.log(this.allOrderList)
      this.payer.forEach(item => {
        let a = {...item}
        let needPay = 0
        this.allOrderList.forEach(e => {
          if (e.checked) {            
            e.data.orderList.map(v => {
              // if (v.IBL_PAYMONEYNAME === a.CodeName) {
                if (v.IBL_PAYMONEY === a.payerCode) {
                a.isShow = true
                needPay += Number(v.SUMMONEY)
                // a.CodeName = item.CodeName
              }
            })   
          }
        })
        a.toBePaid = needPay
        if (a.isShow) {
          all.push(a)
        }
        
        
      })  
      // console.log(a)
      this.payerBalance = all
      this.isShowpayer = (this.payerBalance.length !== 0)
      console.log(this.payerBalance)
    
      // const temp = []
      // let aaa = []
      this.allOrderList.forEach(item => {
        if (item.checked) {
          this.payerBalance.forEach(e => {
            if(e.balance > e.toBePaid){
                e.pay = "去支付"
              } else {
                e.pay = "余额不足，去充值"
              }
          })
        }
      })
    },
    
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.allOrderList.forEach((v) => {
        v.checked = checked;
      });
      this.calSettlement()
      this.calBalance();
    },
    invalidListChange(list) {
      this.invalidList = list;
      this.invalidList = JSON.parse(JSON.stringify(this.invalidList));
    },
    tabClick(tabs) {
       this.tabs = tabs;
    }
  }
  
    
}
</script>
<style scoped>


</style>