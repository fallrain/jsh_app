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
            { image: require('@/assets/img/category/冰洗空冷/冰箱/1单门冰箱.png') },
            { image: require('@/assets/img/category/冰洗空冷/冰箱/2两面冰箱.png') },
            { image: require('@/assets/img/category/冰洗空冷/冰箱/3三门冰箱.png') },
            { image: require('@/assets/img/category/冰洗空冷/冰箱/4多门冰箱.png') },
            { image: require('@/assets/img/category/冰洗空冷/冰箱/对开门冰箱.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '冷柜',
          sub: [
            { image: require('@/assets/img/category/冰洗空冷/冷柜/5冰吧.png') },
            { image: require('@/assets/img/category/冰洗空冷/冷柜/6酒柜.png') },
            { image: require('@/assets/img/category/冰洗空冷/冷柜/7冷柜.png') },
            { image: require('@/assets/img/category/冰洗空冷/冷柜/8展示柜.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '家用空调',
          sub: [
            { image: require('@/assets/img/category/冰洗空冷/家用空调/9柜式空调.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/10挂壁式空调.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/11室内机.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/12室外机.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/13机壳.png')},
            { image: require('@/assets/img/category/冰洗空冷/家用空调/14空气净化器.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/14新风机.png') },
            { image: require('@/assets/img/category/冰洗空冷/家用空调/15除湿机.png')},
            { image: require('@/assets/img/category/冰洗空冷/家用空调/16移动式空调.png') },
          ]
        },
        {
          title: '中央空调',
          sub: [
            { image: require('@/assets/img/category/冰洗空冷/中央空调/17单元机.png') },
            { image: require('@/assets/img/category/冰洗空冷/中央空调/18多联机.png') },
            { image: require('@/assets/img/category/冰洗空冷/中央空调/19水机.png') },
            { image: require('@/assets/img/category/冰洗空冷/中央空调/20水机末端.png') },
            { image: require('@/assets/img/category/冰洗空冷/中央空调/21精密空调.png') },
            { image: require('@/assets/img/category/冰洗空冷/中央空调/22全热交换.png') },
          ]
        },
        {
          title: '洗衣机',
          sub: [
            { image: require('@/assets/img/category/冰洗空冷/洗衣机/23波轮.png') },
            { image: require('@/assets/img/category/冰洗空冷/洗衣机/24滚筒.png') },
            { image: require('@/assets/img/category/冰洗空冷/洗衣机/25干衣机.png') },
            { image: require('@/assets/img/category/冰洗空冷/洗衣机/26智能晾衣机.png') },
            { image: require('@/assets/img/category/冰洗空冷/洗衣机/27智能干鞋机.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '家电配套产品',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '商用空调',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/冰洗空冷/商用空调/33小风管.png') },
            { image: require('@/assets/img/category/冰洗空冷/商用空调/30家中机.png') },
            { image: require('@/assets/img/category/冰洗空冷/商用空调/34控制器.png') },
          ]
        },
        {
          title: '商用柜嵌',
          sub: [
            { image: require('@/assets/img/category/冰洗空冷/商用柜嵌/31柜嵌.png') },
            { image: require('@/assets/img/category/冰洗空冷/商用柜嵌/32基站空调.png') }
          ]
        },
        {
          title: '电视',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/电脑电视/电视/36阿里平板电视.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/电脑电视/电视/36模卡电视.png') },
            { image: require('@/assets/img/category/电脑电视/电视/37统帅平板电视.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '电脑',
          sub: [
            { image: require('@/assets/img/category/电脑电视/电脑/38笔记本电脑.png') },
            { image: require('@/assets/img/category/电脑电视/电脑/38笔记本电脑.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '厨房电器',
          sub: [
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/39烟机.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/40燃气灶.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/41洗碗机.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/42消毒柜.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/42中式洗碗机.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/43水槽洗碗机.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/44电烤箱.png') },
            { image: require('@/assets/img/category/厨房卫浴/厨房电器/45蒸箱.png') },
          ]
        },
        {
          title: '热水器',
          sub: [
            { image: require('@/assets/img/category/厨房卫浴/热水器/46电热水器.png') },
            { image: require('@/assets/img/category/厨房卫浴/热水器/47燃气热水器.png') },
            { image: require('@/assets/img/category/厨房卫浴/热水器/48太阳能一体机.png') },
            { image: require('@/assets/img/category/厨房卫浴/热水器/49太阳能分体机.png') },
            { image: require('@/assets/img/category/厨房卫浴/热水器/50空气源热水器.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/厨房卫浴/热水器/51采暖炉.png') },
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '卫浴电器',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '其他生活家电',
          sub: [
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '手机',
          sub: [
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '数码',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '小帅影院',
          sub: []
        },
        {
          title: '电子教育',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '生活小家电',
          sub: [
            { image: require('@/assets/img/category/生活家电/生活小家电/53挂烫机.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/56电暖器.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/54吸尘器.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/55电风扇.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/57扫地机器人.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/58搅拌机.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/59生活电器烤箱.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/60环境电器.png') },
            { image: require('@/assets/img/category/生活家电/生活小家电/61灯具.png') },
          ]
        },
        {
          title: '厨房小家电',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '个人护理',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/个人护理/70KKC智能牙刷.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/个人护理/71健康称.png') },
            { image: require('@/assets/img/category/生活家电/个人护理/73智能睡眠.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '家居',
          sub: [
            { image: require('@/assets/img/category/生活家电/家居/74LED台灯.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/家居/75衣物护理柜.png') },
          ]
        },
        {
          title: '母婴家电',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/生活家电/家居/75衣物护理柜.png') },
          ]
        },
        {
          title: '智饮机',
          sub: [
            { image: require('@/assets/img/category/生活家电/智饮机/80台式.png') },
            { image: require('@/assets/img/category/生活家电/智饮机/81立式.png') },
            { image: require('@/assets/img/category/生活家电/智饮机/79厨下式.png') },
            { image: require('@/assets/img/category/生活家电/智饮机/82滤芯.png') },                { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') }
          ]
        },
        {
          title: '净水机',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
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
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
          ]
        },
        {
          title: '智慧家居',
          sub: [
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') },
            { image: require('@/assets/img/category/默认图.png') }
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
                // item.subCats
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
