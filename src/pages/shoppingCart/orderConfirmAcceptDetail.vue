<template>
  <view class="orderAcceptDetail">
    <view v-if="status === 1">
      <j-order-accept-detail-item
        v-for="(item, index) in orderGroupInfo.bigOrderDetailList"
        :orderItem="item"
        :status="status"
        :key="index"
      >
      </j-order-accept-detail-item>
    </view>
    <!--调货详情-->
    <view v-if="status === 2">
      <j-order-accept-detail-item
        v-for="(item, index) in orderGroupInfo.orderList"
        :orderItem="item"
        :status="status"
        :key="index"
      >
      </j-order-accept-detail-item>
    </view>
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
      orderGroupInfo: {},
      status: 1
    };
  },
  onLoad(options) {
    if (options.orderGroup) {
      this.orderGroupInfo = JSON.parse(options.orderGroup);
      console.log(this.orderGroupInfo);
      this.status = JSON.parse(options.status);
      if (this.status === 2) {
        this.dealPrice();
      }
    }
  },
  methods: {
    // 处理总价格的数据格式
    dealPrice() {
      this.orderGroupInfo.orderList.forEach((item) => {
        item.IBL_SUMMONEY = item.IBL_SUMMONEY.slice(0, -2);
      });
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
