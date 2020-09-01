<template>
  <view>
    <uni-drawer
      ref="jChooseDeliveryAddressDrawer"
      mode="right"
      @change="drawerChange"
    >
      <view class="jChooseDeliveryAddressDrawer">
        <view class="jChooseDeliveryAddressDrawer-head">
          <text>配送至</text>
          <i
            class="iconfont iconcross"
            @tap="hide"
          ></i>
        </view>
        <scroll-view
          :scroll-into-view="activeItemName"
          :scroll-y="true"
          class="jChooseDeliveryAddressDrawer-list"
        >
          <view
            :class="['jChooseDeliveryAddressDrawer-item',item.checked && 'active']"
            v-for="(item,index) in list"
            :id="'item'+item.customerCode"
            :key="index"
            @tap="check(item)"
          >
            <view
              class="jChooseDeliveryAddressDrawer-item-check"
            >
              <i
                v-if="item.checked"
                class="iconfont icontick"
              ></i>
            </view>
            <view class="jChooseDeliveryAddressDrawer-item-cnt">{{item.name}}</view>
          </view>
        </scroll-view>
      </view>
    </uni-drawer>
  </view>
</template>

<script>
import {
  uniDrawer
} from '@dcloudio/uni-ui';

export default {
  name: 'JChooseDeliveryAddress',
  components: {
    uniDrawer
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 数据列表
    list: {
      type: Array,
      default: () => []
    },
    // 当前选中的item
    curItem: {
      type: Object,
      default: () => {
      }
    },
    // 默认在视口内的item
    activeItemName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  watch: {
    show(val) {
      /* 打开抽屉 */
      const jChooseDeliveryAddressDrawer = this.$refs.jChooseDeliveryAddressDrawer;
      if (val) {
        jChooseDeliveryAddressDrawer.open();
      } else {
        jChooseDeliveryAddressDrawer.close();
      }
    }
  },
  methods: {
    drawerChange(val) {
      /* 回馈抽屉值，修改props.show */
      this.$emit('update:show', val);
    },
    check(item) {
      /* 选中一个条目 */
      this.list.forEach((v) => {
        this.$set(v, 'checked', false);
      });
      this.$set(item, 'checked', true);
      this.$emit('change', this.list, item);
    },
    hide() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss">
  .jChooseDeliveryAddressDrawer {
    height: 100%;
    padding: 56px 24px;
    padding-right: 0;
  }

  .jChooseDeliveryAddressDrawer-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    font-weight: 600;
    color: #333;
    font-size: 30px;
    padding-right: 24px;

    .iconfont {
      color: #ED2856;
      font-weight: 400;
      font-size: 30px;
    }
  }

  .jChooseDeliveryAddressDrawer-list {
    padding-top: 18px;
    height: calc(100% - 42px);
  }

  .jChooseDeliveryAddressDrawer-item {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    padding-left: 0;
    color: #666;
    border-bottom: 1px solid #F0F0F0;

    &.active {
      color: #ED2856;
      padding-left: 0;
    }
  }

  .jChooseDeliveryAddressDrawer-item-cnt {
    font-size: 28px;
    line-height: 48px;
  }

  .jChooseDeliveryAddressDrawer-item-check {
    width: 52px;
    margin-right: 18px;

    .iconfont {
      font-size: 36px;
    }
  }
</style>
