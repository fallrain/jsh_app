<template>
  <view class="order-info-con">
    <view class="order-info-head">
      <button type="button" class="order-info-head-btn">组合</button>
      <text class="order-info-head-text">整单订单：202006191745435</text>
    </view>
    <view :class="showler ? '' : 'showType'">
      <view class="order-info-cnt">
        <view class="order-info-cnt-img">
          <image src="@/assets/img/goods/example-fridge.jpg" style="width: 100%;height: 100%;"></image>
        </view>
        <view>
          <view class="order-info-cnt-text">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">单价<span class="order-info-cnt-price">¥1799.00</span></view>
            <view class="order-info-cnt-info">X&nbsp;3</view>
          </view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">预定金比例：<span style="color: #ED2856; padding-right: 5px;">45%</span> | 尾款：<span style="color: #ED2856;">45%</span>  </view>
          </view>
        </view>
      </view>
      <view class="order-info-line"></view>
      <view class="order-info-cnt">
        <view class="order-info-cnt-img">
          <image src="@/assets/img/goods/example-fridge.jpg" style="width: 100%;height: 100%;"></image>
        </view>
        <view>
          <view class="order-info-cnt-text">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">单价<span class="order-info-cnt-price">¥1799.00</span></view>
            <view class="order-info-cnt-info">X&nbsp;3</view>
          </view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">预定金比例：<span style="color: #ED2856; padding-right: 5px;">45%</span> | 尾款：<span style="color: #ED2856;">45%</span>  </view>
          </view>
        </view>
      </view>
      <view class="order-info-line"></view>
      <view class="order-info-cnt">
        <view class="order-info-cnt-img">
          <image src="@/assets/img/goods/example-fridge.jpg" style="width: 100%;height: 100%;"></image>
        </view>
        <view>
          <view class="order-info-cnt-text">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">单价<span class="order-info-cnt-price">¥1799.00</span></view>
            <view class="order-info-cnt-info">X&nbsp;3</view>
          </view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">预定金比例：<span style="color: #ED2856; padding-right: 5px;">45%</span> | 尾款：<span style="color: #ED2856;">45%</span>  </view>
          </view>
        </view>
      </view>
      <view class="order-info-line"></view>
      <view class="order-info-cnt">
        <view class="order-info-cnt-img">
          <image src="@/assets/img/goods/example-fridge.jpg" style="width: 100%;height: 100%;"></image>
        </view>
        <view>
          <view class="order-info-cnt-text">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">单价<span class="order-info-cnt-price">¥1799.00</span></view>
            <view class="order-info-cnt-info">X&nbsp;3</view>
          </view>
          <view class="order-info-cnt-inf">
            <view class="order-info-cnt-info">预定金比例：<span style="color: #ED2856; padding-right: 5px;">45%</span> | 尾款：<span style="color: #ED2856;">45%</span>  </view>
          </view>
        </view>
      </view>
    </view>
    <view class="order-info-show" @click="showLer">{{showler ? '收起' : '展开'}}<view :class="['iconfont iconxia',showler && 'order-info-active']" style="padding-left: 4px;padding-top: 4px;"></view></view>
  </view>
</template>

<script>
export default {
  name: 'orderDetailInfo',
  data() {
    return {
      showler: false
    };
  },
  methods: {
    showLer() {
      this.showler = !this.showler;
      console.log(this.showler);
    }
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
