import Vuex from 'vuex';
import Vue from 'vue';
import {
  USER
} from '../mutationsTypes';

Vue.use(Vuex);
export default {
  state: {
    // userInfo为模拟的用户信息
    userInfo: {
    },
    // 售达方信息
    saleInfo: {}
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [USER.UPDATE_USER](state, data) {
      /* 修改用户信息 */
      state.userInfo = data;
    },
    [USER.UPDATE_SALE](state, data) {
      /* 修改送达方信息 */
      state.userInfo = data;
    }
  },
  actions: {
    async [USER.UPDATE_SALE_ASYNC]({ commit }) {
      /* 获取售达方信息 */
      const { code, data } = await Vue.prototype.customerService.getCustomer();
      if (code === '1') {
        return commit(USER.UPDATE_SALE, data);
      }
    }
  },
  getters: {
    [USER.GET_USER](state) {
      /* 用户信息 */
      return state.userInfo;
    },
    [USER.GET_SALE](state) {
      /* 售达方信息 */
      return state.userInfo;
    },
  }
};
