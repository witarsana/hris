import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import {initialize} from './helpers/general'


//font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import { faSave} from '@fortawesome/free-solid-svg-icons'
import { faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)
library.add(faTrashAlt)
library.add(faEye)
library.add(faPlusSquare)
library.add(faSave)
library.add(faWindowClose)
library.add(faInfoCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon)

//bootstrap vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

//vue toasted
import Toasted from 'vue-toasted'
Vue.use(Toasted)

/*--------------------------------*/
Vue.config.performance = true
Vue.use(CoreuiVue)

//middleware for router
initialize(store,router);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
})
