import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import recipes from './modules/recipes';
import lists from './modules/lists';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
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
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
