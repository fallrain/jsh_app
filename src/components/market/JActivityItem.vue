<template>
  <view
    class="jActivityItem">
    <view @tap="goDetail()" class="dis-flex mb16">
      <view class="dis-flex" v-if="activity.valid === false">
        <view v-if="activity.activityType === 'taocan'">
          <view class="tag-default mr20">失效套餐</view>
          <view class="active-title text-999">{{activity.name}}</view>
        </view>
        <view v-if="activity.activityType === 'zuhe'">
          <view class="tag-default mr20">失效组合</view>
          <view class="active-title text-999">{{activity.name}}</view>
        </view>
      </view>
      <view @tap="goDetail()" class="dis-flex" v-else>
        <view v-if="activity.activityType === 'taocan'" class="tag-primary mr20">套餐</view>
        <view v-if="activity.activityType === 'taocan'" class="active-title">{{activity.name}}</view>
        <view v-if="activity.activityType === 'zuhe'" class="tag-primary mr20">组合</view>
        <view v-if="activity.activityType === 'baoxiao'" class="tag-primary mr20">反向定制</view>
        <view v-if="activity.activityType === 'zuhe'||activity.activityType === 'baoxiao'" class="active-title">
          {{activity.promotionName}}</view>
      </view>
    </view>
    <view v-if="activity.valid === false" class="jActivity-content">
      <view
        v-if="activity.activityType === 'zuhe'"
        class="dis-flex justify-sb mb12">
        <view class="fs40 text-999">
          组合失效
        </view>
        <view class="dis-flex">
          <uni-number-box :max="Number(activity.upperLimit)"></uni-number-box>
          <button
            class="btn-default ml26"
            type="button"
          >成套下单</button>
        </view>
      </view>
      <view
        v-if="activity.activityType === 'taocan'"
        class="dis-flex justify-sb mb12">
        <view class="fs40 text-999">
          套餐失效
        </view>
      </view>
      <view @tap="goDetail()" class="mb12 dis-flex text-666">
        <view class="">活动结束时间：</view>
        <view v-if="activity.activityType === 'taocan'" class="">{{activity.endDate}}</view>
        <view v-else class="">{{activity.expTime}}</view>
      </view>
      <view @tap="goDetail()" class="mb12 dis-flex text-666">
        <view class="">主产品剩余可购买：</view>
        <view class="">{{activity.upperLimit}}</view>
      </view>
      <view @tap="goDetail()" class="jActivity-pic">
        <view v-for="(item, index) in activity.products" class="pic-item" :key="index+'#-#'">
          <view class="pic-style">
            <image :src="item.imageUrl"></image>
          </view>
          <view class="title-style">{{item.productName}}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <view v-if="activity.activityType === 'taocan'" class="jActivity-content">
        <view @tap="goDetail()" class="dis-flex flex-w text-666">
          <view class="w50p mb12 dis-flex">
            <view class="">活动结束时间：</view>
            <view class="text-primary">{{fomrmateDate(activity.endDate)}}</view>
          </view>
          <view @tap="goDetail()" class="w50p mb12 dis-flex text-666">
            <view class="">配比：</view>
            <view class="text-primary">{{activity.proportionMain}}:{{activity.proportion}}</view>
          </view>
          <view @tap="goDetail()" class="w50p mb12 dis-flex text-666">
            <view class="">主产品剩余可购买：</view>
            <view class="text-primary">{{activity.upperLimit}}</view>
          </view>
        </view>
        <view @tap="goDetail()" class="jActivity-pic">
          <!--主产品-->
          <view v-for="(item, index) in activity.products" class="pic-item" :key="index+'%%'">
            <view
              class="jProductItem-tag bg-theme"
            >主产品
            </view>
            <view class="pic-style">
              <image :src="item.imageUrl"></image>
            </view>
            <view class="title-style">{{item.productName}}</view>
          </view>
          <!--配比产品-->
          <view v-for="(item, index) in activity.pbProducts" class="pic-item" :key="index+'$$'">
            <view class="pic-style">
              <image :src="item.imageUrl"></image>
            </view>
            <view class="title-style">{{item.productName}}</view>
          </view>
        </view>
      </view>
      <view v-if="activity.activityType === 'zuhe'||
    activity.activityType === 'baoxiao'"
            class="jActivity-content">
        <view class="dis-flex justify-sb mb12">
          <view class="fs40 text-primary">
            ￥{{totalPrice(activity.products)}}
          </view>
          <view class="dis-flex">
            <uni-number-box
              :max="Number(activity.upperLimit)"
            ></uni-number-box>
            <button
              @tap="goOrder"
              class="btn-primary ml26"
              type="button"
            >成套下单</button>
          </view>
        </view>
        <view @tap="goDetail()" class="mb12 dis-flex text-666">
          <view class="">活动结束时间：</view>
          <view class="text-primary">{{fomrmateDate(activity.expTime)}}</view>
        </view>
        <view @tap="goDetail()" class="mb12 dis-flex text-666">
          <view class="">主产品剩余可购买：</view>
          <view class="text-primary">{{activity.upperLimit}}</view>
        </view>
        <view @tap="goDetail()" class="jActivity-pic">
          <view v-for="(item, index) in activity.products" class="pic-item" :key="index+'#^#'">
            <view class="pic-style">
              <image :src="item.imageUrl"></image>
            </view>
            <view class="title-style">{{item.productName}}</view>
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
  },
  computed: {
    totalPrice() {
      return function (val) {
        let total = 0;
        val.forEach((item) => {
          total = ((parseFloat(item.priceDto.invoicePrice) * parseInt(item.promotionNum))
          + parseFloat(total)).toFixed(2);
        });
        return total;
      };
    },
    fomrmateDate() {
      // return val => this.jshUtil.formatDate(val);
      return val => val.split(' ')[0];
    }
  },
  methods: {
    goDetail() {
      // console.log(e);
      // console.log(e.currentTarget.getAttributeNode('class'));
      this.$emit('activityDetail', this.activity);
    },
    goOrder() {
      this.$emit('goOrder', this.activity);
    }
  }
};
</script>
