<template>
    <view class="message">
        <messageInfoListTab
            @tabClick="tabClick"
            @tabmsg="tabmsg"
        >
        </messageInfoListTab>

        <view class="message-concent">
          <view class="uni-flex uni-info" >
            <view class=" message-unread">共{{unread}}条消息未读</view>
            <view class=" message-read" @click="readAll">全部已读</view>
            <view class=" message-vertical-line"></view>
            <view class=" message-category">
              消息类别
            </view>
            <i class="iconfont iconxia message-icon"> </i>
          </view>
          <view v-for="(item,index) in messageList" :key="index" class="message-textTalRow" @tap="showDetail(item.pk,item)">
            <view class="uni-flex uni-row" >
                <view class="message-littleTitle">{{item.typeNameShow}}</view>
                <view class="message-title">{{item.typeName}}</view>
                <view class="message-time">{{item.createTime}}</view>
            </view>
            <view class="uni-flex uni-row">
                <view class="message-info">{{item.title}}</view>
                <view class="message-spot isNew" v-show="item.isNew"></view>
            </view>
          </view>
        </view>
    </view>
</template>
<script>
import messageInfoListTab from './messageInfoListTab';
import jPost from '../../lib/request';

export default {
  name: 'messageInfoList',
  components: {
    messageInfoListTab
  },

  data() {
    return {
      // tabs: [
      //   {
      //     id: '1',
      //     name: '消息',
      //     active: true
      //   },
      //   {
      //     id: '2',
      //     name: '任务',
      //     active: false
      //   }
      // ],

      tabIndex: 1,
      unread: 0,
      messageList: [],
      messageactive: 0
    };
  },

  methods: {
    async tabClick(item, index) {
      console.log(index);
      // this.tabs = e
      this.tabIndex = index;
      this.unread = 2;
      const param = {
        pageNum: 1,
        pageSize: 10,
        unitId: '8700014608_admin',
        typeName: '',
        createDateStr: ''
      };
      const { code, data } = await this.messageService.messageList(param);
      if (code === '1') {
        const {
          list
        } = data;
        // console.log(page.result);
        this.messageList = list;
        console.log(this.messageList);
      }
    },

    showDetail(id, item) {
      console.log(id, JSON.stringify(item));
      uni.navigateTo({
        url: `/pages/messageInfoList/messageInfoListDetail?id=${id}&item=${JSON.stringify(item)}`
      });
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
      .message-unread{
          width:176px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Light,PingFang SC;
          font-weight:300;
          color:rgba(102,102,102,1);
          line-height:34px;
          margin:0px 200px 24px 16px;
      }
      .message-read{
        width:96px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(237,40,86,1);
        line-height:34px;
        margin:0px 34px 24px 16px;
      }
      .message-vertical-line{
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
        margin:0px 8px 24px 34px;
      }
      .message-icon{
        font-size:10px;
        color:rgba(237,40,86,1);
        margin-top:10px;
      }
    }

    .message-textTalRow{
      width:702px;
      height:142px;
      background:rgba(255,255,255,1);
      border-radius:20px;
      padding:24px;
      margin-bottom:24px;
        .uni-flex{
          text-align:center;
          .message-littleTitle{
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

          .message-title{
            width:272px;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height:48px;
            margin-right:44px;
          }
          .message-time{
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
          .message-info{
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
          .message-spot{
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
