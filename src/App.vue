<script>
export default {
  onLaunch(options) {
    const {
      query
    } = options;
    if (query) {
      const {
        token
      } = query;
      if (token) {
        uni.setStorage({
          key: 'token',
          data: token
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
</style>
