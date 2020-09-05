<template>
  <view class="jProductItem">
    <view v-if="groupType === 'taocan'" class="jProductItem-head">
      <view
        v-if="goods.productFlag === 'f'"
        class="jProductItem-tag bg-theme"
      >主产品
      </view>
      <view
        v-if="goods.productFlag === 's'"
        class="jProductItem-tag bg-primary"
      >配比产品
      </view>
      <view
        v-if="goods.valid === false"
        class="jProductItem-tag bg-999"
      >失效产品
      </view>
      <view class="jProductItem-btm-tags mt8">
        <view v-if="goods.ydyc" class="jProductItem-btm-tag">异</view>
        <view v-if="goods.ptyc" class="jProductItem-btm-tag">云</view>
        <view v-if="goods.tctp" class="jProductItem-btm-tag">统</view>
      </view>
    </view>
    <view class="jProductItem-cnt">
      <view class="jProductItem-cnt-img-wrap">
        <image :src="goods.imageUrl"></image>
      </view>
      <view class="jProductItem-cnt-inf">
        <view class="jProductItem-cnt-inf-title">{{goods.productName}}</view>
        <view class="dis-flex mb12">
          <view class="jProductItem-cnt-price-tips-item">直扣{{formateNum(goods.priceDto.rebateRate)}}%</view>
          <view class="jProductItem-cnt-price-tips-item">返利：{{goods.priceDto.rebatePolicyStr}}</view>
          <view class="jProductItem-cnt-price-tips-item">台返：{{formateNum(goods.priceDto.rebateMoney)}}</view>
        </view>
        <view v-if="goods.valid === false" class="jProductItem-cnt-price-inf">
          <view class="jProductItem-cnt-price"
                style="color: #999;">{{goods.reason}}</view>
        </view>
        <view v-else class="jProductItem-cnt-price-inf">
          <view class="jProductItem-cnt-price">¥ {{goods.priceDto.invoicePrice}}</view>
          <view v-if="goods.promotionNum" class="fs20 text-666 mr12">数量：¥{{goods.promotionNum}}</view>
          <view v-else class="fs20 text-666 mr12">供价：¥{{goods.priceDto.invoicePrice}}</view>
          <view class="fs20 text-666 mr12">库存：{{goods.stockTotalNum}}</view>
        </view>
      </view>
    </view>
    <view v-if="groupType === 'taocan'" class="jProductItem-btm">
      <view
        v-if="isShowSpecificationsBtn"
        class="jProductItem-btm-version-picker"
        @tap="showSpecifications"
      >
        <text>版本规格</text>
        <i class="iconfont iconxia"></i>
      </view>
      <view v-if="goods.valid !== false" class="dis-flex ">
        <view class="fs20 text-999">共计：</view>
        <view class="jProductItem-cnt-price">
          ¥ {{computedPrice(goods.priceDto.invoicePrice, goods.choosedNum)}}
        </view>
        <uni-number-box
          :min="0"
          v-model="goods.choosedNum"
          @change="change"
        ></uni-number-box>
      </view>
    </view>
    <view v-if="groupType === 'zuhe'" class="jProductItem-btm">
      <view class="dis-flex">
        <view class="jProductItem-btm-tags mr34">
          <view v-if="goods.ydyc" class="jProductItem-btm-tag">异</view>
          <view v-if="goods.ptyc" class="jProductItem-btm-tag">云</view>
          <view v-if="goods.tctp" class="jProductItem-btm-tag">统</view>
        </view>
        <!--<view class="fs20 text-666 mr12">库存：456</view>-->
      </view>
      <view class="">
        <j-switch
          :active.sync="goods.isSend"
          inf="直发"
          @change="isCreditModeChange"
        ></j-switch>
      </view>
    </view>
    <j-version-specifications
      :show.sync="isShowSpecifications"
      :versionData="specificationsList"
      :customCheckFun="specificationsCustomCheckFun"
      type="custom"
      @confirm="specificationsConfirm"
      @cancel="specificationsCancel"
    >
    </j-version-specifications>
  </view>
</template>

<script>
import JSwitch from '../form/JSwitch';
import JVersionSpecifications from './JVersionSpecifications';
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/JProductItem.scss';

export default {
  name: 'jProductItem',
  components: {
    uniNumberBox,
    JVersionSpecifications,
    JSwitch
  },
  props: {
    goods: {
      type: Object
    },
    index: {
      type: [String, Number]
    },
    groupType: {
      type: [String, Number]
    }
  },
  data() {
    return {
      // 是否显示 版本规格
      isShowSpecifications: false,
    };
  },
  watch: {
  },
  created() {
    console.log(this.goods);
  },
  computed: {
    isShowSpecificationsBtn() {
      /* 是否显示【版本规格】按钮 */
      return !!(this.goods.tjPrice.length);
    },
    formateNum() {
      return val => val;
    },
    computedPrice() {
      return (price, num) => Number((price * num).toFixed(2));
    }
  },
  methods: {
    change(val) {
      this.goods.choosedNum = val;
      this.isCreditModeChange();
    },
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.goods, this.index);
    },
    showSpecifications() {
      /* 显示版本规格 */
      this.isShowSpecifications = true;
    },
    specificationsConfirm(checkedList) {
      /* 选中版本确认 */
      this.specificationsCheckList = checkedList;
      // 搜索调货版本
      const transfer = checkedList.find(v => !v.priceType);
      // 选了调货版本，则数量为调货的最大数量
      // todo 还有库存的判断
      if (transfer) {
        this.goods.number = transfer.num;
        this.goods.productList[0].number = transfer.num;
      }
      this.goods.choseOtherVersions = checkedList;
      this.$emit('change', this.goods, this.index);
    },
    specificationsCancel() {
      /* 选中版本取消 */
      this.isShowSpecifications = false;
    },
  }
};
</script>
