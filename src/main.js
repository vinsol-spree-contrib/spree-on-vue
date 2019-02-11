import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router.js';
import store from './store/store';

Vue.use(ElementUI);

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
