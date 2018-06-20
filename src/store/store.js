import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import taxons from './modules/taxons';
import products from './modules/products';

const store = new Vuex.Store({
  modules: {
    taxons,
    products
  }
});

export default store;
