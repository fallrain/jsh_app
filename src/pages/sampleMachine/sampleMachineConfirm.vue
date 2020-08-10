<template>
<view class="sampleMachineConfirm">
  <view class="product-confirm">
    <view class="product-info">
      <view class="dis-flex">
        <view class="sampleMachineConfirm-img-wrap">
          <image src="@/assets/img/goods/example-fridge.jpg"></image>
        </view>
        <view class="sampleMachineConfirm-inf">
          <view class="sampleMachineConfirm-inf-title">
            测试名测试名字测试名字测试名字测试名字测试名字测试名字测试名字测试名字字
            测试名测试名字测试名字测试名字测试名字测试名字测试名字测试名字测试名字字
            测试名测试名字测试名字测试名字测试名字测试名字测试名字测试名字测试名字字
          </view>
          <view class="dis-flex justify-sb">
            <view class="sampleMachineConfirm-price">
              ¥ 2323
            </view>
            <uni-number-box
              :min="0"
              v-model="goods.choosedNum"
              @change="change"
            ></uni-number-box>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/sampleMachineConfirm.scss';

export default {
  name: 'sampleMachineConfirm',
  components: {
    uniNumberBox
  },
  data() {
    return {
      goods: {
        choosedNum: 0
      }
    };
  },
  methods: {
    change(val) {
      this.goods.choosedNum = val;
      this.isCreditModeChange();
    },
  }
};
</script>
