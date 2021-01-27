<template>
    <div class="recipes--mobile">
        <RecipeList v-if="!$route.params.id" :recipes="recipes" @selected-recipe="setRecipe" 
            @add-recipe="addRecipeAndFocus"/>
        <RecipeDetails v-else :id="$route.params.id" />
    </div>
</template>

<script>
import RecipeList from '../../components/recipes/RecipeList.vue';
import RecipeDetails from '../../components/recipes/RecipeDetails.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
    components: {
        RecipeList,
        RecipeDetails
    },
    computed: {
        ...mapGetters({
            recipes: 'getRecipes'
        })
    },
    methods: {
        ...mapActions(['fetchRecipes', 'addRecipe']),
        setRecipe(recipe) {
            this.$router.push({
                params: {id: recipe.id}
            })
        },
        addRecipeAndFocus() {
            this.addRecipe().then(id => {
                this.$router.push({
                    params: {id}
                })
            })
        }
    },
    created() {
        this.fetchRecipes();
    }
}
</script>