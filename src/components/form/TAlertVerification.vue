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
  name: 'TAlertVerification',
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
    allOrderList: {
      type: Array,
      default: () => []
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
      // form: {
      //   // 手机号
      //   phone: '',
      //   // 手机号验证码
      //   verificationCode: '',
      // }
      erifyKey: 0,
      // 订单返回数据
      orderData: [],
      // 提交订单单号
      seq: 0,
      index: 0

    };
  },
  created() {
    this.setPageInfo();
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
    setPageInfo() {
      this.genVdt();
    },
    genVdt() {
      this.vdt = new JValidate({
        _this: this,
        //   formData: this.form,
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
      //  return await this.orderService.send(this.saleInfo.customerCode)
      const { code, data } = await this.orderService.send(this.saleInfo.customerCode);
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
      console.log(this.allOrderList);
      if (this.form.verificationCode) {
        if (this.typpew === 'ZC') {
          console.log(this.typpew);
          console.log('999999');
          this.$emit('update:show', false);
          this.$emit('zhengCheUp', Number(this.form.verificationCode), this.erifyKey);
        } else {
          console.log('888888');
          let SEQ = 0;
          this.allOrderList.forEach((ele) => {
            if (ele.checked) {
              console.log(ele);
              SEQ = ele.data.IBR_SEQ;
              this.seq = SEQ;
              console.log(SEQ);
            }
          });
          // 提交订单
          const { code, data } = await this.transfergoodsService.submitDhOrder({
            timestamp: Date.parse(new Date()),
            longfeiUSERID: Number(this.saleInfo.customerCode),
            orderNo: Number(SEQ),
            verifyCode: Number(this.form.verificationCode),
            verifyKey: `${this.erifyKey}`,
          });
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
        const _this = this;
        console.log(page);
        if (page) {
          console.log(2222222);

          if (page.orderList.find(item => item.ISFLAG == '订单提交中')) {
            uni.showLoading({
              title: '加载中'
            });
            setTimeout(() => {
              _this.getCargoDispose();
            }, 1000);
          } else {
            this.index = 0;
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
