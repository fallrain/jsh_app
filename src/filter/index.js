const filters = {
  rmHtml(str) {
    /*  */
    return str.replace(/(<[\s\S]*>)([\s\S]*)(<\/[\s\S]*>)/g, (match, $1, $2) => $2);
  }
};


export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key]);
    });
  }
};
