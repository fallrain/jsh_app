import {
  jGet, jPostJson
} from '@/lib/request';
import url from '../url/traffic.url';

export default {
  carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID) { // 整车列表-车型
    return jGet(url.carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID));
  },
  querySendWay(timestamp, YDPS_JIDI, longfeiUSERID, sendtoMktid, sendtoCode) { // 整车列表-配送类型
    return jGet(url.querySendWay(timestamp, YDPS_JIDI, longfeiUSERID, sendtoMktid, sendtoCode));
  },
  carType(data) { // 整车列表-整车类型+车型
    return jPostJson(url.carType, data);
  },
  baseQuery_getTags(a, b) { // 是否存在整车权限
    return jGet(url.baseQuery_getTags(a, b));
  },
  queryBaseCode() { // 基地?timestamp=1597133218359
    return jGet(url.queryBaseCode());
  },
  queryEs(timestamp, categoryCode, name, pageNum, pageSize, customerCode, dstCode, center, brandName, sortDirection, sortType,
    brandGroup, productCode, highPrice, lowPrice, farWeekGroup, baseCode) {
    return jGet(url.queryES(timestamp, categoryCode, name, pageNum, pageSize, customerCode, dstCode, center, brandName,
      sortDirection, sortType, brandGroup, productCode, highPrice, lowPrice, farWeekGroup, baseCode));
  },
  queryCustomerSendto(timestamp, customerCode) { // 整车--配送至
    return jGet(url.queryCustomerSendto(timestamp, customerCode));
  },
  queryCarNum(timestamp, longfeiUSERID) { // 整车购物车数量查询
    return jGet(url.queryCarNum(timestamp, longfeiUSERID));
  },
  queryCarList(timestamp, longfeiUSERID) { // 整车购物车列表查询
    return jGet(url.queryCarList(timestamp, longfeiUSERID));
  },
  addToCart(data) { // 整车加购物车
    return jPostJson(url.addToCart, data);
  },
  queryNewSeq(timestamp, CUSTUMER_TYPE) { // 获取整车加购物车时的单号
    return jGet(url.queryNewSeq(timestamp, CUSTUMER_TYPE));
  }
};
