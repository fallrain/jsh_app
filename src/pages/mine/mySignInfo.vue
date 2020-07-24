<template>
  <view class="mineSignInfo-bg">
    <view class="mineSignInfo">
      <view class="mineSignInfo-group">
        <mine-sign-info></mine-sign-info>
      </view>
    </view>
    <view class="mineSignInfo">
      <view class="mineSignInfo-group">
        <mine-sign-info></mine-sign-info>
      </view>
    </view>
  </view>
</template>

<script>
import mineSignInfo from '../../components/mine/mine-sign-item';

export default {
  name: 'mySignInfo',
  components: {
    mineSignInfo
  }
};
</script>

<style scoped>
  .mineSignInfo-bg{
    background: #F5F5F5;
    min-height:1400px;
  }
  .mineSignInfo{
    padding: 24px 24px 0 24px;
  }
  .mineSignInfo-group {
    border-radius: 10px;
    background: #fff;
    padding-left: 14px;
    padding-right: 14px;
  }

</style>
