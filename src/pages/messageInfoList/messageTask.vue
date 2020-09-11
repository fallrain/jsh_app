<template>
  <view class="messageTask">
    <view class="messageTask-screen">
      <view @tap="showFilter">筛选</view>
      <i @tap="showFilter" class="iconfont iconshaixuan"></i>
      <t-drawer
          :show.sync="isShowGoodsFilterDrawer"
          @filterConfirm="filterConfirm"
          @filterReset="filterReset"
      >
        <template>
          <view class="messageTask-drawer-filter-head-ads-wrap">
            <view class="messageTask-drawer-filter-head">
              <view>
                <text>任务时间</text>
              </view>
            </view>
            <view class="messageTask-drawer-filter-price-range">
              <input
                  class="messageTask-drawer-filter-price-ipt inl"
                  placeholder="开始时间"
                  placeholderStyle=""
              >
              <view class="messageTask-drawer-filter-price-line">至</view>
              <input
                  class="messageTask-drawer-filter-price-ipt int"
                  placeholder="结束时间"
              >
            </view>
          </view>
        </template>
      </t-drawer>
    </view>
    <view class="messageTask-task">
      <button class="messageTask-task-completed mla" :class="show && 'active1'" @tap="getActive">已完成任务</button>
      <button class="messageTask-task-completed mlb" :class="!show && 'active2'" @tap="getActive">待办任务</button>
    </view>
    <view class="messageTask-content">
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">截止到2019年7月，有0条未对帐信息</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔GVS发票未签收</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔POS年费未缴费，请及时处理
        </view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔文档没有电子签章，请及时签章
        </view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 笔哪买哪退未确认</view>
      </view>
      <view class="messageTask-content-info">
        <view class="messageTask-content-car"></view>
        <view class="messageTask-content-title">
          截止到2019年8月，有 0 条公函待确
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import TDrawer from '../../components/transfer/TDrawer';
import './css/messageTask.scss';

export default {
  name: 'massageTask',
  components: {
    TDrawer
  },
  data() {
    return {
      show: true,
      // 筛选
      isShowGoodsFilterDrawer: false
    };
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: '/pages/messageInfoList/messageTaskDetail'
      });
    },
    // 未完成 已完成切换
    getActive() {
      this.show = !this.show;
    },
    showFilter() {
      /* 展示filter */
      this.isShowGoodsFilterDrawer = true;
    },
    filterConfirm() {
      /* 抽屉筛选确认 */
      // 重新搜索
      this.mescroll.resetUpScroll(true);
    },
    filterReset() {
      /* 抽屉筛选重置 */
      // 重新搜索
      this.mescroll.resetUpScroll(true);
    },
  }

};
</script>
<style lang="scss" scoped>
//::v-deep .filter-drawer-btn-wrap {
//  position: absolute;
//  top: 28%;
//}

</style>
