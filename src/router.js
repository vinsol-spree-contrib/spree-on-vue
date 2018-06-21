import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home/Home.vue';
import Shop from './components/shop/Shop.vue';
import ProductDetails from './components/product/ProductDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/shop',
    component: Shop
  },

  {
    path: '/products/:slug',
    component: ProductDetails
  }
];

export default new VueRouter( {routes} );