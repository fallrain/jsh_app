<template>
  <view class="shoppingCart">
    <view class="shoppingCart-tab-wrap">
      <j-tab
        :hasRightSlot="true"
        :tabs="tabs"
        @tabClick="tabClick"
      >
        <template #right>
          <view
            @tap="showIndustryPicker"
            class="shoppingCart-tab-picker"
          >
            <text class="mr8">产业</text>
            <i class="iconfont iconxia"></i>
          </view>
        </template>
      </j-tab>
    </view>
    <view class="shoppingCart-ads">
      <view class="shoppingCart-ads-total">共{{shoppingList.length}}件宝贝</view>
      <view
        @tap="showAdsPicker"
        class="shoppingCart-ads-detail"
      >
        <view class="iconfont iconlocal"></view>
        <text>配送至：{{choseSendAddress.name || ''}}</text>
      </view>
    </view>
    <view
      class="shoppingCart-list"
      v-if="shoppingList.length"
    >
      <view
        v-for="(goods,index) in shoppingList"
        :key="goods.id"
      >
        <j-shopping-cart-item
          :beforeCreditModeChange="checkCreditQuota"
          :goods="goods"
          :index="index"
          :userInf="userInf"
          :versionPrice="specialPriceMap"
          :warehouseFlag="choseSendAddress.yunCangFlag"
          @change="goodsChange"
          @del="singleDeleteCart"
          v-if="goods.isShow"
        ></j-shopping-cart-item>
      </view>
      <view
        class="shoppingCart-empty"
        v-if="shoppingList.length && !shoppingList.filter(v=>v.isShow).length"
      >
        没有匹配的相关产品~
      </view>
    </view>
    <view
      class="shoppingCart-empty"
      v-else
    >
      购物车空空如也~
    </view>
    <block v-if="failureGoodsList.length">
      <j-failure-goods-list
        :list="failureGoodsList"
        @change="failureGoodsListChange"
        @clear="clearFailureGoods"
      ></j-failure-goods-list>
    </block>
    <j-shopping-cart-btm
      :isCheckedAll.sync="isCheckAll"
      :isEdit.sync="isEdit"
      :total="totalGoodsNum"
      :total-price="totalGoodsPrice"
      @checkAll="checkAll"
      @del="deleteCart"
      @follow="followGoods"
      @submit="submitOrder"
    ></j-shopping-cart-btm>
    <j-address-picker
      :show.sync="isShowAdsPicker"
      :pickerList="sendCustomerList"
      @change="sendCustomerListChange"
    ></j-address-picker>
    <m-toast
      :isdistance="true"
      ref="toast"
    ></m-toast>
    <j-pop-picker
      :choseOptions.sync="choseIndustryOptions"
      :options="industryGroupData"
      :show.sync="isIndustryPickerShow"
      @change="industryPickerChange"
      keyName="code"
      title="产业"
    ></j-pop-picker>
  </view>
</template>
<script>
import MToast from '@/components/plugin/xuan-popup_2.2/components/xuan-popup/xuan-popup.vue';
import JShoppingCartItem from '../../components/shoppingCart/JShoppingCartItem';
import JShoppingCartBtm from '../../components/shoppingCart/JShoppingCartBtm';
import JFailureGoodsList from '../../components/shoppingCart/JFailureGoodsList';
import JAddressPicker from '../../components/shoppingCart/JAddressPicker';
import JTab from '../../components/common/JTab';
import JPopPicker from '../../components/form/JPopPicker';
import './css/shoppingCart.scss';
import {
  mapGetters,
  mapMutations
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
import OrderSplitCompose from '../../model/OrderSplitCompose';
import OrderSplitComposeProduct from '../../model/OrderSplitComposeProduct';
import {
  getIndustryGroup,
  getOrdinaryCartActivityType
} from '@/lib/dataDictionary';


export default {
  name: 'shoppingCart',
  components: {
    JPopPicker,
    JTab,
    JAddressPicker,
    JFailureGoodsList,
    JShoppingCartBtm,
    JShoppingCartItem,
    MToast
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
      // 失效产品列表
      failureGoodsList: [],
      // 是否全选
      isCheckAll: false,
      // 是否编辑模式
      isEdit: false,
      // 选中的商品总数
      totalGoodsNum: 0,
      // 选中的商品总价
      totalGoodsPrice: 0.00,
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
      specialPriceMap: {},
      // 产业数据
      isIndustryPickerShow: false,
      // 产业数据
      industryGroupData: [],
      // 选中的产业数据
      choseIndustryOptions: ['']
    };
  },
  created() {
    this.setPageInfo();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      defaultSendTo: USER.GET_DEFAULT_SEND_TO,
    }),
  },
  methods: {
    ...mapMutations([
      USER.UPDATE_DEFAULT_SEND_TO
    ]),
    setPageInfo() {
      // 设置产业数据
      this.setIndustry();
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
    reloadPageInfo() {
      /* 重载页面信息 */
      // 购物车列表
      this.getShoppingCartList();
      // 获取特价版本
      this.getSpecialPrice();
      // 重置结算底栏信息
      this.resetBtmInf();
      //  重置产业
      this.resetIndustry();
      // 获取特价版本
      this.getSpecialPrice();
    },
    setIndustry() {
      // 获取产业并设置数据
      getIndustryGroup().then((data) => {
        const industryGroupData = data.map(v => ({
          ...v,
          value: v.codeName
        }));
        industryGroupData.unshift({
          code: '',
          value: '全部'
        });
        this.industryGroupData = industryGroupData;
      });
    },
    resetIndustry() {
      /* 重置产业 */
      this.choseIndustryOptions = [''];
    },
    showIndustryPicker() {
      /* 展示产业picker */
      this.isIndustryPickerShow = true;
    },
    industryPickerChange(data) {
      /* 产品组picker change */
      const industryCode = data[0];
      if (industryCode === '') {
        this.shoppingList.forEach((v) => {
          v.isShow = true;
        });
      } else {
        this.shoppingList.forEach((v) => {
          if (v.productList[0].industryCode === industryCode) {
            v.isShow = true;
          } else {
            v.isShow = false;
          }
        });
      }
      this.isIndustryPickerShow = false;
    },
    resetBtmInf() {
      /* 重置底栏信息 */
      this.isCheckAll = false;
      this.isEdit = false;
      this.totalGoodsNum = 0;
      this.totalGoodsPrice = 0;
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
          checked: this.defaultSendTo.customerCode === v.customerCode,
          ...v
        }));
        this.sendCustomerList[2].children = detail;
        // 默认的送达地址
        this.choseSendAddress = {
          sendtoCode: this.defaultSendTo.customerCode,
          name: this.defaultSendTo.customerName,
          ...this.defaultSendTo
        };
      }
    },
    async getShoppingCartList() {
      /* 获取购物车数据 */
      const { code, data } = await this.cartService.getShoppingCartListFromCache({
        code: this.userInf.customerCode
      });
      if (code === '1') {
        // 正常商品
        const shoppingList = [];
        // 失效商品
        const failureGoodsList = [];
        data.forEach((v) => {
          if (v.composeEnable === 1) {
            shoppingList.push({
              isShow: true,
              checked: false,
              isCreditMode: false,
              $PriceInfo: v.productList[0].priceInfo,
              ...v
            });
          } else {
            failureGoodsList.push({
              ...v
            });
          }
        });
        this.shoppingList = shoppingList;
        this.failureGoodsList = failureGoodsList;
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
      const saletoCode = this.userInf.customerCode;
      const data = await this.cartService.getSpecialPrice({
        saletoCode,
        sendtoCode: this.defaultSendTo.customerCode,
        account: saletoCode,
      });
      this.specialPriceMap = (data && data) || {};
    },
    goodsChange(goods, index) {
      /* 商品数据change */
      this.shoppingList[index] = goods;
      this.shoppingList = JSON.parse(JSON.stringify(this.shoppingList));
      // 更新选择的商品数目
      this.totalGoodsNum = this.countTotalNumber();
      // 更新选择的总商品价格
      this.totalGoodsPrice = this.countTotalPrice();
    },
    checkAll(checked) {
      /* 全部选择回调函数 */
      this.shoppingList.forEach((v) => {
        v.checked = checked;
      });
      // 更新选择的总商品数
      this.totalGoodsNum = checked ? this.shoppingList.length : 0;
      // 更新选择的总商品价格
      this.totalGoodsPrice = this.countTotalPrice();
    },
    countTotalPrice() {
      /* 计算选择的商品的总价 */
      let totalGoodsPrice = 0;
      this.shoppingList.forEach((v) => {
        if (v.checked) {
          const num = v.number;
          const curTotal = this.jshUtil.arithmetic(v.$PriceInfo.commonPrice.invoicePrice, num, 3);
          totalGoodsPrice = this.jshUtil.arithmetic(totalGoodsPrice, curTotal);
        }
      });
      return totalGoodsPrice;
    },
    countTotalNumber() {
      /* 计算选择的商品的总数 */
      return this.shoppingList.filter(v => v.checked).length;
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
      // changeDefaultSendTo
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
            // 更改默认的送达方
            this.customerService.changeDefaultSendTo({
              sendToCode: this.defaultSendTo.customerCode
            }).then(({ code }) => {
              if (code === '1') {
                // 更改成功之后更新数据列表
                this.reloadPageInfo();
                // 更改成功之后更新store
                this[USER.UPDATE_DEFAULT_SEND_TO](detail);
              }
            });
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
      // 选中之后关闭弹窗
      this.isShowAdsPicker = false;
    },
    tabClick(tabs) {
      this.tabs = tabs;
    },
    deleteCart(idList, isFailure = false) {
      /* 删除购物车里的商品 */
      /**
         * @idList（Array）id的集合，如果传入则使用传入的id
         * @isFailure?:boolean 是否是失效列表
         * */
      const listName = isFailure ? 'failureGoodsList' : 'shoppingList';
      let ids;
      if (idList && idList.length) {
        ids = idList;
      } else {
        // 选出选中的商品的id集合
        ids = [];
        this[listName].forEach((v) => {
          if (v.checked) {
            ids.push(v.id);
          }
        });
      }
      if (!ids.length) {
        this.$refs.toast.open({
          type: 'warn',
          content: '请先选择商品',
          timeout: 2000,
        });
        return;
      }
      uni.showModal({
        title: '',
        content: '确认要从购物车移除吗？',
        success: async (res) => {
          if (res.confirm) {
            const { code } = await this.cartService.deleteCart(ids);
            if (code === '1') {
              this.$refs.toast.open({
                type: 'success',
                content: '删除成功',
                timeout: 2000,
              });
              const listTemp = JSON.parse(JSON.stringify(this[listName]));
              ids.forEach((id) => {
                const index = listTemp.findIndex(v => v.id === id);
                listTemp.splice(index, 1);
              });
              this[listName] = listTemp;
            }
          }
        }
      });
    },
    singleDeleteCart(goods) {
      /* 单个移除购物车 */
      const ids = [goods.id];
      this.deleteCart(ids);
    },
    clearFailureGoods() {
      /* 清空购物车的失效产品 */
      const ids = this.failureGoodsList.map(v => v.id);
      this.deleteCart(ids);
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
    async submitOrder() {
      /* 提交订单 */
      const formList = [];
      this.shoppingList.forEach((v) => {
        if (v.checked) {
          const form = new OrderSplitCompose({
            ...v,
            composeId: v.id,
            // activityType需要额外处理，具体参加数据字典：getOrdinaryCartActivityType
            activityType: getOrdinaryCartActivityType()[v.activityType]
          });
          form.productList = v.productList.map(prdt => new OrderSplitComposeProduct({
            ...prdt,
            isCheckCreditModel: v.isCreditMode ? '1' : '0',
            // farWeek: prdt.weekPromise,
            // isCheckFarWeek: '0',
            // isStock: '1',
            // transferVersion: '',
          }));

          formList.push(form);
        }
      });
      const form = {
        saletoCode: this.userInf.customerCode,
        sendtoCode: this.defaultSendTo.customerCode,
        splitComposeList: formList,
        yunCangCode: this.choseSendAddress.yunCangCode,
        yunCangFlag: this.choseSendAddress.yunCangFlag
      };
      const { code } = await this.orderService.validateProduct(form);
      if (code === '1') {
        const args = JSON.stringify(form);
        // 产品校验成功
        uni.navigateTo({
          url: `/pages/shoppingCart/orderConfirm?formData=${args}`
        });
      }
    }
  }
};
</script>
