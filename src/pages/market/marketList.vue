<template>
  <view class="marketList">
    <j-market-head-tab
      class="mb12"
      :tabs="tabs"
      :typeShow="isShowType"
      @tabClick="tabClick"
      @tabPickerConfirm="tabPickerConfirm"
    ></j-market-head-tab>
    <j-activity-item
      v-for="(item,index) in list"
      :key="index+'^-^'"
      :activity="item"
    ></j-activity-item>
    <j-drawer
      ref="filterDrawer"
      :show.sync="isShowFilterDrawer"
      @filterReset="filterReset"
      @filterConfirm="filterConfirm"
    >
      <view
        v-for="(item,index) in filterInputs"
        :key="index+'^-^'"
        class="marketList-drawer-filter">
        <view class="marketList-drawer-filter-head">
          <view>
            <text>{{item.name}}</text>
          </view>
        </view>
        <view
          class="marketList-drawer-filter-list"
        >
          <input
            class="marketList-drawer-filter-input"
            type="text"
            v-model="item.value"
            :placeholder="`请输入${item.name}`"
          >
        </view>
      </view>
      <view
        v-for="(item,index) in filterList"
        :key="index"
      >
        <view class="marketList-drawer-filter">
          <view class="marketList-drawer-filter-head">
            <view>
              <text>{{item.name}}</text>
              <text class="marketList-drawer-filter-head-tips">{{item.tips}}</text>
            </view>
            <i
              class="iconfont iconxia"
              :class="[
                      !item.isExpand && 'reverse'
                    ]"
              @click="toggleExpand(item)"
            ></i>
          </view>
          <view
            class="marketList-drawer-filter-list"
            v-show="item.isExpand"
          >
            <view
              v-for="(filterItem,filterIndex) in item.data"
              :key="filterIndex"
              class="marketList-drawer-filter-list-item"
              :class="[filterItem.isChecked && 'active']"
              @click="choose(filterItem,item.data,item.type)"
            >{{filterItem.value}}
            </view>
          </view>
        </view>
      </view>
      <view class="marketList-drawer-filter-head-ads-wrap">
        <view
          class="marketList-drawer-filter-head"
          @tap="showDeliveryAddress"
        >
          <view>
            <text>配送至</text>
          </view>
          <i class="iconfont iconyou marketList-drawer-filter-head-icon-right"></i>
        </view>
        <view class="marketList-drawer-filter-head-ads">
          ({{currentAdd.addressCode}}){{currentAdd.address}}
        </view>
      </view>
    </j-drawer>
    <j-choose-delivery-address
      :addressList="addressList"
      :show.sync="isShowAddressDrawer"
      @changeAddress="changeAddress"
    ></j-choose-delivery-address>
  </view>
</template>

<script>

import JDrawer from '../../components/form/JDrawer';
import JActivityItem from '../../components/market/JActivityItem';
import JMarketHeadTab from '../../components/market/JMarketHeadTab';
import JChooseDeliveryAddress from '../../components/market/JChooseDeliveryAddress';
import './css/marketList.scss';

export default {
  name: 'marketList',
  components: {
    JChooseDeliveryAddress,
    JMarketHeadTab,
    JActivityItem,
    JDrawer
  },
  data() {
    return {
      form: {
        activityId: '',
        activityName: '',
        activityType: '',
        isCheckProduct: false,
        pageNum: 1,
        pageSize: 5,
        productCode: '',
        productGroup: [],
        productName: '',
        saletoCode: '',
        sendtoCode: ''
      },
      // 活动列表
      list: [
      ],
      // 地址列表
      addressList: [],
      currentAdd: {},
      // 是否展示筛选侧边抽屉
      isShowFilterDrawer: false,
      // 是否展示地址侧边抽屉
      isShowAddressDrawer: false,
      isShowType: false,
      tabs: [
        {
          name: '活动类别',
          icon: 'iconxia',
          show: false,
          handler: 'showType',
          children: [
            { name: '全部', checked: false, key: '' },
            { name: '套餐', checked: false, key: 'taocan' },
            { name: '组合', checked: false, key: 'zuhe' },
            { name: '反向定制', checked: false, key: 'fanxiangdingzhi' }
          ]
        },
        {
          name: '筛选',
          icon: 'iconshaixuan',
          handler: 'showFilter'
        }
      ],
      filterInputs: [
        {
          key: 'productName',
          name: '产品名称',
          value: ''
        },
        {
          key: 'productCode',
          name: '产品编码',
          value: ''
        },
        {
          key: 'activityName',
          name: '活动名称',
          value: ''
        }
      ],
      filterList: [
        {
          name: '产品组',
          key: 'productGroup',
          isExpand: true,
          type: 'checkbox',
          data: [
          ]
        },
        {
          name: '产品状态',
          key: 'isCheckProduct',
          isExpand: true,
          type: 'radio',
          data: [
            {
              key: '1',
              value: '全部',
              isChecked: false
            }, {
              key: '2',
              value: '有效',
              isChecked: false
            }
          ]
        }
      ]
    };
  },
  created() {
    this.init();
  },
  computed: {
    fomrmateDate() {
      return (val) => {
        this.jshUtil.formatDate(val);
      };
    }
  },
  methods: {
    async init() {
      await this.getAddressList();
      await this.getIndustryList();
      await this.getActivityList();
    },
    async getIndustryList() {
      // 获取产品组
      const { code, data } = await this.marketService.getIndustryList();
      if (code === '1') {
        data.forEach((item) => {
          item.isChecked = false;
          item.key = item.code;
          item.value = item.codeName;
          item.isChecked = false;
        });
        this.filterList[0].data = data;
      }
    },
    async getActivityList() {
      // 获取活动
      const { code, data } = await this.marketService.activityList(this.form);
      if (code === '1') {
        this.list = data.list;
      }
    },
    async getAddressList() {
      // 获取地址
      const { code, data } = await this.customerServer.activityList('1');
      if (code === '1') {
        this.addressList = data;
      }
      if (data.length > 0) {
        this.currentAdd = data[0];
        this.form.saletoCode = data[0].customerCode;
        this.form.sendtoCode = data[0].addressCode;
      }
    },
    changeAddress(current) {
      this.currentAdd = current;
    },
    tabClick(handler) {
      if (handler) {
        this[handler]();
      }
    },
    tabPickerConfirm(tabs) {
      // 活动类别选择后确认
      this.tabs[0].children.forEach((item) => {
        if (item.checked) {
          this.form.activityType = item.key;
        }
      });
      this.getActivityList();
    },
    showFilter() {
      /* 展示filter */
      this.isShowFilterDrawer = true;
    },
    showType() {
      /* 展示类别 */
      this.isShowType = !this.isShowType;
    },
    filterReset() {
      console.log('重置');
    },
    filterConfirm() {
      /* 确定 */
      this.filterList.forEach((item) => {
        const keyName = item.key;
        let val = '';
        const valArr = [];
        item.data.forEach((item1) => {
          if (item1.isChecked) {
            if (keyName === 'productGroup') {
              valArr.push(item1.key);
            } else if (keyName === 'isCheckProduct') {
              if (item1.key === '1') {
                val = false;
              } else {
                val = true;
              }
            } else {
              val = item1.key;
            }
          }
        });
        if (keyName === 'productGroup') {
          this.form[item.key] = valArr;
        } else {
          this.form[item.key] = val;
        }
      });
      this.filterInputs.forEach((item) => {
        if (item.value) {
          this.form[item.key] = item.value;
        }
      });
      this.getActivityList();
    },
    toggleExpand(item) {
      /* 展开或者收起 */
      item.isExpand = !item.isExpand;
    },
    choose(filterItem, list, type) {
      /* 选择选项 */
      if (type === 'radio') {
        if (!filterItem.isChecked) {
          list.forEach((v) => {
            if (v.isChecked) {
              v.isChecked = false;
            }
          });
          filterItem.isChecked = true;
        }
      } else {
        // 多选翻转
        filterItem.isChecked = !filterItem.isChecked;
      }
    },
    showDeliveryAddress() {
      /* 展示配送地址 */
      this.isShowAddressDrawer = true;
    }
  }
};
</script>

<style>

</style>
