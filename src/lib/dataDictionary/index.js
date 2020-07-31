// import basicService from '@/services/basic';

const util = {
  commonGet({ key, service }) {
    /* 公共获取数据字典 */
    // key：localStorage名称 service获取数据的服务名
    const localStorageKey = `common.${key}`;
    const localStorageTimeKey = `common.${key}.time`;
    const local = uni.getStorageSync(localStorageKey);
    // 缓存超过6点之后更新
    if (local) {
      let time = uni.getStorageSync(localStorageTimeKey);
      if (time) {
        // getTime防止ios下bug
        time *= 1;
        const curTime = new Date();
        let validTime = true;
        if (curTime.getTime() - time * 1 > 3600 * 1000 * 24 || (curTime.getHours() >= 6 && new Date(time).getHours() < 6)) {
          validTime = false;
        }
        if (validTime) {
          return Promise.resolve(JSON.parse(local));
        }
      }
    }
    // return basicService[service]().then(({ code, data }) => {
    //   if (code === '1') {
    //     uni.setStorageSync(localStorageKey, JSON.stringify(data));
    //     uni.setStorageSync(localStorageTimeKey, `${new Date().getTime()}`);
    //   }
    //   return data || [];
    // });
  }
};

function getGoodsType() {
  /* 商品类型 */
  return {
    isFlashSale: '抢单',
    isBigorder: '反向定制',
    isArbitrage: '套餐',
    isCompose: '组合',
    isNewProduct: '新品',
    isSpecialOffer: '特价',
    isProject: '工程',
    isSample: '样机',
    isScf: '融资',
  };
}

function getGoodsTag() {
  /* 商品标签 */
  return {
    isJike: '机壳',
    isResource: '巨划算',
    isAccessories: '附件',
    isTownSpecial: '乡镇专供',
    isThreeSpecial: '三专专供',
    isProjectSpecial: '工程专供'
  };
}

function getGoodsPriceType() {
  /* 商品标签 */
  return {
    PT: '普通价格',
    TJ: '特价',
    GC: '工程',
    YJCY: '样机出样(折扣样机)',
    MFJK: '免费机壳',
    MFYJ: '免费样机',
    MFYJJS: '免费样机结算',
    YPJ: '样品机',
    CTYJ: '成套样机'
  };
}

export {
  getGoodsPriceType,
  getGoodsTag,
  getGoodsType
};
