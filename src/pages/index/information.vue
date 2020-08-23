<template>
    <view>
        <web-view src="https://new.jsh.com"></web-view>
    </view>
</template>
<script>
var wv;//计划创建的webview
export default {
    data() {
        return {
            id:''
        }
    },
    onLoad(option) {
        this.id = option
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