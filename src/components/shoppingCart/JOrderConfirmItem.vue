<template>
  <view :key="updateIndex" class="JOrderConfirmItem-par">
    <view
      class="jOrderConfirmItem-wrap"
    >
      <view
        class="jOrderConfirmItem"
        v-for="(goods,index) in orderItem.splitOrderDetailList"
        :key="index"
      >
        <view v-if="goods.splitOrderProductList"
              class="jOrderConfirmItem-detail">
          <view class="jOrderConfirmItem-detail-portrait">
            <image
              :src="goods.splitOrderProductList[0].productImageUrl"
            >
            </image>
          </view>
          <view class="jOrderConfirmItem-detail-cnt">
            <view class="jOrderConfirmItem-detail-cnt-title">
              {{goods.splitOrderProductList[0].productName}}
            </view>
            <view class="jOrderConfirmItem-detail-cnt-price-wrap">
              <view class="jOrderConfirmItem-detail-cnt-price">
                ¥{{goods.splitOrderProductList[0].price}}
                <view class="jOrderConfirmItem-detail-cnt-text ml10 mr34">
                  *{{goods.splitOrderProductList[0].storeNum}}</view>
              </view>
              <view class="jOrderConfirmItem-detail-cnt-text">预计到货时间：{{goods.planInDate}}</view>
            </view>
          </view>
        </view>
        <view class="jOrderConfirmItem-detail-match-type">
          <j-switch
            v-if="goods.splitOrderProductList[0].isCheckCreditModel === '1'"
            :active.sync="goods.splitOrderProductList[0].isCheckCreditModel === '1'"
            inf="信用模式"
            @change="isCreditModeChange"
          ></j-switch>
          <j-switch
            v-if="goods.isTCTP"
            :active.sync="goods.isTCTP"
            inf="统仓统配"
            @change="isCreditModeChange"
          ></j-switch>
          <view class="jOrderConfirmItem-detail-match-type-text">
            满足方式：{{goods.stockTypeName}}
          </view>
        </view>
        <view class="jOrderConfirmItem-detail-mark-wrap mt24">
          <view class="jOrderConfirmItem-detail-mark-item">
            <view class="jOrderConfirmItem-detail-mark-item-name">
              <text class="jOrderConfirmItem-detail-mark-item-name-star">*</text>付款方
              <view class="jOrderConfirmItem-detail-mark-item-name-icon iconfont iconxia"></view>
            </view>
            <view @tap="showPayer(index)" class="jOrderConfirmItem-detail-mark-item-val">
              <text v-if="currentPayer[index]">{{currentPayer[index].value}}</text>
              <text v-else>请选择付款方</text>
            </view>
          </view>
          <view class="jOrderConfirmItem-detail-mark-item">
            <view class="jOrderConfirmItem-detail-mark-item-name">
              <text class="jOrderConfirmItem-detail-mark-item-name-star">*</text>备注信息
              <view class="jOrderConfirmItem-detail-mark-item-name-icon iconfont iconxia"></view>
            </view>
            <view
              @tap="goRemarks(index)"
              class="jOrderConfirmItem-detail-mark-item-val">
              <view v-if="JSON.stringify(goods.splitOrderProductList[0].spareAddress)!=='{}'">
                <text>
                  {{goods.splitOrderProductList[0].spareAddress.address}} {{goods.splitOrderProductList[0].spareAddress.addressDetail}} {{goods.splitOrderProductList[0].spareAddress.name}} {{goods.splitOrderProductList[0].spareAddress.mobile}}
                </text>
                <text class="detailAddress">
                  查看详情
                </text>
              </view>
              <view v-else>请选择备注信息</view>
            </view>
          </view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-left">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
        <view class="jOrderConfirmItem-semicircle-wrap jOrderConfirmItem-semicircle-right">
          <view class="jOrderConfirmItem-semicircle"></view>
        </view>
      </view>
    </view>
    <view class="jOrderConfirmItem-total">
      <view class="jOrderConfirmItem-total-text">{{orderItem.composeOrderNo}}</view>
      <view class="jOrderConfirmItem-total-text ml48">共计金额：</view>
      <view class="jOrderConfirmItem-total-price ml20">¥ {{orderItem.totalMoney}}</view>
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
import JSwitch from '../form/JSwitch';
import JPopPicker from '../form/JPopPicker';
import './css/jOrderConfirmItem.scss';

export default {
  name: 'JOrderConfirmItem',
  components: {
    JSwitch,
    JPopPicker
  },
  props: {
    // 单个订单
    orderItem: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number
    }
  },
  data() {
    return {
      updateIndex: 1,
      baseUrl: process.env.BASE_URL,
      // 配送地址显示隐藏
      payerPickerShow: false,
      // 配送地址options
      payerOptions: [
        {
          key: 1,
          value: '(88003222）青岛鸿程永泰商贸有限公司1',
        },
        {
          key: 2,
          value: '(88003222）青岛鸿程永泰商贸有限公司2',
        },
        {
          key: 3,
          value: '(88003222）青岛鸿程永泰商贸有限公司3',
        },
        {
          key: 4,
          value: '(88003222）青岛鸿程永泰商贸有限公司4',
        }
      ],
      // 选中的
      chosePayerOptions: [],
      currentPayer: [],
      currentIndex: 0,
    };
  },
  onLoad() {
  },
  watch: {
    chosePayerOptions(val) {
      this.currentPayer[this.currentIndex] = this.payerOptions.find(v => v.key === val[0]);
      // this.updateIndex++;
      console.log(this.currentPayer);
    }
  },
  computed: {
  },
  methods: {
    showPayer(index) {
      this.currentIndex = index;
      if (this.currentPayer[this.currentIndex]) {
        this.$set(this.chosePayerOptions, 0, this.currentPayer[this.currentIndex].key);
      } else {
        this.chosePayerOptions = [];
      }
      /* 展示付款地址 */
      this.payerPickerShow = true;
    },
    goRemarks(index) {
      uni.navigateTo({
        url: `/pages/shoppingCart/orderConfirmRemarks?orderIndex=${this.index}&productIndex=${index}`
      });
    },
    isCreditModeChange() {
      /* switch change */
      this.$emit('change', this.orderItem, this.index);
    },
  }
};
</script>

<style scoped>

</style>
