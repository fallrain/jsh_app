<template>
  <view class="vehiclerDetailInfo">
    <view class="vehiclerDetailInfo-wrap ">
      <view class="vehiclerDetailInfo-transfer">
        <view class="vehiclerDetailInfo-transfer-info">
          <view class="iconfont iconcar vehiclerDetailInfo-transfer-info-icon"></view>
          <text class="vehiclerDetailInfo-transfer-info-text">调货信息</text>
        </view>
        <view class="vehiclerDetailInfo-information">
          <view class="vehiclerDetailInfo-information-text">
            总装车体积：
            <text class="vehiclerDetailInfo-information-val">146.49m</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mla">
            库位：
            <text class="vehiclerDetailInfo-information-val">WFS2日日顺潍坊H2库存</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mlb">
            车型：
            <text class="vehiclerDetailInfo-information-val">X8.7K - 8.7厢式（高底盘）</text>
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
            <text class="vehiclerDetailInfo-information-val">21000086080</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mla">
            下单日期：
            <text class="vehiclerDetailInfo-information-val">2020/07/19</text>
          </view>
          <view class="vehiclerDetailInfo-information-text mlb">
            预计到货时间：
            <text class="vehiclerDetailInfo-information-val">2020-07-31</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/vehicleDetailInfo.scss';

export default {
  name: 'vehicleDetailInfo'
};
</script>
