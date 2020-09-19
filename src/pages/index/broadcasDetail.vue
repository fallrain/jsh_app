<template>
<view>
<web-view :src="url"></web-view>
    </view>
    </template>
    <script>
    let wv;// 计划创建的webview
export default {
  name: "broadcasDetail",
  data() {
    return {
      url: ''
    };
  },
  onLoad(option) {
    this.url = option.url;
    console.log(option);
    console.log(this.url);
  },
  onReady() {
    // #ifdef APP-PLUS
    const currentWebview = this.$scope.$getAppWebview(); // 此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
    setTimeout(() => {
      wv = currentWebview.children()[0];
      wv.setStyle({ top: 150, height: 300 });
    }, 1000); // 如果是页面初始化调用时，需要延时一下
    // #endif
  }
};
</script>
