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
      <block
        v-else-if="goods.activityType===6"
      >
        <button
          class="jShoppingCartItem-btn-primary mr12"
          type="button"
        >反向定制
        </button>
        <text class="jShoppingCartItem-head-text">活动到期日：{{goods.expTime}}</text>
        <view class="jShoppingCartItem-head-line"></view>
        <text class="jShoppingCartItem-head-text">预定金比例：16%</text>
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
            ¥{{goods.$PriceInfo && goods.$PriceInfo.commonPrice.invoicePrice}}
          </view>
          <view class="jShoppingCartItem-cnt-price-inf-item">
            小计：¥{{jshUtil.arithmetic(goods.$PriceInfo && goods.$PriceInfo.commonPrice.invoicePrice,goods.number,3)}}
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
      <!--v-if="goods.productList[0].specialPrice==='Y'"-->
      <view
        v-if="specificationsList.length"
        class="jShoppingCartItem-btm-version-picker"
        @tap="showSpecifications"
      >
        <text>版本规格</text>
        <i class="iconfont iconxia"></i>
      </view>
    </view>
    <j-version-specifications
      :show.sync="isShowSpecifications"
      :data="specificationsList"
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
                  ¥{{goods.$PriceInfo && goods.$PriceInfo.commonPrice.invoicePrice}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  供价：{{goods.$PriceInfo && goods.$PriceInfo.commonPrice.supplyPrice}}
                </view>
              </view>
              <view class="mt8 jVersionSpecifications-pop-head-cnt-item">
                <view class="jVersionSpecifications-pop-head-cnt-text">
                  台返 ：{{goods.$PriceInfo && goods.$PriceInfo.commonPrice.rebatePolicy | rebatePolicy}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  返利：{{goods.$PriceInfo && goods.$PriceInfo.commonPrice.rebateMoney}}
                </view>
                <view class="jVersionSpecifications-pop-head-cnt-text ml20">
                  直扣率：{{jshUtil.arithmetic(goods.$PriceInfo && goods.$PriceInfo.commonPrice.rebateRate,100)}}%
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

export default {
  name: 'JShoppingCartItem',
  components: {
    JVersionSpecifications,
    JSwitch,
    uniNumberBox
  },
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
      specificationsCheckList: []
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
  methods: {
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
      /* switch change */
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
      // 调货
      const transformVersionList = this.versionPrice.version.version[productCode];
      if (transformVersionList && transformVersionList.length) {
        const version = {
          title: '调货版本',
          isExpand: true,
          list: []
        };
        version.list = transformVersionList.map(v => ({
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
        this.unfollowGoods();
      } else {
        this.followGoods();
      }
    },
    async followGoods() {
      /* 添加关注 */
      const {
        customerCode
      } = this.userInf;
      const { code } = await this.productDetailService.productAddInter(customerCode, customerCode, this.goods.productList[0].productCode);
      if (code === '200') {
        this.goods.followState = true;
        this.$emit('change', this.goods, this.index);
      }
    },
    async unfollowGoods() {
      /* 取消关注 */
      const {
        customerCode
      } = this.userInf;
      const { code } = await this.productDetailService.productRemoveInter({
        account: customerCode,
        customerCode,
        productCodeList: [this.goods.productList[0].productCode]
      });
      if (code === '1') {
        this.goods.followState = false;
        this.$emit('change', this.goods, this.index);
      }
    },
    handleDel() {
      /* 移除购物车操作 */
      this.$emit('del', this.goods);
    }
  }
};
</script>
