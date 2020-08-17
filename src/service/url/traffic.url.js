import util from '../util/index';

const baseURL = 'traffic';
const urls = {
  // 查询产品组的信用额度
  getXYQuota: '/queryCustomer/XYQuota',
  carType: '/v2/carType/query-carType', // 整车列表-整车类型+车型
  carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID) { // 整车列表-车型
    return `/baseQuery/carLoadType?timestamp=${timestamp}&JDCODE=${JDCODE}&SendWay=${SendWay}&MKTID=${MKTID}&longfeiMFID=${longfeiMFID}`;
  },
  baseQuery_getTags(timestamp, longfeiUSERID) { // 是否存在整车权限
    return `/baseQuery/getTags?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  queryBaseCode() { // 基地?timestamp=1597133218359
    return '/baseQuery/queryBaseCode';
  },
  querySendWay(timestamp, YDPSJIDI, longfeiUSERID, sendtoMktid, sendtoCode) { // 整车列表-配送类型
    return `/baseQuery/querySendWay?timestamp=${timestamp}&YDPS_JIDI=${YDPSJIDI}&longfeiUSERID=${longfeiUSERID
    }&sendtoMktid=${sendtoMktid}&sendtoCode=${sendtoCode}`;
  },
  queryCustomerSendto(timestamp, customerCode) { // 整车--配送至
    return `/queryCustomer/queryCustomerSendto?timestamp=${timestamp}&customerCode=${customerCode}`;
  },
  queryES(timestamp, categoryCode, name, pageNum, pageSize, customerCode, dstCode, center,
    brandName, sortDirection, sortType, brandGroup, productCode, highPrice, lowPrice,
    farWeekGroup, baseCode) {
    return `/querySample/queryEs?timestamp=${timestamp}&categoryCode=${categoryCode}&name=${name
    }&attributeName=&attributeValue=&pageNum=${pageNum}&pageSize=${pageSize}&customerCode=${customerCode
    }&dstCode=${dstCode}&center=${center}&isWholeCar=1&group=&brandName=${brandName}&sortDirection=${sortDirection
    }&sortType=${sortType}&tags=&brandGroup=${brandGroup}&productCode=${productCode}&highPrice=${highPrice
    }&lowPrice=${lowPrice}&farWeekGroup=${farWeekGroup}&baseCode=${baseCode}`;
  },
  queryCarNum(timestamp, longfeiUSERID) { // 整车购物车数量查询
    return `/queryOrder/shoppingCartNum?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  queryCarList(timestamp, longfeiUSERID) { // 整车购物车列表查询
    return `/queryOrder/shoppingCartAll?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  addToCart: '/AddToCart/insertOrder', // 加入整车购物车
  queryNewSeq(timestamp, CUSTUMER_TYPE) { // 获取整车加购物车时的单号
    return `/base/getNewSeq?timestamp=${timestamp}&CUSTUMER_TYPE=${CUSTUMER_TYPE}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
