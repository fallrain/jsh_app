<template>
  <view class="jProductItem">
    <view v-if="groupType === 0" class="jProductItem-head">
      <view
        v-if="goods.type === 0"
        class="jProductItem-tag bg-theme"
      >主产品
      </view>
      <view
        v-if="goods.type === 1"
        class="jProductItem-tag bg-primary"
      >配比产品
      </view>
      <view
        v-if="goods.type === 2"
        class="jProductItem-tag bg-999"
      >失效产品
      </view>
      <view class="jProductItem-btm-tags mt8">
        <view class="jProductItem-btm-tag">异</view>
        <view class="jProductItem-btm-tag">云</view>
        <view class="jProductItem-btm-tag">统</view>
      </view>
    </view>
    <view class="jProductItem-cnt">
      <view class="jProductItem-cnt-img-wrap">
        <image src="@/assets/img/goods/example-fridge.jpg"></image>
      </view>
      <view class="jProductItem-cnt-inf">
        <view class="jProductItem-cnt-inf-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高温杀菌除高家用静音全自动10KG洗烘一体高温杀菌除高</view>
        <view class="dis-flex mb12">
          <view class="jProductItem-cnt-price-tips-item">直扣92.1%</view>
          <view class="jProductItem-cnt-price-tips-item">返利：COM</view>
          <view class="jProductItem-cnt-price-tips-item">台返：0</view>
        </view>
        <view class="jProductItem-cnt-price-inf">
          <view class="jProductItem-cnt-price">¥ 3456.00</view>
          <view class="fs20 text-666 mr12">供价：¥333456.02</view>
          <view class="fs20 text-666 mr12">库存：456</view>
        </view>
      </view>
    </view>
    <view v-if="groupType === 0" class="jProductItem-btm">
      <view
        class="jProductItem-btm-version-picker"
        @tap="showSpecifications"
      >
        <text>版本规格</text>
        <i class="iconfont iconxia"></i>
      </view>
      <view class="dis-flex">
        <view class="fs20 text-999">共计：</view>
        <view class="jProductItem-cnt-price">¥ 3456.00</view>
        <uni-number-box></uni-number-box>
      </view>
    </view>
    <view v-if="groupType === 1" class="jProductItem-btm">
      <view class="dis-flex">
        <view class="jProductItem-btm-tags mt8">
          <view class="jProductItem-btm-tag">异</view>
          <view class="jProductItem-btm-tag">云</view>
          <view class="jProductItem-btm-tag">统</view>
        </view>
        <view class="fs20 text-666 mr12">库存：456</view>
      </view>
      <view class="">
        <j-switch
          :active.sync="goods.isSend"
          inf="直发"
          @change="isCreditModeChange"
        ></j-switch>
      </view>
    </view>
  </view>
</template>

<script>
import JSwitch from '../form/JSwitch';
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/JProductItem.scss';

export default {
  name: 'jProductItem',
  components: {
    uniNumberBox,
    JSwitch
  },
  props: {
    goods: {
      type: Object
    },
    index: {
      type: [String, Number]
    },
    groupType: {
      type: Number
    }
  },
  data() {
    return {
      // 是否显示 版本规格
      isShowSpecifications: false,
      isSend: false
    };
  },
  methods: {
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    }
  }
};
</script>
