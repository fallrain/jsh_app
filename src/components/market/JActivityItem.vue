<template>
  <view class="jActivityItem">
    <view class="dis-flex mb16">
      <view v-if="activity.type === 0" class="tag-primary mr20">套餐</view>
      <view v-if="activity.type === 1" class="tag-primary mr20">组合</view>
      <view v-if="activity.type === 2" class="tag-default mr20">失效组合</view>
      <view v-if="activity.type === 2" class="active-title text-999">{{activity.marketName}}</view>
      <view v-else class="active-title">{{activity.marketName}}</view>
    </view>
    <view v-if="activity.type === 0" class="jActivity-content">
      <view class="dis-flex flex-w text-666">
        <view class="w50p mb12 dis-flex">
          <view class="">活动结束时间：</view>
          <view class="text-primary">{{activity.endTime}}</view>
        </view>
        <view class="w50p mb12 dis-flex text-666">
          <view class="">配比：</view>
          <view class="text-primary">{{activity.scale}}</view>
        </view>
        <view class="w50p mb12 dis-flex text-666">
          <view class="">主产品剩余可购买：</view>
          <view class="text-primary">{{activity.productCount}}</view>
        </view>
      </view>
      <view class="jActivity-pic">
        <view v-for="(item, index) in activity.productList" class="pic-item" :key="index">
          <view class="pic-style">
            <image :src="item.src"></image>
          </view>
          <view class="title-style">{{item.name}}</view>
        </view>
      </view>
    </view>
    <view v-if="activity.type === 1" class="jActivity-content">
      <view class="dis-flex justify-sb mb12">
        <view class="fs40 text-primary">
          ￥{{activity.price}}
        </view>
        <view class="dis-flex">
          <uni-number-box></uni-number-box>
          <button
            class="btn-primary ml26"
            type="button"
          >成套下单</button>
        </view>
      </view>
      <view class="mb12 dis-flex text-666">
        <view class="">活动结束时间：</view>
        <view class="text-primary">{{activity.endTime}}</view>
      </view>
      <view class="mb12 dis-flex text-666">
        <view class="">主产品剩余可购买：</view>
        <view class="text-primary">{{activity.productCount}}</view>
      </view>
      <view class="jActivity-pic">
        <view v-for="(item, index) in activity.productList" class="pic-item" :key="index">
          <view class="pic-style">
            <image :src="item.src"></image>
          </view>
          <view class="title-style">{{item.name}}</view>
        </view>
      </view>
    </view>
    <view v-if="activity.type === 2" class="jActivity-content">
      <view class="dis-flex justify-sb mb12">
        <view class="fs40 text-999">
          组合失效
        </view>
        <view class="dis-flex">
          <uni-number-box></uni-number-box>
          <button
            class="btn-default ml26"
            type="button"
          >成套下单</button>
        </view>
      </view>
      <view class="mb12 dis-flex text-666">
        <view class="">活动结束时间：</view>
        <view class="text-primary">{{activity.endTime}}</view>
      </view>
      <view class="mb12 dis-flex text-666">
        <view class="">主产品剩余可购买：</view>
        <view class="text-primary">{{activity.productCount}}</view>
      </view>
      <view class="jActivity-pic">
        <view v-for="(item, index) in activity.productList" class="pic-item" :key="index">
          <view class="pic-style">
            <image :src="item.src"></image>
          </view>
          <view class="title-style">{{item.name}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/JActivityItem.scss';

export default {
  name: 'JActivityItem',
  components: {
    uniNumberBox
  },
  props: {
    // 活动对象
    activity: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
