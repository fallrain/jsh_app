import util from '../util/index';

const baseURL = 'customer';
const urls = {
  mineBaseInfo(code) { // 我的-基本信息
    return `/getCustomerMasterInformation/${code}`;
  },
  mineSignList(code, pageNo) { // 我的-签约信息
    return `/getCustomerSigned/${code}?pageNum=${pageNo}&pageSize=15`;
  }
  // https://new.jsh.com/new/api/customer/getCustomerSigned/8800012497?pageNum=1&pageSize=15//签约详情
};
util.addPrefix(baseURL, urls);
export default urls;
