<template>
  <view class="">
    <view class="isFixed">
      <uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
      <view class="">
        <text class="">当前输入为：{{ searchVal }}</text>
      </view>
    </view>
    <view class="nav">
      <view class="nav-left">
        <scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
          <view @click="cateClick(item,index)" :key="index" :class="index==categoryActive?'active':''"  v-for="(item,index) in categoryList" class="scroll-view-item bordered">
            {{item.NAME}}
          </view>
        </scroll-view>
      </view>
      <view class="nav-right">
        <view v-for="child in subCategoryList">
          <view class="uni-flex uni-row">{{child.NAME}}</view>
          <view class="lineHigt"></view>
          <view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
            <view v-for="childed in child.hdg" class="nav-right-item">
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
import uniSearchBar from '../../components/uniUi/uni-extend/uni-search-bar';

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
      { id: 0, NAME: 'aa1', LOGO: 'http://placehold.it/50x50' },
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

<style>
  .isFixed{
    background-color:#Fff;
    z-index:999;
    position: sticky;
    top: 88px;
  }
  .scroll-view-item {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
  }
  .scroll-Y {
    height: 100%;
  }
  .nav {
    display: flex;
    width: 100%;
  }
  .nav-left {
    width: 30%;
    position: fixed;
    height: 70%;/*左侧滑动展示区域高度*/
    overflow: auto;
    float: left;
  }
  .nav-right {
    margin-left: 30%;
    width: 70%;
  }
  .bordered {
    border: 1px #eeeeee solid;
  }
  .lineHigt {
    background-color: #F5F5F5;
    height: 5px;
  }
  .active {
    color: #F24544;
  }
  .nav-right-item {
    width: 33%;
    height: 220px;
    float: left;
    text-align: center;
    /*padding: 11px;*/
    font-size: 26px;
  }
  .nav-right-item image{
    width: 100px;
    height: 100px;
  }
</style>
