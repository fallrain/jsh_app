<script>
export default {
  onLaunch(options) {
    uni.showModal({
      content: JSON.stringify(options)
    });
    const {
      query
    } = options;
    if (query) {
      const {
        code,
        jwtToken
      } = query;
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
