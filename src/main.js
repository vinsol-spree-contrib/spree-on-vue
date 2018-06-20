import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router.js';
import store from './store/store';

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
