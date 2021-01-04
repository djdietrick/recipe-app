import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../components/recipes/Recipes.vue'
import Lists from '../components/lists/Lists.vue'
import Auth from '../views/Auth.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'recipes',
        component: Recipes
      },
      {
        path: 'lists',
        component: Lists
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'Auth' && !store.state.user) {
    next({name: 'Auth'})
  } else next()
})

export default router
