<template>
<view class="sampleMachineConfirm">
  <view class="product-confirm">
    <view class="product-info">
      <view class="product-info-top ">
        <view class="sampleMachineConfirm-img-wrap">
          <image :src="confirmInfo.SEARCHIMAGE"></image>
        </view>
        <view class="sampleMachineConfirm-inf">
          <view class="sampleMachineConfirm-inf-title">
            {{confirmInfo.NAME}}
          </view>
          <view class="dis-flex justify-sb">
            <view class="sampleMachineConfirm-price">
              ¥ {{confirmInfo.$allPrice.UnitPrice}}
            </view>
            <uni-number-box
              :min="0"
              v-model="choosedNum"
              @change="change"
            ></uni-number-box>
          </view>
        </view>
      </view>
      <view class="product-info-bottom">
        <view>
          <text class="mr20">直扣：{{toPercent(confirmInfo.$allPrice.ReLossRate)}}%</text>
          <text>供价：￥{{confirmInfo.$allPrice.ActPrice }}</text>
          <text>开票价：￥{{confirmInfo.$allPrice.UnitPrice }}</text>
        </view>
        <view v-if="confirmInfo.detailList">
          库存：{{confirmInfo.detailList[0].YGS_KYKCL}}
        </view>
        <view>
          库位：{{confirmInfo.detailList[0].YGS_LGOBE}}
        </view>
      </view>
    </view>
    <view class="payfor-info">
      <view class="dis-flex pos-r">
        <view class="">付款方：</view>
        <view class="payer-show"
              @tap="toggleExpand">
          ({{currentPayer.payerCode}}){{currentPayer.payerName}}
          <i
            class="iconfont iconxia normal pull-right"
          ></i>
        </view>
      </view>
      <view class="dis-flex">
        <view class="">可用余额：</view>
        <view v-if="currentPayer.balance" class="text-theme">￥{{currentPayer.balance}}</view>
        <view v-if="currentPayer.bookBalance" class="text-theme">￥{{currentPayer.bookBalance}}</view>
      </view>
      <view class="dis-flex">
        <view class="">物流托管仓：</view>
        <view class="">
          <j-switch
            :active.sync="isSend"
            inf="直发"
            @change="switchChange"
          ></j-switch>
        </view>
      </view>
      <!--<view class="dis-flex">
        <view class="">验证码：</view>
        <view class="">青岛鸿程永泰商贸有限公司</view>
      </view>-->
    </view>
  </view>
  <view class="payfor-info-bottom">
    <view class="">
      总价：<text class="text-theme">￥{{totalMoney}}</text>
    </view>
    <button
      @tap="sureOrder"
      type="button">确认订单</button>
  </view>
  <j-pop-picker
    title="付款方"
    :show.sync="payerPickerShow"
    :options="payerList"
    :choseOptions.sync="currentChoosePayer"
    @change="changePayer"
  ></j-pop-picker>
  <!-- 验证码弹窗 -->
  <j-samplemachine-alert
    :show.sync="isShowVf"
    :form="form"
    :confirmInfo="confirmInfo"
    :currentPayer="currentPayer"
  ></j-samplemachine-alert>
</view>
</template>
<script>
import JSwitch from '../../components/form/JSwitch';
import JPopPicker from '../../components/form/JPopPicker';
import JSamplemachineAlert from '../../components/sampleMachine/JSamplemachineAlert';
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/sampleMachineConfirm.scss';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';


export default {
  name: 'sampleMachineConfirm',
  components: {
    JSwitch,
    JPopPicker,
    uniNumberBox,
    JSamplemachineAlert
  },
  data() {
    return {
      isShowVf: false,
      form: {
        // 手机号
        phone: '',
        // 手机号验证码
        verificationCode: '',
      },
      totalMoney: 0,
      isSend: true,
      payerPickerShow: false,
      choosedNum: 1,
      confirmInfo: {},
      currentPayer: {},
      currentChoosePayer: [],
      payerList: [],
      isExpand: false
    };
  },
  onLoad(option) {
    const { confirmInfo } = option;
    this.confirmInfo = JSON.parse(confirmInfo);
    this.getpayerList();
    // 计算总价格
    this.totalMoney = (this.confirmInfo.$allPrice.UnitPrice * this.choosedNum).toFixed(2);
    this.getUserInfById();
    console.log(this.confirmInfo);
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE
    }),
    toPercent() {
      return function (val) {
        return (Math.round(val * 10000) / 100).toFixed(2);
      };
    }
  },
  watch: {
    choosedNum(val) {
      this.totalMoney = (this.confirmInfo.$allPrice.UnitPrice * val).toFixed(2);
    }
  },
  methods: {
    sureOrder() {
      const money = this.currentPayer.balance || this.currentPayer.bookBalance;
      if (parseFloat(money) < parseFloat(this.totalMoney)) {
        uni.showToast({
          title: '余额不足，请切换付款方'
        });
        return;
      }
      this.isShowVf = true;
      console.log(this.currentPayer);
    },
    changePayer(payerInfo) {
      this.currentPayer = this.payerList.find(v => v.payerCode === payerInfo[0]);
    },
    change(val) {
      this.choosedNum = val;
    },
    switchChange(val) {
      console.log(val);
    },
    async getpayerList() {
      const { code, data } = await this.customerService.getcustomersList(this.saleInfo.customerCode, {
        salesGroupCode: this.saleInfo.salesGroupCode,
        status: 1
      });
      if (code === '1') {
        // this.payerList = data;
        this.getInquire(data);
      }
    },
    // 请求余额支付信息
    async getInquire(payerList) {
      const codeForm = [];
      payerList.forEach((item) => {
        codeForm.push({
          payerCode: item.payerCode,
          salesGroupCode: this.saleInfo.salesGroupCode
        });
      });
      const { code, data } = await this.customerService.inquire(codeForm);
      if (code === '1') {
        payerList.forEach((item) => {
          const balanceObj = data.find(v => v.payerCode === item.customerCode);
          item.balance = balanceObj.balance;
          item.bookBalance = balanceObj.bookBalance;
          item.salesGroupCode = balanceObj.salesGroupCode;
          item.key = item.payerCode;
          item.value = `(${item.payerCode}) ${item.payerName}`;
        });
        this.currentPayer = payerList[0];
        payerList[0].choosed = true;
        this.currentChoosePayer = [];
        this.currentChoosePayer[0] = this.currentPayer.key;
        this.payerList = payerList;
        console.log(this.payerList);
      }
    },
    toggleExpand() {
      this.payerPickerShow = true;
    },
    choosedPayer(item, index) {
      this.currentPayer = item;
      this.payerList.forEach((v) => {
        v.choosed = false;
      });
      this.payerList[index].choosed = true;
    },
    async getUserInfById() {
      /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
      const { code, data } = await this.orderService.sendVerify(this.saleInfo.customerCode);
      if (code === '1') {
        const abc = data.data.account;
        this.form.phone = abc.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
      console.log(this.form.phone);
    }
  }
};
</script>
