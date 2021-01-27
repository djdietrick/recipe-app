<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Home from './views/Home.vue';
import Auth from './views/Auth.vue';
import {mapGetters} from 'vuex';
export default {
  components: {
    home: Home,
    auth: Auth
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    selectedComponent() {
      if(this.user) {
        return "home";
      } else {
        return "auth";
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/main.scss';

</style>
