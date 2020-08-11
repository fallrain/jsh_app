<template>
  <view class="transferDetailAddress">
    <view class="transferDetailAddress-wrap ">
      <view class="transferDetailAddress-transfer">
        <view class="transferDetailAddress-transfer-info">
          <view class="iconfont iconcar transferDetailAddress-transfer-info-icon"></view>
          <text class="transferDetailAddress-transfer-info-text">调货信息</text>
        </view>
        <view class="transferDetailAddress-information">
          <view class="transferDetailAddress-information-text">
            总装车体积：
            <text class="transferDetailAddress-information-val">146.49m</text>
          </view>
          <view class="transferDetailAddress-information-text mla">
            库位：
            <text class="transferDetailAddress-information-val">WFS2日日顺潍坊H2库存</text>
          </view>
          <view class="transferDetailAddress-information-text mlb">
            车型：
            <text class="transferDetailAddress-information-val">X8.7K - 8.7厢式（高底盘）</text>
          </view>
        </view>
      </view>
      <view class="transferDetailAddress-transfer-order">
        <view class="transferDetailAddress-transfer-info">
          <view class="iconfont iconziyuan transferDetailAddress-transfer-info-icon mlc"></view>
          <text class="transferDetailAddress-transfer-info-text">订单信息</text>
        </view>
        <view class="transferDetailAddress-information order">
          <view class="transferDetailAddress-information-text mld">
            申请单号：
            <text class="transferDetailAddress-information-val">21000086080</text>
          </view>
          <view class="transferDetailAddress-information-text mla">
            下单日期：
            <text class="transferDetailAddress-information-val">2020/07/19</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/transferDetailAddress.scss';
// import JRadioGroup from '../form/JRadioGroup';


export default {
  name: 'transferDetailAddress',
  components: {
    // JRadioGroup,
  },
  data() {
    return {
      radioGroups: [
        {
          inf: '自提',
          checked: true
        },
        {
          inf: '配送',
          checked: false
        }
      ]
    };
  },
  methods: {
    radioGroupChange(radioGroup) {
      /* radioGroupChange */
      this.radioGroups = radioGroup;
    }
  }
};
</script>
