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
    <view class="mt24">
      <j-failure-order-item
        :goodsList="failureGoodsList"
      ></j-failure-order-item>
    </view>
    <view class="mt24">
      <j-overage-pay
      ></j-overage-pay>
    </view>
    <view class="orderConfirm-btm j-flex-aic">
      <view class="orderConfirm-btm-text">实付总额：</view>
      <view class="orderConfirm-btm-price">¥22383945.12</view>
      <button
        type="button"
        class="orderConfirm-btm-btn ml20"
      >下一步</button>
    </view>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import JOrderConfirmItem from '../../components/shoppingCart/JOrderConfirmItem';
import JFailureOrderItem from '../../components/shoppingCart/JFailureOrderItem';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import './css/orderConfirm.scss';

export default {
  name: 'orderConfirm',
  components: {
    JOveragePay,
    JFailureOrderItem,
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
      ],
      failureGoodsList: [
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
