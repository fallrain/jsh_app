<template>
  <uni-popup ref="pop" type="bottom" @change="change">
    <view class="pro-num-pop">
      <view @tap="close" class="pro-num-head">
        <view class="pro-num-head-title"></view>
        <view class="pro-num-head-but">X</view>
      </view>
      <view class="pro-num-pop-detail-wrap">
        <view class="uni-flex uni-row">
          <view class="text uni-flex" style="width: 88px;height: 88px;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
            <image :src="infos.images[0].masterImage" style="width: 88px;height: 88px;"></image>
          </view>
          <view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;padding-left: 20px;">
            <view class="uni-flex uni-row" style="font-size: 16px;color: #333333;">
              {{infos.product.productName}}
            </view>
            <view class="uni-flex uni-row">
              <view style="font-size: 20px;color: #ED2856;"> ¥ {{infos.price.invoicePrice.toFixed(2)}}</view>
            </view>
          </view>
        </view>
        <view class="pro-num-line"></view>
        <view class="pro-num-pop-wrap">
          <view class="pro-num-pop-wrap2 mb8">
            <view class="pro-num-pop-name">供&nbsp;&nbsp;&nbsp;价：</view>
            <view class="pro-num-pop-val">￥ {{infos.price.supplyPrice}}</view>
          </view>
          <view class="pro-num-pop-wrap2 mb8">
            <view class="pro-num-pop-name">台&nbsp;&nbsp;&nbsp;返：</view>
            <view class="pro-num-pop-val">{{infos.price.rebateMoney}}</view>
          </view>
        </view>
        <view class="pro-num-pop-wrap">
          <view class="pro-num-pop-wrap2">
            <view class="pro-num-pop-name">返&nbsp;&nbsp;&nbsp;利：</view>
            <view class="pro-num-pop-val">
              <span v-if="infos.price.rebatePolicy===0">COM</span>
              <span v-else-if="infos.price.rebatePolicy===1">BF</span>
              <span v-else-if="infos.price.rebatePolicy===2">FHQ</span>
              <span v-else-if="infos.price.rebatePolicy===5">BZK</span>
            </view>
          </view>
          <view class="pro-num-pop-wrap2">
            <view class="pro-num-pop-name">直扣率：</view>
            <view class="pro-num-pop-val">{{infos.price.rebateRate}}%</view>
          </view>
        </view>
        <view class="pro-num-pop-wrap">
          <view class="pro-num-pop-wrap4">
            <view class="pro-num-pop-name">数&nbsp;&nbsp;&nbsp;量：</view>
            <view class="number">
              <j-number-box
                :disabled="Number(num) === 0"
                :max="Number(num)"
                :value="numberValue"
                @change="changeNum"
              ></j-number-box>
            </view>
          </view>
        </view>
        <view class="pro-num-line"></view>
        <view v-for="(sto,index) in stock" :key="index">
          <view class="pro-num-pop-wrap">
            <view class="pro-num-pop-wrap4">
              <view class="pro-num-pop-name">库&nbsp;&nbsp;&nbsp;存：</view>
              <view class="pro-num-pop-val">{{stock[infos.product.productCode]? stock[infos.product.productCode].stockTotalNum : 0}} </view>
            </view>
          </view>
          <view class="pro-num-pop-wrap" v-for="(store,indexA) in sto.storeInfo" :key="indexA">
            <view class="pro-num-pop-wrap4">
              <view class="marker_num"></view>
              <view class="pro-num-pop-name">{{store.stockType}}</view>
              <view class="pro-num-pop-val-gry">{{store.qty}}</view>
              <view class="pro-num-pop-name">台，预计到货时间：</view>
              <view class="pro-num-pop-val-gry">{{store.arrivalTime}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="pro-num-btn-wrap">
        <button @tap="putNum" class="button pro-num-btn">确定</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import './css/proComNum.scss';
import JNumberBox from '../common/JNumberBox';

export default {
  name: 'proComNum',
  components: {
    JNumberBox
  },
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    infos: {// 商品信息
      type: Object,
      default: () => {}
    },
    stock: {// 商品库存信息
      type: [Object, Number],
      default: () => {}
    }
  },
  data() {
    return {
      numberValue: 1,
      abled: 0,
      num: 0
    };
  },
  created() {
    console.log(this.infos.product.productCode);
    console.log(this.stock[this.infos.product.productCode]);
    if (this.stock) {
      this.num = this.stock[this.infos.product.productCode].stockTotalNum;
    }
  },
  watch: {
    show(val) {
      console.log(val);
      if (val) {
        this.$refs.pop.open();
      } else {
        this.$refs.pop.close();
      }
    }
  },
  methods: {
    close() { // 关闭按钮
      this.$emit('update:show', false);
    },
    change({ show }) {
      this.$emit('update:show', show);
    },
    changeNum({ value }) {
      this.numberValue = value;
    },
    putNum() { // 确认
      this.$emit('update:show', false);
      this.$emit('checkedNum', this.numberValue);
    }
  }
};
</script>
