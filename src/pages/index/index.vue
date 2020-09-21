<template>
  <view class="homepage">
    <!--     <uni-nav-bar left-icon="back" title="采购首页" fixed="true" @tapLeft="goBack"></uni-nav-bar>-->
    <view class="homepage-top">
      <view class="index-status-bar">
        <!-- 这里是状态栏 -->
      </view>
      <view class="homepage-top-head">
        <view class="j-flex-aic">
          <view @tap="goBack" class='iconfont iconzuo homepage-top-head-iconl'></view>
          <image
            class="homepage-top-head-name"
            mode="aspectFill"
            src="../../assets/img/index/logo-white.png"
          ></image>
        </view>
        <view @tap="service" class='iconfont iconpeople homepage-top-head-icon'></view>
      </view>
      <view class="jSearchInput-wrap j-flex-aic">
        <view class="jSearchInput-icon iconfont iconsousuo"></view>
        <input
          :placeholder="mendli"
          @tap="confirm"
          class="jSearchInput"
          placeholder-class="col_c"
          type="text"
          v-model="name"
        >
      </view>
      <!-- 全部 -->
      <scroll-view
        class="homepage-top-center"
        scroll-x
        scroll-with-animation
      >
        <view
          class="homepage-top-center-list"
          v-for="(item,index) in list"
          :key="index"
          scroll-x
          scroll-with-animation
          @tap="goGoodsList(item)"
        >
          {{item.title}}
        </view>
      </scroll-view>
      <!-- 轮播图 -->
      <view class="homepage-swiper">
        <uni-swiper-dot
          :current="current"
          :dotsStyles="dotsStyles"
          :info="bannerList"
          :mode="mode"
          field="content"
        >
          <swiper @change="changePic" autoplay="true" circular="true" class="swiper-box" interval="5000">
            <swiper-item class="swiperitem" v-for="(item,index) in bannerList" :key="index">
              <view class="swiper-item">
                <image class="image" :src="item.imageUrl" mode="aspectFill" @tap='goSwiperDetail(item)'/>
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
    </view>
    <!-- 目录列表 -->
    <view class="homepage-cataloglist">
      <view
        class="homepage-cataloglist-item"
        v-for="item in cataloglist"
        :key="item.id"
        @tap="goCatalog(item)"
      >
        <image :src="item.src" class="cataloglist-item-img" mode="aspectFill"/>
        <view class="cataloglist-item-title">{{item.title}}</view>
      </view>
    </view>

    <!-- 头条公告 -->
    <view class="homepage-headlines-nav">
      <view class="homepage-headlines">
        <image class="homepage-headlines-img" mode="aspectFill" src="../../assets/img/index/topnew.png"/>
        <view class="homepage-headlines-title">最新</view>
      </view>
      <!-- <view class="iconfont iconyou homepage-headlines-icon"></view> -->
      <view class="homepage-headlines-con">
        <view class="homepage-headlines-content">这是一条公告内容，请点击查看…</view>
      </view>
    </view>


    <!-- 推荐 + 资讯-->
    <view class="homepage-recommend-info">
      <!-- 推荐 -->
      <view class="homepage-recommend">
        <view
          :key="item.id"
          class="homepage-recommend-list"
          v-for="item in recommendList"

        >
          <view class="homepage-recommend-name">
            <image v-if="item.isShowPrivate" src="../../assets/img/index/private_logo.png" class="private"></image>
            <image v-if="item.isShowHot" src="../../assets/img/index/hot_logo.png" class="hot"></image>
            <view class="homepage-recommend-title">{{item.title}}</view>
            <view class="homepage-recommend-describe">{{item.describe}}</view>
            <view v-if="item.isShowMore" class="homepage-recommend-more" @tap="goList(item)">MORE</view>
          </view>
          <view  v-if="item.data.length !== 0">
            <swiper
              @change="change"
              autoplay="true"
              circular="true"
              class="homepage-recommend-swiper"
              interval="5000"
              next-margin="65px"

            >
              <swiper-item
                v-for="v in item.data"
                :key="v.id"
                class="homepage-recommend-swiper-item"
              >
                <view @tap="goDetail(v)" class="homepage-recommend-imgs">
                  <image v-if="v.imageUrl" :src="v.imageUrl" class="homepage-recommend-image" mode="aspectFill"/>
                  <image v-if="item.isNewProduct" src="../../assets/img/index/isNewProduct.png" class="homepage-recommend-imaget" mode="aspectFill">
                  <image v-if="item.isResource" src="../../assets/img/index/icon_resource.gif" class="homepage-recommend-imaget" mode="aspectFill">
                  <image v-if="!v.imageUrl" src="../../assets/img/index/none.png" class="homepage-recommend-image" mode="aspectFill"></image>

                </view>
              </swiper-item>
            </swiper>
          </view>
          <image v-else  src="../../assets/img/index/none.png" class="homepage-recommend-image" mode="aspectFill"></image>
        </view>
      </view>
      <!--   资讯测试版     -->
      <!-- 资讯 -->
      <!--        <view class="homepage-info">-->
      <!--          <view class="homepage-info-name">-->
      <!--            <text class="homepage-info-title">热门资讯</text>-->
      <!--            <text class="homepage-info-more">MORE</text>-->
      <!--          </view>-->
      <!--          <view>-->
      <!--            <view-->
      <!--                class="homepage-info-list"-->
      <!--                v-for="item in infoList"-->
      <!--                :key="item.id"-->
      <!--                @tap="goCatalog(item.url)"-->
      <!--            >-->
      <!--              <view class="homepage-info-list-hot">{{item.hot}}</view>-->
      <!--              <view class="homepage-info-list-title">{{item.info}}</view>-->
      <!--            </view>-->
      <!--          </view>-->

      <!--        </view>-->
      <!--         资讯正式版 -->
      <view class="homepage-info">
        <view class="homepage-info-name">
          <text class="homepage-info-title">热门资讯</text>
          <text @tap="goAnnouncement" class="homepage-info-more">MORE</text>
        </view>
        <view>
          <view
            class="homepage-info-list"
            v-for="item in infoList"
            :key="item.id"
          >
            <view class="homepage-info-list-hot" @tap="goInfoDetail(item)">{{item.title}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- tabber -->
    <!-- <view
      v-for="item in tabBarList"
      :key="item.id"
    >
      <image :src="item.image" mode="aspectFill" />
      <image :src="item.img" mode="aspectFill" />
    </view> -->
<!--     广告图 直播-->
         <view class="homepage-nav" v-show="isShowNav">
          <image mode="aspectFill" src="../../assets/img/index/manypeople.png" @tap="goNav"/>
          <i
            @tap="deleteNav"
            class="homepage-nav-close iconfont iconcross"
          ></i>
        </view>
  </view>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import {
  COMMODITY,
  USER,
  SHOPPING_CART
} from '../../store/mutationsTypes';

import {
  hex_sha1
} from '@/pages/index/SHA1.js';
import homePageImg from '@/assets/img/tabbar/shouye.png';
import homePageImgActive from '@/assets/img/tabbar/shouye-actived.png';
import categoryImg from '@/assets/img/tabbar/fenlei.png';
import categoryImgActive from '@/assets/img/tabbar/fenlei-actived.png';
import shoppingImg from '@/assets/img/tabbar/shopping.png';
import shoppingImgImgActive from '@/assets/img/tabbar/shopping-actived.png';
import mineImg from '@/assets/img/tabbar/mine.png';
import mineImgImgActive from '@/assets/img/tabbar/mine-actived.png';
import './css/index.scss';

export default {
  name: 'index',
  components: {},

  data() {
    return {
      tabBarImgs: {
        homePageImg,
        homePageImgActive,
        categoryImg,
        categoryImgActive,
        shoppingImg,
        shoppingImgImgActive,
        mineImg,
        mineImgImgActive
      },
      // 广告图显示
      isShowNav: true,
      // 搜索栏
      name: '',
      bannerList: [],
      list: [],
      // list: ['全部', '水洗空冷', '电视电脑', '厨房卫浴', '手机数码', '生活'],
      current: 0, // 轮播图第几张
      mode: 'round', // 轮播图底部按钮样式
      dotsStyles: {
        backgroundColor: 'rgba(255,255,255,.4)', // 未选择指示点背景色
        border: '1px rgba(255,255,255,.3) solid',
        selectedBackgroundColor: 'rgba(255,255,255,1)', // 已选择指示点背景色
        selectedBorder: '1px rgba(255,255,255,.3) solid'
      },
      cataloglist: [
        {
          id: 1,
          src: require('@/assets/img/index/function-qiang.png'),
          title: '抢单',
          url: '/pages/goods/goodsList?isFlashSale=1'
        },
        {
          id: 2,
          src: require('@/assets/img/index/function-washingmachine.png'),
          title: '套餐',
          url: '/pages/market/marketList?activityType=taocan'
        },
        {
          id: 3,
          src: require('@/assets/img/index/function-compose.png'),
          title: '组合',
          url: '/pages/market/marketList?activityType=zuhe'
        },
        {
          id: 4,
          src: require('@/assets/img/index/function-box.png'),
          title: '调货',
          url: '/pages/transferGoods/transferGoods'
        },
        {
          id: 5,
          src: require('@/assets/img/index/function-project.png'),
          title: '工程',
          url: '/pages/goods/goodsList?isProject=1'
        },
        {
          id: 6,
          src: require('@/assets/img/index/function-sale.png'),
          title: '特价',
          url: '/pages/goods/goodsList?isSpecialOffer=1'
        },

        {
          id: 7,
          src: require('@/assets/img/index/function-tv.png'),
          title: '样机',
          url: '/pages/goods/goodsList?isSample=1'
        },
        {
          id: 8,
          src: require('@/assets/img/index/function-yang.png'),
          title: '样品机',
          url: '/pages/sampleMachine/sampleMachineList'
        },
        {
          id: 9,
          src: require('@/assets/img/index/function-money.png'),
          title: '反向定制',
          url: '/pages/market/marketList?activityType=baoxiao'
        },
        {
          id: 10,
          src: require('@/assets/img/index/function-car.png'),
          title: '整车',
          url: '/pages/vehicleList/abnormal'
        }
      ],
      isShowRecommend: true,
      recommendList: [
        {
          id: 1,
          title: '新品推荐',
          describe: '人气榜',
          isShowMore: true,
          isNewProduct: true, // 是否显示新品
          isResource: false, // 巨划算
          isShowPrivate: false, // 是否显示爆款图
          isShowHot: false, // 是否显示专供图
          data: []
        },
        {
          id: 2,
          title: '巨划算',
          describe: '精选榜单',
          isShowMore: true,
          isNewProduct: false,
          isResource: true, // 巨划算
          isShowPrivate: false, // 是否显示爆款图
          isShowHot: false, // 是否显示专供图
          data: []
        },
        {
          id: 3,
          title: '爆款推荐',
          describe: 'HOT',
          isShowMore: false,
          isNewProduct: false,
          isResource: false, // 巨划算
          isShowPrivate: true, // 是否显示爆款图
          isShowHot: false, // 是否显示专供图
          data: []
        },
        {
          id: 4,
          title: '我的专供',
          describe: '热卖好物',
          isShowMore: false,
          isNewProduct: false,
          isResource: false, // 巨划算
          isShowPrivate: false, // 是否显示爆款图
          isShowHot: true, // 是否显示专供图
          data: []
        }
      ],
      isSwiper: true,
      // recommendList: [
      //   {
      //     id: 1,
      //     title: '新品推荐',
      //     describe: '人气榜',
      //     image: require('@/assets/img/index/FC511Z00L.png'),
      //     img: require('@/assets/img/index/GD0R7N000.png'),
      //     url: '#'
      //   },
      //   {
      //     id: 2,
      //     title: '爆款推荐',
      //     describe: 'HOT',
      //     image: require('@/assets/img/index/CEAAJ300F.png'),
      //     img: require('@/assets/img/index/BH02Z00A8.png'),
      //     url: '#'
      //   },
      //   {
      //     id: 3,
      //     title: '我的专供',
      //     describe: '热卖好物',
      //     image: require('@/assets/img/index/FC511Z00L.png'),
      //     img: require('@/assets/img/index/GE0QA000W.png'),
      //     url: '#'
      //   },
      //   {
      //     id: 4,
      //     title: '聚划算',
      //     describe: '精选榜单',
      //     image: require('@/assets/img/index/FC511Z00L.png'),
      //     img: require('@/assets/img/index/GD0R7N000.png'),
      //     url: '#'
      //   },
      // ],
      // infoList: []
      infoList: [
        {
          id: 1,
          hot: '热门',
          info: '这是一条热门资讯的内容,具体内容请查看详情......',
          url: '#'
        },
        {
          id: 2,
          hot: '热门',
          info: '这是一条热门资讯的内容,具体内容请查看详情......',
          url: '#'
        },
        {
          id: 3,
          hot: '热门',
          info: '这是一条热门资讯的内容,具体内容请查看详情......',
          url: '#'
        }
      ],
      // 首页推荐轮播
      mend: [],
      mendli: '',
      // 搜索框轮播数据
      allMendli: {}
      // tabBarList: [
      //   {
      //     id: 1,
      //     image: require('@/assets/img/tabbar/shouye.png'),
      //     img: require('@/assets/img/tabbar/shouye-actived.png'),
      //     tloimg: require('@/assets/img/index/logo-white.png')
      //   },
      //   {
      //     id: 2,
      //     image: require('@/assets/img/tabbar/fenlei.png'),
      //     img: require('@/assets/img/tabbar/fenlei-actived.png'),
      //     tloimg: require('@/assets/img/index/manypeople.png')
      //   },
      //   {
      //     id: 3,
      //     image: require('@/assets/img/tabbar/xiaoxi.png'),
      //     img: require('@/assets/img/tabbar/xiaoxi-actived.png'),
      //     tloimg: require('@/assets/img/index/topnew.png')

      //   },
      //   {
      //     id: 4,
      //     image: require('@/assets/img/tabbar/shopping.png'),
      //     img: require('@/assets/img/tabbar/shopping-actived.png')
      //   },
      //   {
      //     id: 5,
      //     image: require('@/assets/img/tabbar/mine.png'),
      //     img: require('@/assets/img/tabbar/mine-actived.png')
      //   },

      // ]
    };
  },
  created() {
    (async () => {
      await this[USER.UPDATE_DEFAULT_SEND_TO_ASYNC]();
      await this[USER.UPDATE_SALE_ASYNC]();
      this[SHOPPING_CART.UPDATE_CART_NUM_ASYNC](this.saleInfo.customerCode);
      await this[USER.UPDATE_TOKEN_USER_ASYNC]();
    })().then(() => {
      this.getPageInf();
      this.getXinPin();
      this.getBaoKuan();
      this.getZhuanGong();
      this.getZiYuanJi();
    });
  },
  onLoad() {
    let index = 0;
    setInterval(() => {
      // console.log(1111);
      this.mendli = this.mend[index];
      // console.log(_this.mendli);
      index += 1;
      if (index >= this.mend.length) {
        index = 0;
      }
    }, 5000);
  },
  onShow() {
    uni.showTabBar();
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
      USER.UPDATE_TOKEN_USER_ASYNC,
      // 更新有货商品分类
      COMMODITY.UPDATE_CATALOG_LIST_ASYNC,
      // 获取购物车数量
      SHOPPING_CART.UPDATE_CART_NUM_ASYNC
    ]),
    getPageInf() {
      this.getbannerList();
      this.getIndexList();
      this.getList();
      this.getShow();
    },
    // watch: {
    //   $route: ['getShow']
    // },
    // 导航栏返回
    goBack() {
      // uni.navigateBack({
      //     delta: 1
      // });
      uni.redirectTo({
        url: '/pages/applicationsIndex/applicationsIndex'
      });
    },
    get() {
      // this.$nextTick(() => {
      // const a = JSON.stringify(this.defaultSendToInf);
    },
    changePic(e) {
      this.current = e.detail.current;
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
    // 历史记录
    confirm() {
      console.log(this.name);
      // console.log(this.allMendli);
      // this.allMendli = JSON.stringify(this.allMendli);
      uni.navigateTo({
        url: `/pages/index/historical?name=${this.mendli}`
      });
    },
    async getShow() {
      const params = {
        bigChannel: [this.saleInfo.channel],
        centerCode: [this.saleInfo.tradeCode],
        custCode: [this.saleInfo.customerCode],
        smallChannel: [this.saleInfo.subChannel],
        type: 1,
        userId: this.tokenUserInf.name,
        userName: this.tokenUserInf.nickname
      };
      const { code, data } = await this.commodityService.show({
        pageNum: 1,
        pageSize: 4,
        params
      });
      if (code === '10000') {
        this.allMendli = data;
        let word = '';
        data.records.forEach((item) => {
          word = item.recoWord;
          this.mend.push(word);
        });
        console.log(this.mend);
        this.mendli = this.mend[0];
      }
    },
    // 轮播图
    async getbannerList() {
      const { code, data } = await this.indexService.bannerList({});
      if (code === '1') {
        this.bannerList = data;
        console.log(this.bannerList);
        console.log(data);
      }
    },
    // 轮播图跳转
    goSwiperDetail(item) {
      debugger;
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
      } else if (item.url.indexOf('/newBanner') > -1) {
        const options = item.url.split('/newBanner')[1];
        uni.navigateTo({
          url: `/pages/index/banner${options}`
        });
      }
    },
    // 目录列表跳转
    goCatalog(item) {
      console.log(item);
      uni.navigateTo({
        url: item.url
      });
      // console.log(url);
    },
    // 头条公告
    // async getHeadLines() {
    //   // const {data} = await this.HaierNoticeService.queryHaierNoticeForCustomerLoginPage()
    //   const url = 'http://58.56.174.18:9001/home';
    //   // const token = uni.getStorageSync('token');
    //   // const userpk = this.infoList.info.bstnk;
    //   // const userid = this.tokenUserInf.id;
    //   uni.request({
    //     url,
    //     method: 'POST',
    //     data: {
    //       // userid: UserService.getUser().uid,
    //       // token: UserService.getUser().token,
    //       // userpk: UserService.getUser().pk,
    //       // pageid: 'CH001'
    //     },
    //     success(response) {
    //       console.log(response);
    //
    //     },
    //     fail(e) {
    //       let msg = '请求失败';
    //       if (e && e.errMsg && e.errMsg === 'request:fail timeout') {
    //         msg = '请求超时';
    //       }
    //       uni.showToast({
    //         titele: msg,
    //         icon: 'none'
    //       });
    //     }
    //   });
    // },

    // 广告图
    deleteNav() {
      this.isShowNav = false;
    },
    goNav() {
      uni.navigateTo({
        url: `/pages/index/liveBroadcast?userId=${this.saleInfo.customerCode}`
      });
    },
    // 新闻资讯
    async getIndexList() {
      const list = await this.messageService.indexList({
        customerCode: this.saleInfo.customerCode,
        unitId: this.tokenUserInf.name
      });
      if (list.code === '1') {
        console.log(list.data);
        this.infoList = list.data.slice(0, 4);
      }
    },
    // 新闻资讯公告
    goAnnouncement() {
      uni.navigateTo({
        url: '/pages/index/announcement'
      });
    },
    // 新闻资讯详情
    goInfoDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/index/information?id=${item.id}`
      });
    },

    // 推荐跳转详情
    goDetail(v) {
      console.log(v);
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?productCode=${v.productCode}`
      });
    },

    change(e) {
      // this.current = e.detail.current;
    },
    // more跳转
    goList(item) {
      if (item.title === '新品推荐') {
        uni.navigateTo({
          url: '/pages/goods/goodsList?isNewProduct=1'
        });
      } else if (item.title === '巨划算') {
        uni.navigateTo({
          url: '/pages/goods/goodsList?isResource=1'
        });
      }
    },
    // 新品推荐列表
    async getXinPin() {
      const { code, data } = await this.activityService.xinPin({
        saletoCode: this.saleInfo.customerCode,
        sendtoCode: this.defaultSendToInf.customerCode,
      });
      if (code === '1') {
        console.log(this.recommendList[0]);
        this.recommendList[0].data = data;
        if (this.recommendList[0].data && this.recommendList[0].data.length > 0) {
          console.log('111111');
          this.recommendList[0].data.forEach((item) => {
            console.log('22222');
            if (!item.imageUrl) {
              this.isShowRecommend = false;
              console.log('333333');
            } else {
              this.isShowRecommend = true;
            }
          });
        } else {
          this.isShowRecommend = false;
          console.log('444444');
        }
      }
    },
    // 巨划算
    async getZiYuanJi() {
      const { code, data } = await this.activityService.ziYuanJi({
        saletoCode: this.saleInfo.customerCode,
        sendtoCode: this.defaultSendToInf.customerCode,
      });
      if (code === '1') {
        this.recommendList[1].data = data;
        console.log(data);
        console.log(this.recommendList);
        if (this.recommendList[1].data && this.recommendList[1].data.length > 0) {
          console.log('111111');
          this.recommendList[1].data.forEach((item) => {
            if (!item.imageUrl) {
              this.isShowRecommend = false;
            } else {
              this.isShowRecommend = true;
            }
          });
        } else {
          this.isShowRecommend = false;
        }
      }
    },
    // 爆款推荐
    async getBaoKuan() {
      const { code, data } = await this.activityService.baoKuan({
        saletoCode: this.saleInfo.customerCode,
        sendtoCode: this.defaultSendToInf.customerCode,
      });
      if (code === '1') {
        console.log(this.recommendList[2]);
        this.recommendList[2].data = data;
        if (this.recommendList[2].data && this.recommendList[2].data.length > 0) {
          console.log('111111');
          this.recommendList[2].data.forEach((item) => {
            if (!item.imageUrl) {
              this.isShowRecommend = false;
            } else {
              this.isShowRecommend = true;
            }
          });
        } else {
          this.isShowRecommend = false;
        }
      }
    },
    // 我的专供
    async getZhuanGong() {
      const { code, data } = await this.activityService.zhuanGong({
        saletoCode: this.saleInfo.customerCode,
        sendtoCode: this.defaultSendToInf.customerCode,
      });
      if (code === '1') {
        this.recommendList[3].data = data;
        console.log(this.recommendList[3]);
        if (this.recommendList[3].data && this.recommendList[3].data.length > 0) {
          console.log('111111');
          this.recommendList[3].data.forEach((item) => {
            if (!item.imageUrl) {
              this.isShowRecommend = false;
            } else {
              this.isShowRecommend = true;
            }
          });
        } else {
          this.isShowRecommend = false;
        }
      }
    },

    // 应用列表
    async getList() {
      const { code, data } = await this[COMMODITY.UPDATE_CATALOG_LIST_ASYNC]();
      if (code === '1') {
        data.forEach((item) => {
          item.categoryCode = item.code;
        });
        data.unshift({
          id: 0,
          code: '',
          title: '全部',
          categoryCode: ''
        });
        console.log(data);
        this.list = data;
        this.list.forEach((item) => {
          item.active = false;
        });
        this.list[0].active = true;
        console.log(this.list);
      }
    },
    // 应用列表跳转
    goGoodsList(item) {
      console.log(item);
      this.list.forEach((v) => {
        v.active = false;
      });
      item.active = true;
      console.log(item.active);
      if (item.categoryCode) {
        console.log(item.categoryCode);
        uni.navigateTo({
          url: `/pages/goods/goodsList?categoryCode=${item.categoryCode}`
        });
      } else {
        console.log(222);
        uni.navigateTo({
          url: '/pages/goods/goodsList'
        });
      }
    }
  }
};
</script>

<style scoped>
  /deep/ .jSearchInput-wrap {
    width: 702px;
    height: 58px;
    background: rgba(209, 209, 239, 1);
    box-shadow: 0px 0px 12px 0px rgba(102, 135, 168, 0.15);
    opacity: 0.8;
    border-radius: 32px;
    border: 1px solid #6687A8;
    padding-left: 22px;
    padding-right: 26px;
    margin-right: 26px;
    /*position: absolute;*/
    /*left: 150px;*/
    /*top:30px;*/
    margin-bottom: 32px;
  }

  /deep/ .col_c {
    color: #fff;
    font-size: 28px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    background: rgba(209, 209, 239, 0.8);
  }

  /deep/ .jSearchInput-icon {
    color: #fff;
    font-size: 24px;
  }

  /deep/ .jSearchInput {
    margin-left: 36px;
    font-size: 24px;
    color: #fff;
    opacity: 0.8;
    background: rgba(102, 135, 168, 0.15);
  }

  /* /deep/.jSearchInput::-ms-input-placeholder{
    color:#fff;
  } */

</style>
