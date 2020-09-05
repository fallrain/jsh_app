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
          <view class="jProductItem-cnt-price-tips-item">台返：{{toFixedNum(goods.priceDto.rebateMoney)}}</view>
        </view>
        <view v-if="goods.valid === false" class="jProductItem-cnt-price-inf">
          <view class="jProductItem-cnt-price"
                style="color: #999;">{{goods.reason}}</view>
        </view>
        <view v-else>
          <view v-if="!specialPrice" class="jProductItem-cnt-price-inf">
            <view class="jProductItem-cnt-price">¥ {{toFixedNum(goods.priceDto.invoicePrice)}}</view>
            <view v-if="goods.promotionNum" class="fs20 text-666 mr12">数量：{{goods.promotionNum}}</view>
            <view v-else class="fs20 text-666 mr12">供价：¥{{toFixedNum(goods.priceDto.supplyPrice)}}</view>
            <view class="fs20 text-666 mr12">库存：{{goods.stockTotalNum}}</view>
          </view>
          <!--特价产品-->
          <view v-if="specialPrice"
                class="jProductItem-cnt-price-inf">
            <view class="jProductItem-cnt-price">¥ {{goods.choseOtherVersions[0].invoicePrice}}</view>
            <view v-if="goods.promotionNum" class="fs20 text-666 mr12">数量：{{goods.promotionNum}}</view>
            <view v-else class="fs20 text-666 mr12">供价：¥{{computedPrice(goods.priceDto.supplyPrice)}}</view>
            <view class="fs20 text-666 mr12">库存：{{goods.stockTotalNum}}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="groupType === 'taocan'" class="jProductItem-btm">
      <view class="dis-flex">
        <view
          v-if="isShowSpecificationsBtn"
          class="jProductItem-btm-version-picker"
          @tap="showSpecifications"
        >
          <text>版本规格</text>
          <i class="iconfont iconxia"></i>
        </view>
        <view v-if="goods.valid !== false" class="dis-flex ml-auto">
          <view class="fs20 text-999">共计：</view>
          <view v-if="!specialPrice" class="jProductItem-cnt-price">
            ¥ {{computedPrice(goods.priceDto.invoicePrice, goods.choosedNum)}}
          </view>
          <view v-if="specialPrice" class="jProductItem-cnt-price">
            ¥ {{computedPrice(goods.choseOtherVersions[0].invoicePrice, goods.choosedNum)}}
          </view>
          <uni-number-box
            :min="0"
            :max="100000"
            v-model="goods.choosedNum"
            @change="change"
          ></uni-number-box>
        </view>
      </view>
      <view class="">
        <view
          class="jProductItem-btm-inf-wrap"
          v-if="goods.choseOtherVersions&&goods.choseOtherVersions.length>0"
        >
          <view
            @tap="handleDelVersion()"
            class="jProductItem-btm-inf-close iconfont iconcross"
          ></view>
          <view class="jProductItem-btm-inf-icon">
            <view class="iconfont iconi"></view>
          </view>
          <view>{{goods.choseOtherVersions[0].priceTypeStr}}版本{{goods.choseOtherVersions[0].versionCode}}</view>
        </view>
      </view>
    </view>
    <view v-if="groupType === 'zuhe'" class="jProductItem-btm">
      <view class="dis-flex">
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
        <view
          v-if="isShowSpecificationsBtn"
          class="jProductItem-btm-version-picker ml-auto"
          @tap="showSpecifications"
        >
          <text>版本规格</text>
          <i class="iconfont iconxia"></i>
        </view>
      </view>
      <view class="">
        <view
          class="jProductItem-btm-inf-wrap"
          v-if="goods.choseOtherVersions&&goods.choseOtherVersions.length>0"
        >
          <view
            @tap="handleDelVersion()"
            class="jProductItem-btm-inf-close iconfont iconcross"
          ></view>
          <view class="jProductItem-btm-inf-icon">
            <view class="iconfont iconi"></view>
          </view>
          <view>{{goods.choseOtherVersions[0].priceTypeStr}}版本{{goods.choseOtherVersions[0].versionCode}}</view>
        </view>
      </view>
    </view>
    <j-version-specifications
      :show.sync="isShowSpecifications"
      :versionData="specificationsList"
      type="custom"
      @change="changeVersion"
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
  created() {
    console.log(this.goods);
    this.genSpecificationsList();
  },
  data() {
    return {
      specialPrice: false,
      updateIndex: 0,
      // 是否显示 版本规格
      isShowSpecifications: false,
      specificationsList: [],
      specificationsCheckList: []
    };
  },
  watch: {
    goods() {
      debugger;
      if (this.goods.choseOtherVersions && this.goods.choseOtherVersions.length > 0) {
        this.specialPrice = true;
      } else {
        this.specialPrice = false;
      }
      // this.genSpecificationsList();
      // this.specificationsList = this.goods.tjPrice.specialList;
    }
  },
  computed: {
    isShowSpecificationsBtn() {
      /* 是否显示【版本规格】按钮 */
      return this.goods.specialPrice === 'Y';
    },
    formateNum() {
      return val => (Number(val) * 100).toFixed(2);
    },
    computedPrice() {
      return (price, num) => Number(price * num).toFixed(2);
    },
    toFixedNum() {
      return function (val) {
        return (Number(val)).toFixed(2);
      };
    }
  },
  methods: {
    // 删除版本
    handleDelVersion() {
      this.specialPrice = false;
      this.goods.choseOtherVersions = [];
      this.$emit('change', this.goods, this.index);
    },
    genSpecificationsList() {
      /* 组合版本规格信息 */
      this.specificationsList = [];
      let specificationsList = [];
      // if (this.goods.specialPrice === 'Y') {
      if (this.goods.tjPrice) {
        if (this.goods.tjPrice && this.goods.tjPrice.specialList) {
          // 版本规格为特价
          specificationsList = this.goods.tjPrice.specialList;
        }
      }
      specificationsList = JSON.parse(JSON.stringify(specificationsList));
      specificationsList.forEach((item) => {
        item.checked = false;
      });
      this.specificationsList = specificationsList;
      console.log(this.specificationsList);
    },
    change(val) {
      debugger;
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
    changeVersion(versionData) {
      this.specificationsList = versionData;
    },
    specificationsConfirm(checkedList) {
      if (checkedList.length === 0) {
        this.specialPrice = false;
      } else {
        this.specialPrice = true;
      }
      /* 选中版本确认 */
      this.specificationsCheckList = checkedList;
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
