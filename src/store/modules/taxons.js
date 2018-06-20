import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { helpers } from '../helpers/helpers';
import * as types from '../types';

Vue.use(VueAxios, axios);

const state = {
  taxons: {}
};

const getters = {
  [types.GET_TAXONS]: function (state) {
    return state.taxons;
  }
};

const mutations = {
  [types.MUTATE_SET_TAXONS]: function (state, payload) {
    state.taxons = payload;
  }
};

const actions = {
  [types.FETCH_TAXONS]: function (context) {
    axios.get('api/ams/taxons').then(function (response) {
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
