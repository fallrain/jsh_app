<template>
  <uni-popup
    ref="pop"
    type="bottom"
    @change="change"
  >
    <view class="jVersionSpecifications-pop">
      <view class="jVersionSpecifications-pop-head">
        <view class="jVersionSpecifications-pop-head-left">
          <image src="@/assets/img/goods/example-fridge.jpg"></image>
        </view>
        <view class="jVersionSpecifications-pop-head-cnt">
          <view class="jVersionSpecifications-pop-head-cnt-title">海尔1215DHB(C) 家用静音全自动10KG洗烘一体高高品质家用静音全自动10KG洗烘一体高高品质
          </view>
          <view class="mt16 jVersionSpecifications-pop-head-cnt-item">
            <view class="jVersionSpecifications-pop-head-cnt-text">建议零售价：</view>
            <view class="jVersionSpecifications-pop-head-cnt-price">¥5920.00</view>
            <view class="jVersionSpecifications-pop-head-cnt-text ml20">供价：￥ 4099.00</view>
          </view>
          <view class="mt8 jVersionSpecifications-pop-head-cnt-item">
            <view class="jVersionSpecifications-pop-head-cnt-text">台返 ：0.00</view>
            <view class="jVersionSpecifications-pop-head-cnt-text ml20">返利：FHQ</view>
            <view class="jVersionSpecifications-pop-head-cnt-text ml20">直扣率：0.70%</view>
          </view>
        </view>
      </view>
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
              @tap="handleClick(version,item.list)"
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
          @click="confirm"
        >确定
        </button>
        <button
          type="button"
          class="goodsList-drawer-btn-reset"
        >详情
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
    }
  },
  data() {
    return {
      data: [
        {
          title: '特价版本',
          isExpand: true,
          list: [
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            },
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            }
          ]
        },
        {
          title: '调货版本',
          isExpand: true,
          list: [
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            },
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            }
          ]
        },
        {
          title: '工程版本',
          isExpand: true,
          list: [
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            },
            {
              name: 'TJ2020033333',
              price: '5949.71',
              time: ' 2021-01-01',
              num: '96',
              checked: false
            }
          ]
        }
      ]
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
    handleClick(version, list) {
      /* 选择版本 */
      const curChecked = version.checked;
      list.forEach((v) => {
        v.checked = false;
      });
      version.checked = !curChecked;
      this.$emit('change', this.data);
    },
    toggleExpand(item) {
      /* 选择规格展开or收起 */
      item.isExpand = !item.isExpand;
    },
    confirm() {
      /* 确定 */
      this.$emit('update:show', false);
    }
  }
};
</script>
