<template>
  <view
    class="jActivityItem">
    <view class="dis-flex mb16">
      <view class="dis-flex" v-if="activity.valid === false">
        <view @tap="goDetail()" v-if="activity.activityType === 'taocan'">
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
          <j-number-box :max="Number(activity.upperLimit)"></j-number-box>
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
        <view v-if="activity.activityType === 'taocan'" class="">{{fomrmateDate(activity.endDate)}}</view>
        <view v-else class="">{{fomrmateDate(activity.expTime)}}</view>
      </view>
      <view @tap="goDetail()" class="mb12 dis-flex text-666">
        <view class="">剩余可购买套数：</view>
        <view class="">{{activity.upperLimit}}</view>
      </view>
      <view @tap="goDetail()" class="jActivity-pic">
        <view :key="index" class="pic-item" v-for="(item, index) in activity.products">
          <view class="pic-style">
            <u-lazy-load
              :error-img="errorImg"
              :image="item.imageUrl"
            ></u-lazy-load>
<!--            <image :src="item.imageUrl"></image>-->
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
            <view v-if="activity.proportionType === '1'" class="">数量配比：</view>
            <view v-if="activity.proportionType === '2'" class="">金额配比：</view>
            <view class="text-primary">{{activity.proportionMain}}:{{activity.proportion}}</view>
          </view>
          <view @tap="goDetail()" class="w50p mb12 dis-flex text-666">
            <view class="">剩余可购买套数：</view>
            <view class="text-primary">{{activity.upperLimit}}</view>
          </view>
        </view>
        <view @tap="goDetail()" class="jActivity-pic">
          <!--主产品-->
          <view :key="item.productCode" class="pic-item" v-for="(item) in activity.products">
            <view
              class="jProductItem-tag bg-theme"
            >主产品
            </view>
            <view class="pic-style">
              <u-lazy-load
                :error-img="errorImg"
                :image="item.imageUrl"
              ></u-lazy-load>
<!--              <image :src="item.imageUrl"></image>-->
            </view>
            <view class="title-style">{{item.productName}}</view>
          </view>
          <!--配比产品-->
          <view :key="item.productCode" class="pic-item" v-for="(item) in activity.pbProducts">
            <view class="pic-style">
              <u-lazy-load
                :error-img="errorImg"
                :image="item.imageUrl"
              ></u-lazy-load>
<!--              <image :src="item.imageUrl"></image>-->
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
            <j-number-box
              :value="Number(activity.choosedNum)"
              :max="Number(activity.upperLimit)"
              @change="changeNum"
            ></j-number-box>
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
          <view class="">剩余可购买套数：</view>
          <view class="text-primary">{{activity.upperLimit}}</view>
        </view>
        <view @tap="goDetail()" class="jActivity-pic">
          <view :key="index" class="pic-item" v-for="(item, index) in activity.products">
            <view class="pic-style">
              <u-lazy-load
                :error-img="errorImg"
                :image="item.imageUrl"
              ></u-lazy-load>
<!--              <image :src="item.imageUrl"></image>-->
            </view>
            <view class="title-style">{{item.productName}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/JActivityItem.scss';
import JNumberBox from '../common/JNumberBox';

export default {
  name: 'JActivityItem',
  components: {
    JNumberBox
  },
  props: {
    // 活动对象
    activity: {
      type: Object,
      default: () => {}
    },
    calue: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      // 错误图片
      errorImg: `${process.env.BASE_URL}public/assets/img/goods/defaultImg.png`,
    };
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
      return val => val.split(' ')[0];
    }
  },
  methods: {
    goDetail() {
      this.$emit('activityDetail', this.activity);
    },
    goOrder() {
      this.$emit('goOrder', this.activity);
    },
    changeNum({ value }) {
      console.log(value);
      this.activity.choosedNum = value;
    }
  }
};
</script>
