<template>
    <div class="recipes">
        <RecipeList :selectedRecipe="selectedRecipe" v-on:selected-recipe="setRecipe"/>
        <RecipeDetails :recipe="selectedRecipe"/>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import RecipeList from './RecipeList.vue';
import RecipeDetails from './RecipeDetails.vue';

export default Vue.extend({
    components: {
        RecipeList,
        RecipeDetails
    },
    data() {
        return {
            selectedRecipe: {}
        }
    },
    methods: {
        setRecipe(recipe: Object) {
            this.selectedRecipe = recipe;
        }
    }
})
</script>

<style lang="scss">
.recipes {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
    width: 100%;
}
</style>
