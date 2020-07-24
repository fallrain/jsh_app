<template>
  <view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">客户编码</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">8800101954</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">客户名称</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">宏程永泰商贸有限公司</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">客户编码</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">8800101954</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">客户名称</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">宏程永泰商贸有限公司</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">建户时间</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">2010-08-27</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">子户</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">无</view>
          </template>
        </j-cell>
      </view>
    </view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">自有/传统</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">自有渠道</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">大渠道</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">战略直营(M)</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">小渠道</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">纯三专海尔成套专卖(HA001)</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">中心小微</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">青岛中心(12A02)</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">网格小微编码</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">QD0002040500B999</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">网格小微名称</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">青岛市北网格小微1</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">销售组织</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">重庆新日日顺家电销售有限公司</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">交易类型</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">直营客户</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">集采/地采</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">地采</view>
          </template>
        </j-cell>
      </view>
    </view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">子账号</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">19<view @click="viewDetail" class="mineBaseInfo-detail">查看详情</view></view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">省/市/区/县</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">山东/青岛/李沧区</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">详细地址</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">青山路616号1单元202</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">法人</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">李芳芳</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">税号</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">98765456789</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false">
          <template #title>
            <view class="mineBaseInfo-left">合作年限</view>
          </template>
          <template #right>
            <view class="mineBaseInfo-right">9年</view>
          </template>
        </j-cell>
      </view>
      <view class="mine-baseInfo-line"></view>
    </view>
  </view>
</template>

<script>
import JCell from '../../components/form/JCell';
import './css/mineBaseInfo.scss';

export default {
  name: 'myBaseInfo',
  components: {
    JCell
  },
  methods: {
    viewDetail() {
      console.log('进入子账号详情');
    }
  }
};
</script>
