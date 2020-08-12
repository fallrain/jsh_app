<template>
  <view class="vehicleCartItem">
    <view class="v-c-i-head">
      <view class="v-c-i-head-top">
        <view class="v-c-i-flox1 v-c-i-cnt-check" @tap="choose">
          <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
        </view>
        <view class="v-c-i-flox2">
          <button type="button" class="v-c-i-btn-primary">普通整车</button>
        </view>
        <view class="v-c-i-flox4">
          <text class="v-c-i-head-text">基地：</text>
          <text class="v-c-i-head-volume">顺德（DS10）</text>
        </view>
        <view class="v-c-i-flox7">
          <text class="v-c-i-head-text">装车体积：</text>
          <text class="v-c-i-head-volume">97%</text>
        </view>
        <view class="v-c-i-flox1 iconfont iconxia v-c-i-iconxia"></view>
      </view>
      <view class="v-c-i-head-data">
        <text class="v-c-i-head-text">车型：</text>
        <text class="v-c-i-head-volume">B17.5B-17.5栏板变型A(变型车)</text>
      </view>
    </view>
    <!-- 产品列表 -->
    <view class="v-c-i-list" v-for="(item,index) in goods.data" :key="index">
      <view class="v-c-i-cnt">
        <view class="v-c-i-cnt-img-wrap">
          <image src="@/assets/img/goods/example-fridge.jpg"></image>
        </view>
        <view class="">
          <view class="v-c-i-cnt-inf-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高......</view>
          <view class="v-c-i-btm-version">
            <view class="v-c-i-cnt-price v-c-i-flox3">¥ 45996.00</view>
            <view class="v-c-i-cnt-inf-picker v-c-i-flox6" @tap="showPayer">
              <view class="v-c-i-flox6">付款方</view>
              <i class="iconfont iconxia"></i>
              <view class="v-c-i-cnt-inf-picker-rk">家用静音全自动10KG洗烘一体高温eeeeeee杀菌除高...</view>
            </view>
          </view>
        </view>
      </view>
      <view class="v-c-i-cnt-foot">
        <view class="v-c-i-flox4">
          <text class="v-c-i-cnt-check"> 210</text>
          <text class="v-c-i-cnt-foot-text">件起售 | 限购</text>
          <text class="v-c-i-cnt-check"> 2100</text>
        </view>
        <view class="v-c-i-flox4">
          <text class="v-c-i-cnt-foot-text">小计： </text>
          <text class="v-c-i-cnt-foot-value"> ¥ 45996.00</text>
        </view>
        <view class="">
          <uni-number-box></uni-number-box>
        </view>
      </view>
    </view>
    <view class="v-c-i-btm">
      <view class="v-c-i-flox5">
        <view class="v-c-i-cnt-check">点击查看详情</view>
      </view>
      <view class="v-c-i-flox5">
        <text class="v-c-i-cnt-foot-text">总计总额： </text>
        <text class="v-c-i-cnt-foot-value"> ¥22383945.12</text>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/vehicleCarItem.scss';

export default {
  name: 'vehicleCartItem',
  components: {
    uniNumberBox
  },
  props: {
    goods: { // 商品数据
      type: Object
    },
    index: { // 商品索引
      type: [String, Number]
    },
    allPrice: { // 所有版本的价格
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowSpecifications: false, // 是否显示版本规格
      isShowPayer: false,
    };
  },
  methods: {
    choose() {
      /* 选中本商品 */
      const { checked, data } = this.goods;
      this.goods.checked = !checked;
      console.log(data);
      this.$emit('change', this.goods, this.index);
    },
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    },
    showPayer() {
      // 显示付款方
      this.isShowPayer = true;
    }
  }
};
</script>
