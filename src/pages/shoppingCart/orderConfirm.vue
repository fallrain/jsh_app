<template>
  <view class="orderConfirm">
    <j-order-confirm-address
    ></j-order-confirm-address>
    <view class="orderConfirm-list">
      <j-order-confirm-item
        v-for="(goods,index) in goodsList"
        :key="index"
        @change="goodsChange"
        :goodsList="goods"
      ></j-order-confirm-item>
    </view>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import JOrderConfirmItem from '../../components/shoppingCart/JOrderConfirmItem';
import './css/orderConfirm.scss';

export default {
  name: 'orderConfirm',
  components: {
    JOrderConfirmItem,
    JOrderConfirmAddress
  },
  data() {
    return {
      goodsList: [
        [
          {
            isCreditMode: false
          },
          {
            isCreditMode: false
          }
        ]
      ]
    };
  },
  methods: {
    goodsChange(list, index) {
      /* 商品 change */
      this.goodsList[index] = list;
    }
  }
};
</script>
