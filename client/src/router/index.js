import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../components/Admin'
import Election from '../components/Election'

Vue.use(Router)

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
        component: Admin
    }
    ]
})