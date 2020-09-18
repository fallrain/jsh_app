<template>
  <uni-drawer
    @change="drawerChange"
    ref="filterDrawer"
    mode="right"
  >
    <view class="filter-drawer">
      <view class="filter-drawer-cnt-list">
        <slot></slot>
      </view>
      <view class="filter-drawer-btn-wrap">
        <button
          type="button"
          class="filter-drawer-btn-confirm"
          @tap="filterConfirm"
        >确定
        </button>
        <button
          @tap="filterReset"
          type="button"
          class="filter-drawer-btn-reset"
        >重置
        </button>
      </view>
    </view>
  </uni-drawer>
</template>

<script>

export default {
  name: 'TDrawer',
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
      this.$emit('filterConfirm');
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .uni-drawer__content{
  width:608px;
}
  .filter-drawer {
    position: relative;
    height: 100%;

  }
  .filter-drawer-cnt-list {
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding-left: 32px;

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
