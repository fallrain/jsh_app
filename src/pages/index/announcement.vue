<template>
  <view class="announcement">
    <view
      class="announcement-con"
      v-for="item in list"
      :key="item.id"
    >
      <view class="announcement-con-title" @tap="goInfoDetail(item)">{{item.title}}</view>
      <view class="announcement-con-row">
        <view class="announcement-con-row-at">{{item.typeStr}}</view>
        <view class="announcement-con-row-bt" v-show="item.creatorDept">{{item.creatorDept}}</view>
        <i class="announcement-con-row-icon iconfont iconshijian"></i>
        <view class="announcement-con-row-time">{{item.publishTime}}</view>
      </view>
      <view class="announcement-con-img" @tap="goInfoDetail(item)">
          <image :src="item.img">
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
  name: 'announcement',
  data() {
    return {
    //   num: 0,
      total: 0, // 列表总数
      pageNo: 1,
      list: [
        // {
        //   id: 1,
        //   title: "集成化家电会成为家电行业未来的新升级趋…",
        //   at: "家电",
        //   bt: "科普",
        //   time:"2020-9-21",
        //   image: require('@/assets/img/index/new-pic.png')
        // },
        // {
        //   id: 2,
        //   title: "集成化家电会成为家电行业未来的新升级趋…",
        //   at: "家电",
        //   bt: "科普",
        //   time:"2020-9-21",
        //   image: require('@/assets/img/index/new-pic.png')
        // }

      ]
    };
  },
  created() {
    this.getList(1);
  },
  computed: {
    ...mapGetters({
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
      tokenUserInf: USER.GET_TOKEN_USER,
      saleInfo: USER.GET_SALE
    })
  },
  methods: {
    async getList(pageNo) {
      let a = 0;
      a = `${this.saleInfo.customerCode}_admin`;

      console.log(pageNo);
      const { code, data } = await this.messageService.page(this.jshUtil.genQueryStringByObj({
        title: '',
        customerCode: Number(this.saleInfo.customerCode),
        pageNum: pageNo,
        pageSize: 10,
        type: '',
        creatorDept: '',
        publishTimeStr: '',
        unitId: a
      }));
      if (code === '1') {
        data.list.map((item) => {
          item.img = require('@/assets/img/index/new-pic.png');
        });
        console.log(data);
        // this.list = data.list;
        if (pageNo === 1) {
          this.list = [];
        }
        this.list = this.list.concat(data.list);
        this.pageNo = this.pageNo + 1;
        this.total = data.total;
      } else {
      //   this.list = [];
      //   uni.showToast({
      //     title: '暂无数据',
      //     icon: 'none',
      //     duration: 3000
      //   });
      }
    },
    onReachBottom() {
      console.log('到底了，该加页了');
      if (this.list.length > 0 && (this.total > (this.pageNo - 1) * 10)) {
        this.getList(this.pageNo);
      } else {
        console.log('到底了，没数了');
      }
    },
    goInfoDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/index/information?id=${item.id}`
      });
    }
  }

};
</script>
<style scoped>
.announcement {
  background: #F5F5F5;
  padding: 24px;
}
.announcement-con {
  width: 702px;
  height: 320px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 24px;
  padding: 24px 32px 24px 30px;
}
.announcement-con-title {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
  margin-bottom: 14px;
}
.announcement-con-row {
  position: relative;
  display: flex;
  margin-bottom: 22px;

}
.announcement-con-row-at {
  width: 84px;
  height: 32px;
  background: #EBF2FA;
  border-radius: 8px;
  color: #2283E2;
  font-size:24px;
  line-height:32px;
  text-align: center;
  margin-right: 16px;

}
.announcement-con-row-bt {
  width: 84px;
  height: 32px;
  background: #FFEAE1;
  border-radius: 8px;
  color: #FF641D;
  line-height:32px;
  text-align: center;
  font-size: 24px;

}
.announcement-con-row-icon {
  font-size: 27px !important;
  color: #2283E2;
  margin-top: 4px;
  margin-right: 10px;
  /*margin-left: 284px;*/
  position: absolute;
  right: 130px;
}
.announcement-con-row-time {
  position: absolute;
  right: 0px;
  font-size: 24px;
  color: #666;
}
.announcement-con-img {
  width: 654px;
  height: 160px;

}
image {
    width: 100%;
    height: 100%;

}

</style>
