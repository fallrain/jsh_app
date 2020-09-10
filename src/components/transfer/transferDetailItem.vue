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
          <view class="transferDetailItem-detail-close iconfont iconcross" @tap="deleteProduct(good,index)"></view>
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
                <view class="transferDetailItem-detail-cnt-price">¥ {{good.UNITPRICE}}</view>
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
            @change="changeNum($event, good, index)"

          >
          </uni-number-box>
        </view>
        <view class="transferDetailItem-detail-mark-item-name">
            <text class="transferDetailItem-detail-mark-item-name-star">直扣:{{(good.BATERATE*100)}}% </text>|
            <view class="transferDetailItem-detail-mark-item-name-end">返利：
              <span v-if="good.IBL_ISFL===0">COM</span>
              <span v-else-if="good.IBL_ISFL===1">BF</span>
              <span v-else-if="good.IBL_ISFL===2">FHQ</span>
              <span v-else-if="good.IBL_ISFL===5">BZK</span>
            </view>|
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
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
import './css/transferDetailItem.scss';

export default {
  name: 'transferDetailItem',
  components: {
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
      // baseUrl: process.env.BASE_URL
    };
  },
  onLoad() {

    // this.isCreditModeChange()
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
    addFavorite(good) {
      console.log(good);
      if (good.$favorite) {
        // 取消收藏
        const removeInterest = this.customerService.removeInterestProduct({
          customerCode: this.saleInfo.customerCode,
          account: this.saleInfo.customerCode,
          productCodeList: [good.GBID]
        });
      } else {
        // 添加收藏
        const addInterest = this.customerService.addInterestProduct({
          customerCode: this.saleInfo.customerCode,
          account: this.saleInfo.customerCode,
          productCode: good.GBID
        });
      }
      good.$favorite = !good.$favorite;
    },
    // async getOrderList(ele) {
    //   console.log('wwwwwwwwwwww', ele);
    //   // 调货购物车数据
    //   // console.log(this.saleInfo.customerCode)
    //
    // },
    async changeNum(value, item, index) {
      console.log(item);
      //购物车列表数据
      // const { code, data } = await this.transfergoodsService.allOrderList({
      //   timestamp: Date.parse(new Date()),
      //   longfeiUSERID: this.saleInfo.customerCode
      // });
      // if (code === '1') {
      //   console.log(data.data);
      //   const page = data.data;
      //   if (page && page.length > 0) {
      //     page.forEach(ele => {
      //       // console.log(ele);
      //       console.log(this.goods.IBR_SEQ);
      //       if (ele.IBR_SEQ === this.goods.IBR_SEQ) {
      //         console.log('3333333', ele);
      //         ele.orderList.forEach(v => {
      //           if (v.IBL_KORDERNO === item.IBL_KORDERNO) {
      //             item.IBL_NUM = value;
      //             console.log('xxxxxxxxxx', item.IBL_NUM);
      //           }
      //         });
      //         this.goods.calue = Math.round(ele.IBR_JSTIJI / 15 * 100);
      //         console.log('444444444', this.goods.calue);
      //       }
      //     });
      //   }
      // }
      // 购物车修改数量接口
      if (value !== item.IBL_NUM) {
        const result = await this.transfergoodsService.updateOrderQty({
          timestamp: Date.parse(new Date()),
          dhSeq: this.goods.IBR_SEQ,
          korderNo: item.IBL_KORDERNO,
          longfeiUSERID: this.saleInfo.customerCode,
          qty: value
        });
        if (result.code === '1') {
          console.log('ddddddddddd',result.data.data.ALLVOLUMN);
          this.goods.calue = Math.round(result.data.data.ALLVOLUMN / 15 * 100);
          // console.log('hahahhaha', this.goods);
          console.log(index);
          item.IBL_NUM = value;
          item.SUMMONEY = item.IBL_NUM * Number(item.UNITPRICE);
          let sum = 0;
          this.goods.orderList.forEach((ele) => {
            sum += Number(ele.SUMMONEY);
          });
          console.log(sum);
          console.log('2222222222', item);
          this.goods.SUMMONEY = sum;
          console.log(this.goods.calue);
          this.$emit('changeGood', item, index);
        }
      }
    },
    // 删除单个产品
    deleteProduct(item, index) {
      console.log('******123');
      const _this = this;
      uni.showModal({
        title: '',
        content: '确认要删除此产品吗',
        success(res) {
          if (res.confirm) {
            console.log(res);
            _this.$emit('delete', item, index);
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    showPayer(item, index) {
      // 显示付款方
      console.log(item);
      item.isExpand = !item.isExpand;
      console.log(item.isExpand);
      this.$emit('changeGood', item, index);
    },
    // 切换付款方
    async togglePayer(item, it, index) {
      console.log(item);
      const upDHPay = await this.transfergoodsService.upDHPayMoney({
        timestamp: Date.parse(new Date()),
        longfeiUSERID: this.saleInfo.customerCode,
        ACTPRICE: it.ACTPRICE, // 执行价格
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
        item.IBL_PAYMONEYNAME = `(${it.payerCode})${it.payerName}`;
        console.log(item.isChecked);
        // this.$emit('change', item, it, this.index);
        // this.$emit('calBalance')
      }
    }

  }
};
</script>

<style scoped>

</style>
