<template>
  <view class="">
    <view class="isFixed">
      <view class="vehicle-search j-flex-aic">
        <j-search-input v-model="searchVal" @search="silentReSearch"></j-search-input>
        <button type="button" class="vehicle-btn" @click="silentReSearch">搜索</button>
      </view>
    </view>
    <view class="nav">
      <view class="nav-left">
        <scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
          <view @click="cateClick(index)" :key="index" v-for="(item,index) in categoryList" class="scroll-view-item">
            <view :class="index==categoryActive?'active':'noActive'" >{{item.title}}</view>
          </view>
        </scroll-view>
      </view>
      <view class="nav-right">
        <view class="nav-right-titlePic">
<!--          <image :src="subCategoryList.images[0].pictureUrl"/>-->
        </view>
        <view v-for="(child,indexC) in subCategoryList.subCats" :key="indexC">
          <view class="uni-flex uni-row" style="padding-left: 34%;">
            <view class="category-line"></view>
            <view class="category-title">{{child.title}}</view>
            <view class="category-line"></view>
          </view>
          <view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
            <view v-for="childed in child.subCats" :key="childed.title" class="nav-right-item">
<!--              <image :src="categoryList[0].images[0].pictureUrl"/>-->
              <view @click="checkCat(childed)">{{childed.title}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import JSearchInput from '../../components/form/JSearchInput';

export default {
  name: 'Category',
  components: {
    JSearchInput
  },
  data() {
    return {
      categoryList: [],
      subCategoryList: [],
      searchVal: '',
      categoryActive: 0,
    };
  },
  created() {
    this.catalog();
  },
  methods: {
    async catalog() {
      const { code, data } = await this.catalogServer.catalog();
      if (code === '1') {
        this.categoryList = data;
        this.subCategoryList = this.categoryList[0];
        this.categoryActive = 0;
      }
      console.log(data);
    },
    silentReSearch() {
      /* sousuo */
      uni.navigateTo({
        url: `/pages/goods/goodsList?name=${this.searchVal}`
      });
    },
    // 滑动
    upper(e) {
      console.log(e);
    },
    lower(e) {
      console.log(e);
    },
    cateClick(index) {
      console.log(index);
      this.categoryActive = index;
      this.subCategoryList = this.categoryList[index];
      console.log(this.categoryActive);
    },
    checkCat(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/goods/goodsList?categoryCode=${item.code}`
      });
    }
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.screenHeight * 0.8;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
  .vehicle-btn{
    display: inline-block;
    width: 160px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: $theme-color;
    border-radius: 28px;
    color: #fff;
    font-size: 28px;
    margin-left: 20px;
  }
  .vehicle-search{
    position: absolute;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 104px;
    background: #fff;
    border-bottom: 1px solid #F5F5F5;
  }
  .isFixed{
    background-color:#Fff;
    z-index:999;
    position: fixed;
    width: 100%;
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
    padding-top: 88px;
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
    padding-top: 88px;
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
