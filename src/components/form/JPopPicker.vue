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
      <view class="jPopPicker-pop-item-wrap">
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
          <view class="jPopPicker-pop-item-cnt">{{item.value}}</view>
        </view>
      </view>
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
