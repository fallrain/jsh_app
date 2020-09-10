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
    saleInfo: {},
    // token里的用户信息
    tokenUserInf: {},
    // 默认送达方信息
    defaultSendToInf: {}
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
      state.saleInfo = data;
    },
    [USER.UPDATE_TOKEN_USER](state, data) {
      /* 修改token用户信息 */
      state.tokenUserInf = data;
    },
    [USER.UPDATE_DEFAULT_SEND_TO](state, data) {
      /* 修改默认送达方 */
      state.defaultSendToInf = data;
    }
  },
  actions: {
    async [USER.UPDATE_SALE_ASYNC]({ commit }) {
      /* 获取售达方信息 */
      const { code, data } = await Vue.prototype.customerService.getCustomer();
      if (code === '1') {
        return commit(USER.UPDATE_SALE, data);
      }
    },
    async [USER.UPDATE_TOKEN_USER_ASYNC]({ commit }) {
      /* 修改token用户信息 */
      const { code, data } = await Vue.prototype.authService.getUserInfoByToken();
      if (code === '1') {
        return commit(USER.UPDATE_TOKEN_USER, data);
      }
    },
    async [USER.UPDATE_DEFAULT_SEND_TO_ASYNC]({ commit }) {
      /* 修改默认送达方信息 */
      return Vue.prototype.customerService.addressesList(1).then(({ code, data }) => {
        if (code === '1') {
          // 当前配送地址修改(选出默认地址)
          let defaultIndex = data.findIndex(v => v.defaultFlag === 1);
          if (defaultIndex > -1) {
            defaultIndex = 0;
          }
          // 更新默认送达方store
          commit(USER.UPDATE_DEFAULT_SEND_TO, data[defaultIndex]);
          return {
            code,
            data
          };
        }
      });
    }
  },
  getters: {
    [USER.GET_USER](state) {
      /* 用户信息 */
      return state.userInfo;
    },
    [USER.GET_SALE](state) {
      /* 售达方信息 */
      return state.saleInfo;
    },
    [USER.GET_TOKEN_USER](state) {
      /* token用户信息 */
      return state.tokenUserInf;
    },
    [USER.GET_DEFAULT_SEND_TO](state) {
      /* 默认送达方信息 */
      return state.defaultSendToInf;
    },
  }
};
