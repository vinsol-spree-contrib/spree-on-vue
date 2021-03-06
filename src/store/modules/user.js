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
  addressErrors: {},
  cardErrors: "",
  countries: "",
  states: "",
  userDetails: {},
  deliveryStateData: {},
  paymentStateData: {},
  confirmStateData: {},
  defaultPaymentMethodId: ''
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

  getDefaultPaymentMethodId(state) {
    return state.defaultPaymentMethodId;
  },

  getCardErrors(state) {
    return state.cardErrors;
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

  setAddressErrors(state, error) {
    state.addressErrors = error;
  },

  setCardErrors(state, error) {
    state.cardErrors = error;
  },

  setCountries(state, countries) {
    state.countries = countries;
  },

  setStates(state, states) {
    state.states = states;
  },

  setUserDetails(state, details) {
    state.userDetails = details;
  },

  setDefaultPaymentMethodId(state, id) {
    state.defaultPaymentMethodId = id;
  }
};

const actions = {
  fetchUser(context) {
    axios.get('/api/ams/users/', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setLogedInUser', response.data.users[0]);
    });
  },

  /* Fetches the completed orders */
  fetchUserOrders(context) {
    //var loading = Loading.service({ fullscreen: true });
    return axios.get('/api/ams/orders/mine', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setAllOrders', response.data);
      //loading.close();
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
    return axios.get('/api/ams/orders/current', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      loading.close();
    });
  },

  proceedToDeliveryState(context, { 'number': orderNumber, 'addressData': addressData}) {
    var loading = Loading.service({ fullscreen: true });
    return axios.put('/api/ams/checkouts/' + orderNumber, addressData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken')  } }).then(function(response) {
      context.commit('setCartItems', response.data);
      context.commit('setAddressErrors', {});
      context.commit('setCardErrors', {});
      loading.close();
      Message({
        duration: 1250,
        message: 'Address details updated successfully.',
        showClose: true,
        type: 'success'
      });
    }).catch(function(error) {
      context.commit('setAddressErrors', error.response.data.errors);
      loading.close();
      if (error.response.data.errors.base.length > 0) {
        Message({
          duration: 1250,
          message: error.response.data.errors.base[0],
          showClose: true,
          type: 'error'
        });
      }
    });
  },

  proceedToPaymentState(context, { 'number': orderNumber, 'deliveryData': deliveryData }) {
    var loading = Loading.service({ fullscreen: true });
    return axios.put('/api/ams/checkouts/' + orderNumber, deliveryData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data)
      context.commit('setCardErrors', {});
      Message({
        duration: 1250,
        message: 'Shipment details updated successfully.',
        showClose: true,
        type: 'success'
      });
      loading.close();
    }).catch(function () {
      loading.close();
    })
  },

  proceedToConfirmState(context, { 'number': orderNumber, 'paymentData': paymentData }) {
    var loading = Loading.service({ fullscreen: true });
    return axios.put('/api/ams/checkouts/' + orderNumber, paymentData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      context.commit('setCardErrors', {});
      Message({
        duration: 1250,
        message: 'Payment details updated successfully.',
        showClose: true,
        type: 'success'
      });
    }).catch(function() {
      context.commit('setCardErrors', arguments[0].response.data.errors);
      Message({
        duration: 1250,
        message: arguments[0].response.data.error,
        showClose: true,
        type: 'error'
      });
    }).then(function () {
      loading.close();
    });
  },

  completeOrder(context, orderNumber) {
    var loading = Loading.service({ fullscreen: true });
    return axios.put('/api/ams/checkouts/' + orderNumber, {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
      loading.close();
    }).catch(function(error) {
      loading.close();
      Message({
        duration: 1250,
        message: error.response.data.errors.base[0],
        showClose: true,
        type: 'error'
      });
    });
  },

  setCheckoutState(context, { 'number': orderNumber, 'stateData': state}) {
    var loading = Loading.service({ fullscreen: true });
    if (context.getters.getCartItems.order && (context.getters.getCartItems.order.state !== "cart" && context.getters.getCartItems.order.state !== "complete")) {
      axios.put('/api/ams/checkouts/' + orderNumber + '/back_to_state', state, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function(response) {
        context.commit('setCartItems', response.data);
        loading.close();
      });
    } else {
      loading.close();
    }
  },

  fetchCountries(context) {
    axios.get('/api/ams/countries').then(function (response) {
      context.commit('setCountries', response.data);
    });
  },

  fetchUserDetails(context) {
    return axios.get('/api/v1/users/' + localStorage.getItem('userTokenId'), { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
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
