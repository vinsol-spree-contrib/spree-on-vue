import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

const state = {
  loggedInUser: null || {},
  mineOrders: {},
  singleOrder: {},
  cartItems: {
    line_items: []
  },
  cartErrors: "",
  addressErrors: "",
  countries: "",
  states: "",
  userDetails: {},
  deliveryStateData: {},
  paymentStateData: {},
  confirmStateData: {}
};

const getters = {
  getLogedInUser(state) {
    return state.loggedInUser;
  },

  getAllOrders(state) {
    return state.mineOrders;
  },

  getCartItems(state) {
    return state.cartItems;
  },

  getSingleOrder(state) {
    return state.singleOrder;
  },

  getCartErrors(state) {
    return state.cartErrors;
  },

  getAddressErrors(state) {
    return state.addressErrors;
  },

  getCountries(state) {
    return state.countries;
  },

  getStates(state) {
    return state.states;
  },

  getUserDetails(state) {
    return state.userDetails;
  },

  getDelivertStateData (state) {
    return state.deliveryStateData;
  },

  getPaymentStateData(state) {
    return state.paymentStateData;
  },

  getConfirmStateData(state) {
    return state.confirmStateData;
  }
};

const mutations = {
  setLogedInUser(state, user) {
    state.loggedInUser = user;
  },

  setAllOrders(state, orders) {
    state.mineOrders = orders || {};
  },

  setCartItems(state, items) {
    state.cartItems = items || {};
  },

  setSingleOrder(state, order) {
    state.singleOrder = order;
  },

  setCartErrors(state, error) {
    state.cartErrors = error;
  },

  setAddressErrors(state, error) {
    state.addressErrors = error;
  },

  setCountries(state, countries) {
    state.countries = countries;
  },

  setStates(state, states) {
    state.states = states;
  },

  setUserDetails(state, details) {
    return state.userDetails = details;
  },

  setDelivertStateData(state, deliveryData) {
    return state.deliveryStateData = deliveryData;
  },

  setPaymentStateData(state, paymentData) {
    return state.paymentStateData = paymentData;
  },

  setConfirmStateData(state, confirmData) {
    return state.confirmStateData = confirmData;
  }
};

const actions = {
  fetchUser(context) {
    axios.get('/api/ams/users/', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setLogedInUser', response.data.users[0]);
    }).catch(function (error) {

    });
  },

  /* Fetches the completed orders */
  fetchUserOrders(context) {
    var loading = Loading.service({ fullscreen: true });
    axios.get('/api/ams/orders/mine', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setAllOrders', response.data);
      loading.close();
    }).catch(function (error) {
    });
  },

  fetchSingleOrder(context, id) {
    var loading = Loading.service({ fullscreen: true });
    context.commit('setSingleOrder', null);
    axios.get('api/ams/orders/' + id, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setSingleOrder', response.data);
      loading.close();
    });
  },

  /* Fetches the current orders in cart */
  fetchUserCurrentOrders(context) {
    var loading = Loading.service({ fullscreen: true });
    axios.get('/api/ams/orders/current', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      loading.close();
    }).catch(function (error) {
    });
  },

  createNewOrderAndAddItem(context, formData) {
    axios.post('/api/ams/orders', { order: { order_token: "" } }, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      context.dispatch('addItemToCart', formData);
    })
  },

  addItemToCart(context, formData) {
    axios.post('api/ams/line_items', {
      order_number: context.getters.getCartItems.order.id,
      line_item: {
        quantity: formData.quantity,
        variant_id: formData.variant_id
      }
    }, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit("setCartErrors", "");
      context.dispatch('fetchUserCurrentOrders');
      Message({
        duration: 3000,
        message: formData.message,
        showClose: true,
        type: 'success'
      });
      
    }).catch(function(error) {
      context.commit('setCartErrors', error.response.data.exception);
      Message({
        duration: 3000,
        message: error.response.data.exception,
        showClose: true,
        type: 'error'
      });
    })
  },

  addToCart(context, formData) {
    if (context.getters.getCartItems.order) {
      context.dispatch('addItemToCart', formData);
    } else {
      context.dispatch('createNewOrderAndAddItem', formData);
    }
  },

  emptyCurrentOrder(context, orderId) {
    axios.put('/api/ams/orders/' + orderId + '/empty', {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function(response) {
      context.dispatch('fetchUserCurrentOrders');
      Message({
        duration: 3000,
        message: 'All items removed from the basket.',
        showClose: true
      });
    });
  },

  proceedToAddressState(context, orderId) {
    axios.put('/api/ams/checkouts/' + orderId + '/next', {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function(response) {
      context.dispatch('fetchUserCurrentOrders');
    });
  },

  proceedToDeliveryState(context, { 'number': orderNumber, 'addressData': addressData}) {
    axios.put('/api/ams/checkouts/' + orderNumber, addressData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken')  } }).then(function(response) {
      context.commit('setDelivertStateData', response.data);
      context.dispatch('fetchUserCurrentOrders');
    }).catch(function(error) {
      context.commit('setAddressErrors', error.response.data.errors);
    });
  },

  proceedToPaymentState(context, { 'number': orderNumber, 'deliveryData': deliveryData }) {
    axios.put('/api/ams/checkouts/' + orderNumber, deliveryData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setPaymentStateData', response.data);
      context.dispatch('fetchUserCurrentOrders');
    }).catch(function (error) {
    });
  },

  proceedToConfirmState(context, { 'number': orderNumber, 'paymentData': paymentData }) {
    axios.put('/api/ams/checkouts/' + orderNumber, paymentData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setConfirmStateData', response.data);
      context.dispatch('fetchUserCurrentOrders');
    }).catch(function (error) {
    });
  },

  deleteLineItem(context, { 'number': number, 'lineItemId': lineItemId }) {
    return new Promise(function (resolve, reject) {
      axios.delete('/api/v1/orders/' + number + '/line_items/' + lineItemId, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
        context.dispatch('fetchUserCurrentOrders').then(function () {
          resolve();
        });
      });      
    })
  },

  fetchCountries(context) {
    axios.get('/api/ams/countries').then(function (response) {
      context.commit('setCountries', response.data);
    });
  },

  fetchStates(context, countryId) {
    axios.get('/api/v1/countries/' + countryId + '/states').then(function(response) {
      context.commit('setStates', response.data);
    });
  },

  fetchUserDetails(context) {
    axios.get('/api/v1/users/' + localStorage.getItem('userTokenId'), { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setUserDetails', response.data);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
