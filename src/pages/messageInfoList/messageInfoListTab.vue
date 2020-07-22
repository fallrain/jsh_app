<template>
  <view class="messageTab">
    <view class="messageTab-list"  >
      <view
        :class="['messageTab-item',tab.active && 'active']"
        v-for="(tab) in tabs"
        :key="tab.id"
        @tap="tabClick(tab)"
      >
        <text class="messageTab-name">{{tab.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      // type: [],
      default: [
        {
          id: '1',
          name: '消息',
          active: true
        }, {
          id: '2',
          name: '任务',
          active: false
        }
      ]
    },
  },
  name: 'MessageTab',
  data() {
    return {
      
    };
  },
  methods: {
    tabClick(item) {
      /* tab 点击事件 */
      this.tabs.forEach((v) => {
        v.active = false
      })
      item.active = true;
      this.$emit('tabClick', item);
      // console.log(item)
    }
  }
};
</script>

<style lang="scss">
  .messageTab {
    height:128px;
    background:rgba(255,255,255,1);
    padding-top:40px;
  }
  .messageTab-list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    width:750px;
    height:88px;
    

  }
  .messageTab-item {
    position: relative;
    width:351px;
    height:70px;
    background:rgba(255,255,255,1);
    line-height:70px;
    font-size: 28px;  
    margin-right: 60px;
    text-align: center;
    font-size:34px;
    font-family:PingFangSC-Light,PingFang SC;
    font-weight:300;
    // .messageTab-item .tab-name{
    //   width:351px;
    //   height:70px;
    //   font-size:34px;
    //   font-family:PingFangSC-Light,PingFang SC;
    //   font-weight:300;
    //   color:rgba(51,51,51,1);
    //   line-height:44px;
    //   text-align: center;
    //   margin-top:10px;
    // }
    .messageTab-name{
      display:block;
      height:70px;
    }
  //   &.active {
  //     width:48px;
  //     height:6px;
  //     background:rgba(237,40,86,1);

  //   &:after{
  //     content: '';
  //     display: block;
  //     position: absolute;
  //     top: 100%;
  //     left: 0;
  //     right: 0;
  //     height: 4px;
  //     background: rgba(237,40,86,1);
  //   }
  // }
}
</style>
