<template>
<view class="sampleMachineConfirm">
  <view class="product-confirm">
    <view class="product-info">
      <view class="product-info-top ">
        <view class="sampleMachineConfirm-img-wrap">
          <image :src="confirmInfo.SEARCHIMAGE"></image>
        </view>
        <view class="sampleMachineConfirm-inf">
          <view class="sampleMachineConfirm-inf-title">
            {{confirmInfo.NAME}}
          </view>
          <view class="dis-flex justify-sb">
            <view class="sampleMachineConfirm-price">
              ¥ {{confirmInfo.$allPrice.UnitPrice}}
            </view>
            <uni-number-box
              :min="0"
              v-model="confirmInfo.number"
              @change="change"
            ></uni-number-box>
          </view>
        </view>
      </view>
      <view class="product-info-bottom">
        <view>
          <text class="mr20">直扣：{{toPercent(confirmInfo.$allPrice.ReLossRate)}}%</text>
          <text>供价：￥{{confirmInfo.$allPrice.ActPrice }}</text>
        </view>
        <view v-if="goods.detailList">
          库存：{{goods.detailList[0].YGS_KYKCL}}
        </view>
        <view>
          库位：水电费拉克丝几点发
        </view>
      </view>
    </view>
    <view class="payfor-info">
      <view class="dis-flex">
        <view class="">付款方：</view>
        <view class="">青岛鸿程永泰商贸有限公司</view>
      </view>
      <view class="dis-flex">
        <view class="">可用余额：</view>
        <view class="text-theme">￥3456</view>
      </view>
      <view class="dis-flex">
        <view class="">物流托管仓：</view>
        <view class="">
          <j-switch
            :active.sync="goods.isSend"
            inf="直发"
            @change="switchChange"
          ></j-switch>
        </view>
      </view>
      <view class="dis-flex">
        <view class="">验证码：</view>
        <view class="">青岛鸿程永泰商贸有限公司</view>
      </view>
    </view>
  </view>
  <view class="payfor-info-bottom">
    <view class="">
      总价：<text class="text-theme">￥2345</text>
    </view>
    <button type="button">确认订单</button>
  </view>
</view>
</template>
<script>
import JSwitch from '@/components/form/JSwitch';
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/sampleMachineConfirm.scss';

export default {
  name: 'sampleMachineConfirm',
  components: {
    JSwitch,
    uniNumberBox
  },
  data() {
    return {
      goods: {
        choosedNum: 0
      },
      confirmInfo: {}
    };
  },
  onLoad(option) {
    const { confirmInfo } = option;
    this.confirmInfo = JSON.parse(confirmInfo);
    console.log(this.confirmInfo);
  },
  computed: {
    toPercent() {
      return function (val) {
        return (Math.round(val * 10000) / 100).toFixed(2);
      };
    }
  },
  methods: {
    change(val) {
      this.goods.choosedNum = val;
    },
    switchChange(val) {
      console.log(val);
    }
  }
};
</script>
