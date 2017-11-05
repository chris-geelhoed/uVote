import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Poll from '@/components/Poll'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/poll/:id',
      name: 'Poll',
      component: Poll
    }
  ]
})
