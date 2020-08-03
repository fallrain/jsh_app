<template>
  <view class="tFailureGoodsList">
    <view class="tFailureGoodsList-head">
      <view class="tFailureGoodsList-head-left">失效宝贝3件</view>
      <view class="tFailureGoodsList-head-opt">清空失效宝贝</view>
    </view>
    <t-failure-goods-item
      v-for="(item,index) in list"
      :key="index"
      :index="index"
      :checked.sync="item.checked"
      @change="goodsChange"
    ></t-failure-goods-item>
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
  methods: {
    goodsChange(checked, index) {
      this.list[index].checked = checked;
      this.$emit('change', this.list);
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
