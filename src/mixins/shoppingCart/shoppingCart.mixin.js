import {
  getPriceKeyFromAllPrice
} from '@/lib/dataDictionary';

export default {
  methods: {
    showToast(option) {
      /* 展示toast */
      this.$refs.toast.open({
        timeout: 2000,
        ...option
      });
    },
    getProduct(goods) {
      /* 获取产品 */
      return goods.productList && goods.productList[0];
    },
    getPriceType(type) {
      /* 获取价格类型 */
      const typeTemp = type.toUpperCase();
      return getPriceKeyFromAllPrice()[typeTemp];
    },
    getPriceVersionData(goods) {
      /* 获取应该取值价格版本数据 */
      /**
       * @goods:array 商品
       * */
      /* 选择的版本信息 */
      const product = this.getProduct(goods);
      if (!product) {
        return {};
      }
      let curVersion = {};
      if (goods.choseOtherVersions && goods.choseOtherVersions.length) {
        curVersion = goods.choseOtherVersions[0];
      } else {
        const {
          priceType,
          productCode,
          // 价格版本，根据这个去版本价里轮询匹配
          priceVersion
        } = product;
        // 普通版本
        // 接口大写小写都可能返回
        const priceTypeUpper = this.getPriceType(priceType);
        if (priceTypeUpper === 'PT') {
          // 格式化不（普通价格接口未做两位小数处理）
          product.priceInfo.commonPrice.invoicePrice = this.jshUtil.formatNumber(product.priceInfo.commonPrice.invoicePrice, 2);
          curVersion = product.priceInfo.commonPrice;
        } else {
          // 取版本价格
          if (JSON.stringify(this.versionPrice) !== '{}') {
            // 获取当前产品的所有版本价格信息
            const curAllVersion = this.versionPrice.activity[productCode];
            if (curAllVersion) {
              // 查找匹配的大版本（工程 特价 样机。。）的匹配的版本
              curVersion = curAllVersion[priceTypeUpper].find(v => v.versionCode === priceVersion);
            }
          }
        }
      }
      return curVersion;
    },
  }
};
