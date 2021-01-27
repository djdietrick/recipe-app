<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>
          Recipe Keeper
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        :width="200"
        elevated
        content-class="bg-primary text-white"
      >
        <q-list>
          <q-item clickable class="q-mt-xl">
            <q-item-section>
              <q-icon name="local_dining" />
            </q-item-section>
            <q-item-section @click="$router.push('/recipes')">
              Recipes
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-icon name="receipt_long" />
            </q-item-section>
            <q-item-section>
              Lists
            </q-item-section>
          </q-item>

          <q-space />

          <q-item clickable>
            <q-item-section>
              <q-icon name="model_training" />
            </q-item-section>
            <q-item-section @click="dark = !dark">
              Switch to {{dark ? 'Light Mode' : 'Dark Mode'}}
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-icon name="exit_to_app" />
            </q-item-section>
            <q-item-section @click="onLogout">
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

    <q-page-container>
      <!-- <q-page>
      <component :is="selectedComponent"></component>
      </q-page> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Recipes from '../pages/Recipes.vue';
import Lists from '../pages/Lists.vue';
import {mapActions} from 'vuex';

export default {
  name: 'MainLayout',
  data () {
    return {
      selectedComponent: 'recipes',
      drawer: false,
      dark: false
    }
  },
  components: {
    'recipes': Recipes,
    'lists': Lists
  },
  watch: {
    dark: function(val) {
      this.$q.dark.set(val);
    }
  },
  methods: {
    ...mapActions(['logout']),
    async onLogout() {
      await this.logout();
      this.$router.push('/auth');
    }
  }
}
</script>

<style lang="scss">

</style>
