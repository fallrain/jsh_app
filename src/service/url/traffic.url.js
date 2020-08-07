import util from '../util/index';

const baseURL = 'traffic';
const urls = {
  // 查询产品组的信用额度
  getXYQuota: '/queryCustomer/XYQuota',
  carLoadType(timestamp, JDCODE, SendWay, MKTID, longfeiMFID) { // 整车列表-车型
    return `/baseQuery/carLoadType?timestamp=${timestamp}&JDCODE=${JDCODE}&SendWay=${SendWay}&MKTID=${MKTID}&longfeiMFID=${longfeiMFID}`;
  },
  querySendWay(timestamp, YDPSJIDI, longfeiUSERID, sendtoMktid, sendtoCode) { // 整车列表-配送类型
    return `/baseQuery/querySendWay?timestamp=${timestamp}&YDPS_JIDI=${YDPSJIDI}&longfeiUSERID=${longfeiUSERID}&sendtoMktid=${sendtoMktid}&sendtoCode=${sendtoCode}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
