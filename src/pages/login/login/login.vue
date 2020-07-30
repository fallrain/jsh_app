<template>
  <view class='login-main'>
    <view class='login-banner'>
    </view>
    <view class='login-banner-title'>巨商汇账号登陆</view>
    <view
      v-if="loginType === 'account'"
      class='mt116'
    >
      <view>
        <j-input
          key='accountUser'
          name='account'
          v-model="form.account"
          placeholder='请输入登录账号'
          handChange="this.valChange"
          :maxLength="300"
        ></j-input>
      </view>
      <view class='mt60'>
        <j-input
          key='accountPassword'
          name='password'
          v-model="form.password"
          placeholder='请输入登录密码'
          :password="isHidePwd"
        >
          <template
          >
            <view class='login-pwd-icon-wrap'>
              <view
                :class="['iconfont', isHidePwd ? 'iconbiyan' : 'iconyanjing']"
                @click="togglePwdStyle"
              ></view>
            </view>
          </template>
        </j-input>
      </view>
    </view>
    <view class='mt116' v-else>
      <view>
        <j-input
          key='SMSUser'
          name='account'
          value="form.mobile"
          placeholder='请输入手机号'
          handChange="this.valChange"
        ></j-input>
      </view>
      <view class='mt60'>
        <j-input
          key='SMSCode'
          name='SMSCode'
          value="form.SMSCode"
          placeholder='请输入短信验证码'
          handChange="this.valChange"
        >
          <template
            #right=""
          >
            <view class='login-pwd-icon-wrap'>
              <view
                class='login-get-sms-code'
                @click="getSMSCode"
              >获取验证码
              </view>
            </view>
          </template>
        </j-input>
      </view>
    </view>
    <view class="login-btns-wrap">
      <Button
        class="login-primary-btn"
        @click="login"
      >登录
      </Button>
      <Button
        class="login-default-btn mt40"
        @click="toggleSMSLogin"
      >{{loginType === 'SMS' ? '账号登录' : '短信验证码登录'}}
      </Button>
    </view>
    <view class='login-protocol-wrap'>
      <j-radio
        :type="2"
        :checked.sync="isRead"
      ></j-radio>
      <text class='login-protocol-text'>我已阅读并同意《软件许可及服务条款》</text>
    </view>
    <view class='login-other-wrap'>
      <view class='login-other-line'/>
      <view class='login-other-text'>其他方式登录</view>
    </view>
    <view class='login-other-btns'>
      <view class='iconfont iconweixin'/>
    </view>
    <view class='login-btm-wrap'>
      <view class='login-btm-text'>忘记密码</view>
      <view class='login-btm-line'/>
      <view class='login-btm-text'>客服电话：400-898-6666</view>
    </view>
  </view>
</template>

<script>
import {
  mapMutations
} from 'vuex';
import JInput from '../../../components/form/JInput';
import JRadio from '../../../components/form/JRadio';
import {
  USER
} from '../../../store/mutationsTypes';

export default {
  name: 'Login',
  components: {
    JRadio,
    JInput
  },
  data() {
    return {
      // 登录表单
      form: {
        // 账号
        account: '',
        // 密码
        password: '',
        // 手机号
        mobile: '',
        // 短信验证码
        SMSCode: ''
      },
      hasReadCheckboxOption: [
        {
          value: '1',
          label: '',
        }
      ],
      hasReadCheckedList: ['1'],
      // 是否隐藏密码
      isHidePwd: true,
      // 登录方式，默认账户密码
      loginType: 'account',
      // 是否已读
      isRead: true
    };
  },
  methods: {
    ...mapMutations([
      USER.UPDATE_USER
    ]),
    hasReadHandleChange(hasReadCheckedList) {
      /* 已读事件 */
      this.hasReadCheckedList = hasReadCheckedList;
    },
    togglePwdStyle() {
      /* 切换密码框样式 */
      this.isHidePwd = !this.isHidePwd;
    },
    toggleSMSLogin() {
      /* 切换短信验证码登录 */
      this.loginType = this.loginType === 'SMS' ? 'account' : 'SMS';
    },
    getSMSCode() {
      /* 获取短信验证码 */
      uni.showModal({
        title: '',
        content: '666',
      });
    },
    login() {
      uni.setStorageSync('token', this.form.account);
      uni.showModal({
        title: '',
        content: '登录成功',
      });
      this[USER.UPDATE_USER]({
        account: 'a0008949',
        name: '程江涛',
        mobile: '190110119120',
        customerCode: '8700010462',
        saletoCode: '8700010462',
        sendtoCode: '8700010462',
      });
    }
  }
};
</script>

<style lang="scss">
  .login-main {
    background: #fff;
    min-height: 100vh;
    padding-top: 180*100/1334 + vh;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
  }

  .login-banner {
    width: 638px;
    height: 184px;
    background: url('~@/assets/img/login/login-haier.png') no-repeat;
    background-size: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .login-banner-title {
    color: #333;
    font-size: 36px;
    line-height: 50px;
    text-align: center;
  }


  @mixin login-btn {
    width: 100%;
    height: 84px;
    font-size: 30px;
    border-radius: 47px;
    text-align: center;
  }

  .login-default-btn {
    @include login-btn;
    border: 1px solid #2283E2;
    color: #2283E2;
    background: #fff;
  }

  .login-primary-btn {
    @include login-btn;
    background: #2283E2;
    color: #fff;
  }

  .login-btns-wrap {
    margin-top: 56px;
    margin-bottom: 40px;
  }

  .login-protocol-wrap {
    display: flex;
    align-items: center;
  }

  .login-protocol-checkbox {
    .at-checkbox__option-wrap {
      padding: 0;
    }
  }

  .login-protocol-text {
    color: #666;
    font-size: 28px;
    line-height: 40px;
  }

  .login-other-wrap {
    position: relative;
    height: 28px;
    margin-top: 120px;
  }

  .login-other-line {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background: #F6F6F6;
  }

  .login-other-text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 28px;
    line-height: 28px;
    background: #fff;
    color: #BABABA;
    font-size: 20px;
    text-align: center;
  }

  .login-other-btns {
    margin-top: 40px;
    text-align: center;

    .iconfont {
      font-size: 60px;
      color: #B3B1B1;
    }
  }

  .login-btm-wrap {
    display: flex;
    align-items: center;
    margin-top: 138px;
    margin-bottom: 66px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .login-btm-text {
    color: #2283E2;
    font-size: 24px;
  }

  .login-btm-line {
    width: 1px;
    height: 20px;
    background: #DFDEDE;
    margin-left: 24px;
    margin-right: 24px;
  }

  .login-pwd-icon-wrap {

    .iconfont {
      color: #666;
      font-size: 26px;
    }
  }

  .login-get-sms-code {
    width: 140px;
    color: #2283E2;
    font-size: 28px;
  }

</style>
