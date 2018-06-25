import axios from 'axios';

const state = {
  loggedInUser: null || {},
  mineOrders: {},
  singleOrder: {},
  cartItems: {
    line_items: []
  },
  cartErrors: ""
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
      context.commit('setCartItems', response.data);
      context.dispatch('fetchUserCurrentOrders');
    }).catch(function(error) {
      context.commit('setCartErrors', error.response.data.exception);
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
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
