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
        @change="goodsChange"
        :goods="detailList.orderList"
        
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
      // 调货订单信息
      detailList: [],
      // 订单产品列表
      goodsList: [],
       // 结算
      settlement: 0,
      //   [
      //     {
      //       isCreditMode: false
      //     },
      //     {
      //       isCreditMode: false
      //     }
      //   ]
      // ],  
      // 选中的
      chosePayerOptions: []
    };
  },
  methods: {
    goodsChange(goods, index) {
      console.log(goods)
      /* 商品 change */
      this.goodsList[index] = goods;
      this.goodsList = JSON.parse(JSON.stringify(this.goodsList));
    },
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    },
    findDetailList(seq,list) {
       console.log(seq)
      this.detailList = list.data
      console.log(this.detailList)
     
      // this.goodsList = list.data.orderList
      // console.log(this.goodsList)
    },
  },
  onLoad(option){
    console.log(option)
    let { IBR_SEQ, list } = option
    
    this.findDetailList(IBR_SEQ,JSON.parse(list))
    // console.log(JSON.parse(list))
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