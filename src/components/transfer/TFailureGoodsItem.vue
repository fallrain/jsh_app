<template>
  <view class="tFailureGoodsItem">
    <view 
      class="tFailureGoodsItem-list"
      v-for="(order,index) in itemList.data.orderList"
      :key="index"
    >
      <view
      class="tFailureGoodsItem-cnt-check"
      @tap="choose"
      >
        <i :class="['iconfont', checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <view 
        class="tFailureGoodsItem-cnt-img-wrap"
      
      >
        <image :src="order.THUMBNAIL"></image>
      </view>
      <view class="tFailureGoodsItem-cnt">
        <view class="tFailureGoodsItem-cnt-head">
          <view class="tFailureGoodsItem-cnt-head-tag mr1">失效</view>
          <text class="tFailureGoodsItem-cnt-head-text">{{order.PRODUCTNAME}}</text>
        </view>
        <view class="tFailureGoodsItem-cnt-btm">
          <text class="tFailureGoodsItem-cnt-head-text">¥ {{order.SUMMONEY}}</text>
          <text class="tFailureGoodsItem-cnt-head-inf-mrr">付款方</text>
          <i 
            class="iconfont iconxia"
            @tap="showPayer(order)"
          ></i>
          <view class="tFailureGoodsItem-cnt-price-info" v-show="isShowPayer">
            <view class="tFailureGoodsItem-cnt-price-info-li"
              v-for="(it,index) in order.payer"
              :key="index"
              @tap="togglePayer(order)" 
            >
              ({{it.payerCode}}){{it.payerName}}
            </view>
          </view>
          <text class="tFailureGoodsItem-cnt-head-text mll">请选择付款方</text>
        </view>
        <view class="tFailureGoodsItem-cnt-head-inf-reason">{{order.SXREASON}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TFailureGoodsItem', 
  props: {
    // 选中
    checked: {
      type: Boolean,
      default: false
    },
    // 数据
    itemList: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number,
    }
  },
  data() {
    return {
      isShowPayer: false
    };
  },
  created() {
    
  },
  methods: {
    choose() {
      /* 选中 */
      const checked = !this.checked;
      this.$emit('update:checked', this.itemList.checked);
      this.$emit('change', checked, this.index);
    },
    showPayer(item) {
      this.isShowPayer = !this.isShowPayer
    },
      // 切换付款方
    async togglePayer(item) {
      const upDHPay = await this.transfergoodsService.upDHPayMoney ({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: 8700010462,
        ACTPRICE: item.SUMMONEY,
        BATERATE: 0.0000,
        ISFL: 1,
        ISKPO: 0,
        KORDERNO: item.IBL_KORDERNO,
        QTY: item.IBL_NUM,
        PAYTO: 8700010462,
        PAYTONAME: item.IBL_PAYMONEYNAME,
        PROCODE: "",
        PROLOSSMONEY: "",
        RETAILPRICE: 2449.0000,
        UNITPRICE: "2449.0000",
        RELOSERATE: "0.0000",
        VERCODE: "",
        VERMONEY: "",
        REBATEMONEY: "0.0000",
        IBL_PAYTO_TYPE: "00",
      });
      if(upDHPay.code === "1" ) {
        // console.log(data)
      }
    }
  }
};
</script>

<style lang="scss">
  .tFailureGoodsItem {
    position: relative;
    
    min-height: 198px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #EDE9E9;
  }
  .tFailureGoodsItem-list{
    display: flex;
    align-items: center;
  }
  .tFailureGoodsItem-cnt-img-wrap{
    flex-shrink: 0;
    width: 152px;
    height: 152px;
    image{
        width: 100%;
        height:100%;
    }
  }
  .tFailureGoodsItem-cnt {
    display: flex;
    min-height: 150px;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 40px;
  }

  .tFailureGoodsItem-cnt-head {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
  }

  .tFailureGoodsItem-cnt-head-text {
    color: #999;
    font-size: 24px;
  }

  .tFailureGoodsItem-cnt-head-tag {
    display: inline-block;
    height: 28px;
    background: #999;
    border-radius: 14px;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    padding-left: 12px;
    padding-right: 12px;
    color: #fff;
  }

  .tFailureGoodsItem-cnt-btm-tag {
    color: #999;
    font-size: 24px;
  }
  .tFailureGoodsItem-cnt-btm{
    position: relative;
    font-size:20px;
    .tFailureGoodsItem-cnt-head-inf-mrr{
        color: #333;
        margin-left: 162px;
    }
    .iconfont {
        font-size: 12px;
        margin: 0px 8px;
    }
    .tFailureGoodsItem-cnt-price-info {
      width: 500px;
      position: absolute;
      top: 50px;
      left: 22px;
      z-index: 500;
      background: rgba(255, 255, 255, 0.911);
      border: 1px solid #c3c3c3;
      .tFailureGoodsItem-cnt-price-info-li {
        margin:10px 0px 10px 20px;
      }
    }
 }
 .tFailureGoodsItem-cnt-head-inf-reason{
     font-size: 20px;
     color: #ED2856;

 }
</style>
