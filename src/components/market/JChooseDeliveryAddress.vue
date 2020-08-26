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
            class="iconfont iconguanbi"
            @tap="hide"
          ></i>
        </view>
        <view class="jChooseDeliveryAddressDrawer-input">
          <input v-model="searchVal" type="text" placeholder="请输入地址">
        </view>
        <view class="jChooseDeliveryAddressDrawer-list">
          <view
            :class="['jChooseDeliveryAddressDrawer-item',item.checked && 'active']"
            v-for="(item,index) in searchAddResult"
            :key="index"
            @tap="check(item)"
          >
            <view
              class="jChooseDeliveryAddressDrawer-item-check"
            >
              <i
                v-if="item.checked"
                class="iconfont icondui"
              ></i>
            </view>
            <view class="jChooseDeliveryAddressDrawer-item-cnt">{{item.addressName}}</view>
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
    show: Boolean,
    // 地址列表
    addressList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      searchVal: '',
      searchAddResult: [],
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
    },
    searchVal(val) {
      const addArr = [];
      this.addressList.forEach((item) => {
        if (item.addressName.indexOf(val) > -1) {
          addArr.push(item);
        }
      });
      this.searchAddResult = addArr;
    },
    addressList() {
      this.searchAddResult = this.addressList;
    }
  },
  methods: {
    drawerChange(val) {
      if (val === false) {
        this.searchVal = '';
      }
      /* 回馈抽屉值，修改props.show */
      this.$emit('update:show', val);
    },
    check(item) {
      this.addressList.forEach((v) => {
        this.$set(v, 'checked', false);
      });
      this.$set(item, 'checked', true);
      this.$emit('changeAddress', this.addressList, item);
    },
    hide() {
      this.searchVal = '';
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
  .jChooseDeliveryAddressDrawer-input{
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    input{
      width: 400px;
      height: 60px;
      line-height: 60px;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }
  .jChooseDeliveryAddressDrawer-list{
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
  }
</style>
