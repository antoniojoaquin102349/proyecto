import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import CrearGrupo from '../views/CrearGrupo.vue'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reset-password',
    name: 'reset_password',
    component: ResetPassword
  },
  {
    path: '/crear-grupo',
    name: 'crear-grupo',
    component: CrearGrupo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
