<template>
  <view class="jHeadTab-wrap">
    <view class="jHeadTab-list">
      <view
        class="jHeadTab-item"
        v-for="(item,index) in tabs"
        :key="index"
        @tap="tabHandle(item.handler)"
      >
        <text>{{item.name}}</text>
        <view
          v-if="item.icon"
          :class="['iconfont',item.icon]"
        ></view>
      </view>
    </view>
    <view class="jHeadTab-pop-tab-list">
      <view
        class="jHeadTab-pop-tab-item"
        v-for="(item,index) in popTabs"
        :key="index"
      >
        <text>{{item.name}}</text>
        <view class="iconfont iconxia"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JHeadTab',
  props: {
    // 顶部tab配置信息
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popTabs: [
        {
          name: '品牌'
        },
        {
          name: '类目'
        },
        {
          name: '一级类目'
        },
        {
          name: '二级类目'
        }
      ]
    };
  },
  methods: {
    tabHandle(handler) {
      /* tab 点击事件 */
      this.$emit('tabClick', handler);
    },
    tabTagHandle() {
      /* tag tab 点击事件 */
    }
  }
};
</script>

<style lang="scss">
  .jHeadTab-wrap {
    padding: 24px;
    background: #fff;
  }

  .jHeadTab-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
  }

  .jHeadTab-item {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;

    &.active {
      color: #2283E2;
    }

    .iconfont {
      font-size: 20px;
    }
  }

  .jHeadTab-pop-tab-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .iconfont {
      font-size: 8px;
    }
  }

  .jHeadTab-pop-tab-item {
    display: flex;
    align-items: center;
    height: 40px;
    background: #F2F2F7;
    border-radius: 22px;
    color: #666;
    font-size: 24px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
