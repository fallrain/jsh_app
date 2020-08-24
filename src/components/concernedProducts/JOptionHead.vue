<template>
  <view class="jOptionHead-wrap">
    <block v-if="isEdit">
      <view
        @tap="checkAll"
        class="j-flex-aic"
      >
        <view
          :class="['jOptionHead-check iconfont', isCheckedAll ? 'iconradio active':'iconradio1']"
        ></view>
        <text
          :class="['jOptionHead-check-text mr40', isCheckedAll && 'active']"
        >全选</text>
      </view>
      <text
        @tap="handleDel"
        class="jOptionHead-check-text"
      >删除</text>
    </block>
    <view class="jOptionHead-right">
      <text
        @tap="exitEditMode"
        class="jOptionHead-check-text"
        v-if="isEdit"
      >完成</text>
      <text
        v-else
        @tap="toEditMode"
        class="jOptionHead-check-text"
      >编辑</text>
      <view
        class="jOptionHead-line"
      ></view>
      <view
        @tap="handleShowFilter"
        class="jOptionHead-filter-wrap"
      >
        <view class="jOptionHead-filter-text">筛选</view>
        <view class="iconfont iconshaixuan"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JOptionHead',
  props: {
    // 是否选中所有
    isCheckedAll: {
      type: Boolean,
      default: false
    },
    // 是否是编辑模式
    isEdit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {};
  },
  methods: {
    checkAll() {
      /* 选中所有 */
      const isCheckedAll = !this.isCheckedAll;
      this.$emit('update:isCheckedAll', isCheckedAll);
      this.$emit('checkAll', isCheckedAll);
    },
    toEditMode() {
      /* 进入编辑模式 */
      this.$emit('update:isEdit', true);
      this.$emit('editModeChange', true);
    },
    exitEditMode() {
      /* 退出编辑模式 */
      this.$emit('update:isEdit', false);
      this.$emit('editModeChange', false);
    },
    handleShowFilter() {
      /* 点击了筛选 */
      this.$emit('onFilter');
    },
    handleDel() {
      /* 删除操作 */
      this.$emit('del');
    }
  },
};
</script>

<style lang="scss">
  .jOptionHead-wrap {
    display: flex;
    align-items: center;
    padding: 24px 46px 24px 40px;
    font-size: 24px;
    line-height: 36px;
    background: #fff;
  }

  .jOptionHead-check {
    font-size: 36px;
    color: #CFCFCF;
    margin-right: 20px;

    &.active {
      color: $theme-color;
    }
  }

  .jOptionHead-check-text {
    color: $theme-color;
  }

  .jOptionHead-line {
    width: 1px;
    height: 22px;
    background: #D9D9D9;
    margin-left: 38px;
    margin-right: 30px;
  }

  .jOptionHead-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .jOptionHead-filter-wrap {
    display: flex;
    align-items: flex-end;

    .iconfont {
      font-size: 30px;
    }
  }

  .jOptionHead-filter-text {
    color: #333;
  }
</style>
