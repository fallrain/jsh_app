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
        @query="getOrderList"
      ></t-failure-goods-list>
      <!-- 底部 -->
      <t-shopping-cart-btm
        :checked.sync="isCheckAll"
        @checkAll="checkAll"
        :settlement="settlement"
        :allChooseNum="allChooseNum"
        @query="Settlement"
        @editDelete="editDelete"
      ></t-shopping-cart-btm>

    </view>
</template>
<script>
import TShoppingCartItem from '../../components/transfer/TShoppingCartItem';
import TShoppingCartBtm from '../../components/transfer/TShoppingCartBtm';
import JTab from '../../components/common/JTab';
import TOveragePay from '../../components/transfer/TOveragePay';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import TAlertVerification from '../../components/form/TAlertVerification';
import {
  mapGetters, mapMutations
} from 'vuex';
import {
  USER, TRANSFER
} from '../../store/mutationsTypes';
import './css/transferShoppingCart.scss';

export default {
  name: 'transferShoppingCart',
  components: {
    JTab,
    TShoppingCartItem,
    TOveragePay,
    TFailureGoodsList,
    TShoppingCartBtm,
    TAlertVerification
  },
  data() {
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
      userInfMianMi: false,
      // 提交订单大单号
      SEQ: '',
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
      infoList: [],


    };
  },
  onLoad(option) {
    console.log(option);
    console.log(this.infoList);
  },
  created() {
    // this.infoList = JSON.parse(localStorage.getItem('infoList'));
    // console.log(this.infoList);
    this.getShopInfo();
  },
  watch: {
    $route: ['set', 'getShopInfo']
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
      TSHOPCART: TRANSFER.GET_TSHOPCART,
      INDEX: TRANSFER.GET_INDEX
    })

  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to);
  //   console.log(this.TSHOPCART.allOrderList);
  //   debugger;
  //   // if (from.path === 'pages/transferGoods/transferDetail') {
  //   //   // this.allOrderList[this.TSHOPCART.index] = this.TSHOPCART.allOrderList;
  //   // }
  //   // next();
  // },
  methods: {
    ...mapMutations([
      TRANSFER.UPDATE_TSHOPCART
    ]),
    set() {
      if (this.TSHOPCART.allOrderList) {
        console.log('ffffffffffffffffff', this.TSHOPCART.allOrderList[0]);
        console.log('jjjjjjjjjjjjjjjjjjjj', this.allOrderList[this.TSHOPCART.allOrderList[0].index]);
        this.allOrderList[this.TSHOPCART.allOrderList[0].index] = this.TSHOPCART.allOrderList[0].list;
        console.log('eeeeeeeeeeeeeeeeeeee', this.allOrderList[this.TSHOPCART.allOrderList[0].index]);
        // debugger
      }
    },
    // 显示验证码弹窗
    changeVf() {
      this.isShowVf = true;
    },
    getShopInfo() {
      (async () => {
        await this.getUserInfById();
        await this.getOrderList();
        await this.getpayerList();
      })();
      // this.getOrderList();
      // this.getpayerList();
      this.calBalance();

      // this.getShoppingCartNum()
    },
    async getOrderList() {
      // 调货购物车数据
      // console.log(this.saleInfo.customerCode)
      const { code, data } = await this.transfergoodsService.allOrderList({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode
      });
      if (code === '1') {
        console.log(data.data);
        const page = data.data;
        let setinvalid = [];
        if (page && page.length > 0) {
          page.forEach((item, i) => {
            console.log(item);
            if (item.IBR_ISFLAG === '失效产品') {
              setinvalid = page.splice(i, 1);
            }
          });
        }
        console.log(setinvalid);
        console.log(page);
        const temp = page;
        // const setinvalid = data.data.slice(2)
        this.invalid = setinvalid;

        const allList = [];
        if (temp && temp.length > 0) {
          temp.forEach((item) => {
            const list = {
              checked: false,
              data: item
            };
            allList.push(list);
          });
        }
        // console.log(this.allOrderList)
        const productCodes = [];
        let chooseNum = 0;
        allList.forEach((item) => {
          console.log(item);
          const tempList = item.data.orderList.map(item => item.GBID);
          console.log(tempList);
          productCodes.push(...tempList);
          // 总价保留两位小数
          item.data.SUMMONEY = Number(item.data.SUMMONEY).toFixed(2);
          item.data.calue = Math.round(item.data.IBR_JSTIJI / 15 * 100);
          console.log('bbbbbbbbbbbbbbbbbbb', item.data.calue);
          item.data.orderList.forEach((v) => {
            v.IBL_NUM = v.IBL_NUM ? Number(v.IBL_NUM) : 1;
            v.IBL_MAXNUM = v.IBL_MAXNUM ? Number(v.IBL_MAXNUM) : 0;
            v.UNITPRICE = Number(v.UNITPRICE).toFixed(2);
            v.SUMMONEY = Number(v.SUMMONEY).toFixed(2);
          });

          if (item.checked) {
            chooseNum += item.data.orderList.length;
            console.log(item);
            console.log(chooseNum);
          } else {
            chooseNum = 0;
          }
        });
        this.allChooseNum = chooseNum;
        console.log(this.allChooseNum);
        console.log(productCodes);
        // 获取收藏列表
        const getProductQueryInter = await this.customerService.queryCustomerInterestProductByAccount({
          account: this.saleInfo.customerCode,
          productCodeList: productCodes
        });
        console.log(getProductQueryInter);
        if (getProductQueryInter.code === '1') {
          const productQueryInterData = getProductQueryInter.data;
          allList.forEach((item) => {
            item.data.orderList.forEach((v) => {
              v.$favorite = !!productQueryInterData.find(productCode => v.GBID === productCode);
            });
          });
        }
        this.allOrderList = allList;
        this.calSettlement();
        console.log(this.allOrderList);
        let sum1 = 0;
        this.allOrderList.forEach((item) => {
          sum1 += item.data.orderList.length;
        });
        this.transferNum = sum1;
        console.log(this.transferNum);
        // this.$refs.TShoppingCartItem.delivery(this.allOrderList)
        this.setAllinvalid();
        this.getShoppingCartNum();
        this.getpayerList();
      }
    },
    // 跳转到详情页
    goTransferDetail(seq, list, index) {
      console.log(seq);
      const infoList = [];
      infoList.push({
        index,
        list
      });
      console.log(this.infoList);
      // localStorage.setItem('infoList', JSON.stringify(this.infoList));
      this[TRANSFER.UPDATE_TSHOPCART]({
        allOrderList: infoList
      });
      uni.navigateTo({
        url: `/pages/transferGoods/transferDetail?IBR_SEQ=${seq}`
      });
    },
    // 设置失效产品
    setAllinvalid() {
      const failure = [];
      this.invalid.map((item) => {
        const list = {
          checked: true,
          data: item
        };
        failure.push(list);
      });
      this.invalidList = failure;
      console.log(this.invalidList);
    },
    // 结算方法
    calSettlement() {
      let sum = 0;
      this.allOrderList.forEach((ele) => {
        console.log(ele);
        if (ele.checked) {
          sum += Number(ele.data.SUMMONEY);
        }
      });
      this.settlement = Number(sum.toFixed(2));
    },
    // 结算跳转
    async Settlement() {
      let flag = true;
      let sum = 0;
      let volume = 0;
      let no = false;

      this.allOrderList.forEach((ele) => {
        if (ele.checked) {
          console.log(1);
          no = true;
          sum += Number(ele.data.SUMMONEY);
          volume = Math.round(ele.data.IBR_JSTIJI / 15 * 100);
          if (volume < 100) {
            flag = false;
          }
        }
        // else {
        //   console.log(2)
        //   uni.showToast({
        //     title: "请先选择订单",
        //     duration: 3000
        //   });
        // }
      });
      if (!no) {
        this.allOrderList.forEach((ele) => {
          if (!ele.checked) {
            uni.showToast({
              title: '请先选择订单',
              duration: 3000
            });
          }
        });
      }
      if (!flag) {
        // confirm('体积小于15，无法结算，请继续添加商品')
        this.allOrderList.forEach((ele) => {
          if (ele.checked) {
            console.log(ele);
            uni.showToast({
              title: `单号${ele.data.IBR_SEQ};体积不满足，无法提交`,
              duration: 3000
            });
          }
        });
      } else {
        flag = true;
        this.payerBalance.forEach((ele) => {
          if (ele.balance > ele.toBePaid) {
            // this.getUserInfMianMi()
            // if (this.userInfMianMi) {
            //   console.log('true,提交');
            //   // 提交订单
            //   this.getsubmitDhOrderTwo();
            //
            // } else {
            console.log('谈验证码');
            this.changeVf();
            // }
          } else {
            this.payerBalance.forEach((ele) => {
              uni.showModal({
                title: '提示',
                content: `付款方${ele.CodeName}余额不足，无法提交！`,
              });
            });
          }
        });
      }
    },
    async getUserInfById() {
      /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
      const { code, data } = await this.orderService.sendVerify(this.saleInfo.customerCode);
      if (code === '1') {
        const abc = data.data.account;

        console.log(abc);
        this.form.phone = abc.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
      console.log(this.form.phone);
    },
    async getUserInfMianMi() {
      /* 获取免密 */
      const data = await this.orderService.mianMi();

      // console.log(data)
      if (data.code === '1') {
        console.log(data.data);
        this.userInfMianMi = data.data;
      }
    },
    // 删除选中产品
    editDelete() {
      const _this = this;
      // confirm("确认要删除选中订单")
      uni.showModal({
        title: '',
        content: '确认要删除选中订单吗',
        success(res) {
          if (res.confirm) {
            console.log(res);
            _this.deleteOrderForm();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async deleteOrderForm() {
      // console.log(item);
      // 删除购物车订单产品
      const temp = [];
      // eslint-disable-next-line array-callback-return
      this.allOrderList.map((item) => {
        if (item.checked) {
          temp.push(item.data.IBR_SEQ);
          console.log(item);
        }
      });
      console.log(this.saleInfo.customerCode);
      const deleteForm = await this.transfergoodsService.deleteOrderForm({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        SEQ: temp.join(',')
      });
      if (deleteForm.code === '1') {
        console.log(deleteForm.data);
        this.getOrderList();
        uni.showToast({
          title: deleteForm.data.message,
        });
      } else {
        uni.showToast({
          title: deleteForm.data.message,
        });
      }
    },
    async getShoppingCartNum() {
      // 购物车商品数量
      const shoppingCart = await this.transfergoodsService.shoppingCartNum({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode
      });
      if (shoppingCart.code === '1') {
        this.shoppingCartNum = shoppingCart.data.allNum;
        console.log(this.shoppingCartNum);
        // console.log(data)
      }
    },
    goodsChange(list, item, index) {
      this.allOrderList[index] = list;
      this.allOrderList = JSON.parse(JSON.stringify(this.allOrderList));
      this.calSettlement();
      this.isCheck();
    },
    // 全选
    isCheck() {
      this.isCheckAll = true;
      let chooseNum = 0;
      this.allOrderList.forEach((ele) => {
        if (!ele.checked) {
          console.log(123);
          this.isCheckAll = false;
          return;
        }
        if (ele.checked) {
          console.log(1);
          chooseNum += 1;
        }
      });
      this.allChooseNum = chooseNum;
      this.calBalance();
    },
    // 付款方数据
    async getpayerList() {
      // console.log(this.userInf);
      const { code, data } = await this.customerService.getcustomersList(this.saleInfo.customerCode, {
        salesGroupCode: this.saleInfo.salesGroupCode,
        status: 1
      });
      if (code === '1') {
        // console.log(data);
        const page = data;
        // let code = []
        // page.forEach((item, index) => {
        // console.log(item)
        // code.push(item.payerCode)
        // item.isChecked = true
        // })
        this.payer = page;
        this.payerCodeAll = page;
        console.log(this.payerCodeAll);
        this.allOrderList.forEach((ele) => {
          ele.data.orderList.forEach((item) => {
            item.checkedTwo = false;
            item.payer = [...page];
            item.payer.forEach((ele1) => {
              if (ele1.payerCode === item.IBL_PAYMONEY) {
                ele1.isChecked = true;
              } else {
                ele1.isChecked = false;
              }
            });
            item.isExpand = false;
          });
        });
        console.log(this.allOrderList);
        this.invalidList.forEach((ele) => {
          ele.data.payer = page;
          ele.data.orderList.forEach((item) => {
            item.isExpand = false;
            item.Checked = false;
          });
        });
        console.log(this.invalid);
        this.getInquire();
      }
    },

    // 请求余额支付信息
    async getInquire() {
      const code = [];
      const temp = {};
      const payerCode = '';
      console.log(this.payerCodeAll);
      if (this.payerCodeAll && this.payerCodeAll.length > 0) {
        this.payerCodeAll.forEach((item) => {
          code.push({
            payerCode: item.payerCode,
            salesGroupCode: this.saleInfo.salesGroupCode
          });
        });
        console.log(code);
        const allInquire = await this.customerService.inquire(code);
        if (allInquire.code === '1') {
          // 付款方余额信息
          console.log(allInquire.data);
          const payerBal = allInquire.data;
          console.log('555555555555555', payerBal);
          this.payer.forEach((item) => {
            // console.log(item);
            item.CodeName = `(${item.payerCode})${item.payerName}`;
            // console.log(item.CodeName);
            const same = payerBal.find(ele => item.payerCode === ele.payerCode);
            // console.log(same);
            if (same) {
              item.balance = same.balance ? same.balance : 0;
            }
          });
          // console.log(a)
          // console.log(this.payer);
        }
      }
    },
    // 付款方  余额支付信息
    calBalance() {
      const all = [];
      // console.log(this.payer);
      const pays = [];
      console.log(this.allOrderList);
      this.payer.forEach((item) => {
        const a = { ...item };
        // console.log(a);
        let needPay = 0;
        this.allOrderList.forEach((e) => {
          if (e.checked) {
            e.data.orderList.forEach((v) => {
              // if (v.IBL_PAYMONEYNAME === a.CodeName) {
              if (v.IBL_PAYMONEY === a.payerCode) {
                // console.log(a);
                console.log(pays.find(ele => ele === a.payerCode));
                if (!pays.find(ele => ele === a.payerCode)) {
                  a.isShow = true;
                  needPay += Number(v.SUMMONEY);
                  pays.push(a.payerCode);
                  console.log(pays);
                }
              }
            });
          }
        });
        a.toBePaid = Number(needPay.toFixed(2));
        if (a.isShow) {
          console.log(a);
          all.push(a);
        }
      });

      console.log(all);
      this.payerBalance = all;
      this.isShowpayer = (this.payerBalance.length !== 0);
      console.log(this.payerBalance);

      // const temp = []
      // let aaa = []
      this.allOrderList.forEach((item) => {
        if (item.checked) {
          this.payerBalance.forEach((e) => {
            if (e.balance > e.toBePaid) {
              e.pay = '去支付';
            } else {
              e.pay = '余额不足，去充值';
            }
          });
        }
      });
    },

    checkAll(checked) {
      /* 全部选择回调函数 */
      this.allOrderList.forEach((v) => {
        v.checked = checked;
      });
      if (checked) {
        this.allChooseNum = this.allOrderList.length;
      } else {
        this.allChooseNum = 0;
      }
      this.calF();
      this.calBalance();
    },
    invalidListChange(list) {
      this.invalidList = list;
      this.invalidList = JSON.parse(JSON.stringify(this.invalidList));
    },
    tabClick(tabs) {
      this.tabs = tabs;
      this.tabs.forEach(item => {
        console.log(item);
        if (item.active) {
          if (item.name === '购物车') {
            this.tabs[0].active = true;
            uni.switchTab({
              url: '/pages/shoppingCart/shoppingCart',
            });
            // this.tabs.forEach((v) => {
            //   v.active = false;
            // });
            // this.tabs[0].active = true;
          }
          if (item.name === '整车直发') {
            uni.navigateTo({
              url: '/pages/vehicleList/abnormal'
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .jTab-item.active {
  font-size: 36px;
  color: #2283E2;
  &:after {
     content: '';
     display: block;
     position: absolute;
     top: 100%;
     left: 0;
     right: 0;
     height: 4px;
     background: #2283E2;
   }
}


</style>
