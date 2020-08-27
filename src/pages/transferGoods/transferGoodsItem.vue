<template>
  <view class="jGoodsItem">
    <view class="jGoodsItem-left" @tap="goNext">
      <image :src="goods.listImage"></image>
    </view>
    <view class="jGoodsItem-cnt">
      <view class="jGoodsItem-cnt-head">
        <view v-html="goods.name" class="jGoodsItem-cnt-goodsName j-goods-title">
        </view>
        <i
          :class="['transferDetailItem-detail-like','iconfont',goods.$favorite ? 'iconicon3':'iconshoucang1']"
          @tap="addFavorite(goods)"
        ></i>
      </view>
      <view class="jGoodsItem-cnt-price-tips">
        <view class="jGoodsItem-cnt-price-tips-item">直扣：{{jshUtil.arithmetic(goods.$PtPrice.rebateRate,100)}}%</view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：{{goods.$PtPrice.rebateMoney}}</view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：{{goods.$PtPrice.rebatePolicy | rebatePolicy}}</view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ {{goods.$PtPrice.invoicePrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥ {{goods.$PtPrice.supplyPrice}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：{{goods.stockNum}}</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box
          :value="goods.amount"
          :max="Number(goods.stockNum)"
          :disabled="Number(goods.stockNum) === 0"
          @change="goodsNumChange($event, goods)"
        ></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          :class="[isDisabled ? 'disabled' : 'jGoodsItem-cnt-opts-primary']"
          type="button"
          @tap="addTransfer(goods)"
          :disabled="isDisabled"
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
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'transferGoodsItem',
  components: {
    uniNumberBox
  },
  data() {
    return {
      ischecked: false,
      // 控制列表数据
      isShowList: false,
      value: 1,
      isDisposal: false,
      isDisabled: false
    };
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
  created() {
    this.showDisabled();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    }),
  },
  methods: {
    goodsNumChange(value, goods) {
      /* 商品数量change */
      if (goods.stockNum === 0) {
        value = 0;
      }

      goods.amount = value;
      // console.log(goods.amount, goods)
      // this.value = value
      // 改变价格
      this.goods.number = value;
      console.log(goods.amount);
      this.$emit('change', this.goods, this.index);
    },
    goNext() {
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?productCode=${this.goods.code}`
      });
    },
    addFavorite(goods) {
      console.log(goods);
      if (goods.$favorite) {
        // 取消收藏
        const removeInterest = this.customerService.removeInterestProduct({
          customerCode: this.saleInfo.customerCode,
          account: this.saleInfo.customerCode,
          productCodeList: [goods.code]
        });
      } else {
        // 添加收藏
        const addInterest = this.customerService.addInterestProduct({
          customerCode: this.saleInfo.customerCode,
          account: this.saleInfo.customerCode,
          productCode: goods.code
        });
      }
      goods.$favorite = !goods.$favorite;
      console.log(goods.$favorite);
    },
    // 加入调货
    addTransfer(goods) {
      console.log(goods);


      this.$emit('inserOrder', goods);
      this.$emit('query');
    },
    // 判断是否禁用加入调货
    showDisabled() {
      if (this.goods.stockNum) {
        console.log(false);
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
        console.log(true);
      }
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
  width: 238px;
  height: 238px;
  flex-shrink: 0;

  image {
    width: 100%;
    height: 100%;
  }
}

.jGoodsItem-cnt {
  flex-grow:1;
}
.jGoodsItem-cnt-head{
  position: relative;
}

.jGoodsItem-cnt-goodsName {
//   width:464px;
//   height:68px;
  font-size: 24px;
  font-weight: 400;
  color: #333;
  line-height: 34px;

}
.transferDetailItem-detail-like{
  width: 40px;
  font-size: 30px;
  position: absolute;
  right: 0px;
  top: 36px;
  color: #ED2856;
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
.disabled {
  background: #ccc;
  color: #fff;
}

.jGoodsItem-cnt-opts-default {
  @include jGoodsItem-cnt-opts-btn;
  background: #fff;
  color: #ED2856;
}
</style>
