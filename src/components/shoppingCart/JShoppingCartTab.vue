<template>
  <view class="jShoppingCartTab">
    <view class="jShoppingCartTab-list">
      <view
        :class="['jShoppingCartTab-item',tab.active && 'active']"
        v-for="(tab) in tabs"
        :key="tab.id"
        @tap="tabClick(tab)"
      >
        <text>{{tab.name}}</text>
      </view>
    </view>
    <view class="jShoppingCartTab-right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JShoppingCartTab',
  data() {
    return {
      tabs: [
        {
          id: 'gwc',
          name: '购物车',
          active: true
        },
        {
          id: 'zc',
          name: '整车直发',
          active: false
        },
        {
          id: 'zx',
          name: '中心调货',
          active: false
        }
      ]
    };
  },
  methods: {
    tabClick(item) {
      /* tab 点击事件 */
      this.tabs.forEach((v) => {
        v.active = false;
      });
      item.active = true;
      this.$emit('tabClick', item);
    }
  }
};
</script>

<style lang="scss">
  .jShoppingCartTab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88px;
  }

  .jShoppingCartTab-list {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }

  .jShoppingCartTab-item {
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 28px;
    color: #666;
    margin-right: 60px;

    &.active {
      font-size: 36px;
      color: #ED2856;

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        height: 4px;
        background: #ED2856;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
</style>
