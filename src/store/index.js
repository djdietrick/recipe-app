import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import recipes from './modules/recipes';
import lists from './modules/lists';

import VuePwaInstallPlugin from 'vue-pwa-install';

Vue.use(Vuex)
Vue.use(VuePwaInstallPlugin);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import {v4 as uuidv4} from 'uuid';
import { db } from 'src/services/firebase';

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
      ...auth.actions,
      async submitFeedback({}, feedback) {
        let f = {
          id: uuidv4(),
          message: feedback,
          read: false
        }

        await db().collection('feedback').doc(f.id).set(f);
      }
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
