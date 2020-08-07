<template>
  <view class="transferDetailBtm">
    <view
      class="transferDetailBtm-check"
    >
      <text class="transferDetailBtm-check-shop">装车体积： </text>
      <view class="transferDetailBtm-check-order">96%</view> 
      <view class="uni-padding-wrap uni-common-mt">
        <view class="progress-box">
            <progress 
              percent="96" 
              activeColor="#2283E2" 
              backgroundColor="#DEDEDE" 
              stroke-width="10"
              border-radius=14
              class="progress-bar"
              />
        </view>  
      </view>
      <button class="transferDetailBtm-check-edit">结算</button>
    </view>
  </view>
</template>

<script>
// import {
//   progress
// } form '@dcloudio/uni-ui';
export default {
  name: 'transferDetailBtm',

  methods: {
    // choose() {
    //   const checked = !this.checked;
    //   this.$emit('update:checked', checked);
    //   this.$emit('checkAll', checked);
    // }
  }
};
</script>

<style lang="scss" scoped>
  .transferDetailBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
    align-items: center;
  }

  .transferDetailBtm-check {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
  .transferDetailBtm-check-shop {
    color: #333;
  }
  .transferDetailBtm-check-order {
    color: #2283E2;
    margin-right: 22px;
  }
  .transferDetailBtm-check-edit {
    width: 128px;
    height: 48px;
    background: #2283E2;
    border-radius: 24px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    margin-left:95px;
  }
::v-deep .uni-padding-wrap {
    width: 238px;
    height: 20px;
    border-radius:14px;
  }
::v-deep .progress-box{
    width: 238px;
    height: 20px;
    border-radius:14px;
  }
::v-deep .progress-inner-bar {
    border-radius:14px;
  }
::v-deep .progress-bar {
     border-radius:14px;
  }

</style>
