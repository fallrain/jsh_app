<template>
  <view class="rechargeOnline-wrap">
    <view class="rechargeOnline-head">
      <view class="rechargeOnline-head-cnt">
        <view class="iconfont iconexclamatory rechargeOnline-head-cnt-icon"></view>
        <view class="rechargeOnline-head-cnt-inf">快捷支付推荐邮储银行和建设银行，网银支付推荐使用农业银行、工商银行和建设银行，无限额。</view>
      </view>
    </view>
    <view class="rechargeOnline-cnt">
      <view class="rechargeOnline-address-card-warp">
        <j-recharge-address-card
          :data="addressData"
        >
        </j-recharge-address-card>
      </view>
      <view class="rechargeOnline-cell-wrap">
        <j-recharge-address-card-cell
          title="打款金额"
        >
          <template>
            <view class="rechargeOnline-price">
              ￥<text class="ml20">39.00</text></view>
          </template>
        </j-recharge-address-card-cell>
        <j-recharge-address-card-cell
          title="打款类型"
        >
          <template>
            <view
              :key="index"
              v-for="(item,index) in payCardTypes"
            >
              <j-recharge-pay-card
                :index="index"
                :is-checked="item.isChecked"
                :type="item.type"
                @checkChange="checkChange"
              ></j-recharge-pay-card>
            </view>
          </template>
        </j-recharge-address-card-cell>
        <j-recharge-address-card-cell
          :has-arrow="true"
          title="选择银行"
        >
          <template>
            <view class="rechargeOnline-bank-img">
              <image :src="`${baseUrl}public/assets/img/recharge/bank-example.png`"></image>
            </view>
          </template>
        </j-recharge-address-card-cell>
        <j-recharge-address-card-cell
          title="备注"
        >
          <template>
            <j-textarea
              placeholder="请输入备注信息"
            ></j-textarea>
          </template>
        </j-recharge-address-card-cell>
      </view>

      <view class="rechargeOnline-btn-wrap">
        <button
          class="j-common-btn-default"
          type="button"
        >完成</button>
      </view>
    </view>
  </view>
</template>

<script>
import JRechargeAddressCard from '../../../../components/recharge/JRechargeAddressCard';
import JRechargeAddressCardCell from '../../../../components/recharge/JRechargeAddressCardCell';
import JRechargePayCard from '../../../../components/recharge/JRechargePayCard';
import JTextarea from '../../../../components/form/JTextarea';
import './css/rechargeOnline.scss';

export default {
  name: 'rechargeOnline',
  components: {
    JTextarea,
    JRechargePayCard,
    JRechargeAddressCard,
    JRechargeAddressCardCell,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_PUBLIC_PATH,
      addressData: [
        {
          title: '收款单位',
          value: '漯河市和力电器有限公司（8700010462）'
        },
        {
          title: '付款方',
          value: '漯河市和力电器有限公司（8700010462）'
        }
      ],
      payCardTypes: [
        {
          type: 0,
          isChecked: false
        },
        {
          type: 1,
          isChecked: false
        }
      ]
    };
  },
  methods: {
    checkChange(e, index) {
      this.payCardTypes.forEach((v) => {
        v.isChecked = false;
      });
      this.payCardTypes[index].isChecked = true;
    }
  },
};
</script>
