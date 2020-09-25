<template>
  <view class="jFailureGoodsList">
    <view class="jFailureGoodsList-head">
      <view class="jFailureGoodsList-head-left">失效宝贝{{list.length}}件</view>
      <view
        @tap="handleClear"
        class="jFailureGoodsList-head-opt"
      >清空失效宝贝
      </view>
    </view>
    <j-failure-goods-item
      v-for="(item,index) in list"
      :goods="item"
      :showCheck="false"
      :key="item.id"
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
    },
    handleClear() {
      /* 清空失效宝贝 */
      this.$emit('clear');
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
