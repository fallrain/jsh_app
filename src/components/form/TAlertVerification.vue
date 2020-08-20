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
            :getMethod="getVerificationCodeByNewPhone"
          ></j-verification-code>
        </view>
      
     </view>
    </view>             
</template>
<script>

import JVerificationCode from '../common/JVerificationcode';
import jValidateRules from '@/lib/jValidate/JValidateRules';
import JValidate from '@/lib/jValidate/JValidate';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
export default {
    name:"TAlertVerification",
    components: {
        // uniPopup,
        JVerificationCode,
    },
    props: {
        show: {
            type: Boolean,
        }
    },
    data() {
      return {
        form: {
          // 手机号
          phone: '',
          // 手机号验证码
          verificationCode: '',
        }
           
      }
    }, 
    created() {
      this.setPageInfo();
      this.getUserInfById();
    },
    computed: {
      ...mapGetters({
        userInf: USER.GET_USER,
        defaultSendToInf: USER.GET_DEFAULT_SEND_TO,  //售达方信息
         [USER.GET_TOKEN_USER]: USER.GET_TOKEN_USER,  //用户信息
      })  
    },
    methods: {
      setPageInfo() {
        this.genVdt();
        this.getUserInfMianMi()
      },
      genVdt() {
        this.vdt = new JValidate({
          _this: this,
          formData: this.form,
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
                required: '新手机号不能为空',
                mobile: '新手机号格式不正确'
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
      async getUserInfById() {
        /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
        const {code, data} =  await this.orderService.sendVerify(this.defaultSendToInf.customerCode);
         if (code === "1") {
          this.form.phone = data.data.account
        }
      },
      async getUserInfMianMi() {
        /* 根据客户/海尔编码获取bestSign系统的account(手机/邮箱) */
        const data =  await this.orderService.mianMi();
        console.log(data)
      },
      async getVerificationCode(phoneNumber) {
       
        return
        // if (code === "1") {
        //   console.log(data)
        //   this.YZM = data.data.verifyKey
        // }
      },
     
      getVerificationCodeByNewPhone() {
        if (jValidateRules.rules.mobile(this.form.phone)) {
            return this.getVerificationCode(this.form.phone);
        }
        uni.showToast({
            title: '请填正确格式的手机号',
            icon: 'none'
        });
      },

    }  
}
</script>
<style scoped>
/deep/ .JVerificationCode-send-code {
    font-size: 25px;
    margin-left: -400px;
    margin-top: -15px;
}
.TAlertVerification-cen {
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left: 0;
    background: #ccc;
    opacity: 0.8;
    z-index: 10000;
}
.TAlertVerification-model {
    position: absolute;
    width: 80%;
    height: 35%;
    top: 15%;
    padding: 5%;
    left: 10%;
    background: #fff;
    opacity: 1;
    z-index: 10001;
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
</style>