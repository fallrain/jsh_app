<template>
  <view class="vehiclerDetailSend">
    <view class="v-d-s-title">
      <view class="v-d-s-fox1">京东异地</view>
      <view class="v-d-s-fox2">|</view>
      <view class="v-d-s-fox3" @tap="changeAde">{{adress}}</view>
      <view class="v-d-sinfo" v-show="show">
        <view class="v-d-sinfo-li" v-for="(it,index) in infoss.JDWarehouse" :key="index"
              :class="[(it.IJWH_ADDRESS===adress)&& 'active']" @click="payVehicle(it,index)">{{it.IJWH_ADDRESS}}</view>
      </view>
    </view>
    <view v-if="sendType==='edit'" class="v-d-s-inp">
      <j-input v-model="name" placeholder='请输入手机号' handChange="this.valChange">
        <template #left>
          <view class="jInput-left">姓名：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType==='edit'" class="v-d-s-inp">
      <j-input v-model="mobile" placeholder='请输入手机号' handChange="this.valChange">
        <template #left>
          <view class="jInput-left">手机号：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType==='edit'" class="v-d-s-inp">
      <j-input v-model="pake" placeholder='请输入手机号'>
        <template #left>
          <view class="jInput-left">身份证号：</view>
        </template>
      </j-input>
    </view>
    <view v-if="sendType==='edit'" class="v-d-s-but" @click="changeSup"><view class="v-d-s-but-kong">确认</view></view>
    <view v-if="sendType==='view'" class="v-d-s-fox4">姓名：{{name}}</view>
    <view v-if="sendType==='view'" class="v-d-s-fox4">手机号：{{mobile}}</view>
    <view v-if="sendType==='view'" class="v-d-s-fox4">身份证号：{{pake}}</view>
    <view v-if="sendType==='view'" class="v-d-s-but" @click="changeSend"><view class="v-d-s-but-kong">修改</view></view>
  </view>
</template>

<script>
import JInput from '../form/JInput';

export default {
  name: 'VehicleDetailSend',
  components: {
    JInput
  },
  props: {
    infoss: { // 商品数据
      type: Object
    }
  },
  data() {
    return {
      sendType: '',
      adress: '',
      name: '',
      mobile: '',
      pake: '',
      show: false
    };
  },
  created() {
    this.adress = this.infoss.JDWarehouse[0].IJWH_ADDRESS;
    if (this.adress === '无') {
      this.sendType = '';
    }
  },
  methods: {
    changeAde() {
      this.show = !this.show;
    },
    payVehicle(item, index) {
      console.log(item);
      console.log(index);
      this.show = !this.show;
      this.adress = item.IJWH_ADDRESS;
      this.name = item.YD_NAME;
      this.mobile = item.YD_TEL;
      this.pake = item.YD_CARDNO;
      this.sendType = 'view';
      this.queryJDWarehouse();
    },
    changeSend() {
      this.sendType = 'edit';
    },
    changeSup() {
      // 保存地址信息
    },
    async queryJDWarehouse() {
      console.log(this.infoss);
      const timetamp = new Date().valueOf();
      const longfeiUSERID = this.infoss.longfeiUSERID;
      const ibrSeq = this.infoss.IBR_SEQ;
      // const res = await this.vehicleService.ydContact(timetamp, longfeiUSERID, ibrSeq, address, OESBS, ydCardNo, ydName, ydTel);
      // console.log(res);
      // if (res.code === '1') {
      // }
    },
  }
};
</script>

<style lang="scss" scoped>
  .vehiclerDetailSend {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.32);
    padding: 24px 0 24px 24px;
  }
  .v-d-s-title {
    display: flex;
  }
  .v-d-s-fox1 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 15%;
    color: #2283E2;
    font-size: 24px;
  }
  .v-d-s-fox2 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 5%;
    color: #999999;
    font-size: 24px;
    padding-left: 2%;
  }
  .v-d-s-fox3 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 80%;
    color: #333333;
    font-size: 24px;
  }
  .v-d-s-fox4 {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    color: #333333;
    font-size: 24px;
  }
  .v-d-s-but {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
  }
  .v-d-s-but-kong {
    margin-left: 80%;
    width: 15%;
    text-align: center;
    border-radius: 18px;
    background-color: #2283E2;
    color: #FFFFFF;
    font-size: 24px;
  }
  .v-d-s-inp {
    .jInput-wrap{
      height: 80px;
      .jInput-left{
        color: #333333;
        font-size: 24px;
      }
      .jInput{
        height: 80px;
      }
    }
  }
  .v-d-sinfo {
    width: 70%;
    position: absolute;
    top: 92%;
    left: 22%;
    z-index: 100;
    background: rgba(255, 255, 255, 0.911);
    border: 1px solid #c3c3c3;
  }
  .v-d-sinfo-li {
    color: #2C405A;
    font-size: 24px;
    margin:10px 0 10px 20px;
  }
  .v-d-sinfo-li.active {
    color: #2283E2;
    background: #E7F3FF;
  }
</style>
