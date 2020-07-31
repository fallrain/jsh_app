export default {
  data() {
    return {
      pageCfg: {
        page: {
          pageSize: 10,
          pageNum: 1
        }
      },
      // mescroll对象
      mescroll: null,
      jMescrollUpOptions: {
        auto: false,
        page: {
          num: 0,
          size: 10
        },
        textNoMore: '-- 加载完毕 --',
        toTop: {
          src: null
        }
      },
      jMescrollDownOptions: {
        auto: true
      },
    };
  },
  methods: {
    jMescrollDownCallback() {
      this.mescroll.resetUpScroll();
    }
  }
};
