import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../components/Admin'
import Auth from '../components/Login'
import Signup from '../components/Signup'
import Election from '../components/Election'
import store from '../store/store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
      next()
      return
    }
    next('/')
  }
  
  const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  }

export default new Router({ 
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Election',
            component: Election
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Auth,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
            beforeEnter: ifNotAuthenticated
        }
    ]
})