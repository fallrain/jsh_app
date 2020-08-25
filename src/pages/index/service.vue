<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>
<script>
var wv;//计划创建的webview
export default {
    data() {
        return {
            url:''
        }
    },
    onLoad(option) {
        this.url = 'https://haier.s2.udesk.cn/im_client?web_plugin_id=28198&customer_token='+option.web_token1+'&c_phone='+option.c_phone+'&nonce='+option.nonce+'&signature='+option.signature+'&timestamp='+option.timestamp+'&web_token='+option.web_token; 
        console.log(option)
        console.log(this.url)
    },   
    onReady() {
        // #ifdef APP-PLUS
        var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
        setTimeout(function() {
            wv = currentWebview.children()[0]
            wv.setStyle({top:150,height:300})
        }, 1000); //如果是页面初始化调用时，需要延时一下
        // #endif
        }
    };
</script>
