<template>
  <view>
    <view>
      <view
        v-for="(r,i) in routerData"
        :key="i"
      >
        <navigator :url="'/'+r">{{r}}</navigator>
      </view>
    </view>
  </view>
</template>

<script>
/* eslint-disable import/no-cycle */
// 此文件无路由功能
import routerData from '@/router/routerData';

export default {
  components: {},
  data() {
    return {
      routerData: routerData.data
    };
  }
};
</script>

<style>
  a {
    color: #42b983;
  }
</style>
