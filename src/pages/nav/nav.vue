<template>
  <div>
    <view>
      <view
        v-for="(r,i) in routerData"
        :key="i"
      >
        <navigator :url="'/'+r">{{r}}</navigator>
      </view>
    </view>
  </div>
</template>

<script>
/* eslint-disable import/no-cycle */
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

<style scoped>
  a {
    color: #42b983;
  }
</style>
