<template>
  <view>
    <view class="mineSign-title">{{info.contractname}}</view>
    <view class="mineSign-line"></view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">区协议编码域</view>
      <view class="col-67 mineSign-text-right">{{info.contractno}}</view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">产品组编码</view>
      <view class="col-67 mineSign-text-right">{{info.productName}}</view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">签约品牌编码</view>
      <view class="col-67 mineSign-text-right2">
        <view class="mineSign-text-right2-but" v-for="band in bandList">{{band.nana}}</view>
      </view>
    </view>
    <view class="uni-flex uni-row mineSign-text">
      <view class="col-33 mineSign-text-left">有效期</view>
      <view class="col-67 mineSign-text-right">{{info.inDate}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mineSignItem',
  props: {
    info: {
      type: Object
    },
    index: {
      type: [String, Number]
    }
  },
  data() {
    return {
      bandList: []
    };
  },
  created() {
    this.piii();
  },
  methods: {
    piii() {
      const listt = this.info.brandName.split(',');
      const namrlist = [];
      listt.forEach((lis) => {
        const a = { nana: lis };
        namrlist.push(a);
      });

      this.bandList = namrlist;
    },
  }
};
</script>

<style scoped>
  .mineSign-title{
    height: 88px;
    line-height: 88px;
    color: #2283E2;
    font-size: 28px;
  }
  .mineSign-line{
    border-bottom: 1px dashed #B1B1B1;
  }
  .mineSign-text{
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .mineSign-text-left{
    color: #333333;
    font-size: 24px;
  }
  .mineSign-text-right{
    text-align: right;
    color: #999999;
    font-size: 24px;
  }
  .mineSign-text-right2{
  }
  .mineSign-text-right2-but{
    float:right;
    font-size: 24px;
    width:23%;
    background-color: #2283E2;
    color: #FFFFFF;
    border-radius: 16px;
    text-align: center;
    margin-right: 2%;
    margin-bottom: 2%;
  }

</style>
