import axios from 'axios';
import routes from '../../router.js';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';

const state = {
  activeSessionTime: 36000,
  user: null,
  userId: null,
  userToken: null,
  userTokenId: null,
  sessionTime: null,
  errors: {},
  loginErrors: {}
};

const getters = {
  isAuthenticated(state) {
    return state.userToken !== null && new Date().getTime() < new Date(state.sessionTime).getTime();
  },

  getUserId(state) {
    return state.userId;
  },

  getErrors(state) {
    return state.errors;
  },

  getLoginErrors(state) {
    return state.loginErrors;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setErrors(state, errors) {
    state.errors = errors;
  },

  setLoginErrors(state, errors) {
    state.loginErrors = errors;
  },

  authUserId(state, userId) {
    state.userId = userId;
  },

  authUserToken(state, userToken) {
    state.userToken = userToken;
  },

  setSessionTime(state, time) {
    state.sessionTime = time;
  },

  setUserTokenId(state, id) {
    state.userTokenId = id;
  },

  clearAuthData(state) {
    state.userId = null;
    state.userToken = null;
    state.sessionTime = null;
    state.userTokenId = null;
  },

  clearAuthErrors(state) {
    state.errors = {};
    state.loginErrors = {};
  }
};

const actions = {
  clearAuthData(context) {
    context.commit('clearAuthErrors');
  },

  signup(context, authData) {
    axios.post('api/ams/users/', {
      user: {
        email: authData.email,
        password: authData.password,
        password_confirmation: authData.password_confirmation,
      }
    }).then(function () {
      context.dispatch('login', Object.assign(authData, {
        message: 'Account created successfully.'
      }));
    }).catch(function (error) {
      var loading = Loading.service({ fullscreen: true });
      context.commit('setErrors', error.response.data.errors);
      loading.close();
    });
  },

  login(context, authData) {
    var loading = Loading.service({ fullscreen: true });
    return axios.post('api/ams/users/token', {
      user: {
        email: authData.email.toLowerCase(),
        password: authData.password
      }
    }).then(function (response) {
        var _context = context;
        context.commit('setUser', response.data);
        context.commit('authUserId', response.data.email);
        context.commit('authUserToken', response.data.token);
        axios.defaults.headers.common['Authorization'] = state.user.token;
        const now = new Date();
        const expirationTime = new Date(now.getTime() + state.activeSessionTime * 1000);
        localStorage.setItem('userTokenId', response.data.id);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userId', response.data.email);
        localStorage.setItem('expirationTime', expirationTime);
        context.commit('setSessionTime', expirationTime);
        context.commit('clearAuthErrors');
        context.dispatch('fetchUserCurrentOrders', { root: true }).then(() => {
          const formData = {
            quantity: 1,
            variant_id: Number(localStorage.getItem('variantID')),
            message: 'Product added to Basket'
          };

          Message({
            duration: 2000,
            showClose: true,
            message: !!authData.message ? authData.message : 'Logged in successfully.',
            type: 'success'
          });

          loading.close();

          if(localStorage.getItem('variantID')) {
            _context.dispatch('addToCart', formData);
            routes.replace('/cart');
          } else {
            routes.replace('/');
          }
        });

    }).catch(function (error) {
      context.commit('setLoginErrors', error.response.data.errors);
      loading.close();
    });
  },

  tryAutoLogin(context) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    const userTokenId = localStorage.getItem('userTokenId');

    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    const now = new Date();

    if (now >= expirationTime) {
      context.dispatch('autoLogout');
    } else {
      context.commit('authUserId', userId);
      context.commit('authUserToken', userToken);
      context.commit('setSessionTime', expirationTime);
      context.commit('setUserTokenId', userTokenId);
    }
  },

  autoLogout(context) {
    context.dispatch('fetchUserCurrentOrders');
    localStorage.clear();
    context.commit('clearAuthData');
  },

  logout(context) {
    context.dispatch('autoLogout');
    routes.replace('/entry');
    Message({
      duration: 2000,
      showClose: true,
      message: 'Logged out successfully.',
      type: 'success'
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
