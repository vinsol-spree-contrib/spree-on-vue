import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import store from './store/store';

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
