<template>
    <div class="recipes">
        <RecipeList />
        <RecipeDetails />
    </div> 
</template>

<script>
import RecipeList from './RecipeList.vue';
import RecipeDetails from './RecipeDetails.vue';

export default {
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
        setRecipe(recipe) {
            this.selectedRecipe = recipe;
        }
    }
}
</script>

<style lang="scss">
.recipes {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
    width: 100%;
}
</style>
