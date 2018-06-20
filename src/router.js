import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home/Home.vue';
import Shop from './components/shop/Shop.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/shop',
    component: Shop
  }
];

export default new VueRouter( {routes} );