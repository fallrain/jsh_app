<template>
  <view class="transferDetailItem">
    <view
      class="transferDetailItem-wrap"
      v-for="(good,index) in goods.orderList"
      :key="index"
    >
      <view
        class="transferDetailItem-detail"
        
      >
        <view class="transferDetailItem-detail-odd">
          调货单号：<text class="transferDetailItem-detail-odd-num">{{good.IBL_KORDERNO}}</text>
          <view class="transferDetailItem-detail-close iconfont iconcross" @tap="deleteProduct(good)"></view>
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
              <i 
                class="iconfont iconxia"
                :class="[
                  good.isExpand && 'reverse'
                ]"
                @tap="showPayer(good,index)"
              ></i>
              <view class="transferDetailItem-cnt-price-info" v-show="good.isExpand ">
                <view class="transferDetailItem-cnt-price-info-li"
                  v-for="(it,index) in good.payer"
                  :key="index"
                  :class="[it.isChecked && 'active']"
                  @tap="togglePayer(good, it, index)" 
                >
                ({{it.payerCode}}){{it.payerName}}
                </view>
              </view>
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
      <view class="transferDetailItem-total-price ml20">¥ {{goods.SUMMONEY}}</view>
    </view>
  </view> 
</template>

<script>
import {
  uniNumberBox
} from '@dcloudio/uni-ui';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
import './css/transferDetailItem.scss';

export default {
  name: 'transferDetailItem',
  components: {
    uniNumberBox
  },
  props: {
    // 商品列表
    goods: {
      type: Object,
      default: () => {}
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
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    }),
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
          customerCode: this.defaultSendToInf.customerCode,
          account: this.defaultSendToInf.customerCode,
          productCodeList: [good.GBID]
        });
      } else {
        // 添加收藏
         const addInterest = this.customerService.addInterestProduct({
          customerCode: this.defaultSendToInf.customerCode,
          account: this.defaultSendToInf.customerCode,
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
            item.IBL_NUM = value
            item.SUMMONEY = item.IBL_NUM * Number(item.ADVICEPRICE)
            let sum = 0
            this.goods.orderList.forEach(ele => {
              sum += Number(ele.SUMMONEY)
            })
            console.log(sum)
            this.goods.SUMMONEY = sum
           this.$emit("change",value, item,this.goods.SUMMONEY)
      //   }
      // }
      
    },
    // 删除单个产品
    deleteProduct(item) {
      this.$emit("delete",item)
    },
    showPayer(item) {
      // 显示付款方
      console.log(item)
      item.isExpand = !item.isExpand
      console.log(item.isExpand)
      this.$emit('change', item, this.index);
    },
     // 切换付款方
    async togglePayer(item, it, index) {
      console.log(item)
      const upDHPay = await this.transfergoodsService.upDHPayMoney ({
        timestamp: Date.parse(new Date()),
        longfeiUSERID:  this.defaultSendToInf.customerCode,
        ACTPRICE: it.ADVICEPRICE,  //执行价格
        BATERATE: item.BATERATE,     //扣率
        ISFL: item.IBL_ISFL,   //返利类型
        ISKPO: item.IBL_ISKPO,   //商空标志
        KORDERNO: item.IBL_KORDERNO,   //运单号
        QTY: item.IBL_NUM,   //  
        PAYTO: it.payerCode,   //付款方编码
        PAYTONAME: it.payerName,   //付款方名称
        PROCODE: "",   //工程单号
        PROLOSSMONEY: "",   //工程单台损失
        RETAILPRICE: item.ADVICEPRICE,   //零售价
        UNITPRICE: item.ADVICEPRICE,   //单价
        RELOSERATE: "0.0000",   //折扣
        VERCODE: "",   //  特价版本号
        VERMONEY: "",   //特价单台差额
        REBATEMONEY: item.BATEMONEY,   //台返
        IBL_PAYTO_TYPE: it.payerType,   //付款方类型
      })
      if(upDHPay.code === "1" ) {
         
          item.payer.map(v => {
              v.isChecked = false
            })  
          item.isExpand = !item.isExpand
          it.isChecked = true
          console.log(item)
          item.IBL_PAYMONEYNAME = "(" + it.payerCode + ")" + it.payerName
          console.log(item.isChecked)
        this.$emit('change', item, it, this.index);
        // this.$emit('calBalance')
      }


    }

  }
};
</script>

<style scoped>

</style>
