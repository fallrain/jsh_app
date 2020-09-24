<script>
export default {
  onLaunch(options) {
    const {
      query
    } = options;
    if (query) {
      const {
        code,
        token,
        jwtToken
      } = query;
      if (token) {
        uni.setStorageSync('token', token);
      }
      if (code) {
        uni.setStorageSync('code', code);
      }
      if (jwtToken) {
        uni.setStorage({
          key: 'jwtToken',
          data: jwtToken
        });
      }
    }
  },
  mounted() {
    if (document && document.addEventListener) {
      document.addEventListener('back', (e) => {
        e.preventDefault();
        uni.navigateBack();
      });
    }
  },
  onShow() {
  },
  onHide() {
  }
};
</script>
