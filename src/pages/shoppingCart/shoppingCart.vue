<template>
  <view class="shoppingCart">
    <j-shopping-cart-tab>
      <template #right>
        <view class="shoppingCart-tab-picker">
          <text class="mr8">产业</text>
          <i class="iconfont iconxia"></i>
        </view>
      </template>
    </j-shopping-cart-tab>
    <view class="shoppingCart-ads">
      <view class="shoppingCart-ads-total">共4件宝贝</view>
      <view class="shoppingCart-ads-detail">
        <view class="iconfont iconicon-"></view>
        <text>配送至：青岛市李沧区重庆中路792青岛市李沧区重庆中路792青岛市李沧区重庆中路792</text>
      </view>
    </view>
    <view class="shoppingCart-list">
      <j-shopping-cart-item
        v-for="(goods,index) in shoppingList"
        :key="index"
        :goods="goods"
      ></j-shopping-cart-item>
    </view>
  </view>
</template>
<script>
import JShoppingCartTab from '../../components/shoppingCart/JShoppingCartTab';
import JShoppingCartItem from '../../components/shoppingCart/JShoppingCartItem';
import './css/shoppingCart.scss';

export default {
  name: 'shoppingCart',
  components: {
    JShoppingCartItem,
    JShoppingCartTab
  },
  data() {
    return {
      shoppingList: [
        {
          checked: false
        },
        {
          checked: true
        },
        {
          checked: false
        },
        {
          checked: false
        }
      ]
    };
  },
};
</script>
