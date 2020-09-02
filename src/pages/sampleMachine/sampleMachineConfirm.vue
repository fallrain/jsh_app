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
              v-model="confirmInfo.number"
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
            :active.sync="goods.isSend"
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
      总价：<text class="text-theme">￥2345</text>
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
</view>
</template>
<script>
import JSwitch from '@/components/form/JSwitch';
import JPopPicker from '@/components/form/JPopPicker';
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
    uniNumberBox
  },
  data() {
    return {
      payerPickerShow: false,
      choosedNum: 0,
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
  methods: {
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
    }
  }
};
</script>
