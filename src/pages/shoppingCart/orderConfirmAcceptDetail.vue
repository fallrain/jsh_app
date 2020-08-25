<template>
  <view class="orderAcceptDetail">
    <j-order-accept-detail-item
      v-for="(item, index) in orderGroupInfo.bigOrderDetailList"
      :orderItem="item"
      :key="index"
    >
    </j-order-accept-detail-item>
  </view>
</template>

<script>
import JOrderAcceptDetailItem from '../../components/shoppingCart/JOrderAcceptDetailItem';

export default {
  name: 'orderConfirmAcceptDetail',
  components: {
    JOrderAcceptDetailItem
  },
  data() {
    return {
      orderGroupInfo: {}
    };
  },
  onLoad(options) {
    if (options.orderGroup) {
      this.orderGroupInfo = JSON.parse(options.orderGroup);
    }
  }
};
</script>

<style lang="scss">
  .orderAcceptDetail{
    position: relative;
    min-height: 100vh;
    background: #F5F5F5;
    padding: 24px 24px 140px 24px;
  }
</style>
