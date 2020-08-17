<template>
  <view class="transferDetailItem">
    <view
      class="transferDetailItem-wrap"
      v-for="(good,index) in goods"
      :key="index"
    >
      <view
        class="transferDetailItem-detail"
        
      >
        <view class="transferDetailItem-detail-odd">
          调货单号：<text class="transferDetailItem-detail-odd-num">{{good.IBL_KORDERNO}}</text>
          <view class="transferDetailItem-detail-close iconfont iconcross"></view>
        </view>
        <view class="transferDetailItem-detail-cnt">
          <view class="transferDetailItem-detail-cnt-img-wrap">
            <image
              :src="good.THUMBNAIL"
            >
          </view>
          <view class="transferDetailItem-detail-cnt-inf">
            <view class="transferDetailItem-detail-head">            
              <view class="transferDetailItem-detail-cnt-inf-title">
                {{good.PRODUCTNAME}}         
              </view>
              <i 
                :class="['transferDetailItem-detail-like','iconfont',good.$favorite ? 'iconicon3':'iconshoucang1']"
                @tap="addFavorite(good)"
              ></i>
            </view>
            <view class="transferDetailItem-detail-cnt-price-inf">
                <view class="transferDetailItem-detail-cnt-price">¥ {{good.ADVICEPRICE}}</view>
            </view>
            <view class="transferDetailItem-detail-cnt-version">
              <view class="transferDetailItem-detail-cnt-inf-mrr">付款方</view>
              <i class="iconfont iconxia transferDetailItem-detail-cnt-inf-icon"></i>
              <view class="transferDetailItem-detail-cnt-inf-item">{{good.IBL_PAYMONEYNAME}}</view>
            </view>
          </view>  
         
        </view>  
        <view class="transferDetailItem-price-foottotal">
          <view class="transferDetailItem-cnt-price-total">
            库存：
            <text class="transferDetailItem-cnt-stock">{{good.IBL_MAXNUM}}</text>
          </view> 
            <text class="transferDetailItem-cnt-price-subtotal mla">小计： </text>
            <text class="transferDetailItem-cnt-price-subprice mlb"> ¥ {{good.SUMMONEY}}</text>   
          
          <uni-number-box
            :value="good.IBL_NUM" 
            :max="Number(good.IBL_MAXNUM)" 
            :disabled="Number(good.IBL_MAXNUM) === 0"
            @change="changeNum($event, good)"
          
          >
          </uni-number-box>     
        </view>         
        <view class="transferDetailItem-detail-mark-item-name">
            <text class="transferDetailItem-detail-mark-item-name-star">直扣:{{(good.BATERATE*100)}}% </text>|
            <view class="transferDetailItem-detail-mark-item-name-end">返利：{{good.IBL_ISFL}} </view>|
            <text class="transferDetailItem-detail-mark-item-name-star">台返:{{good.BATEMONEY}}</text>|
            <view class="transferDetailItem-detail-mark-item-name-end">供价:￥{{good.ACTPRICE}}</view>          
        </view>
      </view>
    </view>
    <view class="transferDetailItem-total">
      <view class="transferDetailItem-total-text ml48">共计金额:</view>
      <view class="transferDetailItem-total-price ml20">¥ 3456.00</view>
    </view>
  </view> 
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/transferDetailItem.scss';

export default {
  name: 'transferDetailItem',
  components: {
    uniNumberBox
  },
  props: {
    // 商品列表
    goods: {
      type: Array,
      default: () => []
    },
    // 
    // 索引
    index: {
      type: Number
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  onLoad() {
    console.log(this.goods)
    // this.isCreditModeChange()
  },
  methods: {
    // isCreditModeChange() {
    //   /* switch change */
    //   this.$emit('change', this.goods, this.index);
    // },
    addFavorite(good) {
       console.log(good)
      if(good.$favorite) {
        // 取消收藏
         const removeInterest = this.customerService.removeInterestProduct({
          customerCode: "8700010462",
          account: "8700010462",
          productCodeList: [good.GBID]
        });
      } else {
        // 添加收藏
         const addInterest = this.customerService.addInterestProduct({
          customerCode: "8700010462",
          account: "8700010462",
          productCode: good.GBID
        });
      }
      good.$favorite = !good.$favorite
    },
    async changeNum(value, item) {
      // if (value !== item.IBL_NUM) {
      //   const result = await this.transfergoodsService.updateOrderQty({
      //     timestamp: Date.parse(new Date()),
      //     dhSeq: this.list.data.IBR_SEQ,
      //     korderNo: item.IBL_KORDERNO,
      //     longfeiUSERID: '8700010462',
      //     qty: value
      //   });
      //   if(result.code === "1") {
      //       // 价格修改
      //       item.IBL_NUM = value
      //       item.SUMMONEY = item.IBL_NUM * Number(item.ADVICEPRICE)
      //       let sum = 0
      //       this.list.data.orderList.forEach(ele => {
      //         sum += Number(ele.SUMMONEY)
      //       })
      //       console.log(sum)
           
      //      this.$emit("query")
      //   }
      // }
      
    },

  }
};
</script>

<style scoped>

</style>
