<template>
  <view class="vehicleCarList">
    <!-- 验证码弹窗 -->
    <t-alert-verification :show.sync="isShowVf" :form="form"></t-alert-verification>
    <view class="vehicleCar-rouHead">共{{NUM}}件宝贝</view>
    <view class="vehicleCar-invalid" v-if="puTongList.length>0">
      <vehicle-cart-item v-for="(goods,index) in puTongList" :key="index" @pullDetail="pullDetail"
      :goods="goods" :index="index" @change="goodsChange" @changeNum="changeNum"></vehicle-cart-item>
    </view>
    <view class="vehicleCar-invalid" v-if="guaDanList.length>0">
      <vehicle-cart-item-g-d v-for="(goods,index) in guaDanList" :key="index" @pullDetail="pullDetail"
             :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item-g-d>
    </view>
    <view class="vehicleCar-invalid" v-if="pingCheList.length>0">
      <vehicle-cart-item-p-c v-for="(goods,index) in pingCheList" :key="index" @pullDetail="pullDetail"
             :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item-p-c>
    </view>
    <view class="vehicleCar-invalid" v-if="failureGoodsList.length>0">
      <t-failure-goods-list :list="failureGoodsList" @change="failureGoodsListChange"></t-failure-goods-list>
    </view>
    <view class="vehicleCar-high"></view>
    <view class="vehicleCar-foot">
      <vehicle-car-foot @checkAll="checkAll" :seq="checkSEQ" :num="checkNum" :numAll="checkAllNum" :checked="checked" @comfimVehi="comfimVehi">
      </vehicle-car-foot>
    </view>
  </view>
</template>

<script>
import vehicleCarFoot from '../../components/vehicleList/VehicleCarFoot';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import vehicleCartItem from '../../components/vehicleList/VehicleCartItem';
import vehicleCartItemGD from '../../components/vehicleList/VehicleCartItem-gd';
import vehicleCartItemPC from '../../components/vehicleList/VehicleCartItem-pc';
import TAlertVerification from '../../components/form/TAlertVerification';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'vehicleCarList',
  components: {
    vehicleCarFoot,
    TFailureGoodsList,
    vehicleCartItem,
    vehicleCartItemGD,
    vehicleCartItemPC,
    TAlertVerification
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      defaultSendTo: USER.GET_DEFAULT_SEND_TO,
    }),
  },
  data() {
    return {
      isShowVf: false, // 验证码弹窗，判断是否展示
      form: {
        phone: '', // 手机号
        verificationCode: '', // 手机号验证码
      },
      JDWarehouse: [], // 京东异地地址列表
      userInfMianMi: false, // 是否免密
      checked: false, // 全选单子
      checkNum: 0, // 选中的单子
      checkAllNum: 0, // 选中的单子的总金额
      checkSEQ: '', // 选中的单子单号
      NUM: 0, // 有效产品数量
      puTongList: [],
      pingCheList: [],
      guaDanList: [],
      shoppingList: [
        {
          checked: false,
          data: [
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
          data: [
            {
              show: true,
            }
          ]
        },
      ],
      failureGoodsList: []
    };
  },
  created() {
    this.queryCarList(); // 整车购物车列表查询
    this.queryJDWarehouse();
    // this.getPayerList(); // 获取付款方接口
  },
  methods: {
    clearInfo() {
      this.NUM = 0;
      this.failureGoodsList = [];
      this.puTongList = [];
      this.pingCheList = [];
      this.guaDanList = [];
      this.checked = false;
      this.checkNum = 0; // 选中的单子
      this.checkAllNum = 0; // 选中的单子的总金额
      this.checkSEQ = ''; // 选中的单子单号
    },
    async queryJDWarehouse() {
      const timetamp = new Date().valueOf();
      const longfeiUSERID = this.userInf.customerCode;
      const res = await this.vehicleService.queryJDWarehouse(timetamp, longfeiUSERID);
      console.log(res);
      if (res.code === '1') {
        this.JDWarehouse = res.data.data.items;
      }
    },
    async queryCarList() {
      const timetamp = new Date().valueOf();
      const longfeiUSERID = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.queryCarList(timetamp, longfeiUSERID);
      if (code === '1') {
        this.clearInfo();
        data.data.forEach((inf) => {
          if (inf.orderList.length > 0) {
            this.getPayerList(inf).then(() => {
              inf.JDWarehouse = this.JDWarehouse;
              if (inf.IBR_ISFLAG === '失效产品' && inf.orderList.length > 0) {
                inf.checked = false;
                inf.typpe = 'ZC';
                this.failureGoodsList.push(inf);
                this.NUM = this.NUM + inf.orderList.length;
              }
              if (inf.IBR_ISFLAG === '普通整车' && inf.orderList.length > 0) {
                inf.checked = false;
                this.puTongList.push(inf);
                this.NUM = this.NUM + inf.orderList.length;
              }
              if (inf.IBR_ISFLAG === '拼车订单' && inf.orderList.length > 0) {
                inf.checked = false;
                this.pingCheList.push(inf);
                this.NUM = this.NUM + inf.orderList.length;
              }
              if (inf.IBR_ISFLAG === '我的挂单' && inf.orderList.length > 0) {
                inf.checked = false;
                this.guaDanList.push(inf);
                this.NUM = this.NUM + inf.orderList.length;
              }
            });
          }
        });
        console.log('整车购物车查询');
        console.log(data);
      }
    },
    async getPayerList(inf) { // 获取付款方接口
      const longfeiUSERID = this.userInf.customerCode;
      const productGroup = inf.orderList[0].IBL_INVSORT;
      const sendtoCode = this.defaultSendTo.customerCode;
      const yuncangType = inf.IBR_ZCDELIVERYTYPE;
      const bstnk = inf.orderList[0].IBL_KORDERNO;
      const { code, data } = await this.vehicleService.queryPayCode(longfeiUSERID, productGroup, sendtoCode, yuncangType, bstnk);
      if (code === '1') {
        data.data.items.forEach((item) => {
          item.checked = false;
        });
        inf.orderList.forEach((item2) => {
          item2.payCheck = false;
          item2.payVehiList = data;
          item2.payVehCheck = data.data.items[0];
          item2.payVehiList.data.items[0].checked = true;
          item2.payVehCheck.checked = true;
        });
      }
    },
    goodsChange(item, index) { // 选中产品
      console.log('uuuuuuu');
      console.log(item);
      console.log(index);
      this.checked = false;
      this.checkNum = 0; // 选中的单子
      this.checkAllNum = 0; // 选中的单子的总金额
      this.checkSEQ = ''; // 选中的单子单号
      this.puTongList.forEach((inf) => { // 普通整车
        if (inf.checked) {
          this.checkNum = this.checkNum + 1;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        }
      });
      this.pingCheList.forEach((inf) => { // 拼车订单
        if (inf.checked) {
          this.checkNum = this.checkNum + 1;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        }
      });
      this.guaDanList.forEach((inf) => { // 我的挂单
        if (inf.checked) {
          this.checkNum = this.checkNum + 1;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        }
      });
      console.log(this.checkSEQ);
    },
    pullDetail(item) {
      // console.log(item);
      // console.log(index);
      item.longfeiUSERID = this.userInf.customerCode;
      item.orderList.forEach(async (inf) => {
        const gbid = inf.GBID;
        const longfeiUSERID = this.userInf.customerCode;
        const longfeiMFID = this.defaultSendTo.customerCode;
        const timetamp = new Date().valueOf();
        try {
          // 获取价格
          const getAllPrice = this.vehicleService.queryCarPrice(timetamp, longfeiUSERID, longfeiMFID, gbid);
          const [allPriceRes] = await Promise.all([getAllPrice]);
          if (allPriceRes.code === '1' && allPriceRes.data.code === '200') {
            inf.$MYprice = allPriceRes.data.data[0];
          } else {
            inf.$MYprice = [];
          }
          uni.setStorage({
            key: 'vehicleCarInfo',
            data: item,
            success() {
              console.log(11111122);
              console.log(item);
              uni.navigateTo({
                url: '/pages/vehicleList/vehicleCarDetail'
              });
            },
            fail() {
              console.log('huancunshibai');
            }
          });
        } catch (e) {
          inf.$MYprice = [];
          uni.setStorage({
            key: 'vehicleCarInfo',
            data: item,
            success() {
              console.log(11111122);
              console.log(item);
              uni.navigateTo({
                url: '/pages/vehicleList/vehicleCarDetail'
              });
            },
            fail() {
              console.log('huancunshibai');
            }
          });
        }
      });
    },
    checkAll() {
      console.log('2222');
      if (this.checked) {
        this.checked = false;
        this.checkNum = 0; // 选中的单子
        this.checkAllNum = 0; // 选中的单子的总金额
        this.checkSEQ = ''; // 选中的单子单号
        this.puTongList.forEach((inf) => { // 普通整车
          inf.checked = false;
        });
        this.pingCheList.forEach((inf) => { // 拼车订单
          inf.checked = false;
        });
        this.guaDanList.forEach((inf) => { // 我的挂单
          inf.checked = false;
        });
      } else {
        this.checked = true;
        this.checkNum = 0; // 选中的单子
        this.checkAllNum = 0; // 选中的单子的总金额
        this.checkSEQ = ''; // 选中的单子单号
        this.checkNum = this.puTongList.length + this.pingCheList.length + this.guaDanList.length;
        this.puTongList.forEach((inf) => { // 普通整车
          inf.checked = true;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        });
        this.pingCheList.forEach((inf) => { // 拼车订单
          inf.checked = true;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        });
        this.guaDanList.forEach((inf) => { // 我的挂单
          inf.checked = true;
          this.checkAllNum = this.checkAllNum + (inf.SUMMONEY * 1);
          this.checkSEQ = `${this.checkSEQ + inf.IBR_SEQ},`;
        });
      }
    },
    async comfimVehi(item) {
      console.log('jiesuanzhengche');
      if (item) { // 结算
        console.log('结算');
        if (this.checkSEQ === '') {
          uni.showToast({
            icon: 'none',
            title: '请选择一个订单!',
            duration: 3000
          });
          return;
        }
        this.getUserInfMianMi().then(() => {
          console.log('获取免密2');
          if (this.userInfMianMi) {
            // 免验证码
          } else {
            this.getUserInfById().then(() => {
              // 展示验证码
              this.isShowVf = true;
            });
          }
        });
      } else { // 删除
        console.log('删除');
        const timetamp = new Date().valueOf();
        const longfeiUSERID = this.userInf.customerCode;
        const { code, data } = await this.vehicleService.deleteVehicleOrder(timetamp, longfeiUSERID, this.checkSEQ);
        if (code === '1') {
          console.log(`结算1${data}`);
          this.queryCarList();
        }
      }
    },
    async getUserInfMianMi() {
      /* 获取免密 */
      const data = await this.orderService.mianMi();
      if (data.code === '1') {
        console.log('获取免密');
        console.log(data.data);
        this.userInfMianMi = data.data;
      }
    },
    async getUserInfById() {
      /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
      const { code, data } = await this.orderService.sendVerify(this.userInf.customerCode);
      if (code === '1') {
        const abc = data.data.account;
        console.log(abc);
        this.form.phone = abc.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
      console.log(this.form.phone);
    },
    showAddToCartToast(msg) {
      this.$refs.toast.open({
        type: 'success',
        content: msg,
        timeout: 2000,
      });
    },
    async changeNum(value, item, good) { // 修改购物车产品数量
      console.log(value);
      console.log(item);
      console.log(good);
      const timetamp = new Date().valueOf();
      const res = await this.vehicleService.addToCart({// 加入整车购物车
        ACTPRICE: good.ACTPRICE,
        ADVICEPRICE: good.ADVICEPRICE,
        BATERATE: good.BATERATE,
        CARCODE: item.IBR_MODELSCAR,
        CUSTUMER_TYPE: this.userInf.channelGroup,
        HeightLimit: item.IBR_HEIGHTLIMIT,
        IBL_LOSSRATE: good.LOSSRATE,
        IBL_TFSUMPRICE: good.IBL_TFSUMPRICE,
        IBR_KPF: '',
        IBR_SOLDTO_NAME: item.IBR_SENDTONAME,
        ICC_JDCODE: good.BASECODE,
        INVCODE: good.GBID,
        INVSORT: good.INVSORT,
        INVSTD: good.PRODUCTNAME,
        ISHeightFLAG: good.ISHEIGHTFLAG,
        JDPC_JDCODE: item.IBR_JDPC_JDCODE,
        JIDICAI: this.userInf.tagCode,
        MKTID: item.IBR_MKTID,
        NUM: value,
        PRODUCT_MODEL: good.IBL_PRODUCT_MODEL,
        SENDTO: item.IBR_DOOR,
        SENDTONAME: item.IBR_SENDTONAME,
        SEQ: item.IBR_SEQ,
        SUMTJ: 0,
        UNITPRICE: good.UNITPRICE,
        USERID: this.userInf.customerCode,
        YJMFID: good.IBL_MGCUSTCODE,
        ZCDeliveryType: item.IBR_ZCDELIVERYTYPE,
        ZCTYPECODE: item.IBR_ZCTYPECODE,
        farWeekCode: '',
        timestamp: timetamp,
      });
      console.log(res);
      if (res.code === '1') {
        this.queryCarList();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .vehicleCarList{
    min-height: 100vh;
    background: #F5F5F5;

    .uni-drawer__content {
      width: 608px !important;
    }
  }
  .vehicleCar-rouHead{
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 24px;
    font-weight: 300;
    color: #666666;
    padding: 20px 0 20px 40px;
  }
  .vehicleCar-invalid {
    padding: 0 24px 0 24px;
    margin-bottom: 40px;
  }
  .vehicleCar-high {
    background-color: #F5F5F5;
    height: 80px;
  }
  .vehicleCar-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
    background-color: #FFFFFF;
  }

</style>
