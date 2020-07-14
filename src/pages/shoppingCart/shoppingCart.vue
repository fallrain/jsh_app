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
        :index="index"
        @change="goodsChange"
      ></j-shopping-cart-item>
    </view>
    <j-shopping-cart-btm
      :checked.sync="isCheckAll"
      @checkAll="checkAll"
    ></j-shopping-cart-btm>
  </view>
</template>
<script>
import JShoppingCartTab from '../../components/shoppingCart/JShoppingCartTab';
import JShoppingCartItem from '../../components/shoppingCart/JShoppingCartItem';
import JShoppingCartBtm from '../../components/shoppingCart/JShoppingCartBtm';
import './css/shoppingCart.scss';

export default {
  name: 'shoppingCart',
  components: {
    JShoppingCartBtm,
    JShoppingCartItem,
    JShoppingCartTab
  },
  data() {
    return {
      shoppingList: [
        {
          checked: false,
          isCreditMode: false
        },
        {
          checked: true,
          isCreditMode: false
        },
        {
          checked: false,
          isCreditMode: false
        },
        {
          checked: false,
          isCreditMode: false
        }
      ],
      // 是否全选
      isCheckAll: false
    };
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
    }
  }
};
</script>
