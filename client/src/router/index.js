import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/Login'
import Signup from '../components/Signup'
import Election from '../components/Election'
// Start Admin 
import Admin from '../components/Admin'
import admin_candidate from '../components/admin/admin_candidate'
import admin_election from '../components/admin/admin_election'
import admin_electorate from '../components/admin/admin_electorate'
// End Admin
import store from '../store'
Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/admin')
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
  routes: [{
      path: '/',
      name: 'Election',
      component: Election
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: ifAuthenticated,
      redirect: to => ({
        name: 'election',
        params: {
          section: 'election'
        }
      }),
      children: [{

          path: 'candidate',
          component: admin_candidate,
          beforeEnter: ifAuthenticated
        },
        {
          name: 'election',
          path: 'election',
          component: admin_election,
          beforeEnter: ifAuthenticated
        },
        {
          path: 'electorate',
          component: admin_electorate,
          beforeEnter: ifAuthenticated
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: ifAuthenticated
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
