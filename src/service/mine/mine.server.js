import url from '../url/mineCustomer.url';
import url2 from '../url/account.url';
import {
  jGet,
  jPost, jPostJson
} from '@/lib/request';


export default {
  mineBaseInfo(code) {
    /* 我的-基础信息 */
    return jGet(url.mineBaseInfo(code));
  },
  mineSignList(code, pageNo) {
    /* 我的-签约信息 */
    return jGet(url.mineSignList(code, pageNo));
  },
  // 基本信息-交易权限、市场秩序、样品机权限
  getCustomerBasicInformation(uid) {
    return jGet(url.getCustomerBasicInformation(uid));
  },
  // 基本信息-整车权限、金融服务
  getZhengCheAndFinancialDto(uid) {
    return jGet(url.getZhengCheAndFinancialDto(uid));
  },
  // 签约信息
  getCustomerSigned(uid) {
    return jGet(url.getCustomerSigned(uid, 1, 10));
  },
  // 门店信息
  getBranchInformation(uid) {
    return jGet(url.getBranchInformation(uid, 1, 10));
  },
  // 送达方列表
  customers(uid) {
    return jGet(url.customers(uid,));
  },
  // 付款方列表
  auxiliary(salesGroupCode, status) {
    return jGet(url.auxiliary(salesGroupCode, status));
  },
  // 付款方余额
  payerBalanceList(param) {
    return jPostJson(url.payerBalanceList(), param);
  },
  // 返利
  outstandingAmount(param) {
    console.log('outstandingAmount post');
    return jPostJson(url2.outstandingAmount(), param);
  }
};
