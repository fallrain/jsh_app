<template>
  <view class="bg">
    <view class="jtabBg">
      <j-tab
        :hasRightSlot="true"
        :tabs="tabs"
        :activeItemName="activeTabName"
        @tabClick="tabClick"
      ></j-tab>
    </view>
    <!-- 基本信息 -->
    <view v-if="index === '0'">
      <!-- 基本信息 -->
      <view class="block">
        <view class="dis-flex">
          <view class="aheadImage"></view>
          <view class="firstPageTitle">
            基本信息
          </view>
        </view>
        <view class="line"></view>
        <view class="firstItem">
          <view class="firstPageLeft">当前账户交易状态：</view>
          <view class="firstPageRight">正常</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">本月提货次数：</view>
          <view class="firstPageRight">{{baseTransactionInfo.deliveryNum}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">本月提货金额：</view>
          <view class="firstPageRightRed"> ¥ {{baseTransactionInfo.deliveryAmount || '--'}}(万)</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">最近交易日期：</view>
          <view class="firstPageRight">{{baseTransactionInfo.lastDate}}</view>
        </view>
        <view class="blank"></view>
      </view>
      <!-- 交易权限 -->
      <!--
popCustomer: "冰箱AA、波轮洗衣机DA、滚筒洗衣机DB"
status: "正常" -->
      <view class="block">
        <view class="dis-flex">
          <view class="aheadImage"></view>
          <view class="firstPageTitle">交易权限</view>
        </view>
        <view class="line"></view>
        <view class="firstItem">
          <view class="firstPageLeft">门店状态：</view>
          <view class="firstPageRightHasHttp">{{customerBasicInformation.shopFlag}}
            <view
              @tap="goOtherTab(2)"
              class="http"
            >门店信息详见门店列表
            </view>
          </view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">云仓权限：</view>
          <view class="firstPageRight">{{customerBasicInformation.yunCangPermissions}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">签约产品组：</view>
        </view>
        <view class="firstPageRightMore">{{customerBasicInformation.signProductGroup}}</view>
        <view class="firstItem">
          <view class="firstPageLeft">签约产品：</view>
          <view
            @tap="goOtherTab(1)"
            class="http"
          >查看签约明细
          </view>
        </view>
        <view class="firstPageRightMore">{{customerBasicInformation.signBrand}}</view>
        <view class="firstItem">
          <view class="firstPageLeft">品牌标签：</view>
        </view>
        <view class="firstPageRightMore">{{customerBasicInformation.brandLabel}}</view>
        <view class="blank"></view>

      </view>

      <!-- 整车权限 -->
      <view class="block">
        <view class="dis-flex">
          <view class="aheadImage"></view>
          <view class="firstPageTitle">整车权限</view>
        </view>
        <view class="line"></view>
        <view class="firstItem">
          <view class="firstPageLeft">整车直发权限：</view>
          <!-- <view class="firstPageRightHasHttp">未开通
             <view class="http">去开通</view>
         </view> -->
          <view class="firstPageRight">{{zhengCheAndFinancialDto.zhengCheQuanXian}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">开通日期：</view>
          <view class="firstPageRight">{{zhengCheAndFinancialDto.zhengCheTime}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">整车到付未付款：</view>
          <view class="firstPageRightRed">{{zhengCheAndFinancialDto.zhengCheUnpaid}}</view>
        </view>
        <view class="blank"></view>
      </view>

      <!-- 样品机权限：  -->
      <view class="block">
        <view class="dis-flex">
          <view class="aheadImage"></view>
          <view class="firstPageTitle">样品机权限</view>
        </view>
        <view class="line"></view>
        <view class="firstItem">
          <view class="firstPageLeft">样品机权限：</view>
          <view class="firstPageRight">{{customerBasicInformation.specimenMachineQuanXian}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">样品机开通产品：</view>
        </view>
        <view class="firstPageRightMore">{{customerBasicInformation.specimenMachineProduct}}</view>
        <view class="blank"></view>
      </view>
      <!-- 金融服务： -->
      <view class="block">
        <view class="dis-flex">
          <view class="aheadImage"></view>
          <view class="firstPageTitle">金融服务</view>
        </view>
        <view class="line"></view>
        <view class="firstItem">
          <view class="firstPageLeft">供应链金融：</view>
          <view class="firstPageRight">{{zhengCheAndFinancialDto.supplyChainFinance}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">信用订单：</view>
          <view class="firstPageRight j-flex-aic">
            {{zhengCheAndFinancialDto.creditOrder}}
            <view
              @tap="goOtherTab(4)"
              class="http"
              v-if="zhengCheAndFinancialDto.creditOrder==='已开通'"
            >融资户详情
            </view>
          </view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">开通日期：</view>
          <!-- <view class="firstPageRightHasHttp">未开通
             <view class="http">去开通</view>
         </view> -->
          <view class="firstPageRight">
            {{zhengCheAndFinancialDto.creditOrderTime}}
          </view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">信用订单逾期产品：：</view>
          <view class="firstPageRight">{{zhengCheAndFinancialDto.creditOrderOverdueProduct}}</view>
        </view>
        <view class="firstItem">
          <view class="firstPageLeft">市场秩序：</view>
        </view>
        <view class="firstPageRightMore">{{customerBasicInformation.marketOrder}}</view>
        <view class="blank"></view>
      </view>
    </view>

    <!-- 签约信息 -->
    <view v-if="index === '1'">
      <view class="secondTopBtn">
        履约查询
      </view>
      <view class="block">
        <view
          class="bg-white mb24"
          v-for="(item,index) in customerSigned.contractMessageDtoList"
          :key="index"
        >
          <view class="secondPageTitleContent">
            <view class="secondPageTitle">{{item.contractname}}</view>
          </view>
          <view class="breakLine"></view>
          <view class="firstItem">
            <view class="firstPageLeft">区协议编码域</view>
            <view class="firstPageRight">{{item.contractno}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">产品组编码</view>
            <view class="firstPageRight">{{item.productName}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">签约品牌编码</view>
            <view class="tags">
              <view style="margin-right:14px;">
                <view
                  :key="tag"
                  class="myGuestView-sign-inf-tag"
                  v-for="tag in item.tagList">
                  {{tag}}
                </view>
              </view>
            </view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">有效期</view>
            <view class="firstPageRight">{{item.inDate}}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 门店信息 -->
    <view v-if="index === '2'">
      <view class="myGuestView-mescroll-wrap">
        <mescroll-uni
          :down="jMescrollDownOptions"
          :fixed="false"
          :up="jMescrollUpOptions"
          @down="jMescrollDownCallback"
          @init="mescrollInit"
          @up="getBranchInformationUpCallback"
          ref="mescrollRef"
        >
          <view
            :key="storeIndex"
            class="myGuestView-store-item"
            v-for="(item,storeIndex) in branchInformation"
          >
            <view>
              <view class="secondPageTitleContent">
                <view class="secondPageTitle">{{item.sbrName}}</view>
              </view>
              <view class="breakLine"></view>

              <view class="firstItem">
                <view class="firstPageLeft">门店编码</view>
                <view class="firstPageRight">{{item.addressCode}}</view>
              </view>
              <view class="firstItem">
                <view class="firstPageLeft">建店时间</view>
                <view class="firstPageRight">{{item.sbrExpectBuildDate}}</view>
              </view>
              <view class="firstItem">
                <view class="firstPageLeft">状态</view>
                <view v-if="item.shopFlag === '正常'" class="tag">
                  {{item.shopFlag}}
                </view>
                <view v-else class="tag bg-grey">
                  {{item.shopFlag}}
                </view>
              </view>
              <view class="firstItem">
                <view class="firstPageLeft">详细地址</view>
              </view>
              <view class="firstPageRightMore">{{item.specificAddress}}</view>
            </view>
          </view>
        </mescroll-uni>
      </view>
    </view>

    <!-- 送达方信息 -->
    <view v-if="index === '3'">
      <view class="block">
        <view
          :key="customerIndex"
          v-for="(item,customerIndex) in customers"
          class="mb24 bg-white pb20"
        >
          <view class="secondPageTitleConten br-b-dashed">
            <view style="height:10px"></view>
            <view class="secondPageTitle">{{item.customerName}}</view>
            <view style="height:10px"></view>
          </view>

          <view class="firstItem">
            <view class="firstPageLeft">送达方编码</view>
            <view class="firstPageRight">{{item.customerCode}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">送达方中心</view>
            <view class="firstPageRight">{{item.centerName}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">状态</view>
            <view class="tag bg-grey" v-if="item.deletedFlag == 'true'">
              冻结
            </view>
            <view class="tag" v-else>
              正常
            </view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">是否默认</view>
            <view class="firstPageRight" v-if="item.defaultFlag">是</view>
            <view @tap="setDefaultAction(item.customerCode)" class="firstPageRight" v-else>设置为默认</view>
          </view>
          <view class="firstPageRightMore">{{item.address}}</view>
        </view>

        <view class="blank"></view>
      </view>

    </view>

    <!-- 付款方信息 -->
    <view class="block" v-if="index === '4'">
      <view class="block mb24 bg-white">
        <view class="dis-flex">
          <view class="companyImage"></view>
          <view>
            <view class="fifthPageRight">（{{saleInf.customerCode}}）</view>
            <view class="fithPageTitle">{{saleInf.customerName}}</view>
          </view>
        </view>
        <!-- <view class="breakLine"></view>
        <view class="firstItem">
          <view class="firstPageLeft">账户总额：</view>
          <view class="firstPageRightRed">¥{{accountTotal}}</view>
        </view> -->
      </view>

      <view
        :key="auxiliaryIndex"
        v-for="(item,auxiliaryIndex) in payerBalanceList"
        class=" mb24 bg-white"
      >
        <view class="block">
          <view style="height:10px"></view>
          <view class="secondPageTitle">
            <view
              class="myGuestView-sign-inf-tag mr12"
              v-if="item.defaultFlag==='1'"
            >默认
            </view>
            {{item.customerName}}
          </view>
          <view style="height:10px"></view>
          <view class="breakLine"></view>
          <view class="firstItem">
            <view class="firstPageLeft">付款方编码</view>
            <view class="firstPageRight">{{item.customerCode}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">帐户余额</view>
            <view class="firstPageRightRed">¥ {{item.balance}}</view>
          </view>
          <view class="firstItem">
            <view class="firstPageLeft">是否默认</view>
            <view
              class="firstPageRight"
              v-if="item.defaultFlag==='1'"
            >是
            </view>
            <view
              @tap="setFukuanDefaultAction(item.customerCode)"
              class="firstPageRight"
              v-else-if="item.payerType != '03' && item.payerType != '07' && item.payerType != '15'"
            >设置为默认设置
            </view>
            <view
              v-if="item.defaultFlag !='1' && item.payerType == '03' ||item.payerType == '07' ||item.payerType == '15'"
              @tap="setFukuanDefaultAction(item.customerCode)"
              class="firstPageRightGray"
            >设置为默认设置
            </view>
            <!-- payerType -->
          </view>
          <view class="blank"></view>
        </view>
      </view>
      <!--      <j-exception-page-->
      <!--        :type="3"-->
      <!--        v-if="!payerBalanceList.length && isLoaded"-->
      <!--      ></j-exception-page>-->
    </view>

  </view>
</template>

<script>
import MescrollUni from '@/components/plugin/mescroll-uni/mescroll-uni.vue';
import mescrollMixin from '@/components/plugin/mescroll-uni/mescroll-mixins';
import selfMescrollMixin from '@/mixins/mescroll.mixin';
import JTab from '../../components/common/JTab';
import {
  mapActions,
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'myGuestView',
  mixins: [
    mescrollMixin,
    selfMescrollMixin
  ],
  components: {
    JTab,
    MescrollUni
  },
  data() {
    // 这里存放数据
    return {
      // 基本信息-账户交信息
      baseTransactionInfo: {},
      tabs: [
        {
          id: '0',
          name: '基本信息',
          active: true
        },
        {
          id: '1',
          name: '签约信息',
          active: false
        },
        {
          id: '2',
          name: '门店信息',
          active: false
        },
        {
          id: '3',
          name: '送达方信息',
          active: false
        },
        {
          id: '4',
          name: '付款方信息',
          active: false
        },
      ],
      // 激活的tab item
      activeTabName: 'item0',
      index: 0,
      // 基本信息-交易权限、市场秩序、样品机权限
      customerBasicInformation: {},
      // 基本信息-整车权限、金融服务
      zhengCheAndFinancialDto: {},
      //   签约信息
      customerSigned: {},
      //   门店信息
      branchInformation: [],
      // 门店信息是否已经加载
      isStoreInfLoaded: false,
      // 送达方列表
      customers: {},
      // 付款方列表
      auxiliary: {},
      // 付款方账户总额
      accountTotal: '',
      // 付款方信息
      payerBalanceList: [],
    };
  },
  created() {
    this.setPageInfo();
  },
  watch: {
    index(newVal) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 10
      });
      switch (newVal) {
        case '0':
          this.getCustomerBasicInformation();
          break;
        case '1':
          this.getCustomerSigned();
          break;
        case '2':
          // 门店信息
          if (!this.isStoreInfLoaded) {
            this.$nextTick(() => {
              this.mescroll.resetUpScroll(true);
            });
          }
          break;
          // 送达方信息
        case '3':
          this.customersFun();
          break;
          // 付款方列表
        case '4':
          this.auxiliaryFun(this.userInf.customerCode, 1);
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_SALE,
      saleInf: USER.GET_SALE
    }),
  },
  onLoad(option) {
    this.index = option.index;
    const tmpTabs = [];
    for (let index = 0; index < this.tabs.length; index++) {
      const element = this.tabs[index];
      if (element.id == this.index) {
        this.activeTabName = `item${index}`;
        element.active = true;
      } else {
        element.active = false;
      }
      tmpTabs.push(element);
    }
    this.tabs = tmpTabs;
  },
  methods: {
    ...mapActions([
      USER.UPDATE_SALE_ASYNC
    ]),
    setPageInfo() {
      this.getSaleInfo();
      this.getOrderMonthSummery();
      this.getCustomerBasicInformation();
      this.getZhengCheAndFinancialDto();
      this.getCustomerSigned();
      // this.getBranchInformation();
    },
    async getSaleInfo() {
      /* 获取售达方信息 */
      if (!this[USER.GET_SALE] || JSON.stringify(this[USER.GET_SALE]) === '{}') {
        await this[USER.UPDATE_SALE_ASYNC]();
      }
    },
    async getOrderMonthSummery() {
      const param = {
        jshi_saleto_code: this.userInf.customerCode,
        orderStatusSelf: 7
      };

      /* 获取基本信息-订单交易状态 */
      const { code, data } = await this.orderService.getOrderMonthSummery(param);
      if (code === '1') {
        this.baseTransactionInfo = data || {};
      }
    },
    async getCustomerBasicInformation() {
      /* 基本信息-交易权限、市场秩序、样品机权限 */
      const { code, data } = await this.mineServer.getCustomerBasicInformation(this.userInf.customerCode);

      if (code === '1') {
        this.customerBasicInformation = data;
      }
    },
    async getZhengCheAndFinancialDto() {
      /* 整车权限、金融服务 */
      const { code, data } = await this.mineServer.getZhengCheAndFinancialDto(this.userInf.customerCode);
      if (code === '1') {
        this.zhengCheAndFinancialDto = data;
      }
    },
    async getCustomerSigned() {
      /* 基本信息-签约信息 */
      const { code, data } = await this.mineServer.getCustomerSigned(this.userInf.customerCode);
      if (code === '1') {
        const tmp = data;
        const contractMessageDtoList = [];
        console.log(tmp);

        // 签约品牌编码转化为数组
        for (let index = 0; index < tmp.contractMessageDtoList.length; index++) {
          const element = tmp.contractMessageDtoList[index];
          if (element.brandName) {
            const tagList = element.brandName.split(',');
            element.tagList = tagList;
            contractMessageDtoList.push(element);
          } else {
            element.tagList = [];
          }
        }

        this.customerSigned = {
          total: data.total,
          contractMessageDtoList
        };
        console.log(this.customerSigned);
      }
    },
    async getBranchInformationUpCallback(pages) {
      /* 上推加载 */
      const scrollView = await this.getBranchInformation(pages);
      this.mescroll.endBySize(scrollView.pageSize, scrollView.total);
    },
    async getBranchInformation(pages) {
      /* 基本信息- 门店信息 */
      const { code, data } = await this.mineServer.getBranchInformation({
        customerCode: this.userInf.customerCode,
        ...pages
      });
      const scrollView = {};
      if (code === '1') {
        // 标记门店信息已经加载成功
        this.isStoreInfLoaded = true;
        this.branchInformation = this.branchInformation.concat(data.branchInformationDtoList || []);
        scrollView.pageSize = 15;
        scrollView.total = data.total;
      } else {
        this.mescroll.endErr();
      }
      return scrollView;
    },
    getValueSync(value) {
      /* 区域代码 */
      return this.cocService.getValueSync({
        parentValueLow: '',
        value,
        valueSetId: 'BranchCode'
      });
    },
    async customersFun() {
      /* 送达方列表 */
      console.log('customers');
      const { code, data } = await this.mineServer.customers(this.userInf.customerCode);
      if (code === '1') {
        // 优先展示
        this.customers = data;
        const tradeCodes = data.map(v => v.tradeCode);
        // 二次渲染中心
        const { code: centerCode, data: centerData } = await this.getValueSync(tradeCodes);
        if (centerCode === '1') {
          this.customers.forEach((v, index) => {
            // this.$set(v, 'centerName', centerData[index].valueMeaning);
          });
        }
      }
    },
    async auxiliaryFun(salesGroupCode, status) {
      /* 付款方列表 */
      const { code, data } = await this.mineServer.auxiliary(salesGroupCode, status, this.userInf.salesGroupCode);
      if (code === '1') {
        this.auxiliary = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          element.balance = 0.00;
          this.auxiliary.push(element);
        }
        this.payerBalanceListFun(data);
      }
    },
    // 付款方余额
    async payerBalanceListFun(param) {
      const { code, data } = await this.mineServer.payerBalanceList(param);
      if (code === '1') {
        this.payerBalanceList = [];
        for (let index = 0; index < data.length; index++) {
          if (index < this.auxiliary.length) {
            const itme = this.auxiliary[index];
            if (data[index]) {
              itme.balance = data[index].balance;
            }
            this.payerBalanceList.push(itme);
          }
        }
      }
    },
    async setDefaultAction(customerCode) {
      const { code, data } = await this.customerService.relations(customerCode);
      if (code === '1') {
        this.customersFun();
      } else {
        uni.showToast({
          title: '设置失败，稍后重试',
        });
      }
    },
    async setFukuanDefaultAction(code2) {
      console.log(this.userInf);
      const { code, data } = await this.customerService.fukuanRelations(code2, this.userInf.salesGroupCode);
      if (code === '1') {
        this.auxiliaryFun(this.userInf.customerCode, 1);
      } else {
        uni.showToast({
          title: '设置失败，稍后重试',
        });
      }
    },
    tabClick(e) {
      /* 事件处理 */
      this.tabs = e;
      console.log(e);
      this.tabs.forEach((each) => {
        if (each.active) {
          this.index = each.id;
          console.log(`selectedIndex =>${this.index}`);
        }
      });
    },
    goOtherTab(index) {
      /* 去其他tab */
      this.tabs.forEach((v) => {
        v.active = false;
      });
      this.tabs[index].active = true;
      this.$nextTick(() => {
        this.activeTabName = `item${index}`;
        this.index = `${index}`;
      });
    }
  }
};
</script>

<style lang="scss">
  .bg {
    background: rgba(245, 245, 245, 1);
    min-height: calc(100vh - var(---window-top));
  }

  .jtabBg {
    background: white;
    position: sticky;
    top: var(--window-top);
    z-index: 99;
  }

  .block {
    padding: 24px;
    border-radius: 10px;
  }

  .aheadImage {
    background: url('./image/back.png') no-repeat;
    height: 28px;
    width: 30px;
    background-size: 100%;
    margin-top: 24px;
    margin-left: 24px;
  }

  .companyImage {
    background: url('./image/company.png') no-repeat;
    height: 88px;
    width: 88px;
    background-size: 100%;
    margin: 24px;
  }

  .firstItem {
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }

  .firstPageTitle {
    height: 80px;
    font-size: 32px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 80px;
    margin-left: 20px;
  }

  .firstPageLeft {
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
  }

  .firstPageRight {
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    line-height: 50px;
  }

  .firstPageRightGray {
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    margin-right: 30px;
  }

  .firstPageRightRed {
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    line-height: 50px;
  }

  .firstPageRightMore {
    font-size: 28px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 2px;
    margin-bottom: 10px;
  }

  .line {
    height: 2px;
    background: rgba(245, 245, 245, 1);
    margin-bottom: 20px;
  }

  .firstPageRightHasHttp {
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    line-height: 50px;
  }

  .http {
    font-size: 24px;
    font-weight: 400;
    color: #2283E2;
    line-height: 1;
    text-decoration: underline;
    margin-left: 10px;
  }

  .tailView {
    height: 160px;
    background: rgba(245, 245, 245, 1);
  }

  .secondTopBtn {
    height: 60px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    line-height: 40px;
    margin-right: 48px;
    text-align: right;
    margin-top: 20px;
  }

  .secondPageTitleContent {
    padding-top: 30px;
    // margin-top: 30px;
    margin-bottom: 30px;
  }

  .secondPageTitle {
    display: flex;
    align-items: center;
    // height: 96px;
    font-size: 32px;
    font-weight: 400;
    color: rgba(237, 40, 86, 1);
    // line-height: 76px;
    margin-left: 24px;
  }

  .tags {
    display: flex;
    font-size: 28px;
  }

  .tag {
    float: left;
    background: #ED2856;
    color: #fff;
    border-radius: 19px;
    height: 38px;
    line-height: 38px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    margin-right: 24px;
    font-size: 28px;
  }
  .mb24{
    margin-bottom: 24px;
  }
  .bg-white{
    background: #fff!important;
  }
  .bg-grey{
    background: #999 !important;
  }
  .br-b-dashed{
    border-bottom: 1px dashed #c3c3c3;
  }
  .pb20{
    padding-bottom: 20px;
  }
  .breakLine {
    border-top: 1px dashed #C3C3C3;
    margin-bottom: 20px;
  }

  .fithPageTitle {
    height: 44px;
    font-size: 32px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 44px;
    margin-left: 10px;
  }

  .fifthPageRight {
    height: 50px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 50px;
    margin-right: 30px;
    margin-top: 20px;
  }


  .myGuestView-sign-inf-tag {
    display: inline-block;
    float: left;
    background-color: #ED2856;
    color: #fff;
    border-radius: 19px;
    height: 38px;
    line-height: 38px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    font-size: 28px;
  }

  .myGuestView-mescroll-wrap {
    height: calc(100vh - var(--window-top) - 88px);
    border-radius: 10px;
    padding: 24px 24px 0 24px;
  }

  .myGuestView-store-item {
    background: #fff;
    margin-bottom: 24px;
    padding-bottom: 20px;
  }
</style>
