<template>
  <view class="vehicleList">
    <view class="vehicleList-tab">
      <view class="vehicle-search j-flex-aic">
        <j-search-input v-model="filterForm.name" @search="silentReSearch"></j-search-input>
        <button type="button" class="vehicle-btn" @search="silentReSearch">搜索</button>
      </view>
      <view>
        <j-head-tab class="mb12" :tabs="tabs" :popTabs="popTabs" @tabClick="tabClick" @tabconfirmPup="tabconfirmPup"></j-head-tab>
      </view>
    </view>
    <view>
      <view class="vehicle-listItem" v-if="vehicleList&&vehicleList.length>0">
        <view v-for="(item,index) in vehicleList" :key="index" >
          <vehicle-item :goods="item" :index="index" @change="vehicleNum" @addCar="addVehicleCar"></vehicle-item>
        </view>
      </view>
      <view class="vehicle-listItemEl" v-else>暂无数据~</view>
    </view>
    <j-drawer :show.sync="isShowSeach" @filterConfirm="filterConfirm" @filterReset="filterReset">
      <template>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head">
            <view><text>是否限制高端型号</text></view>
            <view :class="['vehicle-drawer-filter-status',switchType&&'active']">{{switchType ? '是' : '否'}}</view>
            <j-switch :active.sync="switchType"></j-switch>
          </view>
        </view>
        <j-drawer-filter-item v-for="(item,index) in filterList" :key="index" :filterItem="item"
           :index="index" @change="filterListChange"></j-drawer-filter-item>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head" @tap="showDeliveryAddress">
            <view><text>配送至</text></view>
            <i class="iconfont iconyou vehicle-drawer-filter-head-icon-right"></i>
          </view>
          <view class="vehicle-drawer-filter-head-ads">{{curChoseDeliveryAddress.name}}</view>
        </view>
        <view class="vehicle-drawer-filter-head-ads-wrap">
          <view class="vehicle-drawer-filter-head">
            <view><text>价格区间</text></view>
          </view>
          <view class="vehicle-drawer-filter-price-range">
            <input class="vehicle-drawer-filter-price-ipt"
              type="number" placeholder="最低价格" v-model="filterForm.lowPrice">
            <view class="vehicle-drawer-filter-price-line"></view>
            <input class="vehicle-drawer-filter-price-ipt"
              type="number" placeholder="最高价格" v-model="filterForm.highPrice">
          </view>
        </view>
      </template>
    </j-drawer>
    <j-choose-delivery-address :show.sync="isShowAddressDrawer" :list="deliveryAddressList" @change="deliveryAddressListChange">
    </j-choose-delivery-address>
    <view class="vehicle-high"></view>
    <view class="vehicle-foot"><vehicle-foot :carType="ZCLX.carNames"></vehicle-foot></view>
  </view>
</template>

<script>
import './css/vehicleList.scss';
import JHeadTab from '../../components/form/JHeadTab';
import JSearchInput from '../../components/form/JSearchInput';
import vehicleItem from '../../components/vehicleList/vehicleItem';
import JDrawer from '../../components/form/JDrawer';
import JDrawerFilterItem from '../../components/form/JDrawerFilterItem';
import JSwitch from '../../components/form/JSwitch';
import JChooseDeliveryAddress from '../../components/goods/JChooseDeliveryAddress';
import vehicleFoot from '../../components/vehicleList/vehicleFoot';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'vehicleList',
  components: {
    JHeadTab,
    JSearchInput,
    vehicleItem,
    JDrawer,
    JDrawerFilterItem,
    JSwitch,
    JChooseDeliveryAddress,
    vehicleFoot
  },
  data() {
    return {
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
      popTabs: [
        {
          name: '发货基地',
          show: false,
          typee: 'ZC',
          children: []
        },
        {
          name: '基地拼车',
          show: false,
          typee: 'ZC',
          children: []
        },
        {
          name: '配送类型',
          show: false,
          typee: 'ZC',
          children: []
        },
        {
          name: '整车类型',
          show: false,
          typee: 'ZC',
          children: []
        }
      ],
      isShowSeach: false, // 筛选抽屉
      filterList: [], // 筛选抽屉数据
      filterForm: { // 侧边筛选表单
        name: '', // 搜索栏
        lowPrice: '', // 最低价
        highPrice: '' // 最高价
      },
      switchType: false, // 是否限制高端型号
      isShowAddressDrawer: false, // 是否展示地址侧边抽屉
      deliveryAddressList: [], // 配送地址数据
      curChoseDeliveryAddress: {}, // 当前选中的配送地址
      vehicleList: [], // 整车列表信息
      total: 0, // 整车列表总数
      pageNo: 1, // 整车列表当前页数
      FHJD: [], // 选中的发货基地
      JDPC: [], // 选中的基地拼车
      PSLX: [], // 选中的配送类型
      ZCLX: [], // 选中的整车类型+车型
      sortTypes: '', // 最新上架跟价格排序
      sortDirection: '', // 最新上架跟价格排序
      brandCheck: '', // 选中的品牌
      leiMu: '', // 选中的类目
    };
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER
    }),
  },
  created() {
    this.queryBaseCode(); // 基地
  },
  methods: {
    async queryBaseCode() { // 基地
      const { code, data } = await this.vehicleService.queryBaseCode();
      if (code === '1') {
        console.log('基地');
        if (data.code === '200') {
          if (data.data.jd.length > 0) {
            data.data.jd.forEach((inf) => {
              inf.checked = false;
              inf.name = inf.ICC_JDNAME;
              inf.code = inf.ICC_JDCODE;
              inf.type = 'ZCJD';
            });
            this.popTabs[0].children = data.data.jd;
            this.popTabs[0].children[4].checked = true;
            this.FHJD = this.popTabs[0].children[4];
            console.log(this.FHJD);
            this.getDeliveryAddress(); // 基地之后==配送至
          }
          if (data.data.pcb.length > 0) {
            data.data.pcb.forEach((inf) => {
              inf.checked = false;
              inf.name = inf.ICC_JDNAME;
              inf.code = inf.ICC_JDCODE;
              inf.type = 'ZCPC';
            });
            this.popTabs[1].children = data.data.pcb;
          }
        } else {
          console.log(data.message);
        }
      }
    },
    async getDeliveryAddress() {
      const timetamp = new Date().valueOf();
      const customerCode = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.queryCustomerSendto(timetamp, customerCode);
      if (code === '1') {
        console.log('获取配送地址');
        if (data.code === '200') {
          this.deliveryAddressList = JSON.parse(data.data).map(v => ({ // 配送地址列表
            id: v.customerCode,
            name: `(${v.customerCode})${v.customerName}`,
            checked: false,
            info: v
          }));
          if (this.deliveryAddressList[0]) { // 当前配送地址修改
            this.deliveryAddressList[0].checked = true;
            this.curChoseDeliveryAddress = this.deliveryAddressList[0];
          }
          console.log(this.curChoseDeliveryAddress);
          this.querySendWay(); // 基地之后+配送至之后==配送类型
        }
      }
    },
    async querySendWay() { // 配送类型
      const timetamp = new Date().valueOf();
      const YDPSJIDI = this.FHJD.ICC_JDCODE;
      const sendtoMktid = this.curChoseDeliveryAddress.info.tradeCode;
      const sendtoCode = this.curChoseDeliveryAddress.info.customerCode;
      const longfeiUSERID = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.querySendWay(timetamp, YDPSJIDI, longfeiUSERID, sendtoMktid, sendtoCode);
      if (code === '1') {
        if (data.data.length > 0) {
          data.data.forEach((inf) => {
            inf.checked = false;
            inf.name = `(${inf.sendWayCode})${inf.sendWay}`;
            inf.type = 'ZCPSLX';
          });
        }
        this.popTabs[2].children = data.data;
        this.popTabs[2].children[0].checked = true;
        this.PSLX = this.popTabs[2].children[0];
        console.log('配送类型');
        console.log(this.PSLX);
        this.carLoadType(); // 基地之后+配送至之后+配送类型之后==整车类型+车型
      }
    },
    async carLoadType() { // 整车列表-整车类型+车型
      let brandGroup = '';
      if (this.PSLX.brandGroup) {
        brandGroup = this.PSLX.brandGroup;
      }
      if (this.PSLX.PRODandSWRH && this.PSLX.PRODandSWRH.length > 0) {
        for (let i = 0; i < this.PSLX.PRODandSWRH.length; i++) {
          brandGroup += `${this.PSLX.PRODandSWRH[i].SWRH}:${this.PSLX.PRODandSWRH[i].PROD};`;
        }
      }
      console.log(brandGroup);
      const { code, data } = await this.vehicleService.carType({
        brandProductGroup: brandGroup,
        centerCode: this.curChoseDeliveryAddress.info.tradeCode,
        deliveryType: this.PSLX.sendWayCode,
        jdCodeList: [this.FHJD.ICC_JDCODE],
        sendtoCode: this.userInf.sendtoCode
      });
      if (code === '1') {
        if (data.length > 0) {
          data.forEach((inf) => {
            inf.checked = false;
            inf.name = inf.carTypeName;
            inf.type = 'ZCLX';
            inf.carNames = inf.carName;
          });
        }
        this.popTabs[3].children = data;
        this.popTabs[3].children[0].checked = true;
        this.ZCLX = this.popTabs[3].children[0];
        console.log('整车类型+车型');
        console.log(this.ZCLX);
        this.queryEs(1);
      }
    },
    async queryEs(pageNo) {
      this.filterList = []; // 右侧筛选品牌类目
      let brandGroup = '';
      if (this.PSLX.brandGroup) {
        brandGroup = this.PSLX.brandGroup;
      }
      if (this.PSLX.PRODandSWRH && this.PSLX.PRODandSWRH.length > 0) {
        for (let i = 0; i < this.PSLX.PRODandSWRH.length; i++) {
          brandGroup += `${this.PSLX.PRODandSWRH[i].PROD}:${this.PSLX.PRODandSWRH[i].SWRH};`;
        }
      }
      const timetamp = new Date().valueOf();
      const userInf = this.userInf;
      const categoryCode = this.leiMu;
      const name = this.filterForm.name;
      const customerCode = userInf.customerCode;
      const dstCode = this.curChoseDeliveryAddress.info.customerCode; // 配送至获取
      const center = this.curChoseDeliveryAddress.info.tradeCode; // 配送至获取
      const pageSize = '15';
      const brandName = this.brandCheck;
      const sortDirection = this.sortDirection;
      const sortType = this.sortTypes.replace(/\s+/g, '');
      // const brandGroup = '';
      const productCode = '';
      const highPrice = this.filterForm.highPrice;
      const lowPrice = this.filterForm.lowPrice;
      const farWeekGroup = '';
      const baseCode = this.FHJD.ICC_JDCODE; // 发货基地/基地拼车为空的时候
      const { code, data } = await this.vehicleService.queryEs(timetamp, categoryCode, name, pageNo, pageSize,
        customerCode, dstCode, center, brandName, sortDirection, sortType, brandGroup, productCode, highPrice, lowPrice, farWeekGroup, baseCode);
      if (code === '1') {
        console.log('整车列表');
        if (data.code === '200') {
          console.log(JSON.parse(data.data));
          const aaa = JSON.parse(data.data);
          if (aaa.condition.length > 0) {
            this.filterList = aaa.condition.map(item => ({
              name: item.title,
              isExpand: true,
              type: 'radio',
              data: item.data.map(it => ({
                key: it.Code,
                value: it.Name,
                isChecked: false
              }))
            }));
          }
          console.log(this.filterList);
          /** **列表数据*** */
          const productCodes = aaa.data.map(v => v.code);
          const priceArgsObj = {
            productCodes,
            saletoCode: userInf.saletoCode,
            sendtoCode: userInf.sendtoCode,
          };
          const getAllPrice = this.commodityService.getAllPrice(priceArgsObj); // 获取价格
          const getProductQueryInter = this.productDetailService.productQueryInter({ // 获取收藏
            productCodes,
            account: userInf.customerCode
          });
          const [allPriceRes] = await Promise.all([getAllPrice, getProductQueryInter]);
          if (allPriceRes.code === '1') { // 添加价格
            const allPriceData = allPriceRes.data;
            // 注：$为了防止后端属性命名重复，pt为拼音，是为了和后端字段命名保持一致
            aaa.data.forEach((v) => {
              v.$PtPrice = allPriceData[v.code].pt;
              v.$allPrice = allPriceData[v.code];
            });
          }
          if (pageNo === 1) {
            this.vehicleList = [];
          }
          this.vehicleList = this.vehicleList.concat(aaa.data);
          this.pageNo = this.pageNo + 1;
          this.total = aaa.total;
          console.log(aaa);
        }
      }
    },
    onReachBottom() {
      console.log('到底了，该加页了');
      if (this.vehicleList.length > 0 && (this.total > (this.pageNo - 1) * 15)) {
        this.queryEs(this.pageNo);
      } else {
        console.log('到底了，没数了');
      }
    },
    tabconfirmPup(item, index) {
      console.log('777777');
      console.log(item);
      this.FHJD = []; this.JDPC = []; this.PSLX = []; this.ZCLX = [];
      this.popTabs[0].children.forEach((v) => {
        if (v.checked) { // 选中的发货基地
          this.FHJD = v;
        }
      });
      this.popTabs[1].children.forEach((v) => {
        if (v.checked) { // 选中的基地拼车
          this.JDPC = v;
        }
      });
      this.popTabs[2].children.forEach((v) => {
        if (v.checked) { // 选中的配送类型
          this.PSLX = v;
        }
      });
      this.popTabs[3].children.forEach((v) => {
        if (v.checked) { // 选中的整车类型+车型
          this.ZCLX = v;
        }
      });
      if (index === 0 || index === 1) {
        this.querySendWay();
      } else if (index === 2) {
        this.carLoadType();
      } else {
        this.queryEs(1);
      }
    },
    tabClick(tabs, tab, index) {
      console.log('8888888');
      console.log(tabs);
      console.log(tab);
      console.log(index);
      /* 顶部双层tab栏目，第一层点击事件 */
      this.tabs = tabs;
      if (tab.condition) {
        this.sortTypes = tab.condition.sortType;
        this.sortDirection = tab.condition.sortDirection;
      } else {
        this.sortTypes = '';
        this.sortDirection = '';
      }
      // tab为价格的时候，降序升序操作
      if (tab.id === 'price') {
        const sortDirection = tab.condition.sortDirection;
        tab.condition.sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        tab.iconClass = tab.condition.sortDirection;
        this.tabs[index] = tab;
      }
      if (tab.handler) {
        this[tab.handler]();
      }
      this.queryEs(1);
    },
    showFilter() {
      /* 展示filter */
      this.isShowSeach = true;
    },
    filterListChange(item, index) {
      /* 抽屉筛选选中change */
      this.$set(this.filterList, index, item);
    },
    filterConfirm() {
      /* 抽屉筛选确认 */
      console.log(this.filterList); // 品牌：类目
      this.brandCheck = '';
      this.leiMu = '';
      this.filterList.forEach((item) => {
        if (item.name === '品牌') {
          item.data.forEach((v1) => {
            if (v1.isChecked) {
              this.brandCheck = v1.key; // 选中的品牌
            }
          });
        } else {
          item.data.forEach((v2) => {
            if (v2.isChecked) {
              this.leiMu = v2.key; // 选中的类目
            }
          });
        }
      });
      // 价格反转大小
      const { lowPrice, highPrice } = this.filterForm;
      if (lowPrice) {
        this.filterForm.lowPrice = lowPrice * 1;
      }
      if (highPrice) {
        this.filterForm.highPrice = highPrice * 1;
      }
      if (lowPrice !== '' && highPrice !== '' && this.filterForm.highPrice < this.filterForm.lowPrice) {
        [this.filterForm.lowPrice, this.filterForm.highPrice] = [this.filterForm.highPrice, this.filterForm.lowPrice];
      }
      this.queryEs(1);
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
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    },
    deliveryAddressListChange(list, item) {
      /* 地址数据改变 */
      this.deliveryAddressList = list;
      this.curChoseDeliveryAddress = item;
    },
    vehicleNum(vehicle, index) {
      /* 商品数据change */
      this.vehicleList[index] = vehicle;
    },
    addVehicleCar(index) {
      /* 商品加购物车change */
      console.log(index);
    },
    silentReSearch() {
      /* sousuo */
      this.queryEs(1);
    }
  }
};
</script>
