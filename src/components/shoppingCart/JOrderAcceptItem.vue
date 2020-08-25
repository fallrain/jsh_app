<template>
  <view :key="updateIndex" class="JOrderConfirmAcceptItem">
    <view class="item-head">
      <view class="item-head-left">
        {{index+1}}.订单信息
      </view>
      <view
        @tap="orderDetail"
        class="item-head-right">
        点击查看详情
      </view>
    </view>
    <view class="item-content">
      整单：{{orderItem.groupingCode}}
    </view>
    <view class="item-content">
      整单金额：{{orderItem.payAmount}}
    </view>
    <view class="item-content">
      送达方：{{orderItem.sendtoAddress}}
    </view>
  </view>
</template>

<script>

export default {
  name: 'JOrderAcceptItem',
  props: {
    // 单个订单
    orderItem: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number
    },
    // 付款方信息
    payInfoData: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      updateIndex: 1,
      baseUrl: process.env.BASE_URL,
      // 配送地址显示隐藏
      payerPickerShow: false,
      // 配送地址options
      payerOptions: {},
      // 选中的
      chosePayerOptions: {},
      currentchosePayerOption: [],
      currentPayer: {},
      currentOrderNo: ''
    };
  },
  onLoad() {
  },
  computed: {
  },
  methods: {
    orderDetail() {
      this.$emit('orderDetail', this.orderItem);
    },
  }
};
</script>

<style lang="scss">
.JOrderConfirmAcceptItem{
  border-radius: 20px;
  background: #fff;
  padding: 24px;
  margin-bottom: 24px;
}
.item-head{
  padding-bottom: 14px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  color: $theme-color;
  border-bottom: 1px solid #DBDBDB;
  .item-head-left{
    font-size: 30px;
  }
  .item-head-right{
    font-size: 24px;
  }
}
.item-content{
  line-height: 40px;
  font-size: 28px;
  color: #666;
  margin-bottom: 16px;
}
</style>
