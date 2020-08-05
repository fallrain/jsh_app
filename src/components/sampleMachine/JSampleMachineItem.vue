<template>
  <view class="jSampleMachineItem">
    <view
      class="jShoppingCartItem-cnt-check"
      @tap="choose"
    >
      <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
    </view>
    <view class="jSampleMachine-left">
      <image :src="goods.image.masterImage"></image>
    </view>
    <view class="jSampleMachine-cnt">
      <view class="jSampleMachine-cnt-goodsName j-goods-title">
        {{goods.productName | rmHtml}}
      </view>
      <view class="jSampleMachine-cnt-price-tips">
        <view class="jSampleMachine-cnt-price-tips-item">直扣：{{jshUtil.arithmetic(goods.$PtPrice.rebateRate,100)}}%</view>
        <view class="jSampleMachine-cnt-price-tips-item">返利：{{goods.$PtPrice.rebateMoney}}</view>
        <view class="jSampleMachine-cnt-price-tips-item">台返：{{goods.$PtPrice.rebatePolicy | rebatePolicy}}</view>
      </view>
      <view class="jSampleMachine-cnt-price-inf">
        <view class="jSampleMachine-cnt-price">¥ {{goods.$PtPrice.invoicePrice}}</view>
        <view class="jSampleMachine-cnt-price-inf-item">供价：¥{{goods.$PtPrice.supplyPrice}}</view>
        <view class="jSampleMachine-cnt-price-inf-item">库存：{{goods.$stock.stockTotalNum}}</view>
      </view>
      <view class="jSampleMachine-cnt-opts">
        <uni-number-box
          @change="goodsNumChange"
        ></uni-number-box>
        <button
          class="jSampleMachine-cnt-opts-primary ml26"
          type="button"
          @tap="checkSpecifications"
        >立即购买
        </button>
      </view>
      <view class="jSampleMachine-tags">
        <view
          class="jSampleMachine-tag-item"
          v-for="(item,index) in goods.tags"
          :key="index"
        >{{item}}
        </view>
      </view>
    </view>
    <view :class="['jSampleMachine-cnt-like iconfont',goods.checked ? 'iconicon3':'iconshoucang1']"></view>
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
import './css/JSampleMachineItem.scss';

export default {
  name: 'jSampleMachine',
  components: {
    uniNumberBox,
    MToast
  },
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
    }
  },
  data() {
    return {
      // 显示选择商品版本弹层
      isShowSpecifications: false,
      // 版本规格信息
      specificationsList: ['111'],
      // 版本规格选中的信息
      specificationsCheckList: []
    };
  },
  created() {
    this.genSpecificationsList();
  },
  methods: {
    choose() {
      /* 选中本商品 */
      const {
        checked
      } = this.goods;
      this.goods.checked = !checked;
      this.$emit('change', this.goods, this.index);
    },
    genSpecificationsList() {
      /* 组合版本规格信息 */
      const specificationsList = [];
      const {
        tj,
        gc,
        yjList
      } = this.allPrice;
        // 特价版本信息
      const tjList = tj.specialList;
      if (tjList && tjList.length) {
        const tjVersion = {
          title: '特价版本',
          isExpand: true,
          list: []
        };
        tjVersion.list = this.allPrice.tj.specialList.map(v => ({
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
      this.specificationsList = specificationsList;
    },
    specificationsConfirm(checkedList) {
      /* 选中版本确认 */
      this.specificationsCheckList = checkedList;
      // 检查选择的版本
      this.addToCartForEveryVersion();
    },
    specificationsCancel() {
      /* 选中版本取消 */
      this.specificationsCheckList = [];
    },
    checkSpecifications() {
      /* /!* 检查是否有版本规格的数据，没有直接加入购物车 *!/
      if (this.specificationsList.length) {
        // 有版本数据才显示选择版本的弹层
        this.isShowSpecifications = true;
      } else {
        // 添加到购物车
        this.addToCartForEveryVersion();
      } */
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
    }
  }
};
</script>
