<template>
  <div class="home">
    <Nav />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue';
import Recipes from '../components/recipes/Recipes.vue';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    Nav,
    Recipes
  },
  methods: {
    ...mapActions(['fetchRecipes'])
  },
  created() {
    this.fetchRecipes();
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 15rem 1fr;
  height: 100vh;
  width: 100vw;
}
</style>

