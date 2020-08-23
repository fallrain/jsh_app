<template>
  <view class="vehicleCartItemGD">
    <view class="v-c-gd-head">
      <view class="v-c-gd-head-top">
        <view class="v-c-gd-flox1 v-c-gd-cnt-check" @tap="choose">
          <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
        </view>
        <view class="v-c-gd-flox2">
          <button type="button" class="v-c-gd-btn-primary">我的挂单</button>
        </view>
        <view class="v-c-gd-flox4">
          <text class="v-c-gd-head-text">基地：</text>
          <text class="v-c-gd-head-volume">{{goods.IBR_JDPC_JDCODENAME}}</text>
        </view>
        <view class="v-c-gd-flox7">
          <text class="v-c-gd-head-text">装车体积：</text>
          <text class="v-c-gd-head-volume">{{tiji()}}</text>
        </view>
        <view class="v-c-gd-flox1 iconfont iconxia v-c-gd-iconxia"></view>
      </view>
      <view class="v-c-gd-head-data">
        <text class="v-c-gd-head-text">车型：</text>
        <text class="v-c-gd-head-volume">{{goods.IBR_MODELSCARNAME}}</text>
      </view>
    </view>
    <!-- 产品列表 -->
    <view class="v-c-gd-list" v-for="(item,index) in goods.data" :key="index">
      <view class="v-c-gd-cnt">
        <view class="v-c-gd-cnt-img-wrap">
          <image :src="item.THUMBNAIL"></image>
        </view>
        <view class="">
          <view class="v-c-gd-cnt-inf-title">{{item.PRODUCTNAME}}</view>
          <view class="v-c-gd-btm-version">
            <view class="v-c-gd-cnt-price v-c-gd-flox3">¥ {{item.UNITPRICE}}</view>
            <view class="v-c-gd-cnt-inf-picker v-c-gd-flox6" @tap="showPayer">
              <view class="v-c-gd-flox6">付款方</view>
              <i class="iconfont iconxia"></i>
              <view class="v-c-gd-cnt-inf-picker-rk">家用静音全自动10KG洗烘一体高温eeeeeee杀菌除高...</view>
            </view>
          </view>
        </view>
      </view>
      <view class="v-c-gd-cnt-foot">
        <view class="v-c-gd-flox4">
          <text class="v-c-gd-cnt-check"> {{item.IBL_MINNUM==='0' ? '1' : item.IBL_MINNUM}}</text>
          <text class="v-c-gd-cnt-foot-text">件起售 | 限购</text>
          <text class="v-c-gd-cnt-check"> {{item.IBL_MAXNUM}}</text>
        </view>
        <view class="v-c-gd-flox4">
          <text class="v-c-gd-cnt-foot-text">小计： </text>
          <text class="v-c-gd-cnt-foot-value"> ¥ {{item.SUMMONEY}}</text>
        </view>
        <view class="">
          <uni-number-box :value="item.IBL_NUM"></uni-number-box>
        </view>
      </view>
    </view>
    <view class="v-c-gd-btm">
      <view class="v-c-gd-flox5" @click="pullDetail()">
        <view class="v-c-gd-cnt-check iconfont iconxiangqing">点击查看详情</view>
      </view>
      <view class="v-c-gd-flox5">
        <text class="v-c-gd-cnt-foot-text">总计总额： </text>
        <text class="v-c-gd-cnt-foot-value"> ¥{{goods.SUMMONEY}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/vehicleCarItem-gd.scss';

export default {
  name: 'VehicleCartItemGD',
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
    tiji() {
      const zhuangChe = (this.goods.IBR_JSTIJI * 1).toFixed(2);
      const baifenbi = (zhuangChe / (this.goods.IBR_MAXTJ * 1)) * 100;
      return `${baifenbi.toFixed(0)}%`;
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
