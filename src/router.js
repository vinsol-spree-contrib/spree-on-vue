import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/home/Home.vue';
import Shop from './components/shop/Shop.vue';
import ProductDetails from './components/product/ProductDetails.vue';
import Entry from './components/user/Entry.vue';
import Profile from './components/user/Profile.vue';
import Order from './components/user/Order.vue';
import Cart from './components/cart/Cart.vue';
import Address from './components/order/Address.vue';
import TaxonProducts from './components/product/TaxonProducts.vue';

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
  },

  {
    path: '/categories/:name/:id',
    component: TaxonProducts
  }

];

export default new VueRouter( {routes} );