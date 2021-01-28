<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header elevated>
      <q-toolbar>
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <q-btn v-if="!back" key="notBack" flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn v-if="back" key="back" flat @click="$router.go(-1)" round dense icon="arrow_back_ios" />
        </transition>
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
            <q-item-section @click="navTo('/recipes')">
              Recipes
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-icon name="receipt_long" />
            </q-item-section>
            <q-item-section @click="navTo('/lists')">
              Lists
            </q-item-section>
          </q-item>

          <q-space />

          <q-item clickable>
            <q-item-section>
              <q-icon name="model_training" />
            </q-item-section>
            <q-item-section @click="toggleDark">
              Switch to {{dark ? 'Light Mode' : 'Dark Mode'}}
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-icon name="feedback" />
            </q-item-section>
            <q-item-section @click="feedback">
              Submit Feedback :)
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
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'MainLayout',
  data () {
    return {
      selectedComponent: 'recipes',
      drawer: false
    }
  },
  watch: {
    dark: function(val) {
      this.$q.dark.set(val);
    }
  },
  methods: {
    ...mapActions(['logout', 'toggleDark', 'submitFeedback']),
    async onLogout() {
      await this.logout();
      this.$router.push('/auth');
    },
    navTo(url) {
      this.$router.push(url).catch(e => {})
    },
    feedback() {
      this.$q.dialog({
        title: 'Feedback',
        message: 'Any feedback is helpful! What do you like? What do you hate?',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true
      }).onOk(data => {
        this.submitFeedback(data);
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      dark: 'getDark'
    }),
    back() {
      if(this.$route.params.id && window.matchMedia('(max-width: 767px)').matches) 
        return true;
      return false;
    }
  },
  created() {
    this.$q.dark.set(this.user.dark);
  }
}
</script>

<style lang="scss">

</style>
