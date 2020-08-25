<template>
  <view class="order-confirm-accept">
    <view class="bg-style"></view>
    <view class="order-accept-head">
      <view class="order-accept-title">
        <i class="iconfont iconshijian"></i>
        订单已批量受理
      </view>
      <view class="order-accept-head-result">
        <view class="order-accept-result-count">
          <view class="w200 text-center">
            <view class="fs60 text-theme">10</view>
            <view class="fs24 text-666">成功</view>
          </view>
          <view class="w200 text-center">
            <view class="fs60 text-theme">10</view>
            <view class="fs24 text-666">失败</view>
          </view>
          <view class="w200 text-center">
            <view class="fs60 text-theme">10</view>
            <view class="fs24 text-666">合计</view>
          </view>
        </view>
        <view class="order-btn">
          <button class="order-btn-back">返回首页</button>
          <button class="order-btn-goon">继续购物</button>
        </view>
      </view>
    </view>
    <view class="order-accept-orderlist">
      <j-order-accept-item
        v-for="(item, index) in orderData"
        @orderDetail="orderDetail"
        :orderItem="item"
        :index="index"
        :key="index"
      >
      </j-order-accept-item>
    </view>
  </view>
</template>

<script>
import JOrderAcceptItem from '../../components/shoppingCart/JOrderAcceptItem';
import './css/orderConfirmAccept.scss';

export default {
  name: 'orderConfirmAccept',
  components: {
    JOrderAcceptItem
  },
  data() {
    return {
      orderData: [
      ],
      form: []
    };
  },
  created() {
    this.getOrderInfo();
  },
  onLoad(option) {
    if (option.groupings) {
      this.form = JSON.parse(option.groupings);
    }
  },
  methods: {
    // 获取订单信息
    async getOrderInfo() {
      const form = [
        {
          groupingNo: '20200824180216294530'
        }
      ];
      const { code, data } = await this.orderService.getOrderInfo(this.form);
      if (code === '1') {
        this.orderData = data;
      }
    },
    // 订单详情
    orderDetail(orderGroup) {
      const data = JSON.stringify(orderGroup);
      uni.navigateTo({
        url: `/pages/shoppingCart/orderConfirmAcceptDetail?orderGroup=${data}`
      });
    }
  }
};
</script>

<style scoped>

</style>
