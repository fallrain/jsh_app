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
    return `/baseQuery/querySendWay?timestamp=${timestamp}&YDPS_JIDI=${YDPSJIDI}&longfeiUSERID=${longfeiUSERID}&sendtoMktid=${sendtoMktid}&sendtoCode=${sendtoCode}`;
  },
  queryEs(timestamp, categoryCode, name, attributeName, attributeValue, pageNum, customerCode, dstCode, center,
    isWholeCar, group, brandName, sortDirection, sortType, tags, brandGroup, productCode, highPrice, lowPrice, farWeekGroup, baseCode) {
    return `/querySample/queryEs?timestamp=${timestamp}&categoryCode=${categoryCode}&name=${name}&attributeName=${attributeName
    }&attributeValue=${attributeValue}&pageNum=${pageNum}&pageSize=15&customerCode=${customerCode}&dstCode=${dstCode}&center=${center
    }&isWholeCar=${isWholeCar}&group=${group}&brandName=${brandName}&sortDirection=${sortDirection}&sortType=${sortType}&tags=${tags
    }&brandGroup=${brandGroup}&productCode=${productCode}&highPrice=${highPrice}&lowPrice=${lowPrice}&farWeekGroup=${farWeekGroup}&baseCode=${baseCode}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
