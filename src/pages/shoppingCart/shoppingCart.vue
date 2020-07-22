<template>
  <view class="shoppingCart">
    <j-tab
      :tabs="tabs"
      :hasRightSlot="true"
      @tabClick="tabClick"
    >
      <template #right>
        <view class="shoppingCart-tab-picker">
          <text class="mr8">产业</text>
          <i class="iconfont iconxia"></i>
        </view>
      </template>
    </j-tab>
    <view class="shoppingCart-ads">
      <view class="shoppingCart-ads-total">共4件宝贝</view>
      <view
        class="shoppingCart-ads-detail"
        @tap="showAdsPicker"
      >
        <view class="iconfont iconlocal"></view>
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
    <j-failure-goods-list
      :list="failureGoodsList"
      @change="failureGoodsListChange"
    ></j-failure-goods-list>
    <j-shopping-cart-btm
      :checked.sync="isCheckAll"
      @checkAll="checkAll"
    ></j-shopping-cart-btm>
    <j-address-picker
      :show.sync="isShowAdsPicker"
    ></j-address-picker>
  </view>
</template>
<script>
import JShoppingCartItem from '../../components/shoppingCart/JShoppingCartItem';
import JShoppingCartBtm from '../../components/shoppingCart/JShoppingCartBtm';
import JFailureGoodsList from '../../components/shoppingCart/JFailureGoodsList';
import JAddressPicker from '../../components/shoppingCart/JAddressPicker';
import JTab from '../../components/common/JTab';
import './css/shoppingCart.scss';


export default {
  name: 'shoppingCart',
  components: {
    JTab,
    JAddressPicker,
    JFailureGoodsList,
    JShoppingCartBtm,
    JShoppingCartItem,
  },
  data() {
    return {
      tabs: [
        {
          id: 'gwc',
          name: '购物车',
          active: true
        },
        {
          id: 'zc',
          name: '整车直发',
          active: false
        },
        {
          id: 'zx',
          name: '中心调货',
          active: false
        },
        {
          id: 'zx2',
          name: '中心调货',
          active: false
        },
        {
          id: 'zx3',
          name: '中心调货',
          active: false
        },
        {
          id: 'zx4',
          name: '中心调货',
          active: false
        }
      ],
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
      failureGoodsList: [
        {
          checked: false,
        },
        {
          checked: false,
        },
        {
          checked: false,
        }
      ],
      // 是否全选
      isCheckAll: false,
      // 是否显示配送地址选择
      isShowAdsPicker: false
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
    },
    failureGoodsListChange(list) {
      this.failureGoodsList = list;
    },
    showAdsPicker() {
      /* 地址选择展示 */
      this.isShowAdsPicker = true;
    },
    tabClick(tabs) {
      this.tabs = tabs;
    }
  }
};
</script>
