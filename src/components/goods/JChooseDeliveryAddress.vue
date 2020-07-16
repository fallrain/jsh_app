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
        <view class="jChooseDeliveryAddressDrawer-list">
          <view
            :class="['jChooseDeliveryAddressDrawer-item',item.checked && 'active']"
            v-for="(item,index) in list"
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
        </view>
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
    show: Boolean
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '(8800212607)李沧区重庆中路420号沃尔豪大楼G区A座2008室'
        },
        {
          id: 2,
          name: '(8800212607)李沧区黑龙江中路342号甲A栋G座2039室'
        },
        {
          id: 3,
          name: '(8800212607)山东省临淄区齐都花园5号楼1单元502户'
        }
      ]
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
      this.list.forEach((v) => {
        this.$set(v, 'checked', false);
      });
      this.$set(item, 'checked', true);
    },
    hide() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss">
  .jChooseDeliveryAddressDrawer {
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
    }
  }

  .jChooseDeliveryAddressDrawer-list {
    margin-top: 10px;
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
