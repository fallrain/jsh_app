<template>
  <view class="background">
    <view class="box-top">
      <view class="person-information-top">
        <view class="person-information-left">
          <image class="person-information-left-image" :src="mineperson.src" />
        </view>
        <view class="person-information-right">
          <view class="person-information-right-name">
            {{ mineperson.name }}
          </view>
          <view class="person-information-right-com">{{ mineperson.gs }}</view>
        </view>
      </view>
      <view class="person-information-thing-bottom">
        <view class="color-bar"></view>
        <view class="title-one">待办</view>
        <view class="Cumulative"></view>
        <view class="title-two">全部待办</view>
        <image class="title-twor" :src="img1" />
      </view>

      <view class="person-information-bottom">
        <view class="person-information-bottoml">
          <view class="title-three">退货管理</view>
        </view>
        <view class="person-information-bottom-title">
          交易通知
          <view class="color1">3</view>条
        </view>
      </view>

      <view class="person-information-bottom2">
        <view class="person-information-bottoml">
          <view class="title-three">哪买哪退</view>
        </view>
        <view class="person-information-bottom-title">
          哪买哪退确认
          <view class="color1">4</view>条
        </view>
      </view>
      <view class="person-information-line"></view>
    </view>
    <view class="Operating-bg">
      <view class="Operating-bg-top">
        <view class="color-bar2"></view>
        <view class="Operating-bg-title">退货管理</view>
      </view>
      <view class="Operating-bg-bottom">
        <view
          class="Operating-bg-bottom1"
          v-for="(item, index) in bgData2"
          :key="index"
          @click="routerto(item.url)"
        >
          <view class="Operating-bg-bottom2">
            <image :src="item.src" />
          </view>
          <view class="Operating-bg-bottom3">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <view class="Operating-bg">
      <view class="Operating-bg-top">
        <view class="color-bar2"></view>
        <view class="Operating-bg-title">哪买哪退</view>
      </view>
      <view class="Operating-bg-bottom">
        <view
          class="Operating-bg-bottom1"
          v-for="(item, index) in bgData3"
          :key="index"
          @click="routerto(item.url)"
        >
          <view class="Operating-bg-bottom2">
            <image :src="item.src" />
          </view>
          <view class="Operating-bg-bottom3">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <view class="Operating-bg">
      <view class="Operating-bg-top">
        <view class="color-bar2"></view>
        <view class="Operating-bg-title">超期管理</view>
      </view>
      <view class="Operating-bg-bottom">
        <view
          class="Operating-bg-bottom1"
          v-for="(item, index) in bgData4"
          @click="routerto(item.url)"
          :key="index"
        >
          <view class="Operating-bg-bottom2">
            <image :src="item.src" />
          </view>
          <view class="Operating-bg-bottom3">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <view class="Operating-bg">
      <view class="Operating-bg-top">
        <view class="color-bar2"></view>
        <view class="Operating-bg-title">售后网点申请</view>
      </view>
      <view class="Operating-bg-bottom">
        <view
          class="Operating-bg-bottom1"
          v-for="(item, index) in bgData5"
          @click="routerto(item.url)"
          :key="index"
        >
          <view class="Operating-bg-bottom2">
            <image :src="item.src" />
          </view>
          <view class="Operating-bg-bottom3">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './css/aftersale.scss';
import test from './image/test.png';
import bg2 from './image/2.png';
import book from './image/book.png';
import box from './image/box.png';
import calendar from './image/calendar.png';
import car from './image/car.png';
import function1 from './image/function.png';
import info from './image/info.png';
import local from './image/local.png';
import search from './image/search.png';
import img1 from './image/right.png';

export default {
  name: 'aftersale',
  data() {
    return {
      img1,
      mineperson: {
        name: '王二小',
        src: bg2,
        gs: '青岛赵赵王王科技有限公司'
      },
      bgData: [1, 2, 3, 4, 5, 6, 7],
      bgData2: [
        {
          id: 1,
          name: '不良品保修',
          src: test,
          url: '/pages/aftersale/JWarrantyOfDefectiveProducts'
        },
        {
          id: 2,
          name: '理货商确认',
          src: info,
          url: '/pages/aftersale/JTallyConfirmed'
        },
        {
          id: 3,
          name: '退货进度查询',
          src: search,
          url: '/pages/aftersale/JReturnGoodsQuery'
        }
      ],
      bgData3: [
        {
          id: 6,
          name: '哪买哪退确认',
          src: function1,
          url: '/pages/aftersale/JWhereBuyReturnConfirm'
        },
        {
          id: 7,
          name: '哪买哪退查询',
          src: book,
          url: '/pages/aftersale/JWhereBuyReturn'
        }
      ],
      bgData4: [
        {
          id: 8,
          name: '鉴定超期',
          src: calendar,
          url: '/pages/aftersale/JExtendedIdentification'
        },
        {
          id: 9,
          name: '返厂超期',
          src: box,
          url: '/pages/aftersale/JOverdueReturn'
        }
      ],
      bgData5: [
        {
          id: 10,
          name: '网点新建',
          src: car,
          url: '/pages/aftersale/JNewBranch'
        },
        {
          id: 11,
          name: '新建网点进度',
          src: local,
          url: '/pages/aftersale/JProgressNewOutlets'
        }
      ]
    };
  },
  methods: {
    routerto(url) {
      uni.navigateTo({
        url: `${url}`
      });
    }
  }
};
</script>

<style></style>
