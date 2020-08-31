<template>
  <view :key="updateIndex" class="JOrderConfirmAcceptItem">
    <view class="item-head">
      <view
        :class="['item-head-left', status===2&&'text-primary']">
        {{index+1}}.订单信息
      </view>
      <view
        @tap="orderDetail"
        :class="['item-head-right', status===2&&'text-primary']"
        >
        点击查看详情
      </view>
    </view>
    <view v-if="status === 1">
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
    <view v-if="status === 2">
      <view class="item-content">
        系统单号：{{orderItem.SEQ}}
      </view>
      <view class="item-content">
        预计到货时间：{{orderItem.PLANINDATE}}
      </view>
      <view class="item-content">
        总装车体积：{{orderItem.ONEVOLUME}}
      </view>
      <view class="item-content">
        库位：{{orderItem.OUTWHNAME}}
      </view>
      <view class="item-content">
        总计：{{orderItem.TOTALPRICES}}
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'JOrderAcceptItem',
  props: {
    status: {
      type: [String, Number]
    },
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
