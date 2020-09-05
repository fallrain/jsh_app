<template>
  <view class="orderConfirmRemarks">
    <view class="orderConfirmRemarks-group p24 fs30">
      <radio-group @change="radioChange">
        <label class="radio mr20" v-for="(item, index) in showType" :key="index">
          <radio color="#ED2856" :value="item.value" :checked="item.checked" />
          {{item.name}}
        </label>
      </radio-group>
    </view>
    <view class="orderConfirmRemarks-group mt24">
      <j-cell
        title="备注地址"
        class="br-b-n"
      >
        <template #right>
          <view
            class="orderConfirmRemarks-icon iconfont iconyou"
          ></view>
        </template>
      </j-cell>
      <view class="address-style">请选择地址</view>
    </view>
    <view class="orderConfirmRemarks-group mt24">
      <j-cell
        title="姓名"
      >
        <input
          class="orderConfirmRemarks-ipt"
          placeholderClass="orderConfirmRemarks-placeholder"
          type="text"
          placeholder="请输入联系人姓名"
          v-model="form.name"
        >
      </j-cell>
      <j-cell
        title="手机号"
      >
        <input
          class="orderConfirmRemarks-ipt"
          placeholderClass="orderConfirmRemarks-placeholder"
          type="text"
          placeholder="请输入联系人电话"
          v-model="form.mobile"
        >
      </j-cell>
      <j-cell
        title="身份证号"
      >
        <input
          class="orderConfirmRemarks-ipt"
          placeholderClass="orderConfirmRemarks-placeholder"
          type="text"
          placeholder="请输入身份证号"
          v-model="form.idCard"
        >
      </j-cell>
    </view>
    <view class="orderConfirmRemarks-group mt24">
      <j-cell
        title="所在地区"
      >
        <input
          @tap="getLocation()"
          class="orderConfirmRemarks-ipt"
          placeholderClass="orderConfirmRemarks-placeholder"
          type="text"
          placeholder="请选择所在地区"
          v-model="form.address"
        >
        <template #right>
          <view
            class="orderConfirmRemarks-icon iconfont iconlocal"
          ></view>
        </template>
      </j-cell>
      <view class="orderConfirmRemarks-ta-wrap">
        <j-cell
          title="详细地址"
        >
          <view>
            <j-textarea
              placeholderClass="orderConfirmRemarks-placeholder"
              placeholder="请输入详细地址时，请具体到门牌号"
              v-model="form.addressDetail"
            ></j-textarea>
          </view>
        </j-cell>
      </view>
    </view>
    <view class="orderConfirmRemarks-group orderConfirmRemarks-group-crossRegion mt24">
      <j-cell
        title="异地跨区域配送"
        :titleWrap="false"
      >
        <template #right>
          <j-switch
            :active.sync="form.crossRegion"
          ></j-switch>
        </template>
      </j-cell>
    </view>
    <view class="orderConfirmRemarks-group orderConfirmRemarks-group-crossRegion mt24">
      <j-cell
        title="收藏地址"
        :titleWrap="false"
      >
        <template #right>
          <j-switch
            :active.sync="form.crossRegion"
          ></j-switch>
        </template>
      </j-cell>
    </view>
    <view
      @tap="sureRemark"
      class="sure-btn">
      确定
    </view>
    <j-pop-picker
      title="备注地址"
      :show.sync="addressPickerShow"
      :options="addressOption"
      :choseOptions.sync="currentAdd"
    ></j-pop-picker>
  </view>
</template>

<script>
import JCell from '../../components/form/JCell';
import JTextarea from '../../components/form/JTextarea';
import JSwitch from '../../components/form/JSwitch';
import './css/orderConfirmRemarks.scss';


export default {
  name: 'orderConfirmRemarks',
  components: {
    JCell,
    JTextarea,
    JSwitch,
  },
  data() {
    return {
      status: 'zfyd',
      showType: [
        {
          value: 'zfyd',
          name: '直发异地',
          checked: true
        },
        {
          value: 'jdyd',
          name: '京东异地',
          checked: true
        }
      ],
      addressPickerShow: false,
      addressOption: [],
      currentAdd: {},
      form: {
        orderIndex: '',
        productIndex: '',
        name: '',
        mobile: '',
        idCard: '',
        address: '',
        addressDetail: '',
        crossRegion: false
      }
    };
  },
  onLoad(option) {
    this.form.orderIndex = option.orderIndex;
    this.form.productIndex = option.productIndex;
  },
  methods: {
    // 获取地址列表
    getLocation() {

    },
    sureRemark() {
      uni.$emit('confirmremarks', JSON.stringify(this.form));
      uni.navigateBack();
    },
    radioChange(e) {
      console.log(e.target.value);
      this.showType.forEach((item) => {
        if (item.value === e.target.value) {
          item.checked = true;
          this.status = item.value;
        } else {
          item.checked = false;
        }
      });
    }
  }
};
</script>
