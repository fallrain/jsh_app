<template>
  <view class="jGoodsItem">
    <view class="jGoodsItem-left">
      <image :src="goods.listImage"></image>
    </view>
    <view class="jGoodsItem-cnt">
      <view class="jGoodsItem-cnt-goodsName j-goods-title">
        {{goods.name}}
      </view>
      <view class="jGoodsItem-cnt-price-tips">
        <view class="jGoodsItem-cnt-price-tips-item">直扣：92.31%</view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：COM</view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：0</view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ 3456.00</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥5892.21</view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：3434</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
        >加入调货</button>
        <!-- <button
          class="jGoodsItem-cnt-opts-default ml26"
          type="button"
        >加入调货</button> -->
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
// import './css/jGoodsItem.scss';

export default {
  name: 'transferGoodsItem',
  components: {
    uniNumberBox
  },
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .uni-numbox {
    width:154px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius:8px;
  
}

::v-deep .uni-numbox--text {
    font-size:28px;
    color: #999;
}

::v-deep  .uni-numbox__value {
    width: 58px;
    min-height: auto;
    height: 40px;
    font-size: 28px;
  }

::v-deep  .uni-numbox__value {
    color: #999;
  }

::v-deep  .uni-numbox__plus{
    width: 50px;
    height: 40px;
    line-height: 50px;
    border-left:1px solid rgba(221,221,221,1);
  }
::v-deep  .uni-numbox__minus {
    width: 50px;
    height: 40px;
    line-height: 50px;
    border-right:1px solid rgba(221,221,221,1);
  }
.jGoodsItem {
  display: flex;
  padding: 24px;
  border-bottom: 1px solid #F5F5F5;
  background: #fff;

  &:last-child {
    border-bottom: 0;
  }

  &:first-child {
    border-bottom: 1px solid #F5F5F5;
  }

 
}

.jGoodsItem-left {
  width:238px;
  height:238px;
  flex-shrink: 0;

  image {
    width: 100%;
    height: 100%;
  }
}

.jGoodsItem-cnt {
  flex-grow:1;
}

.jGoodsItem-cnt-goodsName {
//   width:464px;
//   height:68px;
  font-size:24px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:34px;

}

.jGoodsItem-cnt-price-tips {
  margin-top: 12px;
}

.jGoodsItem-cnt-price-tips-item {
  display: inline-block;
  padding: 2px 8px;
  line-height: 28px;
  color: #999;
  background: #F2F2F7;
  font-size: 20px;
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
}

.jGoodsItem-cnt-price-inf {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;
}

.jGoodsItem-cnt-price {
  margin-right: 20px;
  color: #ED2856;
  font-size: 32px;
}

.jGoodsItem-cnt-price-inf-item {
  margin-right: 20px;
  color: #666;
  font-size: 20px;
}

.jGoodsItem-cnt-opts {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

@mixin jGoodsItem-cnt-opts-btn {
  display: inline-block;
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 40px;
  font-size: 24px;
  border-radius: 8px;
}

.jGoodsItem-cnt-opts-primary {
  @include jGoodsItem-cnt-opts-btn;
  background: #ED2856;
  color: #fff;
}

.jGoodsItem-cnt-opts-default {
  @include jGoodsItem-cnt-opts-btn;
  background: #fff;
  color: #ED2856;
}
</style>
