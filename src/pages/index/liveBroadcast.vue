<template>
  <view class="liveBroadcas">
    <view class="liveBroadcas-title mla">
      <view class="liveBroadcas-title-web">
        <image class="liveBroadcas-title-img" src="../../assets/img/index/vdieo.png"></image>
        <view class="liveBroadcas-title-con">直播</view>
      </view>
      <view class="liveBroadcas-row" v-if="livingList.length !== 0">
        <view :key="index" class="liveBroadcas-row-con" v-for="(item,index) in livingList">
          <image :src="item.livePageUrl" @tap="goBroadcas(item)" class="liveBroadcas-row-img"></image>
          <view class="liveBroadcas-row-title">{{item.liveName}}</view>
        </view>
      </view>
      <view class="liveBroadcas-else" v-else>
        <image class="liveBroadcas-else-img" src="../../assets/img/index/video-none.png"></image>
        <view class="liveBroadcas-else-title">当前暂无直播信息</view>
      </view>
    </view>

    <view class="liveBroadcas-tit">
      <view class="liveBroadcas-title-web">
        <image src="../../assets/img/index/replay.png" class="liveBroadcas-title-img"></image>
        <view class="liveBroadcas-title-con">回放</view>
      </view>
      <view class="liveBroadcas-row">
        <view class="liveBroadcas-row-con" v-for="(item,index) in list" :key="index">
          <image class="liveBroadcas-row-img" :src="item.livePageUrl" @tap="goBroadcasTwo(item)"></image>
          <view class="liveBroadcas-row-title">{{item.liveName}}</view>
        </view>
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
} from '../../store/mutationsTypes';

export default {
  name: 'liveBroadcast',

  data() {
    return {
      id: '',
      livingList: [],
      list: []
    };
  },
  onLoad(option) {
    this.id = option.id;
    console.log(this.id);
  },
  computed: {
    ...mapGetters({
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
      tokenUserInf: USER.GET_TOKEN_USER,
      saleInfo: USER.GET_SALE
    })
  },
  created() {
    this.getLiveBroadcast();
    this.getList();
  },
  methods: {
    // 直播
    getLiveBroadcast() {
      const that = this;
      // const {data} = await this.HaierNoticeService.queryHaierNoticeForCustomerLoginPage()
      const url = 'https://www.yilihuo.com/ylh-cloud-service-user/api/composite/live/list-live-info-for-b2b';
      const pageNo = 1;
      const pageSize = 20;
      const userId = this.saleInfo.customerCode;
      uni.request({
        url,
        method: 'GET',
        data: {
          pageNo,
          pageSize,
          userId
        },
        success(res) {
          console.log(res.data.data.livingList);
          that.livingList = res.data.data.livingList;
        },
        fail() {
          const msg = '请求失败';
          // if (e && e.errMsg && e.errMsg === 'request:fail timeout') {
          //   msg = '请求超时';
          // }
          uni.showToast({
            titele: msg,
            icon: 'none'
          });
        }
      });
    },
    goBroadcas(item) {
      uni.navigateTo({
        url: `/pages/index/broadcasDetail?url=${item.liveUrl}`
      });
    },
    // 回放
    getList() {
      const that = this;
      // const {data} = await this.HaierNoticeService.queryHaierNoticeForCustomerLoginPage()
      const url = 'https://www.yilihuo.com/ylh-cloud-service-user/api/composite/live/list-back-info-for-b2b';
      const userId = this.saleInfo.customerCode;
      uni.request({
        url,
        method: 'GET',
        data: {
          userId
        },
        success(res) {
          that.list = res.data.data.playBackList.list;
          console.log(that.list);
          // this.list.map(item => {
          //   console.log(item.liveName);
          // })
        },
        fail(e) {
          const msg = '请求失败';
          // if (e && e.errMsg && e.errMsg === 'request:fail timeout') {
          //   msg = '请求超时';
          // }
          uni.showToast({
            titele: msg,
            icon: 'none'
          });
        }
      });
    },
    goBroadcasTwo({ playbackUrl }) {
      let url;
      url = playbackUrl.replace(/(width=[^&]+)&/, 'width=100%25');
      url = url.replace(/(height=[^&]+)&/, '');
      url = encodeURIComponent(url);
      uni.navigateTo({
        url: `/pages/index/broadcasDetail?url=${url}`
      });
    }
  }

};
</script>
<style scoped>
  .liveBroadcas {
    background: #F5F5F5;
    padding: 24px;
  }

  .mla {
    margin-bottom: 24px;
  }

  .liveBroadcas-title {
    width: 100%;
    min-height: 374px;
    background: #FFFFFF;
    border-radius: 20px;
    padding: 30px 24px 40px 24px;
  }

  .liveBroadcas-title-web {
    display: flex;
    font-size: 36px;
    color: #3D96EE;
    align-items: center;
    margin-bottom: 32px;
  }

  .liveBroadcas-title-img {
    width: 50px;
    height: 50px;
    margin-right: 6px;
  }

  .liveBroadcas-else {
    margin: 10% 20% 10% 10%;
    display: flex;
    align-items: center;
  }

  .liveBroadcas-else-img {
    width: 84px;
    height: 84px;
    margin-right: 40px;
  }

  .liveBroadcas-else-title {
    font-size: 40px;
    color: #BBB9B9;
  }

  .liveBroadcas-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .liveBroadcas-row-con {
    width: 48%;
    margin-bottom: 28px;
  }

  .liveBroadcas-row-img {
    width: 100%;
    height: 168px;
    border-radius: 10px;
  }

  .liveBroadcas-row-title {
    font-size: 28px;
    color: #333;
    margin-top: 6px;
  }

  .liveBroadcas-tit {
    width: 100%;
    background: #FFFFFF;
    border-radius: 20px;
    padding: 30px 24px 40px 24px;
  }
</style>
