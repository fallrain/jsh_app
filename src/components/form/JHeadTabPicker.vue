<template>
  <view
    :class="['jHeadTabPicker',show && 'jHeadTabPicker-in']"
    v-reset-position
  >
    <view
      class="jHeadTabPicker-list"
      v-if="value&&(value[0].type==='ZCPC'||value[0].type==='ZCPSLX'||value[0].type==='ZCLX')"
    >
      <view
        :class="['jHeadTabPicker-item-ZC',checkedIndex===index && 'active']"
        v-for="(item,index) in value"
        :key="index"
        @tap="choose(item,index)"
      >
        <view
          :class="['jHeadTabPicker-item-check iconfont icontick']"
        ></view>
        <text class="jHeadTabPicker-item-text j-text-ellipsis">{{item.name}}</text>
      </view>
    </view>
    <view v-else class="jHeadTabPicker-list">
      <view
        :class="['jHeadTabPicker-item',checkedIndex===index && 'active']"
        v-for="(item,index) in value"
        :key="index"
        @tap="choose(item,index)"
      >
        <view
          :class="['jHeadTabPicker-item-check iconfont icontick']"
        ></view>
        <text class="jHeadTabPicker-item-text j-text-ellipsis">{{item.name}}</text>
      </view>
    </view>
    <view class="jHeadTabPicker-btn-wrap">
      <button
        class="jHeadTabPicker-btn-default"
        type="button"
        @tap="confirm"
      >确定
      </button>
      <button
        class="jHeadTabPicker-btn-primary"
        type="button"
        @tap="reset"
      >重置
      </button>
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
    // 索引
    index: {
      type: [String, Number]
    },
    // picker数据
    value: {
      type: Array,
      default: () => {
      }
    },
    // 选中的index
    checkedIndex: {
      type: [String, Number, Object],
      default: null
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
  methods: {
    close() {
      /* 关闭 */
      this.$emit('update:show', false);
      this.$emit('showChange', false);
    },
    reset() {
      /* 重置 */
      this.$emit('update:checkedIndex', null);
      this.$emit('checkedIndexChange', null);
      // todo 这里不应该发出确认的方法'
      this.$emit('confirm', this.index, this.value);
      if (this.value[0].type === 'ZCJD') {
        this.value[4].checked = true; // 发货基地重置为黄岛
      } else if (this.value[0].type === 'ZCPC') {
        // 整车拼车的重置,重置为空，然后上层查询是默认为选发货基地
      } else if (this.value[0].type === 'ZCLX' || this.value[0].type === 'ZCPSLX') {
        this.value[0].checked = true;
      }
    },
    confirm() {
      /* 确定 */
      this.close();
      let choseItem;
      if (this.checkedIndex !== null) {
        choseItem = this.value[this.checkedIndex];
      }
      this.$emit('confirm', this.index, choseItem);
    },
    choose(item, index) {
      /* 选中 */
      this.$emit('update:checkedIndex', index);
      this.$emit('checkedIndexChange', index);
      this.$emit('change', this.value, this.index);
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
    margin-top: -1px
  }

  .jHeadTabPicker-btn-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
  }

  @mixin jHeadTabPicker-btn {
    display: inline-block;
    width: 50%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    text-align: center;
    border: 1px solid $theme-color;
    border-top: none;

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
    color: $theme-color;
    border-bottom-right-radius: 10px;
  }

  .jHeadTabPicker-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 18px;
    padding-left: 26px;
    padding-right: 26px;
  }

  .jHeadTabPicker-item {
    position: relative;
    width: 25%;
    height: 54px;
    line-height: 54px;
    display: flex;
    align-items: center;
    padding-left: 32px;
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

  .jHeadTabPicker-item-ZC {
    position: relative;
    width: 50%;
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
    left: 0;
    display: none;
    transform: translateY(-50%);
    color: $theme-color;
    font-size: 26px;
  }

  .jHeadTabPicker-item-text {
    white-space: nowrap;
    font-size: 24px;
    color: #333;
  }

  .jHeadTabPicker-in {
    transform: translateY(0);
  }
</style>
