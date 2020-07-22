<template>
  <view class="marketDetail">
    <view class="marketDetail-order-infor mb24">
      <view
        class="marketDetail-ads-detail br-b-grey"
        @tap="showAdsPicker"
      >
        <view class="iconfont iconlocal"></view>
        <text>配送至：青岛市李沧区重庆中路792青岛市李沧区重庆中路792青岛市李沧区重庆中路792</text>
        <view class="iconfont iconyou right-style"></view>
      </view>
      <view class="marketDetail-orders br-b-grey">
        <view>
          <view><span class="text-theme fs36">7</span>件</view>
          <view>已选主产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">7</span>件</view>
          <view>已选配比产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">7</span>件</view>
          <view>还需主产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">7</span>件</view>
          <view>还需配比产品</view>
        </view>
      </view>
      <view class="marketDetail-requirement fs20">
        <view class="dis-flex mb24">
          <view class="w230 text-999">主产品起订金额限定</view>
          <view class="w200 text-333">0.00 / ¥1000.00</view>
          <view class="w230 text-999">主产品起订数量限定</view>
          <view class="text-333">7件</view>
        </view>
        <view class="dis-flex">
          <view class="w230 text-999">配比产品起订金额限定</view>
          <view class="w200 text-333">0.00 / ¥1000.00</view>
          <view class="w230 text-999">配比产品起订数量限定</view>
          <view class="text-333">7件</view>
        </view>
      </view>
    </view>
    <view class="marketDetail-list">
      <j-product-item
        :groupType="groupType"
        v-for="(goods,index) in activityList"
        :key="index"
        :goods="goods"
        :index="index"
        @change="goodsChange"
      ></j-product-item>
    </view>
    <j-product-btm
    ></j-product-btm>
    <j-address-picker
      :show.sync="isShowAdsPicker"
    ></j-address-picker>
  </view>
</template>
<script>
import JProductItem from '../../components/market/JProductItem';
import JProductBtm from '../../components/market/JProductBtm';
import JAddressPicker from '../../components/shoppingCart/JAddressPicker';
import './css/marketDetail.scss';


export default {
  name: 'marketDetail',
  components: {
    JAddressPicker,
    JProductItem,
    JProductBtm
  },
  data() {
    return {
      // 0 套餐 1 组合
      groupType: 0,
      // activityList type 0:主产品 1：配比产品 2：失效产品
      activityList: [
        {
          type: 0,
          isCreditMode: false
        },
        {
          type: 1,
          checked: true,
          isCreditMode: false
        },
        {
          type: 2,
          checked: false,
          isCreditMode: false
        },
        {
          type: 3,
          checked: false,
          isCreditMode: false
        }
      ],
      failureGoodsList: [
        {
          checked: false,
        },
        {
          checked: false,
        },
        {
          checked: false,
        }
      ],
      // 是否全选
      isCheckAll: false,
      // 是否显示配送地址选择
      isShowAdsPicker: false
    };
  },
  methods: {
    goodsChange(goods, index) {
      this.shoppingList[index] = goods;
      this.shoppingList = JSON.parse(JSON.stringify(this.shoppingList));
    },
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.shoppingList.forEach((v) => {
        v.checked = checked;
      });
    },
    failureGoodsListChange(list) {
      this.failureGoodsList = list;
    },
    showAdsPicker() {
      /* 地址选择展示 */
      this.isShowAdsPicker = true;
    }
  }
};
</script>
