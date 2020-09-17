<template>
<view class="order-node">
  <view class="content">
    <!--订单创建-->
    <view v-if="infoList.info.jshi_created_time" class="order-item">
      <view class="order-item-line">
        <view class="iconfont icondingdanchuangjian1"></view>
      </view>
      <view class="order-item-content">
        <view class="order-item-content-item">
          <view class="leftTitle">订单创建</view>
          <view class="rightText">{{formateDate(infoList.info.jshi_created_time)}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">订单金额</view>
          <view class="rightText">￥{{parseFloat(infoList.details[0].jshd_amount).toFixed(2)}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">预定金比例</view>
          <view class="rightText">{{parseFloat(infoList.details[0].jshd_pre_rate).toFixed(2)}}%</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">预定金金额</view>
          <view class="rightText">￥{{parseFloat(infoList.details[0].jshd_pre_amount).toFixed(2)}}</view>
        </view>
      </view>
    </view>
    <!--订单评审-->
    <view v-if="infoList.info.sap_judge_status" class="order-item">
      <view class="order-item-line">
        <view class="iconfont icondingdanpingshen1"></view>
      </view>
      <view class="order-item-content">
        <view class="order-item-content-item">
          <view class="leftTitle">订单评审</view>
          <view class="rightText">{{infoList.info.sap_judge_date}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">评审状态</view>
          <view class="rightText">{{infoList.info.sap_judge_status === 'Y' ?'通过':'失败'}}</view>
        </view>
      </view>
    </view>
    <!--工厂发货-->
    <!--<view v-if="infoList.info.jshd_amount" class="order-item">
      <view class="order-item-line">
        <view class="iconfont icondingdanchuangjian1"></view>
      </view>
      <view class="order-item-content">
        <view class="order-item-content-item">
          <view class="leftTitle">工厂发货</view>
          <view class="rightText">{{infoList.info.jshd_amount}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">发货状态</view>
          <view class="rightText">{{infoList.info.jshd_amount}}</view>
        </view>
      </view>
    </view>-->
    <!--中心入库-->
    <view v-if="infoList.info.sap_center_recieve_date" class="order-item">
      <view class="order-item-line">
        <view class="iconfont iconzhongxinruku1"></view>
      </view>
      <view class="order-item-content">
        <view class="order-item-content-item">
          <view class="leftTitle">中心入库</view>
          <view class="rightText">{{infoList.info.sap_center_recieve_date}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">入库状态</view>
          <view class="rightText">{{infoList.details[0].whDescribe}}</view>
        </view>
      </view>
    </view>
    <!--订单扣款-->
    <view v-if="infoList.details[0].whDescribe" class="order-item">
      <view class="order-item-line">
        <view class="iconfont icondingdankoukuan1"></view>
      </view>
      <view class="order-item-content">
        <view class="order-item-content-item">
          <view class="leftTitle">订单扣款</view>
          <view class="rightText">{{formateDate(infoList.info.jshi_pay_time)}}</view>
        </view>
        <view class="order-item-content-item">
          <view class="leftTitle">尾款扣减</view>
          <view class="rightText">
            {{(Number(infoList.details[0].jshd_amount)-Number(infoList.details[0].jshd_pre_amount).toFixed(2))}}
            <text v-if="infoList.info.jshi_order_status==='9'"
              class="ml20"
            >(成功)</text>
          </view>
        </view>
      </view>
    </view>
  </view>
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
  data() {
    // 这里存放数据
    return {
      infoList: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
    formateDate() {
      return date => date.split(' ')[0];
    }
  },
  created() {
  },
  onLoad(option) {
    if (option.currentInfo) {
      this.infoList = JSON.parse(option.currentInfo);
      console.log(this.infoList);
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {

  }
};
</script>

<style lang="scss">
.order-node{
  min-height: calc(100vh - var(--window-top));
  background: #F5F5F5;
  padding: 24px;
  .order-item{
    font-size: 30px;
    display: flex;
    margin-bottom: 60px;
    .order-item-line{
      color: $theme-color;
      width: 64px;
    }
    .order-item-content{
      flex-grow: 1;
      .order-item-content-item{
        display: flex;
        line-height: 50px;
        .leftTitle{
          width: 200px;
          text-align: right;
          color: #333;
        }
        .rightText{
          padding-left: 50px;
          flex-grow: 1;
          color: #999;
        }
      }
    }
  }
  .content {
    padding: 24px;
    border-radius: 10px;
    background-color: white;
  }
  .img {
    width: 64px;
    height: 64px;
    margin-left: 38px;
    color: $theme-color;
  }
  .upLine {
    width: 6px;
    height: 254px;
    margin-left: 64px;
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
  .iconfont {
    font-size: 60px;
  }
}
</style>
