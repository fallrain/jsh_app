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
          class="iconfont iconcross jAddressPicker-head-close"
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
            @tap="choose(item,index)"
          >
            <view
              :class="['jAddressPicker-cnt-item-check iconfont',item.checked && 'icontick']"
            ></view>
            <text class="jAddressPicker-cnt-item-text">{{item.name}}</text>
            <view
              v-if="item.children"
              :class="['jAddressPicker-cnt-item-head-icon iconfont iconxia', !item.isExpand && 'active']"
              @tap="toggleExpand(item)"
            ></view>
          </view>
          <block
            v-if="item.children && item.isExpand"
          >
            <view
              class="jAddressPicker-cnt-detail"
            >
              <view
                :class="[
                  'jAddressPicker-cnt-detail-item',
                  detail.checked && 'active',
                  item.childrenType==='short' && 'short'
                ]"
                v-for="(detail,dIndex) in item.children"
                :key="dIndex"
                @tap="checkDetail(detail,item.children,item)"
              >
                <view
                  class="jVersionSpecifications-pop-detail-item-check"
                  v-if="detail.checked"
                >
                  <view class="jVersionSpecifications-pop-detail-item-check-icon iconfont icontick"></view>
                </view>
                <view class="jAddressPicker-cnt-detail-item-inf">{{detail.name}}</view>
              </view>
            </view>
          </block>
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
          childrenType: 'short',
          checked: false,
          isExpand: true,
          children: [
            {
              name: '北京云仓',
              checked: false,
            },
            {
              name: '上海云仓',
              checked: false,
            },
            {
              name: '重庆云仓',
              checked: false,
            },
            {
              name: '青岛云仓',
              checked: false,
            }
          ]
        },
        {
          name: '配送至',
          checked: false,
          isExpand: true,
          childrenType: 'long',
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
    choose(item, index) {
      /* 选中一个item */
      this.pickerList.forEach((v, i) => {
        v.checked = false;
        // 存在children 且不是当前的item
        if (v.children && index !== undefined && index !== i) {
          v.children.forEach((child) => {
            child.checked = false;
          });
        }
      });
      item.checked = true;
    },
    checkDetail(item, list, parent) {
      /* 选中一个人详细地址 */
      list.forEach((v) => {
        v.checked = false;
      });
      item.checked = true;
      // 选中上级
      if (!parent.checked) {
        this.choose(parent);
      }
    },
    toggleExpand(item) {
      /* 展开收起 */
      item.isExpand = !item.isExpand;
    }
  }
};
</script>

<style scoped>

</style>
