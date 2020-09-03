<template>
    <view class="bg">
        <view class="topLine"></view>
        <view class="row">
            <view class="title" @click="personInforClick">个人资料</view>
        </view>
        <view class="line"></view>
        <view class="row">
            <view class="title" @click="alertTelClick">修改手机号</view>
        </view>
        <view class="line"></view>
        <view class="row">
            <view class="title" @click="alertLoginPwdClick">修改登录密码</view>
        </view>
        <view class="line"></view>
        <view class="row">
            <view class="title" @click="alertPayPwdClick">更改支付密码</view>
        </view>
        <view class="middleLine"></view>
        <!-- <view class="row">
            <view class="title">评价</view>
        </view>
        <view class="line"></view>
        <view class="row">
            <view class="title">新消息提醒</view>
        </view> -->
        <view class="line"></view>
        <view class="row">
            <view class="title">清除缓存</view>
        </view>
        <view class="middleLine"></view>

        <view class="row">
            <view class="title">检查更新</view>
             <view class="version">{{version}}</view>
        </view>

		<button @click="loginOutAction" class="btnStyle">退出登录</button>

    </view>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      version:''
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    AlipayJSBridge.call('myApiAppVersion', {
    }, (result) => {
      this.version = result.version;
    });
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    // 退出登录
    loginOutAction(){
      AlipayJSBridge.call('popWindow');
    },
    //   个人资料
    personInforClick() {
      uni.navigateTo({
        url: '/pages/mine/myBaseInfo'
      });
    },
    //   修改手机号
    alertTelClick() {
      uni.navigateTo({
        url: '/pages/mine/myAlterTel'
      });
    },
    //   修改登录密码
    alertLoginPwdClick() {
      uni.navigateTo({
        url: '/pages/mine/myAlertLoginPwd'
      });
    },
    // 修改支付密码
    alertPayPwdClick() {
      uni.navigateTo({
        url: '/pages/mine/myPayAlertPwd'
      });
    }

  }
};
</script>

<style scoped>
.bg {
    background:rgba(245,245,245,1);
    min-height: 1400px;
}
.topLine {
    height:12px;
    background:rgba(245,245,245,1);
}
.middleLine {
    height:60px;
}
.row {
    height: 96px;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
}
.version {
  line-height:96px;
  font-size: 25px;
  margin-right: 30px;
}
.line {
    margin-left: 24px;
    height:2px;
    background:rgba(245,245,245,1);
}
.title {
    height:96px;
    font-size:36px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:96px;
    margin-left: 24px;
}
.btnStyle {
  margin-top: 60px;
  width:700px;
  height:88px;
  background:rgba(237,40,86,1);
  border-radius:48px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  font-weight:400;
  font-size: 30px;
  line-height: 88px;
}

</style>
