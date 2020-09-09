<template>
    <view class="massageDetail" >
      <view class="massageDetail-infotitle">
        <text class="massageDetail-littleTitle">{{detail.typeNameShow}}</text>
        <text class="massageDetail-title">{{detail.title}}</text>
      </view>
      <view class="massageDetail-info">
        <view class="massageDetail-border">{{detail.description}}</view>
        <view class="massageDetail-alltime">
          <text class="massageDetail-time">{{detail.createTime}}</text>
          <text class="massageDetail-time massageDetail-delete" @tap="deleteMessageOne">X 删除此消息</text>
        </view>
      </view>
    </view>
</template>
<script>
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '@/store/mutationsTypes';

export default {
  name: 'messageInfoListDetail',
  data() {
    return {
      detail: {},
      id: 0,
      // message: {}
    };
  },
  onLoad(option) {
    const { id, item } = option;
    // this.message = JSON.parse(item);
    this.findDetailById(id, JSON.parse(item));
    console.log(option.id);
    this.id = id;
  },
  computed: {
    ...mapGetters({
      saleInfo: USER.GET_SALE,
    })
  },
  methods: {
    findDetailById(id, item) {
      this.detail = {
        id,
        typeNameShow: item.typeNameShow,
        title: item.title,
        createTime: item.createTime,
        description: item.description,
        isNew: false
      };
      console.log(this.detail);
    },
    deleteMessageOne() {
      const _this = this;
      uni.showModal({
        title: '',
        content: '确认要删除此消息吗',
        success(res) {
          if (res.confirm) {
            _this.deleteMessage();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    async deleteMessage() {
      const { code } = await this.messageService.deleteMessage({
        id: this.id
      });
      if (code === '1') {
        // this.detail.splice(0, 1);
        console.log(this.detail)
        uni.showToast({
          title: '删除成功',
        });
        console.log(this.detail);
        const param = {
          pageNum: 1,
          pageSize: 10,
          unitId: `${this.saleInfo.customerCode}_admin`,
          typeName: '',
          createDateStr: ''
        };
        const { code, data } = await this.messageService.messageList(param);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
    .massageDetail{
        padding:24px;
        background:rgba(245,245,245,1);
        .massageDetail-littleTitle{
            display: inline-block;
            width:88px;
            // height:32px;
            background:rgba(237,40,86,1);
            border-radius:17px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:32px;
            margin:8px 26px 8px 10px;
            text-align:center;

        }
        .massageDetail-title{
            display: inline-block;
            font-size:34px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height:48px;
            font-size:28px;

        }
        .massageDetail-info{
            width:702px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            padding:24px 24px 28px 24px;
            .massageDetail-infoTips{
                width:654px;
                height:80px;
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:40px;
            }
            .massageDetail-border{
               border-bottom:1px solid #D8D8D8;
                padding-bottom:24px;
            }
            .massageDetail-alltime{
              margin-top:18px;
            }
            .massageDetail-time{
                width:238px;
                height:34px;
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(237,40,86,1);
                line-height:34px;
                margin-top:24px;
            }
            .massageDetail-delete{
                margin-left:272px;
            }

        }

    }
</style>
