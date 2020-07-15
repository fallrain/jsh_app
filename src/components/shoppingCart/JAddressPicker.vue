<template>
  <uni-popup
    ref="jAddressPickerPop"
    type="bottom"
    @change="change"
  >
    <view class="jAddressPicker">
      <view class="jAddressPicker-head">
        <text class="jAddressPicker-head-title">配送至</text>
        <view
          class="iconfont iconguanbi jAddressPicker-head-close"
          @tap="close"
        ></view>
      </view>
      <view class="jAddressPicker-cnt">
        <view
          :class="['jAddressPicker-cnt-item',item.checked && 'active']"
          v-for="(item,index) in pickerList"
          :key="index"
        >
          <view
            class="jAddressPicker-cnt-item-head"
            @tap="choose(item)"
          >
            <view
              :class="['jAddressPicker-cnt-item-check iconfont',item.checked && 'icondui']"
            ></view>
            <text class="jAddressPicker-cnt-item-text">{{item.name}}</text>
          </view>
          <view
            class="jAddressPicker-cnt-detail"
            v-if="item.children"
          >
            <view
              :class="['jAddressPicker-cnt-detail-item',detail.checked && 'active']"
              v-for="(detail,dIndex) in item.children"
              :key="dIndex"
              @tap="checkDetail(detail,item.children)"
            >{{detail.name}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import {
  uniPopup
} from '@dcloudio/uni-ui';
import './css/jAddressPicker.scss';

export default {
  name: 'JAddressPicker',
  components: {
    uniPopup
  },
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerList: [
        {
          name: '云仓',
          checked: false
        },
        {
          name: '异地云仓',
          checked: false
        },
        {
          name: '配送至',
          checked: false,
          children: [
            {
              name: '(88003222）山东省青岛市崂山区长宁路街道长宁路173号',
              checked: false,
            },
            {
              name: '(88003222）山东省青岛市崂山区长宁路街道长宁路173号',
              checked: false,
            },
            {
              name: '(88003222）山东省青岛市崂山区长宁路街道长宁路173号',
              checked: false,
            }
          ]
        },
      ]
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.jAddressPickerPop.open();
      } else {
        this.$refs.jAddressPickerPop.close();
      }
    }
  },
  methods: {
    change({ show }) {
      this.$emit('update:show', show);
    },
    close() {
      this.$emit('update:show', false);
    },
    choose(item) {
      /* 选中一个item */
      this.pickerList.forEach((v) => {
        v.checked = false;
        if (v.children) {
          v.children.forEach((child) => {
            child.checked = false;
          });
        }
      });
      item.checked = !item.checked;
    },
    checkDetail(item, list) {
      /* 选中一个人详细地址 */
      list.forEach((v) => {
        v.checked = false;
      });
      item.checked = true;
    }
  }
};
</script>

<style scoped>

</style>
