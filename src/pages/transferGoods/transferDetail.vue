<template>
  <view class="transferDetail">
    <!-- 调货信息 -->
    <transfer-detail-address>         
    </transfer-detail-address>
    <view>
      <!-- 调货商品列表 -->
      <transfer-detail-item
        v-for="(goods,index) in goodsList"
        :key="index"
        :index="index"
        @change="goodsChange"
        :goodsList="goods"
      >
      </transfer-detail-item>
    </view>
     <!--余额支付信息 -->
      <view class="mt24">
        <t-overage-pay
        ></t-overage-pay>
      </view>
      <!-- 结算 -->
      <transfer-detail-btm>
      </transfer-detail-btm>
    


  </view>
    
</template>
<script>
import transferDetailAddress from '../../components/transfer/transferDetailAddress';
import transferDetailItem from '../../components/transfer/transferDetailItem';
import transferDetailBtm from '../../components/transfer/transferDetailBtm';
import TOveragePay from '../../components/transfer/TOveragePay';
import './css/transferDetail.scss'
export default {
  name:'transferDetail',
  components: {
    transferDetailAddress,
    transferDetailItem,
    TOveragePay,
    transferDetailBtm

  },
  data() {
    return {
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
      /* 展示付款地址 */
      this.payerPickerShow = true;
    }
  }
    
}
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