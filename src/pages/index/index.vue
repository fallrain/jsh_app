<template>
  <!-- <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{title}}</text>
    </view>
  </view> -->
  <view class="homepage">
    <view class="homepage-top">
      <view class="homepage-top-head">
        <text class="homepage-top-head-name">巨商汇</text>
        <input 
          type="text" 
          placeholder="请输入搜索信息" 
          placeholder-style="placeholder" 
          class="homepage-top-head-input" />
        <view class='iconfont iconpeople homepage-top-head-icon'></view>
      </view>  
      <view class="homepage-top-center">
        <view 
          class="homepage-top-center-list"
          v-for="(item,index) in list"
          :key="index"
        >
        {{item}}
        </view>
      </view>    
          <!-- 轮播图 -->
      <view class="homepage-swiper">
        <uni-swiper-dot 
        :info="info" 
        :current="current" 
        :mode="mode" 
        field="content" 
        :dotsStyles="dotsStyles"
        >
          <swiper class="swiper-box" @change="changePic">
            <swiper-item v-for="(item, index) in info" :key="index">
              <view :class="item.colorClass" class="swiper-item">
                <image class="image" :src="item.url" mode="aspectFill" />
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
            <view class="homepage-info-list-hot">{{item.hot}}</view>
            <view class="homepage-info-list-title">{{item.info}}</view>
          </view>
          </view>

        </view>

      </view>


    </view>
</template>

<script>
import {
  uniSwiperDot
} from '@dcloudio/uni-ui';
import './css/index.scss';
export default {
  name:"index",
  components:{
    uniSwiperDot
  },
  data() {
    return {
      list:["全部","水洗空冷","电视电脑","厨房卫浴","手机数码","生活"],
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
      current: 0, // 轮播图第几张
      mode: 'round',// 轮播图底部按钮样式
      dotsStyles:{
        backgroundColor:'rgba(255,255,255,.4)', // 未选择指示点背景色
        border:'1px rgba(255,255,255,.3) solid',
        selectedBackgroundColor:'rgba(255,255,255,1)',// 已选择指示点背景色
        selectedBorder:'1px rgba(255,255,255,.3) solid'
      },
      cataloglist:[
        {
          id:1,
          src: require('@/assets/img/index/function-box.png'),
          title:"整车"
        },
        {
          id:2,
          src: require('@/assets/img/index/function-box.png'),
          title:"调货"
        },
        {
          id:3,
          src: require('@/assets/img/index/function-qiang.png'),
          title:"抢单"
        },
        {
          id:4,
          src: require('@/assets/img/index/function-washingmachine.png'),
          title:"套餐"
        },
        {
          id:5,
          src: require('@/assets/img/index/function-washingmachine.png'),
          title:"组合"
        },
        {
          id:6,
          src: require('@/assets/img/index/function-sale.png'),
          title:"特价"
        },
        {
          id:7,
          src: require('@/assets/img/index/function-qiang.png'),
          title:"工程"
        },
        {
          id:8,
          src: require('@/assets/img/index/function-tv.png'),
          title:"样机"
        },
        {
          id:9,
          src: require('@/assets/img/index/function-qiang.png'),
          title:"样品机"
        },
        {
          id:10,
          src: require('@/assets/img/index/function-qiang.png'),
          title:"反向定制"
        }
      ],
      recommendList:[
              {
                  id:1,
                  title:"新品推荐",
                  describe:"人气榜",
                  image:require('@/assets/img/index/FC511Z00L.png'),
                  img:require('@/assets/img/index/BH02Z00A8.png')
              },
              {
                  id:2,
                  title:"爆款推荐",
                  describe:"HOT",
                  image:require('@/assets/img/index/CEAAJ300F.png'),
                  img:require('@/assets/img/index/BH02Z00A8.png')
              },
              {
                  id:3,
                  title:"我的专供",
                  describe:"热卖好物",
                  image:require('@/assets/img/index/FC511Z00L.png'),
                  img:require('@/assets/img/index/BH02Z00A8.png')
              },
              {
                  id:4,
                  title:"聚划算",
                  describe:"精选榜单",
                  image:require('@/assets/img/index/FC511Z00L.png'),
                  img:require('@/assets/img/index/BH02Z00A8.png')
              },
        ],
        infoList:[
          {
            id:1,
            hot:"热门",
            info:"这是一条热门资讯的内容,具体内容请查看详情......"
          },
           {
            id:2,
            hot:"热门",
            info:"这是一条热门资讯的内容,具体内容请查看详情......"
          },
           {
            id:3,
            hot:"热门",
            info:"这是一条热门资讯的内容,具体内容请查看详情......"
          }
        ]
        

   
   
   };
  },
  onLoad() {

  },
  methods: {
    changePic(e) {
      this.current = e.detail.current;
    }
  }
};
</script>

<style>
  
</style>
