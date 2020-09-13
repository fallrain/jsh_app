<template>
  <view class="poshanfee-bg">
    <view class="poshanfee-space">
      <view class="poshanfee-row">
        <view class="poshanfee-top-left"></view>
        <view class="poshanfee-row2" @click="popleft">
          <view class="poshanfee-top-right1">
            <view class="poshanfee-title">
              <view class="poshanfee-color">筛选</view>
            </view>
          </view>
          <image class="poshanfee-top-rightimg" :src="img1"
        /></view>
      </view>
      <uni-popup ref="popleft" type="right"
        ><posfee-screening></posfee-screening>
      </uni-popup>
    </view>
    <view class="poshanfee-box">
      <view class="poshanfee-space">
        <view class="poshanfee-title">
          <view class="poshanfee-color">协议编码：Z000000000000904</view>
        </view>
      </view>
      <view class="poshanfee-space">
        <view class="poshanfee-line"></view>
      </view>
      <view class="poshanfee-space2">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">售达方编码/售达方名称：</view>
          </view>
          <view class="poshanfee-row-right">
            <view class="poshanfee-title">
              <view class="poshanfee-color3"
                >8700044838/永年县百货大楼丽芳家电经销部</view
              >
            </view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space3">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">发起申请时间：</view>
          </view>
          <view class="poshanfee-row-right">
            <view class="poshanfee-title">
              <view class="poshanfee-color3">2019-10-12</view>
            </view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space3">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">开始日期：</view>
          </view>
          <view class="poshanfee-row-right">
            <view class="poshanfee-title">
              <view class="poshanfee-color3">2019-10-12</view>
            </view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space3">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">结束日期：</view>
          </view>
          <view class="poshanfee-row-right">
            <view class="poshanfee-title">
              <view class="poshanfee-color3">2019-10-22</view>
            </view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space3">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">状态：</view>
          </view>
          <view class="poshanfee-row-right">
            <view class="poshanfee-title">
              <view class="poshanfee-color">已装机</view>
            </view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space3">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color2">退回原因：</view>
          </view>
        </view>
      </view>
      <view class="poshanfee-space4">
        <view class="poshanfee-row">
          <view class="poshanfee-title">
            <view class="poshanfee-color3"
              >这里显示的是退回原因这里显示的是退回原因这里显示的是退回原因这里显示的是退回原因</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/poshanfee.scss';
import img1 from '../../assets/img/bankacceptance/screening.png';
import posfeeScreening from './JPosFeeScreening';
import {
 uniPopup 
} from '@dcloudio/uni-ui';

export default {
  data() {
    return {
      img1
    };
  },
  methods: {
    popleft() {
      this.$refs.popleft.open();
    }
  },
  components: {
    uniPopup,
    posfeeScreening
  }
};
</script>

<style></style>
