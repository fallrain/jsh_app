<template>
  <view class="mineSignInfo-bg">
    <view class="mineSignInfo" v-for="(item,index) in signList" :key="index">
      <view class="mineSignInfo-group">
        <mine-sign-info :info="item" :index="index" ></mine-sign-info>
      </view>
    </view>
  </view>
</template>

<script>
import mineSignInfo from '../../components/mine/mine-sign-item';
import {
  mapActions,
  mapGetters
} from 'vuex';

export default {
  name: 'mySignInfo',
  components: {
    mineSignInfo
  },
  data() {
    return {
      signList: [],
      total: 0,
      pageNo: 1
    };
  },
  computed: {
    ...mapGetters({
      [USER.GET_SALE]: USER.GET_SALE,
      [USER.GET_TOKEN_USER]: USER.GET_TOKEN_USER,
      userInf: USER.GET_USER,
    })
  },
  created() {
    this.getSignList(this.pageNo);
  },
  methods: {
    ...mapActions([
      USER.UPDATE_SALE_ASYNC,
      USER.UPDATE_TOKEN_USER_ASYNC,
    ]),
    async getSignList(pageNo) {

      console.log(this.userInf)

      const { code, data } = await this.mineServer.mineSignList(this.userInf.customerCode, pageNo);
      if (code === '1') {
        const { contractMessageDtoList } = data;
        if (pageNo === 1) {
          this.signList = [];
        }
        this.signList = this.signList.concat(contractMessageDtoList);
        this.pageNo = this.pageNo + 1;
      }
      this.total = data.total;
      console.log(data);
    },
    viewNextPage() {
      console.log('查看更多');
    }
  },
  onReachBottom() {
    console.log('到底了，该加页了');
    if (this.total > (this.pageNo - 1) * 15) {
      this.getSignList(this.pageNo);
    } else {
      console.log('到底了，没数了');
    }
  }
};
</script>

<style scoped>
  .mineSignInfo-bg{
    background: #F5F5F5;
    min-height:1400px;
  }
  .mineSignInfo{
    padding: 24px 24px 0 24px;
  }
  .mineSignInfo-group {
    border-radius: 10px;
    background: #fff;
    padding-left: 14px;
    padding-right: 14px;
  }

</style>
