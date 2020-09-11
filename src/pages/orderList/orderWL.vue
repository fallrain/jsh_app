<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src='srcUrl'></web-view>
    </view>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import {
  ORDER
} from '../../store/mutationsTypes';
import {
  mapGetters
} from 'vuex';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
        infoList:{},
        srcUrl:''
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  computed: {
    ...mapGetters([
      ORDER.GET_ORDER
    ]),
  },
  created() {
    console.log('11111111');
    this.infoList = this[ORDER.GET_ORDER].orderDetail;
    const dnLogistics = this.infoList.info.dnLogistics;
    this.srcUrl = `https://icloud.rrswl.com/web/searchOrdersNo?bstkd=${dnLogistics}`
    console.log(this.srcUrl)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {

  }
}
</script>

<style scoped>

</style>
