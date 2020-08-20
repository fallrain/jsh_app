<template>
  <view class="vehicleCartItem">
    <view class="v-c-i-head">
      <view class="v-c-i-head-top">
        <view class="v-c-i-flox1 v-c-i-cnt-check" @tap="choose">
          <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
        </view>
        <view class="v-c-i-flox2">
          <button type="button" class="v-c-i-btn-primary">{{goods.IBR_ISFLAG}}</button>
        </view>
        <view class="v-c-i-flox4">
          <text class="v-c-i-head-text">基地：</text>
          <text class="v-c-i-head-volume">{{goods.IBR_JDPC_JDCODENAME}}</text>
        </view>
        <view class="v-c-i-flox7">
          <text class="v-c-i-head-text">装车体积：</text>
          <text class="v-c-i-head-volume">{{tiji()}}</text>
        </view>
        <view @click="getMore" class="v-c-i-flox1 iconfont iconxia v-c-i-iconxia"></view>
      </view>
      <view class="v-c-i-head-data">
        <text class="v-c-i-head-text">车型：</text>
        <text class="v-c-i-head-volume">{{goods.IBR_MODELSCARNAME}}</text>
      </view>
    </view>
    <vehicle-more :isVehicleMore="isVehicleMore" :anNiuINfo="goods" @anNiuVehicle="anNiuVehicle"></vehicle-more>
    <!-- 产品列表 -->
    <view class="v-c-i-list" v-for="(item,index) in goods.orderList" :key="index">
      <view class="v-c-i-cnt">
        <view class="v-c-i-cnt-img-wrap">
          <image :src="item.THUMBNAIL"></image>
        </view>
        <view class="">
          <view class="v-c-i-cnt-inf-title">{{item.PRODUCTNAME}}</view>
          <view class="v-c-i-btm-version">
            <view class="v-c-i-cnt-price v-c-i-flox3">¥ {{item.UNITPRICE}}</view>
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
          <text class="v-c-i-cnt-check"> {{item.IBL_MINNUM==='0' ? '1' : item.IBL_MINNUM}}</text>
          <text class="v-c-i-cnt-foot-text">件起售 | 限购</text>
          <text class="v-c-i-cnt-check"> {{item.IBL_MAXNUM}}</text>
        </view>
        <view class="v-c-i-flox4">
          <text class="v-c-i-cnt-foot-text">小计： </text>
          <text class="v-c-i-cnt-foot-value"> ¥ {{item.SUMMONEY}}</text>
        </view>
        <view class="">
          <uni-number-box :value="item.IBL_NUM"></uni-number-box>
        </view>
      </view>
    </view>
    <view class="v-c-i-btm">
      <view class="v-c-i-flox5" @click="pullDetail()">
        <view class="v-c-i-cnt-check iconfont iconxiangqing">点击查看详情</view>
      </view>
      <view class="v-c-i-flox5">
        <text class="v-c-i-cnt-foot-text">总计总额： </text>
        <text class="v-c-i-cnt-foot-value"> ¥{{goods.SUMMONEY}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/vehicleCarItem.scss';
import vehicleMore from './vehicleMore';

export default {
  name: 'vehicleCartItem',
  components: {
    uniNumberBox,
    vehicleMore
  },
  props: {
    goods: { // 商品数据
      type: Object,
      default: () => {}
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
      isVehicleMore: false // 是否显示多个按钮
    };
  },
  methods: {
    getMore() {
      this.isVehicleMore = !this.isVehicleMore;
      console.log(this.index);
      console.log(this.isVehicleMore);
    },
    anNiuVehicle(inn, imm) {
      console.log('22222');
      console.log(inn);
      console.log(imm);
      this.isVehicleMore = false;
      if (imm === '1') {
        console.log(this.goods);
        uni.navigateTo({
          url: `/pages/vehicleList/vehicleList?SEQ=${this.goods.IBR_SEQ}`
        });
      }
    },
    tiji() {
      const zhuangChe = (this.goods.IBR_JSTIJI * 1).toFixed(2);
      const baifenbi = (zhuangChe / (this.goods.IBR_MAXTJ * 1)) * 100;
      return `${baifenbi.toFixed(0)}%`;
    },
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
    },
    pullDetail() {
      console.log('22222');
      this.$emit('pullDetail', this.goods, this.index);
    }
  }
};
</script>
