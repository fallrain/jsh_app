<template>
  <view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <j-cell :titleWrap="false" title="客户编码">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.customerCode}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="客户名称">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.customerName}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="建户时间">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.createdDate}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="子户">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.subsidiary}}</view>
          </template>
        </j-cell>
      </view>
    </view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <j-cell :titleWrap="false" title="自有/传统">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.zyOrCtChannel}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="大渠道">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.channel}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="小渠道">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.subChannel}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="中心小微">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.regionTrade}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="网格小微编码">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.reseauRegionCode}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="网格小微名称">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.reseauRegionName}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="销售组织">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.salesGroup}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="交易类型">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.dealType}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="集采/地采">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.diCaiOrJiCai}}</view>
          </template>
        </j-cell>
      </view>
    </view>
    <view class="mineBaseInfo">
      <view class="mineBaseInfo-group">
        <!-- <j-cell :titleWrap="false" title="子账号">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.subAccount}}<view @click="viewDetail" class="mineBaseInfo-detail">查看详情</view></view>
          </template>
        </j-cell> -->
        <j-cell :titleWrap="false" title="省/市/区/县">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.addressProvinceCityArea}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="详细地址">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.specificAddress}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="法人">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.legalPerson}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="税号">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.taxCode}}</view>
          </template>
        </j-cell>
        <j-cell :titleWrap="false" title="合作年限">
          <template #right>
            <view class="mineBaseInfo-right">{{baseList.cooperationTerm}}</view>
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
  data() {
    return {
      baseList: {}
    };
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
      const { code, data } = await this.mineServer.mineBaseInfo('8800012497');
      if (code === '1') {
        this.baseList = data;
      }
      console.log(data);
    },
    viewDetail() {
      console.log('进入子账号详情');
    }
  }
};
</script>
