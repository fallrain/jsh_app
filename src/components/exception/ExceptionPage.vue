<template>
  <view
    :class="{'excpag-bg0':ToChild==0,'excpag-bg1':ToChild==1,'excpag-bg2':ToChild==2||ToChild==3}"
  >
    <image
      :class="{'excpag-image0':ToChild==0,'excpag-image1':ToChild==1,'excpag-image2':ToChild==2||ToChild==3}"
      :src="img[ToChild]"
    />

    <view class="excpag-title0" v-if="ToChild==0">
      <slot name="ExcPagTitle0"></slot>
      <view class="excpag-color">
        <slot name="ExcPagTitle0Center"></slot>
      </view>
      <slot name="ExcPagTitle0Last"></slot>
    </view>
    <view class="excpag-title1" v-if="ToChild==1">
      <slot name="ExcPagTitle1"></slot>
    </view>
    <view class="excpag-title2" v-if="ToChild==2||ToChild==3">
      <view class="excpag-title2-top">
        <slot name="ExcPagTitle2"></slot>
      </view>
      <view class="excpag-title2-bottom">
        <slot name="ExcPagTitle3"></slot>
      </view>
    </view>
  </view>
</template>

<script>
import img1 from "../../assets/img/exception/error-lock.png";
import img2 from "../../assets/img/exception/error-cart.png";
import img3 from "../../assets/img/exception/error-nonepink.png";
import img4 from "../../assets/img/exception/error-none.png";
import "./css/ExceptionPage.scss";
export default {
  name: "ExceptionPage",
  data() {
    return {
      //图片数组，image标签:src动态绑定数组对应下标项img[ToChild]
      img: [img1, img2, img3, img4]
    };
  },
  props: { ToChild: {} }
};
</script>

<style>
</style>