<template>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view class="jVersionSpecifications-pop">
      <view class="jVersionSpecifications-head j-flex-aic">
        <view class="jVersionSpecifications-head-title">{{title}}</view>
        <view
          class="jVersionSpecifications-head-title-icon"
          @tap="close"
        >X</view>
      </view>
      <slot name="head"></slot>
      <view class="jVersionSpecifications-pop-detail-wrap">
        <view
          class="jVersionSpecifications-pop-detail"
          v-for="(item,index) in data"
          :key="index"
        >
          <view class="jVersionSpecifications-pop-detail-head">
            <text class="jVersionSpecifications-pop-detail-head-title">{{item.title}}</text>
            <view
              :class="[
                'jVersionSpecifications-pop-detail-head-title-arrow iconfont iconxia',
                !item.isExpand && 'active'
              ]"
              @tap="toggleExpand(item)"
            >
            </view>
          </view>
          <view
            v-if="item.isExpand"
            class="jVersionSpecifications-pop-detail-list"
          >
            <div
              :class="['jVersionSpecifications-pop-detail-item',version.checked && 'active']"
              v-for="(version,vIndex) in item.list"
              :key="vIndex"
              @tap="handleClick(version,item.list,index)"
            >
              <view
                class="jVersionSpecifications-pop-detail-item-check"
                v-if="version.checked"
              >
                <view class="jVersionSpecifications-pop-detail-item-check-icon iconfont icontick"></view>
              </view>
              <view class="jVersionSpecifications-pop-detail-item-name-wrap mb8">
                <view class="jVersionSpecifications-pop-detail-item-name">名称：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type1">{{version.name}}</view>
              </view>
              <view class="jVersionSpecifications-pop-detail-item-name-wrap mb8">
                <view class="jVersionSpecifications-pop-detail-item-name">价格：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type2">¥ {{version.price}}</view>
              </view>
              <view class="jVersionSpecifications-pop-detail-item-name-wrap">
                <view class="jVersionSpecifications-pop-detail-item-name">有效期：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type3">{{version.time}}</view>
              </view>
              <view class="jVersionSpecifications-pop-detail-item-name-wrap">
                <view class="jVersionSpecifications-pop-detail-item-name">数量：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type3">{{version.num}}</view>
              </view>
            </div>
          </view>
        </view>
      </view>
      <view class="jVersionSpecifications-btn-wrap">
        <button
          type="button"
          class="goodsList-drawer-btn-confirm"
          @tap="confirm"
        >{{confirmBtnText}}
        </button>
        <button
          type="button"
          class="goodsList-drawer-btn-reset"
          @tap="cancel"
        >{{cancelBtnText}}
        </button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import {
  uniPopup
} from '@dcloudio/uni-ui';
import './css/jVersionSpecifications.scss';

export default {
  name: 'JVersionSpecifications',
  components: {
    uniPopup
  },
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 版本数据
    data: {
      type: Array,
      default: () => []
    },
    // 确认按钮文字
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文字
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.pop.open();
      } else {
        this.$refs.pop.close();
      }
    }
  },
  methods: {
    change({ show }) {
      this.$emit('update:show', show);
    },
    close() {
      /* 关闭弹层 */
      this.$emit('update:show', false);
    },
    handleClick(version, list, parIndex) {
      /* 选择版本 */
      const curChecked = version.checked;
      // 除了当前版本，其他版本的选择都取消
      this.data.forEach((v, index) => {
        if (parIndex !== index) {
          v.list.forEach((otherItem) => {
            otherItem.checked = false;
          });
        }
      });
      version.checked = !curChecked;
      this.$emit('change', this.data);
    },
    toggleExpand(item) {
      /* 选择规格展开or收起 */
      item.isExpand = !item.isExpand;
      this.$emit('change', this.data);
    },
    confirm() {
      /* 确定 */
      let checkedList = [];
      this.data.forEach((version) => {
        checkedList = checkedList.concat(version.list.filter(v => v.checked));
      });
      // 选中的版本列表数据
      this.$emit('confirm', checkedList);
      this.$emit('update:show', false);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>
