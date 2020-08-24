<template>
  <view
    v-if="show"
    class="jModal">
    <view
      @tap="cancel"
      class="jModal-shadow"></view>
    <view class="jModal-center">
      <view v-if="title!== ''" class="jModal-head">
        {{title}}
      </view>
      <view class="jModal-content">
        <slot>111</slot>
      </view>
      <view class="jModal-btn">
        <view @tap="modalCancle" v-if="isCancle" class="btn-cancle">取消</view>
        <view @tap="modalSure" class="btn-sure">确定</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'JModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // title是否换行
    title: {
      type: String,
      default: ''
    },
    isCancle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancel() {
      debugger
      this.$emit('update:show', false);
    },
    modalCancle() {
      this.$emit('cancel');
    },
    modalSure() {
      this.$emit('confirm');
    },
  }
};
</script>
<style lang="scss">
  .jModal{
  }
  .jModal-shadow{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left: 0;
    background: #ccc;
    opacity: 0.8;
    z-index: 888;
  }
  .jModal-center{
    position: fixed;
    z-index: 889;
    width: 80%;
    max-width: 600px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: 16px;
    overflow: hidden;
    clear: both;
    .jModal-head{
      font-size: 36px;
      padding: 20px 30px 6px 30px;
    }
    .jModal-content{
      font-size: 30px;
      padding: 40px;
    }
    .jModal-btn{
      border: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      .btn-cancle{
        width: 50%;
        text-align: center;
        height: 80px;
        line-height: 80px;
        border-right: 1px solid #eee;
      }
      .btn-sure{
        flex-grow: 1;
        text-align: center;
        height: 80px;
        line-height: 80px;
        color: #007aff;
      }
    }

  }
</style>
