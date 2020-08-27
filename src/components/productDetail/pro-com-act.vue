<template>
  <uni-popup ref="pop" type="bottom" @change="change">
    <view class="pro-act-pop">
      <view class="pro-act-head" @click="close">
        <view class="pro-act-head-title">营销活动</view>
        <view class="pro-act-head-but">X</view>
      </view>
      <view class="pro-act-pop-detail-wrap">
        <view class="pro-act-pop-detail" v-for="(act,indexA) in info" :key="indexA">
          <view class="pro-act-pop-detail-head" @click="changeSe(act)">
            <text class="pro-act-pop-detail-head-title">{{act.title}}</text>
            <view :class="['pro-act-pop-detail-head-title-arrow iconfont iconxia',!act.isSe && 'active']"></view>
          </view>
          <view v-if="act.isSe&&act.isMore">
            <div :class="['pro-act-pop-detail-item',version.isCheck && 'active']"
                 v-for="(version,indexB) in act.list" :key="indexB" @click="checkAct(indexA,indexB)">
              <view class="jVersionSpecifications-pop-detail-item-check" v-if="version.isCheck">
                <view class="jVersionSpecifications-pop-detail-item-check-icon iconfont icontick"></view>
              </view>
              <view class="pro-act-pop-detail-item-name-wrap0 mb8">
                <view class="pro-act-pop-detail-item-name">名称：</view>
                <view class="pro-act-pop-detail-item-val-type1">{{version.name}}</view>
              </view>
              <view class="pro-act-pop-detail-item-name-wrap1 mb8">
                <view class="pro-act-pop-detail-item-name">价格：</view>
                <view class="pro-act-pop-detail-item-val-type2">¥ {{version.price}}</view>
              </view>
              <view class="pro-act-pop-detail-item-name-wrap2">
                <view class="pro-act-pop-detail-item-name">有效期：</view>
                <view class="pro-act-pop-detail-item-val-type3">{{version.time}}</view>
              </view>
              <view class="pro-act-pop-detail-item-name-wrap3">
                <view class="pro-act-pop-detail-item-name">直扣：</view>
                <view class="pro-act-pop-detail-item-val-type3">{{version.kou}}%</view>
              </view>
              <view class="pro-act-pop-detail-item-name-wrap3">
                <view class="pro-act-pop-detail-item-name">数量：</view>
                <view class="pro-act-pop-detail-item-val-type3">{{version.num}}</view>
              </view>
            </div>
          </view>
          <view v-if="act.isSe&&!act.isMore">
            <div class="pro-act-pop-detail-item-one" v-for="(aac,indexC) in act.list" :key="indexC">
              <view class="jVersionSpecifications-pop-detail-item-check" v-if="aac.isCheck">
                <view class="jVersionSpecifications-pop-detail-item-check-icon iconfont icontick"></view>
              </view>
              <view class="pro-act-pop-detail-thr mb8">
                <view class="marker"></view>
                <view class="pro-act-pop-detail-item-oneNam">名称：</view>
              </view>
              <view class="pro-act-pop-detail-for mb8">
                <view class="pro-act-pop-detail-item-oneNam">{{aac.name}}</view>
              </view>
              <view class="pro-act-pop-detail-thr mb8">
                <view class="marker"></view>
                <view class="pro-act-pop-detail-item-oneNam">有效期：</view>
              </view>
              <view class="pro-act-pop-detail-for mb8">
                <view class="pro-act-pop-detail-item-oneNam">{{aac.time}}</view>
              </view>
            </div>
          </view>
        </view>
      </view>
      <view class="pro-act-btn-wrap">
        <button type="button" class="goodsList-drawer-btn-confirm" @click="putAct">确定</button>
        <button type="button" class="goodsList-drawer-btn-reset" @click="refresh">重制</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import {
  uniPopup
} from '@dcloudio/uni-ui';
import './css/proComAct.scss';

export default {
  name: 'proComAct',
  components: {
    uniPopup
  },
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    info: {// 是否显示图标以及图标变色问题
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      checkedInfo: []
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
    close() { // 关闭按钮
      this.$emit('update:show', false);
    },
    change({ show }) {
      this.$emit('update:show', show);
    },
    changeSe(se) {
      se.isSe = !se.isSe;
    },
    checkAct(a, b) { // 选择活动
      for (let i = 0; i < this.info.length; i++) {
        for (let j = 0; j < this.info[i].list.length; j++) {
          this.info[i].list[j].isCheck = false;
        }
      }
      this.info[a].list[b].isCheck = true;
      this.checkedInfo = this.info[a].list[b];
      this.checkedInfo.title = `${this.info[a].title}：${this.info[a].list[b].name}`;
      console.log(this.checkedInfo);
    },
    putAct() { // 确认
      this.$emit('update:show', false);
      this.$emit('isCheckAct', this.info, this.checkedInfo);
    },
    refresh() { // 重置
      for (let i = 0; i < this.info.length; i++) {
        for (let j = 0; j < this.info[i].list.length; j++) {
          this.info[i].list[j].isCheck = false;
        }
      }
      this.checkedInfo = [];
    }
  }
};
</script>
