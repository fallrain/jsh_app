<template>
  <view class="">
    <view class="isFixed">
      <view class="vehicle-search j-flex-aic">
        <j-search-input v-model="searchVal" @search="silentReSearch"></j-search-input>
        <button @tap="silentReSearch" class="vehicle-btn" type="button">搜索</button>
      </view>
    </view>
    <view class="nav">
      <view class="nav-left">
        <scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
          <view :key="index" @tap="cateClick(index)" class="scroll-view-item" v-for="(item,index) in categoryList">
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
              <image :src="imgMap.get(childed.code)" @tap="checkCat(childed)"/>
              <view @tap="checkCat(childed)">{{childed.title}}</view>
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
    const temp = new Map();
    temp.set('http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/1%E5%8D%95%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/1%E5%8D%95%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/1%E5%8D%95%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010102', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/2%E4%B8%A4%E9%9D%A2%E5%86%B0%E7%AE%B1.png');
    temp.set('010103', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/3%E4%B8%89%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010104', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/4%E5%A4%9A%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010105', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B0%E7%AE%B1/%E5%AF%B9%E5%BC%80%E9%97%A8%E5%86%B0%E7%AE%B1.png');
    temp.set('010106', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010107', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010108', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010109', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010110', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010111', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010112', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010113', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010114', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/5%E5%86%B0%E5%90%A7.png');
    temp.set('010202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/6%E9%85%92%E6%9F%9C.png');
    temp.set('010203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/7%E5%86%B7%E6%9F%9C.png');
    temp.set('010204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%86%B7%E6%9F%9C/8%E5%B1%95%E7%A4%BA%E6%9F%9C.png');
    temp.set('010205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010301', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/9%E6%9F%9C%E5%BC%8F%E7%A9%BA%E8%B0%83.png');
    temp.set('010302', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/10%E6%8C%82%E5%A3%81%E5%BC%8F%E7%A9%BA%E8%B0%83.png');
    temp.set('010303', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/11%E5%AE%A4%E5%86%85%E6%9C%BA.png');
    temp.set('010304', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/12%E5%AE%A4%E5%A4%96%E6%9C%BA.png');
    temp.set('010305', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/13%E6%9C%BA%E5%A3%B3.png');
    temp.set('010306', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/14%E7%A9%BA%E6%B0%94%E5%87%80%E5%8C%96%E5%99%A8.png');
    temp.set('010307', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/14%E6%96%B0%E9%A3%8E%E6%9C%BA.png');
    temp.set('010308', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/15%E9%99%A4%E6%B9%BF%E6%9C%BA.png');
    temp.set('010309', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%AE%B6%E7%94%A8%E7%A9%BA%E8%B0%83/16%E7%A7%BB%E5%8A%A8%E5%BC%8F%E7%A9%BA%E8%B0%83.png');
    temp.set('010401', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/17%E5%8D%95%E5%85%83%E6%9C%BA.png');
    temp.set('010402', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/18%E5%A4%9A%E8%81%94%E6%9C%BA.png');
    temp.set('010403', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/19%E6%B0%B4%E6%9C%BA.png');
    temp.set('010404', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/20%E6%B0%B4%E6%9C%BA%E6%9C%AB%E7%AB%AF.png');
    temp.set('010405', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/21%E7%B2%BE%E5%AF%86%E7%A9%BA%E8%B0%83.png');
    temp.set('010406', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E4%B8%AD%E5%A4%AE%E7%A9%BA%E8%B0%83/22%E5%85%A8%E7%83%AD%E4%BA%A4%E6%8D%A2.png');
    temp.set('010501', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/23%E6%B3%A2%E8%BD%AE.png');
    temp.set('010502', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/24%E6%BB%9A%E7%AD%92.png');
    temp.set('010503', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/25%E5%B9%B2%E8%A1%A3%E6%9C%BA.png');
    temp.set('010506', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/25%E5%B9%B2%E8%A1%A3%E6%9C%BA.png');
    temp.set('010507', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E6%B4%97%E8%A1%A3%E6%9C%BA/27%E6%99%BA%E8%83%BD%E5%B9%B2%E9%9E%8B%E6%9C%BA.png');
    temp.set('010508', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010509', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010601', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010602', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010603', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010604', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010605', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010701', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('010702', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/33%E5%B0%8F%E9%A3%8E%E7%AE%A1.png');
    temp.set('010703', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/30%E5%AE%B6%E4%B8%AD%E6%9C%BA.png');
    temp.set('010704', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E7%A9%BA%E8%B0%83/34%E6%8E%A7%E5%88%B6%E5%99%A8.png');
    temp.set('010801', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E6%9F%9C%E5%B5%8C/31%E6%9F%9C%E5%B5%8C.png');
    temp.set('010802', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%86%B0%E6%B4%97%E7%A9%BA%E5%86%B7/%E5%95%86%E7%94%A8%E6%9F%9C%E5%B5%8C/32%E5%9F%BA%E7%AB%99%E7%A9%BA%E8%B0%83.png');
    temp.set('020101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020102', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020103', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020104', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020105', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/36%E9%98%BF%E9%87%8C%E5%B9%B3%E6%9D%BF%E7%94%B5%E8%A7%86.png');
    temp.set('020106', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020107', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/36%E6%A8%A1%E5%8D%A1%E7%94%B5%E8%A7%86.png');
    temp.set('020108', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%A7%86/37%E7%BB%9F%E5%B8%85%E5%B9%B3%E6%9D%BF%E7%94%B5%E8%A7%86.png');
    temp.set('020109', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%84%91/38%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91.png');
    temp.set('020202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%B5%E8%84%91%E7%94%B5%E8%A7%86/%E7%94%B5%E8%84%91/38%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91.png');
    temp.set('020203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020206', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('020207', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/39%E7%83%9F%E6%9C%BA.png');
    temp.set('030102', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/40%E7%87%83%E6%B0%94%E7%81%B6.png');
    temp.set('030103', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/41%E6%B4%97%E7%A2%97%E6%9C%BA.png');
    temp.set('030104', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/42%E6%B6%88%E6%AF%92%E6%9F%9C.png');
    temp.set('030105', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/42%E4%B8%AD%E5%BC%8F%E6%B4%97%E7%A2%97%E6%9C%BA.png');
    temp.set('030106', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/43%E6%B0%B4%E6%A7%BD%E6%B4%97%E7%A2%97%E6%9C%BA.png');
    temp.set('030107', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030108', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/44%E7%94%B5%E7%83%A4%E7%AE%B1.png');
    temp.set('030109', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/45%E8%92%B8%E7%AE%B1.png');
    temp.set('030110', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030111', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030112', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E5%8E%A8%E6%88%BF%E7%94%B5%E5%99%A8/%E9%9B%86%E6%88%90%E7%81%B6.png');
    temp.set('030201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/46%E7%94%B5%E7%83%AD%E6%B0%B4%E5%99%A8.png');
    temp.set('030202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/47%E7%87%83%E6%B0%94%E7%83%AD%E6%B0%B4%E5%99%A8.png');
    temp.set('030203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/48%E5%A4%AA%E9%98%B3%E8%83%BD%E4%B8%80%E4%BD%93%E6%9C%BA.png');
    temp.set('030204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/49%E5%A4%AA%E9%98%B3%E8%83%BD%E5%88%86%E4%BD%93%E6%9C%BA.png');
    temp.set('030205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/50%E7%A9%BA%E6%B0%94%E6%BA%90%E7%83%AD%E6%B0%B4%E5%99%A8.png');
    temp.set('030206', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030207', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030208', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030209', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E5%8E%A8%E6%88%BF%E5%8D%AB%E6%B5%B4/%E7%83%AD%E6%B0%B4%E5%99%A8/51%E9%87%87%E6%9A%96%E7%82%89.png');
    temp.set('030210', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030301', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030302', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030303', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('030401', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040401', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('040402', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/53%E6%8C%82%E7%83%AB%E6%9C%BA.png');
    temp.set('050103', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/56%E7%94%B5%E6%9A%96%E5%99%A8.png');
    temp.set('050104', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/54%E5%90%B8%E5%B0%98%E5%99%A8.png');
    temp.set('050105', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/55%E7%94%B5%E9%A3%8E%E6%89%87.png');
    temp.set('050106', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/57%E6%89%AB%E5%9C%B0%E6%9C%BA%E5%99%A8%E4%BA%BA.png');
    temp.set('050107', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050108', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050109', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050110', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050111', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050113', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050114', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/58%E6%90%85%E6%8B%8C%E6%9C%BA.png');
    temp.set('050116', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050117', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/59%E7%94%9F%E6%B4%BB%E7%94%B5%E5%99%A8%E7%83%A4%E7%AE%B1.png');
    temp.set('050118', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/60%E7%8E%AF%E5%A2%83%E7%94%B5%E5%99%A8.png');
    temp.set('050119', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%AE%B6%E7%94%B5/61%E7%81%AF%E5%85%B7.png');
    temp.set('050201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050206', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050207', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050208', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050209', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050210', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050211', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050212', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050213', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050214', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050215', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050216', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050217', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050218', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050219', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050220', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050221', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050222', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050223', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050301', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050302', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050303', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/70KKC%E6%99%BA%E8%83%BD%E7%89%99%E5%88%B7.png');
    temp.set('050304', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050305', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/71%E5%81%A5%E5%BA%B7%E7%A7%B0.png');
    temp.set('050306', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86/73%E6%99%BA%E8%83%BD%E7%9D%A1%E7%9C%A0.png');
    temp.set('050307', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050308', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050401', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E5%AE%B6%E5%B1%85/74LED%E5%8F%B0%E7%81%AF.png');
    temp.set('050402', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050403', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050404', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E5%AE%B6%E5%B1%85/75%E8%A1%A3%E7%89%A9%E6%8A%A4%E7%90%86%E6%9F%9C.png');
    temp.set('050501', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050502', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050503', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050504', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050505', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050506', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050507', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050508', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050509', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050510', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050511', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%AF%8D%E5%A9%B4%E5%AE%B6%E7%94%B5/77%E5%84%BF%E7%AB%A5%E9%A5%AE%E5%93%81%E6%90%85%E6%8B%8C%E6%9C%BA.png');
    temp.set('050512', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%AF%8D%E5%A9%B4%E5%AE%B6%E7%94%B5/77%E5%84%BF%E7%AB%A5%E9%A5%AE%E5%93%81%E6%90%85%E6%8B%8C%E6%9C%BA.png');
    temp.set('050601', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/80%E5%8F%B0%E5%BC%8F.png');
    temp.set('050602', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/81%E7%AB%8B%E5%BC%8F.png');
    temp.set('050603', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/79%E5%8E%A8%E4%B8%8B%E5%BC%8F.png');
    temp.set('050604', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/%E7%94%9F%E6%B4%BB%E5%AE%B6%E7%94%B5/%E6%99%BA%E9%A5%AE%E6%9C%BA/82%E6%BB%A4%E8%8A%AF.png');
    temp.set('050605', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('050606', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080101', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080108', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080201', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080202', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080203', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080204', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080205', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080206', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    temp.set('080207', 'http://haier-btbrrs-public.oss-cn-qingdao.aliyuncs.com/category/deafault.png');
    return {
      categoryList: [],
      imgMap: temp,
      subCategoryList: [],
      searchVal: '',
      categoryActive: 0
    };
  },
  created() {
    this.catalog();
  },
  onShow() {
    uni.showTabBar();
  },
  methods: {
    async catalog() {
      const { code, data } = await this.catalogServer.catalog();
      if (code === '1') {
        this.categoryList = data;
        console.log(this.categoryList[0]);
        this.subCategoryList = this.categoryList[0];
        this.categoryList.forEach((item) => {
          console.log(item);
          item.subCats.forEach((v) => {
            this.imgs.forEach((ele) => {
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
