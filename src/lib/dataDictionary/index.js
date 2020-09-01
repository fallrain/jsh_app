import cartService from '@/service/cart/cart.service';

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
    return service().then(({ code, data }) => {
      if (code === '1') {
        uni.setStorageSync(localStorageKey, JSON.stringify(data));
        uni.setStorageSync(localStorageTimeKey, `${new Date().getTime()}`);
      }
      return data || [];
    });
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

function getGoodsInCartPriceType() {
  /* 在购物车里的商品标签 */
  return {
    PT: '普通价格',
    TJ: '特价',
    GC: '工程',
    YJCY: '样机',
    MFJK: '样机',
    MFYJ: '样机',
    MFYJJS: '免费样机结算',
    YPJ: '样品机',
    CTYJ: '成套样机'
  };
}

function getPriceKeyFromAllPrice() {
  /* 获取从all price等接口获取的价格的key */
  return {
    PT: 'PT',
    TJ: 'TJ',
    GC: 'GC',
    YJCT: 'YJCY',
    YJCY: 'YJCY',
    MFJK: 'YJCY',
    MFYJ: 'YJCY',
  };
}

function getIndustryGroup() {
  /* 获取全部产品组 */
  return util.commonGet({
    key: 'industryGroup',
    service: cartService.getIndustryList
  });
}

function getOrdinaryCartActivityType() {
  /* 普通购物车活动类型映射 */
  // 活动类型：1单品2组合3抢购4套餐5成套
  // 普通购物车的活动只有抢单和反向定制
  // 反向定制接口返回5，但是当做抢单（3），所以传3（真是无语）
  return {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 3
  };
}

function getStockType() {
  /* 库存类型 */
  return {
    RRS库存: 'RRS库存',
    TC库存: 'TC库存',
    基地仓库存: '基地仓库存',
    安防库存: '安防库存',
    生活家电: '生活家电'
  };
}

export {
  getGoodsPriceType,
  getGoodsInCartPriceType,
  getGoodsTag,
  getGoodsType,
  getIndustryGroup,
  getOrdinaryCartActivityType,
  getPriceKeyFromAllPrice,
  getStockType
};
