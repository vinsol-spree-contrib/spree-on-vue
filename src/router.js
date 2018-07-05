import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/home/Home.vue';
import Shop from './components/shop/Shop.vue';
import ProductDetails from './components/product/ProductDetails.vue';
import Entry from './components/user/Entry.vue';
import Profile from './components/user/Profile.vue';
import Orders from './components/user/Orders.vue';
import Order from './components/user/Order.vue';
import Cart from './components/cart/Cart.vue';
import Address from './components/order/Address.vue';

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
  },

  {
    path: '/entry',
    component: Entry,
    beforeEnter(to, from, next) {
      !localStorage.getItem('userToken') ? next() : next('/');
    }
  },

  {
    path: '/profile',
    component: Profile,
    beforeEnter(to, from, next) {
      localStorage.getItem('userToken') ? next() : next('/');
    }
  },

  {
    path: '/orders',
    component: Orders,
    beforeEnter(to, from, next) {
      localStorage.getItem('userToken') ? next() : next('/');
    }
  },

  {
    path: '/orders/:id',
    component: Order,
    beforeEnter(to, from, next) {
      localStorage.getItem('userToken') ? next() : next('/');
    }
  },

  {
    path: '/cart',
    component: Cart
  },

  {
    path: '/address',
    component: Address
  }

];

export default new VueRouter( {routes} );