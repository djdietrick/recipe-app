<template>

<div>
  <q-toolbar>
    <q-toolbar-title>
      Recipe Keeper
    </q-toolbar-title>

    <q-tabs v-model="selectedComponent">
      <q-tab name="recipes" label="Recipes"></q-tab>
      <q-tab name="lists" label="Lists"></q-tab>
    </q-tabs>

  </q-toolbar>
  <component :is="selectedComponent"></component>
</div>
  <!-- <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
    <q-toolbar-title>
      Recipe Keeper
    </q-toolbar-title>

    <q-tabs v-model="selectedComponent">
      <q-tab name="recipes" label="Recipes"></q-tab>
      <q-tab name="lists" label="Lists"></q-tab>
    </q-tabs>

  </q-toolbar>
    </q-header>

    <q-page-container>
      <component :is="selectedComponent"></component>
    </q-page-container>
  </q-layout> -->
</template>

<script>
import Recipes from '../pages/Recipes.vue';
import Lists from '../pages/Lists.vue';

export default {
  name: 'MainLayout',
  data () {
    return {
      selectedComponent: 'recipes'
    }
  },
  components: {
    'recipes': Recipes,
    'lists': Lists
  }
}
</script>
