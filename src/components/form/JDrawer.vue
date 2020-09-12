<template>
  <uni-drawer
    @change="drawerChange"
    ref="filterDrawer"
    mode="right"
  >
    <view
      class="scroll-container"
    >
      <view class="filter-drawer">
        <scroll-view
          :scroll-y="true"
          class="filter-drawer-cnt-list"
        >
          <slot></slot>
        </scroll-view>
        <view class="filter-drawer-btn-wrap">
          <button
            type="button"
            class="filter-drawer-btn-confirm"
            @click="filterConfirm"
          >确定
          </button>
          <button
            @click="filterReset"
            type="button"
            class="filter-drawer-btn-reset"
          >重置
          </button>
        </view>
      </view>
    </view>
  </uni-drawer>
</template>

<script>

export default {
  name: 'JDrawer',
  components: {
  },
  props: {
    show: Boolean
  },
  watch: {
    show(val) {
      /* 打开抽屉 */
      const filterDrawer = this.$refs.filterDrawer;
      if (val) {
        filterDrawer.open();
      } else {
        filterDrawer.close();
        this.$emit('filterConfirm');
      }
    }
  },
  methods: {
    drawerChange(val) {
      /* 回馈抽屉值，修改props.show */
      this.$emit('update:show', val);
    },
    filterReset() {
      /* 重置 */
      this.$emit('filterReset');
    },
    filterConfirm() {
      /* 确定 */
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss">
  .scroll-container {
    height: 100%;
  }

  .filter-drawer {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  .filter-drawer-cnt-list {
    height: calc(100% - 160px);
    overflow-y: auto;
    padding-left: 32px;
    /*padding-bottom: 60px;*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .filter-drawer-btn-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: 82px;
    width: 100%;
    height: 66px;
    padding-right: 32px;
    background: #fff;
  }

  @mixin filter-drawer-btn {
    font-size: 24px;
    width: 184px;
    height: 66px;
    line-height: 66px;
  }

  .filter-drawer-btn-confirm {
    @include filter-drawer-btn;
    border-top-left-radius: 33px;
    border-bottom-left-radius: 33px;
    color: #fff;
    background: #ED2856;
  }

  .filter-drawer-btn-reset {
    @include filter-drawer-btn;
    border-top-right-radius: 33px;
    border-bottom-right-radius: 33px;
    background: #F7F7F8;
    color: #666;
  }
</style>
