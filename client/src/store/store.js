// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state :{
        auth: {
            token: null,
            login_show: true,
            signup_show: false
        }
    },
    mutations: {
        show_signup (state, value) {
            state.auth.signup_show = !!value;
            state.auth.login_show = !!!value;
        }
      }
});