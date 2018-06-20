import axios from 'axios';
import * as types from '../types';

const state = {
  products: {}
};

const getters = {
  [types.GET_PRODUCTS]: function(state) {
    return state.products;
  }
};

const mutations = {
  [types.MUTATE_SET_PRODUCTS]: function (state, payload) {
    state.products = payload;
  }
};

const actions = {
  [types.FETCH_PRODUCTS]: function(context, payload) {
    axios.get('api/ams/products?per_page=' + payload).then(function (response) {
      context.commit(types.MUTATE_SET_PRODUCTS, response.data);
      console.log(response.data);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
