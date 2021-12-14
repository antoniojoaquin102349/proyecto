import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import './assets/main.css'
import './modules/firebase'
import VueFirestore from 'vue-firestore' 
import Buefy from 'buefy'
import { Table, Input } from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Table)
Vue.use(Input)
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.use(VueFirestore)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
