<script>
export default {
  onLaunch(options) {
    const {
      query
    } = options;
    if (query) {
      const {
        token,
        jwtToken
      } = query;
      if (token) {
        uni.setStorage({
          key: 'token',
          data: token
        });
      }
      if (jwtToken) {
        uni.setStorage({
          key: 'jwtToken',
          data: jwtToken
        });
      }
    }
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
    .content{
        color: red;
    }
    uni-tabbar {
        .uni-tabbar { // tab背景
            background-image: linear-gradient(to top, #FAF8F8, #FFFFFF)!important; // tab背景图片或者渐变色，背景色和背景图片最多选择一个进行设置
            .uni-tabbar-border { // tabBar上边框
                background-color: #F7F4F4!important; // tabBar上边框的颜色
            }
            .uni-tabbar__bd { // tabBar单项
                height:150px;
                .uni-tabbar__icon { // 图标
                    width: 88px!important;
                    height: 88px!important;
                }
                .uni-tabbar__label { // 文字
                    font-size: 20px!important;
                }
            }
        }
    }
</style>

