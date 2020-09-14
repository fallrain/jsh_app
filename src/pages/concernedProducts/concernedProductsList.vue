<template>
  <view class="concernedProductsList-wrap">
    <view class="concernedProductsList-head-wrap">
      <view class="concernedProductsList-head">
        <view class="goodsList-search-tab j-flex-aic">
          <j-search-input
            @search="queryCustomerInterestProduct"
            v-model="filterForm.productName"
          ></j-search-input>
          <button
            @tap="queryCustomerInterestProduct"
            class="goodsList-search-tab-btn ml22"
            type="button"
          >搜索
          </button>
        </view>
      </view>
      <view class="concernedProductsList-option">
        <j-option-head
          :isCheckedAll.sync="isCheckedAll"
          :isEdit.sync="isEdit"
          @checkAll="checkAll"
          @del="removeProduct"
          @editModeChange="editModeChange"
          @onFilter="showFilter"
        ></j-option-head>
      </view>
    </view>
    <view class="goodsList-items-wrap">
      <j-goods-item
        :allPrice="item.$allPrice"
        :key="item.productCode"
        v-for="(item,index) in list"
        :goods="item"
        :index="index"
        :isEditMode="isEdit"
        :saletoCode="userInf.customerCode"
        :sendtoCode="defaultSendToInf.customerCode"
        :isShowFollow="false"
        :userInf="userInf"
        @change="goodsChange"
        @check="checkGoods"
        @delFollow="delFollow"
      ></j-goods-item>
      <j-exception-page
        :type="3"
        v-if="!list.length && isLoaded"
      ></j-exception-page>
    </view>
    <j-drawer
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"
    >
      <template>
        <j-drawer-filter-item
          :filterItem="item"
          :index="index"
          :key="index"
          @change="filterListChange"
          v-for="(item,index) in filterList"
        ></j-drawer-filter-item>
        <view class="goodsList-drawer-filter-head-ads-wrap">
          <view
            @tap="showDeliveryAddress"
            class="goodsList-drawer-filter-head"
          >
            <view>
              <text>配送至</text>
            </view>
            <i class="iconfont iconyou goodsList-drawer-filter-head-icon-right"></i>
          </view>
          <view
            @tap="showDeliveryAddress"
            class="goodsList-drawer-filter-head-ads"
          >{{curChoseDeliveryAddress.name}}</view>
        </view>
      </template>
    </j-drawer>
    <j-choose-delivery-address
      :list="deliveryAddressList"
      :show.sync="isShowAddressDrawer"
      @change="deliveryAddressListChange"
    ></j-choose-delivery-address>
    <m-toast
      :isdistance="true"
      ref="toast"
    ></m-toast>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        @confirm="removeProductConfirm"
        content="是否确认取消关注"
        type="warn"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import JDrawer from '../../components/form/JDrawer';
import JSearchInput from '../../components/form/JSearchInput';
import JOptionHead from '../../components/concernedProducts/JOptionHead';
import JGoodsItem from '../../components/goods/JGoodsItem';
import JDrawerFilterItem from '../../components/form/JDrawerFilterItem';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import MToast from '@/components/plugin/xuan-popup_2.2/components/xuan-popup/xuan-popup.vue';
import './css/concernedProductsList.scss';
import {
  USER
} from '../../store/mutationsTypes';
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex';
import JExceptionPage from '../../components/exception/JExceptionPage';

export default {
  name: 'concernedProductsList',
  components: {
    JExceptionPage,
    MToast,
    JChooseDeliveryAddress,
    JDrawerFilterItem,
    JDrawer,
    JGoodsItem,
    JOptionHead,
    JSearchInput,
  },
  data() {
    return {
      // 关注列表数据
      list: [],
      // 全选
      isCheckedAll: false,
      // 是否编辑模式
      isEdit: false,
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      // 配送地址数据
      deliveryAddressList: [],
      // 当前选中的配送地址
      curChoseDeliveryAddress: {},
      // 筛选抽屉
      isShowGoodsFilterDrawer: false,
      // 筛选抽屉数据
      filterList: [
        // {
        //   name: '品牌',
        //   isExpand: true,
        //   type: 'radio',
        //   data: []
        // },
        // {
        //   name: '产业',
        //   isExpand: true,
        //   type: 'radio',
        //   data: []
        // }
      ],
      // 筛选栏表单
      filterForm: {
        // 搜索栏
        productName: '',
      },
      // 选中的产品codes
      choseProductCodes: new Set(),
      brand: {},
      // 是否是从编辑删除
      delFromEdit: true,
      // 当前选中要删的商品
      curDelGoods: {},
      // 前面的搜索参数
      preSearchCondition: {},
      isLoaded: false
    };
  },
  created() {
    this.queryCustomerInterestProduct();
    this.getDeliveryAddress();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
    }),
  },
  methods: {
    ...mapMutations([
      USER.UPDATE_DEFAULT_SEND_TO
    ]),
    ...mapActions([
      USER.UPDATE_DEFAULT_SEND_TO_ASYNC
    ]),
    getSearchCondition() {
      /* 组合搜索参数 */
      return {
        account: this.userInf.customerCode,
        sendtoCode: this.defaultSendToInf.customerCode,
        customerCode: this.userInf.customerCode,
        ...this.filterForm
      };
    },
    async queryCustomerInterestProduct() {
      /* 列表数据 */
      const condition = this.getSearchCondition();
      const { data } = await this.customerService.queryCustomerInterestProduct(condition);
      this.isLoaded = true;
      this.preSearchCondition = condition;
      if (data) {
        const {
          // 商品列表
          productList
        } = data;
        const curList = productList.map(v => ({
          ...v,
          number: 1,
          $PtPrice: {},
          $allPrice: {},
          $stock: {}
        }));
        this.list = curList;
        // this.brands = data;
        // const brand = Object.keys(data.brandMap);
        // const brandValue = Object.values(data.brandMap);
        // const industry = Object.keys(data.industryMap);
        // const industryValue = Object.values(data.industryMap);
        // const brandMap = [];
        // const industryMap = [];
        // brand.map((item) => {
        //   brandMap.push({
        //     value: item,
        //     isChecked: false
        //   });
        // });
        // // brand[0] = `${brand[0]}(${brandValue[0]})`;
        // console.log(brand);
        // industry.map((item) => {
        //   industryMap.push({
        //     value: item,
        //     isChecked: false
        //   });
        // });
        // this.filterList[0].data = brandMap;
        // this.filterList[1].data = industryMap;
        // console.log(this.filterList);
        // ** 组合下面2个接口所需的数据
        const {
          userInf,
          defaultSendToInf
        } = this;
        const productCodes = curList.map(v => v.productCode);
        const priceArgsObj = {
          productCodes,
          saletoCode: userInf.customerCode,
          // 没选中的按默认的送达方算，有了选择的，按选择的送达方算
          sendtoCode: this.curChoseDeliveryAddress.customerCode || defaultSendToInf.customerCode,
        };
          // 获取价格
        const getAllPrice = this.commodityService.getAllPrice(priceArgsObj);
        // 获取库存
        const getStock = this.commodityService.getStock(priceArgsObj);
        const [
          allPriceRes,
          stockRes
        ] = await Promise.all([getAllPrice, getStock]);
        if (allPriceRes.code === '1') {
          // 添加价格
          const allPriceData = allPriceRes.data;
          // 注：$为了防止后端属性命名重复，pt为拼音，是为了和后端字段命名保持一致
          curList.forEach((v) => {
            v.$PtPrice = allPriceData[v.productCode].pt;
            v.$allPrice = allPriceData[v.productCode];
          });
        }
        if (stockRes.code === '1') {
          // 添加库存
          const stockData = stockRes.data;
          curList.forEach((v) => {
            v.$stock = stockData[v.productCode];
          });
        }
      } else {
        this.list = [];
      }
    },
    goodsChange(goods, index) {
      /* 商品数据change */
      this.list[index] = goods;
    },
    showFilter() {
      /* 展示filter */
      this.isShowGoodsFilterDrawer = true;
    },
    filterListChange(item, index) {
      /* 抽屉筛选选中change */
      this.$set(this.filterList, index, item);
    },
    filterConfirm() {
      /* 抽屉筛选确认 */
      // 重新搜索
      const condition = this.getSearchCondition();
      const difKeys = this.jshUtil.findDifKey(this.preSearchCondition, condition);
      // 没有不同则直接返回
      if (!Object.keys(difKeys).length) {
        return;
      }
      this.queryCustomerInterestProduct();
    },
    filterReset() {
      /* 抽屉筛选重置 */
      this.filterList.forEach((item) => {
        item.data.forEach((v) => {
          v.isChecked = false;
        });
      });
      // 重新搜索
      this.queryCustomerInterestProduct();
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    },
    getDeliveryAddress() {
      /* 获取配送地址 */
      return this.customerService.addressesList(1).then(({ code, data }) => {
        if (code === '1') {
          // 配送地址列表
          this.deliveryAddressList = data.map(v => ({
            ...v,
            id: v.customerCode,
            name: `(${v.customerCode})${v.address}`
          }));
          // 当前配送地址修改(选出默认地址)
          const defaultIndex = data.findIndex(v => v.defaultFlag === 1);
          if (defaultIndex > -1) {
            const curChoseDeliveryAddress = data[defaultIndex];
            // 更新默认送达方store
            this[USER.UPDATE_DEFAULT_SEND_TO](curChoseDeliveryAddress);
            this.deliveryAddressList[defaultIndex].checked = true;
            this.curChoseDeliveryAddress = {
              id: curChoseDeliveryAddress.customerCode,
              name: `(${curChoseDeliveryAddress.customerCode})${curChoseDeliveryAddress.address}`,
              ...curChoseDeliveryAddress
            };
          }
        }
      });
    },
    deliveryAddressListChange(list, item) {
      /* 地址数据改变 */
      this.deliveryAddressList = list;
      this.curChoseDeliveryAddress = item;
      // 更改默认的送达方
      this.customerService.changeDefaultSendTo({
        sendToCode: item.customerCode
      }).then(({ code }) => {
        if (code === '1') {
          // 更改成功之后更新store
          this[USER.UPDATE_DEFAULT_SEND_TO](item);
        }
      });
    },
    editModeChange(state) {
      /* 编辑模式改变 */
      if (state) {
      }
    },
    checkGoods(isChecked, productCode) {
      /* 编辑模式下，处理选中的商品 */
      if (isChecked) {
        this.choseProductCodes.add(productCode);
      } else {
        this.choseProductCodes.delete(productCode);
      }
    },
    checkAll(isCheckedAll) {
      /* 选中所有 */
      if (!isCheckedAll) {
        this.choseProductCodes.clear();
      }
      this.list.forEach((v) => {
        this.$set(v, 'isChecked', isCheckedAll);
        if (isCheckedAll) {
          this.choseProductCodes.add(v.productCode);
        }
      });
    },
    delFollow(goods) {
      /* 删除（取消关注） */
      this.delFromEdit = false;
      this.curDelGoods = goods;
      this.$refs.popup.open();
    },
    removeProduct() {
      if (this.choseProductCodes.size) {
        this.delFromEdit = true;
        this.$refs.popup.open();
      }
    },
    async removeProductConfirm() {
      /* 移除关注 */
      let productCodeList;
      if (this.delFromEdit) {
        productCodeList = [...this.choseProductCodes];
      } else {
        productCodeList = [this.curDelGoods.productCode];
      }

      this.$refs.popup.close();
      const { code } = await this.customerService.removeInterestProduct({
        customerCode: this.userInf.customerCode,
        account: this.userInf.customerCode,
        productCodeList
      });
        // 删除成功，删除数组
      if (code === '1') {
        this.$refs.toast.open({
          type: 'success',
          content: '取消关注成功',
          timeout: 2000,
        });
        this.delItemByProductCodes(productCodeList);
      }
    },
    delItemByProductCodes(choseProductCodes) {
      /* 删除item，通过productCodes */
      const list = this.list;
      choseProductCodes.forEach((v) => {
        const delIndex = list.findIndex(item => item.productCode === v);
        if (delIndex > -1) {
          this.list.splice(delIndex, 1);
        }
      });
      this.list = list;
      // 如果是编辑模式的删除，则清空
      if (this.delFromEdit) {
        this.choseProductCodes.clear();
      }
    },
  }
};
</script>
