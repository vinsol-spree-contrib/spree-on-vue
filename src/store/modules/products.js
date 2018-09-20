import axios from 'axios';
import * as types from '../types';
import * as apis from '../apis';
import { Loading } from 'element-ui';

const state = {
  product: {},
  products: {},
  searchResults: {},
  taxonProducts: [],
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
  },

  [types.GET_TAXON_PRODUCTS]: function (state) {
    return state.taxonProducts;
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
  },

  [types.MUTATE_TAXON_PRODUCTS]: function (state, payload) {
    state.taxonProducts = payload;
  }
};

const actions = {

  /* Fetch All Products API */
  [types.FETCH_PRODUCTS]: function (context, { 'page': page, 'per_page': perPage }) {
    var loading = Loading.service({ fullscreen: true });
    axios.get('api/ams/products?page=' + page + '&per_page=' + perPage).then(function (response) {
      context.commit(types.MUTATE_SET_PRODUCTS, response.data);
      loading.close();
    });
  },

  /* Fetch Single Products API */
  [types.FETCH_PRODUCT]: function (context, payload) {
    context.commit(types.MUTATE_SET_PRODUCT, null);
    var loading = Loading.service({ fullscreen: true });
    axios.get(apis.FETCH_PRODUCT + payload).then(function (response) {
      context.commit(types.MUTATE_SET_PRODUCT, response.data);
      loading.close();
    });
  },

  /* Search API*/
  [types.SEARCH]: function (context, payload) {
    var loader = Loading.service({ fullscreen: true });
    axios.get(apis.SEARCH_PRODUCTS + payload).then(function (response) {
      context.commit(types.MUTATE_SEARCH_RESULTS, response.data);
      loader.close();
    });
  },

  /* Taxon Products API */
  [types.TAXON_PRODUCTS]: function (context, payload) {
    var loading = Loading.service({ fullscreen: true });
    context.commit(types.MUTATE_TAXON_PRODUCTS, []);
    return axios.get(apis.TAXON_PRODUCTS + payload).then(function (response) {
      context.commit(types.MUTATE_TAXON_PRODUCTS, response.data);
      loading.close();
    });
  }

};

export default {
  state,
  getters,
  mutations,
  actions
};
