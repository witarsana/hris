import Vue from 'vue'
import Vuex from 'vuex'
import {getLocalUser} from '../helpers/auth'
import {getLocalCompany} from '../helpers/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        curentCompany : getLocalCompany(),
        curentUser : getLocalUser()
    },
    getters : {
        curentUser(state){
            return state.curentUser;
        },
        curentCompany(state){
            return state.curentCompany;
        }
    },
    mutations: {

    },
    actions: {
        logout(state){
            state.curentUser = null;
            state.curentCompany = null
            localStorage.removeItem('user');
            localStorage.removeItem('company');
        }
    },
    modules: {
    }
  })