import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

//Auth
const Login = () => import('@/views/hAuth/Login')
const Logout = () => import('@/views/hAuth/Logout')
const User = () => import('@/views/users/Users')

//BPJS RATES
const BpjsRateList = () => import('@/views/hBpjsRates/List')

//PTKP STATUS 
const PtkpStatusList = () => import('@/views/hPtkpStatus/List')

//TRAINING TYPE
const TrainingType = () => import('@/views/hTrainingType/List')

//NATIONAL HOLIDAY
const NationalHoliday = () => import('@/views/hNationalHoliday/List')

//SALARY MASTER DATA
const SalaryMasterData = () => import('@/views/hSalaryMasterData/List')

//EMPLOYEE TYPE
const EmployeeType = () => import('@/views/hEmployeeType/List')

//ORGANZATION MASTER DATA
const OrganizationMasterData = () => import ('@/views/hOrganizationMasterData/List')

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
          meta: { label: 'BPJS Rates'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: BpjsRateList,
            },
            {
              path: ':id',
              meta: { label: 'BPJS Rate Details'},
              name: 'bpjsrate',
              component: User,
            },
          ]
        },
        {
          path: '/ptkp-status',
          meta: { label: 'PTKP Status'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: PtkpStatusList,
            },
            {
              path: ':id',
              meta: { label: 'PTKP Status Details'},
              name: 'ptkpstatus',
              component: User,
            },
          ]
        },
        {
          path: '/training-type',
          meta: { label: 'Training Type'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: TrainingType,
            }
          ]
        },
        {
          path: '/national-holiday',
          meta: { label: 'National Holiday'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: NationalHoliday,
            }
          ]
        },
        {
          path: '/salary-master-data',
          meta: { label: 'Salary Master Data'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: SalaryMasterData,
            }
          ]
        },
        {
          path: '/employee-type',
          meta: { label: 'EmployeeType'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: EmployeeType,
            }
          ]
        },
        {
          path: '/organization-master-data',
          meta: { label: 'Organization Master Data'},         
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: OrganizationMasterData,
            }
          ]
        },
      ]
    }
  ]
}

