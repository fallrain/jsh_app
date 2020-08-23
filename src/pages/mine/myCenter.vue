<template>
  <view class="mineCenter">
    <!-- 顶部背景 -->
    <view class="topView">
      <!-- 设置 -->
      <view
        @click='setClick'
        class="iconfont iconshezhi mineCenter-set"
      >
      </view>
      <!-- 头像栏 -->
      <view class="headerRow">
        <!-- 头像 -->
        <view
          @click="sdfClick"
          class="headerImage"
        ></view>
        <view>
          <view class="nameAndPosion">
            <!-- 姓名职位 -->
            <view class="name">{{tokenUserInfo.nickname}}</view>
            <view class="posion">总经理</view>
          </view>
          <view class="detail">售达方：({{saleInfo.customerCode}}) {{saleInfo.customerName}}</view>
        </view>
      </view>
    </view>
    <!-- 金额数据栏 -->
    <view class="moneyArea">
      <view>
        <view class="moneyName">账户余额（元）</view>
        <view class="moneyCount">¥ {{accountTotal}}</view>
      </view>
      <view class="blank"></view>
      <view>
        <view class="moneyName">可用返利</view>
        <view class="moneyCount">¥ {{outstandingAmount}}</view>
      </view>
    </view>
    <!-- 我的订单 -->
    <view class="myOrderRow">
      <view class="colorBlock"></view>
      <view class="orderTitle">我的订单</view>
      <view class="allOrder" @click="goAllOrder">全部订单</view>
    </view>

    <view class="order-cataloglist">
      <view
        class="order-cataloglist-item"
        v-for="item in cataloglist"
        :key="item.id"
        @click="goCatalog(item.url,item.sex)"
      >
        <image :src="item.src" class="infor-item-img" mode="aspectFit"/>
        <view class="cataloglist-item-title">{{item.title}}</view>
      </view>
    </view>

    <!-- 分割线 -->
    <view class="line"></view>

    <!-- 商品关注 -->
    <view class="focusProduct">
      <view>
        <view class="productTitle">商品关注</view>
        <view class="productSubTitle">快捷便利查看关注商品</view>
      </view>
      <view class="product">
      </view>
    </view>

    <view class="lineOne"></view>

    <view class="order-cataloglist">
      <view
        class="infor-cataloglist-item"
        v-for="item in inforlist"
        :key="item.id"
        @click="goCatalog(item.url,item.id)"
      >
        <image :src="item.src" class="cataloglist-item-img" mode="aspectFit"/>
        <view class="cataloglist-item-title">{{item.title}}</view>
      </view>
    </view>

    <view class="lineOne"></view>

    <!-- 经营看板 -->
    <view class="focusProduct">
      <view>
        <view class="productTitle">经营看板</view>
        <view class="productSubTitle">动态数据实时查看，了解，跟踪</view>
      </view>
      <view class="board">
      </view>
    </view>

    <view class="bottom"></view>

  </view>

</template>

<script>

import {
  USER
} from '../../store/mutationsTypes';
import {
  mapActions,
  mapGetters
} from 'vuex';

export default {
  name: 'myCenter',
  components: {},
  data() {
    return {
      // 用户信息
      tokenUserInfo: {},
      // 售达方信息
      saleInfo: {},
      payerBalanceList: [],
      auxiliary: [],
      accountTotal: 0,
      // 返利
      outstandingAmount: 0,
      cataloglist: [
        {
          id: 1,
          src: require('./image/jiesuan.png'),
          title: '待结算',
          url: '/pages/orderList/orderList',
          sex: 0
        },
        {
          id: 2,
          src: require('./image/koukuan.png'),
          title: '待扣款',
          url: '/pages/orderList/orderList',
          sex: 1
        },
        {
          id: 3,
          src: require('./image/daifahuo.png'),
          title: '待发货',
          url: '/pages/orderList/orderList',
          sex: 2
        },
        {
          id: 4,
          src: require('./image/yifahuo.png'),
          title: '已发货',
          url: '/pages/orderList/orderList',
          sex: 3
        },
        {
          id: 5,
          src: require('./image/yiqianshou.png'),
          title: '已签收',
          url: '/pages/orderList/orderList',
          sex: 4
        },
        {
          id: 6,
          src: require('./image/danju.png'),
          title: '物流拒单',
          url: '/pages/orderList/orderList',
          sex: 7
        },
        {
          id: 7,
          src: require('./image/tuihuo.png'),
          title: '退货订单',
          url: '/pages/orderList/orderList',
          sex: 8
        },
        {
          id: 8,
          src: require('./image/yiquxiao.png'),
          title: '已取消',
          url: '/pages/orderList/orderList',
          sex: 6
        },
        {
          id: 9,
          src: require('./image/daifahuo.png'),
          title: '已开票',
          url: '/pages/orderList/orderList',
          sex: 5
        }
      ],
      inforlist: [
        {
          id: '0',
          src: require('./image/jibenxinxi.png'),
          title: '基本信息',
          url: '/pages/mine/myGuestView'
        },
        {
          id: '1',
          src: require('./image/qianyuexinxi.png'),
          title: '签约信息',
          url: '/pages/mine/myGuestView'
        },
        {
          id: '2',
          src: require('./image/mendianxinxi.png'),
          title: '门店信息',
          url: '/pages/mine/myGuestView'
        },
        {
          id: '4',
          src: require('./image/fukuanfang.png'),
          title: '付款方信息',
          url: '/pages/mine/myGuestView'
        },
        {
          id: '3',
          src: require('./image/songfafang.png'),
          title: '送达方信息',
          url: '/pages/mine/myGuestView'
        }
      ]
    };
  },
  created() {
    this.setPageInfo();
  },
  computed: {
    ...mapGetters({
      [USER.GET_SALE]: USER.GET_SALE,
      [USER.GET_TOKEN_USER]: USER.GET_TOKEN_USER,
      userInf: USER.GET_USER,
    })
  },
  methods: {
    ...mapActions([
      USER.UPDATE_SALE_ASYNC,
      USER.UPDATE_TOKEN_USER_ASYNC,
    ]),
    setPageInfo() {
      this.getUserInfoByToken();
      this.getSaleInfo();
      this.auxiliaryFun('2110', '1');
      this.outstandingAmountFun();
    },
    async getUserInfoByToken() {
      /* 获取token用户信息 */
      if (!this[USER.GET_TOKEN_USER] || JSON.stringify(this[USER.GET_TOKEN_USER]) === '{}') {
        await this[USER.UPDATE_TOKEN_USER_ASYNC]();
      }
      this.tokenUserInfo = this[USER.GET_TOKEN_USER] || {};
    },
    async getSaleInfo() {
      /* 获取售达方信息 */
      if (!this[USER.GET_SALE] || JSON.stringify(this[USER.GET_SALE]) === '{}') {
        await this[USER.UPDATE_SALE_ASYNC]();
      }
      this.saleInfo = this[USER.GET_SALE] || {};
    },
    // 付款方余额
    async payerBalanceListFun(param) {
      console.log('payerBalanceList');
      const { code, data } = await this.mineServer.payerBalanceList(param);
      if (code === '1') {
        this.payerBalanceList = data;
        this.accountTotal = 0;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element == null) return;
          this.accountTotal = this.accountTotal + parseFloat(element.balance);
        }
      }
      this.accountTotal = this.accountTotal.toFixed(2);
    },
    async auxiliaryFun(salesGroupCode, status) {
      /* 付款方列表 */
      const { code, data } = await this.mineServer.auxiliary(salesGroupCode, status);
      if (code === '1') {
        this.auxiliary = data;
        this.payerBalanceListFun(data);
      }
    },
    async outstandingAmountFun() {
      /* 返利 */
      const param = {
        ccusCode: this.userInf.customerCode,
        endDate: '',
        iqueren: '',
        productCode: '',
        startDate: '',
        status: '',
      };
      const { code, data } = await this.mineServer.outstandingAmount(param);
      if (code === '1') {
        this.outstandingAmount = data.toFixed(2);
      }
    },
    goCatalog(url, index) {
      uni.navigateTo({
        url: `${url}?index=${index}`
      });
      console.log(url);
    },
    // 设置
    setClick() {
      console.log('setClick');
      uni.navigateTo({
        url: '/pages/mine/mySetDetail'
      });
    },
    // 售达方信息
    sdfClick() {
      console.log('setClick');
      uni.navigateTo({
        url: '/pages/mine/mySDFInfo'
      });
    },
    goAllOrder() { // 前往订单列表，全部
      uni.navigateTo({
        url: `/pages/orderList/orderList?index=${0}`
      });
    }
  },
};
</script>

<style scoped>
  .mineCenter {
    background: white;
    min-height: 1400px;
  }

  .headerRow {
    display: flex;
  }

  .topView {
    position: relative;
    width: 750px;
    height: 398px;
    background: url('./image/top.png') no-repeat;
    background-size: 100%;
    background-position: 0 -25px;
    padding-top: 54px;
  }

  .set {
    display: flex;
    justify-content: flex-end;
    margin-right: 24px;
  }

  .headerImage {
    width: 160px;
    height: 160px;
    margin-left: 50px;
    background-color: antiquewhite;
  }

  .nameAndPosion {
    display: flex;
  }

  .name {
    margin-left: 24px;
    height: 56px;
    font-size: 40px;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 56px;
  }

  .posion {
    height: 40px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    margin-left: 24px;
    margin-top: 12px;
  }

  .detail {
    margin-left: 24px;
    margin-right: 60px;
    margin-top: 26px;
    height: 34px;
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 34px;
  }

  .moneyArea {
    position: relative;
    width: 718px;
    height: 194px;
    background: url('./image/money-bg.png') no-repeat;
    background-size: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -150px;
    display: flex;
  }

  .moneyName {
    margin-left: 48px;
    padding-top: 44px;
    height: 14px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 14px;
  }

  .moneyCount {
    margin-left: 48px;
    padding-top: 40px;
    height: 66px;
    font-size: 48px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    line-height: 66px;
  }

  .blank {
    width: 20px;
  }

  .myOrderRow {
    display: flex;
    margin-top: 40px;
  }

  .colorBlock {
    width: 6px;
    height: 26px;
    margin-left: 40px;
    background: rgba(237, 40, 86, 1);
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 16px;
  }

  .orderTitle {
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }

  .allOrder {
    height: 40px;
    font-size: 12px;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 440px;
  }

  .order-cataloglist {
    display: flex;
    column-count: 5;
    flex-wrap: wrap;
    margin: 40px 22px 0px 32px;
  }

  .order-cataloglist-item {
    margin-right: 46px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  :nth-child(5) {
    margin-right: 0px;
  }

  :nth-child(10) {
    margin-right: 0px;
  }

  .cataloglist-item-img {
    width: 100px;
    height: 72px;
    background-size: 100%;
  }

  .cataloglist-item-title {
    margin-top: 12px;
    height: 34px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    text-align: center;
  }

  .line {
    height: 6px;
    background: rgba(245, 245, 245, 1);
  }

  .focusProduct {
    display: flex;
  }

  .productTitle {
    height: 42px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
    margin-top: 40px;
    margin-left: 40px;
  }

  .productSubTitle {
    height: 34px;
    width: 360px;
    font-size: 24px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 34px;
    margin-left: 40px;
  }

  .product {
    width: 174px;
    height: 156px;
    background: url('./image/shangpinguanzhu.png') no-repeat;
    background-size: 100%;
    margin-top: 20px;
    margin-left: 120px;
    margin-bottom: 4px;
  }

  .lineOne {
    height: 2px;
    background: rgba(245, 245, 245, 1);
  }

  .infor-cataloglist-item {
    margin-right: 31px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .infor-item-img {
    width: 100px;
    height: 68px;
    background-size: 100%;
  }

  .board {
    width: 174px;
    height: 156px;
    background: url('./image/jingyingkanban.png') no-repeat;
    background-size: 100%;
    margin-top: 20px;
    margin-left: 120px;
    margin-bottom: 4px;
  }

  .bottom {
    height: 84px;
    background: rgba(245, 245, 245, 1);
  }

  .mineCenter-set {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 34px;
    color: #fff;
    font-weight: 600;
  }

</style>
