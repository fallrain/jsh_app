<template>
  <view class="tdrawerfilteritem">
    <view class="tdrawerfilteritem-head">
      <view>
        <text>{{filterItem.name}}</text>
        <text class="tdrawerfilteritem-head-tips">{{filterItem.tips}}</text>
      </view>
      <i
        class="iconfont iconxia"
        :class="[
                  !filterItem.isExpand && 'reverse'
                ]"
        @click="toggleExpand(filterItem)"
      ></i>
    </view>
    <view
      class="tdrawerfilteritem-list"
      v-show="filterItem.isExpand"
    >
      <view
        v-for="(item,filterIndex) in filterItem.data"
        :key="filterIndex"
        class="tdrawerfilteritem-list-item"
        :class="[item.isChecked && 'active']"
        @click="choose(item,filterItem.data)"
      >{{item.value}}
      </view>
    </view>
  </view>
</template>

<script>
// import './css/TDrawerFilterItem.scss';

export default {
  name: 'TDrawerFilterItem',
  props: {
    // 筛选列表
    filterItem: {
      type: Object,
      default: () => {}
    },
    // 索引（小程序bug）
    index: {
      type: Number
    },
  },
  methods: {
    toggleExpand(item) {
      /* 展开或者收起 */
      item.isExpand = !item.isExpand;
      this.$emit('change', item, this.index);
    },
    choose(item, list) {
      /* 选择选项 */
      if (this.filterItem.type === 'radio') {
        if (!item.isChecked) {
          list.forEach((v) => {
            if (v.isChecked) {
              v.isChecked = false;
            }
          });
        }
      }
      // 翻转
      item.isChecked = !item.isChecked;
      this.filterItem.data = list;
      this.$emit('change', this.filterItem, this.index);
    },
  }
};
</script>
 <style lang="scss" scoped>
 
.tdrawerfilteritem-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      color: #666;
      height: 42px;
      margin-bottom: 24px;
      margin-top: 32px;
      padding-right: 30px;
  
    .iconxia {
      font-size: 20px;
    }
  
    .reverse {
      display: inline-block;
      transform: rotateX(180deg);
    }
  }

  .tdrawerfilteritem-head-icon-right {
    color: #999;
    font-size: 28px;
  }
  
  .tdrawerfilteritem-head-tips {
    font-size: 24px;
    color: #999;
  }
  
  .tdrawerfilteritem-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
  }
  
  .tdrawerfilteritem-list-item {
    width: 160px;
    height: 52px;
    margin-bottom: 32px;
    margin-right: 32px;
    background: #F7F7F8;
    border-radius: 26px;
    color: #666;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
  
  
    &.active {
      color: #ED2856;
      background: #FFF5F7;
    }
  
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  
  .tdrawerfilteritem-head-ads-wrap {
    padding-right: 30px;
  
    .tdrawerfilteritem-head {
      padding-right: 0;
    }
  }
  
  .tdrawerfilteritem-head-ads {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: #F7F7F8;
    border-radius: 24px;
    color: #666;
    font-size: 24px;
    padding-left: 32px;
    padding-right: 32px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .tdrawerfilteritem-price-range {
    display: flex;
    align-items: center;
  }
  
  
  .tdrawerfilteritem-price-ipt {
    width: 160px;
    height: 52px;
    background: #fff;
    border-radius: 24px;
    border: 1px solid #DBDBDB;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 24px;
  }
  
  .tdrawerfilteritem-price-line {
    width: 52px;
    height: 1px;
    background: #DBDBDB;
    margin-left: 34px;
    margin-right: 34px;
  }
  

</style>
