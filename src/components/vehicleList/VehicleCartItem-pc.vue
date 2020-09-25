<template>
  <view class="vehicleCartItemPC">
    <view class="v-c-pc-head">
      <view class="v-c-pc-head-top">
        <view class="v-c-pc-flox1 v-c-pc-cnt-check" @tap="choose">
          <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
        </view>
        <view class="v-c-pc-flox2">
          <button type="button" class="v-c-pc-btn-primary">拼车订单</button>
        </view>
        <view class="v-c-pc-flox4">
          <text class="v-c-pc-head-text">基地：</text>
          <text class="v-c-pc-head-volume">{{goods.IBR_JDPC_JDCODENAME}}</text>
        </view>
        <view class="v-c-pc-flox7">
          <text class="v-c-pc-head-text">装车体积：</text>
          <text class="v-c-pc-head-volume">{{tiji()}}</text>
        </view>
        <view class="v-c-pc-flox1 iconfont iconxia v-c-pc-iconxia"></view>
      </view>
      <view class="v-c-pc-head-data">
        <text class="v-c-pc-head-text">车型：</text>
        <text class="v-c-pc-head-volume">{{goods.IBR_MODELSCARNAME}}</text>
      </view>
    </view>
    <vehicle-more :fromWhere="fromWhere" :isVehicleMore="isVehicleMore" :anNiuINfo="goods" @anNiuVehicle="anNiuVehicle"></vehicle-more>
    <!-- 产品列表 -->
    <view class="v-c-pc-list" v-for="(item,index) in goods.data" :key="index">
      <view class="v-c-pc-cnt">
        <view class="v-c-pc-cnt-img-wrap">
          <image :src="item.THUMBNAIL"></image>
        </view>
        <view class="">
          <view class="v-c-pc-cnt-inf-title">{{item.PRODUCTNAME}}</view>
          <view class="v-c-pc-btm-version">
            <view class="v-c-pc-cnt-price v-c-pc-flox3">¥ {{item.UNITPRICE}}</view>
            <view class="v-c-pc-cnt-inf-picker v-c-pc-flox6" @tap="showPayer">
              <view class="v-c-pc-flox6">付款方</view>
              <i class="iconfont iconxia"></i>
              <view class="v-c-pc-cnt-price-info" v-if="item.payCheck">
                <view class="v-c-pc-cnt-price-info-li" v-for="(it,index2) in item.payVehiList.data.items" :key="index2"
                      :class="[it.checked && 'active']" @tap="payVehicle(index, index2),getPayer(item)">{{it.TMCF_NAME}}</view>
              </view>
              <view class="v-c-pc-cnt-inf-picker-rk">{{item.payVehCheck.TMCF_NAME}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="v-c-pc-cnt-foot">
        <view class="v-c-pc-flox4">
          <text class="v-c-pc-cnt-check"> {{item.IBL_MINNUM==='0' ? '1' : item.IBL_MINNUM}}</text>
          <text class="v-c-pc-cnt-foot-text">件起售 | 限购</text>
          <text class="v-c-pc-cnt-check"> {{item.IBL_MAXNUM}}</text>
        </view>
        <view class="v-c-pc-flox4">
          <text class="v-c-pc-cnt-foot-text">小计： </text>
          <text class="v-c-pc-cnt-foot-value"> ¥ {{item.SUMMONEY}}</text>
        </view>
        <view class="">
          <j-number-box
            :disabled="Number(item.IBL_MAXNUM) === 0"
            :max="Number(item.IBL_MAXNUM)"
            :value="item.IBL_NUM"
            @change="changeNum($event, item)">
          </j-number-box>
        </view>
      </view>
    </view>
    <view class="v-c-pc-btm">
      <view @tap="pullDetail()" class="v-c-pc-flox5">
        <view class="v-c-pc-cnt-check iconfont iconxiangqing">点击查看详情</view>
      </view>
      <view class="v-c-pc-flox5">
        <text class="v-c-pc-cnt-foot-text">总计总额： </text>
        <text class="v-c-pc-cnt-foot-value"> ¥{{goods.SUMMONEY}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import './css/vehicleCarItem-pc.scss';
import vehicleMore from './VehicleMore';
import JNumberBox from '../common/JNumberBox';

export default {
  name: 'VehicleCartItemPC',
  components: {
    JNumberBox,
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
      fromWhere: 'GWCAN', // 整车购物车按钮
      fromWhere2: 'ZCFKF', // 付款方列表
      isVehicleMore: false, // 是否显示多个按钮
    };
  },
  methods: {
    getPayer(item) { // 显示付款方
      item.payCheck = !item.payCheck;
      console.log(this.index);
      console.log(item.payCheck);
    },
    payVehicle(index, index2) { // 选择付款方
      this.goods.orderList[index].payCheck = false;
      this.goods.orderList[index].payVehiList.data.items.forEach((inf) => {
        inf.checked = false;
      });
      this.goods.orderList[index].payVehiList.data.items[index2].checked = true;
      this.goods.orderList[index].payVehCheck = this.goods.orderList[index].payVehiList.data.items[index2];
      this.goods.orderList[index].payCheck = false;
    },
    getMore() {
      this.isVehicleMore = !this.isVehicleMore;
      console.log(this.index);
      console.log(this.isVehicleMore);
    },
    anNiuVehicle(inn, imm) {
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
    pullDetail() {
      console.log('22222');
      this.$emit('pullDetail', this.goods, this.index);
    },
    async changeNum(value, item) {
      if (value !== (item.IBL_NUM * 1)) {
        this.$emit('changeNum', value, this.goods, item);
      }
    },
  },
};
</script>
