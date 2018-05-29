import Vue from 'vue'
import './plugins/vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
// import BootstrapVue from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
 
// Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
