<template>
  <view class="announcement">
    <view 
      class="announcement-con"
      v-for="item in list"
      :key="item.id"
    >
      <view class="announcement-con-title">{{item.title}}</view> 
      <view class="announcement-con-row">
        <view class="announcement-con-row-at">{{item.at}}</view>
        <view class="announcement-con-row-bt">{{item.bt}}</view>
        <i class="announcement-con-row-icon iconfont iconshijian"></i>
        <view class="announcement-con-row-time">{{item.time}}</view>
      </view>
      <view class="announcement-con-img">
          <image :src="item.image">
      </view>

    </view>

  </view>   
</template>
<script>
export default {
  name: 'announcement',
  data() {
    return {
      list: [
        {
          id: 1,
          title: "集成化家电会成为家电行业未来的新升级趋…",
          at: "家电",
          bt: "科普",
          time:"2020-9-21",
          image: require('@/assets/img/index/new-pic.png')
        },
        {
          id: 2,
          title: "集成化家电会成为家电行业未来的新升级趋…",
          at: "家电",
          bt: "科普",
          time:"2020-9-21",
          image: require('@/assets/img/index/new-pic.png')
        }

      ]
    }
    }
    
}
</script>
<style scoped>
.announcement {
  background: #F5F5F5;
  padding: 24px;
}
.announcement-con {
  width: 702px;
  height: 320px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 24px;
  padding: 24px 32px 24px 30px;
}
.announcement-con-title {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
  margin-bottom: 14px;
}
.announcement-con-row {
  display: flex;
  margin-bottom: 22px;
  
}
.announcement-con-row-at {
  width: 84px;
  height: 32px;
  background: #EBF2FA;
  border-radius: 8px;
  color: #2283E2;
  font-size:24px;
  line-height:32px;
  text-align: center;
  margin-right: 16px;

}
.announcement-con-row-bt {
  width: 84px;
  height: 32px;
  background: #FFEAE1;
  border-radius: 8px;
  color: #FF641D;
  line-height:32px;
  text-align: center;
  font-size: 24px;
  margin-right: 300px;
}
.announcement-con-row-icon {
  font-size: 27px !important;
  color: #2283E2;
  margin-top: 4px;
  margin-right: 10px;
}
.announcement-con-row-time {
  font-size: 24px;
  color: #666;
}
.announcement-con-img {
  width: 654px;
  height: 160px;
 
}
image {
    width: 100%;
    height: 100%;

}

</style>