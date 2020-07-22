<template>
    <view class="message">
        <messageInfoListTab :tabs="tabs" 
            @tabClick="tabClick"
        >
        </messageInfoListTab>
        
        <view class="message-concent"> 
          <view class="uni-flex uni-info" >
            <view class="textRow unread">共{{unread}}条消息未读</view>
            <view class="textRow read" @click="readAll">全部已读</view>
            <view class="textRow vertical-line"></view>
            <view class="textRow message-category">消息类别</view>
          </view>
          <view v-for="(item,index) in messageList" :key="index" class="textTalRow" @click="showDetail">
            <view class="uni-flex uni-row" >
                <view class="textRow littletitle">{{item.littletitle}}</view>
                <view class="textRow title">{{item.title}}</view>
                <view class="textRow time">{{item.time}}</view>
            </view>
            <view class="uni-flex uni-row">
                <view class="textRow info">{{item.info}}</view>
                <view class="textRow spot isNew" v-show="item.isNew"></view>
            </view>
          </view>
        </view>
    </view>
</template>
<script>
import messageInfoListTab from './messageInfoListTab';

export default {
  name: 'Message',
  components: {
    messageInfoListTab
  },
  data() {
    return {
      tabs: [
        {
          id: '1',
          name: '消息',
          active: true
        }, 
        {
          id: '2',
          name: '任务',
          active: false
        }
      ],
      tabIndex: 1,
      unread: 0,
      messageList: []
    };
  },
  methods: {
    tabClick(data) {
      this.tabIndex = data;
      this.unread = 2;
      this.messageList = [
        {
          littletitle:"建店押金",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: true
        },
         {
          littletitle:"扣款提醒",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: true
        }, 
        {
          littletitle:"订单详情",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: false
        }, 
        {
          littletitle:"其他",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: false
        },
        {
          littletitle:"订单详情",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: false
        }, 
        {
          littletitle:"订单详情",
          title: '整车扣款信息提醒',
          time: '2020-07-13 12:31:00',
          info: '尊敬的客户您提报的整车订单，订单200021623445...',
          isNew: false
        }
      ];
    },
    showDetail() {
    },
    readAll() {
    }
  },

  onLoad() {
    this.tabClick(1);
  }
};
</script>
<style lang="scss" scoped>
.message {
  width:750px;
  height:1520px;
  background:rgba(245,245,245,1);
  
 .message-concent{
    box-sizing:border-box;
    width:750px;
    padding:24px;
    .uni-info{
      .unread{
          width:176px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Light,PingFang SC;
          font-weight:300;
          color:rgba(102,102,102,1);
          line-height:34px;
          margin:0px 200px 24px 16px;
      }
      .read{
        width:96px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(237,40,86,1);
        line-height:34px;
        margin:0px 44px 24px 16px;
      }
      .vertical-line{
        width:2px;
        height:26px;
        background:#C4C4C4;
        margin-top:4px;
      }
      .message-category{
        width:96px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(237,40,86,1);
        line-height:34px;
        margin:0px 0px 24px 44px;
      }
    }
  
    .textTalRow{
      width:702px;
      height:142px;
      background:rgba(255,255,255,1);
      border-radius:20px;
      padding:24px;
      margin-bottom:24px;
        .uni-flex{
          text-align:center;
          .littletitle{
            width:88px;
            height:32px;
            background:rgba(237,40,86,1);
            border-radius:17px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:32px;
            margin:8px 12px 8px 0px;
          }

          .title{
            width:272px;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height:48px;
            margin-right:44px;
          }
          .time{
            width:238px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(237,40,86,1);
            line-height:34px;
            text-align:right;
            margin:8px 0 6px 0px;
          }
          .info{
            width:616px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(102,102,102,1);
            line-height:34px;
            margin-top:12px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            text-align:left;
          }
          .spot{
            width:16px;
            height:16px;
            background:rgba(237,40,86,1);
            margin:24px 0px 8px 22px;
            border-radius:20px;
            text-align:center;
            line-height:16px;
          }
        }
      
    }
  }
}

</style>
