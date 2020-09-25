<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>
<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(option) {
    this.url = `https://haier.s2.udesk.cn/im_client?web_plugin_id=28198&customer_token=${option.web_token1}&c_phone=${option.c_phone}&nonce=${option.nonce}&signature=${option.signature}&timestamp=${option.timestamp}&web_token=${option.web_token}`;
  }
};
</script>
