import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // Make sure the path is correct

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
