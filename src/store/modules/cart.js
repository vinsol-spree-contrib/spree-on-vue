import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

const state = {
  cartItems: {},
  cartErrors: "",
};

const getters = {
  getCartItemsCart(state) {
    return state.cartItems;
  },

  getCartErrors(state) {
    return state.cartErrors;
  },
};

const mutations = {
  setCartItems(state, items) {
    state.cartItems = items || {};
  },

  setCartErrors(state, error) {
    state.cartErrors = error;
  },
};

const actions = {

  createNewOrderAndAddItem(context, formData) {
    axios.post('/api/ams/orders', { order: { order_token: "" } }, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      context.dispatch('addItemToCart', formData);
    })
  },

  addItemToCart(context, formData) {
    var loading = Loading.service({ fullscreen: true });
    axios.post('api/ams/line_items', {
      order_number: context.getters.getCartItemsCart.order.id,
      line_item: {
        quantity: formData.quantity,
        variant_id: formData.variant_id
      }
    }, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function () {
      context.commit("setCartErrors", "");
      context.dispatch('fetchUserCurrentOrders');
      Message({
        duration: 2000,
        message: formData.message,
        showClose: true,
        type: 'success'
      });
      loading.close();
    }).catch(function (error) {
      context.commit('setCartErrors', error.response.data.exception);
      loading.close();
      Message({
        duration: 2000,
        message: error.response.data.exception,
        showClose: true,
        type: 'error'
      });
    });
  },

  addToCart(context, formData) {
    if (context.getters.getCartItemsCart.order && context.getters.getCartItemsCart.order.state !== "complete") {
      context.dispatch('addItemToCart', formData);
    } else {
      context.dispatch('createNewOrderAndAddItem', formData);
    }
  },

  emptyCurrentOrder(context, orderId) {
    var loading = Loading.service({ fullscreen: true });
    axios.put('/api/ams/orders/' + orderId + '/empty', {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      loading.close();
    });
  },

  proceedToAddressState(context, orderId) {
    return axios.put('/api/ams/checkouts/' + orderId + '/next', {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
    });
  },

  deleteLineItem(context, { 'number': number, 'lineItemId': lineItemId }) {
    var loading = Loading.service({ fullscreen: true });
    return new Promise(function (resolve, reject) {
      axios.delete('/api/v1/orders/' + number + '/line_items/' + lineItemId, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function () {
        context.dispatch('fetchUserCurrentOrders').then(function () {
          resolve();
          loading.close();
        });
      });
    })
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
