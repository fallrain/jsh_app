<template>
  <view class="shoppingCart">
    <view class="shoppingCart-tab-wrap">
      <j-tab
        :hasRightSlot="true"
        :tabs="tabs"
        @tabClick="tabClick"
      >
        <template #right>
          <view class="shoppingCart-tab-picker">
            <text class="mr8">产业</text>
            <i class="iconfont iconxia"></i>
          </view>
        </template>
      </j-tab>
    </view>
    <view class="shoppingCart-ads">
      <view class="shoppingCart-ads-total">共4件宝贝</view>
      <view
        @tap="showAdsPicker"
        class="shoppingCart-ads-detail"
      >
        <view class="iconfont iconlocal"></view>
        <text>配送至：{{choseSendAddress.name || ''}}</text>
      </view>
    </view>
    <view class="shoppingCart-list">
      <j-shopping-cart-item
        v-for="(goods,index) in shoppingList"
        :key="index"
        :goods="goods"
        :index="index"
        :beforeCreditModeChange="checkCreditQuota"
        :userInf="userInf"
        :versionPrice="specialPriceMap"
        :warehouseFlag="choseSendAddress.yunCangFlag"
        @change="goodsChange"
      ></j-shopping-cart-item>
    </view>
    <j-failure-goods-list
      :list="failureGoodsList"
      @change="failureGoodsListChange"
    ></j-failure-goods-list>
    <j-shopping-cart-btm
      :checked.sync="isCheckAll"
      @checkAll="checkAll"
    ></j-shopping-cart-btm>
    <j-address-picker
      :show.sync="isShowAdsPicker"
      :pickerList="sendCustomerList"
      @change="sendCustomerListChange"
    ></j-address-picker>
  </view>
</template>
<script>
import JShoppingCartItem from '../../components/shoppingCart/JShoppingCartItem';
import JShoppingCartBtm from '../../components/shoppingCart/JShoppingCartBtm';
import JFailureGoodsList from '../../components/shoppingCart/JFailureGoodsList';
import JAddressPicker from '../../components/shoppingCart/JAddressPicker';
import JTab from '../../components/common/JTab';
import './css/shoppingCart.scss';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';


export default {
  name: 'shoppingCart',
  components: {
    JTab,
    JAddressPicker,
    JFailureGoodsList,
    JShoppingCartBtm,
    JShoppingCartItem,
  },
  data() {
    return {
      tabs: [
        {
          id: 'gwc',
          name: '购物车',
          active: true
        },
        {
          id: 'zc',
          name: '整车直发',
          active: false
        },
        {
          id: 'zx',
          name: '中心调货',
          active: false
        }
      ],
      // 购物车列表
      shoppingList: [],
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
      isShowAdsPicker: false,
      // 送达方数据
      sendCustomerList: [
        {
          flag: 'yc',
          name: '云仓',
          checked: false
        },
        {
          flag: 'ydyc',
          name: '异地云仓',
          childrenType: 'short',
          checked: false,
          isExpand: true,
          children: []
        },
        {
          name: '配送至',
          checked: false,
          isExpand: true,
          childrenType: 'long',
          children: []
        },
      ],
      // 选中的送达方cy
      choseSendAddress: {},
      // 信用额度列表（以产品大类为维度）
      creditQuotaList: [],
      // 版本价格对象
      specialPriceMap: {}
    };
  },
  created() {
    this.setPageInfo();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  methods: {
    setPageInfo() {
      // 异地云仓
      this.getWarehouse();
      // 送达方
      this.getSendCustomer();
      // 购物车列表
      this.getShoppingCartList();
      // 获取信用额度
      this.getCreditQuota();
      // 获取特价版本
      this.getSpecialPrice();
    },
    async getWarehouse() {
      /* 获取异地云仓信息 */
      const { code, data } = await this.customerService.getWarehouse({
        customerCode: this.userInf.customerCode,
        warehouseFlag: 'YD'
      });
      if (code === '1') {
        this.sendCustomerList[1].children = data.map(v => ({
          id: v.code,
          name: v.codeName,
          checked: false
        }));
      }
    },
    async getSendCustomer() {
      /* 获取售达方信息 */
      const { code, data } = await this.customerService.getSendCustomer({
        status: 1
      });
      if (code === '1') {
        const detail = data.map(v => ({
          id: v.addressCode,
          name: `（${v.customerCode}）${v.address}`,
          checked: false
        }));
        this.sendCustomerList[2].children = detail;
        // 第一个送达方为默认的送达地址
        if (detail[0]) {
          this.choseSendAddress = {
            sendtoCode: detail[0].id,
            name: detail[0].name
          };
        }
      }
    },
    async getShoppingCartList() {
      /* 获取购物车数据 */
      const { code, data } = await this.cartService.getShoppingCartListFromCache({
        code: this.userInf.customerCode
      });
      if (code === '1') {
        this.shoppingList = data.map(v => ({
          checked: false,
          isCreditMode: false,
          $PriceInfo: v.productList[0].priceInfo,
          ...v
        }));
      }
    },
    async getCreditQuota() {
      /* 获取各个产品组的信用额度 */
      const { code, data } = await this.trafficService.getXYQuota({
        customerCode: this.userInf.customerCode
      });
      if (code === '1') {
        this.creditQuotaList = data.data;
      }
    },
    checkCreditQuota(productGroup, totalPrice) {
      /* 检查信用额度是否在范围内 */
      const quotaMap = this.creditQuotaList.find(v => v.GROUPCODE === productGroup);
      return quotaMap.PLAN >= totalPrice;
    },
    async getSpecialPrice() {
      /* 获取特价版本 */
      const {
        saletoCode,
        sendtoCode,
        customerCode
      } = this.userInf;
      const data = await this.cartService.getSpecialPrice({
        saletoCode,
        sendtoCode,
        account: customerCode
      });
      this.specialPriceMap = (data && data) || {};
    },
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
    },
    sendCustomerListChange(list, detail, parent) {
      /* 地址列表change */
      this.sendCustomerList = list;
      // 选中的送达仓库地址
      this.choseSendAddress = detail || {};
      if (parent) {
        if (detail) {
          // 异地云仓
          if (detail.yunCangFlag) {
            this.choseSendAddress = {
              yunCangCode: detail.id,
              yunCangFlag: detail.flag,
              name: detail.name,
            };
          } else {
            // 送达方
            this.choseSendAddress = {
              sendtoCode: detail.id,
              name: detail.name
            };
          }
        } else {
          if (parent.flag === 'yc') {
            // 普通云仓（只有一个）
            this.choseSendAddress = {
              yunCangCode: '',
              yunCangFlag: 'yc',
              name: '云仓',
            };
          } else {
            this.choseSendAddress = {};
          }
        }
      }
    },
    tabClick(tabs) {
      this.tabs = tabs;
    }
  }
};
</script>
