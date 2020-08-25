<template>
  <view class="v-c-foot">
    <view class="v-c-foot-lin" @tap="choose">
      <view :class="['iconfont', checked ? 'iconradio active':'iconradio1']"></view>
      <text :class="['v-c-foot-lin-tex1',checked && 'active']">全选</text>
    </view>
    <text class="v-c-foot-lin-edit" @click="changTex">{{exit ? '编辑' : '取消'}}</text>
    <view class="v-c-foot-lin-tex2">
      已选中<text class="v-c-foot-lin-tex2-highlight">{{num}}</text>车
    </view>
    <view class="v-c-foot-lin-tex3">|</view>
    <view class="v-c-foot-lin-tex4">
      <text>合计：</text>
      <view class="v-c-foot-lin-tex4-price">¥{{numAll.toFixed(2)}}</view>
    </view>
    <button type="button" class="v-c-foot-btn" @click="comfim">{{exit ? '结算' : '删除'}}
    </button>
  </view>
</template>

<script>
export default {
  name: 'VehicleCarFoot',
  props: {
    // 全选
    checked: {
      type: Boolean,
      default: false
    },
    seq: {
      type: [Number, String]
    },
    num: {
      type: [Number, String]
    },
    numAll: {
      type: [Number, String]
    }
  },
  data() {
    return {
      exit: true,
    };
  },
  methods: {
    changTex() {
      this.exit = !this.exit;
    },
    choose() {
      const checked = !this.checked;
      this.$emit('update:checked', checked);
      this.$emit('checkAll', checked);
    },
    comfim() {
      this.$emit('comfimVehi', this.exit);
    }
  }
};
</script>

<style lang="scss" scoped>
  .v-c-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    padding-left: 30px;
    background: #fff;
    border-top: 1px solid #CDCDCD;
  }
  .v-c-foot-lin{
    display: flex;
    align-items: center;

    .iconfont {
      font-size: 30px;
      color: #CFCFCF;

    &.active {
       color: #2283E2;
     }
    }
  }
  .v-c-foot-lin-tex1{
    color: #333333;
    font-size: 28px;
    margin-left: 8px;

    &.active {
      color: #2283E2;
    }
  }
  .v-c-foot-lin-edit{
    color: #2283E2;
    font-size: 28px;
    margin-left: 20px;
    margin-right: 30px;
  }
  .v-c-foot-lin-tex2 {
    color: #666;
    font-size: 20px;
  }
  .v-c-foot-lin-tex2-highlight {
    color: #2283E2;
    font-size: 28px;
  }
  .v-c-foot-lin-tex3{
    font-size: 24px;
    color: #B3B3B3;
    margin-left:8px;
  }
  .v-c-foot-lin-tex4{
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;
    margin-left: 18px;
  }
  .v-c-foot-lin-tex4-price{
    color: $theme-color;
    font-size: 22px;
  }
  .v-c-foot-btn{
    display: inline-block;
    width: 116px;
    height: 42px;
    margin-left: 20px;
    line-height: 42px;
    text-align: center;
    background: #2283E2;
    border-radius: 21px;
    color: #fff;
    font-size: 24px;
  }
</style>
