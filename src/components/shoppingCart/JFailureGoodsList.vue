<template>
  <view class="jFailureGoodsList">
    <view class="jFailureGoodsList-head">
      <view class="jFailureGoodsList-head-left">失效宝贝3件</view>
      <view class="jFailureGoodsList-head-opt">清空失效宝贝</view>
    </view>
    <j-failure-goods-item
      v-for="(item,index) in list"
      :key="index"
      :index="index"
      :checked.sync="item.checked"
      @change="goodsChange"
    ></j-failure-goods-item>
  </view>
</template>

<script>
import JFailureGoodsItem from './JFailureGoodsItem';

export default {
  name: 'JFailureGoodsList',
  components: {
    JFailureGoodsItem
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
  .jFailureGoodsList {
    padding-top: 20px;
    padding-left: 24px;
    padding-bottom: 20px;
    background: #fff;
    border-radius: 20px;
  }

  .jFailureGoodsList-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }

  .jFailureGoodsList-head-left {
    height: 34px;
    color: #333;
    font-size: 24px;
  }

  .jFailureGoodsList-head-opt {
    color: $theme-color;
    font-size: 20px;
  }
</style>
