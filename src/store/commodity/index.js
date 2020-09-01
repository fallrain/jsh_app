import Vuex from 'vuex';
import Vue from 'vue';
import {
  COMMODITY
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    // 商品有货商品分类列表
    catalogList: {
    },
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [COMMODITY.UPDATE_CATALOG_LIST](state, data) {
      /* 修改商品有货商品分类列表 */
      state.catalogList = data;
    }
  },
  actions: {
    async [COMMODITY.UPDATE_CATALOG_LIST_ASYNC]({ commit }) {
      /* 获取商品有货商品分类列表 */
      const { code, data } = await Vue.prototype.commodityService.catalogList();
      if (code === '1') {
        commit(COMMODITY.UPDATE_CATALOG_LIST, data);
        return { code, data };
      }
    }
  },
  getters: {
    [COMMODITY.GET_CATALOG_LIST](state) {
      /* 商品有货商品分类列表 */
      return state.catalogList;
    }
  }
};
