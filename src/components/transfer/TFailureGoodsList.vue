<template>
  <view class="tFailureGoodsList">
    <view class="tFailureGoodsList-head">
      <view class="tFailureGoodsList-head-left">失效宝贝{{list[0] ? list[0].data.orderList.length : 0}}件</view>
      <view class="tFailureGoodsList-head-opt" @tap="emptyDelete">清空失效宝贝</view>
    </view>
    <t-failure-goods-item v-for="(itemList,index) in list" :key="index"
      :index="index" :itemList="itemList" @change="goodsChange"></t-failure-goods-item>
  </view>
</template>

<script>
import TFailureGoodsItem from './TFailureGoodsItem';
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '@/store/mutationsTypes';


export default {
  name: 'TFailureGoodsList',
  components: {
    TFailureGoodsItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      temp: {},
      orderNum: ''
    };
  },
  created() {
    console.log(this.list);
    this.list.map((item) => {
      //  num =
      console.log(item);
      this.temp = item;
    });
    // this.orderNum = num
    // console.log(this.orderNum)
  },
  computed: {
    ...mapGetters({
      userInf: USER.GET_USER,
      saleInfo: USER.GET_SALE,
      defaultSendToInf: USER.GET_DEFAULT_SEND_TO
    }),
  },
  methods: {
    goodsChange(itemList, index) {
      console.log(itemList);
      this.list[index] = itemList;
      const setList = JSON.parse(JSON.stringify(this.list));
      this.list = setList;
      this.$emit('change', this.list);
    },
    emptyDelete() {
      console.log(this.list[0]);
      if (this.list[0].data.orderList && this.list[0].data.orderList.length > 0) {
        const _this = this;
        // confirm("确认要删除选中订单")
        uni.showModal({
          title: '',
          content: '确认要删除失效产品吗',
          success(res) {
            if (res.confirm) {
              console.log(res);
              _this.emptyProduct();
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      } else {
        // confirm('暂时没有失效产品');
        uni.showToast({
          title: '暂时没有失效产品',
          duration: 3000
        });
      }
    },
    async emptyProduct() {
      const oddNum = [];
      this.list.map((item) => {
        item.data.orderList.map((v) => {
          oddNum.push(v.IBL_KORDERNO);
        });
      });
      if (oddNum) {
        const result = await this.transfergoodsService.deleteProduct({
          timestamp: Date.parse(new Date()),
          longfeiUSERID: this.saleInfo.customerCode,
          KORDERNO: oddNum,
        });
        console.log(result);
        if (result.code === '1' && result.data.code === '200') {
          uni.showToast({
            title: result.data.message,
            duration: 3000
          });
          this.$emit('query');
        }
      }
    }
  }
};
</script>

<style lang="scss">
  .tFailureGoodsList {
    padding-top: 20px;
    padding-left: 24px;
    padding-bottom: 20px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #979797;
    margin-top: 24px;
    margin-bottom: 92px;
  }

  .tFailureGoodsList-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }

  .tFailureGoodsList-head-left {
    height: 34px;
    color: #333;
    font-size: 24px;
  }

  .tFailureGoodsList-head-opt {
    color: #2283E2;
    font-size: 20px;
  }
</style>
