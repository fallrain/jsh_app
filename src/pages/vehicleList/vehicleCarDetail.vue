<template>
  <view class="vehicleCarDetail">
    <view class="vehicleCarDetail-info"><vehicle-detail-info :goods="vehicleDetail"></vehicle-detail-info></view>
    <view class="vehicleCarDetail-good">
      <vehicle-detail-good @change="goodsChange" :goodsList="vehicleDetail">
      </vehicle-detail-good>
    </view>
    <view class="vehicleCarDetail-info">
      <vehicle-detail-send :infoss="vehicleDetail"></vehicle-detail-send>
    </view>
    <view class="vehicleDetail-high" @click="showPayer"><transfer-detail-btm :fromWhere="fromWhere" :detailList="vehicleDetail"></transfer-detail-btm></view>
  </view>
</template>

<script>
import vehicleDetailInfo from '../../components/vehicleList/VehicleDetailInfo';
import vehicleDetailGood from '../../components/vehicleList/VehicleDetailGood';
import vehicleDetailSend from '../../components/vehicleList/VehicleDetailSend';
import transferDetailBtm from '../../components/transfer/transferDetailBtm';

export default {
  name: 'vehicleCarDetail',
  components: {
    vehicleDetailInfo,
    vehicleDetailGood,
    vehicleDetailSend,
    transferDetailBtm
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
    console.log('1111www1111');
    console.log(this.vehicleDetail);
  },
  data() {
    return {
      fromWhere: 'ZC',
      baifen: '90',
      goodsList: [
        [
          {
            isCreditMode: false
          },
          {
            isCreditMode: false
          }
        ]
      ],
      failureGoodsList: [
        [
          {
            isCreditMode: false
          },
          {
            isCreditMode: false
          }
        ]
      ],
      // 配送地址显示隐藏
      payerPickerShow: false,
      // 配送地址options
      payerOptions: [
        {
          key: 1,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 2,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 3,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        },
        {
          key: 4,
          value: '(88003222）青岛鸿程永泰商贸有限公司',
        }
      ],
      // 选中的
      chosePayerOptions: []
    };
  },
  methods: {
    goodsChange(list, index) {
      /* 商品 change */
      this.$set(this.goodsList, index, list);
    },
    showPayer() {
      console.log((new Date()).valueOf());
      /* 展示付款地址 */
      this.payerPickerShow = true;
    }
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
