<template>
   <view class="TAlertVerification" v-show="show">
      <view class="TAlertVerification-cen"
            @tap="cancel"
      >
      </view>
      <view class="TAlertVerification-model">
         <view class="TAlertVerification-title">请输入验证码</view>
         <view class="TAlertVerification-row">
            <view class="TAlertVerification-send">发送至</view>
            <input
              class="TAlertVerification-inputView"
              placeholder="请输入手机号"
              placeholder-class="col_c"
              v-model="form.phone"
            >
         </view>
         <view class="TAlertVerification-row">
            <view class="TAlertVerification-send">验证码</view>
            <input
              class="TAlertVerification-inputView"
              placeholder="请输入验证码"
              placeholder-class="col_c"
              v-model="form.verificationCode"
            >
         </view>
         <view class="TAlertVerification-row-right-wrap">
            <view class="TAlertVerification-row-right-gap"></view>
            <j-verification-code
              :getMethod="getVerificationCodeByPhone"
            ></j-verification-code>
            <button class="TAlertVerification-row-right-btn"
                    @tap="determine"
            >确定</button>
         </view>

      </view>
   </view>
</template>
<script>
import JVerificationCode from '../common/JVerificationcode';
import JValidate from '@/lib/jValidate/JValidate';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'JSamplemachineAlert',
  components: {
    // uniPopup,
    JVerificationCode,
  },
  props: {
    show: {
      type: Boolean,
    },
    form: {
      type: Object,
      default: () => {}
    },
    confirmInfo: {
      type: Object,
      default: () => {}
    },
    currentPayer: {
      type: Object,
      default: () => {}
    },
    typpew: {
      type: String
    },
    // phone: {
    //   type: String
    // }
  },
  data() {
    return {
      erifyKey: 0,
      // 订单返回数据
      orderData: [],
      // 提交订单单号
      orderNo: ''

    };
  },
  created() {
    console.log(this.confirmInfo);
    console.log(this.currentPayer);
    this.setPageInfo();
    this.getSampleOrder();
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO, // 售达方信息
      [USER.GET_TOKEN_USER]: USER.GET_TOKEN_USER, // 用户信息
    })
  },
  methods: {
    // 生成样品机单号
    async getSampleOrder() {
      const { code, data } = await this.samplemachineService.getSampleOrder({
        timestamp: Date.parse(new Date())
      });
      if (code === '1') {
        this.orderNo = data.data.YBR_SEQ;
      }
    },
    setPageInfo() {
      this.genVdt();
    },
    genVdt() {
      this.vdt = new JValidate({
        _this: this,
        rules: {
          phone: {
            required: true,
            mobile: true
          },
          verificationCode: {
            required: true
          },
        },
        messages: {
          phone: {
            required: '手机号不能为空',
            mobile: '手机号格式不正确'
          },
          verificationCode: {
            required: '必须输入新手机验证码'
          },
        }
      });
    },
    cancel() {
      this.$emit('update:show', false);
    },

    async getVerificationCode() {
      // 发送验证码
      const { code, data } = await this.samplemachineService.sendMessage({
        account: this.saleInfo.customerCode,
        productCode: this.confirmInfo.CODE,
        orderNo: this.orderNo,
        whCode: this.confirmInfo.detailList[0].YGS_LGORT,
        werks: this.confirmInfo.detailList[0].YGS_WERKS
      });
      if (code === '1') {
        console.log(data.data.verifyKey);
        this.erifyKey = data.data.verifyKey;
        uni.showToast({
          title: '短信发送成功',
        });
      }
    },
    getVerificationCodeByPhone() {
      if (this.form.phone) {
        return this.getVerificationCode();
      }
      uni.showToast({
        title: '原手机号未获取',
        icon: 'none'
      });
    },
    // 点击确定
    async determine() {
      if (this.form.verificationCode) {
        // 提交订单
        /* const { code, data } = await this.transfergoodsService.submitDhOrder({
          timestamp: Date.parse(new Date()),
          longfeiUSERID: Number(this.saleInfo.customerCode),
          orderNo: Number(SEQ),
          verifyCode: Number(this.form.verificationCode),
          verifyKey: `${this.erifyKey}`,
        }); */
        const {code, data} = await this.samplemachineService.submitOrder([
          {
            FACTORYTYPE: '1',
            ISFL: '2',
            ISKPO: '0',
            MAINCHANNEL: this.saleInfo.channel,
            MKTID: this.saleInfo.tradeCode,
            PAYTO_NAME: this.saleInfo.customerName,
            PAYTO_TYPE: '00',
            PRODUCT_MODEL: 'KFR-35GW/03EBA23AU1套机',
            SENDTO_ADDRESS: '测试账号',
            SENDTO_NAME: '青岛鸿程永泰商贸有限公司',
            SUBCHANNEL: this.saleInfo.subChannel,
            WHCODE: this.confirmInfo.detailList[0].YGS_LGORT,
            WHNAME: this.confirmInfo.detailList[0].YGS_LGOBE,
            YJMFID: 'B1001312',
            YJMFID_NAME: 'B1001312',
            actPrice: '2310.0',
            bateMoney: '0',
            bateRate: '0',
            brand: '000',
            canChange: true,
            invcode: 'AA9WG9072',
            invsort: 'CA',
            invstd: '海尔家用空调KFR-35GW/03EBA23AU1套机1.5P变频白',
            longfeiMFID: '8800101954',
            lossPrice: '1617.00',
            lossRate: '0.3',
            maxNum: '',
            minNum: '',
            num: '',
            orderSource: '',
            payto: '8800101954',
            realPrice: '2310.0',
            searchImage: 'http://file.c.haier.net/docs/2017/04/28/517bc33f4fe03fe9f1b07682e450d37a.jpg180',
            seq: 'YJ0210000403',
            summoney: 161,
            unitPrice: '1617.00',
            userId: '8800101954',
            werks: '2002',
            yuncang: 'false',
          }
        ])
        if (code === '1' && data.code === '200') {
          uni.showToast({
            title: data.message,
          });
          this.getCargoDispose();
        } else {
          uni.showToast({
            title: `${data.message}`,
          });
        }
      } else {
        uni.showToast({
          title: '请输入验证码',
        });
      }
    },
    // 提交订单返回数据
    async getCargoDispose() {
      // let SEQ = '';
      // this.allOrderList.forEach((ele) => {
      //   if (ele.checked) {
      //     SEQ = ele.IBR_SEQ;
      //   }
      // });
      console.log(this.seq);
      console.log(Number(this.seq));
      const dispose = await this.transfergoodsService.cargoDispose({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        OrderForm: Number(this.seq)
      });
      console.log(Number(this.seq));
      if (dispose.code === '1' && dispose.data.code === '200') {
        console.log(dispose.data.data[0]);
        const page = dispose.data.data[0];
        console.log(page);
        if (page) {
          console.log(2222222);
          page.orderList.forEach((item) => {
            console.log(item.ISFLAG);
            if (item.ISFLAG == '订单提交中') {
              uni.showLoading({
                title: '加载中'
              });
            } else {
              console.log(4444444444444);
              uni.hideLoading();
              this.allOrderList.forEach((ele, i) => {
                if (this.seq == ele.data.IBR_SEQ) {
                  this.allOrderList.splice(i, 1);
                }
              });
              console.log(5555555555555555555555);
              this.cancel();
              this.orderData = JSON.stringify(dispose.data.data);
              console.log(this.orderData);
              uni.navigateTo({
                url: `/pages/shoppingCart/orderConfirmAccept?seqList=${this.seq}&orderData=${this.orderData}`
              });
              console.log(111);
            }
          });
        }
      }
    },
  }
};
</script>
<style scoped>
/deep/ .JVerificationCode-send-code {
    font-size: 25px;
    margin-left: -400px;
    margin-top: -15px;
}
.TAlertVerification-row-right-gap {
    display: flex;
}
.TAlertVerification-cen {
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left: 0;
    background: #ccc;
    opacity: 0.8;
    z-index: 888;
}
.TAlertVerification-model {
    position: fixed;
    width: 80%;
    height: 35%;
    top: 15%;
    padding: 5%;
    left: 10%;
    background: #fff;
    opacity: 1;
    z-index: 889;
}
.TAlertVerification-row {
    display: flex;
    margin-bottom: 30px;

}
.TAlertVerification-title {
    font-size: 30px;
    margin-bottom: 40px;
    margin-top: 40px;
}
.TAlertVerification-send {
    width: 200px;
    height: 70px;
    background: #f9f9f9;
    line-height: 70px;
    text-align: center;
    font-size:26px;
    border:2px solid #c9c9c2;
    color: #333;
}
.TAlertVerification-inputView {
    width: 500px;
    height: 70px;
    font-size:26px;
    line-height: 70px;
    text-align: center;
    border:2px solid #c9c9c2;
    color: #333;
}
.col_c {
    color:#ccc;
}
.TAlertVerification-row-right-btn {
    /* width: 105px; */
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #333;
    font-size: 26px;
    background: #f9f9f9;
    border:1px solid #ccc;
    border-radius: 10px;
    position: fixed;
    top: 42%;
    left: 70%;
}
</style>
