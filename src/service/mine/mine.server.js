import url from '../url/mineCustomer.url';
import {
  jGet
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
  getCustomerBasicInformation(code) {
    return jGet(url.getCustomerBasicInformation(code))
  },
  // 基本信息-整车权限、金融服务
  getZhengCheAndFinancialDto(code) {
    return jGet(url.getZhengCheAndFinancialDto(code))
  }
};
