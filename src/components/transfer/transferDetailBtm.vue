<template>
  <view class="transferDetailBtm">
    <view
      class="transferDetailBtm-check"
    >
      <text class="transferDetailBtm-check-shop">装车体积： </text>
      <view class="transferDetailBtm-check-order">{{Number(detailList.calue)}}%</view>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="progress-box">
            <progress
              :percent='detailList.calue'
              activeColor="#2283E2"
              backgroundColor="#DEDEDE"
              stroke-width="10"
              />
        </view>
      </view>
      <button class="transferDetailBtm-check-edit" @tap="tlement">结算</button>
    </view>
  </view>
</template>

<script>
// import {
//   progress
// } form '@dcloudio/uni-ui';
export default {
  name: 'transferDetailBtm',
  data() {
    return {
      calue: 0
    };
  },
  props: {
    detailList: {
      type: Object,
      default: () => {}
    },
    fromWhere: {
      type: String
    }
  },
  created() {
    console.log(this.detailList);
    console.log(this.detailList.calue);
    this.setCalue();
  },
  methods: {
    // choose() {
    //   const checked = !this.checked;
    //   this.$emit('update:checked', checked);
    //   this.$emit('checkAll', checked);
    // }
    setCalue() {
      if (this.fromWhere === 'ZC') {
        const baifenbi = ((this.detailList.IBR_JSTIJI * 1) / (this.detailList.IBR_MAXTJ * 1)) * 100;
        this.detailList.calue = baifenbi.toFixed(0);
      } else {
        this.detailList.calue = this.detailList.calue;
      }
    },
    tlement() {
      if (this.fromWhere === 'ZC') {
        // 整车结算
        this.$emit('checkUp');
      } else {
        if (Number(this.detailList.calue) < 100) {
          uni.showToast({
            title: `单号${this.detailList.IBR_SEQ}体积不满足，无法结算，请继续添加商品`,
            duration: 3000
          });
        } else {
          this.detailList.orderList.forEach((item) => {
            console.log(item.IBL_PAYMONEY);
            const orderPayer = item.payer.find(ele => {
              if (item.IBL_PAYMONEYNAME.indexOf(ele.customerCode) !== -1 || item.IBL_PAYMONEYNAME.indexOf(ele.customerName)) {
                console.log(ele);
                return ele;
              }
            });
            console.log(orderPayer);
            if (orderPayer) {
              console.log(11111);
              console.log(this.detailList.SUMMONEY);
              if (Number(orderPayer.balance) > Number(this.detailList.SUMMONEY)) {
                console.log(orderPayer.balance);

                this.$emit('changeVf');
                console.log(22222);
              } else {
                console.log(333333);
                uni.showModal({
                  title: '提示',
                  content: `付款方${orderPayer.CodeName}余额不足，无法提交！`,
                });
              }
            }
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .transferDetailBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 18px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
    align-items: center;
  }

  .transferDetailBtm-check {
    display: flex;
    align-items: center;
    font-size: 28px;
    justify-content: space-between;
  }
  .transferDetailBtm-check-shop {
    color: #333;
  }
  .transferDetailBtm-check-order {
    color: #2283E2;
    margin-right: 22px;
  }
  .transferDetailBtm-check-edit {
    width: 128px;
    height: 48px;
    background: #2283E2;
    border-radius: 24px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    margin-left:95px;
  }
::v-deep .uni-padding-wrap {
    width: 238px;
    height: 20px;
    border-radius:14px;
  }
::v-deep .progress-box{
    width: 238px;
    height: 20px;
    .uni-progress-bar{
      border-radius:14px;
      .uni-progress-inner-bar{
        border-radius:14px;
      }
    }
  }

</style>
