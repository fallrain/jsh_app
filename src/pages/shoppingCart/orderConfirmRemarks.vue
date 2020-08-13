<template>
  <view class="orderConfirmRemarks">
    <view class="orderConfirmRemarks-group">
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
    <view
      @tap="sureRemark"
      class="sure-btn">确定</view>
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
      form: {
        dataOffset: '',
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
    this.form.dataOffset = option.index;
  },
  methods: {
    getLocation() {
      uni.getLocation({
        type: 'wgs84',
        success(res) {
          debugger;
          console.log(res);
        }
      });
    },
    sureRemark() {
      console.log(this.form);
      setTimeout(function () {
        uni.$emit('confirmremarks', this.form);
        uni.navigateBack();
      }, 1000);
    }
  }
};
</script>
