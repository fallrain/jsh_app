<template>
  <view :class="isUps === true ? 'prevent' : ''">
    <view class="uni-flex uni-row" :class="{'st':true,'sticky-fixed':isF}" v-show="isF">
      <view @click="checkCut(0)" style="margin: auto;" :class="{'checkedCut':goodsCheck}">{{tabs[0].name}}</view>
      <view @click="checkCut(1)" style="margin: auto;" :class="{'checkedCut':specsCheck}">{{tabs[1].name}}</view>
      <view @click="checkCut(2)" style="margin: auto;" :class="{'checkedCut':detailsCheck}">{{tabs[2].name}}</view>
    </view>
    <uni-swiper-dot :info="detailInfo.images" :current="current" :mode="mode" field="content">
      <swiper class="swiper-box" @change="changePic">
        <swiper-item v-for="(item, index) in detailInfo.images" :key="index">
          <view class="swiper-item">
            <image class="image" :src="item.masterImage" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="uni-common-mt" id="goods">
      <view class="uni-flex uni-row padding-15">
        <view class="text col-34 larger" style="color: #ED2856;margin: auto;">¥ {{detailInfo.price.invoicePrice}}</view>
        <view class="text col smaller" style="margin: auto;">建议零售价：¥{{detailInfo.product.recommendsalePrice}}</view>
        <view v-if="1>2" class="col-10 smaller iconfont iconshoucang1" style="margin: auto;color: #ED2856"></view>
        <view v-else class="col-10 smaller iconfont iconicon3" style="margin: auto;color: #ED2856"></view>
      </view>
      <view class="uni-flex uni-row padding-8" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
        <view class="text modeller">
          <image src="/static/logo.png" style="width: 20px;height: 20px;"></image>
          {{detailInfo.product.productName}}
        </view>
      </view>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">编&nbsp;&nbsp;&nbsp;码：{{detailInfo.product.productCode}}</view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">型&nbsp;&nbsp;&nbsp;号：{{detailInfo.product.productDescribe}}</view>
      </view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">供&nbsp;&nbsp;&nbsp;价：￥{{detailInfo.price.supplyPrice}}</view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">台&nbsp;&nbsp;&nbsp;返：{{detailInfo.price.rebateMoney}}</view>
      </view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">返&nbsp;&nbsp;&nbsp;利：
          <span v-if="detailInfo.price.rebatePolicy===0">COM</span>
          <span v-else-if="detailInfo.price.rebatePolicy===1">BF</span>
          <span v-else-if="detailInfo.price.rebatePolicy===2">FHQ</span>
          <span v-else-if="detailInfo.price.rebatePolicy===5">BZK</span>
        </view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">直扣率：{{detailInfo.price.rebateRate}}%</view>
      </view>
      <view v-if="CheckActivityInfo.length<1" class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text" >
          <view class="smaller" @click="showAct" v-for="ack in ActInfo" :key="ack.name" style="width:23%;float:left;background-color: #F2F2F7;color: #999999;border-radius: 30px;text-align: center;margin-right: 2%;">{{ack.name}}</view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <view v-else class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text">
          <view class="smaller" @click="showAct" style="border: 1px #ED2856 solid;background-color: #FFEDF1;color: #ED2856;border-radius: 30px;text-align: center;">{{CheckActivityInfo.title}}</view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <pro-com-act :info="ActInfo" :show.sync="isShowAct" @isCheckAct="checkedAct"></pro-com-act>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row padding-8">
        <view class="col text smaller">已&nbsp;&nbsp;&nbsp;选：</view>
        <view class="col-70 text" @click="showNum">
          <view class="smaller">{{productNum}}件</view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <pro-com-num :show.sync="isShowNum" @checkedNum="checkedNum"></pro-com-num>
      <view class="uni-flex uni-row padding-8">
        <view class="col text smaller">配送至：</view>
        <view class="col-70 text" @click="showShip('OPEN')">
          <view class="smaller">{{ShipInfo}}</view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <pro-com-ship :isShowShip="ShipType==='OPEN'" @closeShip="showShip('')" @checkedShip="checkedShip"></pro-com-ship>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row">
        <view class="padding-30 col-40 modeller">热门推荐</view>
      </view>
      <view class="uni-flex uni-row">
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
          <view v-for="ieen in categoryList" :key="ieen.NAME" class="scroll-view-item_H">
            <image :src="ieen.LOGO" style="height: 76px;width: 76px;"/>
            <view class="smaller">{{ieen.NAME}}<br>{{ieen.NAME}}</view>
          </view>
        </scroll-view>
      </view>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row" id="specs">
        <view class="padding-30 col-40 modeller">规格参数</view>
      </view>
      <pro-specs :attributesMap="detailInfo.attributesMap"></pro-specs>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row" id="details">
        <view class=" col-40 modeller padding-30">图文详情</view>
      </view>
      <view class="uni-flex uni-row">
        <image style="width: 100%;" mode="widthFix" :src="detailInfo.longImages[0]"></image>
      </view>
    </view>
    <view class="product-detail-fot-high"></view>
    <view class="product-detail-foot"><pro-com-foot></pro-com-foot></view>
  </view>
</template>

<script>
import {
  uniSwiperDot
} from '@dcloudio/uni-ui';
import proComNum from '../../components/productDetail/pro-com-num';
import proComAct from '../../components/productDetail/pro-com-act';
import proComShip from '../../components/productDetail/pro-com-ship';
import proSpecs from '../../components/productDetail/pro-specs';
import proComFoot from '../../components/productDetail/pro-com-foot';
import './css/productDetail.scss';

export default {
  name: 'ProductDetail',
  components: {
    uniSwiperDot,
    proComNum,
    proComAct,
    proComShip,
    proSpecs,
    proComFoot
  },
  data() {
    return {
      detailInfo: [],
      isUps: false,
      tabs: [
        { id: 'goods', name: '宝贝' },
        { id: 'specs', name: '规格' },
        { id: 'details', name: '详情' }
      ],
      goodsCheck: false,
      specsCheck: false,
      detailsCheck: false,
      yuanH: uni.upx2px(100),
      isF: false, // 顶部导航是否显示
      current: 0, // 轮播图第几张
      mode: 'round', // 轮播图底部按钮样式
      categoryList: [
        { id: 0, NAME: 'wwww.32', LOGO: 'http://placehold.it/50x50' },
        { id: 1, NAME: 'dd2', LOGO: 'http://placehold.it/50x50' },
        { id: 2, NAME: 'bdg3', LOGO: 'http://placehold.it/50x50' },
        { id: 3, NAME: 'jsh4', LOGO: 'http://placehold.it/50x50' },
        { id: 4, NAME: 'teg5', LOGO: 'http://placehold.it/50x50' },
        { id: 5, NAME: 'djh6', LOGO: 'http://placehold.it/50x50' },
        { id: 1222, NAME: 'aa7', LOGO: 'http://placehold.it/50x50' },
        { id: 13, NAME: 'dd8', LOGO: 'http://placehold.it/50x50' },
        { id: 133, NAME: 'bdg9', LOGO: 'http://placehold.it/50x50' },
        { id: 1333, NAME: 'jsh10', LOGO: 'http://placehold.it/50x50' },
        { id: 14, NAME: 'teg11', LOGO: 'http://placehold.it/50x50' },
        { id: 144, NAME: 'djh12', LOGO: 'http://placehold.it/50x50' },
        { id: 15, NAME: 'yeg13', LOGO: 'http://placehold.it/50x50' },
        { id: 16, NAME: 'odj14', LOGO: 'http://placehold.it/50x50' }
      ],
      // 活动列表
      ActInfo: [
        { id: 1, name: '特价', isSe: true, list: [{ num: 1, name: '特价2', isCheck: false, }, { num: 1, name: '特价3', isCheck: false, }] },
        { id: 1, name: '工程', isSe: true, list: [{ num: 1, name: '特价3', isCheck: false, }, { num: 1, name: '特价4', isCheck: false, }] },
        { id: 1, name: '样机', isSe: true, list: [{ num: 1, name: '特价4', isCheck: false, }, { num: 1, name: '特价5', isCheck: false, }] },
        { id: 1, name: '套餐', isSe: true, list: [{ num: 1, name: '特价5', isCheck: false, }, { num: 1, name: '特价6', isCheck: false, }] }
      ],
      CheckActivityInfo: '', // 选择的活动具体内容
      isShowAct: false, // 活动选择popup是否展示
      isShowNum: false, // 数量页面参数，判断是否展示
      productNum: 1, // 商品数量数量
      ShipType: '', // 送达方，是否显示
      ShipInfo: '(8800212607)李沧区重庆中路420号沃尔豪大楼G区A座2008室至:', //
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    };
  },
  onPageScroll(e) {
    if (this.yuanH > e.scrollTop) {
      this.isF = false;
    } else {
      this.isF = true;
    }
    if (e.scrollTop < 10) {
      this.goodsCheck = true;
      this.specsCheck = false;
      this.detailsCheck = false;
    }
    // console.log('ssss');
    // console.log(uni.getSystemInfoSync().screenHeight)
  },
  onLoad() {
  },
  created() {
    this.getProductDetail('GA0SZ0009', '8800012497', '8800012497');
  },
  methods: {
    async getProductDetail(codePro, codeSale, codeSend) {
      const { code, data } = await this.productDetailService.productDetail(codePro, codeSale, codeSend);
      if (code === '1') {
        this.detailInfo = data;
      }
      console.log(data);
    },
    changePic(e) { // 轮播图切换显示
      this.current = e.detail.current;
    },
    scroll(e) { // 滑动
      this.old.scrollTop = e.detail.scrollTop;
    },
    upper(e) { console.log(e); },
    lower(e) { console.log(e); },
    showNum() { // 点击打开页面
      this.isShowNum = true;
    },
    showAct() { // 活动选择页面
      this.isShowAct = true;
    },
    showShip(e) { // 地址选择页面
      if (e === 'OPEN') {
        this.isUps = true;
      } else {
        this.isUps = false;
      }
      this.ShipType = e;
    },
    checkedNum(e) { // 数量选择页面
      this.productNum = e;
    },
    checkedAct(e, n) { // 活动选择的内容
      console.log('youmeiypu');
      this.CheckActivityInfo = n;
      console.log(this.CheckActivityInfo);
    },
    checkedShip(e) { // 选择的地址
      this.ShipType = '';
      this.isUps = false;
      this.ShipInfo = e;
    },
    checkCut(e) {
      this.goodsCheck = false;
      this.specsCheck = false;
      this.detailsCheck = false;
      const query = uni.createSelectorQuery();
      if (e < 1) {
        this.goodsCheck = true;
        query.select('#goods').boundingClientRect((data) => {
          console.log(`得到布局位置信息${JSON.stringify(data)}`);
          console.log(`节点离页面顶部的距离为${data.top}`);
          uni.pageScrollTo({
            scrollTop: data.top,
          });
        }).exec();
      } else if (e > 1) {
        this.detailsCheck = true;
        // query.select('#details').boundingClientRect((data) => {
        //   console.log(`得到布局位置信息${JSON.stringify(data)}`);
        //   console.log(`节点离页面顶部的距离为${data.top}`);
        //   uni.pageScrollTo({
        //     scrollTop: data.top,
        //   });
        // }).exec();
        uni.createSelectorQuery().select('#details').boundingClientRect((res) => {
          uni.pageScrollTo({
            scrollTop: res.top
          });
        }).exec();
      } else {
        this.specsCheck = true;
        query.select('#specs').boundingClientRect((data) => {
          console.log(`得到布局位置信息${JSON.stringify(data)}`);
          console.log(`节点离页面顶部的距离为${data.top}`);
          uni.pageScrollTo({
            scrollTop: data.top,
          });
        }).exec();
      }
      // document.getElementById(this.tabs[e].id).scrollIntoView();
    }
  }
};

</script>
