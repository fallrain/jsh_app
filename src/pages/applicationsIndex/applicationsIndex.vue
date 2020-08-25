<template>
    <view class="applicationsIndex">
      <view class="app-nav">
        <view class="app-nav-left">
          <view
            @tap="openMenu"
            class="app-nav-left-menu">
            <image src="@/assets/img/appIndex/liebiao.png"></image>
          </view>
          <view class="fs24 text-333">王芬芬，您好！</view>
		  <view @click="callBBC">建行支付</view>
          <view class="logo">
            <image src="@/assets/img/appIndex/haier.png"></image>
          </view>
        </view>
        <view class="app-nav-right">
          <image src="@/assets/img/appIndex/kefu.png"></image>
        </view>
      </view>
      <view class="app-header">
        <!-- 轮播图 -->
        <view class="app-header-swiper">
          <uni-swiper-dot
            :info="imageList"
            :current="current"
            :mode="mode"
            field="content"
            :dotsStyles="dotsStyles"
          >
            <swiper class="swiper-box" @change="changePic">
              <swiper-item
                v-for="(item,index) in imageList"
                :key="index">
                <view class="swiper-item">
                  <image :src="item.imageUrl" mode="aspectFill"/>
                </view>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
          <!--<image src="@/assets/img/appIndex/yuncang-pic.png"></image>-->
        </view>
        <view class="app-header-quickly">
          <view v-if="appFlag" class="lately-app-list">
            <view
              v-for="(item, index) in latestApp"
              :key="index"
              @tap="goOthers(item.url)"
              class="app-list-item">
              <view class="icon-img">
                <image :src="item.src"></image>
              </view>
              <view class="fs24 text-333">{{item.title}}</view>
            </view>
          </view>
          <view v-if="!appFlag" class="my-app-list">
            <view
              v-for="(item, index) in myApp"
              :key="index"
              @tap="goOthers(item.url)"
              class="app-list-item">
              <view class="icon-img">
                <image :src="item.src"></image>
              </view>
              <view class="fs24 text-333">{{item.title}}</view>
            </view>
          </view>
          <view class="quickly-status">
            <view @tap="changeState(0)" :class="['quickly-status-lately',appFlag&&'active']">
              最近使用
            </view>
            <view @tap="changeState(1)" :class="['quickly-status-my',!appFlag&&'active']">
              我的应用
            </view>
          </view>
        </view>
      </view>
      <view class="app-all">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="app-all-section">
          <view class="app-all-section-titel">
            {{item.title}}
          </view>
          <view class="app-all-section-list">
            <view
              v-for="(v, index1) in item.children"
              :key="index1"
              @tap="goOthers(v.url)"
              class="app-all-section-item">
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
            v-for="(item, index) in functionList"
            :key="index"
            @tap="goOthers(item.url)"
            class="app-function-item">
            <image :src="item.src"></image>
          </view>
        </view>
      </view>
      <uni-drawer
        ref="infoDrawer"
        mode="left"
      >
        <view class="info-drawer">
          <view class="drawer-header">
            <view class="drawer-header-img">
              <image src="@/assets/img/appIndex/4.png"></image>
            </view>
            <view class="drawer-header-info">
              <view class="fs34 text-333 lh48">王芬芬，您好。</view>
              <view class="fs24 text-666">职务：总经理</view>
            </view>
          </view>
          <view class="drawer-menu">
            <j-cell
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
  uniDrawer,
  uniSwiperDot
} from '@dcloudio/uni-ui';
import JCell from '../../components/form/JCell';
import './css/applicationsIndex.scss';

export default {
  name: 'applicationsIndex',
  components: {
    uniDrawer,
    uniSwiperDot,
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
        {
          id: 2,
          title: '分销管理',
          children: [
            {
              id: 1,
              src: require('@/assets/img/appIndex/shopping.png'),
              url: '#',
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
            },
            {
              id: 4,
              src: require('@/assets/img/appIndex/report.png'),
              url: '#',
              Subhead: '报表查询'
            },
            {
              id: 5,
              src: require('@/assets/img/appIndex/recharge.png'),
              url: '#',
              Subhead: '在线充值'
            }

          ]
        },
        {
          id: 3,
          title: '门店经营',
          children: [
            {
              id: 1,
              src: require('@/assets/img/appIndex/gooods.png'),
              url: '#',
              Subhead: '其他进货'
            },
            {
              id: 2,
              src: require('@/assets/img/appIndex/accept.png'),
              url: '#',
              Subhead: '收货办理'
            },
            {
              id: 3,
              src: require('@/assets/img/appIndex/stock.png'),
              url: '#',
              Subhead: '库存查询'
            },
            {
              id: 4,
              src: require('@/assets/img/appIndex/list.png'),
              url: '#',
              Subhead: '差单据'
            },
            {
              id: 5,
              src: require('@/assets/img/appIndex/member.png'),
              url: '#',
              Subhead: '会员清单'
            }
          ]
        },
        {
          id: 4,
          title: '零售管理',
          children: [
            {
              id: 1,
              src: require('@/assets/img/appIndex/shopping.png'),
              url: '#',
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
            },
            {
              id: 4,
              src: require('@/assets/img/appIndex/report.png'),
              url: '#',
              Subhead: '报表查询'
            },
            {
              id: 5,
              src: require('@/assets/img/appIndex/recharge.png'),
              url: '#',
              Subhead: '在线充值'
            }
          ]
        }

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
      ]
    };
  },
  created() {
    // this.getbannerList();
  },
  mounted() {
	  // 适配安卓客户端
	  AlipayJSBridge.call('myApiGetCode', {
	    param1: 'JsParam1',
	  },  (result) =>  {
	      if(result.code.length > 1) {
	          this.getToken(result.code);
	      }
	  });
  },
  onLoad() {
	  // 适配iOS客户端
    let code = ALIPAYH5STARTUPPARAMS.webview_options;
    // this.code = 'oiDi8SemSIm2-kiAiOBTnw';
	if(code.length > 0) {
		this.getToken(code);
	}
  },
  methods: {
	  // 打开建行支付
	  callBBC() {
		  AlipayJSBridge.call('myApiCallCCB', {
		    orderId: '123456',
			payment: '8888',
		  }, function (result) {
		  	alert(JSON.stringify(result))
		  });
	  },
    // 获取token
    async getToken(passCode) {
      const { code, data } = await this.authService.getTokenByCode({
        code: passCode
      });
      if (code === '1') {
        const token = data.token;
        uni.setStorageSync('token', token);
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
    }
  }
};
</script>
