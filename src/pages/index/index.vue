<template>
  <view class="homepage">
    <view class="homepage-top">
      <view class="homepage-top-head">
        <image class="homepage-top-head-name" src="../../assets/img/index/logo-white.png"
               mode="aspectFill"></image>
          <view class="jSearchInput-wrap j-flex-aic">
          <view class="jSearchInput-icon iconfont iconsousuo" @tap="search"></view>
          <input
            class="jSearchInput"
            type="text"
            placeholder="请输入搜索信息"
            placeholder-class="col_c"
            v-model="name"
          >
        </view>

        <view class='iconfont iconpeople homepage-top-head-icon'></view>
      </view>
      <!-- 全部 -->
      <scroll-view 
        class="homepage-top-center"
        scroll-x
        scroll-with-animation
      >
        <view
          :class="['homepage-top-center-list',item.active && 'active']"
          v-for="(item,index) in list"
          :key="index"
          scroll-x
          scroll-with-animation
          @tap ="goGoodsList(item)"
        >
        {{item.title}}
        </view>
      </scroll-view >
          <!-- 轮播图 -->
      <view class="homepage-swiper">

        <uni-swiper-dot
        :info="bannerList"
        :current="current"
        :mode="mode"
        field="content"
        :dotsStyles="dotsStyles"
        >
          <swiper class="swiper-box" @change="changePic">
            <swiper-item v-for="(item,index) in bannerList" :key="index">
              <view class="swiper-item">
                <image class="image" :src="item.imageUrl" mode="aspectFill" @tap='goSwiperDetail'/>
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
        @click="goCatalog(item)"
      >
        <image class="cataloglist-item-img" :src="item.src" mode="aspectFill" />
        <view class="cataloglist-item-title">{{item.title}}</view>
      </view>
    </view>

    <!-- 头条公告 -->
      <view class="homepage-headlines">
        <image src="../../assets/img/index/topnew.png" mode="aspectFill" class="homepage-headlines-img"/>
        <view class="homepage-headlines-title">最新</view>
        <view class="homepage-headlines-content">这是一条公告内容，请点击查看…</view>
        <view class="iconfont iconyou homepage-headlines-icon"></view>
      </view>

      <!-- 推荐 + 资讯-->
      <view class="homepage-recommend-info">
        <!-- 推荐 -->
        <view class="homepage-recommend">
          <view
            class="homepage-recommend-list"
            v-for="item in recommendList"
            :key="item.id"
        
          >
            <view class="homepage-recommend-name">
              <view class="homepage-recommend-title">{{item.title}}</view>
              <view class="homepage-recommend-describe">{{item.describe}}</view>
            </view>
            <image class="homepage-recommend-image" :src="item.image" mode="aspectFill" />
            <image class="homepage-recommend-img" :src="item.img" mode="aspectFill" />
          </view>
        </view>
        <!-- 资讯 -->
        <view class="homepage-info">
          <view class="homepage-info-name">
            <text class="homepage-info-title">热门资讯</text>
            <text class="homepage-info-more">MORE</text>
          </view>
          <view>
            <view
            class="homepage-info-list"
            v-for="item in infoList"
            :key="item.id"
          >
            <view class="homepage-info-list-hot" @tap="goDetail">{{item.title}}</view>
            <!-- <view class="homepage-info-list-title">{{item.info}}</view> -->
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
      <!-- 广告图 -->
          <view  class="homepage-nav" v-show="isShowNav">
          <image src="../../assets/img/index/manypeople.png"  mode="aspectFill" />
          <i 
            class="homepage-nav-close iconfont iconcross"
            @tap="deleteNav"
          ></i>
          </view>
    </view>
</template>

<script>
import {
  uniSwiperDot
} from '@dcloudio/uni-ui';
import JSearchInput from '../../components/form/JSearchInput';
import {
  mapActions, mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
import './css/index.scss';

export default {
  name: 'index',
  components: {
    uniSwiperDot,
    JSearchInput
  },
  data() {
    return {
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
          src: require('@/assets/img/index/function-car.png'),
          title: '整车',
          url: '/pages/vehicleList/vehicleList'
        },
        {
          id: 2,
          src: require('@/assets/img/index/function-box.png'),
          title: '调货',
          url: '/pages/transferGoods/transferGoods'
        },
        {
          id: 3,
          src: require('@/assets/img/index/function-qiang.png'),
          title: '抢单',
          url: 'null'
        },
        {
          id: 4,
          src: require('@/assets/img/index/function-washingmachine.png'),
          title:"套餐",
          url: "/pages/market/marketList"
        },
        {
          id: 5,
          src: require('@/assets/img/index/function-compose.png'),
          title: "组合",
          url: "/pages/market/marketList"
        },
        {
          id: 6,
          src: require('@/assets/img/index/function-sale.png'),
          title: '特价',
          url: 'null'
        },
        {
          id: 7,
          src: require('@/assets/img/index/function-project.png'),
          title: '工程',
          url: 'null'
        },
        {
          id: 8,
          src: require('@/assets/img/index/function-tv.png'),
          title: '样机',
          url: 'null'
        },
        {
          id: 9,
          src: require('@/assets/img/index/function-yang.png'),
          title:"样品机",
          url: "/pages/sampleMachine/sampleMachineList"
        },
        {
          id: 10,
          src: require('@/assets/img/index/function-money.png'),
          title:"反向定制",
          url: "/pages/market/marketList"
        }
      ],
      recommendList: [
        {
          id: 1,
          title: '新品推荐',
          describe: '人气榜',
          image: require('@/assets/img/index/FC511Z00L.png'),
          img: require('@/assets/img/index/GD0R7N000.png'),
          url: '#'
        },
        {
          id: 2,
          title: '爆款推荐',
          describe: 'HOT',
          image: require('@/assets/img/index/CEAAJ300F.png'),
          img: require('@/assets/img/index/BH02Z00A8.png'),
          url: '#'
        },
        {
          id: 3,
          title: '我的专供',
          describe: '热卖好物',
          image: require('@/assets/img/index/FC511Z00L.png'),
          img: require('@/assets/img/index/GE0QA000W.png'),
          url: '#'
        },
        {
          id: 4,
          title: '聚划算',
          describe: '精选榜单',
          image: require('@/assets/img/index/FC511Z00L.png'),
          img: require('@/assets/img/index/GD0R7N000.png'),
          url: '#'
        },
      ],
      infoList: []
      // infoList: [
      //   {
      //     id: 1,
      //     hot: '热门',
      //     info: '这是一条热门资讯的内容,具体内容请查看详情......',
      //     url: '#'
      //   },
      //   {
      //     id: 2,
      //     hot: '热门',
      //     info: '这是一条热门资讯的内容,具体内容请查看详情......',
      //     url: '#'
      //   },
      //   {
      //     id: 3,
      //     hot: '热门',
      //     info: '这是一条热门资讯的内容,具体内容请查看详情......',
      //     url: '#'
      //   }
      // ],
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

  created(){
      this.getPageInf();
      // (async() => {
      //   await this[USER.UPDATE_DEFAULT_SEND_TO_ASYNC]();
      //   await this[USER.UPDATE_SALE_ASYNC]();
      //   await  this[USER.UPDATE_TOKEN_USER_ASYNC]();
      // })().then(res =>{
      //     // this.get()
      // })
      this.getIndexList()
      this.getList()
      this[USER.UPDATE_DEFAULT_SEND_TO_ASYNC]();
      this[USER.UPDATE_SALE_ASYNC]();
      this[USER.UPDATE_TOKEN_USER_ASYNC]();
      console.log(this.defaultSendToInf)
      console.log(this.tokenUserInf)

  },
  computed: {
    ...mapGetters({
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
      tokenUserInf:USER.GET_TOKEN_USER
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
    get() {
      // this.$nextTick(() => {
      const a = JSON.stringify(this.defaultSendToInf);
    },
    changePic(e) {
      this.current = e.detail.current;
    },
    silentReSearch() {
      /* 静默搜索 */ 
    },
    goDetail() {
       uni.navigateTo({
          url: `/pages/index/information`
        })  
    },
    search() {
      console.log(this.name)
      if(this.name) {
        uni.navigateTo({
          url: `/pages/goods/goodsList?name=${this.name}`
        })  
      } else {
        uni.showToast({
            title: '请输入搜索词',
        });
      }
    },
    getPageInf() {
      this.getbannerList();
    },
    async getbannerList() {
      const { code, data } = await this.indexService.bannerList({});
      if (code === '1') {
        this.bannerList = data;
        console.log(this.bannerList);
        console.log(data);
      }
    },
    // 目录列表跳转
    goCatalog(item) {

      uni.navigateTo({
        url:item.url
      });
      // console.log(url);
    },
    // 广告图
    deleteNav() {
      this.isShowNav = false;
    },
    // 新闻资讯
    async getIndexList() {
      const list = await this.messageService.indexList ({
        customerCode: this.defaultSendToInf.customerCode,
        unitId: this.tokenUserInf.name
      })
      if(list.code === "1") {
        console.log(list.data)
        this.infoList = list.data.slice(0,4)
      }
    },
    // 应用列表
    async getList() {
      const {code, data} = await this.commodityService.list ()
      if(code === "1") {
        data.map(item => {
          item.categoryCode = item.code
        })
        data.unshift({
          id: 0,
          code: "",
          title: "全部",
          categoryCode: ""
        })
        console.log(data)
        this.list = data
        this.list.map(item => {
          item.active = false
        })
        this.list[0].active = true
        console.log(this.list)
      }
    },
    // 应用列表跳转
    goGoodsList(item) {
      console.log(item)
      this.list.map(v => {
        v.active = false
      })
      item.active = true
      console.log(item.active)
      if(item.categoryCode) {
        uni.navigateTo({
        url: `/pages/goods/goodsList?code=${item.categoryCode}`
        })  
      } else {
        uni.navigateTo({
           url:"/pages/goods/goodsList"
        }) 
        
      }
    }
  }
}
</script>

<style scoped>
/deep/  .jSearchInput-wrap {
  width: 514px;
  height: 52px;
  background: rgba(102,135,168,0.15);
  box-shadow:0px 0px 12px 0px rgba(102,135,168,0.15);
  opacity: 0.8;
  border-radius:32px;
  border: 1px solid #6687A8;
  padding-left: 22px;
  padding-right: 26px;
  margin-right:26px;
}
/deep/ .col_c{
		 color: #fff;
	}

/deep/ .jSearchInput-icon{
  color: #fff;
  font-size:24px;
}

/deep/ .jSearchInput{
  margin-left: 36px;
  font-size: 24px;
  color: #000;
  background:rgba(102,135,168,0.15);
}
/* /deep/.jSearchInput::-ms-input-placeholder{
  color:#fff;
} */

</style>
