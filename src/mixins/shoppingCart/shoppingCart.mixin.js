export default {
  methods: {
    showToast(option) {
      /* 展示toast */
      this.$refs.toast.open({
        timeout: 2000,
        ...option
      });
    },
  }
};
