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
        <view v-if="!ISGUANZHU" class="col-10 smaller iconfont iconshoucang1" style="margin: auto;color: #ED2856"></view>
        <view v-else class="col-10 smaller iconfont iconicon3" style="margin: auto;color: #ED2856"></view>
      </view>
      <view class="uni-flex uni-row padding-8" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
        <view class="text modeller">
          <image v-if="detailInfo.isScf==='1'" src="/static/logo.png" style="width: 20px;height: 20px;"></image>
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
      <view v-show="ActListInfo.length>0" v-if="CheckActivityInfo.length<1" class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text" >
          <view class="smaller" @click="showAct" v-for="ack in ActListInfo" :key="ack" style="width:23%;float:left;background-color: #F2F2F7;color: #999999;border-radius: 30px;text-align: center;margin-right: 2%;">{{ack}}</view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <view v-show="ActListInfo.length>0" v-else class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text" @click="showAct">
          <view class="smaller" style="border: 1px #ED2856 solid;background-color: #FFEDF1;color: #ED2856;border-radius: 30px;text-align: center;">{{CheckActivityInfo.title}}</view>
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
      <pro-com-num :show.sync="isShowNum" :stock="stock" :infos="detailInfo" @checkedNum="checkedNum"></pro-com-num>
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
          <view v-for="ieen in hostList" :key="ieen.productCode" class="scroll-view-item_H">
            <image :src="ieen.imageUrl" style="height: 76px;width: 76px;"/>
            <view>
              <span style="color: #666666;font-size: 8px;display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width: 95%;">{{ieen.title}}</span>
              <br><span style="color: #ED2856;font-size: 8px;">￥{{ieen.price}}</span>
            </view>
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
    <view class="product-detail-foot"><pro-com-foot :info.sync="footButtong"></pro-com-foot></view>
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
      stock: {}, // 库存
      footButtong: { // 底部按钮是否显示问题
        isSale: false,
        isActi: false,
        isSaleLe: false
      },
      ISGUANZHU: false, // 商品关注
      detailInfo: [], // 商品信息
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
      hostList: [], // 热门推荐横向列表
      ActListInfo: [], // 活动列表展示的标签
      ActInfo: [], // 活动列表
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
    this.getProductDetail('GA0SZ0009', '8800012497', '8800012497');// 获取产品详情
    this.getHostLost('8800012497', '8800012497');// 获取热门推荐列表
    this.productQueryInter();// 产品是否关注
    this.productStock();// 获取数量页面的库存字段
  },
  methods: {
    async getProductDetail(codePro, codeSale, codeSend) {
      const { code, data } = await this.productDetailService.productDetail(codePro, codeSale, codeSend);
      if (code === '1') {
        this.detailInfo = data;
        this.footButtong.isSale = this.detailInfo.product.isSale;
        if (this.detailInfo.activities.length > 0) {
          this.detailInfo.activities.forEach((ee) => {
            if (ee === '套餐' || ee === '组合') {
              this.footButtong.isActi = true;
            }
          });
        }
        this.ActListInfo = [];
        this.ActInfo = [];
        if (this.detailInfo.tjPrice.tj.length > 0) { // 特价
          this.ActListInfo.push('特价');
          const tj = { title: '特价版本', isMore: true, isSe: true, list: [] };
          this.detailInfo.tjPrice.tj.forEach((lis) => {
            const a = { titleLe: '特价版本', name: lis.versionCode, price: lis.invoicePrice, time: lis.endDate, kou: lis.rebateRateShow * 100, num: lis.usableQty, isCheck: false };
            tj.list.push(a);
          });
          this.ActInfo.push(tj);
        }
        if (this.detailInfo.tjPrice.gc.length > 0) { // 工程
          this.ActListInfo.push('工程');
          const gc = { title: '工程版本', isMore: true, isSe: true, list: [] };
          this.detailInfo.tjPrice.gc.forEach((lis) => {
            const a = { titleLe: '工程版本', name: lis.versionCode, price: lis.invoicePrice, time: lis.endDate, kou: lis.rebateRateShow * 100, num: lis.usableQty, isCheck: false };
            gc.list.push(a);
          });
          this.ActInfo.push(gc);
        }
        if (this.detailInfo.tjPrice.yj.length > 0) { // 样机
          this.ActListInfo.push('样机');
          const yj = { title: '样机版本', isMore: true, isSe: true, list: [] };
          this.detailInfo.tjPrice.yj.forEach((lis) => {
            const a = { titleLe: '样机版本', name: lis.versionCode, price: lis.invoicePrice, time: lis.endDate, kou: lis.rebateRateShow * 100, num: lis.usableQty, isCheck: false };
            yj.list.push(a);
          });
          this.ActInfo.push(yj);
        }
        if (this.detailInfo.arbitrages.length > 0) { // 套餐
          this.ActListInfo.push('套餐');
          const tc = { title: '套餐', isMore: false, isSe: true, list: [] };
          this.detailInfo.arbitrages.forEach((lis) => {
            const a = { titleLe: '套餐', name: lis.activityName, time: lis.endTime };
            tc.list.push(a);
          });
          this.ActInfo.push(tc);
        }
        if (this.detailInfo.composes.length > 0) { // 组合
          this.ActListInfo.push('组合');
          const zh = { title: '组合', isMore: false, isSe: true, list: [] };
          this.detailInfo.composes.forEach((lis) => {
            const a = { titleLe: '组合', name: lis.activityName, time: lis.endTime };
            zh.list.push(a);
          });
          this.ActInfo.push(zh);
        }
        if (this.detailInfo.flashSales.length > 0) { // 抢单
          this.ActListInfo.push('抢单');
          const qd = { title: '抢单', isMore: false, isSe: true, list: [] };
          this.detailInfo.flashSales.forEach((lis) => {
            const a = { titleLe: '抢单', name: lis.activityName, time: lis.endTime };
            qd.list.push(a);
          });
          this.ActInfo.push(qd);
        }
      }
      console.log(data);
    },
    async getHostLost(codeSale, codeSend) {
      const { code, data } = await this.productDetailService.productHostList(codeSale, codeSend);
      if (code === '1') {
        this.hostList = data;
      }
      console.log(data);
    },
    async productQueryInter() {
      const { code, data } = await this.productDetailService.productQueryInter({
        account: '8800012497',
        productCodeList: ['GA0SZ0009']
      });
      if (code === '1') {
        if (data.length > 0) {
          this.ISGUANZHU = true;
        } else {
          this.ISGUANZHU = false;
        }
      }
    },
    async productStock() {
      const { code, data } = await this.productDetailService.productStock({
        productCodes: ['GA0SZ0009'],
        saletoCode: '8800012497',
        sendtoCode: '8800012497'
      });
      if (code === '1') {
        this.stock = data;
        console.log(this.stock);
      }
    },
    changePic(e) { // 轮播图切换显示
      this.current = e.detail.current;
    },
    scroll(e) { // 滑动
      this.old.scrollTop = e.detail.scrollTop;
    },
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
      console.log('youmeiyou');
      this.CheckActivityInfo = n;
      if (n.length > 0 && (n.titleLe === '工程版本' || n.titleLe === '样机版本')) {
        this.footButtong.isSaleLe = true;
      }
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
