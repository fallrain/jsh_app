<template>
  <view class="jOrderConfirmAddress-wrap">
    <view class="jOrderConfirmAddress">
      <view class="jOrderConfirmAddress-head">
        <view class="jOrderConfirmAddress-head-icon iconfont iconlocal"></view>
        <view class="jOrderConfirmAddress-head-text">配送至</view>
      </view>
      <view class="jOrderConfirmAddress-cnt">
        ({{sendtoCode}}){{sendtoAddress}}
      </view>
      <view class="jOrderConfirmAddress-cnt-btm">
        <view class="jOrderConfirmAddress-cnt-btm-type">
          <view class="iconfont iconcar jOrderConfirmAddress-cnt-btm-icon"></view>
          <text class="jOrderConfirmAddress-cnt-btm-text">配送方式</text>
        </view>
        <view class="jOrderConfirmAddress-cnt-btm-radios">
          <j-radio-group
            :groups="radioGroups"
            @change="radioGroupChange"
          ></j-radio-group>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/jOrderConfirmAddress.scss';
import JRadioGroup from '../form/JRadioGroup';
import {
  mapGetters, mapMutations
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';

export default {
  name: 'JOrderConfirmAddress',
  components: {
    JRadioGroup,
  },
  props: {
    sendtoCode: String,
    sendtoAddress: String
  },
  data() {
    return {
      radioGroups: [
        {
          key: 1,
          inf: '自提',
          checked: false
        },
        {
          key: 2,
          inf: '配送',
          checked: true
        }
      ]
    };
  },
  created() {
    if (this.saleInfo.channelGroup === 'CT') {
      this.radioGroups = [
        {
          key: 2,
          inf: '配送',
          checked: true
        }
      ];
    }
  },
  computed: {
    ...mapGetters({
      saleInfo: USER.GET_SALE
    })
  },
  methods: {
    radioGroupChange(radioGroup) {
      /* radioGroupChange */
      this.radioGroups = radioGroup;
      this.$emit('change', this.radioGroups);
    }
  }
};
</script>
