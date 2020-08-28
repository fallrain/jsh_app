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
            <view class="fs60 text-theme">{{successNum}}</view>
            <view class="fs24 text-666">成功</view>
          </view>
          <view class="w200 text-center">
            <view class="fs60 text-theme">{{failNum}}</view>
            <view class="fs24 text-666">失败</view>
          </view>
          <view class="w200 text-center">
            <view class="fs60 text-theme">{{total}}</view>
            <view class="fs24 text-666">合计</view>
          </view>
        </view>
        <view class="order-btn">
          <button @tap="goBackIndex" class="order-btn-back">返回首页</button>
          <button @tap="continueShopping" class="order-btn-goon">继续购物</button>
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
        :status="status"
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
      status: 1, // 1 购物车、套餐、组合 2 调货
      seqList: '', // 调货购物车下单成功后 订单号
      total: 0,
      successNum: 0,
      failNum: 0,
      orderData: [
      ],
      form: []
    };
  },
  created() {
  },
  onLoad(option) {
    if (option.groupings) {
      this.status = 1;
      this.form = JSON.parse(option.groupings);
      this.getOrderInfo();
    }
    if (option.seqList) {
      // 调货购物车下单成功之后
      this.status = 2;
      this.seqList = option.seqList;
      this.orderData = option.orderData;
    }
  },
  methods: {
    // 获取订单信息
    async getOrderInfo() {
      /* const form = [
        {
          groupingNo: '20200824180216294530'
        }
      ]; */
      const { code, data } = await this.orderService.getOrderInfo(this.form);
      if (code === '1') {
        this.orderData = data;
        // 处理成功失败数量
        this.computeOrderNum();
      }
    },
    // 统计订单成功失败数量
    computeOrderNum() {
      let successNum = 0;
      let failNum = 0;
      this.orderData.forEach((item) => {
        item.bigOrderDetailList.forEach((v) => {
          if (v.status === '9') {
            // 成功订单
            successNum++;
          } else {
            // 失败订单
            failNum++;
          }
        });
      });
      this.successNum = successNum;
      this.failNum = failNum;
      this.total = successNum + failNum;
    },
    // 订单详情
    orderDetail(orderGroup) {
      const data = JSON.stringify(orderGroup);
      uni.navigateTo({
        url: `/pages/shoppingCart/orderConfirmAcceptDetail?orderGroup=${data}`
      });
    },
    // 返回首页
    goBackIndex() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    // 继续购物
    continueShopping() {
      uni.navigateTo({
        url: '/pages/goods/goodsList'
      });
    },
  }
};
</script>

<style scoped>

</style>
