<template>
  <view class="transferGoodsBtm">
    <view
      class="transferGoodsBtm-check"
    >
      <view class="iconfont icongouwuchezhengpin shoppingcart"></view>
      <text class="transferGoodsBtm-check-shop">购物车 </text>
      <text class="transferGoodsBtm-check-edit">({{shoppingCartNum}})</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'transferGoodsBtm',
  props:["shoppingCartNum"],
//   props: {
//     // 全选
//     checked: {
//       type: Boolean,
//       default: false
//     }
//   },
  methods: {
    // choose() {
    //   const checked = !this.checked;
    //   this.$emit('update:checked', checked);
    //   this.$emit('checkAll', checked);
    // }
  }
};
</script>

<style lang="scss">
  .transferGoodsBtm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    padding-left: 40px;
    padding-right: 18px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
    align-items: center;
  }

  .transferGoodsBtm-check {
    width:238px;
    height:54px;
    background:#ED2856;
    border-radius:27px;
    display: flex;
    align-items: center; 
    margin-left:490px; 
    font-size:24px;
    color:#fff;
  }
  .shoppingcart {
    font-size:34px !important; 
    margin-left:26px;
    margin-right:6px;
    color:#fff;
  }

</style>
