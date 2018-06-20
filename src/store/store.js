import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import taxons from './modules/taxons';

const store = new Vuex.Store({
  modules: {
    taxons
  }
});

export default store;
