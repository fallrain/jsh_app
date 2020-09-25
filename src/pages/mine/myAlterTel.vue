<template>
  <view class="bg">
    <j-top-warning
      content="如果您的手机号已废弃收不到验证码，请拨打4008939888 转 1"
    ></j-top-warning>
    <view class="topLine"></view>
    <view class="myAlterTel-row">
      <view class="title">原手机号</view>
      <view class="value">{{form.oldPhone}}</view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">验证码</view>
      <input
        class="inputView"
        placeholder="请输入验证码"
        v-model="form.oldVerificationCode"
      >
      <view class="myAlterTel-row-right-wrap">
        <view class="myAlterTel-row-right-gap"></view>
        <j-verification-code
          :getMethod="getVerificationCodeByOldPhone"
        ></j-verification-code>
      </view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">新手机号</view>
      <input
        class="inputView"
        placeholder="请输入新手机号"
        v-model="form.newPhone"
      >
    </view>
    <view class="myAlterTel-row">
      <view class="title">验证码</view>
      <input
        class="inputView"
        placeholder="请输入验证码"
        v-model="form.newVerificationCode"
      >
      <view class="myAlterTel-row-right-wrap">
        <view class="myAlterTel-row-right-gap"></view>
        <j-verification-code
          :getMethod="getVerificationCodeByNewPhone"
        ></j-verification-code>
      </view>
    </view>
    <view class="myAlterTel-row">
      <view class="title">图形验证码</view>
      <input class="inputView" placeholder="请输入图形验证码">
      <image
        :src="form.captchaImage"
        @tap="changeAuthCode"
        class="myAlterTel-authcode-img-wrap ml24"
      ></image>
    </view>
    <button
      @tap="updatePhone"
      class="btnStyle"
    >修改
    </button>
  </view>
</template>
<script>

import JTopWarning from '../../components/common/JTopWarning';
import JVerificationCode from '../../components/common/JVerificationcode';
import JValidate from '@/lib/jValidate/JValidate';
import jValidateRules from '@/lib/jValidate/JValidateRules';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'myAlterTel',
  components: {
    JVerificationCode,
    JTopWarning
  },
  data() {
    return {
      form: {
        // 图形码
        captchaImage: '',
        // 图形验证码token
        captchaToken: '',
        // 原来的手机号
        oldPhone: '',
        // 老的验证码
        oldVerificationCode: '',
        // 新手机号
        newPhone: '',
        // 新手机号验证码
        newVerificationCode: '',
      }
    };
  },
  computed: {
    ...mapGetters({
      [USER.GET_TOKEN_USER]: USER.GET_TOKEN_USER,
    })
  },
  created() {
    this.setPageInfo();
  },
  methods: {
    setPageInfo() {
      this.getUserInfById();
      this.getCaptcha();
      this.genVdt();
    },
    genVdt() {
      this.vdt = new JValidate({
        _this: this,
        formData: this.form,
        rules: {
          oldPhone: {
            required: true,
            mobile: true
          },
          oldVerificationCode: {
            required: true
          },
          newPhone: {
            required: true,
            mobile: true
          },
          newVerificationCode: {
            required: true
          },
        },
        messages: {
          oldPhone: {
            required: '原手机号不能为空',
            mobile: '原手机号格式不正确'
          },
          oldVerificationCode: {
            required: '必须输入原手机验证码'
          },
          newPhone: {
            required: '新手机号不能为空',
            mobile: '新手机号格式不正确'
          },
          newVerificationCode: {
            required: '必须输入新手机验证码'
          },
        }
      });
    },
    async getUserInfById() {
      /* 获取原来的手机号 */
      // const data = await this.openAccountService.getUserInfById(this[USER.GET_TOKEN_USER].id);
      const data = await this.apiVService.getUserPhone();
      if (data) {
        this.form.oldPhone = data.phoneNumber;
        console.log(this.form.oldPhone);
      }
    },
    async getCaptcha() {
      /* 获取图形验证码 */
      const {
        captchaImage,
        captchaToken
      } = await this.openAccountService.getCaptcha();
      this.form.captchaImage = captchaImage;
      this.form.captchaToken = captchaToken;
    },
    async getVerificationCode(phoneNumber) {
      /* 发送手机验证码 */
      return this.openAccountService.getVerificationCode({
        phoneNumber,
        verificationCodeType: 'UNBINDING'
      });
    },
    getVerificationCodeByOldPhone() {
      if (this.form.oldPhone) {
        return this.getVerificationCode(this.form.oldPhone);
      }
      uni.showToast({
        title: '原手机号未获取',
        icon: 'none'
      });
    },
    getVerificationCodeByNewPhone() {
      if (jValidateRules.rules.mobile(this.form.newPhone)) {
        return this.getVerificationCode(this.form.newPhone);
      }
      uni.showToast({
        title: '请填正确格式的手机号',
        icon: 'none'
      });
    },
    changeAuthCode() {
      /* 改变图形码 */
      this.getCaptcha();
    },
    async updatePhone() {
      /* 修改绑定手机号 */
      this.getVerificationCodeByNewPhone();
      return;
      if (this.vdt.valid()) {
        const { code } = await this.openAccountService.checkVerificationCode({
          phoneNumber: this.form.oldPhone,
          verificationCode: this.form.oldVerificationCode,
          verificationCodeType: 'UNBINDING'
        });
      }
    }
  }
};
</script>

<style lang="scss">
  .bg {
    width: 750px;
    min-height: 1400px;
    background: rgba(245, 245, 245, 1)
  }

  .topLine {
    height: 24px;
    background: rgba(245, 245, 245, 1)
  }

  .myAlterTel-row {
    display: flex;
    align-items: center;
    height: 96px;
    background: #fff;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: 0;
    }

    .value {
      color: #333;
      font-size: 30px;
    }
  }

  .title {
    width: 172px;
    height: 48px;
    margin-left: 24px;
    margin-right: 24px;
    font-size: 34px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }

  .inputView {
    width: 278px;
    height: 96px;
  }

  .uni-input-placeholder {
    font-size: 34px;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }

  .lineView {
    height: 2px;
    background: rgba(245, 245, 245, 1);
  }

  .authCode {
    height: 96px;
    font-size: 34px;
    font-weight: 400;
    color: #1677FF;
    line-height: 96px;
  }

  .btnStyle {
    margin-top: 60px;
    width: 700px;
    height: 88px;
    background: rgba(237, 40, 86, 1);
    border-radius: 48px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    font-weight: 400;
    font-size: 30px;
    line-height: 88px;
  }

  .myAlterTel-row-right-wrap {
    display: flex;
    align-items: center;
  }

  .myAlterTel-row-right-gap {
    width: 1px;
    height: 44px;
    background: #eee;
    margin-left: 24px;
    margin-right: 24px;
  }

  .myAlterTel-authcode-img-wrap {
    width: 164px;
    height: 64px;

    image {
      width: 100%;
      height: 100%;
    }
  }

</style>
