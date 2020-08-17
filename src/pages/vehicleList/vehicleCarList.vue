<template>
  <view class="vehicleCarList">
    <view class="vehicleCar-rouHead">共4件宝贝</view>
    <view class="vehicleCar-invalid" v-if="puTongList.length>0">
      <vehicle-cart-item v-for="(goods,index) in puTongList" :key="index"
      :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item>
    </view>
    <view class="vehicleCar-invalid" v-if="guaDanList.length>0">
      <vehicle-cart-item-g-d v-for="(goods,index) in guaDanList" :key="index"
             :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item-g-d>
    </view>
    <view class="vehicleCar-invalid" v-if="pingCheList.length>0">
      <vehicle-cart-item-p-c v-for="(goods,index) in pingCheList" :key="index"
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
      SEQ: '', // 整车购物车进入传单号
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
  },
  methods: {
    async queryCarList() {
      const timetamp = new Date().valueOf();
      const longfeiUSERID = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.queryCarList(timetamp, longfeiUSERID);
      if (code === '1') {
        console.log('整车购物车数量查询');
        console.log(data);
        data.data.forEach((inf) => {
          if (inf.IBR_ISFLAG === '失效产品' && inf.orderList.length > 0) {
            inf.checked = false;
            inf.typpe = 'ZC';
            this.failureGoodsList.push(inf);
          }
          if (inf.IBR_ISFLAG === '普通整车' && inf.orderList.length > 0) {
            inf.checked = false;
            this.puTongList.push(inf);
          }
          if (inf.IBR_ISFLAG === '拼车订单' && inf.orderList.length > 0) {
            inf.checked = false;
            this.pingCheList.push(inf);
          }
          if (inf.IBR_ISFLAG === '我的挂单' && inf.orderList.length > 0) {
            inf.checked = false;
            this.guaDanList.push(inf);
          }
        });
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
    height: 40px;
  }
  .vehicleCar-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
    background-color: #FFFFFF;
  }

</style>
