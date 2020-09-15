import url from '../url/order.url';
import urlNoApi from '../url/orderNoApi.url';
import {
  jPostJson,
  jGet
} from '@/lib/request';
import OrderInfoModelForm from '../../model/OrderInfoModelForm';

export default {
  orderList(data) { // 订单列表
    return jPostJson(url.orderList, data);
  },
  buttonLogicJudgment(data) { // 按钮显示：
    return jPostJson(url.buttonLogicJudgment, data);
  },
  paytoInfo(data) { // 付款方列表
    return jPostJson(urlNoApi.paytoInfo, data);
  },
  sendVerify(data) { // 获取上上签验证联系方式接口
    return jPostJson(urlNoApi.sendVerify(data));
  },
  mianMi(data) { // 是否免密
    return jGet(urlNoApi.mianMi, data);
  },
  send(data) { // 获取验证码
    return jPostJson(urlNoApi.send(data));
  },
  getOrderMonthSummery(data) {
    /* 基本信息-订单交易状态 */
    const formData = new OrderInfoModelForm(data);
    return jPostJson(url.orderMonthSummery, {
      ...formData,
      pageNo: 1,
      pageSize: 10
    });
  },
  validateProduct(data, cfg) {
    /* 拆单校验 */
    const {
      // (售达方编码):string
      saletoCode,
      // (售达方手机号)?:string
      saletoPhone,
      // (送达方编码):string
      sendtoCode,
      // (商品数据):array
      splitComposeList,
      // (云仓编码):string
      yunCangCode,
      // (云仓标识(yc:云仓,ydyc:异地云仓,gcyc:工厂云仓)):string
      yunCangFlag
    } = data;
    return jPostJson(urlNoApi.validateProduct, {
      saletoCode,
      saletoPhone,
      sendtoCode,
      splitComposeList,
      yunCangCode,
      yunCangFlag
    }, cfg);
  },
  splitOrder(data, cfg) { // 拆单
    return jPostJson(urlNoApi.splitOrder, data, cfg);
  },
  updateOrderInfo(data) { // 订单提交
    return jPostJson(urlNoApi.updateOrderInfo, data);
  },
  cancelOrder(data) { // 取消订单
    return jPostJson(urlNoApi.cancelOrder, data);
  },
  cancelOrderBybstnk(bstnk) {
    return jGet(url.cancelOrderBybstnk(bstnk));
  },
  getOrderInfo(data) { // 获取订单信息
    return jPostJson(urlNoApi.getOrderInfo, data);
  },
  getProvince(data) { // 获取省份
    return jGet(urlNoApi.getProvince, data);
  },
  getCity(code) { // 获取市
    return jGet(urlNoApi.getCity(code));
  },
  getArea(code) { // 获取区
    return jGet(urlNoApi.getArea(code));
  },
  getCollectRemarkAddr(data) { // 直发异地地址列表
    return jPostJson(urlNoApi.getCollectRemarkAddr, data);
  },
  queryJDAddr() { // 直发异地地址列表
    return jGet(urlNoApi.queryJDAddr);
  },
  getBillInfo(sendtoCode, productGroup) { // 查询开票方列表
    return jGet(urlNoApi.getBillInfo(sendtoCode, productGroup));
  },
  orderSelfSigned(bstnk) { // 自主签收
    return jGet(url.orderSelfSigned, bstnk);
  },
  getTctpSwitch() {
    return jGet(urlNoApi.getTctpSwitch);
  },
  tctpConfirm(dn,bstnk) {
    return jGet(url.tctpConfirm(dn,bstnk));
  }

};
