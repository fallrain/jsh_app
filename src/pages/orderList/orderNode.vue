<template>
<view style="display:flex">
  <!-- 左边 -->
  <view>
    ss
  </view>
  <!-- 右边 -->
  <view >
    <view class="row">
        <view class="leftTitle">订单创建</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">订单金额</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">预定金比例</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view style="height:16px"></view>
    <view class="row">
        <view class="leftTitle">订单评审</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">评审状态</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">工程发货</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">发货状态</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">中心入库</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">入库状态</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">订单扣款</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>
    <view class="row">
        <view class="leftTitle">尾款扣减</view>
        <view class="rightText">2020-06-24 11:27:44</view>
    </view>


  </view>
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
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {

  }
}
</script>

<style scoped>
.row {
  display: flex;
}
.leftTitle {
  font-size: 30px;
  font-weight: 400;
  color: #333333;
  line-height: 42px;
  margin-left: 56px;
  margin-top: 56px;
  width: 160px;
  text-align: center;
}
.rightText {
  font-size: 28px;
  font-weight: 400;
  color: #999999;
  line-height: 40px;
  margin-left: 56px;
  margin-top: 56px;
}
</style>
