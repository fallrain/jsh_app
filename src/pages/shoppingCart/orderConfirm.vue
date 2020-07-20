<template>
  <view class="orderConfirm">
    <j-order-confirm-address
    ></j-order-confirm-address>
    <view class="orderConfirm-list">
      <j-order-confirm-item
        v-for="(goods,index) in goodsList"
        :key="index"
        @change="goodsChange"
        :goodsList="goods"
      ></j-order-confirm-item>
    </view>
    <view class="mt24">
      <j-failure-order-item
        :goodsList="failureGoodsList"
      ></j-failure-order-item>
    </view>
    <view class="mt24">
      <j-overage-pay
      ></j-overage-pay>
    </view>
    <view class="orderConfirm-btm j-flex-aic">
      <view class="orderConfirm-btm-text">实付总额：</view>
      <view class="orderConfirm-btm-price">¥22383945.12</view>
      <button
        type="button"
        class="orderConfirm-btm-btn ml20"
        @tap="showPayer"
      >下一步</button>
    </view>
    <j-pop-picker
      title="付款方"
      :show.sync="payerPickerShow"
      :options="payerOptions"
      :choseOptions.sync="chosePayerOptions"
    ></j-pop-picker>
  </view>
</template>

<script>
import JOrderConfirmAddress from '../../components/shoppingCart/JOrderConfirmAddress';
import JOrderConfirmItem from '../../components/shoppingCart/JOrderConfirmItem';
import JFailureOrderItem from '../../components/shoppingCart/JFailureOrderItem';
import JOveragePay from '../../components/shoppingCart/JOveragePay';
import JPopPicker from '../../components/form/JPopPicker';
import './css/orderConfirm.scss';


export default {
  name: 'orderConfirm',
  components: {
    JPopPicker,
    JOveragePay,
    JFailureOrderItem,
    JOrderConfirmItem,
    JOrderConfirmAddress
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
      this.goodsList[index] = list;
    },
    showPayer() {
      /* 展示付款地址 */
      this.payerPickerShow = true;
    }
  }
};
</script>
