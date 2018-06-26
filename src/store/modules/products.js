import axios from 'axios';
import * as types from '../types';

const state = {
  products: {},
  product: {},
  searchResults: {}
};

const getters = {
  [types.GET_PRODUCTS]: function (state) {
    return state.products;
  },

  [types.GET_PRODUCT]: function (state) {
    return state.product;
  },

  [types.GET_SEARCH_RESULTS]: function (state) {
    return state.searchResults;
  }
};

const mutations = {
  [types.MUTATE_SET_PRODUCTS]: function (state, payload) {
    state.products = payload;
  },

  [types.MUTATE_SET_PRODUCT]: function (state, payload) {
    state.product = payload;
  },

  [types.MUTATE_SEARCH_RESULTS]: function (state, payload) {
    state.searchResults = payload;
  }
};

const actions = {
  [types.FETCH_PRODUCTS]: function (context, payload) {
    axios.get('api/ams/products?per_page=' + payload).then(function (response) {
      context.commit(types.MUTATE_SET_PRODUCTS, response.data);
    });
  },

  [types.FETCH_PRODUCT]: function (context, payload) {
    context.commit(types.MUTATE_SET_PRODUCT, null);
    axios.get('api/ams/products/' + payload).then(function (response) {
      context.commit(types.MUTATE_SET_PRODUCT, response.data);
    });
  },

  [types.SEARCH]: function(context, payload) {
    axios.get('api/ams/products?q[name_cont]=' + payload).then(function (response) {
      context.commit(types.MUTATE_SEARCH_RESULTS, response.data);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
