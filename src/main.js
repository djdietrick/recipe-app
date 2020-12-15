import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

const DashVue = require('dash-vue');
import 'dash-vue/dist/dash-vue.css';

Vue.use(DashVue);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "dash-website-1b9cb.firebaseapp.com",
  databaseURL: "https://dash-website-1b9cb.firebaseio.com",
  projectId: "dash-website-1b9cb",
  storageBucket: "dash-website-1b9cb.appspot.com",
  messagingSenderId: process.env.VUE_APP_MESSENGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
});

export const functions = firebase.functions();
export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
