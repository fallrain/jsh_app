<template>
  <view class="">
    <view class="isFixed">
      <uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
    </view>
    <view class="nav">
      <view class="nav-left">
        <scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
          <view @click="cateClick(item,index)" :key="index" v-for="(item,index) in categoryList" class="scroll-view-item">
            <view :class="index==categoryActive?'active':'noActive'" >{{item.NAME}}</view>
          </view>
        </scroll-view>
      </view>
      <view class="nav-right">
        <view class="nav-right-titlePic">
          <image src="@/assets/img/goods/example-fridge.jpg"/>
        </view>
        <view v-for="child in subCategoryList" :key="child.NAME">
          <view class="uni-flex uni-row" style="padding-left: 34%;">
            <view class="category-line"></view>
            <view class="category-title">{{child.NAME}}</view>
            <view class="category-line"></view>
          </view>
          <view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
            <view v-for="childed in child.hdg" :key="childed.NAME" class="nav-right-item">
              <image :src="childed.LOGO"/>
              <view class="">{{childed.NAME}}</view>
            </view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>
<script>
import {
  uniSearchBar
} from '@dcloudio/uni-ui';

export default {
  name: 'Category',
  components: {
    uniSearchBar
  },
  data() {
    return {
      searchVal: '',
      categoryActive: 0,
      data: {
        categoryList: [],
        subCategoryList: [],
      },
    };
  },
  methods: {
    search(res) {
      uni.showToast({
        title: `搜索：${res.value}`,
        icon: 'none'
      });
    },
    input(res) {
      this.searchVal = res.value;
    },
    cancel(res) {
      uni.showToast({
        title: `点击取消，输入值为：${res.value}`,
        icon: 'none'
      });
    },
    onBackPress() {
      // #ifdef APP-PLUS
      plus.key.hideSoftKeybord();
      // #endif
    },
    // 滑动
    upper(e) {
      console.log(e);
    },
    lower(e) {
      console.log(e);
    },
    cateClick(categroy, index) {
      this.categoryActive = index;
      console.log(categroy);
      console.log(this.categoryActive);
    },
  },
  onLoad() {
    this.categoryList = [
      { id: 0, NAME: '水洗空冷', LOGO: 'http://placehold.it/50x50' },
      { id: 1, NAME: '电视电脑', LOGO: 'http://placehold.it/50x50' },
      { id: 2, NAME: '厨房卫浴', LOGO: 'http://placehold.it/50x50' },
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
    ];
    this.subCategoryList = [
      { NAME: '分类品1',
        hdg: [{ NAME: '分类1:商品1', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品2', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品3', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品4', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品5', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品6', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品7', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品8', LOGO: 'http://placehold.it/50x50' }] },
      { NAME: '分类品2',
        hdg: [{ NAME: '分类1:商品1', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品2', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品3', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品4', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品5', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品6', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品7', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品8', LOGO: 'http://placehold.it/50x50' }] },
      { NAME: '分类品3',
        hdg: [{ NAME: '分类1:商品1', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品2', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品3', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品4', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品5', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品6', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品7', LOGO: 'http://placehold.it/50x50' },
          { NAME: '分类1:商品8', LOGO: 'http://placehold.it/50x50' }] }];
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.screenHeight * 0.8;
      }
    });
  },
};
</script>

<style scoped>
  /deep/ .uni-searchbar{
    height: 80px;
  }
  /deep/ .uni-searchbar__box{
    height: 60px;
  }
  .isFixed{
    background-color:#Fff;
    z-index:999;
    position: sticky;
    top: 88px;
  }
  .scroll-Y {
    height: 100%;
  }
  .nav {
    display: flex;
    width: 100%;
  }
  .nav-left {
    width: 25%;
    position: fixed;
    height: 70%;/*左侧滑动展示区域高度*/
    overflow: auto;
    float: left;
  }
  .scroll-view-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 28px;
  }
  .active {
    margin-top: 50px;
    height: 40px;
    line-height: 40px;
    border-left: 8px #ED2856 solid;
    color: #ED2856;
  }
  .noActive {
    margin-top: 50px;
    color: #666666;
  }
  .nav-right {
    margin-left: 25%;
    width: 75%;
    border-left: 1px #eeeeee solid;
  }
  .bordered {
    border: 1px #eeeeee solid;
  }
  .category-title {
    height: 84px;
    line-height: 84px;
    font-size: 28px;
    color: #666666;
    padding-left: 20px;
    padding-right: 20px;
  }
  .category-line {
    background-color: #979797;
    height: 2px;
    width: 20px;
    margin-top: 40px;
  }
  .nav-right-titlePic {
    padding: 20px 20px 10px 20px;
    width: 100%;
    height: 240px;
  }
  .nav-right-titlePic image{
    width: 100%;
    height: 100%;
  }
  .nav-right-item {
    width: 33%;
    height: 190px;
    float: left;
    text-align: center;
    color: #666666;
    font-size: 24px;
  }
  .nav-right-item image{
    width: 100px;
    height: 100px;
  }
</style>
