<template>
  <div class="home">
    <Nav />
    <Recipes />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue';
import Recipes from '../components/recipes/Recipes.vue';

export default {
  name: 'Home',
  components: {
    Nav,
    Recipes
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 20% 1fr;
  height: 100vh;
  width: 100vw;
}
</style>

