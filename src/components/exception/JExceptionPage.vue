<template>
  <view :class="classJudge">
    <image :class="imageClass" :src="img[tap]" />
    <view class="excpag-title" v-show="tap === 0">
      <slot name="excpagTitle"></slot>
    </view>
    <view class="excpag-title1" v-if="tap === 1">
      您的购物车还是空的，赶紧行动吧！
    </view>
    <view class="excpag-title2" v-else-if="tap === 2 || tap === 3">
      <view class="excpag-title2-top">
        非常抱歉
      </view>
      <view class="excpag-title2-bottom">
        没有找到相关的宝贝
      </view>
    </view>
  </view>
</template>

<script>
import img1 from '../../assets/img/exception/error-lock.png';
import img2 from '../../assets/img/exception/error-cart.png';
import img3 from '../../assets/img/exception/error-nonepink.png';
import img4 from '../../assets/img/exception/error-none.png';
import './css/jexceptionPage.scss';

export default {
  name: 'JExceptionPage',
  data() {
    return {
      // 图片数组，image标签:src动态绑定数组对应下标项img[tap]
      img: [img1, img2, img3, img4]
    };
  },
  computed: {
    classJudge() {
      let num = '';
      if (this.tap === 2 || this.tap === 3) {
        num = 'excpag-bg2';
      } else {
        num = `excpag-bg${this.tap}`;
      }
      return num;
    },
    imageClass() {
      let num = '';
      if (this.tap === 2 || this.tap === 3) {
        num = 'excpag-image2';
      } else {
        num = `excpag-image${this.tap}`;
      }
      return num;
    }
  },
  props: { tap: {} }
};
</script>
<style></style>
