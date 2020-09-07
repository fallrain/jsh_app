<template>
    <view class="transferGoods">
      <view class= "transferGoods-head">
        <view class="transfer-search j-flex-aic">
          <j-search-input
            v-model="filterForm.name"
            @search="silentReSearch"
          ></j-search-input>
          <button
            type="button"
            class="transfer-btn"
            @tap="silentReSearch"
          >搜索
          </button>
        </view>
        <view class="transfer-m"></view>
        <transfer-goods-head
            class="mb12"
            :tabs="tabs"
            @confirm="confirm"
            @tabClick="tabClick"
            :cargoWareHome="cargoWareHome"
            :cargoSendWay="cargoSendWay"
            :popTabs="popTabs"
            ref="transferGoodsHead"
        ></transfer-goods-head>
      </view>

      <mescroll-body
        ref="mescrollRef"
        @init="mescrollInit"
        :up="jMescrollUpOptions"
        :down="jMescrollDownOptions"
        @down="jMescrollDownCallback"
        @up="upCallback"
      >
        <!-- 产品列表 -->
        <view class="transferList-items-wrap" v-if="list.length !== 0">
          <transfer-goods-item
            v-for="(item,index) in list"
            :key="index"
            :code="item.code"
            :goods="item"
            :saletoCode="saleInfo.customerCode"
            :sendtoCode="saleInfo.customerCode"
            :allPrice="item.$allPrice"
            @change="goodsChange"
            @query="getShoppingCartNum"
            @inserOrder="inserOrder(item)"
            ref="transferGoodsItem"
          ></transfer-goods-item>
        </view>
        <view v-else>
          <image
              src="../../assets/img/exception/error-none.png"
              style="width:120px; height:120px;margin:28% 35% 5% 38%;"
          />
          <view class="else-title">
            <view class="else-title-l">非常抱歉</view>
            <text class="else-title-x">没有找到相关的宝贝</text>
          </view>
        </view>
      </mescroll-body>
      <!-- 抽屜 -->
    <t-drawer
      :show.sync="isShowGoodsFilterDrawer"
      @filterConfirm="filterConfirm"
      @filterReset="filterReset"
    >
      <template>
        <t-drawer-filter-item
          v-for="(item,index) in filterList"
          :key="index"
          :filterItem="item"
          :index="index"
          @change="filterListChange"
        ></t-drawer-filter-item>
        <view class="transferList-drawer-filter-head-ads-wrap">
          <view
            class="transferList-drawer-filter-head"
            @tap="showDeliveryAddress"
          >
            <view>
              <text>配送至</text>
            </view>
            <i class="iconfont iconyou transferList-drawer-filter-head-icon-right"></i>
          </view>
          <view class="transferList-drawer-filter-head-ads">{{curChoseDeliveryAddress.name}} </view>
        </view>
        <view class="transferList-drawer-filter-head-ads-wrap">
          <view class="transferList-drawer-filter-head">
            <view>
              <text>价格区间</text>
            </view>
          </view>
          <view class="transferList-drawer-filter-price-range">
            <input
              class="transferList-drawer-filter-price-ipt"
              type="number"
              placeholder="最低价格"
              v-model="filterForm.lowPrice"
            >
            <view class="transferList-drawer-filter-price-line"></view>
            <input
              class="transferList-drawer-filter-price-ipt"
              type="number"
              placeholder="最高价格"
              v-model="filterForm.highPrice"
            >
          </view>
        </view>
      </template>
    </t-drawer>
    <j-choose-delivery-address
      :show.sync="isShowAddressDrawer"
      :list="deliveryAddressList"
      @change="deliveryAddressListChange"
      :activeItemName="'item'+curChoseDeliveryAddress.customerCode"
    ></j-choose-delivery-address>
    <!-- 底部购物车栏 -->
    <transfer-goods-btm
      :shoppingCartNum="shoppingCartNum"
    >
    </transfer-goods-btm>
  </view>
</template>
<script>

import transferGoodsHead from './transferGoodsHead';
import transferGoodsItem from './transferGoodsItem';
import JSearchInput from '../../components/form/JSearchInput';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import MescrollBody from '@/components/plugin/mescroll-uni/mescroll-body.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import TDrawer from '../../components/transfer/TDrawer';
import TDrawerFilterItem from '../../components/transfer/TDrawerFilterItem';
import transferGoodsBtm from './transferGoodsBtm';
import './css/transferGoods.scss';
import {
  mapGetters, mapMutations
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'transferGoods',
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    transferGoodsHead,
    transferGoodsItem,
    JSearchInput,
    MescrollBody,
    TDrawer,
    TDrawerFilterItem,
    transferGoodsBtm,
    JChooseDeliveryAddress
  },
  data() {
    return {
      disable: false,
      list: null,
      sortType: '',
      sortDirection: '',
      conditionList: [],
      transferList: [],
      // 库存数量
      stockNum: 0,
      // 调出库位
      cargoWareHome: [],
      // 配送类型
      cargoSendWay: [],
      // 当前配送地址
      address: {},
      cargoSend: [],
      // 统仓统配
      SendWay: '',
      // 购物车商品数量
      shoppingCartNum: [],
      priceList: [],
      // popTabs: [],
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      stock: '', // 库位
      brand: '',
      tabs: [
        {
          name: '综合',
          active: true
        },
        {
          name: '最新上架',
          active: false,
          condition: {
            sortDirection: 'desc',
            sortType: 'saletime'
          }
        },
        {
          id: 'price',
          name: '价格',
          icon: [
            'iconpaixujiantoushang',
            'iconpaixujiantouxia'
          ],
          iconClass: '',
          active: false,
          condition: {
            sortDirection: 'desc',
            sortType: 'price'
          }
        },
        {
          name: '筛选',
          icon: [
            'iconshaixuan'
          ],
          handler: 'showFilter',
          noSearch: true,
          active: false
        }
      ],
      // 筛选抽屉
      isShowGoodsFilterDrawer: false,
      filterList: [],
      filterName: '', // 筛选品牌
      filterBrandName: '', // 筛选类目
      // 筛选栏表单
      filterForm: {
        // 搜索栏
        name: '',
        // 最低价
        lowPrice: '',
        // 最高价
        highPrice: ''
      },
      // 配送地址数据
      deliveryAddressList: [],
      // 当前选中的配送地址
      curChoseDeliveryAddress: {
        name: null
      },
      // 配送地址完整数据
      addressesList: [],
      // 付款方数据
      payer: [],
      //  选购其他的大单号
      otherSEQ: '',
      //选购其他返回数据
      getOrder:[],
      popTabs: [
        {
          name: '调出库位',
          show: false,
          children: []
        },
        {
          name: '配送类型',
          show: false,
          children: []
        },
      ],
    };
  },
  onLoad(option) {
    this.disable = false;
    console.log(option);
    this.otherSEQ = option.IBR_SEQ;
    if (this.otherSEQ) {
      this.getOrderList();
    }
  },
  watch: {
    $route: [],
  },
  created() {
    // this.getPageInfo();
    // console.log(this.saleInfo);
  },
  mounted() {
    if (this.saleInfo.channelGroup === 'CT') {
      console.log(555555555555)
      uni.showToast({
        title: `当前客户${this.saleInfo.customerCode}无调货权限`,
        duration: 5000,
      });
    } else {
      this.getPageInfo();
    }
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    })
  },
  methods: {
    ...mapMutations([
      USER.UPDATE_DEFAULT_SEND_TO
    ]),
    getPageInfo() {
      // this.setFilterData();
      (async () => {
        await this.getDeliveryAddress();
        await this.getCargoQuery();
        await this.getTransferList();
        // await this.setFilterList();
        await this.getpayerList();
        await this.getAddress();
      })();

      this.getShoppingCartNum();
      this.confirm();
    },
    // 调出库位和配送类型点击确定时
    confirm(popTabs) {
      // this.popTabs = popTabs;
      console.log(this.popTabs);
      console.log(this.list);
      if (this.popTabs && this.popTabs.length !== 0) {
        this.popTabs[0].children.forEach((ele) => {
          if (ele.checked) {
            this.stock = ele.type;
          }
          let cargoWare = this.cargoWareHome;
          // cargoWare.splice(0,1)
          cargoWare = cargoWare.filter(e => e.OUTWHCODE !== '');
          console.log(cargoWare);
          cargoWare.forEach((item) => {
            item.isSelected = false;
            if (this.stock === item.OUTWHCODE) {
              item.isSelected = true;
              this.cargoSend.push(item);
            }
          });
          console.log(this.cargoSend);
        });
        // 配送类型
        this.popTabs[1].children.forEach((ele) => {
          if (ele.checked) {
            this.brand = ele.type;
            console.log(ele);
            if (ele.ycFlag === 'JSHSW') {
              console.log(11111111111);
              this.SendWay = 'JSHSW';
            } else {
              console.log(222222222);
              this.SendWay = '';
            }
          }
        });
        this.getStockNum();
      }
      console.log(this.SendWay);
      console.log(this.brand);
      console.log('1111dddddddddddddddddddddd');
      if (this.list && this.list.length > 0) {
        this.mescroll.resetUpScroll(true);
      } else {
        this.getTransferList();
      }
    },
    getStockNum() {
      const tabs = this.popTabs;
      console.log(tabs);
      if (tabs && tabs.length !== 0) {
        console.log(111111111111);
        console.log(tabs[0]);
        if (tabs && tabs[0].children.length > 0) {
          console.log(2222222);
          tabs[0].children.forEach((ele) => {
            // console.log(33333333);
            // console.log(ele);
            if (ele.checked) {
              // 根据库位判断库存数量
              let num = 0;
              console.log(ele);
              if (ele.type === '') {
                this.list.forEach((item) => {
                  item.stockList.map((v) => {
                    console.log('cccccccccccccccccccc', v);
                    v.subCodeList.map((e) => {
                      num += Number(e.QTY);
                    });
                  });
                  console.log(num);
                  item.stockNum = num;
                  num = 0;
                  // console.log(item)
                });
              } else {
                this.list.forEach((item) => {
                  item.stockList.map((v) => {
                    // console.log('dddddddddddd', v);
                    v.subCodeList.map((e) => {
                      if (ele.type === v.whcode) {
                        num += Number(e.QTY);
                      }
                    });
                  });
                  item.stockNum = num;
                  num = 0;
                  // console.log(item)
                });
              }
            }
          });
        }

        // 获取初始化时配送类型
        tabs[1].children.forEach((ele) => {
          if (ele.checked) {
            this.brand = ele.type;
            console.log(ele);
            if (ele.ycFlag === 'JSHSW') {
              console.log(11111111111);
              this.SendWay = 'JSHSW';
            } else {
              console.log(222222222);
              this.SendWay = '';
            }
          }
        });
      }
    },
    silentReSearch() {
      /* 静默搜索 */
      this.mescroll.resetUpScroll(true);
    },
    async upCallback(pages) {
      /* 上推加载 */
      if (this.saleInfo.channelGroup === 'CT') {
        uni.showToast({
          title: `当前客户${this.saleInfo.customerCode}无调货权限`,
          duration: 5000,
        });
        this.mescroll.endBySize(10, 0);
        return;
      }
      console.log('3333333dddddddddddddddddd');
      const scrollView = await this.getTransferList(pages);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
    getSearchCondition(pages) {
      console.log(this.saleInfo);
      /* 获取不同条件下搜索的传参 */
      let condition = {
        pageNum: pages ? pages.num : 1,
        pageSize: 15,
        customerCode: this.saleInfo.customerCode,
        // sendTo: this.saleInfo.customerCode,
      };
      console.log(this.saleInfo.customerCode);
      // tab条件
      const tab = this.tabs.find(v => v.active);
      // 其他条件
      const filtersMap = {
        name: this.filterForm.name
      };
      // console.log(this.filterForm)
      // console.log(this.filterList)
      // 右侧筛选栏搜索数据
      if (this.filterList && this.filterList.length !== 0) {
        this.filterList[0].data.forEach((item) => {
          if (item.isChecked) {
            filtersMap.brandName = item.key;
          }
        });
        this.filterList[1].data.forEach((item) => {
          if (item.isChecked) {
            filtersMap.categoryCode = item.key;
          }
        });
      }
      if (this.deliveryAddressList && this.deliveryAddressList.length !== 0) {
        this.deliveryAddressList.forEach((item) => {
          if (item.checked) {
            filtersMap.dstCode = item.id;
            filtersMap.center = item.tradeCode;
          }
        });
      }
      console.log(this.deliveryAddressList);
      // 最高价格，最低价格
      const {
        lowPrice,
        highPrice
      } = this.filterForm;
      if (lowPrice) {
        filtersMap.lowPrice = lowPrice * 1;
      }
      if (highPrice) {
        filtersMap.highPrice = highPrice * 1;
      }
      // 反转大小
      if (lowPrice !== '' && highPrice !== '' && filtersMap.highPrice < filtersMap.lowPrice) {
        [filtersMap.lowPrice, filtersMap.highPrice] = [filtersMap.highPrice, filtersMap.lowPrice];
        this.filterForm.lowPrice = filtersMap.lowPrice;
        this.filterForm.highPrice = filtersMap.highPrice;
      }
      // 如果存在条件，则塞入条件
      condition = {
        ...condition,
        ...tab.condition,
        ...filtersMap
      };
      console.log(condition);
      return condition;
    },
    async getTransferList(pages) {
      console.log(pages);
      const saleInfo = this.saleInfo;
      const condition = this.getSearchCondition(pages);
      console.log(condition);
      const scrollView = {};

      const { code, data } = await this.transfergoodsService.transferList({
        timestamp: Date.parse(new Date()),
        // categoryCode: "",
        attributeName: '',
        attributeValue: '',
        customerCode: this.saleInfo.customerCode,
        // dstCode: '8800212607',
        // center: '12A02',
        group: '',
        // brandName: this.filterBrandName,
        sortDirection: this.sortDirection,
        sortType: this.sortType,
        tags: '',
        brandGroup: this.brand,
        productCode: '',
        highPrice: '',
        lowPrice: '',
        stock: this.stock,
        ...condition,
      });
      if (code === '1' && data.code === '200') {
        console.log('11111');
        const page = JSON.parse(data.data);
        const curList = page.data;
        scrollView.pageSize = page.pageSize;
        scrollView.total = page.total;
        this.conditionList = page.condition;
        const productCodes = curList.map(v => v.code);
        const priceArgsObj = {
          productCodes,
          saletoCode: this.saleInfo.customerCode,
          sendtoCode: condition.dstCode,
        };
        // 获取价格
        const getAllPrice = this.commodityService.getAllPrice(priceArgsObj);
        // 获取收藏
        const getProductQueryInter = this.customerService.queryCustomerInterestProductByAccount({
          account: String(this.saleInfo.customerCode),
          productCodeList: productCodes
        });
        const [
          allPriceRes,
          productQueryInterRes
        ] = await Promise.all([getAllPrice, getProductQueryInter]);
        if (allPriceRes.code === '1') {
          // 添加价格
          console.log(allPriceRes);
          const allPriceData = allPriceRes.data;
          // 注：$为了防止后端属性命名重复，pt为拼音，是为了和后端字段命名保持一致
          curList.forEach((v) => {
            v.amount = 1;
            v.$PtPrice = allPriceData[v.code].pt;
            v.$PtPrice.invoicePrice = Number(v.$PtPrice.invoicePrice).toFixed(2);
            // console.log('111111111111111111111111111111111',v.$PtPrice.invoicePrice)
            v.$allPrice = allPriceData[v.code];
          });
        }
        if (productQueryInterRes.code === '1') {
          // 添加点赞
          const productQueryInterData = productQueryInterRes.data;
          curList.forEach((v) => {
            v.$favorite = !!productQueryInterData.find(productCode => v.code === productCode);
          });
        }
        if (pages && pages.num === 1) {
          this.list = curList;
        } else {
          if (!this.list) {
            this.list = [];
          }
          this.list = this.list.concat(curList);
          console.log(this.list);
        }
        // 获取当前送达方地址
        this.getAddress();
        this.setFilterList();
        // 库存数量
        this.getStockNum();
      } else {
        this.list = [];
        this.mescroll.endErr();
        // 暂无数据
        uni.showToast({
          title: '暂无数据',
        });
        scrollView.total = 0;
      }
      // debugger
      return scrollView;
    },
    setFilterList() {
      console.log(this.conditionList);
      this.filterList = this.conditionList.map(item => ({
        name: item.title,
        isExpand: true,
        type: 'radio',
        data: item.data.map(it => ({
          key: it.Code,
          value: it.Name,
          isChecked: false
        }))
      }));
      console.log(this.filterList);
    },
    async getCargoQuery(pages) {
      const condition = this.getSearchCondition(pages);
      console.log(condition);
      // let prop = this.popTabs;
      // console.log('xxxxxxxxx',this.popTabs)
      // console.log('xxxxxxxxx',prop)
      // 调出库位数据
      const { code, data } = await this.transfergoodsService.cargoWareHome({
        timestamp: Date.parse(new Date()),
        sendToCode: condition.dstCode,
        sendToMktid: condition.center
      });
      if (code === '1') {
        const home = data.data;
        console.log('w 时候   是哦', home);
        home.unshift({
          OUTWHCODE: '',
          OUTWHNAME: '全部'
        });
        this.cargoWareHome = home;
        console.log('sossososososoos', this.cargoWareHome);
        if (this.cargoWareHome) {
          const tempArray = [];
          this.cargoWareHome.map((item) => {
            // console.log(item.OUTWHNAME)
            const temp = {
              name: item.OUTWHNAME,
              checked: false,
              type: item.OUTWHCODE
            };
            tempArray.push(temp);
          });
          console.log(this.popTabs[0]);
          this.popTabs[0].children = tempArray;
          console.log(this.popTabs[0]);
        }
        console.log(this.cargoWareHome);
        this.cargoWareHome.forEach((item) => {
          item.isSelected = false;
        });
        this.cargoSend = this.cargoWareHome.filter(e => e.OUTWHCODE !== '');
        console.log('000000000000', this.cargoSend);
      }
      // 配送类型数据
      const temp = await this.transfergoodsService.cargoSendWay({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        sendtoCode: condition.dstCode,
        sendtoMktid: condition.center
      });
      if (temp.code === '1') {
        console.log(temp.data);
        let brandGroup = '';
        if (temp.data.data[0].PRODandSWRH) {
          temp.data.data[0].PRODandSWRH.forEach((item) => {
            brandGroup += (`${item.PROD}:${item.SWRH};`);
          });
          temp.data.data[0].brandGroup = brandGroup;
          console.log('44444444444444444444444444',brandGroup);
        }
        this.cargoSendWay = temp.data.data;
        if (this.cargoSendWay) {
          const tempArray = [];
          this.cargoSendWay.forEach(item => {
            if (item.sendWay === '统仓统配') {
              const temp = {
                name: item.sendWay,
                checked: false,
                type: item.brandGroup
              };
              tempArray.push(temp);
            }
            if (item.sendWay === '客户自有仓') {
              console.log(item);
              let brandGroup = '';
              if (item.PRODandSWRH && item.PRODandSWRH) {
                item.PRODandSWRH.map(item => {
                  brandGroup += (`${item.PROD}:${item.SWRH};`);
                });
              }
              console.log(brandGroup);
              const temp = {
                name: item.sendWay,
                checked: false,
                type: brandGroup
              };
              tempArray.push(temp);
            }
          });
          this.popTabs[1].children = tempArray;
        }
      }
      console.log('sssssssssssssssssssssss', this.cargoSendWay);
      console.log(this.popTabs);
      if (!this.disable) {
        this.popTabs[0].children[0].checked = true;
        this.popTabs[1].children[0].checked = true;
      } else {
        this.popTabs[0].disable = true;
        this.popTabs[0].children.forEach(item => {
          console.log(item);
          item.checked = false;
          if (item.name === this.getOrder.T5_OUTWHNAME) {
            item.checked = true;
            console.log(item);
            console.log(this.cargoWareHome);
            this.cargoSend = [{
              OUTWHCODE: item.type,
              OUTWHNAME: item.name
            }];
            console.log('111111111111', this.cargoSend);
          }
        });
        this.popTabs[1].disable = true;
        this.popTabs[1].children.forEach(item => {
          console.log(item);
          item.checked = false;
          if (item.name === this.getOrder.IBR_ADDRESSTYPE) {
            item.checked = true;
          }
        });

      }
      this.popTabs[1].children.forEach((item) => {
        console.log('qqqqqqqqqqqqqqq', item);
        if (item.name === '统仓统配') item.ycFlag = 'JSHSW';
        if (item.name === '客户自有仓') item.ycFlag = '';
      });
      // this.popTabs[1].children[0].ycFlag = 'JSHSW';
      // this.popTabs[1].children[1].ycFlag = '';
      console.log('zzzzzzzzzzzzzzzzzz', this.popTabs[1].children);
    },
    //点击选购其他 返回列表页
    async getOrderList() {
      const { code, data } = await this.transfergoodsService.allOrderList({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        DH_SEQ: this.otherSEQ
      });
      console.log(1212121);
      if (code === '1' && data.code === '200') {
        this.disable = true;
        console.log(data);
        this.getOrder = data.data[0];
        // if()
        this.curChoseDeliveryAddress.name = temp1.DH_SENDTO_ADDRESS;
        this.mescroll.resetUpScroll(true);
      }
    },
    async getShoppingCartNum() {
      // 购物车商品数量
      const shoppingCart = await this.transfergoodsService.shoppingCartNum({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode
      });
      if (shoppingCart.code === '1') {
        this.shoppingCartNum = shoppingCart.data.allNum;
        console.log(this.shoppingCartNum);
        // console.log(data)
      }
    },
    // 获取付款方数据
    async getpayerList() {
      console.log(this.saleInfo.customerCode);
      const { code, data } = await this.customerService.getcustomersList(this.saleInfo.customerCode, {
        salesGroupCode: this.saleInfo.salesGroupCode,
        status: 1
      });
      if (code === '1') {
        // console.log(data)
        this.payer = data;
      }
    },
    // 获取当前配送地址
    getAddress() {
      console.log(111);
      this.addressesList.forEach((item) => {
        console.log(item);
        console.log(this.curChoseDeliveryAddress);
        if ((this.curChoseDeliveryAddress.customerCode || this.curChoseDeliveryAddress.id) === `${item.customerCode}`) {
          console.log(item);
          this.address = item;
        }
      });
      console.log('aaaaaaaa', this.address);
    },
    // 加入调货
    async inserOrder(item) {
      // 获取当前配送地址
      this.getAddress();
      if (this.stockNum !== '0') {
        console.log(item);
        const insertTransfer = await this.transfergoodsService.insertOrder([{
          timestamp: Date.parse(new Date()),
          ycFlag: this.SendWay, // 是否统仓统配    配送类型？
          SEQ: this.otherSEQ ? this.otherSEQ : '', // 调货单号
          MKTID: this.address.tradeCode, // 工贸编码    配送至  address.tradeCode
          sendCode: '', // 配送中心编码   配送至
          brand: item.brand, // 品牌编码     产品列表
          INVSORT: item.group, // 产品组编码
          PRODUCT_MODEL: item.module, // 物料型号  ？
          DH_INVCODE: item.code, // 物料编码
          DH_INVSTD: item.name, // 描述
          DH_QTY: Number(item.amount), // 下单数量
          UnitPrice: String(item.$PtPrice.invoicePrice), // 开票价   价格接口
          ActPrice: Number(item.$PtPrice.supplyPrice), // 供价     价格接口
          BateRate: Number(item.$PtPrice.rebateRate), // 扣点    价格接口
          BateMoney: Number(item.$PtPrice.rebateMoney), // 价格接口
          IsFL: Number(item.$PtPrice.rebatePolicy), // 返利标识    //价格接口
          IsKPO: Number(item.$PtPrice.isBB), // 商空标识  0：非商空  1：商空     //价格接口
          DH_VERCODE: '', // 特价版本
          DH_VERMONEY: '', // 版本价格
          USERID: this.saleInfo.customerCode, // 售达方编码
          longfeiMFID: this.address.customerCode, // 送达方编码
          DH_PAYTO: '8800101954', // 付款方编码       //付款方接口传递一份this.payer[0].payerCode
          DH_PAYTONAME: '(8800101954)青岛鸿程永泰商贸有限公司', // 付款方名称   //付款方接口传递一份`(${this.payer[0].payerCode})${this.payer[0].payerName}`
          YJMFID: this.address.manageCustomerCode, // 业绩管理客户编码   p配送至 接口
          DH_PROCODE: '', // 工程版本
          DH_PROLOSSMONEY: '',
          DH_LOSSRATE: 0, // 不用改
          DH_OUTWHCODE: '', // 调出库位     //当前选的调出库位    this.stock
          DH_IMG: item.searchImage,
          DH_SENDTONAME: this.address.addressName, // 送达方名称   配送至 接口
          SENDTO_ADDRESS: this.address.address, // 送达方地址   配送至 接口
          stockList: this.cargoSend, // 调出库位列表

          DH_PAYTO_TYPE: '00', // 付款方类型       //付款方
          DH_SALETO_NAME: '青岛鸿程永泰商贸有限公司', // 售达方编码    用户信息   //this.payer[0].customerName
          DH_MAIN_CHANNEL_CODE: this.address.channel, // 大渠道    customer接口   配送接口address.channel
          DH_SUB_CHANNEL_CODE: this.address.subChannel, // 小渠道     customer接口  配送接口address.subChannel
        }]);
        if (insertTransfer.code === '1' && insertTransfer.data.code === '200') {
          console.log(111);
          this.getShoppingCartNum();
          uni.showToast({
            title: insertTransfer.data.message,
            duration: 3000,
          });
        } else {
          uni.showToast({
            title: insertTransfer.data.message,
            duration: 3000,
          });
        }
      }
    },
    goodsChange(goods, index) {
      /* 商品数据change */
      this.list[index] = goods;
      this.list = JSON.parse(JSON.stringify(this.list));
    },

    tabClick(tabs, tab, index) {
      /* 顶部双层tab栏目，第一层点击事件 */
      console.log(tabs);
      console.log(tab);
      console.log(tab);
      this.tabs = tabs;
      if (tab.condition) {
        this.sortType = tab.condition.sortType;
        this.sortDirection = tab.condition.sortDirection;
      } else {
        this.sortType = '';
        this.sortDirection = '';
      }
      // tab为价格的时候，降序升序操作
      if (tab.id === 'price') {
        const sortDirection = tab.condition.sortDirection;
        tab.condition.sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        tab.iconClass = tab.condition.sortDirection;
        this.tabs[index] = tab;
        console.log(this.tabs);
      }
      if (!tab.noSearch) {
        this.mescroll.resetUpScroll(true);
      }
      if (tab.handler) {
        this[tab.handler]();
      }
      this.mescroll.resetUpScroll(true);
      console.log('444444dddddddddddddddddd');
      this.getTransferList();
      this.getStockNum();
    },
    showFilter() {
      /* 展示filter */
      this.isShowGoodsFilterDrawer = true;
    },
    // setFilterData() {

    // },

    filterListChange(item, index) {
      /* 抽屉筛选选中change */
      this.$set(this.filterList, index, item);
    },
    filterConfirm() {
      /* 抽屉筛选确认 */
      // 重新搜索
      console.log(this.filterList);
      console.log('222222dddddddddddddddddd');
      this.getTransferList();
      this.getStockNum();
      this.mescroll.resetUpScroll(true);
    },
    filterReset() {
      /* 抽屉筛选重置 */
      this.filterForm.highPrice = '';
      this.filterForm.lowPrice = '';
      this.filterList.forEach((item) => {
        item.data.forEach((v) => {
          v.isChecked = false;
        });
      });
      // 重新搜索
      this.mescroll.resetUpScroll(true);
    },

    showDeliveryAddress() {
      /* 展示配送地址 */
      if (this.disable) {
        return;
      }
      this.isShowAddressDrawer = true;
    },
    async getDeliveryAddress() {
      /* 获取配送地址 */
      await this.customerService.addressesList(1).then(({ code, data }) => {
        if (code === '1') {
          this.addressesList = data;
          console.log(data);
          // 配送地址列表
          this.deliveryAddressList = data.map(v => ({
            id: v.customerCode,
            name: `(${v.customerCode})${v.addressName}`,
            tradeCode: v.tradeCode

          }));
          console.log(this.deliveryAddressList);
          // 当前配送地址修改(选出默认地址)
          const defaultIndex = data.findIndex(v => v.defaultFlag === 1);
          console.log(defaultIndex);
          if (defaultIndex > -1) {
            console.log(data[defaultIndex]);
            const curChoseDeliveryAddress = data[defaultIndex];
            curChoseDeliveryAddress.name = `${curChoseDeliveryAddress.customerCode}${curChoseDeliveryAddress.addressName}`;
            // 更新默认送达方store
            this[USER.UPDATE_DEFAULT_SEND_TO](curChoseDeliveryAddress);
            this.deliveryAddressList[defaultIndex].checked = true;
            this.curChoseDeliveryAddress = curChoseDeliveryAddress;
          }
        }
      });
    },
    deliveryAddressListChange(list, item) {
      /* 地址数据改变 */
      this.deliveryAddressList = list;
      this.curChoseDeliveryAddress = item;
      this.getCargoQuery();
    }
  }
};
</script>
<style  scoped>
/*/deep/ .jSearchInput-wrap{*/
/*  margin:24px 22px 24px 24px;*/
/*  z-index:100;*/
/* }*/
/*/deep/ .jSearchInput{*/
/*   margin:24px 22px 24px 24px;*/
/*   z-index:100;*/
/* }*/

</style>
