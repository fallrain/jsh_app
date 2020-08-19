<template>
    <view class="applicationsEdit">
      <view class="applicationsEdit-head">
        <view class="applicationsEdit-head-top">
          <view class="applicationsEdit-head-title"> 我的应用</view>
          <image class="applicationsEdit-head-img" src="../../assets/img/appIndex/video.png" />
          <image class="applicationsEdit-head-img" src="../../assets/img/appIndex/function.png" />
        </view>
        <view class="applicationsEdit-head-foot">
          <view class="applicationsEdit-head-foot-plus">+</view>
          <view class="applicationsEdit-head-foot-add">添加应用</view>
        </view>
      </view>
      <view class="applicationsEdit-content">
        <view class="applicationsEdit-content-all">全部应用</view>
        <view 
          class="applicationsEdit-content-all-cen" 
          v-for="item in list"
          :key="item.id"
        >
          <view class="applicationsEdit-content-all-tit">{{item.title}}</view>
          <view class="applicationsEdit-content-all-con">
            <view class="applicationsEdit-content-all-con-every" 
              v-for="it in item.children"
              :key="it.id"
              @tap="goDetail"
            >
              <image class="applicationsEdit-content-all-con-img" :src="it.src"> 
              <view class="applicationsEdit-content-all-con-tit">{{it.Subhead}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>    
</template>
<script>
import './css/applicationsEdit.scss'
export default {
    name: "applicationsEdit",
    data() {
      return {
        list: [
          {
            id:1,
            title:"海尔直采",
            children:[
              {
                id:1,
                src: require('@/assets/img/appIndex/shopping.png'),
                Subhead:"采购下单"
              },
              {
                id:2,
                src: require('@/assets/img/appIndex/finance.png'),
                Subhead:"财务自助"
              },
              {
                id:3,
                src: require('@/assets/img/appIndex/work.png'),
                Subhead:"业务办理"
              }
            ]
          },
          {
            id:2,
            title:"分销管理",
            children:[
              {
                id:1,
                src: require('@/assets/img/appIndex/shopping.png'),
                Subhead:"采购下单"
              },
              {
                id:2,
                src: require('@/assets/img/appIndex/finance.png'),
                Subhead:"财务自助"
              },
              {
                id:3,
                src: require('@/assets/img/appIndex/work.png'),
                Subhead:"业务办理"
              },
              {
                id:4,
                src: require('@/assets/img/appIndex/report.png'),
                Subhead:"报表查询"
              },
              {
                id:5,
                src: require('@/assets/img/appIndex/recharge.png'),
                Subhead:"在线充值"
              }

            ]
          },
          {
            id:3,
            title:"门店经营",
            children:[
              {
                id:1,
                src: require('@/assets/img/appIndex/gooods.png'),
                Subhead:"其他进货"
              },
              {
                id:2,
                src: require('@/assets/img/appIndex/accept.png'),
                Subhead:"收货办理"
              },
              {
                id:3,
                src: require('@/assets/img/appIndex/stock.png'),
                Subhead:"库存查询"
              },
              {
                id:4,
                src: require('@/assets/img/appIndex/list.png'),
                Subhead:"差单据"
              },
              {
                id:5,
                src: require('@/assets/img/appIndex/member.png'),
                Subhead:"会员清单"
              }
            ]
          },
          {
            id:4,
            title:"零售管理",
            children:[
              {
                id:1,
                src: require('@/assets/img/appIndex/shopping.png'),
                Subhead:"采购下单"
              },
              {
                id:2,
                src: require('@/assets/img/appIndex/finance.png'),
                Subhead:"财务自助"
              },
              {
                id:3,
                src: require('@/assets/img/appIndex/work.png'),
                Subhead:"业务办理"
              },
              {
                id:4,
                src: require('@/assets/img/appIndex/report.png'),
                Subhead:"报表查询"
              },
              {
                id:5,
                src: require('@/assets/img/appIndex/recharge.png'),
                Subhead:"在线充值"
              }
            ]
          }

        ]
      }
    },
    methods: {
      goDetail() {
        
      }
    }
}
</script>