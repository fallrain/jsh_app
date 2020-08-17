<template>
  <view :key="updateIndex" class="marketDetail">
    <view class="marketDetail-order-infor mb24">
      <view
        class="marketDetail-ads-detail br-b-grey"
        @tap="showAdsPicker"
      >
        <view class="iconfont iconlocal"></view>
        <text>配送至：({{currentAdd.customerCode}}){{currentAdd.customerName}}</text>
        <view class="iconfont iconyou right-style"></view>
      </view>
      <view v-if="currentDetail.proportionType === '1'" class="marketDetail-orders br-b-grey">
        <view>
          <view><span class="text-theme fs36">{{limit1.choosedMainNum}}</span>件</view>
          <view>已选主产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">{{limit1.choosedPBNum}}</span>件</view>
          <view>已选配比产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">{{computeMain}}</span>件</view>
          <view>还需主产品</view>
        </view>
        <view>
          <view class=""><span class="text-theme fs36">{{computePB}}</span>件</view>
          <view>还需配比产品</view>
        </view>
      </view>
      <view v-if="currentDetail.proportionType === '0'" class="marketDetail-requirement fs20">
        <view class="dis-flex mb24">
          <view class="w210 text-999">主产品起订金额限定</view>
          <view class="w200 text-333">{{limit2.choosedMainMoney}} / ¥{{currentDetail.spePrice}}</view>
          <view class="w210 text-999">主产品起订数量限定</view>
          <view class="text-333">{{limit2.choosedMainNum}} / {{currentDetail.speNum}}件</view>
        </view>
        <view class="dis-flex">
          <view class="w210 text-999">配比产品起订金额限定</view>
          <view class="w200 text-333">{{limit2.choosedPBMoney}} / ¥{{currentDetail.bundlePrice}}</view>
          <view class="w210 text-999">配比产品起订数量限定</view>
          <view class="text-333">{{limit2.choosedPBNum}} / {{currentDetail.bundleNum}}件</view>
        </view>
      </view>
    </view>
    <view class="marketDetail-list">
      <j-product-item
        :groupType="currentDetail.activityType"
        v-for="(goods,index) in currentDetail.products"
        :key="index+'^-^'"
        :goods="goods"
        :index="index"
        @change="goodsChange"
      ></j-product-item>
      <j-product-item
        :groupType="currentDetail.activityType"
        v-for="(goods,index) in currentDetail.pbProducts"
        :key="index"
        :goods="goods"
        :index="index"
        @change="goodsChange"
      ></j-product-item>
    </view>
    <j-product-btm
      :groupType="currentDetail.activityType"
      :conditionStatus="conditionStatus"
      :upperLimit="currentDetail.upperLimit"
      :totalMoney="totalMoney"
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
      currentAdd: {}, // 当前选中地址
      addressList: [], // 地址列表
      totalMoney: 0, // 订单所有金额总和
      conditionStatus: false,
      updateIndex: 1,
      stockForm: {
        saletoCode: '',
        sendtoCode: '',
        productCodes: []
      },
      stockDate: {},
      limit1: {
        choosedMainNum: 0, // 选择主产品的数量
        choosedPBNum: 0, // 选择配比的数量
      },
      limit2: {
        choosedMainNum: 0, // 选择主产品的数量
        choosedPBNum: 0, // 选择配比的数量
        choosedMainMoney: 0, // 选择主产品的金额
        choosedPBMoney: 0, // 选择配比的金额
      },
      currentDetail: {},
      // 0 套餐 1 组合
      groupType: 0,
      activityList: [
      ],
      // 是否全选
      isCheckAll: false,
      // 是否显示配送地址选择
      isShowAdsPicker: false
    };
  },
  onLoad(option) {
    const { item, saletoCode, sendtoCode } = option;
    this.currentDetail = JSON.parse(item);
    this.stockForm.saletoCode = saletoCode;
    this.stockForm.sendtoCode = sendtoCode;
    console.log(this.currentDetail);
    this.getAddressList();
    if (this.currentDetail.activityType === 'zuhe') {
      this.getTotalMoney();
    }
    /* console.log(this.currentDetail)
    this.getAllStock(); */
  },
  computed: {
    computeMain() {
      // 主产品比例
      const proportionMain = this.currentDetail.proportionMain;
      if (proportionMain > this.limit1.choosedMainNum) {
        return (proportionMain - this.limit1.choosedMainNum);
      }
      return 0;
    },
    computePB() {
      // 主产品比例
      const proportionMain = this.currentDetail.proportionMain;
      // 配比产品比例
      const proportion = this.currentDetail.proportion;
      let PBnum = Math.ceil(proportion / proportionMain * this.limit1.choosedMainNum)
        - this.limit1.choosedPBNum;
      if (PBnum < 0) {
        PBnum = 0;
      }
      return PBnum;
    }
  },
  methods: {
    // 获取所有产品的库存
    async getAllStock() {
      const arr1 = this.currentDetail.products;
      const arr2 = this.currentDetail.pbProducts;
      const arr = arr1.concat(arr2);
      const productCodes = [];
      arr.forEach((item) => {
        productCodes.push(item.productCode);
      });
      this.stockForm.productCodes = productCodes;
      const { code, data } = await this.commodityService.getStock(this.stockForm);
      if (code === '1') {
        this.stockDate = data;
      }
      // 所有产品增加库存数量字段
      this.currentDetail.products.forEach((item) => {
        item.stockTotalNum = data[item.productCode].stockTotalNum;
        item.choosedNum = 0; // 增加选择数量字段
      });
      this.currentDetail.pbProducts.forEach((item) => {
        item.stockTotalNum = data[item.productCode].stockTotalNum;
        item.choosedNum = 0; // 增加选择数量字段
      });
      this.updateIndex++;
      console.log(this.currentDetail.products);
      console.log(this.currentDetail.pbProducts);
    },
    goodsChange(goods, index) {
      let totalMoney = 0;
      if (goods.productFlag === 'f') {
        this.currentDetail.products[index] = goods;
      } else if (goods.productFlag === 's') {
        this.currentDetail.pbProducts[index] = goods;
      }
      this.currentDetail = JSON.parse(JSON.stringify(this.currentDetail));
      // 更新已选产品数量
      this.limit1.choosedMainNum = 0;
      this.limit1.choosedPBNum = 0;
      this.currentDetail.products.forEach((item) => {
        this.limit1.choosedMainNum += parseInt(item.choosedNum);
        totalMoney += (parseInt(item.choosedNum) * item.priceDto.profitPrice);
      });
      this.currentDetail.pbProducts.forEach((item) => {
        this.limit1.choosedPBNum += parseInt(item.choosedNum);
        totalMoney += (parseInt(item.choosedNum) * item.priceDto.profitPrice);
      });
      this.conditionStatus = this.isUpToCondition();
      this.totalMoney = totalMoney;
    },
    // 判断套餐条件是否已经满足
    isUpToCondition() {
      // 数量配比
      if (this.currentDetail.proportionType === '1') {
        if (this.computeMain === 0 && this.computePB === 0) {
          return true;
        }
      } else {
        // 金额配比
        if (this.limit2.choosedMainMoney > this.currentDetail.spePrice
          && this.limit2.choosedMainNum > this.currentDetail.sepNum
          && this.limit2.choosedPBMoney > this.currentDetail.bundlePrice
          && this.limit2.choosedPBNum > this.currentDetail.bundleNum
        ) {
          return true;
        }
      }
    },
    // 获取所有地址
    async getAddressList() {
      // 获取地址
      const { code, data } = await this.customerService.addressesList('1');
      if (code === '1') {
        this.addressList = data;
      }
      if (data.length > 0) {
        this.currentAdd = data[0];
      }
    },
    getTotalMoney() {
      let total = 0;
      this.currentDetail.products.forEach((item) => {
        total += parseFloat(item.profitPrice);
      });
      this.totalMoney = this.jshUtil.formatFloat(total, 2);
    },
    showAdsPicker() {
      /* 地址选择展示 */
      this.isShowAdsPicker = true;
    }
  }
};
</script>
