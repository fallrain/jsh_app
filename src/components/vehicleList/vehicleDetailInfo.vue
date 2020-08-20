<template>
  <view class="vehiclerDetailInfo">
    <view class="vehiclerDetailInfo-wrap ">
      <view class="vehiclerDetailInfo-transfer">
        <view class="vehiclerDetailInfo-transfer-info">
          <view class="iconfont iconcar vehiclerDetailInfo-transfer-info-icon"></view>
          <text class="vehiclerDetailInfo-transfer-info-text">整车信息</text>
        </view>
        <view class="vehiclerDetailInfo-information">
          <view class="vehiclerDetailInfo-information-text">
            总装车体积：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_JSTIJI}}m3</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mla">
            库位：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_JDPC_JDCODENAME}}</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mlb">
            车型：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_MODELSCARNAME}}</text>
          </view>
        </view>
      </view>
      <view class="vehiclerDetailInfo-transfer-order">
        <view class="vehiclerDetailInfo-transfer-info">
          <view class="iconfont iconziyuan vehiclerDetailInfo-transfer-info-icon mlc"></view>
          <text class="vehiclerDetailInfo-transfer-info-text">订单信息</text>
        </view>
        <view class="vehiclerDetailInfo-information order">
          <view class="vehiclerDetailInfo-information-text mld">
            申请单号：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_SEQ}}</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mla">
            下单日期：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_STARTDATE}}</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mlb">
            预计到货时间：
            <text class="vehiclerDetailInfo-information-val">{{goods.IBR_ENDDATE}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/vehicleDetailInfo.scss';

export default {
  name: 'vehicleDetailInfo',
  props: {
    goods: { // 商品数据
      type: Object
    }
  },
};
</script>
