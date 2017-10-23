import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloChris from '@/components/HelloChris'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/poll/:poll_slug',
      name: 'Poll',
      component: HelloChris
    }
  ]
})
