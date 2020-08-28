<template>
  <view>
    <view class="uni-flex uni-row" :class="{'st':true,'sticky-fixed':isF}" v-show="isF">
      <view @click="checkCut(0)" style="margin: auto;" :class="{'checkedCut':goodsCheck}">{{tabs[0].name}}</view>
      <view @click="checkCut(1)" style="margin: auto;" :class="{'checkedCut':specsCheck}">{{tabs[1].name}}</view>
      <view @click="checkCut(2)" style="margin: auto;" :class="{'checkedCut':detailsCheck}">{{tabs[2].name}}</view>
    </view>
    <uni-swiper-dot :info="detailInfo.images" :current="current" :mode="mode" field="content">
      <swiper class="swiper-box" @change="changePic">
        <swiper-item v-for="(item, index) in detailInfo.images" :key="index">
          <view class="swiper-item">
            <image class="image" :src="item.masterImage" mode="aspectFill"></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="uni-common-mt" id="goods">
      <view class="uni-flex uni-row padding-15">
        <view class="text col-34 larger" style="color: #ED2856;margin: auto;">¥ {{detailInfo.price && detailInfo.price.invoicePrice || '暂无价格!'}}</view>
        <view class="text col smaller" style="margin: auto;">建议零售价：¥{{detailInfo.product.recommendsalePrice}}</view>
        <view @click="guanZhu" class="col-10 smaller iconfont iconshoucang1" style="margin: auto;color: #ED2856"
              v-if="!ISGUANZHU"></view>
        <view @click="guanZhu" class="col-10 smaller iconfont iconicon3" style="margin: auto;color: #ED2856"
              v-else></view>
      </view>
      <view class="uni-flex uni-row padding-8" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
        <view class="text modeller">
          <image v-if="detailInfo.isScf==='1'" src="@/assets/img/orderDetail/rongZi.png" style="width: 20px;height: 20px;"></image>
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
        <view class="col-70 text">
          <view :key="ack" @click="showAct" class="smaller product-detail-lei2" v-for="ack in ActListInfo">{{ack}}
          </view>
        </view>
        <view class="col-10 text smaller">
          <view class="text-center iconfont iconyou"></view>
        </view>
      </view>
      <view v-show="ActListInfo.length>0" v-else class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text" @click="showAct">
          <view class="smaller product-detail-lei3">{{CheckActivityInfo.title}}</view>
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
      <pro-com-ship :info="deliveryAddressList" :show.sync="isShowShip" :titles="titles"
                    @checkedShip="checkedShip"></pro-com-ship>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row">
        <view class="padding-30 col-40 modeller">热门推荐</view>
      </view>
      <view class="uni-flex uni-row">
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
          <view v-for="ieen in hostList" :key="ieen.productCode" class="scroll-view-item_H">
            <image :src="ieen.imageUrl" style="height: 76px;width: 76px;"></image>
            <view>
              <span class="product-detail-lei1">{{ieen.title}}</span>
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
      <view class="uni-flex uni-row" v-for="(img,index) in detailInfo.longImages" :key="index">
        <image :src="img" mode="widthFix" style="width: 100%;"></image>
      </view>
    </view>
    <view class="product-detail-fot-high"></view>
    <view class="product-detail-foot">
      <pro-com-foot :info.sync="footButtong" @putcar="putcar" @putplay="putplay" @goCarList="goCarList"></pro-com-foot>
    </view>
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
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

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
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      defaultSendTo: USER.GET_DEFAULT_SEND_TO,
    }),
  },
  data() {
    return {
      productCode: '', // 前页面传入产品编码
      titles: '配送至',
      stock: {}, // 库存
      footButtong: { // 底部按钮是否显示问题
        isSale: false,
        isActi: false,
        isSaleLe: false
      },
      ISGUANZHU: false, // 商品关注
      detailInfo: [], // 商品信息
      tabs: [
        {
          id: 'goods',
          name: '宝贝'
        },
        {
          id: 'specs',
          name: '规格'
        },
        {
          id: 'details',
          name: '详情'
        }
      ],
      goodsCheck: true,
      specsCheck: false,
      detailsCheck: false,
      isF: true, // 顶部导航是否显示
      current: 0, // 轮播图第几张
      mode: 'round', // 轮播图底部按钮样式
      hostList: [], // 热门推荐横向列表
      ActListInfo: [], // 活动列表展示的标签
      ActInfo: [], // 活动列表
      CheckActivityInfo: '', // 选择的活动具体内容
      isShowAct: false, // 活动选择popup是否展示
      isShowNum: false, // 数量页面参数，判断是否展示
      isShowShip: false, // 送达方，是否显示
      deliveryAddressList: [],
      ShipInfo: '', // 页面显示选中的送达方
      productNum: 1, // 商品数量数量
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      scrollHight: 0,
      goodsHight: 0,
      specsHight: 0,
      detailsHight: 0
    };
  },
  onPageScroll() {
    // if (e.scrollTop > 10) {
    //   this.isF = false;
    //   this.goodsCheck = true;
    //   this.specsCheck = false;
    //   this.detailsCheck = false;
    // } else {
    //   this.isF = true;
    // }
    // this.scrollHight = e.scrollTop;
    // console.log(uni.getSystemInfoSync().screenHeight)
  },
  onLoad(options) {
    this.productCode = options.productCode;
    console.log(options.productCode);
  },
  created() {
    this.getProductDetail();// 获取产品详情
    this.getHostLost();// 获取热门推荐列表
    this.productQueryInter();// 产品是否关注
    this.productStock();// 获取数量页面的库存字段
    this.getDeliveryAddress();// 获取配送地址列表
  },
  methods: {
    move() {
      this.isF = true;
    },
    async getProductDetail() {
      const { code, data } = await this.productDetailService.productDetail({
        code: this.productCode,
        codeSale: this.userInf.customerCode,
        codeSend: this.defaultSendTo.customerCode
      });
      if (code === '1') {
        this.productNum = 1;
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
          const tj = {
            title: '特价版本',
            isMore: true,
            isSe: true,
            list: []
          };
          this.detailInfo.tjPrice.tj.forEach((lis) => {
            const a = {
              titleLe: '特价版本',
              name: lis.versionCode,
              price: lis.invoicePrice,
              time: lis.endDate,
              kou: lis.rebateRateShow * 100,
              num: lis.usableQty,
              isCheck: false
            };
            tj.list.push(a);
          });
          this.ActInfo.push(tj);
        }
        if (this.detailInfo.tjPrice.gc.length > 0) { // 工程
          this.ActListInfo.push('工程');
          const gc = {
            title: '工程版本',
            isMore: true,
            isSe: true,
            list: []
          };
          this.detailInfo.tjPrice.gc.forEach((lis) => {
            const a = {
              titleLe: '工程版本',
              name: lis.versionCode,
              price: lis.invoicePrice,
              time: lis.endDate,
              kou: lis.rebateRateShow * 100,
              num: lis.usableQty,
              isCheck: false
            };
            gc.list.push(a);
          });
          this.ActInfo.push(gc);
        }
        if (this.detailInfo.tjPrice.yj.length > 0) { // 样机
          this.ActListInfo.push('样机');
          const yj = {
            title: '样机版本',
            isMore: true,
            isSe: true,
            list: []
          };
          this.detailInfo.tjPrice.yj.forEach((lis) => {
            const a = {
              titleLe: '样机版本',
              name: lis.versionCode,
              price: lis.invoicePrice,
              time: lis.endDate,
              kou: lis.rebateRateShow * 100,
              num: lis.usableQty,
              isCheck: false
            };
            yj.list.push(a);
          });
          this.ActInfo.push(yj);
        }
        if (this.detailInfo.arbitrages.length > 0) { // 套餐
          this.ActListInfo.push('套餐');
          const tc = {
            title: '套餐',
            isMore: false,
            isSe: true,
            list: []
          };
          this.detailInfo.arbitrages.forEach((lis) => {
            const a = {
              titleLe: '套餐',
              name: lis.activityName,
              time: lis.endTime
            };
            tc.list.push(a);
          });
          this.ActInfo.push(tc);
        }
        if (this.detailInfo.composes.length > 0) { // 组合
          this.ActListInfo.push('组合');
          const zh = {
            title: '组合',
            isMore: false,
            isSe: true,
            list: []
          };
          this.detailInfo.composes.forEach((lis) => {
            const a = {
              titleLe: '组合',
              name: lis.activityName,
              time: lis.endTime
            };
            zh.list.push(a);
          });
          this.ActInfo.push(zh);
        }
        if (this.detailInfo.flashSales.length > 0) { // 抢单
          this.ActListInfo.push('抢单');
          const qd = {
            title: '抢单',
            isMore: false,
            isSe: true,
            list: []
          };
          this.detailInfo.flashSales.forEach((lis) => {
            const a = {
              titleLe: '抢单',
              name: lis.activityName,
              time: lis.endTime
            };
            qd.list.push(a);
          });
          this.ActInfo.push(qd);
        }
      }
      console.log(data);
    },
    async getHostLost() {
      const { code, data } = await this.productDetailService.productHostList(this.userInf.customerCode, this.defaultSendTo.customerCode);
      if (code === '1') {
        this.hostList = data;
      }
      console.log(data);
    },
    async productQueryInter() {
      const { code, data } = await this.productDetailService.productQueryInter({// 获取关注
        account: this.userInf.customerCode,
        productCodeList: [this.productCode]
      });
      if (code === '1') {
        if (data.length > 0) {
          this.ISGUANZHU = true;
        } else {
          this.ISGUANZHU = false;
        }
      }
    },
    async addGuan() {
      const { code } = await this.productDetailService.productAddInter(this.userInf.customerCode, this.defaultSendTo.customerCode, this.productCode);
      if (code === '200') {
        this.ISGUANZHU = true;
      }
    },
    async productStock() {
      const { code, data } = await this.productDetailService.productStock({
        productCodes: [this.productCode],
        saletoCode: this.userInf.customerCode,
        sendtoCode: this.defaultSendTo.customerCode
      });
      if (code === '1') {
        this.stock = data;
        console.log(this.stock);
      }
    },
    guanZhu() {
      if (this.ISGUANZHU) { // 已关注，点击是取消关注
        this.productDetailService.productRemoveInter({
          account: this.userInf.customerCode, // 8700002530_1前台输入的账号名
          productCodeList: [this.productCode]
        }).then(({ code }) => {
          if (code === '1') {
            this.ISGUANZHU = false;
          }
        });
      } else {
        this.addGuan();
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
    showShip() { // 地址选择页面
      this.isShowShip = true;
    },
    getDeliveryAddress() {
      /* 获取配送地址 */
      this.customerService.addressesList(1).then(({ code, data }) => {
        if (code === '1') {
          // 配送地址列表
          this.deliveryAddressList = data.map(v => ({
            id: v.customerCode,
            name: `(${v.customerCode})${v.address}`,
            checked: false
          }));
          // 当前配送地址修改
          if (this.deliveryAddressList[0]) {
            this.deliveryAddressList[0].checked = true;
            this.ShipInfo = this.deliveryAddressList[0].name;
          }
        }
      });
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
    checkedShip(list, e) { // 选择的地址
      this.ShipInfo = this.deliveryAddressList[e].name;
      this.deliveryAddressList = list;
      this.getProductDetail();// 获取产品详情
    },
    checkCut(e) {
      uni.pageScrollTo({
        scrollTop: 0
      });
      uni.createSelectorQuery().select('#goods').boundingClientRect((res) => {
        this.goodsHight = res.top;
      }).exec();
      uni.createSelectorQuery().select('#specs').boundingClientRect((res) => {
        this.specsHight = res.top;
      }).exec();
      uni.createSelectorQuery().select('#details').boundingClientRect((res) => {
        this.detailsHight = res.top;
      }).exec();
      if (e < 1) {
        console.log('tou');
        this.goodsCheck = true;
        this.detailsCheck = false;
        this.specsCheck = false;
      } else if (e > 1) {
        uni.pageScrollTo({
          scrollTop: this.detailsHight - 60
        });
        this.goodsCheck = false;
        this.detailsCheck = true;
        this.specsCheck = false;
      } else {
        uni.pageScrollTo({
          scrollTop: this.specsHight - 60
        });
        this.goodsCheck = false;
        this.detailsCheck = false;
        this.specsCheck = true;
      }
    },
    putcar() {
      if (this.CheckActivityInfo === '') { // 没选活动
        if (this.detailInfo.flashSales.length > 0) { // 有抢单
          this.jiaGou1('PT', 3);
        } else {
          this.jiaGou1('PT', 1);
        }
      } else { // 样机版本?
        if (this.CheckActivityInfo.titleLe === '特价版本') {
          this.jiaGou1('TJ', 1);
        } else if (this.CheckActivityInfo.titleLe === '工程版本') {
          this.jiaGou1('GC', 1);
        }
      }
    },
    putplay() {
      uni.navigateTo({
        url: `/pages/market/marketList?productCode=${this.productCode}`
      });
    },
    goCarList() {
      console.log('gezhonghuodong');
      uni.reLaunch({
        url: '/pages/shoppingCart/shoppingCart'
      });
    },
    async jiaGou1(pt, num1) { // 提交验证码之后
      const product = [{ priceType: pt,
        priceVersion: '',
        stockVersion: '',
        productCode: this.productCode,
        number: this.productNum }];
      const { code } = await this.cartService.addToCart({
        activityType: num1, // 组合类型(1单品2组合3抢购4套餐5成套)
        number: this.productNum,
        productCode: this.productCode, // 产品编码
        productList: product, // 产品编码
        saletoCode: this.userInf.customerCode, // 售达方编码,
        sendtoCode: this.defaultSendTo.customerCode, // 送达方编码
      });
      if (code === '1') {
        uni.showToast({
          title: '提交成功',
        });
      } else {
        uni.showToast({
          title: '提交失败请重试',
        });
      }
    },
  }
};

</script>
