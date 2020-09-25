<template>
  <view class="order-info-con">
    <view class="order-info-head">
      <button type="button" class="order-info-head-btn">组合</button>
      <text class="order-info-head-text">{{titleAndNoFun}}</text>
    </view>
    <view class="showType">
      <view class="order-info-cnt" v-for="(product,index) in info.details" :key="index">
        <view class="order-info-cnt-img">
          <image :src="product.jshd_product_img" style="width: 100%;height: 100%;"></image>
        </view>
        <view>
          <view class="order-info-cnt-text">{{product.jshd_product_name}}</view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">
              单价
              <span v-if="product.jshd_invoice_price" class="order-info-cnt-price">
                ¥{{parseFloat(product.jshd_invoice_price).toFixed(2)}}
              </span>
              <span v-else class="order-info-cnt-price">--</span>
            </view>
            <view class="order-info-cnt-info">X&nbsp;{{product.jshd_qty}}</view>
          </view>
          <view class="order-info-cnt-inf" v-if="product.jshd_pre_amount&&product.jshd_pre_amount!==''">
            <view class="order-info-cnt-info">预定金比例：<span style="color: #ED2856; padding-right: 5px;">{{(product.jshd_pre_rate*1).toFixed(2)}}%</span> | 尾款：<span style="color: #ED2856;">{{(parseFloat(product.jshd_invoice_price) - parseFloat(product.jshd_pre_amount)).toFixed(2)}}</span>  </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'orderDetailInfo',
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  created() {
  },
  data() {
    return {
    };
  },
  computed: {
    titleAndNoFun() {
      if (this.info.details[0].jshd_price_type === 'MFYJ') {
        return `版本号:${this.info.details[0].jshd_price_version}`;
      }
      return `整单订单：${this.info.info.jshi_grouping_no}`;
    },
  },
  methods: {
  }
};
</script>

<style scoped>
  .order-info-con {
    border-radius: 20px;
    background-color: #FFFFFF;
    margin: 24px;
  }
  .order-info-head {
    position: relative;
    display: flex;
    align-items: center;
    color: #333;
    font-size: 16px;
    padding-left: 20px;
    padding-top: 20px;
  }
  .order-info-head-btn {
    display: inline-block;
    flex-shrink: 0;
    max-width: 86px;
    background: #ED2856;
    border-radius: 16px;
    color: #FFFFFF;
    font-size: 24px;
    padding-left: 10px;
    padding-right: 10px;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  .order-info-head-text {
    color: #666666;
    font-size: 24px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .order-info-cnt {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 26px;
    padding-bottom: 20px;
    padding-right: 16px;
  }
  .order-info-cnt-img {
    flex-shrink: 0;
    width: 152px;
    height: 152px;
  }
  .order-info-cnt-text {
    font-weight: 400;
    color: #333333;
    font-size: 28px;
    line-height: 40px;
    padding-right: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .order-info-cnt-inf {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100%;
  }
  .order-info-cnt-info {
    margin-top: 6px;
    margin-right: 30px;
    color: #999999;
    font-size: 20px;
  }
  .order-info-cnt-price {
    color: #ED2856;
    font-weight:400;
    font-size:36px;
    padding-left: 10px;
  }
  .order-info-line {
    background-color: #DBDBDB;
    height: 1px;
    margin-left: 20px;
  }
  .order-info-show {
    display: flex;
    padding-left: 45%;
    color: #999999;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .showType{
    max-height:520px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden
  }
  .order-info-active {
    transform: rotateX(180deg);
  }

</style>
