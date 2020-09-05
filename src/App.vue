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
