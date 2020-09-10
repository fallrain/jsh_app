<template>
  <view class="messageTab">
    <view class="messageTab-list">
      <view
        :class="['messageTab-item',tab.active && 'active']"
        v-for="(tab,index) in tabs"
        :key="tab.id"
        :id="'item' + index"
        @tap="tabClick(tab,index)"
      >
        <view class="messageTab-name">{{tab.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MessageTab',
  data() {
    return {
      tabs: [
        {
          id: '1',
          name: '消息',
          active: true
        },
        {
          id: '2',
          name: '任务',
          active: false
        }
      ],
    };
  },
  methods: {
    tabClick(item, index) {
      /* tab 点击事件 */
      this.tabs.forEach((v, i) => {
        v.active = false;
        console.log(v.active);
      })
      item.active = true;
      console.log(item.active);
      this.$emit('tabClick', item, index);
      // console.log(this.messageactive)
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
    justify-content: space-around;
    // padding-left: 16px;
    width:750px;
    height:88px;


  }
  .messageTab-item {
    position: relative;
    font-size:30px;
    font-family:PingFangSC-Light,PingFang SC;
    font-weight:300;
    color:rgba(51,51,51,1);
    line-height:40px;
    .messageTab-name{
      width:60px;
      height:70px;

    }

  }
  .messageTab-item.active {
        border-bottom: 6px #ED2856 solid;
        color: #ED2856;

    }
</style>
