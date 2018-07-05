import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import taxons from './modules/taxons';
import products from './modules/products';
import session from './modules/session';
import user from './modules/user';

const store = new Vuex.Store({

  state: {
    alertMessage: ''
  },

  getters: {
    getAlertMessage: function(state) {
      return state.alertMessage;
    }
  },

  mutations: {
    setAlertMessage: function(state, payload) {
      state.alertMessage = payload;
    }
  },

  actions: {
    showMessage: function (context, { 'message': message, 'type': type } ) {
      context.commit('setAlertMessage', { message, type });
    }
  },

  modules: {
    taxons,
    products,
    session,
    user
  }
});

export default store;
