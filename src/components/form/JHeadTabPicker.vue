<template>
  <view
    :class="['jHeadTabPicker',show && 'jHeadTabPicker-in']"
    v-reset-position
  >
    <view class="jHeadTabPicker-list">
      <view
        :class="['jHeadTabPicker-item',item.checked && 'active']"
        v-for="(item,index) in value"
        :key="index"
        @tap="choose(item)"
      >
        <view
          :class="['jHeadTabPicker-item-check iconfont icondui']"
        ></view>
        <text class="jHeadTabPicker-item-text">{{item.name}}</text>
      </view>
    </view>
    <view class="jHeadTabPicker-btn-wrap">
      <button
        class="jHeadTabPicker-btn-default"
        @tap="confirm"
      >确定
      </button>
      <button class="jHeadTabPicker-btn-primary">重置</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JHeadTabPicker',
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // picker数据
    value: {
      type: Array,
      default: () => {
      }
    }
  },
  directives: {
    // 重新判断组件应该的位置
    resetPosition: {
      inserted(el) {
        const {
          left
        } = el.parentElement.getBoundingClientRect();
        el.style.left = `-${left}px`;
      }
    }
  },
  watch: {
    // 监控show的状态，触发show事件
    show(val) {
      this.$emit('showChange', val);
    }
  },
  methods: {
    close() {
      /* 关闭 */
      this.$emit('update:show', false);
    },
    confirm() {
      /* 确定 */
      this.close();
    },
    choose(item) {
      /* 选中 */
      this.value.forEach((v) => {
        v.checked = false;
      });
      item.checked = true;
      this.$emit('change', this.value);
    }
  }
};
</script>

<style lang="scss">
  .jHeadTabPicker {
    position: absolute;
    z-index: 98;
    background: #F7F7F8;
    top: 100%;
    width: 100vw;
    min-height: 234px;
    padding-bottom: 80px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transform: translateY(-100%);
    transition: transform .3s;
  }

  .jHeadTabPicker-btn-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @mixin jHeadTabPicker-btn {
    display: inline-block;
    width: 50%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    text-align: center;
  }

  .jHeadTabPicker-btn-default {
    @include jHeadTabPicker-btn;
    background: $theme-color;
    color: #fff;
    border-bottom-left-radius: 10px;
  }

  .jHeadTabPicker-btn-primary {
    @include jHeadTabPicker-btn;
    background: #fff;
    border: 1px solid $theme-color;
    color: $theme-color;
    border-bottom-right-radius: 10px;
  }

  .jHeadTabPicker-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 18px;
  }

  .jHeadTabPicker-item {
    position: relative;
    width: 25%;
    height: 54px;
    line-height: 54px;
    display: flex;
    align-items: center;
    padding-left: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.active {
      .iconfont {
        display: block;
        color: $theme-color;
      }

      .jHeadTabPicker-item-text {
        color: $theme-color;
      }
    }
  }

  .jHeadTabPicker-item-check {
    position: absolute;
    top: 50%;
    left: 30px;
    display: none;
    transform: translateY(-50%);
    color: $theme-color;
    font-size: 30px;
  }

  .jHeadTabPicker-item-text {
    font-size: 24px;
    color: #333;
  }

  .jHeadTabPicker-in{
    transform: translateY(0);
  }
</style>
