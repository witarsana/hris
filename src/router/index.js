import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

//Auth
const Login = () => import('@/views/hAuth/Login')
const Logout = () => import('@/views/hAuth/Logout')
const Users = () => import('@/views/users/Users')

//BPJS RATES
const BpjsRateList = () => import('@/views/hBpjsRates/List')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/login',
      name: 'login',
      component: Login,      
    },
    
    {
      path: '/logout',
      name: 'logout',
      component: Logout, 
      meta : {requiresAuth : "true"},
          
    },
    {
      path: '/home',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta : {requiresAuth : "true"},
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/bpjs-rates',
          name: 'BPJS Rates',
          component: BpjsRateList
        }
 
      ]
    }
  ]
}

