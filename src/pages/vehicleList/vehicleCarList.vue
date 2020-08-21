<template>
  <view class="vehicleCarList">
    <view class="vehicleCar-rouHead">共{{NUM}}件宝贝</view>
    <view class="vehicleCar-invalid" v-if="puTongList.length>0">
      <vehicle-cart-item v-for="(goods,index) in puTongList" :key="index" @pullDetail="pullDetail"
      :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item>
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
    <view class="vehicleCar-foot"><vehicle-car-foot></vehicle-car-foot></view>
  </view>
</template>

<script>
import vehicleCarFoot from '../../components/vehicleList/vehicleCarFoot';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import vehicleCartItem from '../../components/vehicleList/vehicleCartItem';
import vehicleCartItemGD from '../../components/vehicleList/vehicleCartItem-gd';
import vehicleCartItemPC from '../../components/vehicleList/vehicleCartItem-pc';
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
    vehicleCartItemPC
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  data() {
    return {
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
    this.getPayerList(); // 获取付款方接口
  },
  methods: {
    async queryCarList() {
      const timetamp = new Date().valueOf();
      const longfeiUSERID = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.queryCarList(timetamp, longfeiUSERID);
      if (code === '1') {
        console.log('整车购物车查询');
        console.log(data);
        this.NUM = 0;
        data.data.forEach((inf) => {
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
    },
    async getPayerList() {
      const { code, data } = await this.customerService.getcustomersList(this.userInf.saletoCode, {
        salesGroupCode: this.userInf.salesGroupCode,
        status: 1
      });
      if (code === '1') {
        this.payerList = data;
        this.currentPayer = data[0];
        this.payerList[0].choosed = true;
      }
    },
    goodsChange(item, index) {
      console.log('222222');
      console.log(item);
      console.log(index);
    },
    pullDetail(item) {
      // console.log(item);
      // console.log(index);
      item.orderList.forEach(async (inf) => {
        const gbid = inf.GBID;
        const longfeiUSERID = this.userInf.saletoCode;
        const longfeiMFID = this.userInf.sendtoCode;
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
    }
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
