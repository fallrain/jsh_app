<template>
  <view class="appdefpro-bg">
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">商品联系人</view>
      <input class="appdefpro-row-right" placeholder="请输入商品联系人" />
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">联系电话</view>
      <input class="appdefpro-row-right" placeholder="请输入联系电话" />
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">机器编码</view>
      <input class="appdefpro-row-right" placeholder="请输入机器编码" />
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">产品型号</view>
      <input
        class="appdefpro-row-right"
        placeholder-class="appdefpro-title"
        placeholder="请输入产品型号"
      />
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">付款方</view>
      <view class="appdefpro-row-right">
        <view class="appdefpro-title">请输入付款方</view>
      </view>
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row">
      <view class="appdefpro-row-left">明细地址</view>
      <input class="appdefpro-row-right" placeholder="请输入明细地址" />
    </view>
    <view class="appdefpro-row-row"></view>
    <view class="appdefpro-row2">
      <view class="appdefpro-row2-title">故障描述</view>
    </view>
    <view class="appdefpro-row2-bottom">
      <view class="appdefpro-row2-iinput">
        <textarea
          class="appdefpro-row2-iinput-text"
          placeholder="请输入故障描述"
          maxlength="240"
        />
        <view class="appdefpro-row2-bottom-number">{{ textnum }}/240</view>
      </view>
    </view>
    <view class="appdefpro-botton-box">
      <button class="appdefpro-button1">
        <view class="appdefpro-button1-title">提交</view>
      </button>
    </view>
  </view>
</template>

<script>
import './css/warrantyofdefectiveproducts.scss';

export default {
  data() {
    return {
      value: [0],
      years: ['aa', 'bbb', 'cc', 'ccdd', 'eee'],
      textnum: 12
    };
  },
  methods: {
    switchchange() {
      this.$refs.popup.open();
    }
  },
  components: {}
};
</script>

<style></style>
