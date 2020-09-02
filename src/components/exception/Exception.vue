<template>
  <view class="bg">
    <ExceptionPage :ToChild="ParentControl">
      <template v-slot:ExcPagTitle0>抱歉，由于您的账户及子账户</template>
      <template v-slot:ExcPagTitle0Center>因供应链金融业务</template>
      <template v-slot:ExcPagTitle0Last>被冻结，限制登录系统，如有疑问请联系交互师处理。</template>
      <template v-slot:ExcPagTitle1>您的购物车还是空的，赶紧行动吧！</template>
      <template v-slot:ExcPagTitle2>非常抱歉</template>
      <template v-slot:ExcPagTitle3>没有找到相关的宝贝</template>
    </ExceptionPage>
  </view>
</template>

<script>
import ExceptionPage from "./ExceptionPage";
export default {
  name: "Exception",
  data() {
    return {
      //父组件控制子组件样式的数字 0 1 2 3四个样式
      ParentControl: 1
    }
  },
  components: {
    ExceptionPage
  }
};
</script>

<style>
.bg {
  height: 1400px;
  width: 750px;
  background: blanchedalmond;
}
</style>