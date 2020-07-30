const filters = {
  rmHtml(str) {
    /* 替换html标签 */
    return str.replace(/(<[\s\S]*>)([\s\S]*)(<\/[\s\S]*>)/g, (match, $1, $2) => $2);
  },
  rebatePolicy(val) {
    /* 返利 */
    return {
      0: 'COM',
      1: 'BF',
      2: 'FHQ',
      5: 'BZK'
    }[val] || '';
  }
};


export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key]);
    });
  }
};
