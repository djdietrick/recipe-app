import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import recipes from './modules/recipes';
import lists from './modules/lists';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...auth.state
  },
  getters: {
    ...auth.getters
  },
  mutations: {
    ...auth.mutations
  },
  actions: {
    ...auth.actions
  },
  modules: {
    recipes,
    lists
  },
  plugins: [
    createPersistedState({
      key: process.env.VUE_APP_LOCAL_STORAGE_NAME
    })
  ]
})
