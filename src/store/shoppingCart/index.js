import Vuex from 'vuex';
import Vue from 'vue';
import {
  SHOPPING_CART
} from '../mutationsTypes';
import cartService from '../../service/cart/cart.service';

Vue.use(Vuex);
export default {
  state: {
    // 购物车产品数量
    cartNum: 0
  },
  getters: {
    [SHOPPING_CART.GET_CART_NUM](state) {
      /* 获取购物车产品数量 */
      return state.cartNum;
    },
  },
  mutations: {
    /* eslint注释请不要删除 */
    /* eslint-disable no-unused-expressions */
    [SHOPPING_CART.UPDATE_CART_NUM](state, data) {
      /* 更新购物车产品数量 */
      state.cartNum = data;
      if (state.cartNum) {
        uni.setTabBarBadge({
          index: 2,
          text: `${state.cartNum}`
        });
      } else {
        uni.removeTabBarBadge({
          index: 2
        });
      }
    }
  },
  actions: {
    async [SHOPPING_CART.UPDATE_CART_NUM_ASYNC]({ commit }, customerCode) {
      /* 异步获取、更新购物车产品数量 */
      const res = await cartService.getShoppingCartNum(customerCode);
      const {
        code,
        data
      } = res;
      if (code === '1') {
        commit(SHOPPING_CART.UPDATE_CART_NUM, data);
      }
      return res;
    }
  },
};
