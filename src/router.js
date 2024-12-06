import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home.vue'
import Refresh from './components/Refresh.vue'
import Return from './components/Return.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/refresh/:account',
      name: 'refresh',
      component: Refresh
    },
    {
      path: '/return/:account',
      name: 'return',
      component: Return
    },
  ]
})