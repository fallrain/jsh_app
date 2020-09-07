<template>
  <uni-popup
    ref="popup"
    type="bottom"
  >
    <view class="jRechargeBankPicker-wrap">
      <view class="jRechargeBankPicker-head">
        <view class="jRechargeBankPicker-head-title">{{title}}</view>
        <view
          @tap="close"
          class="jRechargeBankPicker-head-close"
        >X</view>
      </view>
      <view class="jRechargeBankPicker-cnt">
        <view class="jRechargeBankPicker-list-l">
          <view
            :class="['jRechargeBankPicker-list-l-item',item.isChecked && 'active']"
            :key="index"
            @tap="check(item,index)"
            v-for="(item,index) in list"
          >{{item.value}}
          </view>
        </view>
        <view class="jRechargeBankPicker-list-r">
          <view
            :class="['jRechargeBankPicker-list-r-item',item.isChecked && 'active']"
            :key="index"
            @tap="checkSub(item,index)"
            v-for="(item,index) in curSubItems"
          >{{item.value}}
            <view
              class="jRechargeBankPicker-list-r-item-check iconfont icontick"
              v-if="item.isChecked"
            ></view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>

export default {
  name: 'JRechargeBankPicker',
  components: {
  },
  props: {
    // 显示隐藏
    isShow: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 数据
    // list prop例子
    // example: [
    //   {
    //     key: 'cxk',
    //     value: '储蓄卡',
    //     children: [
    //       {
    //         key: '1',
    //         value: '中国农业银行',
    //         isChecked: false
    //       },
    //       {
    //         key: '2',
    //         value: '中国银行',
    //         isChecked: false
    //       },
    //       {
    //         key: '3',
    //         value: '中国工商银行',
    //         isChecked: false
    //       }
    //     ]
    //   },
    //   {
    //     key: 'xyk',
    //     value: '信用卡',
    //     children: [
    //       {
    //         key: '1',
    //         value: '中国光大银行',
    //         isChecked: false
    //       },
    //       {
    //         key: '2',
    //         value: '中国广发银行',
    //         isChecked: false
    //       },
    //       {
    //         key: '3',
    //         value: '中国浦发银行',
    //         isChecked: false
    //       }
    //     ]
    //   }
    // ],
    list: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      // 当前选中的银行子列表
      curSubItems: [],
      // 当前选中的父index
      curParIndex: 0
    };
  },
  created() {
    this.list[0].isChecked = true;
    this.$emit('change', this.list);
    this.curSubItems = this.list[0].children;
  },
  watch: {
    isShow: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          val ? this.open() : this.close();
        });
      }
    }
  },
  methods: {
    open() {
      if (this.$refs.popup) {
        this.$refs.popup.open();
      }
    },
    close() {
      this.$refs.popup.close();
    },
    check(item, index) {
      /* 选中子item */
      this.curSubItems.forEach((v) => {
        v.isChecked = false;
      });
      this.list.forEach((v) => {
        v.isChecked = false;
      });
      this.curSubItems = item.children;
      item.isChecked = true;
      this.list[index] = item;
      // 保存父index,在子item 改变的时候用
      this.curParIndex = index;
      this.$emit('change', this.list);
    },
    checkSub(item, index) {
      this.curSubItems.forEach((v) => {
        v.isChecked = false;
      });
      item.isChecked = true;
      this.list[this.curParIndex].children[index] = item;
      this.$emit('change', this.list);
    }
  }
};
</script>
<style lang="scss">
  $JRechargeBankPickerColor: #2283E2;
  .jRechargeBankPicker-wrap {
    background: #fff;
  }

  .jRechargeBankPicker-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 40px;
  }

  .jRechargeBankPicker-head-title {
    color: #333;
    font-size: 30px;
    line-height: 42px;
  }

  .jRechargeBankPicker-head-close {
    color: $JRechargeBankPickerColor;
    font-size: 28px;
  }

  .jRechargeBankPicker-cnt {
    margin-top: 40px;
    height: 534px;
    display: flex;
  }

  .jRechargeBankPicker-list-l {
    width: 170px;
    height: 534px;
    overflow-y: auto;
    flex-shrink: 0;
    border-right: 1px solid #E9E9E9;
  }

  .jRechargeBankPicker-list-l-item {
    width: 90px;
    height: 60px;
    margin-top: 58px;
    margin-left: auto;
    margin-right: auto;
    font-size: 30px;
    line-height: 40px;
    color: #333;
    text-align: center;

    &:first-child {
      margin-top: 0;
    }

    &.active {
      color: $JRechargeBankPickerColor;
      border-bottom: 6px solid $JRechargeBankPickerColor;
    }
  }

  .jRechargeBankPicker-list-r {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
    padding-left: 28px;
    padding-right: 20px;
  }

  .jRechargeBankPicker-list-r-item {
    position: relative;
    height: 76px;
    line-height: 76px;
    border-bottom: 1px solid #E9E9E9;
    color: #666;
    font-size: 28px;
    padding-left: 4px;

    &.active {
      color: $JRechargeBankPickerColor;
    }
  }

  .jRechargeBankPicker-list-r-item-check {
    position: absolute;
    top: 50%;
    right: 70px;
    transform: translateY(-50%);
    color: $JRechargeBankPickerColor;
    font-size: 36px;
  }
</style>
