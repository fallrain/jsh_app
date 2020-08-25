import util from '../lib/util';

const filters = {
  rmHtml(str) {
    /* 替换html标签 */
    return str.replace(/(<[^<>]*>)([^<>]*)(<\/[^<>]*>)/g, (match, $1, $2) => $2);
  },
  rebatePolicy(val) {
    /* 返利 */
    return {
      0: 'COM',
      1: 'BF',
      2: 'FHQ',
      5: 'BZK'
    }[val] || '';
  },
  formatMoney(number) {
    /* 把一个数字转换为一个2位小数的金额数字 */
    return util.formatNumber(number, 2);
  }
};


export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key]);
    });
  }
};
