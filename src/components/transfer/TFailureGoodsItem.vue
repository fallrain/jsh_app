<template>
  <view class="tFailureGoodsItem">
    <view 
      class="tFailureGoodsItem-list"
      v-for="(order,index) in itemList.data.orderList"
      :key="index"
    >
      <view
      class="tShoppingCartItem-cnt-check"
      @tap="choose"
      >
        <i :class="['iconfont', checked ? 'iconradio active':'iconradio1']"></i>
      </view>
      <view 
        class="tShoppingCartItem-cnt-img-wrap"
      
      >
        <image :src="order.THUMBNAIL"></image>
      </view>
      <view class="tFailureGoodsItem-cnt">
        <view class="tFailureGoodsItem-cnt-head">
          <view class="tFailureGoodsItem-cnt-head-tag mr1">失效</view>
          <text class="tFailureGoodsItem-cnt-head-text">{{order.PRODUCTNAME}}</text>
        </view>
        <view class="tFailureGoodsItem-cnt-btm">
          <text class="tFailureGoodsItem-cnt-head-text">¥ {{order.SUMMONEY}}</text>
          <text class="tFailureGoodsItem-cnt-head-inf-mrr">付款方</text>
          <i class="iconfont iconxia"></i>
          <text class="tFailureGoodsItem-cnt-head-text mll">请选择付款方</text>
        </view>
        <view class="tFailureGoodsItem-cnt-head-inf-reason">{{order.SXREASON}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TFailureGoodsItem', 
  props: {
    // 选中
    checked: {
      type: Boolean,
      default: false
    },
    // 数据
    itemList: {
      type: Object,
      default: () => {}
    },
    // 索引
    index: {
      type: Number,
    }
  },
  data() {
    return {};
  },
  created() {
    
  },
  methods: {
    choose() {
      /* 选中 */
      const checked = !this.checked;
      this.$emit('update:checked', this.itemList.checked);
      this.$emit('change', checked, this.index);
    }
  }
};
</script>

<style lang="scss">
  .tShoppingCartItem-cnt-check {
    color: #CFCFCF;
  }
  .tFailureGoodsItem {
    position: relative;
    
    min-height: 198px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #EDE9E9;
  }
  .tFailureGoodsItem-list{
    display: flex;
    align-items: center;
  }
  .tShoppingCartItem-cnt-img-wrap{
    flex-shrink: 0;
    width: 152px;
    height: 152px;
    image{
        width: 100%;
        height:100%;
    }
  }
  .tFailureGoodsItem-cnt {
    display: flex;
    min-height: 150px;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 40px;
  }

  .tFailureGoodsItem-cnt-head {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
  }

  .tFailureGoodsItem-cnt-head-text {
    color: #999;
    font-size: 24px;
  }

  .tFailureGoodsItem-cnt-head-tag {
    display: inline-block;
    height: 28px;
    background: #999;
    border-radius: 14px;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    padding-left: 12px;
    padding-right: 12px;
    color: #fff;
  }

  .tFailureGoodsItem-cnt-btm-tag {
    color: #999;
    font-size: 24px;
  }
  .tFailureGoodsItem-cnt-btm{
    font-size:20px;
    .tFailureGoodsItem-cnt-head-inf-mrr{
        color: #333;
        margin-left: 162px;
    }
    .iconfont {
        font-size: 12px;
        margin: 0px 8px;
    }
 }
 .tFailureGoodsItem-cnt-head-inf-reason{
     font-size: 20px;
     color: #ED2856;

 }
</style>
