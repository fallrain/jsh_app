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
      <scroll-view
        :scroll-y="true"
        class="jAddressPicker-cnt"
      >
        <view
          :class="['jAddressPicker-cnt-item',item.checked && 'active']"
          v-for="(item,index) in pickerList"
          :key="index"
        >
          <view
            class="jAddressPicker-cnt-item-head"
          >
            <view
              :class="['jAddressPicker-cnt-item-check iconfont',item.checked && 'icontick']"
            ></view>
            <text
              @tap="choose(item,index)"
              class="jAddressPicker-cnt-item-text"
            >{{item.name}}</text>
            <view
              v-if="item.children"
              :class="['jAddressPicker-cnt-item-head-icon iconfont iconxia', !item.isExpand && 'active']"
              @tap="toggleExpand(item,index)"
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
                @tap.stop="checkDetail(detail,item.children,item,index)"
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
      </scroll-view>
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
    },
    // picker数据
    // 数据示例：
    // pickerList: [
    //   {
    //     name: '云仓',
    //     checked: false,
    //     // 是否无子元素
    //     isSingle:true
    //   },
    //   {
    //     name: '异地云仓',
    //     childrenType: 'short',
    //     // 是否能被点击
    //     isCanBeCheck: false,
    //     checked: false,
    //     isExpand: true,
    //     children: [
    //       {
    //         id: 'ccc',
    //         name: '北京云仓',
    //         checked: false,
    //       }
    //     ]
    //   },
    //   {
    //     name: '配送至',
    //     checked: false,
    //     isExpand: true,
    //     childrenType: 'long',
    //     children: [
    //       {
    //         id: 'ccc',
    //         name: '(88003222）山东省青岛市崂山区长宁路街道长宁路173号',
    //         checked: false,
    //       }
    //     ]
    //   },
    // ]
    pickerList: {
      type: Array,
      default: () => []
    },
    beforeCheckParent: {
      type: Function
    },
    beforeCheck: {
      type: Function
    }
  },
  data() {
    return {

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
      // @isCanBeCheck 能被点才能点击
      // @isSingle 是否没子元素
      if (item.isCanBeCheck === undefined || item.isCanBeCheck) {
        if (this.beforeCheckParent && !this.beforeCheckParent(item, index)) {
          return;
        }
        this.reset(index);
        item.checked = true;
        this.$emit('change', this.pickerList, null, item, !item.isSingle);
      }
    },
    reset(index) {
      /* 重置 */
      this.pickerList.forEach((v, i) => {
        v.checked = false;
        // 存在children 且不是当前的item
        if (v.children && index !== undefined && index !== i) {
          v.children.forEach((child) => {
            child.checked = false;
          });
        }
      });
    },
    checkDetail(item, list, parent, parIndex) {
      /* 选中一个人详细地址 */
      if (this.beforeCheck && !this.beforeCheck({
        item,
        list,
        parent,
        parIndex
      })) {
        return;
      }
      list.forEach((v) => {
        v.checked = false;
      });
      item.checked = true;
      this.reset(parIndex);
      // 选中上级
      if (this.isCanBeCheck && !parent.checked) {
        this.choose(parent, parIndex);
      }
      this.$emit('change', this.pickerList, item, parent);
    },
    toggleExpand(item) {
      /* 展开收起 */
      item.isExpand = !item.isExpand;
      this.$emit('change', this.pickerList, null, item, true, 'expand');
    }
  }
};
</script>

<style scoped>

</style>
