<template>
  <view class="order-foot-con">
    <view class="uni-flex uni-row order-foot-line">
      <view class="col-25 order-foot-inf" @click="getMore">...</view>
      <view v-for="item in buttonList" :key="item.name">
        <view v-if="item.name == ''" class="order-foot-infred" @click="ckickBot(item)"></view>

        <view v-else class="order-foot-inf2" @click="ckickBot(item)">
          <view :class="{'order-foot-inf4':!item.ischeck,'order-foot-inf5':item.ischeck}">{{item.name}}</view>
        </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import {
  ORDER
} from '../../store/mutationsTypes';

export default {
  name: 'orderDetailFoot',
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
  },
  created() {
    console.log('11111111');
    this.infoList = this[ORDER.GET_ORDER].orderDetail;
    console.log(this.infoList);

    if(this.infoList.info.jshi_order_gvs_status == '1') {
      this.buttonList.push(
        {
          name: '查看物流', ischeck: false
        }
      );
    }

    const details = this.infoList.details;

    // 判断订单节点是否存在
    if(details.jshd_tags == 'CROWD_FUNDING'
    && details.jshd_product_type == '3'
    && details.jshi_order_gvs_status == '1'
    && details.jshi_stock_type == 'ZCN'
    && details.jshi_stock_type == 'KXZF') {
      this.showNode = true;
      this.buttonList.push(
        { name: '订单节点', ischeck: false }
      )
    }

    if(this.infoList.btnsInfo.signInButton == 1) {
      this.buttonList.push(
        { name: '签收', ischeck: false }
      )
    }

    if(this.buttonList.length == 1) {
      this.buttonList.unshift( { name: '', ischeck: false })
      this.buttonList.unshift( { name: '', ischeck: false })
    }

    if(this.buttonList.length == 2) {
      this.buttonList.unshift( { name: '', ischeck: false })
    }
    // jshd_tags=CROWD_FUNDING&jshd_product_type=3
    // &jshi_order_gvs_status=1&(jshi_stock_type:"ZCN"|jshi_stock_type:"KXZF")
  },
  data() {
    return {
      infoList:{},
      showNode:false,
      buttonList: [],
    };
  },
  methods: {
    ckickBot(item) {
      if(item.name == '查看物流') {
        uni.navigateTo({
          url: `/pages/orderList/orderWL`
        });
      } else if(item.name == '签收') {
        this.orderSelfSignedFun()
      } else if(item.name == '订单节点') {
        uni.navigateTo({
          url: `/pages/orderList/orderNode`
        });
      }
    },
    async orderSelfSignedFun() {
      const { code, data } = await this.orderService.orderSelfSigned(this.infoList.info.bstnk);
      if (code === '1') {
        console.log(data)
      }
    }
  }
};
</script>

<style scoped>
  .order-foot-con {
    border-top:  1px solid #CDCDCD;
    height: 88px;
  }
  .order-foot-line{
    position: relative;
    display: flex;
    margin: auto;
  }
  .order-foot-inf {
    display: flex;
    color: #999999;
    font-size: 50px;
    padding-left: 10%;
  }
  .order-foot-inf2 {
    display: flex;
    font-size: 28px;
    padding-top: 12px;
    width: 180px;
  }
   .order-foot-infred {
    display: flex;
    font-size: 28px;
    padding-top: 12px;
    width: 180px;
    /* background: red; */
  }
  .order-foot-inf4 {
    color: #666666;
    border:  1px solid #DADADA;
    border-radius: 28px;
    padding: 10px;
    width: 160px;
    text-align: center;
  }
  .order-foot-inf5 {
    background-color: #ED2856;
    color: #FFFFFF;
    border:  1px solid #ED2856;
    border-radius: 28px;
    padding: 10px;
    width: 160px;
    text-align: center
  }

</style>
