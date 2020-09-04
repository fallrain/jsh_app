<template>
  <view class="transferDetailAddress">
    <view class="transferDetailAddress-wrap ">
      <view class="transferDetailAddress-transfer">
        <view class="transferDetailAddress-transfer-info">
          <view class="iconfont iconcar transferDetailAddress-transfer-info-icon"></view>
          <text class="transferDetailAddress-transfer-info-text">调货信息</text>
        </view>
        <view class="transferDetailAddress-information">
<!--          <view class="transferDetailAddress-for">-->
            <view class="transferDetailAddress-information-text">
              总装车体积：
              <text class="transferDetailAddress-information-val">{{detailList.IBR_JSTIJI}}m3</text>
            </view>
            <view class="transferDetailAddress-information-text mla">
              库位：
              <text class="transferDetailAddress-information-val">{{detailList.T5_OUTWHNAME}}</text>
            </view>
<!--          </view>-->
          <view class="transferDetailAddress-information-text">
            配送类型：
            <text class="transferDetailAddress-information-val mlb">{{detailList.IBR_ADDRESSTYPE}}</text>
          </view>
          <view class="transferDetailAddress-information-text mla">
            配送地址：
            <text class="transferDetailAddress-information-val">{{detailList.DH_SENDTONAME}}</text>
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
            <text class="transferDetailAddress-information-val">{{detailList.IBR_SEQ}}</text>
          </view>
          <view class="transferDetailAddress-information-text mla">
            下单日期：
            <text class="transferDetailAddress-information-val">{{detailList.IBR_STARTDATE}}</text>
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
  props: {
    detailList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>
