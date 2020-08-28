<template>
  <view class="jShoppingCartItem">
    <view class="jShoppingCartItem-head">
      <!--组合类型(1单品2组合3抢购4套餐5成套)-->
      <block
        v-if="goods.activityType===3"
      >
        <button
          class="jShoppingCartItem-btn-primary mr12"
          type="button"
        >抢购
        </button>
        <text class="jShoppingCartItem-head-text">活动到期日：{{goods.expTime}}</text>
        <view class="jShoppingCartItem-head-line"></view>
        <text class="jShoppingCartItem-head-text">活动数量：{{goods.canBuy}}</text>
      </block>
      <!--普通购物车5代表反向定制，属于抢购=。=-->
      <block
        v-else-if="goods.activityType===5"
      >
        <button
          class="jShoppingCartItem-btn-primary mr12"
          type="button"
        >反向定制
        </button>
        <text class="jShoppingCartItem-head-text">活动到期日：{{goods.expTime}}</text>
        <view class="jShoppingCartItem-head-line"></view>
        <text class="jShoppingCartItem-head-text">预定金比例：{{goods.intentionMoney}}%</text>
        <view class="jShoppingCartItem-head-line"></view>
        <text class="jShoppingCartItem-head-text">直发订单</text>
      </block>
      <view
        @tap="handleDel"
        class="jShoppingCartItem-head-close iconfont iconcross"
      ></view>
    </view>
    <view class="jShoppingCartItem-cnt">
      <view
        class="jShoppingCartItem-cnt-check"
        @tap="choose"
      >
        <i :class="['iconfont', goods.checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <view class="jShoppingCartItem-cnt-img-wrap">
        <image :src="goods.productList && goods.productList[0].productImageUrl"></image>
      </view>
      <view class="jShoppingCartItem-cnt-inf">
        <view class="jShoppingCartItem-cnt-inf-title">{{goods.productList && goods.productList[0].productName}}</view>
        <view class="jShoppingCartItem-cnt-price-inf">
          <view class="jShoppingCartItem-cnt-price">
            ¥{{chosePrice.invoicePrice}}
          </view>
          <view class="jShoppingCartItem-cnt-price-inf-item">
            小计：¥{{totalChosePrice}}
          </view>
          <uni-number-box
            @change="goodsNumChange"
          ></uni-number-box>
        </view>
      </view>
      <view
        :class="['jShoppingCartItem-cnt-like iconfont',goods.followState ? 'iconicon3':'iconshoucang1']"
        @tap="toggleFollow"
      ></view>
    </view>
    <view class="jShoppingCartItem-btm">
      <view class="jShoppingCartItem-btm-options-wrap">
        <view class="jShoppingCartItem-btm-tags mr34">
          <view
            class="jShoppingCartItem-btm-tag"
            v-if="goods.productList[0].swrhFlag==='Y'"
          >统
          </view>
          <view
            class="jShoppingCartItem-btm-tag"
            v-if="goods.productList[0].signStatus==='Y'"
          >云
          </view>
          <view
            class="jShoppingCartItem-btm-tag"
            v-if="goods.productList[0].ydzfFlag==='Y'"
          >异
          </view>
        </view>
        <view class="jShoppingCartItem-btm-text">库存：{{goods.productList[0].productStock}}</view>
        <view
          class="jShoppingCartItem-btm-switch-wrap"
          v-if="goods.productList[0].creditModel==='1' && !warehouseFlag"
        >
          <j-switch
            :active.sync="goods.isCreditMode"
            :beforeChange="handleBeforeCreditModeChange"
            @change="isCreditModeChange"
          >
          </j-switch>
          <text class="jShoppingCartItem-btm-switch-text mr32 ml8">信用模式</text>
        </view>
        <view
          class="jShoppingCartItem-btm-switch-wrap"
          v-if="isDirect || hasGCVersion"
        >
          <j-switch
            :active.sync="goods.isDirectMode"
            @change="isDirectModeChange"
          >
          </j-switch>
          <text class="jShoppingCartItem-btm-switch-text mr32 ml8">直发</text>
        </view>
        <!--v-if="goods.productList[0].specialPrice==='Y'"-->
        <view
          @tap="showSpecifications"
          class="jShoppingCartItem-btm-version-picker"
          v-if="specificationsList.length"
        >
          <text>版本规格</text>
          <i class="iconfont iconxia"></i>
        </view>
      </view>
      <view
        class="jShoppingCartItem-btm-inf-wrap"
        v-if="choseVersionInf"
      >
        <view class="jShoppingCartItem-btm-inf-icon">
          <view class="iconfont iconi"></view>
        </view>
        <view>{{choseVersionInf}}</view>
      </view>
    </view>
    <j-version-specifications
      :show.sync="isShowSpecifications"
      :versionData="specificationsList"
      type="radio"
      @cancel="specificationsCancel"
      @confirm="specificationsConfirm"
    >
      <template #head>
        <view class="jVersionSpecifications-pop-head-wrap">
          <view class="jVersionSpecifications-pop-head">
            <view class="jVersionSpecifications-pop-head-left">
              <image :src="goods.productList[0].productImageUrl"></image>
            </view>
            <view class="jVersionSpecifications-pop-head-cnt">
              <view class="jVersionSpecifications-pop-head-cnt-title">{{goods.productList[0].productName}}</view>
              <view class="mt16 jVersionSpecifications-pop-head-cnt-item">
                <view class="jVersionSpecifications-pop-head-cnt-text">建议零售价：</view>
                <view class="jVersionSpecifications-pop-head-cnt-price">
                  ¥{{chosePrice.invoicePrice}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  供价：{{chosePrice.supplyPrice}}
                </view>
              </view>
              <view class="mt8 jVersionSpecifications-pop-head-cnt-item">
                <view class="jVersionSpecifications-pop-head-cnt-text">
                  台返 ：{{chosePrice.rebateMoney | rebatePolicy}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  返利：{{chosePrice.rebatePolicy}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  直扣率：{{chosePrice.rebatePolicy}}%
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </j-version-specifications>
  </view>
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import JSwitch from '../form/JSwitch';
import JVersionSpecifications from './JVersionSpecifications';
import './css/JShoppingCartItem.scss';
import followGoodsMixin from '@/mixins/goods/followGoods.mixin';

export default {
  name: 'JShoppingCartItem',
  components: {
    JVersionSpecifications,
    JSwitch,
    uniNumberBox
  },
  mixins: [
    followGoodsMixin
  ],
  props: {
    // 商品数据
    goods: {
      type: Object,
      default: () => {
      }
    },
    // 商品索引
    index: {
      type: [String, Number]
    },
    // 所有版本的价格
    allPrice: {
      type: Object,
      default: () => {
      }
    },
    // 仓库标志，云仓，异地云仓皆有值
    warehouseFlag: {},
    // 版本价格
    versionPrice: {
      type: Object
    },
    // 开启信用模式校验
    beforeCreditModeChange: {
      type: Function
    },
    // 用户信息
    userInf: {
      type: Object
    }
  },
  data() {
    return {
      // 是否显示版本规格
      isShowSpecifications: false,
      // 版本信息
      specificationsList: [],
      // 选择的版本
      specificationsCheckList: [],
      // 是否选择了工程版本
      hasGCVersion: false,
    };
  },
  created() {
    this.genSpecificationsList();
  },
  watch: {
    versionPrice() {
      this.genSpecificationsList();
      this.setFollowState();
    }
  },
  computed: {
    isDirect() {
      /* 直发 */
      const product = this.getProduct();
      if (!product) {
        return false;
      }
      // 符合显示直发的产品组
      const directProducts = ['BA', 'BB', 'BD'];
      const {
        productGroup
      } = product;
      const inProductGroup = directProducts.find(v => v === productGroup);
      return inProductGroup;
    },
    choseVersionInf() {
      /* 选择的版本信息 */
      // priceType
      const product = this.getProduct();
      if (!product) {
        return '';
      }
      const {
        priceType,
        productCode,
        // 价格版本，根据这个去版本价里轮询匹配
        priceVersion
      } = product;
        // 普通版本不显示
        // 接口大写小写都可能返回
      const priceTypeUpper = this.getPriceType(priceType);
      if (priceType === 'PT') {
        return '';
      }
      let str = '';
      // 取版本价格
      if (JSON.stringify(this.versionPrice) !== '{}') {
        // 获取当前产品的所有版本价格信息
        const curAllVersion = this.versionPrice.activity[productCode];
        if (curAllVersion) {
          const curVersion = curAllVersion[priceTypeUpper].find(v => v.versionCode === priceVersion);
          const {
            // 版本名
            priceTypeName,
            // 版本编号
            versionCode,
            // 版本发票价
            invoicePrice,
            // 版本可用数量
            usableQty
          } = curVersion;
          str = `${priceTypeName}版本：${versionCode} ￥${invoicePrice} 数量：${usableQty}`;
        }
      }
      return str;
    },
    chosePrice() {
      /* 选择的版本信息 */
      const product = this.getProduct();
      if (!product) {
        return {};
      }
      const {
        priceType,
        productCode,
        // 价格版本，根据这个去版本价里轮询匹配
        priceVersion
      } = product;
      let price = {};
      // 普通版本
      // 接口大写小写都可能返回
      const priceTypeUpper = this.getPriceType(priceType);
      if (priceTypeUpper === 'PT') {
        // 格式化不（普通价格接口未做两位小数处理）
        product.priceInfo.commonPrice.invoicePrice = this.jshUtil.formatNumber(product.priceInfo.commonPrice.invoicePrice, 2);
        price = product.priceInfo.commonPrice;
      } else {
        // 取版本价格
        if (JSON.stringify(this.versionPrice) !== '{}') {
          // 获取当前产品的所有版本价格信息
          const curAllVersion = this.versionPrice.activity[productCode];
          if (curAllVersion) {
            // 查找匹配的大版本（工程 特价 样机。。）的匹配的版本
            const curVersion = curAllVersion[priceTypeUpper].find(v => v.versionCode === priceVersion);
            price = curVersion;
          }
        }
      }
      return price;
    },
    totalChosePrice() {
      /* 本产品的总价格 */
      let total = 0;
      if (this.chosePrice && this.chosePrice.invoicePrice) {
        total = this.jshUtil.arithmetic(this.chosePrice.invoicePrice, this.goods.number, 3);
      }
      return this.jshUtil.formatNumber(total, 2);
    }
  },
  methods: {
    getProduct() {
      /* 获取产品 */
      return this.goods.productList && this.goods.productList[0];
    },
    getPriceType(type) {
      /* 获取价格类型 */
      const typeTemp = type.toUpperCase();
      return {
        PT: 'PT',
        GC: 'GC',
        YJCT: 'YJCT',
        YJCY: 'YJCY',
        MFJK: 'YJCY',
        MFYJ: 'YJCY',
      }[typeTemp];
    },
    choose() {
      /* 选中本商品 */
      const {
        checked
      } = this.goods;
      this.goods.checked = !checked;
      this.$emit('change', this.goods, this.index);
    },
    handleBeforeCreditModeChange() {
      /* 检查是否支持开启信用模式 */
      // 已经开启不用检查
      if (this.goods.isCreditMode) {
        return true;
      }
      const {
        productGroup,
        priceInfo
      } = this.goods.productList[0];
      const {
        number
      } = this.goods;
        // 计算选择的商品的总价，信用额度做比较，超出则不允许开启
      const totalPrice = this.jshUtil.arithmetic(priceInfo.commonPrice.invoicePrice, number, 3);
      return this.beforeCreditModeChange && this.beforeCreditModeChange(productGroup, totalPrice);
    },
    isCreditModeChange() {
      /* 信用模式switch change */
      this.$emit('change', this.goods, this.index);
    },
    isDirectModeChange() {
      /* 直发模式switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    },
    getVersionPriceState() {
      /* versionPrice是否有值 */
      return !(!this.versionPrice || JSON.stringify(this.versionPrice) === '{}');
    },
    genSpecificationsList() {
      /* 组合版本规格信息 */
      this.specificationsList = [];
      if (!this.getVersionPriceState()) {
        return;
      }
      const specificationsList = [];
      const productCode = this.goods.productList[0].productCode;
      const {
        TJ: tj,
        GC: gc,
        YJCY: yjList
      } = this.versionPrice.activity[productCode];
        // 特价版本信息
      const tjList = tj;
      if (tjList && tjList.length) {
        const tjVersion = {
          title: '特价版本',
          isExpand: true,
          list: []
        };
        tjVersion.list = tjList.map(v => ({
          ...v,
          priceVersion: v.versionCode,
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
      if (gc && gc.length) {
        const version = {
          title: '工程版本',
          isExpand: true,
          list: []
        };
        version.list = gc.map(v => ({
          ...v,
          priceVersion: v.versionCode,
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
          ...v,
          priceVersion: v.versionCode,
          name: v.versionCode,
          price: v.invoicePrice,
          time: v.endDate,
          num: v.usableQty,
          priceType: v.priceType,
          checked: false
        }));
        specificationsList.push(version);
      }
      // 调货
      const transformVersionList = this.versionPrice.version.version[productCode];
      if (transformVersionList && transformVersionList.length) {
        const version = {
          title: '调货版本',
          isExpand: true,
          list: []
        };
        version.list = transformVersionList.map(v => ({
          ...v,
          priceVersion: v.versionCode,
          name: v.versionCode,
          price: v.price,
          num: v.number,
          checked: false
        }));
        specificationsList.push(version);
      }
      this.specificationsList = specificationsList;
    },
    specificationsConfirm(checkedList) {
      /* 选中版本确认 */
      this.specificationsCheckList = checkedList;
      // 如果选中了工程版本，则会显示【直发】switch
      this.hasGCVersion = !!checkedList.find(v => v.priceType === 'GC');
      this.goods.choseOtherVersions = checkedList;
    },
    specificationsCancel() {
      /* 选中版本取消 */
      this.isShowSpecifications = false;
    },
    goodsNumChange(val) {
      /* 商品数量change */
      this.goods.number = val;
      this.goods.productList[0].number = val;
      this.$emit('change', this.goods, this.index);
    },
    setFollowState() {
      /* 设置关注状态 */
      if (!this.getVersionPriceState()) {
        return;
      }
      const state = !!this.versionPrice.product.find(v => v === this.goods.productList[0].productCode);
      this.goods.followState = state;
      this.$emit('change', this.goods, this.index);
    },
    toggleFollow() {
      /* 切换关注状态 */
      if (this.goods.followState) {
        this.unFollowGoods();
      } else {
        this.followGoods();
      }
    },
    async followGoods() {
      /* 添加关注 */
      const {
        customerCode
      } = this.userInf;
      await this.$mFollowGoods({
        customerCode,
        productCode: this.goods.productList[0].productCode
      });
      this.goods.followState = true;
      this.$emit('change', this.goods, this.index);
    },
    async unFollowGoods() {
      /* 取消关注 */
      const {
        customerCode
      } = this.userInf;
      await this.$mUnFollowGoods({
        customerCode,
        productCodeList: [this.goods.productList[0].productCode]
      });
      this.goods.followState = false;
      this.$emit('change', this.goods, this.index);
    },
    handleDel() {
      /* 移除购物车操作 */
      this.$emit('del', this.goods);
    }
  }
};
</script>
