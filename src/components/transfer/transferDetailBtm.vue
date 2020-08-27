<template>
  <view class="transferDetailBtm">
    <view
      class="transferDetailBtm-check"
    >
      <text class="transferDetailBtm-check-shop">装车体积： </text>
      <view class="transferDetailBtm-check-order">{{Number(calue)}}%</view>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="progress-box">
            <progress
              :percent='calue'
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
    if (this.fromWhere === 'ZC') {
      const baifenbi = ((this.detailList.IBR_JSTIJI * 1) / (this.detailList.IBR_MAXTJ * 1)) * 100;
      this.calue = baifenbi.toFixed(0);
    } else {
      this.calue = Math.round(this.detailList.IBR_JSTIJI / 15 * 100);
    }
  },
  methods: {
    // choose() {
    //   const checked = !this.checked;
    //   this.$emit('update:checked', checked);
    //   this.$emit('checkAll', checked);
    // }
    tlement() {
      if (this.fromWhere === 'ZC') {
        // 整车结算
        this.$emit('checkUp');
      } else {
        if (Number(this.calue) < 15) {
          // confirm("体积小于15，无法结算，请继续添加商品")
          uni.showToast({
            title: '体积小于15，无法结算，请继续添加商品',
            duration: 3000
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
    align-items: center;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
    align-items: center;
  }

  .transferDetailBtm-check {
    display: flex;
    align-items: center;
    font-size: 28px;
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
