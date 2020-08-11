<template>
    <view class="bg">

      <view class="topLine"></view>
      <view class="row">
        <view class="title">支付密码</view>
        <input class="inputView" placeholder="请输入支付密码"></input>
      </view>

      <view class="lineView"></view>

      <view class="row">
        <view class="title">新密码</view>
        <input class="inputView" placeholder="请输入支付密码"></input>
      </view>

      <view class="lineView"></view>

      <view class="row">
        <view class="title">确认密码</view>
        <input class="inputView" placeholder="请输入支付密码"></input>
      </view>

      <button class="btnStyle">修改</button>
    </view>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {

  }
}
</script>

<style scoped>
.bg {
  width:750px;
  min-height:1400px;
  background:rgba(245,245,245,1)
}
.topLine {
  height: 12px;
  background:rgba(245,245,245,1)
}
.row {
  height: 96px;
  background:white;
  display: flex;
}
.title {
  margin-left: 24px;
  width: 180px;
  height:48px;
  font-size:34px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:96px;
}
.inputView {
  height: 96px;
}
.uni-input-placeholder {
    font-size:34px;
    font-weight:400;
    color:rgba(204,204,204,1);
}
.lineView {
  height: 2px;
  background:rgba(245,245,245,1);
}
.authCode {
  height:96px;
  font-size:34px;
  font-weight:400;
  color:rgba(22,119,255,1);
  line-height:96px;
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
