<template>
<view class="bg">
<view class="content">
  <!-- 左边 -->
  <view>
    <view style="margin-top: 16px;"></view>
    <view class="img"></view>
    <view class="upLine"></view>
    <view class="img"></view>
    <view class="middleLine"></view>
    <view class="img"></view>
    <view class="thirdLine"></view>
    <view class="img"></view>
    <view class="forthLine"></view>
    <view class="img"></view>
  </view>
  <!-- 右边 -->
  <view >
    <view class="row">
        <view class="leftTitle">订单创建</view>
        <view class="rightText">{{infoList.info.jshi_created_time}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">订单金额</view>
        <view class="rightText">{{infoList.info.jshd_amount}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">预定金比例</view>
        <view class="rightText">{{infoList.info.jshd_amount}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">预定金金额</view>
        <view class="rightText">{{infoList.info.jshd_pre_amount}}</view>
    </view>
    <view style="height:16px"></view>
    <view class="row">
        <view class="leftTitle">订单评审</view>
        <view class="rightText">{{infoList.info.jsap_judge_date}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">评审状态</view>
        <view class="rightText">{{infoList.info.sap_judge_status == 'Y' ?'通过':'失败'}}</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">工厂发货</view>
        <view class="rightText">{{infoList.info.jshd_amount}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">发货状态</view>
        <view class="rightText">{{infoList.info.jshd_amount}}</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">中心入库</view>
        <view class="rightText">{{infoList.info.jshd_amount}}</view>
    </view>

    <view style="height:16px"></view>

    <view class="row">
        <view class="leftTitle">入库状态</view>
        <view class="rightText">{{infoList.info.sap_center_recieve_date}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">订单扣款</view>
        <view class="rightText">{{infoList.info.jshi_pay_time}}</view>
    </view>
    <view class="row">
        <view class="leftTitle">尾款扣减</view>
        <view class="rightText">{{infoList.info.jshd_pre_amount}}</view>
    </view>
    <view style="height:20px"></view>

  </view>
</view>
<view style="height:140px"></view>
</view>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import {
  ORDER
} from '../../store/mutationsTypes';
import {
  mapGetters
} from 'vuex';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      infoList:{},
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
  },
  created() {
    console.log('11111111');
    this.infoList = this[ORDER.GET_ORDER].orderDetail;
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
.bg {
  margin-top: -4px;
  height: 100%;
  background-color: #F5F5F5;
}
.content {
  display: flex;
  margin-top: 48px;
  margin-right: 24px;
  margin-left: 24px;
  border-radius: 10px;
  background-color: white;
}
.img {
  width: 64px;
  height: 64px;
  margin-left: 38px;
  background-color:red;
}
.upLine {
  width: 2px;
  height: 254px;
  margin-left: 68px;
  background: #F5F5F5;
  /* background-color:red; */
}
.middleLine {
  width: 2px;
  height: 120px;
  margin-left: 68px;
  background: #F5F5F5;
  /* background-color:red; */
}
.thirdLine {
  width: 2px;
  height: 112px;
  margin-left: 68px;
  background: #F5F5F5;
  /* background-color:red; */
}
.forthLine {
  width: 2px;
  height: 52px;
  margin-left: 68px;
  background: #F5F5F5;
  /* background-color:red; */
}
.row {
  display: flex;
}
.leftTitle {
  font-size: 30px;
  font-weight: 400;
  color: #333333;
  line-height: 42px;
  margin-left: 56px;
  margin-top: 32px;
  width: 160px;
  text-align: center;
  /* background: green; */
}
.rightText {
  font-size: 28px;
  font-weight: 400;
  color: #999999;
  line-height: 40px;
  margin-left: 56px;
  margin-top: 26px;
  /* background: yellowgreen; */
}
</style>
