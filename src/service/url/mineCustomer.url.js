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
  productAddInter(code1, coede2, code) { // 商品详情-添加关注
    return `/customer/addInterestProduct/${code1}/${coede2}/${code}`;
  },
  productRemoveInter: '/customer/removeInterestProduct', // 商品详情-取消关注
  // 基本信息-交易权限、市场秩序、样品机权限
  getCustomerBasicInformation(code) {
    return `/getCustomerBasicInformation/${code}`; 
  },
  // 基本信息-整车权限、金融服务
  getZhengCheAndFinancialDto(code) {
    return `/getZhengCheAndFinancialDto/${code}`; 
  }
};
util.addPrefix(baseURL, urls);
export default urls;
