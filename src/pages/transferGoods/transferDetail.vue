<template>
  <view class="transferDetail">
    <t-alert-verification
        :show.sync="isShowVf"
        :form="form"
        :allOrderList="detailList"
    ></t-alert-verification>
    <!-- 调货信息 -->
    <transfer-detail-address
      :detailList="detailList"
    >
    </transfer-detail-address>
    <view>
      <!-- 调货商品列表 -->
      <transfer-detail-item
        :goods="detailList"
        @delete="deleteProductMe"
        @changeGood="goodsChange"
      >
      </transfer-detail-item>
    </view>
     <!--余额支付信息 -->
      <view class="mt24">
        <t-overage-pay
        :payerbalance="balance"
        ></t-overage-pay>
      </view>
      <!-- 结算 -->
      <transfer-detail-btm
        :detailList="detailList"
        @changeVf="changeVf"
      >
      </transfer-detail-btm>


  </view>

</template>
<script>
import transferDetailAddress from '../../components/transfer/transferDetailAddress';
import transferDetailItem from '../../components/transfer/transferDetailItem';
import transferDetailBtm from '../../components/transfer/transferDetailBtm';
import TOveragePay from '../../components/transfer/TOveragePay';
import TAlertVerification from '../../components/form/TAlertVerification';
import {
  mapGetters, mapMutations
} from 'vuex';
import {
  USER, TRANSFER
} from '../../store/mutationsTypes';
import './css/transferDetail.scss';

export default {
  name: 'transferDetail',
  components: {
    transferDetailAddress,
    transferDetailItem,
    TOveragePay,
    transferDetailBtm,
    TAlertVerification

  },
  data() {
    return {
      // 调货传过来的数据
      allList: [],
      // 调货订单信息
      detailList: [],
      // 订单产品列表
      goodsList: [],
      // 结算
      settlement: 0,
      // 余额支付信息
      balance: [],
      // 选中的
      chosePayerOptions: [],
      // 装车体积
      calue: 0,
      // 验证码弹窗
      isShowVf: false,
      form: {
        // 手机号
        phone: '',
        // 手机号验证码
        verificationCode: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      saleInfo: USER.GET_SALE,
      TSHOPCART: TRANSFER.GET_TSHOPCART,
      INDEX: TRANSFER.GET_INDEX,
      userInf: USER.GET_USER
    }),
  },
  created() {
    this.allList = this.TSHOPCART.allOrderList;
    // console.log(this.allList[0].list);
    // debugger
    this.detailList = this.allList[0].list.data;
    this.detailList.orderList.forEach((item) => {
      item.BATERATE = Number(item.BATERATE).toFixed(2);
      item.IBL_ISFL = Number(item.IBL_ISFL).toFixed(2);
      item.BATEMONEY = Number(item.BATEMONEY).toFixed(2);
      item.ACTPRICE = Number(item.ACTPRICE).toFixed(2);
    });
    this.balance = this.allList[0].list.data.payerBalance;
    console.log(this.detailList);
    // this.goodsList = this[TRANSFER.GET_TSHOPCART].allOrderList.data
  },
  methods: {
    ...mapMutations([
      TRANSFER.UPDATE_TSHOPCART
    ]),
    //显示验证码
    changeVf() {
      this.isShowVf = true;
    },
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    },
    goodsChange(good, index) {
      // this.getOrderList();
      console.log(good);
      console.log(this.detailList);
      /* 商品 change */
      this.detailList.orderList[index] = good;
      // this.detailList = JSON.parse(JSON.stringify(this.detailList));
      this.allList[0].list.data = this.detailList;
      console.log(this.allList);
      this[TRANSFER.UPDATE_TSHOPCART]({
        allOrderList: this.allList,
      });
    },
    async deleteProductMe(item, index) {
      console.log(item);
      // 删除购物车产品
      const deleteOrder = await this.transfergoodsService.deleteProduct({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.userInf.saletoCode,
        KORDERNO: item.IBL_KORDERNO,
      });
      if (deleteOrder.code === '1') {
        console.log(deleteOrder.data);
        this.detailList.orderList.forEach((v, i) => {
          if (v.IBL_KORDERNO === item.IBL_KORDERNO) {
            this.detailList.orderList.splice(i, 1);
            this.detailList.SUMMONEY -= v.SUMMONEY;
          }
          // if(this.detailList.SUMMONEY === 0 )
        });
        console.log(this.detailList);
        console.log(this.allList);

        this[TRANSFER.UPDATE_TSHOPCART]({
          obj: item
        });
        uni.showToast({
          title: deleteOrder.data.message,
        });
      } else {
        uni.showToast({
          title: deleteOrder.data.message,
        });
      }
    },
  },

};
</script>
<style scoped>
/* 余额支付信息 */
/deep/  .tOveragePay-wrap-head-icon {
  color: #2283E2;
}
/deep/ .tOveragePay-cnt-item-total-price {
  color: #2283E2;
}
/deep/ .tOveragePay-cnt-item-total-btn {
  background: #2283E2;
}
/deep/ .tOveragePay-cnt-item-head-dot {
  background: #2283E2;
}
</style>
