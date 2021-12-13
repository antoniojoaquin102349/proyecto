import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './modules/firebase'
import VueFirestore from 'vue-firestore' 
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

//le decimos a VUE que use vue-firestore
Vue.use(VueFirestore)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
