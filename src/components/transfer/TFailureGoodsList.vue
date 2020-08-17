<template>
  <view class="tFailureGoodsList">
    <view class="tFailureGoodsList-head">
      <view class="tFailureGoodsList-head-left">失效宝贝1件</view>
      <view class="tFailureGoodsList-head-opt" @tap="emptyProduct">清空失效宝贝</view>
    </view>
    <t-failure-goods-item v-for="(itemList,index) in list" :key="index"
      :index="index" :itemList="itemList" @change="goodsChange"></t-failure-goods-item>
  </view>
</template>

<script>
import TFailureGoodsItem from './TFailureGoodsItem';

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
    // const num = 0
    this.list.map((item) => {
      //  num =
      console.log(item);
      this.temp = item;
    });
    // this.orderNum = num
    // console.log(this.orderNum)
  },
  methods: {
    goodsChange(itemList, index) {
      console.log(itemList);
      this.list[index] = itemList;
      const setList = JSON.parse(JSON.stringify(this.list));
      this.list = setList;
      this.$emit('change', this.list);
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
          longfeiUSERID: '8700010462',
          KORDERNO: oddNum
        });
        console.log(result);
      } else {
        confirm('暂时没有失效产品');
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
    color: $theme-color;
    font-size: 20px;
  }
</style>
