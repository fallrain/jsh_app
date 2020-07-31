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
    }
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [USER.UPDATE_USER](state, data) {
      state.userInfo = data;
    }
  },
  getters: {
    [USER.GET_USER](state) {
      /* 用户信息 */
      return state.userInfo;
    },
  }
};
