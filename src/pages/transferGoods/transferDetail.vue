<template>
  <view class="transferDetail">
    <!-- 调货信息 -->
    <transfer-detail-address
      :detailList="detailList"
    >
    </transfer-detail-address>
    <view>
      <!-- 调货商品列表 -->
      <transfer-detail-item
        :goods="detailList"

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
      >
      </transfer-detail-btm>


  </view>

</template>
<script>
import transferDetailAddress from '../../components/transfer/transferDetailAddress';
import transferDetailItem from '../../components/transfer/transferDetailItem';
import transferDetailBtm from '../../components/transfer/transferDetailBtm';
import TOveragePay from '../../components/transfer/TOveragePay';
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
    transferDetailBtm

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
      chosePayerOptions: []
    };
  },
  computed: {
    ...mapGetters({
      TSHOPCART: TRANSFER.GET_TSHOPCART,
      userInf: USER.GET_USER
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    goodsChange(goods, good, index) {
      console.log(goods);
      /* 商品 change */
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.detailList.orderList[index] = good;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.detailList = JSON.parse(JSON.stringify(this.detailList));
    },
  },
  created() {
    this.allList = this.TSHOPCART.allOrderList;
    this.detailList = this.allList.data;
    this.balance = this.allList.data.payerBalance;
    console.log(this.detailList);
    // this.goodsList = this[TRANSFER.GET_TSHOPCART].allOrderList.data
  },
  methods: {
    ...mapMutations([
      TRANSFER.UPDATE_TSHOPCART
    ]),
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    },
    async deleteProductMe(item) {
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
          allOrderList: this.allList,
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
