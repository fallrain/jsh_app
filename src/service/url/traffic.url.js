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
  // 查询整车列表
  queryES: '/querySample/queryEs',
  queryCarNum(timestamp, longfeiUSERID) { // 整车购物车数量查询
    return `/queryOrder/shoppingCartNum?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  queryCarList(timestamp, longfeiUSERID) { // 整车购物车列表查询
    return `/queryOrder/shoppingCartAll?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  addToCart: '/AddToCart/insertOrder', // 加入整车购物车
  queryNewSeq(timestamp, CUSTUMER_TYPE) { // 获取整车加购物车时的单号
    return `/base/getNewSeq?timestamp=${timestamp}&CUSTUMER_TYPE=${CUSTUMER_TYPE}`;
  },
  queryCarPrice(timestamp, longfeiUSERID, longfeiMFID, gbid) { // 整车购物车详情页面查询价格
    return `/base/queryGoodsPrice?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}&longfeiMFID=${longfeiMFID}&gbid=${gbid}`;
  },
  cartSubmitPreCheck(timestamp, longfeiUSERID, IBR_SEQ) { // 整车购物车提交结算校验
    return `/order/cartSubmitPreCheck?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}&IBR_SEQ=${IBR_SEQ}`;
  },
  cartSubmit(timestamp, longfeiUSERID, IBR_SEQ, verifyCode, verifyKey) { // 整车购物车提交
    return `/submit/cartSubmit?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}&IBR_SEQ=
    ${IBR_SEQ}&verifyCode=${verifyCode}&verifyKey=${verifyKey}`;
  },
  deleteVehicleOrder(timestamp, longfeiUSERID, IBR_SEQ) { // 删除订单
    return `/deleteOrder/deleteAll?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}&IBR_SEQ=${IBR_SEQ}`;
  },
  queryPayCode(longfeiUSERID, productGroup, sendToCode, yuncangType, bstnk) { // 整车购物车获取付款方
    return `/base/queryPayCode?longfeiUSERID=${longfeiUSERID}&productGroup=${productGroup}&sendToCode=${sendToCode}&yuncangType=${yuncangType}&bstnk=${bstnk}`;
  },
  updatePayMoney(a, b, c, d, e, f, g, h, i, j, k, l) { // 切换付款方接口
    return `/ydContact/updatePayMoney?timestamp=${a}&longfeiUSERID=${b}&IBL_ACTPRICE=${c}&IBL_BATERATE=${d}&IBL_ISFL=${e}&IBL_KORDERNO=${f}&IBL_NUM=${g}&IBL_PAYMONEY=${h}&IBL_PROCODE=&IBL_RETAILPRICE=${i}&IBL_UNITPRICE=${j}&IBL_LOSSRATE=${k}&IBL_TFSUMPRICE=${l}`;
  },
  queryJDWarehouse(timestamp, longfeiUSERID) { // 整车购物车获取京东异地地址
    return `/base/queryJDWarehouse?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}`;
  },
  ydContact(timestamp, longfeiUSERID, ibrSeq, address, OESBS, ydCardNo, ydName, ydTel) { // 京东异地地址保存
    return `/ydContact/save?timestamp=${timestamp}&longfeiUSERID=${longfeiUSERID}&ibrSeq=${ibrSeq}&address=${address}&OESBS=${OESBS}&ydCardNo=${ydCardNo}&ydName=${ydName}&ydTel=${ydTel}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
