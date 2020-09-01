<template>
  <view :class="['jGoodsItem',isEditMode && 'checked']">
    <view
      :class="['jGoodsItem-check iconfont', goods.isChecked ? 'iconradio active':'iconradio1']"
      @tap="handleCheck"
      v-if="isEditMode"
    >
    </view>
    <view
      :class="['jGoodsItem-cnt-like iconfont',goods.$favorite ? 'iconicon3':'iconshoucang1']"
      @tap="toggleFollow"
    ></view>
    <view
      @tap="goDetail"
      class="jGoodsItem-left"
    >
      <image :src="goods.image.masterImage"></image>
    </view>
    <view class="jGoodsItem-cnt">
      <view class="jGoodsItem-cnt-goodsName j-goods-title">
        {{goods.productName | rmHtml}}
      </view>
      <view class="jGoodsItem-cnt-price-tips">
        <view class="jGoodsItem-cnt-price-tips-item">
          直扣：{{jshUtil.arithmetic(goods.$PtPrice && goods.$PtPrice.rebateRate,100,3)}}%
        </view>
        <view class="jGoodsItem-cnt-price-tips-item">返利：{{goods.$PtPrice && goods.$PtPrice.rebatePolicy |
          rebatePolicy}}
        </view>
        <view class="jGoodsItem-cnt-price-tips-item">台返：{{goods.$PtPrice && goods.$PtPrice.rebateMoney}}
        </view>
      </view>
      <view class="jGoodsItem-cnt-price-inf">
        <view class="jGoodsItem-cnt-price">¥ {{goods.$PtPrice && goods.$PtPrice.invoicePrice | formatMoney}}</view>
        <view class="jGoodsItem-cnt-price-inf-item">供价：¥{{goods.$PtPrice && goods.$PtPrice.supplyPrice | formatMoney}}
        </view>
        <view class="jGoodsItem-cnt-price-inf-item">库存：{{goods.$stock && goods.$stock.stockTotalNum || 0}}</view>
      </view>
      <view class="jGoodsItem-cnt-opts">
        <uni-number-box
          @change="goodsNumChange"
        ></uni-number-box>
        <button
          class="jGoodsItem-cnt-opts-primary ml26"
          type="button"
          @tap="checkSpecifications"
        >加入购物车
        </button>
        <button
          @tap="goActivity"
          class="jGoodsItem-cnt-opts-default ml26"
          type="button"
          v-if="
            (goods.arbitrages && goods.arbitrages.length) ||
            (goods.composes && goods.composes.length) ||
            (goods.bigorders && goods.bigorders.length)
          "
        >参加活动
        </button>
      </view>
      <view class="jGoodsItem-tags">
        <view
          class="jGoodsItem-tag-item"
          v-for="(item,index) in tags"
          :key="index"
        >{{item}}
        </view>
      </view>
    </view>
    <j-version-specifications
      title="版本规格"
      :show.sync="isShowSpecifications"
      :versionData="specificationsList"
      cancelBtnText="重置"
      @confirm="specificationsConfirm"
      @cancel="specificationsCancel"
      @close="clearChoseSpecifications"
    >
    </j-version-specifications>
    <m-toast
      ref="toast"
      :isdistance="true"
    ></m-toast>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import MToast from '@/components/plugin/xuan-popup_2.2/components/xuan-popup/xuan-popup.vue';
import JVersionSpecifications from '../shoppingCart/JVersionSpecifications';
import './css/jGoodsItem.scss';
import followGoodsMixin from '@/mixins/goods/followGoods.mixin';

export default {
  name: 'JGoodsItem',
  components: {
    JVersionSpecifications,
    uniNumberBox,
    MToast
  },
  mixins: [
    followGoodsMixin
  ],
  props: {
    // 商品对象
    goods: {
      type: Object,
      default: () => {
      }
    },
    // 商品下标
    index: {
      type: Number,
    },
    // 售达方编码
    saletoCode: {
      type: String,
      default: ''
    },
    // 送达方编码
    sendtoCode: {
      type: String,
      default: ''
    },
    // 所有版本的价格
    allPrice: {
      type: Object,
      default: () => {
      }
    },
    // 是否编辑模式
    isEditMode: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      // 显示选择商品版本弹层
      isShowSpecifications: false,
      // 版本规格信息
      specificationsList: [],
      // 版本规格选中的信息
      specificationsCheckList: [],
      // 所有包含的标签
      tags: []
    };
  },
  created() {
    this.genSpecificationsList();
  },
  methods: {
    genSpecificationsList() {
      /* 组合版本规格信息 */
      const specificationsList = [];
      const {
        tj,
        gc,
        yjList,
        tags
      } = this.allPrice;
        // 特价版本信息
      const tjList = tj.specialList;
      if (tjList && tjList.length) {
        const tjVersion = {
          title: '特价版本',
          isExpand: true,
          list: []
        };
        tjVersion.list = tj.specialList.map(v => ({
          name: v.versionCode,
          price: v.invoicePrice,
          time: v.endDate,
          num: v.usableQty,
          priceType: v.priceType,
          checked: false
        }));
        specificationsList.push(tjVersion);
      }
      // 工程版本信息
      if (gc.projectList && gc.projectList.length) {
        const version = {
          title: '工程版本',
          isExpand: true,
          list: []
        };
        version.list = gc.projectList.map(v => ({
          name: v.versionCode,
          price: v.invoicePrice,
          time: v.endDate,
          num: v.usableQty,
          priceType: v.priceType,
          checked: false
        }));
        specificationsList.push(version);
      }
      // 样机版本信息
      if (yjList && yjList.length) {
        const version = {
          title: '样机版本',
          isExpand: true,
          list: []
        };
        version.list = yjList.map(v => ({
          name: v.versionCode,
          price: v.invoicePrice,
          time: v.endDate,
          num: v.usableQty,
          priceType: v.priceType,
          checked: false
        }));
        specificationsList.push(version);
      }
      this.specificationsList = specificationsList;
      // 组合tags
      const tagsTemp = [
        ...this.goods.tags,
        ...tags
      ];
      // isSale为false时代表此商品有活动且不可版本外销售
      // 如果产品isSale为false，即使存在特价标签也不展示
      if (this.isSale === false) {
        const index = tags.findIndex(v => v === '特价');
        if (index > -1) {
          tags.splice(index, 1);
        }
      }
      this.tags = tagsTemp;
    },
    specificationsConfirm(checkedList) {
      /* 选中版本确认 */
      this.specificationsCheckList = checkedList;
      // 检查选择的版本
      this.addToCartForEveryVersion();
    },
    specificationsCancel() {
      /* 选中版本重置 */
      this.specificationsCheckList = [];
      this.clearChoseSpecifications();
    },
    clearChoseSpecifications() {
      /* 清除版本选中 */
      this.specificationsList.forEach((version) => {
        version.list.forEach((v) => {
          v.checked = false;
        });
      });
    },
    checkSpecifications() {
      /* 检查是否有版本规格的数据，没有直接加入购物车 */
      if (this.specificationsList.length) {
        // 有版本数据才显示选择版本的弹层
        this.isShowSpecifications = true;
      } else {
        // 添加到购物车
        this.addToCartForEveryVersion();
      }
    },
    genProductSpecificationsList() {
      /* 组合选择的各个规格的产品 */
      const {
        productCode,
        number
      } = this.goods;
      return this.specificationsCheckList.map(v => ({
        priceType: v.priceType,
        priceVersion: v.name,
        productCode,
        number,
      }));
    },
    addToCartForEveryVersion() {
      /* 每个选择的版本都分别加入购物车 */
      // todo 此接口存在风险，调用次数过于多
      const productSpecificationsList = this.genProductSpecificationsList();
      if (productSpecificationsList.length) {
        // 每个产品的版本都调用加购物车接口
        const addToCartPromise = productSpecificationsList.map(product => this.addToCart(product));
        Promise.all(addToCartPromise).then((res) => {
          const invalid = res.find(v => v.code !== '1');
          // 全部加入成功则提示成功
          if (!invalid) {
            this.showAddToCartToast();
          }
        });
      } else {
        // 如果没选版本规格，则加入一个普通版本的商品
        this.addToCart().then(({ code }) => {
          if (code === '1') {
            this.showAddToCartToast();
          }
        });
      }
    },
    showAddToCartToast() {
      /* 展示添加到购物车提示 */
      this.$refs.toast.open({
        type: 'success',
        content: '加入购物车成功',
        timeout: 2000,
      });
    },
    addToCart(product) {
      /**
         ***添加到购物车
         *  product:Object
         *  是否有信用模式(0否1是)
         *  creditModel? : number,
         *  产品购买的数量
         *  number,
         *  价格类型
         *  priceType: string,
         *  价格版本号
         *  priceVersion: string,
         *  产品编码
         *  productCode,
         *  调货版本号
         *  stockVersion?: string,
         *  是否有周承诺(0否1是)
         *  weekPromise?: number
         *  */
      const {
        productCode,
        activityType,
        activityId,
        priceType,
        number
      } = this.goods;
      const {
        saletoCode,
        sendtoCode
      } = this;
        // product不传则默认普通类型
      if (!product) {
        product = {
          priceType: 'PT',
          priceVersion: '',
          productCode,
          number,
        };
      }
      return this.cartService.addToCart({
        // 商品组合编码
        activityId,
        // 组合类型(1单品2组合3抢购4套餐5成套)
        activityType: activityType || 1,
        // 购买的数量(组合就是组合的数量)
        number,
        //  促销活动价格类型
        //  PT:普通价格,TJ:特价,GC:工程,YJCY:样机出样(折扣样机),MFJK:免费机壳,MFYJ:免费样机,MFYJJS:免费样机结算,YPJ:样品机,CTYJ:成套样机
        priceType,
        // 价格版本号
        priceVersion: '',
        // 产品编码
        productCode,
        productList: [product],
        // 售达方编码
        saletoCode,
        // 送达方编码
        sendtoCode,
        // 版本调货版本号
        transferVersionCode: '',
        // 促销活动版本号
        versionCode: '',
      });
    },
    goodsNumChange(val) {
      /* 商品数量change */
      this.goods.number = val;
      this.$emit('change', this.goods, this.index);
    },
    handleCheck() {
      /* 选中一个商品 */
      const isChecked = !this.goods.isChecked;
      this.$set(this.goods, 'isChecked', isChecked);
      this.$emit('change', this.goods, this.index);
      this.$emit('check', isChecked, this.goods.productCode, this.goods);
    },
    goDetail() {
      /* 跳转产品详情 */
      const queryStr = this.jshUtil.genQueryStringByObj({
        productCode: this.goods.productCode
      });
      uni.navigateTo({
        url: `/pages/productDetail/productDetail${queryStr}`
      });
    },
    goActivity() {
      /* 去参加活动 */
      const queryStr = this.jshUtil.genQueryStringByObj({
        productCode: this.goods.productCode
      });
      uni.navigateTo({
        url: `/pages/market/marketList${queryStr}`
      });
    },
    toggleFollow() {
      /* 切换关注状态 */
      if (this.goods.$favorite) {
        this.unFollowGoods();
      } else {
        this.followGoods();
      }
    },
    async followGoods() {
      /* 添加关注 */
      const {
        saletoCode: customerCode
      } = this;
      await this.$mFollowGoods({
        customerCode,
        productCode: this.goods.productCode
      });
      this.goods.$favorite = true;
      this.$emit('change', this.goods, this.index);
    },
    async unFollowGoods() {
      /* 取消关注 */
      const {
        saletoCode: customerCode
      } = this;
      await this.$mUnFollowGoods({
        customerCode,
        productCodeList: [this.goods.productCode]
      });
      this.goods.$favorite = false;
      this.$emit('change', this.goods, this.index);
    },
  }
};
</script>
