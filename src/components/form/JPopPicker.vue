<template>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view class="jPopPicker-pop">
      <view class="jPopPicker-pop-head">
        <view class="jPopPicker-pop-head-title">{{title}}</view>
        <view
          class="jPopPicker-pop-head-icon iconfont iconcross"
          @tap="close"
        ></view>
      </view>

      <scroll-view
        :scroll-y="true"
        class="jPopPicker-pop-item-wrap"
      >
        <view
          :class="[
            'jPopPicker-pop-item',
            choseOptions.find(v=>v===item[keyName]) && 'active'
          ]"
          v-for="(item) in options"
          :key="item[keyName]"
          @tap="check(item)"
        >
          <view
            :class="[
            'jPopPicker-pop-item-icon iconfont icontick',
          ]"
          ></view>
          <view class="jPopPicker-pop-item-cnt">
            <text v-if="isShowValue">{{item.value}}</text>
            <slot v-bind:data="item"></slot>
          </view>
        </view>
      </scroll-view>
    </view>
  </uni-popup>
</template>

<script>
import {
  uniPopup
} from '@dcloudio/uni-ui';
import './css/jPopPicker.scss';

export default {
  name: 'JPopPicker',
  components: {
    uniPopup
  },
  props: {
    // 类型：radio/checkbox
    type: {
      type: String,
      default: 'radio'
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 可否被点击
    isCanBeCheck: {
      type: Boolean,
      default: true
    },
    // picker 标题
    title: {
      type: [
        String,
        Number
      ],
      default: ''
    },
    keyName: {
      type: String,
      default: 'key'
    },
    // picker选项
    // 例:[{key:1,value:'馒头'}，{key:2,value:'米饭'}]
    options: {
      type: Array,
      default: () => []
    },
    // 选中的选项
    choseOptions: {
      type: Array,
      default: () => []
    },
    // 是否显示value
    isShowValue: {
      type: Boolean,
      default: true
    },
    // 不能点击时候的回调
    cantCheckedCallback: {
      type: Function
    }
  },
  data() {
    return {
      data: [
        {}
      ]
    };
  },
  watch: {
    show(val) {
      console.log(this.choseOptions);
      console.log(this.options);
      if (val) {
        this.$refs.pop.open();
      } else {
        this.$refs.pop.close();
      }
    },
    choseOptions(val) {
      console.log(val);
    }
  },
  methods: {
    close() {
      /* 关闭 */
      this.$emit('update:show', false);
    },
    change({ show }) {
      this.$emit('update:show', show);
    },
    check(item) {
      /* 选中 */
      // 不能被选中的时候直接返回
      if (item.isCanChecked === false) {
        if (this.cantCheckedCallback) {
          this.cantCheckedCallback(item);
        }
        return;
      }
      const {
        [this.keyName]: key
      } = item;
      let choseOptionsAy;
      if (this.type === 'radio') {
        choseOptionsAy = [key];
      } else {
        const index = this.choseOptions.findIndex(v => v === key);
        if (index > -1) {
          this.choseOptions.splice(index, 1);
        } else {
          this.choseOptions.push(key);
        }
        choseOptionsAy = [...this.choseOptions];
      }
      this.$emit('update:choseOptions', choseOptionsAy);
      this.$emit('change', choseOptionsAy,);
    },
    handleClick(version, list) {
      /* 选择版本 */
      const curChecked = version.checked;
      list.forEach((v) => {
        v.checked = false;
      });
      version.checked = !curChecked;
      this.$emit('change', this.data);
    },
    confirm() {
      /* 确定 */
      this.$emit('update:show', false);
    }
  }
};
</script>
