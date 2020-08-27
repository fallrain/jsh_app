export default {
  methods: {
    async $mFollowGoods(props) {
      /* 添加关注 */
      const {
        customerCode,
        productCode
      } = props;
      const { code, data } = await this.productDetailService.productAddInter(customerCode, customerCode, productCode);
      if (code === '200') {
        return data;
      }
    },
    async $mUnFollowGoods(props) {
      /* 取消关注 */
      const {
        customerCode,
        productCodeList
      } = props;
      const { code, data } = await this.productDetailService.productRemoveInter({
        account: customerCode,
        customerCode,
        productCodeList
      });
      if (code === '1') {
        return data;
      }
    },
  }
};
