<template>
    <view class="infomation">
        <view  class="infomation-title">{{this.list.title}}</view>
        <view class="infomation-row">
            <i class="infomation-row-icon iconfont iconshijian"></i>
          <view class="infomation-row-time">{{this.list.time}}</view>
        </view>
        <view class="infomation-con" v-html="this.list.content">
            
        </view>
    </view>
</template>
<script>
import {
  mapGetters
} from 'vuex';
import {
  USER
} from '../../store/mutationsTypes';
export default {

  data() {
    return {
      id:'',
      list:{}
    }
  },
  onLoad(option) {
    this.id = option.id
    console.log(this.id)
  },
  computed: {
    ...mapGetters({
        defaultSendToInf: USER.GET_DEFAULT_SEND_TO,
        tokenUserInf:USER.GET_TOKEN_USER,
        saleInfo: USER.GET_SALE
    })
  },
  created() {
    this.getDetail()
  },
  methods: {
      async getDetail() {
        const { code, data } = await this.messageService.getInfomation(this.id,{
            customerCode: this.saleInfo.customerCode,
            unitId: `${this.saleInfo.customerCode}_admin`
        });
        if (code === '1') {         
            console.log(data.publishTime)
            this.list = data
            let temp = this.list.publishTime
            let arr1 = temp.split("年")
            let arr2 = arr1[1].split("月")
            let arr3 = arr2[1].split("日")
            console.log(arr1,arr2,arr3)
            this.list.time = arr1[0] + "-" + arr2[0] + "-" + arr3[0]
            console.log(this.list)
        }
      }
  }   
    
};
</script>
<style scoped>
  .infomation {
    padding: 24px;
  }
  .infomation-title {
    font-size: 36px;
    color: #333;
    margin-bottom: 18px;
    margin-left: 24px;
  }
  .infomation-row {
    font-size: 24px;
    color: #666;
    display: flex;
    margin-bottom: 24px;
    margin-left: 24px;

  }
  .infomation-row-icon {
    font-size: 27px;
    color: #2283E2;
    margin-right: 10px;
  }
  .infomation-con {
    width: 100%;
    font-size: 29px;
    line-height: 40px;
    color: #666;
    text-indent: 2rem;
    position: relative;
  }
  /deep/ p{
    width:100%;
  }
  /deep/ img {
      width:100%;
      position: absolute;
      left: 0px;

  }

</style>