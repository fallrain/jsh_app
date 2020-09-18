<template>
  <view v-if="loadUserType">
    <view class="errorImg">
    </view>
    <view class="errorMsg">{{errorMsg}}</view>
    <button @tap="popAction" class="btnStyle">返回</button>
  </view>
  <view class="applicationsIndex" v-else>
    <view class="app-nav">
      <view class="app-nav-left">
        <view
          @tap="openMenu"
          class="app-nav-left-menu">
          <image src="@/assets/img/appIndex/liebiao.png"></image>
        </view>
        <view class="fs24 text-333">{{tokenUserInf.nickname}}，您好！</view>
        <!-- <view @tap="callBBC">建行支付测试</view>
        <view @tap="callABC">农行支付测试</view>
        <view @tap="popAction">返回测试</view> -->
        <view class="logo">
          <image src="@/assets/img/appIndex/haier.png"></image>
        </view>
      </view>
      <view class="app-nav-right">
        <image @tap="service" src="@/assets/img/appIndex/kefu.png"></image>
      </view>
    </view>
    <view class="app-header">
      <!-- 轮播图 -->
      <view class="app-header-swiper">
        <uni-swiper-dot
          :current="current"
          :dotsStyles="dotsStyles"
          :info="imageList"
          :mode="mode"
          field="content"
        >
          <swiper @change="changePic" autoplay="true" circular="true" class="swiper-box" interval="5000">
            <swiper-item :key="index" v-for="(item,index) in imageList">
              <view class="swiper-item">
                <image :src="item.imageUrl" @tap='goSwiperDetail(item)' class="image" mode="aspectFill"/>
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
        <!--<image src="@/assets/img/appIndex/yuncang-pic.png"></image>-->
      </view>
      <view class="app-header-quickly">
        <view class="lately-app-list" v-if="appFlag">
          <view
            :key="index"
            @tap="goOthers(item.url)"
            class="app-list-item"
            v-for="(item, index) in latestApp">
            <view class="icon-img">
              <image :src="item.src"></image>
            </view>
            <view class="fs24 text-333">{{item.title}}</view>
          </view>
        </view>
        <view class="my-app-list" v-if="!appFlag">
          <view
            :key="index"
            @tap="goOthers(item.url)"
            class="app-list-item"
            v-for="(item, index) in myApp">
            <view class="icon-img">
              <image :src="item.src"></image>
            </view>
            <view class="fs24 text-333">{{item.title}}</view>
          </view>
        </view>
        <view class="quickly-status">
          <view :class="['quickly-status-lately',appFlag&&'active']" @tap="changeState(0)">
            最近使用
          </view>
          <view :class="['quickly-status-my',!appFlag&&'active']" @tap="changeState(1)">
            我的应用
          </view>
        </view>
      </view>
    </view>
    <view class="app-all">
      <view
        :key="index"
        class="app-all-section"
        v-for="(item, index) in list">
        <view class="app-all-section-titel">
          {{item.title}}
        </view>
        <view class="app-all-section-list">
          <view
            :key="index1"
            @tap="goOthers(v.url)"
            class="app-all-section-item"
            v-for="(v, index1) in item.children">
            <view class="icon-img">
              <image :src="v.src"></image>
            </view>
            <view class="fs24 text-333">{{v.Subhead}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="app-function">
      <view class="app-function-titel">
        功能区域
      </view>
      <view class="app-function-list">
        <view
          :key="index"
          @tap="goOthers(item.url)"
          class="app-function-item"
          v-for="(item, index) in functionList">
          <image :src="item.src"></image>
        </view>
      </view>
    </view>
    <uni-drawer
      mode="left"
      ref="infoDrawer"
    >
      <view class="info-drawer">
        <view class="drawer-header">
          <view class="drawer-header-img">
            <image src="@/assets/img/appIndex/4.png"></image>
          </view>
          <view class="drawer-header-info">
            <view class="fs34 text-333 lh48">{{tokenUserInf.nickname}}，您好。</view>
            <view class="fs24 text-666">职务：总经理</view>
          </view>
        </view>
        <view class="drawer-menu">
          <j-cell
            @cellClick="cellClick('/pages/mine/myBaseInfo?index=0')"
            class="border-b"
            title="个人资料"
          >
            <template #right>
              <view
                class="drawer-menu-icon iconfont iconyou"
              ></view>
            </template>
          </j-cell>
          <j-cell
            @cellClick="cellClick('/pages/mine/myAlterTel')"
            class="border-b"
            title="修改手机号"
          >
            <template #right>
              <view
                class="drawer-menu-icon iconfont iconyou"
              ></view>
            </template>
          </j-cell>
          <j-cell
            @cellClick="cellClick('/pages/mine/myAlertLoginPwd')"
            class="border-b"
            title="修改登录密码"
          >
            <template #right>
              <view
                class="drawer-menu-icon iconfont iconyou"
              ></view>
            </template>
          </j-cell>
          <j-cell
            @cellClick="cellClick('/pages/messageInfoList/messageInfoList?index=0')"
            class="border-b pos-r"
            title="待办任务"
          >
            <view class="tag-task">1</view>
            <template #right>
              <view
                class="drawer-menu-icon iconfont iconyou"
              ></view>
            </template>
          </j-cell>
        </view>
      </view>
    </uni-drawer>
  </view>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
import JCell from '../../components/form/JCell';
import './css/applicationsIndex.scss';
import {
  hex_sha1
} from '@/pages/index/SHA1';

export default {
  name: 'applicationsIndex',
  components: {
    JCell
  },
  data() {
    return {
      imageList: [
        {
          id: 8798452380983,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wMy0zMSAxNjoxMTowODE5MzU5MTcwOTY.jpg',
          url: 'https://haier.jsh.com/_ui/map/tsdbn/4yxphz.html',
          type: 'html',
          code: null,
          title: '4月新品汇总'
        }, {
          id: 8798452413751,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wNC0wMSAwOTo0ODoyNDU2MDY3Njg0Mw.jpg',
          url: null,
          type: 'product',
          code: 'CBAL4001B',
          title: '4.1海尔洗衣机158系列XQS100-BZ158'
        }, {
          id: 8798452610359,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wNC0wMiAxMDozMDozMTE0MjQwNTM4.jpg',
          url: null,
          type: 'product',
          code: 'CBAL50000',
          title: '4月2日洗衣机XQB100-BZ158'
        }, {
          id: 8798452643127,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wMy0yNCAwOTo1MDoxNjk5ODg4MzA1Mw.jpg',
          url: null,
          type: 'product',
          code: 'GD0LSC002',
          title: '3.24燃热JSQ30-16R1BWU1'
        }, {
          id: 8798452577591,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wMy0yMyAxNDo0NjoyNDYxNzMwMTk5NA.jpg',
          url: null,
          type: 'product',
          code: 'F70FT3000',
          title: '3.23净水机HZR200—5W（ZW）'
        }, {
          id: 8798452479287,
          imageUrl: 'https://haier-hwork-public.oss-cn-qingdao.aliyuncs.com/hsimg/tmp/haier/imageDescr/tmp/MjAyMC0wMy0zMCAxMDowMDowODEyMDQ2NjY5MzU.jpg',
          url: null,
          type: 'product',
          code: 'GA0SZL007',
          title: '3.24号电热新品'
        }],
      current: 0, // 轮播图第几张
      mode: 'round', // 轮播图底部按钮样式
      dotsStyles: {
        backgroundColor: 'rgba(255,255,255,.4)', // 未选择指示点背景色
        border: '1px rgba(255,255,255,.3) solid',
        selectedBackgroundColor: 'rgba(255,255,255,1)', // 已选择指示点背景色
        selectedBorder: '1px rgba(255,255,255,.3) solid'
      },
      infoMenuFlag: true,
      appFlag: true,
      latestApp: [
        {
          src: require('@/assets/img/appIndex/video.png'),
          url: '/pages/nav/nav',
          title: '直播'
        }
      ],
      myApp: [
        {
          src: require('@/assets/img/appIndex/video.png'),
          url: '#',
          title: '直播'
        },
        {
          src: require('@/assets/img/appIndex/function.png'),
          url: '/pages/applicationsIndex/applicationsEdit',
          title: '全部'
        },
      ],
      list: [
        {
          id: 1,
          title: '海尔直采',
          children: [
            {
              id: 1,
              src: require('@/assets/img/appIndex/shopping.png'),
              url: '/pages/index/index',
              Subhead: '采购下单'
            },
            {
              id: 2,
              src: require('@/assets/img/appIndex/finance.png'),
              url: '#',
              Subhead: '财务自助'
            },
            {
              id: 3,
              src: require('@/assets/img/appIndex/work.png'),
              url: '#',
              Subhead: '业务办理'
            }
          ]
        },
        // {
        //   id: 2,
        //   title: '分销管理',
        //   children: [
        //     {
        //       id: 1,
        //       src: require('@/assets/img/appIndex/shopping.png'),
        //       url: '#',
        //       Subhead: '采购下单'
        //     },
        //     {
        //       id: 2,
        //       src: require('@/assets/img/appIndex/finance.png'),
        //       url: '#',
        //       Subhead: '财务自助'
        //     },
        //     {
        //       id: 3,
        //       src: require('@/assets/img/appIndex/work.png'),
        //       url: '#',
        //       Subhead: '业务办理'
        //     },
        //     {
        //       id: 4,
        //       src: require('@/assets/img/appIndex/report.png'),
        //       url: '#',
        //       Subhead: '报表查询'
        //     },
        //     {
        //       id: 5,
        //       src: require('@/assets/img/appIndex/recharge.png'),
        //       url: '#',
        //       Subhead: '在线充值'
        //     }

        //   ]
        // },
        // {
        //   id: 3,
        //   title: '门店经营',
        //   children: [
        //     {
        //       id: 1,
        //       src: require('@/assets/img/appIndex/gooods.png'),
        //       url: '#',
        //       Subhead: '其他进货'
        //     },
        //     {
        //       id: 2,
        //       src: require('@/assets/img/appIndex/accept.png'),
        //       url: '#',
        //       Subhead: '收货办理'
        //     },
        //     {
        //       id: 3,
        //       src: require('@/assets/img/appIndex/stock.png'),
        //       url: '#',
        //       Subhead: '库存查询'
        //     },
        //     {
        //       id: 4,
        //       src: require('@/assets/img/appIndex/list.png'),
        //       url: '#',
        //       Subhead: '差单据'
        //     },
        //     {
        //       id: 5,
        //       src: require('@/assets/img/appIndex/member.png'),
        //       url: '#',
        //       Subhead: '会员清单'
        //     }
        //   ]
        // },
        // {
        //   id: 4,
        //   title: '零售管理',
        //   children: [
        //     {
        //       id: 1,
        //       src: require('@/assets/img/appIndex/shopping.png'),
        //       url: '#',
        //       Subhead: '采购下单'
        //     },
        //     {
        //       id: 2,
        //       src: require('@/assets/img/appIndex/finance.png'),
        //       url: '#',
        //       Subhead: '财务自助'
        //     },
        //     {
        //       id: 3,
        //       src: require('@/assets/img/appIndex/work.png'),
        //       url: '#',
        //       Subhead: '业务办理'
        //     },
        //     {
        //       id: 4,
        //       src: require('@/assets/img/appIndex/report.png'),
        //       url: '#',
        //       Subhead: '报表查询'
        //     },
        //     {
        //       id: 5,
        //       src: require('@/assets/img/appIndex/recharge.png'),
        //       url: '#',
        //       Subhead: '在线充值'
        //     }
        //   ]
        // }

      ],
      functionList: [
        {
          src: require('@/assets/img/appIndex/shouhou-pic.png'),
          url: '#'
        },
        {
          src: require('@/assets/img/appIndex/qianzhang-pic.png'),
          url: '#'
        },
        {
          src: require('@/assets/img/appIndex/yingxiao-pic.png'),
          url: '#'
        },
        {
          src: require('@/assets/img/appIndex/egongcheng-pic.png'),
          url: '#'
        },
        {
          src: require('@/assets/img/appIndex/video-pic.png'),
          url: '#'
        },
        {
          src: require('@/assets/img/appIndex/yuncang-pic.png'),
          url: '#'
        }
      ],
      loadUserType: false,
      errorMsg: '',
      valueSyncData: '',
    };
  },
  created() {
    // 支持由前端 H5 页面禁止
    AlipayJSBridge && AlipayJSBridge.call('setGestureBack', { val: false });
  },
  mounted() {
    // 适配安卓客户端
    if (AlipayJSBridge) {
      AlipayJSBridge.call('myApiGetCode', {
        param1: 'JsParam1',
      }, (result) => {
        if (result.code && result.code.length > 1) {
          this.init(result.code);
        }
      });
    }
  },
  onLoad(param) {
    this.code = param.webview_options

    this.init();
  },
  computed: {
    ...mapGetters({
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
      tokenUserInf: USER.GET_TOKEN_USER,
      saleInfo: USER.GET_SALE
    })
  },
  methods: {
    ...mapActions([
      // 默认送达方信息
      USER.UPDATE_DEFAULT_SEND_TO_ASYNC,
      // 获取售达方信息
      USER.UPDATE_SALE_ASYNC,
      // 修改token用户信息
      USER.UPDATE_TOKEN_USER_ASYNC
    ]),
    // 首页菜单跳转
    cellClick(url) {
      uni.navigateTo({
        url
      });
    },
    async init(code) {
      // if (!code && window.ALIPAYH5STARTUPPARAMS) {
      //   // 适配iOS客户端
      //   code = ALIPAYH5STARTUPPARAMS.webview_options;
      // }
      // code = 'HSWGj3SWS0OtfqUAAskzjw';
      // 获取token
      await this.getToken(code);
      // 获取首页轮播图
      await this.getbannerList();
      // 获取token
      /* if (code.length > 0) {
          // 获取token
          await this.getToken(code);
          // 获取首页轮播图
          await this.getbannerList();
        } else {
          uni.showToast({
            title: '获取code失败',
            icon: 'none',
            duration: 3000
          });
        } */
    },
    // 返回原生 处理账号锁定
    popAction() {
      AlipayJSBridge && AlipayJSBridge.call('popWindow');
    },
    // 打开建行支付
    callBBC() {
      // AlipayJSBridge.call('myApiCallCCB', {
      //   orderId: '123456',
      //   payment: '8888',
      // }, (result) => {
      // 	alert(JSON.stringify(result));
      // });
    },
    // 打开农行支付
    callABC() {
      // AlipayJSBridge.call('myApiCallABC', {
      //   tokenId: '14406457162720037182',
      // }, (result) => {
      // 	alert(JSON.stringify(result));
      // });
    },
    // 获取token
    async getToken(passCode) {
      const tmpCode = uni.getStorageSync('code');
      // alert('tmp1'+tmpCode + 'passcode' + passCode)
      // code
      if (tmpCode && (tmpCode == passCode)) {
        return;
      }
      const { code, data } = await this.authService.getTokenByCode({
        code: passCode
      });
      if (code === '1') {
        const token = data.token;
        uni.setStorageSync('token', token);
        uni.setStorageSync('code', passCode);
        // alert('已经存储token'+this.saleInfo.customerCode)
        await this[USER.UPDATE_SALE_ASYNC]();
        await this[USER.UPDATE_TOKEN_USER_ASYNC]();
        this.getUserType(this.saleInfo.customerCode);
      }
    },
    // 获取用户类型
    async getUserType(customerCode) {
      // alert('customerCode'+customerCode)
      const { code, data } = await this.cocSeachService.cocSearch(customerCode);
      if (code === '1') {
        this.cocData = data;
      }
      this.manageData(data);
    },
    // 获取代码对应产品组
    async getvaluesync() {
      const { code, data } = await this.cocService.getValueSyncValue(
        {
          valueSetId: 'ProductGroup'
        }
      );
      if (code == '1') {
        return data;
      }
      return [];
    },
    // 解析用户权限类型数据
    async manageData(data) {
      this.errorMsg = '';
      this.loadUserType = false;
      const tags = data.tags;

      let errorAlertMsg = '';

      // 僵尸户
      if (tags.zombie && tags.zombie.status == 1) {
        errorAlertMsg += '你好，由于您的账户超180天未提货，已被冻结，当前限制交易，如需解冻请联系交互师或业务人员处理。';
      }
      // 无门店
      if (tags.noStore && tags.noStore.status == 1) {
        errorAlertMsg += '您好，由于您的账户无有效门店，已被冻结，当前限制交易，如需解冻请联系交互师或业务人员处理';
      }

      let marketCollusionGroupValue = [];


      if (data.marketCollusionGroup.length > 0) {
        marketCollusionGroupValue = await this.getvaluesync();
      }

      let marketErrorMsg = '';
      // 市场秩序串货
      for (let index = 0; index < data.marketCollusionGroup.length; index++) {
        const element = data.marketCollusionGroup[index];
        for (let y = 0; y < marketCollusionGroupValue.length; y++) {
          const elementValue = marketCollusionGroupValue[y];
          if (element == elementValue.value) {
            if (index == data.marketCollusionGroup.length - 1) {
              marketErrorMsg += elementValue.valueMeaning;
            } else {
              marketErrorMsg += `${elementValue.valueMeaning}、`;
            }
          }
        }
      }


      if (marketErrorMsg.length > 0) {
        errorAlertMsg += `您好，市场运营管理限制，您${marketErrorMsg}产品组相关产品限制交易，如有疑问请联系交互师或业务人员处理。`;
      }

      if (errorAlertMsg.length > 0) {
        uni.showModal({
          title: '提示',
          content: errorAlertMsg,
          showCancel: false,
          confirmText: '确定',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        });
      }

      // 供应链金融冻结
      if (tags.gylFreezed && tags.gylFreezed.status == 1) {
        this.loadUserType = true;
        this.errorMsg = `${this.errorMsg}抱歉，由于您的账户及子账户 因供应链金融业务被冻结，限制登录系统，如有疑问请联系交互师处理。`;
      }

      // MDM冻结
      if (data.state == 1) {
        this.loadUserType = true;
        this.errorMsg = `${this.errorMsg}抱歉，由于您的账户及子账户 在MDM系统被冻结，限制登录系统，如有疑问请联系交互师处理。`;
      }
    },
    changePic(e) {
      this.current = e.detail.current;
    },
    async getbannerList() {
      const { code, data } = await this.indexService.bannerList({});
      if (code === '1') {
        this.imageList = data;
      }
    },
    // 客服
    async service() {
      let url = '';
      const { code, data } = await this.udeskService.getUdesk(this.saleInfo.customerCode, {
        addressArea: this.defaultSendToInf.customerCode
      });
      if (code === '1') {
        console.log(data);
        const web_token1 = data.accountId;
        const timestamp1 = new Date().getTime();// 时间戳
        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let nonce1 = '';// 随机数
        for (let i = 0; i < 12; i++) {
          const id = Math.ceil(Math.random() * 35);
          nonce1 += chars[id];
        }
        const signature = `nonce=${nonce1}&timestamp=${timestamp1}&web_token=${web_token1}&9767b0677a6f46f5d3d0af8c00f3f16c`;
        let sha = hex_sha1(signature);
        sha = sha.toUpperCase();
        console.log(signature);
        console.log(sha);
        //* c_phone 电话号码（唯一）* nonce 随机数［必填］* timestamp 13位毫秒时间戳［必填］
        //* web_token/weiyi:id  客户ID，如果客户ID为邮箱或手机号，可以用邮箱和手机号［必填］
        //* signature 加密签名，对timestamp、nonce、web_token和c_key进行SHA1加密后的字符串［必填］
        url = `https://haier.s2.udesk.cn/im_client?web_plugin_id=28198&customer_token=${web_token1}&c_phone=${this.tokenUserInf.phoneNumber}&nonce=${nonce1}&signature=${sha}&timestamp=${timestamp1}&web_token=${web_token1}`;
        console.log(url);
        // InAppBrowserService.openAd(url);
      } else {
        // PopupService.showToast(response.message);
      }

      uni.navigateTo({
        url: `/pages/index/service?url=${url}`
      });
    },
    openMenu() {
      /* 打开抽屉 */
      const infoDrawer = this.$refs.infoDrawer;
      if (this.infoMenuFlag) {
        infoDrawer.open();
      } else {
        infoDrawer.close();
      }
    },
    goIndex() {
      uni.navigateTo({
        url: '/pages/nav/nav'
      });
    },
    goOthers(url) {
      uni.switchTab({
        url
      });
    },
    changeState(index) {
      if (index === 0) {
        this.appFlag = true;
      } else {
        this.appFlag = false;
      }
    },
    // 轮播图跳转
    goSwiperDetail(item) {
      console.log(item);
      let aaa = [];
      let productCode = '';
      let id = '';
      if (item.url.indexOf('/detail/') > -1) {
        aaa = item.url.split('/');
        console.log(aaa[aaa.length - 1]);
        productCode = aaa[aaa.length - 1];
        uni.navigateTo({
          url: `/pages/productDetail/productDetail?productCode=${productCode}`
        });
      } else if (item.url.indexOf('/newsDetail/') > -1) {
        aaa = item.url.split('/');
        id = aaa[aaa.length - 1];
        uni.navigateTo({
          url: `/pages/index/information?id=${id}`
        });
      }
    },
  }
};
</script>
