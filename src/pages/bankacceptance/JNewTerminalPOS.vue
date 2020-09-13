<template>
  <view class="newterpos-bg">
    <view class="newterpos-box">
      <view class="newterpos-top">承兑入账证明</view>
      <view class="newterpos-top-bg"></view>
      <view class="newterpos-text"
        >甲方：重庆新日日顺家电销售有限公司郑州分公司<br />
        乙方：漯河市和力电器有限公司<br />
        甲乙双方基于平等自愿原则，经充分协商，达成本合作协议，共同明确双方的权利义务关系。具体内容如下：<br />
        一、信息资料<br />
        乙方保证提供给甲方的所有信息资料真实、有效、完整，在任何信息发生变更时，乙方立即书面通知到甲方。<br />
        二、开通业务<br />

        本协议所指POS机具是由甲方提出业务及程序开发需求，银联商务股份有限公司青岛分公司（以下简称银商）负责开发、投放的受理银行卡并供乙方使用的POS机具（该POS机具产权归银商所有）<br /><br />
        <view class="newterpos-firsttextkorea">
          乙方按照售达方名称签订本协议，但是乙方所有门店、所有POS机，都应根据终端号分别缴纳年费；同一个售达方下共享一个信用卡额度（即总额度），同一个售达方如果申请多台POS机，每台POS机刷信用卡的额度应在总额度范围内均分，或可联系甲方在额度内做调整，但不可以超过总额度<br /><br />
          银商投放的POS机具已开通以下业务：</view
        ></view
      >
    </view>
    <view class="newterpos-row">
      <image
        v-if="switch1"
        :src="img1"
        class="newterpos-rowleftimg"
        @click="switch2"
      />
      <image
        v-else-if="!switch1"
        :src="img2"
        class="newterpos-rowleftimg"
        @click="switch2"
      />
      <view class="newterpos-rowright">
        <view v-if="switch1" class="newterpos-color">同意并接受本协议</view>
        <view v-else-if="!switch1" class="newterpos-color2"
          >同意并接受本协议</view
        >
      </view>
    </view>
    <button v-if="switch1" class="newterpos-button">
      <view class="newterpos-buttontext">签订协议</view>
    </button>
    <button v-else-if="!switch1" class="newterpos-button2">
      <view class="newterpos-buttontext">签订协议</view>
    </button>
  </view>
</template>

<script>
import './css/newterpos.scss';
import img1 from '../../assets/img/bankacceptance/complate.png';
import img2 from '../../assets/img/bankacceptance/notcomplate.png';

export default {
  data() {
    return {
      img1,
      img2,
      switch1: true
    };
  },
  methods: {
    switch2() {
      this.switch1 = !this.switch1;
    }
  }
};
</script>

<style></style>
