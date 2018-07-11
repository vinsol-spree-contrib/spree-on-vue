import Vue from 'vue';
import axios from 'axios';

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
    axios.get('/api/ams/orders/mine', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setAllOrders', response.data);
    }).catch(function (error) {
    });
  },

  fetchSingleOrder(context, id) {
    context.commit('setSingleOrder', null);
    axios.get('api/ams/orders/' + id, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setSingleOrder', response.data);
    });
  },

  /* Fetches the current orders in cart */
  fetchUserCurrentOrders(context) {
    axios.get('/api/ams/orders/current', { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function (response) {
      context.commit('setCartItems', response.data);
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
      Vue.toasted.show('Added to basket', {
        position: 'bottom-right',
        type: 'success',
        duration: 3000,
        theme: 'outline'
      });
      
    }).catch(function(error) {
      context.commit('setCartErrors', error.response.data.exception);
      context.dispatch('showMessage', {
        message: error.response.data.exception,
        type: 'error'
      })
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
        Vue.toasted.show('Cart is empty', {
          position: 'bottom-right',
          type: 'success',
          duration: 3000
        });
    });
  },

  proceedToAddressState(context, orderId) {
    axios.put('/api/ams/checkouts/' + orderId + '/next', {}, { headers: { 'X-Spree-Token': localStorage.getItem('userToken') } }).then(function(response) {
      console.log(response.data);
      context.dispatch('fetchUserCurrentOrders');
    })
  },

  proceedToDeliveryState(context, { 'number': orderNumber, 'addressData': addressData}) {
    axios.put('/api/ams/checkouts/' + orderNumber, addressData, { headers: { 'X-Spree-Token': localStorage.getItem('userToken')  } }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      context.commit('setAddressErrors', error.response.data.errors);
      console.log(error.response.data.errors);
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
