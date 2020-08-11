<template>
  <view class="tShoppingCartItem">
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
          <text class="tShoppingCartItem-head-volume">{{Math.round(list.data.IBR_JSTIJI/15*100)}}%</text>
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
            <view class="tShoppingCartItem-cnt-price">¥ {{item.ADVICEPRICE}}</view>
            <view class="tShoppingCartItem-cnt-stock">库存：{{item.IBL_MAXNUM}}</view>
          </view>
           <view class="tShoppingCartItem-btm-version">
            <view  
              class="tShoppingCartItem-cnt-price-inf-picker"
            >
              <view class="tShoppingCartItem-cnt-price-inf-mrr">付款方</view>
              <i 
                class="iconfont iconxia"
                @tap="showPayer(item)"
              ></i>
               <view class="tShoppingCartItem-cnt-price-info" v-show="isShowPayer">
                 <view class="tShoppingCartItem-cnt-price-info-li"
                  v-for="(it,index) in item.payer"
                  :key="index"
                  @tap="togglePayer(item)" 
                 >
                  ({{it.payerCode}}){{it.payerName}}
                 </view>
               </view>
              <view class="tShoppingCartItem-cnt-price-inf-item">{{item.IBL_PAYMONEYNAME}}</view>
            </view>
          </view>
        </view>  
        <view 
          class="tShoppingCartItem-head-close iconfont iconcross"
          @tap="deleteShoppingCart(item)"
        ></view>
        <i 
          :class="['tShoppingCartItem-cnt-like', 'iconfont', item.$favorite ? 'iconicon3':'iconshoucang']"
          @tap="addFavorite(item)"
        />
       
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
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import './css/TShoppingCartItem.scss';

export default {
  name: 'TShoppingCartItem',
  components: {
    uniNumberBox
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
    }
  },
  data() {
    return {
      isShowPayer: false,
      // 显示收藏
      queryCustomer:[]

    };
  },
  created(){
  },
  methods: {
    choose() {
      /* 选中本商品 */
      const {
        checked,data
      } = this.list;
      console.log(this.list)
      this.list.checked = !checked;
      console.log(data)
      this.$emit('change', this.list, this.index);
    },
    showPayer() {
      // 显示付款方
      this.isShowPayer = !this.isShowPayer;
    },
    addFavorite(goods) {
      if(goods.$favorite) {
        // 取消收藏
         const removeInterest = this.customerService.removeInterestProduct({
          customerCode: "8700010462",
          account: "8700010462",
          productCodeList: [goods.GBID]
        });
      } else {
        // 添加收藏
         const addInterest = this.customerService.addInterestProduct({
          customerCode: "8700010462",
          account: "8700010462",
          productCode: goods.GBID
        });
      }
      goods.$favorite = !goods.$favorite
      console.log(goods)
    },
    async changeNum(value, item) {
      if (value !== item.IBL_NUM) {
        const result = await this.transfergoodsService.updateOrderQty({
          timestamp: Date.parse(new Date()),
          dhSeq: this.list.data.IBR_SEQ,
          korderNo: item.IBL_KORDERNO,
          longfeiUSERID: '8700010462',
          qty: value
        });
        if(result.code === "1") {
            // 价格修改
            item.IBL_NUM = value
            item.SUMMONEY = item.IBL_NUM * Number(item.ADVICEPRICE)
            let sum = 0
            this.list.data.orderList.forEach(ele => {
              sum += Number(ele.SUMMONEY)
            })
            console.log(sum)
           this.list.data.SUMMONEY = sum.toFixed(2)
           this.$emit("query")
        }
      }   
    },
    goTransferDetail(seq,list) {
      console.log(list)
       uni.navigateTo({
         url: '/pages/transferGoods/transferDetail?IBR_SEQ='+ seq + '&list='+ JSON.stringify(list)
      })    
    },
    async deleteShoppingCart(item) {
      // 删除购物车数据
      const deleteOrder = await this.transfergoodsService.deleteOrderForm ({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: 8800101954,
        KORDERNO: item.IBL_KORDERNO,
      });
      if(deleteOrder.code === "1") {
        this.$emit("query")
        this.$emit("getNum")
      }
    },
    // 切换付款方
    async togglePayer(item) {
      const upDHPay = await this.transfergoodsService.upDHPayMoney ({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: 8700010462,
        ACTPRICE: item.ADVICEPRICE,
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
