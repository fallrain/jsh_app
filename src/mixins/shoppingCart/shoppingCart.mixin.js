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
        return [];
      }
      let choseVersions = [];
      // 后来修改的版本
      let updateVersion;
      if (goods.choseOtherVersions && goods.choseOtherVersions.length) {
        updateVersion = goods.choseOtherVersions[0];
      }
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
        if (updateVersion) {
          choseVersions = [updateVersion];
        } else {
          // 格式化不（普通价格接口未做两位小数处理）
          product.priceInfo.commonPrice.invoicePrice = this.jshUtil.formatNumber(product.priceInfo.commonPrice.invoicePrice, 2);
          // 赋值priceType，跟其他版本类型的价格数据结构统一
          product.priceInfo.commonPrice.priceType = 'PT';
          choseVersions = [product.priceInfo.commonPrice];
        }
      } else {
        // 之前已经选择的版本
        let preVersion;
        // 取版本价格
        if (JSON.stringify(this.versionPrice) !== '{}') {
          // 获取当前产品的所有版本价格信息
          const curAllVersion = this.versionPrice.activity[productCode];
          if (curAllVersion) {
            // 查找匹配的大版本（工程 特价 样机。。）的匹配的版本
            preVersion = curAllVersion[priceTypeUpper].find(v => v.versionCode === priceVersion);
          }
        }
        // 有修改了的版本，则加入修改版本
        if (updateVersion) {
          // 如果了改的是版本调货，且之前选择了工程或者特价，则就增加个版本调货
          if (!updateVersion.priceType && (priceTypeUpper === 'TJ' || priceTypeUpper === 'GC')) {
            choseVersions = [
              updateVersion
            ];
            if (preVersion) {
              choseVersions.push(preVersion);
            }
          } else {
            // 否则就是修改后的版本
            choseVersions = [updateVersion];
          }
        } else {
          // 无修改用之前的版本
          if (preVersion) {
            choseVersions = [preVersion];
          }
        }
      }
      return choseVersions;
    },
  }
};
