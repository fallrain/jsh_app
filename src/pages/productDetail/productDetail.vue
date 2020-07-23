<template>
  <view :class="isUps == true ? 'prevent' : ''">
    <view class="uni-flex uni-row" :class="{'st':true,'sticky-fixed':isF}" v-show="isF">
      <view @click="checkCut(0)" style="margin: auto;" :class="{'checkedCut':goodsCheck}">{{tabs[0].name}}</view>
      <view @click="checkCut(1)" style="margin: auto;" :class="{'checkedCut':specsCheck}">{{tabs[1].name}}</view>
      <view @click="checkCut(2)" style="margin: auto;" :class="{'checkedCut':detailsCheck}">{{tabs[2].name}}</view>
    </view>
    <uni-swiper-dot :info="info" :current="current" :mode="mode" field="content">
      <swiper class="swiper-box" @change="changePic">
        <swiper-item v-for="(item, index) in info" :key="index">
          <view :class="item.colorClass" class="swiper-item">
            <image class="image" :src="item.url" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="uni-common-mt" id="goods">
      <view class="uni-flex uni-row padding-15">
        <view class="text col-34 larger" style="color: #ED2856;margin: auto;">¥29384.11</view>
        <view class="text col smaller" style="margin: auto;">建议零售价：¥2934.11</view>
        <view class="col-10 smaller iconfont iconshoucang1" style="margin: auto;color: #ED2856"></view>
      </view>
      <view class="uni-flex uni-row padding-8" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
        <view class="text modeller">
          <image src="/static/logo.png" style="width: 20px;height: 20px;"></image>
          海尔滚筒洗衣机BCD-150WLDPEK风冷两门风冷除菌（自动除霜）念白360度全白色滚筒洗衣机，高温杀菌高品质简约设计。
        </view>
      </view>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">编&nbsp;&nbsp;&nbsp;码：BH03S00AA</view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">型&nbsp;&nbsp;&nbsp;号：BCD-611WDIEU1(EX)</view>
      </view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">供&nbsp;&nbsp;&nbsp;价：￥ 4099.00</view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">台&nbsp;&nbsp;&nbsp;返：0.00</view>
      </view>
      <view class="uni-flex uni-row padding-8">
        <view class="text col-40 smaller" style="-webkit-flex: 1;flex: 1;">返&nbsp;&nbsp;&nbsp;利：FHQ</view>
        <view class="text smaller" style="-webkit-flex: 1;flex: 1;">直扣率：0.80%</view>
      </view>
      <view class="uni-flex uni-row padding-8">
        <view class="col text smaller">活&nbsp;&nbsp;&nbsp;动：</view>
        <view class="col-70 text">
          <view class="smaller" @click="showAct" v-for="ack in activityList" style="width:23%;float:left;background-color: #F2F2F7;color: #999999;border-radius: 30px;text-align: center;margin-right: 2%;">{{ack.name}}</view>
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
      <view style="padding: 10px;">
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;">
          <view class="textGui minLar uni-bold" style="color: #333333;">主体</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">品牌</view>
          <view class="textGui minLar">卡萨帝</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">型号</view>
          <view class="textGui minLar">BCD-520WICHU1</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">机身颜色</view>
          <view class="textGui minLar">帛拉帝【钛金】</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">类别</view>
          <view class="textGui minLar">三门</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;">
          <view class="textGui minLar uni-bold" style="color: #333333;">主体</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">品牌</view>
          <view class="textGui minLar">卡萨帝</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">型号</view>
          <view class="textGui minLar">BCD-520WICHU1</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">机身颜色</view>
          <view class="textGui minLar">帛拉帝【钛金】</view>
        </view>
        <view class="uni-flex uni-row" style="border: 2px solid #EFEFEF;border-top: none;">
          <view class="textGui minLar col-40" style="text-align: right; border-right: 2px solid #EFEFEF;">类别</view>
          <view class="textGui minLar">三门</view>
        </view>
      </view>
      <view class="lineHigt"></view>
      <view class="uni-flex uni-row" id="details">
        <view class=" col-40 modeller padding-30">图文详情</view>
      </view>
      <view class="uni-flex uni-row">
        <image style="width: 100%;" mode="widthFix" src="http://file.c.haier.net/images/2016/06/29/2011b90fbb70780dd37bee60aa21e5b1.jpg"></image>
      </view>
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

export default {
  name: 'ProductDetail',
  components: {
    uniSwiperDot,
    proComNum,
    proComAct,
    proComShip
  },
  data() {
    return {
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
      info: [// 轮播图信息
        {
          colorClass: 'uni-bg-red',
          url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
          content: '内容 A'
        },
        {
          colorClass: 'uni-bg-green',
          url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
          content: '内容 B'
        },
        {
          colorClass: 'uni-bg-blue',
          url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
          content: '内容 C'
        }
      ],
      activityList: [
        { id: 1, name: '特价', isCheck: false },
        { id: 1, name: '工程', isCheck: false },
        { id: 1, name: '样机', isCheck: false },
        { id: 1, name: '套餐', isCheck: false }
      ], // 活动列表
      ActInfo: [
        { id: 1, name: '特价', isSe: true, list: [{ num: 1, name: '特价2', isCheck: false, }, { num: 1, name: '特价3', isCheck: false, }] },
        { id: 1, name: '工程', isSe: true, list: [{ num: 1, name: '特价3', isCheck: false, }, { num: 1, name: '特价4', isCheck: false, }] },
        { id: 1, name: '样机', isSe: true, list: [{ num: 1, name: '特价4', isCheck: false, }, { num: 1, name: '特价5', isCheck: false, }] },
        { id: 1, name: '套餐', isSe: true, list: [{ num: 1, name: '特价5', isCheck: false, }, { num: 1, name: '特价6', isCheck: false, }] }
      ],
      activity: '', // 选择的活动类型
      activityInfo: '', // 选择的活动具体内容
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
  methods: {
    // 滑动
    scroll(e) {
      // console.log(e)
      this.old.scrollTop = e.detail.scrollTop;
    },
    upper(e) {
      console.log(e);
    },
    lower(e) {
      console.log(e);
    },
    changePic(e) {
      this.current = e.detail.current;
      console.log(e);
    },
    // 选择数量的popup
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
    checkedAct(e) { // 活动选择的内容
      console.log(e);
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
      if (e < 1) {
        this.goodsCheck = true;
      } else if (e > 1) {
        this.detailsCheck = true;
      } else {
        this.specsCheck = true;
      }
      document.getElementById(this.tabs[e].id).scrollIntoView();
    }
  }
};

</script>

<style scoped>
  .prevent {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .swiper-box {
    height: 400px;
  }
  .swiper-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #999;
    color: #fff;
  }
  .image {
    width: 100%;
  }
  .text {
    margin: 5px 5px;
    padding: 0 10px;
    text-align: left;
    color: #777;
  }
  .lineHigt {
    background-color: #F5F5F5;
    height: 10px;
  }
  .lineHigtT {
    background-color: #EAEAEA;
    height: 2px;
  }
  .smaller {
    font-size: 24px;
  }
  .modeller {
    font-size: 32px;
    color: #333333;
  }
  .minLar {
    font-size: 24px;
    color: #999999;
  }
  .larger {
    font-size: 40px;
  }
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
  }
  .scroll-view-item_H {
    display: inline-block;
    width: 30%;
    text-align: center;
    font-size: 36px;
  }
  .textGui {
    margin: 5px 5px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
  }
  .st {
    height: 100px;
    width: 750px;
    background-color: #FFFFFF;
    z-index: 10;
    font-size: 32px;
    color: #666666;
  }
  .sticky-fixed {
    position: sticky;
    top: 88px;
    z-index: 10;
  }
  .checkedCut {
    border-bottom: 8px solid #ED2856;
    color: #ED2856;
  }

</style>
