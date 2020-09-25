<template>
  <view>
    <web-view
      :src="url"
    ></web-view>
  </view>
</template>
<script>
export default {
  name: 'broadcasDetail',
  data() {
    return {
      url: ''
    };
  },
  onLoad(option) {
    const url = decodeURIComponent(option.url);
    this.url = url;
  }
};
</script>
