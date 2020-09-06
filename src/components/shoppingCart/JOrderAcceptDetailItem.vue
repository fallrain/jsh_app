<template>
  <view class="pos-r mb120">
    <view class="JOrderConfirmAcceptDetailItem">
      <view v-if="status===1" class="item-head fs28">
        <view class="item-row mb12">
          <view class="item-row-left">
            订单号：<text class="text-999">{{orderItem.orderType}}{{orderItem.orderNo}}</text>
          </view>
          <view
            class="item-row-right">
            <view v-if="orderItem.status === '9'" class="pay-success">支付成功</view>
            <view v-else class="pay-fail">支付失败</view>
          </view>
        </view>
        <view class="dis-flex text-333 mb12">
          付款方：
          <view class="text-999">({{orderItem.paytoCode}}){{orderItem.paytoName}}</view>
        </view>
        <view class="dis-flex text-333 mb12">
          下单日期：
          <view class="text-999">{{orderItem.placeOrderDate}}</view>
        </view>
        <view class="dis-flex text-333 mb12">
          满足方式：
          <view class="text-999">{{orderItem.stockTypeName}}</view>
        </view>
        <view class="dis-flex text-333 mb12">
          GVS单号：
          <view class="text-999">{{orderItem.gvsOrderNo}}</view>
        </view>
        <view v-if="orderItem.status !== '9'" class="dis-flex text-333">
          <view class="w410">失败原因：</view>
          <view class="text-999">{{orderItem.errorMsg}}</view>
        </view>
      </view>
      <view v-if="status===2" class="item-head br-b-primary">
        <view class="item-row">
          <view class="item-row-left">
            调货单号：<text class="text-primary">{{orderItem.IBL_KORDERNO}}</text>
          </view>
          <view
            class="item-row-right">
            <view v-if="orderItem.ISFLAG === '提交成功'" class="pay-success">{{orderItem.ISFLAG}}</view>
            <view v-else class="pay-fail">{{orderItem.ISFLAG}}</view>
          </view>
        </view>
        <view class="item-row">
          <view class="">
            下单日期：<text class="text-999">{{orderItem.IBL_CREATETIME}}</text>
          </view>
        </view>
      </view>
      <view v-if="status===1" class="item-products">
        <view class="product-left">
          <image :src="orderItem.productImgUrl"></image>
        </view>
        <view class="product-right">
          <view class="text-333 fs28">{{orderItem.productName}}</view>
          <view class="text-333 fs20">预计到货时间：{{orderItem.planInDate}}</view>
          <view class="dis-flex">
            <view class="fs32 text-theme">
              {{toFixedNum(orderItem.productPrice)}}
              <text class="fs24 text-333">*{{orderItem.num}}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="status===2" class="fs28 mt32">
        <view class="lh40 fs32 mb12">
          {{orderItem.IBL_INVSTD}}
        </view>
        <view class="dis-flex text-333 fs28">
          <view class="dis-flex">
            <view class="">
              采购数量：
              <text class="fs28 text-999">{{orderItem.IBL_NUM}}</text>
            </view>
          </view>
        </view>
        <view v-if="orderItem.ISFLAG === '提交失败'" class="item-row">
          说明：<text class="">{{orderItem.IBL_ERRORMESSAGE}}</text>
        </view>
      </view>
    </view>
    <view
      :class="['item-bottom', status===2&&'bg-primary']">
      <view class="fs24">共计金额：</view>
      <view v-if="status===2" class="">{{toFixedNum(orderItem.IBL_SUMMONEY)}}</view>
      <view v-if="status===1" class="">{{toFixedNum(orderItem.productTotalMoney)}}</view>
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
    status: {
      type: [Number, String]
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
  created() {
    console.log(this.orderItem);
  },
  computed: {
    toFixedNum() {
      return function (val) {
        return (new Number(val)).toFixed(2);
      };
    }
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
      font-size: 28px;
      margin-bottom: 12px;
      .item-row-left{
        color: #333;
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
.JOrderConfirmAcceptDetailItem:before{
  content: "";
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-block;
  background: #F5F5F5;
  position: absolute;
  bottom:60px;
  left: -20px;
  transform:translateY(-50%);
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
.br-b-primary{
  border-bottom: 2px solid #2283E2 !important;
}
.mb120{
  margin-bottom: 120px;
}
.mt32{
  margin-top: 32px;
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
.text-primary{
  color: #2283E2 !important;
}
.bg-primary{
  background: #2283E2 !important;
}
.lh40{
  line-height: 40px;
}
.fs28{
  font-size: 28px;
}
.fs32{
  font-size: 32px;
}
.w410{
  width: 410px;
}
</style>
