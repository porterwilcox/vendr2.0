import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Vendr from './views/Vendr.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vendr',
      name: 'vendr',
      component: Vendr
  
}
  ]
})
