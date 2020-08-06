<template>
  <view class="vehicleCarList">
    <view class="vehicleCar-rouHead">共4件宝贝</view>
    <view class="vehicleCar-invalid">
      <vehicle-cart-item v-for="(goods,index) in shoppingList" :key="index"
      :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item>
    </view>
    <view class="vehicleCar-invalid">
      <vehicle-cart-item-g-d v-for="(goods,index) in shoppingList" :key="index"
                         :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item-g-d>
    </view>
    <view class="vehicleCar-invalid">
      <vehicle-cart-item-p-c v-for="(goods,index) in shoppingList" :key="index"
                             :goods="goods" :index="index" @change="goodsChange"></vehicle-cart-item-p-c>
    </view>
    <view class="vehicleCar-invalid">
      <t-failure-goods-list :list="failureGoodsList" @change="failureGoodsListChange"></t-failure-goods-list>
    </view>
    <view class="vehicleCar-foot"><vehicle-car-foot></vehicle-car-foot></view>
  </view>
</template>

<script>
import vehicleCarFoot from '../../components/vehicleList/vehicleCarFoot';
import TFailureGoodsList from '../../components/transfer/TFailureGoodsList';
import vehicleCartItem from '../../components/vehicleList/vehicleCartItem';
import vehicleCartItemGD from '../../components/vehicleList/vehicleCartItem-gd';
import vehicleCartItemPC from '../../components/vehicleList/vehicleCartItem-pc';

export default {
  name: 'vehicleCarList',
  components: {
    vehicleCarFoot,
    TFailureGoodsList,
    vehicleCartItem,
    vehicleCartItemGD,
    vehicleCartItemPC
  },
  data() {
    return {
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
      failureGoodsList: [
        {
          checked: false,
        },
        {
          checked: false,
        }

      ]
    };
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
  }
  .vehicleCar-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
    background-color: #FFFFFF;
  }

</style>
