<template>
  <view class="specs-cont">
    <view :class="showler ? '' : 'showType'">
      <view v-for="(item,index) in attributesMap" :key="index">
        <view class="uni-flex uni-row specs-head-border">
          <view class="specs-head-text">{{index}}</view>
        </view>
        <view class="uni-flex uni-row specs-info-border" v-for="(iitn,indexA) in item" :key="indexA">
          <view class="specs-head-info-left col-40">{{iitn.attributeName}}</view>
          <view class="specs-head-info-right">{{iitn.attributeValue}}</view>
        </view>
      </view>
    </view>
    <view class="specs-info-show" @click="showLer">
      {{showler ? '收起' : '展开'}}
      <view :class="['iconfont iconxia',showler && 'specs-info-active']" style="padding-left: 4px;padding-top: 4px;"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'proSpecs',
  props: {// 父级传来的数据
    attributesMap: {// 数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showler: false
    };
  },
  methods: {
    showLer() {
      this.showler = !this.showler;
    }
  }
};
</script>

<style scoped>
  .specs-cont {
    padding: 10px;
  }
  .specs-head-border {
    border: 2px solid #EFEFEF;
  }
  .specs-info-border {
    border: 2px solid #EFEFEF;
    border-top: none;
  }
  .specs-head-text {
    margin: 5px 5px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    color: #333333;
    font-size: 24px;
  }
  .specs-head-info-left {
    margin: 10px;
    padding: 0 10px;
    font-size: 24px;
    color: #999999;
    text-align: right;
    border-right: 2px solid #EFEFEF;
  }
  .specs-head-info-right {
    margin: 10px;
    padding: 0 10px;
    font-size: 24px;
    color: #999999;
  }
  .specs-info-show {
    display: flex;
    padding-left: 45%;
    color: #999999;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .showType{
    max-height:520px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden
  }
  .specs-info-active {
    transform: rotateX(180deg);
  }
</style>
