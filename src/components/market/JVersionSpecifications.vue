<template
>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view
      class="jVersionSpecifications-pop">
      <view class="jVersionSpecifications-head j-flex-aic">
        <view class="jVersionSpecifications-head-title">{{title}}</view>
        <view
          class="jVersionSpecifications-head-title-icon"
          @tap="close"
        >X
        </view>
      </view>
      <scroll-view
        :scroll-y="true"
        class="jVersionSpecifications-pop-detail-wrap"
      >
        <view
          class="jVersionSpecifications-pop-detail"
        >
          <view
            class="jVersionSpecifications-pop-detail-list"
          >
            <view
              :class="['jVersionSpecifications-pop-detail-item',version.checked && 'active']"
              v-for="(version,vIndex) in versionData"
              :key="version.versionCode"
              @tap="handleClick(version,vIndex)"
            >
              <view
                class="jVersionSpecifications-pop-detail-item-check"
                v-if="version.checked"
              >
                <view class="jVersionSpecifications-pop-detail-item-check-icon iconfont icontick"></view>
              </view>
              <view
                class="jVersionSpecifications-pop-detail-item-name-wrap mb8"
                v-if="version.versionCode"
              >
                <view class="jVersionSpecifications-pop-detail-item-name">名称：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type1 fs20">
                  {{version.priceTypeStr}}{{version.versionCode}}
                </view>
              </view>
              <view
                class="jVersionSpecifications-pop-detail-item-name-wrap mb8"
                v-if="version.price"
              >
                <view class="jVersionSpecifications-pop-detail-item-name">价格：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type2">¥ {{version.specialPrice}}</view>
              </view>
              <view
                class="jVersionSpecifications-pop-detail-item-name-wrap"
                v-if="version.endDate"
              >
                <view class="jVersionSpecifications-pop-detail-item-name">有效期：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type3">{{version.endDate}}</view>
              </view>
              <view
                class="jVersionSpecifications-pop-detail-item-name-wrap"
                v-if="version.usableQty"
              >
                <view class="jVersionSpecifications-pop-detail-item-name">数量：</view>
                <view class="jVersionSpecifications-pop-detail-item-val-type3">{{version.usableQty}}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
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
import './css/jVersionSpecifications.scss';

export default {
  name: 'JVersionSpecifications',
  components: {
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
    versionData: {
      type: Array,
      default: () => []
    },
    // 类型: radio(单选) checkbox（多选）custom（自定义）
    type: {
      type: String,
      default: 'checkbox'
    },
    // 自定义check函数
    customCheckFun: {
      type: Function
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
  created() {
  },
  data() {
    return {
      updataIndex: 0
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.pop.open();
      } else {
        this.$refs.pop.close();
        this.$emit('close');
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
    handleClick(v) {
      v.checked = !v.checked;
      console.log(this.versionData);
      this.$emit('change', this.versionData);
    },
    confirm() {
      /* 确定 */
      const checkedList = [];
      this.versionData.forEach((v, index) => {
        if (v.checked) {
          checkedList.push({
            ...v,
            $parentId: v.id,
            $choseIndex: index
          });
        }
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
