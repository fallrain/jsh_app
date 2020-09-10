<template>
  <view class="messageTask">
    <view class="messageTask-screen">
      <view>筛选</view>
      <i class="iconfont iconshaixuan"></i>
    </view>
    <view class="messageTask-task">
      <button class="messageTask-task-completed mla" :class="show && 'active1'" @tap="getActive">已完成任务</button>
      <button class="messageTask-task-completed mlb" :class="!show && 'active2'" @tap="getActive">待办任务</button>
    </view>
    <view class="messageTask-content">
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">截止到2019年7月，有0条未对帐信息</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔GVS发票未签收</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔POS年费未缴费，请及时处理
        </view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔文档没有电子签章，请及时签章
        </view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔哪买哪退未确认</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 条公函待确
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "massageTask",
  data() {
    return {
      show: true
    };
  },
  methods: {
    getActive() {
      this.show = !this.show;
    }
  }

}
</script>

<style lang="scss" scoped>
.messageTask-screen {
  display: flex;
  margin-left: 82%;
  font-size: 24px;
  color: #ED2856;
  margin-top: 24px;
}
.messageTask-task{
  display: flex;
  margin-left: 50px;
  margin-top: 24px;
  .messageTask-task-completed{
    width:325px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    background: #FFFEFE;
    border: 2px solid #ED2856;
    color: #ED2856;
    font-size: 30px;
  }
  .mla {
    border-radius: 12px 0px 0px 12px;
  }
  .mlb {
    border-radius: 0px 12px 12px 0px;
  }
  .active1 {
    color: #fff;
    background: #ED2856;
    border-radius: 12px 0px 0px 12px;
  }
  .active2 {
    color: #fff;
    background: #ED2856;
    border-radius: 0px 12px 12px 0px;
  }
}
.messageTask-content {
  margin-top: 58px;
}
.messageTask-content-info {
  margin-bottom: 50px;
  display: flex;
}
.messageTask-content-car {
  margin-left: 74px;
  width: 20px;
  height: 20px;
  background: #DCDEE0;
  border-radius: 20px;
}
</style>
