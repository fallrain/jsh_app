<template>
  <view class="pos-r mb120">
    <view :key="updateIndex" class="JOrderConfirmAcceptDetailItem">
      <view class="item-head">
        <view class="item-row">
          <view class="item-row-left">
            订单号：<text class="text-999">{{orderItem.gvsOrderNo}}</text>
          </view>
          <view
            class="item-row-right">
            <view v-if="orderItem.status === '9'" class="pay-success">支付成功</view>
            <view v-else class="pay-fail">支付失败</view>
          </view>
        </view>
        <view v-if="orderItem.status !== '9'" class="item-row">
          失败原因：{{orderItem.errorMsg}}
        </view>
      </view>
      <view class="item-products">
        <view class="product-left">
          <image :src="orderItem.productImgUrl"></image>
        </view>
        <view class="product-right">
          <view class="text-333 fs28">{{orderItem.productName}}</view>
          <view class="text-333 fs20">预计到货时间：{{orderItem.planInDate}}</view>
          <view class="dis-flex">
            <view class="fs32 text-theme">
              {{orderItem.productPrice}}
              <text class="fs24 text-333">*{{orderItem.num}}</text>
            </view>
            <!--<view class="fs32 text-theme">{{orderItem.productTotalMoney}}</view>-->
          </view>
        </view>
      </view>
    </view>
    <view class="item-bottom">
      <view class="fs24">共计金额：</view>
      <view class="">{{orderItem.productTotalMoney}}</view>

    </view>
  </view>
</template>

<script>

export default {
  name: 'JOrderAcceptDetailItem',
  props: {
    // 单个订单
    orderItem: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number
    }
  },
  data() {
    return {
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
.JOrderConfirmAcceptDetailItem{
  position: relative;
  border-radius: 20px;
  background: #fff;
  padding: 24px;
  margin-bottom: 24px;
  z-index: 10;
  .item-head{
    position: relative;
    padding: 24px 0;
    border-bottom: 1px dashed $theme-color;
    .item-row{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item-row-left{
        color: #333;
        font-size: 28px;
      }
      .item-row-right{
        .pay-fail{
          width:208px;
          height:40px;
          text-align: center;
          font-size: 28px;
          background: #999;
          color: #fff;
          border-radius:20px;
        }
        .pay-success{
          width:208px;
          height:40px;
          text-align: center;
          font-size: 28px;
          background: $theme-color;
          border-radius:20px;
          color: #fff;
        }
      }
    }
    .item-head-left{
      font-size: 30px;
    }
    .item-head-right{
      font-size: 24px;
    }
  }
  .item-products{
    padding-top: 40px;
    display: flex;
    .product-left{
      width: 152px;
      height: 152px;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .product-right{
      flex-grow: 1;
    }
  }
}
.item-bottom{
  display: flex;
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: -100px;
  height: 120px;
  text-align: right;
  background: $theme-color;
  color: #fff;
  border-radius: 0 0 20px 20px;
  justify-content: flex-end;
  line-height: 120px;
  padding-right: 30px;
}
.mb120{
  margin-bottom: 120px;
}
.pos-r{
  position: relative;
}
.text-333{
  color: #333;
}
.text-999{
  color: #999;
}
.text-theme{
  color: $theme-color;
}
.fs28{
  font-size: 28px;
}
.fs32{
  font-size: 32px;
}
</style>
