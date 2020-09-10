<template>
  <view class="tShoppingCartItem" v-if="list.data.orderList.length !==0">
      <!-- 头部 -->
    <view class="tShoppingCartItem-head">
      <view
        class="tShoppingCartItem-cnt-check"
        @tap="choose"
      >
      <i :class="['iconfont', list.checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <button
          type="button"
          class="tShoppingCartItem-btn-primary mr12"
      >{{list.data.IBR_ISFLAG}}
      </button>
      <view class="tShoppingCartItem-head-middle">
        <text class="tShoppingCartItem-head-cata mll">库位：</text>
        <text class="tShoppingCartItem-head-local">{{list.data.T5_OUTWHNAME}}</text>
      </view>
      <view>
          <text class="tShoppingCartItem-head-text">装车体积:</text>
          <text class="tShoppingCartItem-head-volume">{{Number(list.data.calue)}}%</text>
      </view>
      <view class="tShoppingCartItem-btm-btn iconfont iconxia" @click="getMore"></view>
        <view v-show="isOrderMore" class="transfer_more">
          <view class="background">
            <view class="transfer_more_text" @tap="backShoppingCart(list.data.IBR_SEQ)"><view class="iconfont iconcancel transfer_more_iconStyle"></view>选购其他</view>
          </view>
        </view>
    </view>
    <!-- 产品列表 -->
    <view
     class="tShoppingCartItem-list"
     v-for="(item,index) in list.data.orderList"
     :key="index"
    >
      <view class="tShoppingCartItem-cnt">
        <view class="tShoppingCartItem-cnt-img-wrap">
            <image :src="item.THUMBNAIL"></image>
        </view>
        <view class="jShoppingCartItem-cnt-inf">
          <view class="tShoppingCartItem-cnt-inf-title">{{item.DH_INVSTD}}</view>
          <view class="tShoppingCartItem-cnt-price-inf">
            <view class="tShoppingCartItem-cnt-price">¥ {{item.UNITPRICE}}</view>
            <view class="tShoppingCartItem-cnt-stock">库存：{{item.IBL_MAXNUM}}</view>
          </view>
           <view class="tShoppingCartItem-btm-version">
            <view
              class="tShoppingCartItem-cnt-price-inf-picker"
            >
              <view class="tShoppingCartItem-cnt-price-inf-mrr">付款方</view>
              <i
                class="iconfont iconxia"
                :class="[
                  item.isExpand && 'reverse'
                ]"
                @tap="showPayer(item,index)"
              ></i>
              <view class="tShoppingCartItem-cnt-price-info" v-show="item.isExpand ">
                <view class="tShoppingCartItem-cnt-price-info-li"
                  v-for="(it,index) in item.payer"
                  :key="index"
                  :class="[it.isChecked && 'active']"
                  @tap="togglePayer(item, it, index)"
                >
                ({{it.payerCode}}){{it.payerName}}
                </view>
              </view>
              <view class="tShoppingCartItem-cnt-price-inf-item">{{item.IBL_PAYMONEYNAME}}</view>
            </view>
          </view>
        </view>
        <!-- <view
          class="tShoppingCartItem-head-close iconfont iconcross"
          @tap="deleteShoppingCart(item)"
        ></view> -->
        <!-- <view
          class="tShoppingCartItem-head-close"
          v-if="isShowClear"
          @tap="chooseClose(item)"
        >
          <i
            :class="['iconfont', item.checkedTwo ? 'iconradio active':'iconradio1']"

          ></i>
        </view> -->
        <!-- <i
          :class="['tShoppingCartItem-cnt-like', 'iconfont', item.$favorite ? 'iconicon3':'iconshoucang']"
          @tap="addFavorite(item)"
        /> -->

     </view>
     <view class="tShoppingCartItem-cnt-price-foottotal">
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal">调货单号： </text>
        <text class="tShoppingCartItem-cnt-price-subprice"> {{item.IBL_KORDERNO}}</text>
      </view>
      <view class="tShoppingCartItem-cnt-price-total">
        <text class="tShoppingCartItem-cnt-price-subtotal mla">小计： </text>
        <text class="tShoppingCartItem-cnt-price-subprice mlb"> ¥ {{item.SUMMONEY}}</text>
      </view>
      <uni-number-box
        :value="item.IBL_NUM"
        :max="Number(item.IBL_MAXNUM)"
        :disabled="Number(item.IBL_MAXNUM) === 0"
        @change="changeNum($event, item)"
        ></uni-number-box>
     </view>
    </view>
    <view class="tShoppingCartItem-btm">
      <view class="tShoppingCartItem-btm-text">
        <view class="tShoppingCartItem-btm-detail" @tap="goTransferDetail(list.data.IBR_SEQ,list)">
          <i class="iconfont iconxiangqing tShoppingCartItem-btm-text-icon "></i>
          点击查看详情
        </view>
        <text class="tShoppingCartItem-btm-text-cata">总计总额： </text>
        <text class="tShoppingCartItem-btm-text-price"> ¥{{list.data.SUMMONEY}}</text>
      </view>
    </view>

  </view>
</template>

<script>
import TShoppingCartMore from './TShoppingCartMore';
import './css/TShoppingCartItem.scss';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'TShoppingCartItem',
  components: {
    TShoppingCartMore
  },
  props: {
    // 商品数据
    list: {
      type: Object,
      default: () => {}
    },
    // 商品索引
    index: {
      type: [String, Number]
    },
    // 所有版本的价格
    allPrice: {
      type: Object,
      default: () => {}
    },
    // isShowClear: {
    //   type: Boolean,
    // },

  },
  data() {
    return {
      isShowPayer: false,
      // 显示收藏
      queryCustomer: [],
      // 选购其他显示
      isOrderMore: false,
      // // 单个订单是否全选
      // isCheckSingle:false

    };
  },
  created() {
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    }),
  },
  methods: {
    goDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?productCode=${item.GBID}`
      });
    },
    // 选购其他
    getMore() {
      this.isOrderMore = !this.isOrderMore;
      console.log(this.index);
      console.log(this.isOrderMore);
    },
    // 返回调货列表页面
    backShoppingCart(seq) {
      uni.navigateTo({
        url: `/pages/transferGoods/transferGoods?IBR_SEQ=${seq}`
      });
    },
    choose() {
      /* 选中本商品 */
      const {
        checked, data
      } = this.list;
      console.log(this.list);
      this.list.checked = !checked;
      // this.isCheckSingle = true
      // this.list.data.orderList.forEach(item => {
      //   item.checkedTwo = !item.checkedTwo
      //   if(!item.checkedTwo) {
      //     this.isCheckSingle = !this.isCheckSingle;
      //     this.list.checked = !checked;
      //   }
      // })
      console.log(data);
      this.$emit('change', this.list, this.index);
    },
    // chooseClose(item) {
    //   item.checkedTwo = !item.checkedTwo
    //    this.list.data.orderList.forEach(item => {
    //     if (!item.checkedTwo) {
    //       this.isCheckSingle = false
    //       this.list.checked = false
    //       return
    //     } else {
    //       this.isCheckSingle = true
    //       this.list.checked = true
    //     }

    //   })
    //   this.$emit('change', this.list, this.index);
    // },
    showPayer(item) {
      // 显示付款方
      console.log(this.list.data);
      item.isExpand = !item.isExpand;
      console.log(item.isExpand);
      this.$emit('change', this.list, item, this.index);
    },
    async changeNum(value, item) {
      if (value !== item.IBL_NUM) {
        const result = await this.transfergoodsService.updateOrderQty({
          timestamp: Date.parse(new Date()),
          dhSeq: this.list.data.IBR_SEQ,
          korderNo: item.IBL_KORDERNO,
          longfeiUSERID: this.saleInfo.customerCode,
          qty: value
        });
        if (result.code === '1') {
          // 价格修改
          item.IBL_NUM = value;
          item.SUMMONEY = item.IBL_NUM * Number(item.UNITPRICE);
          let sum = 0;
          this.list.data.orderList.forEach((ele) => {
            sum += Number(ele.SUMMONEY);
          });
          console.log(this.list.data);
          this.list.data.SUMMONEY = sum.toFixed(2);
          this.$emit('query');
        }
      }
    },
    goTransferDetail(seq, list) {
      console.log(list);
      //  uni.navigateTo({
      //    url: '/pages/transferGoods/transferDetail?IBR_SEQ='+ seq + '&list='+ JSON.stringify(list)
      // })
      this.$emit('goTransferDetail', seq, list, this.index);
    },
    async deleteShoppingCart(item) {
      // 删除购物车订单
      const deleteOrder = await this.transfergoodsService.deleteOrderForm({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        KORDERNO: this.list.data.IBR_SEQ,
      });
      if (deleteOrder.code === '1') {
        this.$emit('query');
        this.$emit('getNum');
      }
    },
    // 切换付款方
    async togglePayer(item, it, index) {
      const upDHPay = await this.transfergoodsService.upDHPayMoney({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        ACTPRICE: item.ACTPRICE, // 执行价格
        BATERATE: item.BATERATE, // 扣率
        ISFL: item.IBL_ISFL, // 返利类型
        ISKPO: item.IBL_ISKPO, // 商空标志
        KORDERNO: item.IBL_KORDERNO, // 运单号
        QTY: item.IBL_NUM, //
        PAYTO: it.payerCode, // 付款方编码
        PAYTONAME: it.payerName, // 付款方名称
        PROCODE: '', // 工程单号
        PROLOSSMONEY: '', // 工程单台损失
        RETAILPRICE: item.ADVICEPRICE, // 零售价
        UNITPRICE: item.UNITPRICE, // 单价
        RELOSERATE: '0.0000', // 折扣
        VERCODE: '', //  特价版本号
        VERMONEY: '', // 特价单台差额
        REBATEMONEY: item.BATEMONEY, // 台返
        IBL_PAYTO_TYPE: it.payerType, // 付款方类型
      });
      if (upDHPay.code === '1') {
        item.payer.map((v) => {
          v.isChecked = false;
        });
        item.isExpand = !item.isExpand;
        it.isChecked = true;
        console.log(item);
        item.IBL_PAYMONEY = it.payerCode;
        item.IBL_PAYMONEYNAME = `(${it.payerCode})${it.payerName}`;
        console.log(item.isChecked);
        this.$emit('change', this.list, item, this.index);
        this.$emit('calBalance');
      }
    }

  }
};
</script>
