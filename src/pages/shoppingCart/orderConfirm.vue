<template>
  <view class="orderConfirm">
    <j-order-confirm-address
    ></j-order-confirm-address>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import './css/orderConfirm.scss';


export default {
  name: 'orderConfirm',
  components: {
    JOrderConfirmAddress
  }
};
</script>
