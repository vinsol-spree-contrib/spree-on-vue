import axios from 'axios';
import routes from '../../router.js';

const state = {
  activeSessionTime: 3600,
  user: null,
  userId: null,
  userToken: null,
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

  clearAuthData(state) {
    state.userId = null;
    state.userToken = null;
    state.sessionTime = null;
  },

  clearAuthErrors(state) {
    state.errors = {};
    state.loginErrors = {};
  }
};

const actions = {
  setLogoutTimer(context, expirationTime) {
    setTimeout(function () {
      context.dispatch('logout');
    }, expirationTime * 1000);
  },

  signup(context, authData) {
    axios.post('api/ams/users/', {
      user: {
        email: authData.email,
        password: authData.password,
        password_confirmation: authData.password_confirmation
      }
    }).then(function () {
      context.dispatch('login', authData);
    }).catch(function (error) {
      context.commit('setErrors', error.response.data.errors);
    });
  },

  login(context, authData) {
    axios.post('api/ams/users/token', {
      user: {
        email: authData.email,
        password: authData.password
      }
    }).then(function (response) {
      context.commit('setUser', response.data);
      context.commit('authUserId', response.data.email);
      context.commit('authUserToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = state.user.token;
      const now = new Date();
      const expirationTime = new Date(now.getTime() + state.activeSessionTime * 1000);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userId', response.data.email);
      localStorage.setItem('expirationTime', expirationTime);
      context.commit('setSessionTime', expirationTime);
      context.dispatch('setLogoutTimer', state.activeSessionTime);
      context.commit('clearAuthErrors');
      context.dispatch('fetchUserCurrentOrders', { root: true });
      routes.replace('/profile');
    }).catch(function (error) {
      context.commit('setLoginErrors', error.response.data.errors);
    });
  },

  tryAutoLogin(context) {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');
    const userProfileId = localStorage.getItem('userProfileId');
    if (!userToken) {
      return;
    }

    const expirationTime = localStorage.getItem('expirationTime');
    const now = new Date();
    if (now >= expirationTime) {
      return;
    }

    context.commit('authUserId', userId);
    context.commit('authUserToken', userToken);
    context.commit('setSessionTime', expirationTime);
  },

  logout(context) {
    context.commit('clearAuthData');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    routes.replace('/entry');
    context.rootState.user.cartItems = {};
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
