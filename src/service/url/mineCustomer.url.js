import util from '../util/index';

const baseURL = 'customer';
const urls = {
  mineBaseInfo(code) { // 我的-基本信息
    return `/getCustomerMasterInformation/${code}`;
  },
  mineSignList(code, pageNo) { // 我的-签约信息
    return `/getCustomerSigned/${code}?pageNum=${pageNo}&pageSize=15`;
  },
  productQueryInter: '/customer/queryCustomerInterestProductByAccount', // 商品详情-查询是否已关注
  productAddInter: '/customer/addInterestProduct', // 商品详情-添加关注
  productRemoveInter: '/customer/removeInterestProduct', // 商品详情-取消关注
};
util.addPrefix(baseURL, urls);
export default urls;
