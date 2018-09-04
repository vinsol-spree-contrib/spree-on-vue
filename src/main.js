import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import Toasted from 'vue-toasted';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router.js';
import store from './store/store';

Vue.use(Toasted);
Vue.use(ElementUI);

const options = {
  type: 'success',
  position: 'bottom-right',
  duration: 10000,
  action: {
    text: 'X',
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  },
}

Vue.config.productionTip = false;

// axios.defaults.baseURL = 'https://enigmatic-inlet-91726.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
