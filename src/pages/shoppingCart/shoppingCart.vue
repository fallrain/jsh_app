<template>
  <view class="shoppingCart">
    <view class="shoppingCart-tab-wrap">
      <j-tab
        :hasRightSlot="true"
        :tabs="tabs"
        @tabClick="tabClick"
      >
        <template #right>
          <view v-show="index === 'gwc'"
            @tap="showIndustryPicker"
            class="shoppingCart-tab-picker"
          >
            <text class="mr8">产业</text>
            <i class="iconfont iconxia"></i>
          </view>
        </template>
      </j-tab>
    </view>
    <view v-show="index === 'gwc'">
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
            v-if="goods.isShow"
            :ref="'shoppingCartItem'+index"
            :beforeCreditModeChange="checkCreditQuota"
            :goods="goods"
            :index="index"
            :userInf="userInf"
            :defaultSendTo="defaultSendTo"
            :versionPrice="versionPrice"
            :warehouseFlag="choseSendAddress.yunCangFlag"
            @change="goodsChange"
            @del="singleDeleteCart"
            @updateNumber="refreshShoppingCartList"
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
        @follow="multiFollowGoods"
        @submit="submitOrder"
      ></j-shopping-cart-btm>
      <j-address-picker
        :show.sync="isShowAdsPicker"
        :pickerList="sendCustomerList"
        :beforeCheck="adsPickerBeforeCheck"
        :beforeCheckParent="adsPickerBeforeCheckParent"
        @change="sendCustomerListChange"
      ></j-address-picker>
      <m-toast
        :isdistance="true"
        ref="toast"
      ></m-toast>
      <j-pop-picker
        keyName="code"
        title="产业"
        :choseOptions.sync="choseIndustryOptions"
        :options="industryGroupData"
        :show.sync="isIndustryPickerShow"
        @change="industryPickerChange"
      ></j-pop-picker>
    </view>
<!--    <vehicle-car-list v-show="index === 'zc'"></vehicle-car-list>-->
<!--    <transfer-shopping-cart v-show="index === 'zx'"></transfer-shopping-cart>-->
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
// import vehicleCarList from '../vehicleList/vehicleCarList';
// import transferShoppingCart from '../transferGoods/transferShoppingCart';
import './css/shoppingCart.scss';
import {
  mapGetters,
  mapMutations
} from 'vuex';
import {
  GOODS_LIST,
  USER
} from '../../store/mutationsTypes';
import OrderSplitCompose from '../../model/OrderSplitCompose';
import OrderSplitComposeProduct from '../../model/OrderSplitComposeProduct';
import {
  getIndustryGroup,
  getOrdinaryCartActivityType
} from '@/lib/dataDictionary';
import shoppingCartMixin from '@/mixins/shoppingCart/shoppingCart.mixin';

export default {
  name: 'shoppingCart',
  components: {
    JPopPicker,
    JTab,
    JAddressPicker,
    JFailureGoodsList,
    JShoppingCartBtm,
    JShoppingCartItem,
    MToast,
    // transferShoppingCart,
    // vehicleCarList
  },
  mixins: [
    shoppingCartMixin
  ],
  data() {
    return {
      // 默认显示购物车
      index: 'gwc',
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
          checked: false,
          // 没有子元素
          isSingle: true
        },
        {
          flag: 'ydyc',
          name: '异地云仓',
          childrenType: 'short',
          isCanBeCheck: false,
          checked: false,
          isExpand: false,
          isShowSearch: true,
          searchValue: '',
          searchKeys: ['name'],
          children: []
        },
        {
          name: '配送至',
          isCanBeCheck: false,
          checked: false,
          isExpand: true,
          childrenType: 'long',
          isShowSearch: true,
          searchValue: '',
          searchKeys: ['address', 'addressCode'],
          children: []
        },
      ],
      // 选中的送达方cy
      choseSendAddress: {},
      // 信用额度列表（以产品大类为维度）
      creditQuotaList: [],
      // 版本价格对象
      versionPrice: {},
      // 产业展示
      isIndustryPickerShow: false,
      // 产业数据
      industryGroupData: [],
      // 选中的产业数据
      choseIndustryOptions: [''],
    };
  },
  created() {
    this.setPageInfo();
  },
  onShow() {
    // 如果已经更新过购物车，则需要刷新下
    if (this.isCartUpdate) {
      this.reloadPageInfo();
      this[GOODS_LIST.UPDATE_IS_CART_UPDATE](false);
    }
  },
  onPullDownRefresh() {
    /* 重置页面 */
    this.reloadPageInfo().then(() => {
      uni.stopPullDownRefresh();
      this.showToast({
        type: 'success',
        content: '刷新完成'
      });
    });
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      defaultSendTo: USER.GET_DEFAULT_SEND_TO,
      isCartUpdate: GOODS_LIST.GET_IS_CART_UPDATE
    }),
  },
  methods: {
    ...mapMutations([
      USER.UPDATE_DEFAULT_SEND_TO,
      GOODS_LIST.UPDATE_IS_CART_UPDATE,
    ]),
    setPageInfo() {
      // 设置产业数据
      this.setIndustry();
      // 异地云仓
      this.getWarehouse();
      // 送达方
      this.getSendCustomer();
      // 刷新购物车列表缓存
      this.refreshShoppingCartList();
      // 购物车列表（缓存里取）
      this.getShoppingCartList();
      // 获取信用额度
      this.getCreditQuota();
      // 获取特价版本
      this.getSpecialPrice();
    },
    reloadPageInfo() {
      /* 重载页面信息 */
      // 刷新购物车列表缓存
      const getRefreshShoppingCartList = this.refreshShoppingCartList();
      // 购物车列表
      const getShoppingCartList = this.getShoppingCartList();
      // 获取特价版本
      const getSpecialPrice = this.getSpecialPrice();
      // 重置结算底栏信息
      this.resetBtmInf();
      //  重置产业
      this.resetIndustry();
      return Promise.all([getRefreshShoppingCartList, getShoppingCartList, getSpecialPrice]).then(() => true);
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
      // 更新底栏
      this.updateTotal();
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
          checked: false,
          yunCangFlag: 'ydyc'
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
          name: `（${this.defaultSendTo.customerCode}）${this.defaultSendTo.address}`,
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
        if (data) {
          data.forEach((v) => {
            if (v.composeEnable === 1) {
              shoppingList.push({
                ...v,
                isShow: true,
                checked: false,
                // 信用模式
                isCreditMode: false,
                // 直发模式
                isDirectMode: false,
                $PriceInfo: v.productList[0].priceInfo,
                // 在购物车里更换的其他版本数据，使得计算属性能监控到
                choseOtherVersions: [],
                // 关注状态
                followState: false
              });
            } else {
              failureGoodsList.push({
                ...v
              });
            }
          });
        }
        this.shoppingList = shoppingList;
        this.failureGoodsList = failureGoodsList;
      }
      return true;
    },
    refreshShoppingCartList() {
      /* 刷新购物车数据 */
      // todo 是否需要同步？
      return this.cartService.getShoppingCartList({
        saletoCode: this.userInf.customerCode,
        sendtoCode: this.defaultSendTo.customerCode
      });
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
      this.versionPrice = (data && data) || {};
      return this.versionPrice;
    },
    goodsChange(goods, index) {
      /* 商品数据change */
      this.shoppingList[index] = goods;
      this.updateTotal();
    },
    updateTotal() {
      /* 更新底栏统计 */
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
        if (v.checked && v.isShow) {
          const num = v.number;
          // 获取应该计算的版本数据
          const version = this.getPriceVersionData(v).find(data => data.priceType);
          const curTotal = this.jshUtil.arithmetic(version.invoicePrice, num, 3);
          totalGoodsPrice = this.jshUtil.arithmetic(totalGoodsPrice, curTotal);
        }
      });
      totalGoodsPrice = this.jshUtil.formatNumber(totalGoodsPrice, 2);
      return totalGoodsPrice;
    },
    countTotalNumber() {
      /* 计算选择的商品的总数 */
      return this.shoppingList.filter(v => v.checked && v.isShow).length;
    },
    failureGoodsListChange(list) {
      this.failureGoodsList = list;
    },
    showAdsPicker() {
      /* 地址选择展示 */
      this.isShowAdsPicker = true;
    },
    checkHasCreditMode() {
      /* 检查是否有开启了信用模式的商品 */
      return !!this.shoppingList.find(v => v.isCreditMode);
    },
    adsPickerBeforeCheckParent(item) {
      /* 云仓点击前置事件 */
      let state = true;
      if (!item.checked && this.checkHasCreditMode()) {
        this.showToast({
          type: 'warn',
          content: '信用产品不支持云仓'
        });
        state = false;
      }
      return state;
    },
    adsPickerBeforeCheck({
      item,
      parent,
    }) {
      let state = true;
      if (parent && item && item.yunCangFlag) {
        // 异地云仓
        if (this.checkHasCreditMode()) {
          state = false;
          this.showToast({
            type: 'warn',
            content: '信用产品不支持异地云仓'
          });
        }
      }
      return state;
    },
    sendCustomerListChange(list, detail, parent, isShow, type) {
      /* 地址列表change */
      // changeDefaultSendTo
      this.sendCustomerList = list;
      // 非扩展操作
      if (type !== 'expand') {
        if (parent) {
          if (detail) {
            // 异地云仓
            if (detail.yunCangFlag) {
              this.choseSendAddress = {
                yunCangCode: detail.id,
                yunCangFlag: detail.yunCangFlag,
                name: detail.name,
              };
              this.showToast({
                type: 'warn',
                content: '海尔将收取一定托管费用'
              });
            } else {
              // 送达方
              this.choseSendAddress = {
                sendtoCode: detail.id,
                name: detail.name
              };
              // 更改默认的送达方
              this.customerService.changeDefaultSendTo({
                sendToCode: detail.customerCode
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
              this.showToast({
                type: 'warn',
                content: '海尔将收取一定托管费用'
              });
            } else {
              this.choseSendAddress = {};
            }
          }
        }
      }
      // 选中之后关闭弹窗
      this.isShowAdsPicker = isShow || false;
    },
    tabClick(tabs) {
      this.tabs = tabs;
      console.log(this.tabs);
      this.tabs.forEach(item => {
        if (item.active) {
          if (item.name === '整车直发') {
            uni.redirectTo({
              url: '/pages/vehicleList/vehicleCarList'
            });
          }
          if (item.name === '中心调货') {
            uni.redirectTo({
              url: '/pages/transferGoods/transferShoppingCart'
            });
          }
        }
      });
      console.log(tabs);
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
        this.showToast({
          type: 'warn',
          content: '请先选择商品'
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
              this.showToast({
                type: 'success',
                content: '删除成功'
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
      this.deleteCart(ids, true);
    },
    multiFollowGoods() {
      // 选出选中的商品的id集合
      const ids = this.shoppingList.filter(v => v.checked);
      if (!ids.length) {
        this.showToast({
          type: 'warn',
          content: '请先选择商品'
        });
        return;
      }
      // todo 接口应该优化
      for (let i = 0; i < ids.length; i++) {
        this.followGoods(ids[i]);
      }
    },
    async followGoods(obj) {
      /* 添加关注 */
      const {
        customerCode
      } = this.userInf;
      const { code } = await this.productDetailService.productAddInter(customerCode, customerCode, obj.productList[0].productCode);
      if (code === '200') {
        this.shoppingList.find(v => obj.id === v.id).followState = true;
        return { code: '1' };
      }
      return { code: '0' };
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
      const len = this.shoppingList.length;
      for (let i = 0; i < len; i++) {
        const v = this.shoppingList[i];
        if (v.checked) {
          const {
            number,
            productList
          } = v;
          if (!number) {
            this.showToast({
              type: 'warn',
              content: '请先选择数量'
            });
            return;
          }
          // 检查最大可购买数量，超出提示并返回
          const maxNum = this.$refs[`shoppingCartItem${i}`][0].maxGoodsNumber;
          if (number > maxNum) {
            uni.showModal({
              title: '提示',
              showCancel: false,
              content: `商品：${productList[0].productName}可购买数量不足，活动剩余可购买数${maxNum}请调整购物车`
            });
            return;
          }
          const form = new OrderSplitCompose({
            ...v,
            composeId: v.id,
            // activityType需要额外处理，具体参加数据字典：getOrdinaryCartActivityType
            activityType: getOrdinaryCartActivityType()[v.activityType]
          });
            // 判断产品的取值的字段名
          let productListName = 'productList';
          // 调货版本号
          let transferVersion;
          // 调货数量
          let transferVersionNumber;
          // 如果选择了版本，则从choseOtherVersions字段取商品
          if (v.choseOtherVersions && v.choseOtherVersions.length) {
            // 是否存在版本调货
            const transfer = v.choseOtherVersions.find(vs => !vs.priceType);
            // 版本调货本质不算版本，只需要在已选的版本里添加调货字段
            if (transfer) {
              transferVersion = transfer.versionCode;
              transferVersionNumber = transfer.num;
            } else {
              productListName = 'choseOtherVersions';
            }
          }
          form.productList = v[productListName].map(prdt => new OrderSplitComposeProduct({
            ...prdt,
            // 存在版本调货，则传版本调货提供的数量
            number: transferVersion ? transferVersionNumber : v.number,
            // creditModel 如果没信用模式，creditModel字段也得修改，todo 存疑？
            creditModel: !v.isCreditMode ? '0' : prdt.creditModel,
            // 是否信用模式
            isCheckCreditModel: v.isCreditMode ? '1' : '0',
            // farWeek: prdt.weekPromise,
            // isCheckFarWeek: '0',
            // 是否直发
            isStock: v.isDirectMode ? '0' : '1',
            // 版本调货版本号
            transferVersion: transferVersion || undefined
          }));

          formList.push(form);
        }
      }
      if (!formList.length) {
        this.showToast({
          type: 'warn',
          content: '请先选择商品'
        });
        return;
      }
      const form = {
        saletoCode: this.userInf.customerCode,
        sendtoCode: this.defaultSendTo.customerCode,
        splitComposeList: formList,
        yunCangCode: this.choseSendAddress.yunCangCode,
        yunCangFlag: this.choseSendAddress.yunCangFlag
      };
      const { code, data, msg } = await this.orderService.validateProduct(form, {
        noToast: true
      });
      if (code === '1') {
        const args = JSON.stringify(form);
        // 产品校验成功
        uni.navigateTo({
          url: `/pages/shoppingCart/orderConfirm?formData=${args}`
        });
      } else {
        let content;
        if (data) {
          content = data[0][0].msg || '请求失败';
        } else {
          content = msg || '请求失败';
        }
        uni.showModal({
          title: '',
          content
        });
      }
    }
  }
};
</script>
