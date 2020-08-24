import {
  jGet,
  jPostJson
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
  queryEs(params) {
    const {
      timestamp,
      categoryCode,
      name,
      pageNum,
      pageSize,
      customerCode,
      dstCode,
      center,
      brandName,
      sortDirection,
      sortType,
      brandGroup,
      productCode,
      highPrice,
      lowPrice,
      farWeekGroup,
      baseCode,
      attributeName,
      attributeValue
    } = params;
    return jGet(url.queryES, {
      timestamp,
      isWholeCar: 1,
      categoryCode,
      name,
      pageNum,
      pageSize,
      customerCode,
      dstCode,
      center,
      brandName,
      sortDirection,
      sortType,
      brandGroup,
      productCode,
      highPrice,
      lowPrice,
      farWeekGroup,
      baseCode,
      attributeName,
      attributeValue
    });
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
  },
  queryCarPrice(timestamp, longfeiUSERID, longfeiMFID, gbid) { // 整车购物车详情页面查询价格
    return jGet(url.queryCarPrice(timestamp, longfeiUSERID, longfeiMFID, gbid));
  },
  cartSubmitPreCheck(a, b, c) { // 整车购物车提交结算校验
    return jGet(url.cartSubmitPreCheck(a, b, c));
  },
  cartSubmit(timestamp, longfeiUSERID, IBR_SEQ, verifyCode, verifyKey) { // 整车购物车提交
    return jGet(url.cartSubmit(timestamp, longfeiUSERID, IBR_SEQ, verifyCode, verifyKey));
  },
  deleteVehicleOrder(timestamp, longfeiUSERID, IBR_SEQ) { // 删除订单
    return jGet(url.deleteVehicleOrder(timestamp, longfeiUSERID, IBR_SEQ));
  },
  queryPayCode(longfeiUSERID, productGroup, sendToCode, yuncangType, bstnk) { // 整车购物车获取付款方
    return jGet(url.queryPayCode(longfeiUSERID, productGroup, sendToCode, yuncangType, bstnk));
  },
  updatePayMoney(params) { // 切换付款方接口
    const {
      timestamp,
      longfeiUSERID,
      IBL_ACTPRICE,
      IBL_BATERATE,
      IBL_ISFL,
      IBL_KORDERNO,
      IBL_NUM,
      IBL_PAYMONEY,
      IBL_RETAILPRICE,
      IBL_UNITPRICE,
      IBL_LOSSRATE,
      IBL_TFSUMPRICE
    } = params;
    return jGet(url.updatePayMoney, {
      timestamp,
      longfeiUSERID,
      IBL_ACTPRICE,
      IBL_BATERATE,
      IBL_ISFL,
      IBL_KORDERNO,
      IBL_NUM,
      IBL_PAYMONEY,
      IBL_RETAILPRICE,
      IBL_UNITPRICE,
      IBL_LOSSRATE,
      IBL_TFSUMPRICE
    });
  },
  queryJDWarehouse(timestamp, longfeiUSERID) { // 整车购物车获取京东异地地址
    return jGet(url.queryJDWarehouse(timestamp, longfeiUSERID));
  },
  ydContact(timestamp, longfeiUSERID, ibrSeq, address, OESBS, ydCardNo, ydName, ydTel) { // 京东异地地址保存
    return jGet(url.ydContact(timestamp, longfeiUSERID, ibrSeq, address, OESBS, ydCardNo, ydName, ydTel));
  }
};
