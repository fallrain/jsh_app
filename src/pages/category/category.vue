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
            <view v-for="(childed,index2) in child.subCats" :key="childed.title" class="nav-right-item">
              <image :src="child.images[index2].image"/>
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
      imgs: [
        {
          title: '冰箱',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/1%E5%8D%95%E9%97%A8%E5%86%B0%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/2%E4%B8%A4%E9%9D%A2%E5%86%B0%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/3%E4%B8%89%E9%97%A8%E5%86%B0%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/4%E5%A4%9A%E9%97%A8%E5%86%B0%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/%E5%AF%B9%E5%BC%80%E9%97%A8%E5%86%B0%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '冷柜',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/5%E5%86%B0%E5%90%A7.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/6%E9%85%92%E6%9F%9C.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/7%E5%86%B7%E6%9F%9C.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/8%E5%B1%95%E7%A4%BA%E6%9F%9C.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '家用空调',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/9%E6%9F%9C%E5%BC%8F%E7%A9%BA%E8%B0%83.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/10%E6%8C%82%E5%A3%81%E5%BC%8F%E7%A9%BA%E8%B0%83.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/11%E5%AE%A4%E5%86%85%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/12%E5%AE%A4%E5%A4%96%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/13%E6%9C%BA%E5%A3%B3.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/14%E7%A9%BA%E6%B0%94%E5%87%80%E5%8C%96%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/14%E6%96%B0%E9%A3%8E%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/15%E9%99%A4%E6%B9%BF%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/16%E7%A7%BB%E5%8A%A8%E5%BC%8F%E7%A9%BA%E8%B0%83.png' },
          ]
        },
        {
          title: '中央空调',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/17%E5%8D%95%E5%85%83%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/18%E5%A4%9A%E8%81%94%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/19%E6%B0%B4%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/20%E6%B0%B4%E6%9C%BA%E6%9C%AB%E7%AB%AF.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/21%E7%B2%BE%E5%AF%86%E7%A9%BA%E8%B0%83.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/22%E5%85%A8%E7%83%AD%E4%BA%A4%E6%8D%A2.png' },
          ]
        },
        {
          title: '洗衣机',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/23%E6%B3%A2%E8%BD%AE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/24%E6%BB%9A%E7%AD%92.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/25%E5%B9%B2%E8%A1%A3%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/25%E5%B9%B2%E8%A1%A3%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/27%E6%99%BA%E8%83%BD%E5%B9%B2%E9%9E%8B%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '家电配套产品',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '商用空调',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/33%E5%B0%8F%E9%A3%8E%E7%AE%A1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/30%E5%AE%B6%E4%B8%AD%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/34%E6%8E%A7%E5%88%B6%E5%99%A8.png' },
          ]
        },
        {
          title: '商用柜嵌',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E6%9F%9C%E5%B5%8C/31%E6%9F%9C%E5%B5%8C.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E6%9F%9C%E5%B5%8C/32%E5%9F%BA%E7%AB%99%E7%A9%BA%E8%B0%83.png' }
          ]
        },
        {
          title: '电视',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/36%E9%98%BF%E9%87%8C%E5%B9%B3%E6%9D%BF%E7%94%B5%E8%A7%86.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/36%E6%A8%A1%E5%8D%A1%E7%94%B5%E8%A7%86.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/37%E7%BB%9F%E5%B8%85%E5%B9%B3%E6%9D%BF%E7%94%B5%E8%A7%86.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '电脑',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%84%91/38%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%84%91/38%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '厨房电器',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/39%E7%83%9F%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/40%E7%87%83%E6%B0%94%E7%81%B6.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/41%E6%B4%97%E7%A2%97%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/42%E6%B6%88%E6%AF%92%E6%9F%9C.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/42%E4%B8%AD%E5%BC%8F%E6%B4%97%E7%A2%97%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/43%E6%B0%B4%E6%A7%BD%E6%B4%97%E7%A2%97%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/44%E7%94%B5%E7%83%A4%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/45%E8%92%B8%E7%AE%B1.png' },
          ]
        },
        {
          title: '热水器',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/46%E7%94%B5%E7%83%AD%E6%B0%B4%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/47%E7%87%83%E6%B0%94%E7%83%AD%E6%B0%B4%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/48%E5%A4%AA%E9%98%B3%E8%83%BD%E4%B8%80%E4%BD%93%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/49%E5%A4%AA%E9%98%B3%E8%83%BD%E5%88%86%E4%BD%93%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/50%E7%A9%BA%E6%B0%94%E6%BA%90%E7%83%AD%E6%B0%B4%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/51%E9%87%87%E6%9A%96%E7%82%89.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '卫浴电器',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '其他生活家电',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '手机',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '数码',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '小帅影院',
          sub: []
        },
        {
          title: '电子教育',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '生活小家电',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/53%E6%8C%82%E7%83%AB%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/56%E7%94%B5%E6%9A%96%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/54%E5%90%B8%E5%B0%98%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/55%E7%94%B5%E9%A3%8E%E6%89%87.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/57%E6%89%AB%E5%9C%B0%E6%9C%BA%E5%99%A8%E4%BA%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/58%E6%90%85%E6%8B%8C%E6%9C%BA.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/59%E7%94%9F%E6%B4%BB%E7%94%B5%E5%99%A8%E7%83%A4%E7%AE%B1.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/60%E7%8E%AF%E5%A2%83%E7%94%B5%E5%99%A8.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/61%E7%81%AF%E5%85%B7.png' },
          ]
        },
        {
          title: '厨房小家电',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '个人护理',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/70KKC%E6%99%BA%E8%83%BD%E7%89%99%E5%88%B7.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/71%E5%81%A5%E5%BA%B7%E7%A7%B0.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/73%E6%99%BA%E8%83%BD%E7%9D%A1%E7%9C%A0.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '家居',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E5%AE%B6%E5%B1%85/74LED%E5%8F%B0%E7%81%AF.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E5%AE%B6%E5%B1%85/75%E8%A1%A3%E7%89%A9%E6%8A%A4%E7%90%86%E6%9F%9C.png' },
          ]
        },
        {
          title: '母婴家电',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%AF%8D%E5%A9%B4%E5%AE%B6%E7%94%B5/77%E5%84%BF%E7%AB%A5%E9%A5%AE%E5%93%81%E6%90%85%E6%8B%8C%E6%9C%BA.png' },
          ]
        },
        {
          title: '智饮机',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/80%E5%8F%B0%E5%BC%8F.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/81%E7%AB%8B%E5%BC%8F.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/79%E5%8E%A8%E4%B8%8B%E5%BC%8F.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/82%E6%BB%A4%E8%8A%AF.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        },
        {
          title: '净水机',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '饮水机',
          sub: []
        },
        {
          title: 'BWT净水',
          sub: []
        },
        {
          title: '智能门锁',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
          ]
        },
        {
          title: '智慧家居',
          sub: [
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' },
            { image: 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E9%BB%98%E8%AE%A4%E5%9B%BE.png' }
          ]
        }
      ],
      subCategoryList: [],
      searchVal: '',
      categoryActive: 0
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
        console.log(this.categoryList[0]);
        this.subCategoryList = this.categoryList[0];
        this.categoryList.forEach(item => {
          console.log(item);
          item.subCats.forEach(v => {
            this.imgs.forEach(ele => {
              if (v.title === ele.title) {
                v.images = ele.sub;
              }
            });
          });
        });
        console.log(this.categoryList);
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
      console.log(this.subCategoryList.subCats);
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
    padding-left: 24px;
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
