<template>
  <view class="vehicleCarDetail">
    <!-- 验证码弹窗 -->
    <t-alert-verification :show.sync="isShowVf" :form="form" :typpew="typpew" :zhengChe="zhengCheCode" @zhengCheUp="zhengCheUp"></t-alert-verification>
    <view class="vehicleCarDetail-info"><vehicle-detail-info :goods="vehicleDetail"></vehicle-detail-info></view>
    <view class="vehicleCarDetail-good">
      <vehicle-detail-good @change="goodsChange" :goodsList="vehicleDetail">
      </vehicle-detail-good>
    </view>
    <view class="vehicleCarDetail-info" v-if="this.vehicleDetail.JDWarehouse.length>0">
      <vehicle-detail-send :infoss="vehicleDetail"></vehicle-detail-send>
    </view>
    <view class="vehicleDetail-high">
      <transfer-detail-btm :fromWhere="fromWhere" :detailList="vehicleDetail" @checkUp="checkUp"></transfer-detail-btm>
    </view>
  </view>
</template>

<script>
import vehicleDetailInfo from '../../components/vehicleList/VehicleDetailInfo';
import vehicleDetailGood from '../../components/vehicleList/VehicleDetailGood';
import vehicleDetailSend from '../../components/vehicleList/VehicleDetailSend';
import transferDetailBtm from '../../components/transfer/transferDetailBtm';
import TAlertVerification from '../../components/form/TAlertVerification';

export default {
  name: 'vehicleCarDetail',
  components: {
    vehicleDetailInfo,
    vehicleDetailGood,
    vehicleDetailSend,
    transferDetailBtm,
    TAlertVerification
  },
  created() {
    const that = this;
    uni.getStorage({
      key: 'vehicleCarInfo',
      success(res) {
        that.seal = res.data;
      }
    });
    this.vehicleDetail = that.seal;
    this.form = that.seal.form;
    this.userInfMianMi = that.seal.userInfMianMi;
    console.log('1111www1111');
    console.log(this.vehicleDetail);
  },
  data() {
    return {
      typpew: 'ZC', // 弹框页面类型
      fromWhere: 'ZC',
      zhengCheCode: '', // 提交的整车单号
      isShowVf: false, // 验证码弹窗，判断是否展示
    };
  },
  methods: {
    goodsChange(list, index) {
      /* 商品 change */
      console.log(index);
      console.log(list);
      this.vehicleDetail = list;
    },
    checkUp() {
      console.log('tijioaoooo');
      this.comfimVehi();
    },
    async comfimVehi() {
      console.log('结算');
      this.zhengCheCode = this.vehicleDetail.IBR_SEQ;
      this.getUserInfMianMi().then(() => {
        console.log('获取免密2');
        if (this.userInfMianMi) { // 免验证码
          this.zhengCheUp('', '');
        } else {
          // 展示验证码
          this.isShowVf = true;
        }
      });
    },
    async zhengCheUp(verifyCo, verifyK) { // 提交验证码之后
      // 提交订单
      const timetamp = new Date().valueOf();
      const longfeiUSE = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.cartSubmitPreCheck(timetamp, longfeiUSE, this.zhengCheCode);
      if (code === '1' && data.code === '200') {
        this.cartSubmit(verifyCo, verifyK);
      } else {
        uni.showToast({
          title: '提交失败请重试',
        });
      }
    },
    async cartSubmit(verifyCo, verifyK) { // 提交订单
      const timetamp = new Date().valueOf();
      const longfeiUSE = this.userInf.customerCode;
      const { code, data } = await this.vehicleService.cartSubmit(timetamp, longfeiUSE, this.zhengCheCode, verifyCo, verifyK);
      if (code === '1' && data.code === '200') {
        uni.showToast({
          title: '整车提交成功',
        });
      } else {
        uni.showToast({
          title: data.message,
        });
      }
    },
    async getUserInfMianMi() {
      /* 获取免密 */
      const data = await this.orderService.mianMi();
      if (data.code === '1') {
        console.log('获取免密');
        console.log(data.data);
        this.userInfMianMi = data.data;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .vehicleCarDetail{
    min-height: 100vh;
    background: #F5F5F5;

    .uni-drawer__content {
      width: 608px !important;
    }
  }
  .vehicleCarDetail-info{
    padding: 24px;
  }
  .vehicleCarDetail-good{
    padding-left: 24px;
    padding-right: 24px;
  }
  .vehicleDetail-high {
    background-color: #F5F5F5;
    height: 100px;
  }
</style>
