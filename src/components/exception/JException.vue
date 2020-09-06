<template>
  <view class="bg">
    <JExceptionPage :tap="ParentControl">
      <template v-slot:excpagTitle
        >抱歉，由于您的账户及子账户<view class="jexception-color"
          >因供应链金融业务</view
        >被冻结，限制登录系统，如有疑问请联系交互师处理。</template
      >
    </JExceptionPage>
  </view>
</template>

<script>
import JExceptionPage from './JExceptionPage';

export default {
  name: 'Exception',
  data() {
    return {
      // 父组件控制子组件样式的数字 0 1 2 3四个样式
      ParentControl: 3
    };
  },
  methods: {},
  components: {
    JExceptionPage
  }
};
</script>

<style>
.bg {
  height: 1400px;
  width: 750px;
  background: blanchedalmond;
}
.jexception-color {
  color: #ed2856;
  display: inline;
}
</style>
