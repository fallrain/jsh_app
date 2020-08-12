<template>
    <view class="bg">
        <view class="jtabBg">
            <j-tab :tabs="tabs" :hasRightSlot="true" @tabClick="tabClick"></j-tab>
        </view>
        <!-- 基本信息 -->
        <view v-if="index == 0">
             <!-- 基本信息 -->
            <view class="block">
                <view style='display:flex'>
                    <view class="aheadImage"></view>
                    <view class="firstPageTitle">
                        基本信息
                    </view>
                </view>
                <view class="line"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">当前账户交易状态： </view>
                    <view class="firstPageRight">正常</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">本月提货次数： </view>
                    <view class="firstPageRight">252</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">本月提货金额： </view>
                    <view class="firstPageRightRed">  ¥ 3432.83(万)</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">最近交易日期： </view>
                    <view class="firstPageRight">2020-06-29</view>
                </view>
                <view class="blank"></view>
            </view>
            
            
            <!-- 交易权限 -->
            <!--
popCustomer: "冰箱AA、波轮洗衣机DA、滚筒洗衣机DB"
status: "正常" -->
            <view class="block">
                <view style='display:flex'>
                    <view class="aheadImage"></view>
                    <view class="firstPageTitle">交易权限</view>
                </view>
                <view class="line"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">门店状态：</view>
                    <view class="firstPageRightHasHttp">{{customerBasicInformation.shopFlag}}
                        <view class="http">门店信息详见门店列表</view>
                    </view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">云仓权限： </view>
                    <view class="firstPageRight">{{customerBasicInformation.yunCangPermissions}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">签约产品组： </view>
                </view>
                <view class="firstPageRightMore">{{customerBasicInformation.signProductGroup}}</view>
                 <view class="firstItem">
                    <view class="firstPageLeft">签约产品： </view>
                </view>
                <view class="firstPageRightMore">{{customerBasicInformation.signBrand}}</view>
                <view class="firstItem">
                    <view class="firstPageLeft">品牌标签： </view>
                </view>
                <view class="firstPageRightMore">{{customerBasicInformation.brandLabel}}</view>
                <view class="blank"></view>

            </view>

             <!-- 整车权限 -->
            <view class="block">
                <view style='display:flex'>
                    <view class="aheadImage"></view>
                    <view class="firstPageTitle">整车权限</view>
                </view>
                <view class="line"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">整车直发权限：  </view>
                     <!-- <view class="firstPageRightHasHttp">未开通
                        <view class="http">去开通</view>
                    </view> -->
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.zhengCheQuanXian}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">开通日期： </view>
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.zhengCheTime}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">整车到付未付款： </view>
                    <view class="firstPageRightRed">{{zhengCheAndFinancialDto.zhengCheUnpaid}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">最近交易日期： </view>
                    <view class="firstPageRight">2020-06-29</view>
                </view>
                <view class="blank"></view>
            </view>

            <!-- 样品机权限：  -->
            <view class="block">
                <view style='display:flex'>
                    <view class="aheadImage"></view>
                    <view class="firstPageTitle">样品机权限</view>
                </view>
                <view class="line"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">样品机权限： </view>
                    <view class="firstPageRight">{{customerBasicInformation.specimenMachineQuanXian}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">样品机开通产品： </view>
                </view>
                <view class="firstPageRightMore">{{customerBasicInformation.specimenMachineProduct}}</view>
                <view class="blank"></view>
            </view>
            <!-- 金融服务： -->
            <view class="block">
                <view style='display:flex'>
                    <view class="aheadImage"></view>
                    <view class="firstPageTitle">金融服务</view>
                </view>
                <view class="line"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">供应链金融：  </view>
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.supplyChainFinance}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">信用订单： </view>
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.creditOrder}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">开通日期：  </view>
                     <!-- <view class="firstPageRightHasHttp">未开通
                        <view class="http">去开通</view>
                    </view> -->
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.creditOrderTime}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">信用订单逾期产品：： </view>
                    <view class="firstPageRight">{{zhengCheAndFinancialDto.creditOrderOverdueProduct}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">市场秩序： </view>
                </view>
                <view class="firstPageRightMore">{{customerBasicInformation.marketOrder}}</view>
                <view class="blank"></view>
            </view>

            <view class="tailView"></view>
        </view>

        <!-- 签约信息 -->
        <view v-if="index == 1">
            <view class="secondTopBtn">
                履约查询
            </view>
            <view class="block">
                <view v-for="item in customerSigned.contractMessageDtoList">
                    <view class="secondPageTitle">{{item.contractname}}</view>
                    <view class="breakLine"></view>
                    <view class="firstItem">
                        <view class="firstPageLeft">区协议编码域 </view>
                        <view class="firstPageRight">{{item.contractno}}</view>
                    </view>
                    <view class="firstItem">
                        <view class="firstPageLeft">产品组编码</view>
                        <view class="firstPageRight">{{item.productName}}</view>
                    </view>
                    <view class="firstItem">
                        <view class="firstPageLeft">签约品牌编码 </view>
                        <view class="tags" >
                        <view style="margin-right:14px;">
                            <view class="tagsss" v-for="tag in item.tagList" :key="tag" style="float:left;background-color: #ED2856;color: white;border-radius: 10px; height:20px; padding-left:10px;padding-right:10px ;text-align: center;margin:2px">{{tag}}</view>
                        </view>
                        </view>
                    </view>
                    <view class="firstItem">
                        <view class="firstPageLeft">有效期</view>
                        <view class="firstPageRight">2019-01-01 至 2019-12-31</view>
                    </view>
                </view>
                <view class="blank"></view>
            </view>

            <view class="tailView"></view>

        </view>

        <!-- 门店信息 -->
        <view v-if="index == 2">
            <view class="block">
                <view v-for="item in branchInformation.branchInformationDtoList">
                    <view >
                    <view class="secondPageTitle">{{item.sbrName}}</view>
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
                    <view class="firstPageLeft">状态 </view>
                    <view class="tag" >
                        {{item.shopFlag}}
                    </view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">详细地址</view>
                </view>
                <view class="firstPageRightMore">{{item.specificAddress}}</view>
                </view>
                <view class="blank"></view>
                </view>
            </view>

            <view class="tailView"></view>

        </view>

         <!-- 送达方信息 -->
        <view v-if="index == 3">
            <view class="block">
                <view v-for="item in customers">
                    <view class="secondPageTitle">{{item.customerName}}</view>
                <view class="breakLine"></view>

                <view class="firstItem">
                    <view class="firstPageLeft">送达方编码</view>
                    <view class="firstPageRight">{{item.customerCode}}</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">送达方中心</view>
                    <view class="firstPageRight">{{}}???</view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">状态 </view>
                    <view v-if="item.deletedFlag == 1" class="tag" >
                        不正常
                    </view>
                    <view v-else class="tag" >
                        正常
                    </view>
                </view>
                <view class="firstItem">
                    <view class="firstPageLeft">是否默认</view>
                    <view v-if="item.defaultFlag" class="firstPageRight">取消默认设置</view>
                    <view v-else class="firstPageRight">默认设置</view>
                </view>
                <view class="firstPageRightMore">{{item.address}}</view>
                </view>
                
                <view class="blank"></view>
            </view>
            <view class="tailView"></view>

        </view>

         <!-- 付款方信息 -->
        <view v-if="index == 4">
            <view class="block">
                <view style="display:flex">
                    <view class="companyImage"></view>
                    <view>
                        <view class="fifthPageRight">（8800342633）</view>
                        <view class="fithPageTitle">青岛鸿程永泰商贸有限公司</view>
                    </view>
                </view>
                <view class="breakLine"></view>
                <view class="firstItem">
                    <view class="firstPageLeft">账户总额：</view>
                    <view class="firstPageRightRed">¥{{accountTotal}}</view>
                </view>
            </view>

            <view v-for="item in auxiliary">
                <view class="block">
                    <view class="secondPageTitle">{{item.customerName}}</view>
                    <view class="breakLine"></view>
                    <view class="firstItem">
                        <view class="firstPageLeft">付款方编码</view>
                        <view class="firstPageRight">{{item.customerCode}}</view>
                    </view>
                    <view class="firstItem">
                        <view class="firstPageLeft">帐户余额</view>
                        <view class="firstPageRightRed">¥ 2323.45</view>
                    </view>
                    <view class="firstItem">
                        <view class="firstPageLeft">是否默认</view>
                        <view v-if="item.defaultFlag" class="firstPageRight">取消默认设置</view>
                        <view v-if="item.defaultFlag" class="firstPageRight">设置为默认设置</view>
                    </view>
                <view class="blank"></view>
            </view>
        </view>

            

            <view class="tailView"></view>
        </view>

    </view>
</template>

<script>

import JTab from '../../components/common/JTab';
import userTypes from '../../store/mutationsTypes/userTypes';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
      JTab
  },
  data () {
    // 这里存放数据
    return {
        tabs: [
            
            {
            id: 0,
            name: '基本信息',
            active: true 
            },
            {
            id: 1,
            name: '签约信息',
            active: false
            },
            {
            id: 2,
            name: '门店信息',
            active: false
            },
            {
            id: 3,
            name: '送达方信息',
            active: false
            },
            {
            id: 4,
            name: '付款方信息',
            active: false
            },
        ],
        index:0,
        // 基本信息-交易权限、市场秩序、样品机权限
        customerBasicInformation:{},
        //   基本信息-整车权限、金融服务
        zhengCheAndFinancialDto:{},
        //   签约信息
        customerSigned:{},
        //   门店信息
        branchInformation:{},
        // 送达方列表
        customers:{},
        // 付款方列表
        auxiliary:{},
        // 付款方账户总额
        accountTotal:''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
      
      index(newVal,oldVal) {
          let userId = '8700010462';
          switch (newVal) {
                case 1: 
                    {
                        this.getCustomerSigned(userId,1,10);
                    }
                  
                  break;
                case 2: 
                    {
                        this.getBranchInformation(userId,1,10);
                    }
                  
                  break;
                // 送达方信息
                case 3: 
                    {
                        this.customersFun(userId,1,10);
                    }
                  
                  break;
                // 付款方列表
                case 4: 
                    {
                        this.auxiliaryFun(2110,1);
                    }
                  
                  break;
          
              default:
                  break;
          }
      }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  onLoad: function (option) {
    this.index = JSON.parse(decodeURIComponent(option.index));
    var tmpTabs = [];
    for (let index = 0; index < this.tabs.length; index++) {
        const element = this.tabs[index];
        if(element.id == this.index) {
            element.active = true;
        } else {
            element.active = false;
        }
        tmpTabs.push(element);
    }
    this.tabs = tmpTabs;
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
      let userId = '8700010462';
    //   this.getCustomerBasicInformation(userId);
    //   this.getZhengCheAndFinancialDto(userId);
            //   this.getCustomerSigned(userId,1,10)
    //   this.getBranchInformation(userId,1,10);
  },
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    //   网络请求
    // 基本信息-交易权限、市场秩序、样品机权限
    async getCustomerBasicInformation(userId) {
        const { code, data }  = await this.mineServer.getCustomerBasicInformation(userId);
        
        if(code === '1') {
            this.customerBasicInformation = data;
            console.log(data)
        }
    },
    // // 基本信息-交易权限、市场秩序、样品机权限
    async getZhengCheAndFinancialDto(userId) {
        const { code, data }  = await this.mineServer.getZhengCheAndFinancialDto(userId);
        if(code === '1') {
            this.zhengCheAndFinancialDto = data;
            console.log(data)
        }
    },
    // 基本信息- 签约信息
    async getCustomerSigned(userId,page,pageSize) {
        console.log('getCustomerSigned')
        const { code, data }  = await this.mineServer.getCustomerSigned(userId,page,pageSize);
        if (code === '1') {
            let tmp = data;
            let contractMessageDtoList = [];
            console.log(tmp)
            
            // 签约品牌编码转化为数组
            for (let index = 0; index < tmp.contractMessageDtoList.length; index++) {
                const element = tmp.contractMessageDtoList[index];
                let tagList = element.brandName.split(",");
                element.tagList = tagList;
                contractMessageDtoList.push(element);
            }

            this.customerSigned = {
                total:data.total,
                contractMessageDtoList:contractMessageDtoList
            }
             console.log(this.customerSigned)
        }
    },
    // // 基本信息- 门店信息
    async getBranchInformation(userId,pageNum,pageSize) {
        console.log('getBranchInformation')
        const { code, data }  = await this.mineServer.getBranchInformation(userId,pageNum,pageSize);
        if(code === '1') {
            this.branchInformation = data;
            console.log(data)
        }
    },
    // 送达方列表
    async customersFun(userId) {
        console.log('customers')
        const { code, data }  = await this.mineServer.customers(userId);
        if(code === '1') {
            this.customers = data;
            console.log(data)
        }
    },
    // 付款方列表
    async auxiliaryFun(salesGroupCode,status) {
        console.log('auxiliaryFun')
        const { code, data }  = await this.mineServer.auxiliary(salesGroupCode,status);
        if(code === '1') {
            // this.accountTotal = 0;
            // for (let index = 0; index < data.length; index++) {
            //     const element = data[index];
            //     this.accountTotal = this.accountTotal + element.
            // }
            this.auxiliary = data;
            console.log(data)
        }
    },
    //   事件处理
    tabClick(e) {
        this.tabs = e;
        console.log(e);
        this.tabs.forEach((each) => {
        if (each.active) {
          this.index = each.id;
          console.log("selectedIndex =>"+this.index)
        }
      });
    },

  }
}
</script>

<style scoped>
.bg {
    background:rgba(245,245,245,1);
    min-height:1400px;
}
.jtabBg {
    background:white;
    position: sticky;
    top: var(--window-top);
    z-index: 99;
}
.block {
    margin: 24px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-bottom: 50px;
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
.blank {
    height: 10px;
}
.firstItem {
    display: flex;
    justify-content: space-between;
}
.firstPageTitle {
    height:80px;
    font-size:32px;
    font-weight:300;
    color:rgba(51,51,51,1);
    line-height:80px;
    margin-left: 20px;
}
.firstPageLeft{
    height:60px;
    font-size:28px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:50px;
    margin-left: 30px;
}
.firstPageRight {
    height:60px;
    font-size:28px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:50px;
    margin-right: 30px;
}
.firstPageRightRed {
    height:60px;
    font-size:28px;
    font-weight:400;
    color:rgba(237,40,86,1);
    line-height:50px;
    margin-right: 30px;
}
.firstPageRightMore {
    font-size:28px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:40px;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 2px;
    margin-bottom: 10px;
}

.line {
    height: 2px;
    background:rgba(245,245,245,1);
    margin-bottom: 20px;
}
.firstPageRightHasHttp {
    display: flex;
    height:60px;
    font-size:28px;
    font-weight:400;
    color:rgba(237,40,86,1);
    line-height:50px;
    margin-right: 30px;
}
.http {
    height:50px;
    font-size:24px;
    font-weight:400;
    color:#2283E2;
    line-height:50px;
    text-decoration:underline;
    margin-left: 10px;
}
.tailView {
    height: 160px;
    background:rgba(245,245,245,1);
}
.secondTopBtn {
    height:60px;
    font-size:28px;
    font-weight:400;
    color:rgba(237,40,86,1);
    line-height:40px;
    margin-right: 48px;
    text-align: right;
    margin-top: 20px;
}
.secondPageTitle {
    height:96px;
    font-size:32px;
    font-weight:400;
    color:rgba(237,40,86,1);
    line-height:96px;
    margin-left: 24px;
}
.tags {
    display: flex;
    font-size:28px;
}
.tag {
    float:left;
    background-color: #ED2856;
    color: white;
    border-radius: 10px; 
    height:40px; 
    padding-left:10px;
    padding-right:10px;
    text-align: center;
    margin-right:24px;
    font-size:28px;
}

.breakLine {
    border-top:1px dashed #C3C3C3;
    margin-bottom: 20px;
}
.fithPageTitle {
    height:44px;
    font-size:32px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:44px;
    margin-left: 10px;
}
.fifthPageRight {
    height:50px;
    font-size:28px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:50px;
    margin-right: 30px;
    margin-top: 20px;
}

</style>
