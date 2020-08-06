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
        <view class="jGoodsItem-cnt-price-tips-item">直扣：{{jshUtil.arithmetic(goods.$PtPrice.rebateRate,100)}}%</view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：{{goods.$PtPrice.rebateMoney}}</view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：{{goods.$PtPrice.rebatePolicy | rebatePolicy}}</view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ {{goods.$PtPrice.invoicePrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥ {{goods.$PtPrice.supplyPrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：{{goods.stockList[0].qty}}</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box
          @change="goodsNumChange"
        ></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
          @tap="addTransfer"
        >加入调货</button>
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
  data() {
    return {
      ischecked: false,
       // 控制列表数据
      isShowList:false,
    }
  },
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => {
      }
    },
    // 商品下标
    index: {
      type: Number,
    },
    // 售达方编码
    saletoCode: {
      type: String,
      default: ''
    },
    // 送达方编码
    sendtoCode: {
      type: String,
      default: ''
    },
    // 所有版本的价格
    allPrice: {
      type: Object,
      default: () => {
      }
    }
  },
  methods:{
    addTransfer(){
       /* 添加到购物车 */
       /**
       ***添加到购物车
       *  product:Object
       *  是否有信用模式(0否1是)
       *  creditModel? : number,
       *  产品购买的数量
       *  number,
       *  价格类型
       *  priceType: string,
       *  价格版本号
       *  priceVersion: string,
       *  产品编码
       *  productCode,
       *  调货版本号
       *  stockVersion?: string,
       *  是否有周承诺(0否1是)
       *  weekPromise?: number
       *  */
      // const {
      //   productCode,
      //   activityType,
      //   activityId,
      //   priceType,
      //   number
      // } = this.goods;
      // debugger;
      // const {
      //   saletoCode,
      //   sendtoCode
      // } = this;
      // this.cartService.addToCart({
      //   // 商品组合编码
      //   activityId,
      //   // 组合类型(1单品2组合3抢购4套餐5成套)
      //   activityType: activityType || 1,
      //   // 购买的数量(组合就是组合的数量)
      //   number,
      //   //  促销活动价格类型
      //   //  PT:普通价格,TJ:特价,GC:工程,YJCY:样机出样(折扣样机),MFJK:免费机壳,MFYJ:免费样机,MFYJJS:免费样机结算,YPJ:样品机,CTYJ:成套样机
      //   priceType,
      //   // 价格版本号
      //   priceVersion: '',
      //   // 产品编码
      //   productCode,
      //   productList: [{
      //     // 是否有信用模式(0否1是)
      //     creditModel: 1,
      //     //  产品购买的数量
      //     number,
      //     //  价格类型
      //     priceType: 'PT',
      //     // 价格版本号
      //     priceVersion: '',
      //     // 产品编码
      //     productCode,
      //     //  调货版本号
      //     stockVersion: '',
      //     //  是否有周承诺(0否1是)
      //     weekPromise: '0'
      //   }],
      //   // 售达方编码
      //   saletoCode,
      //   // 送达方编码
      //   sendtoCode,
      //   // 版本调货版本号
      //   transferVersionCode: '',
      //   // 促销活动版本号
      //   versionCode: '',
      // });
    },
     goodsNumChange(val) {
      /* 商品数量change */
      this.goods.number = val;
      this.$emit('change', this.goods, this.index);
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
  font-weight:400;
  color: #333;
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
