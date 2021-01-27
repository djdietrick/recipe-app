<template>
    <div class="recipes--mobile">
        <transition mode="out-in" :duration="150"
            :enter-active-class="$route.params.id ? 'animated slideInRight' : 'animated slideInLeft'" 
            :leave-active-class="$route.params.id ? 'animated slideOutLeft' : 'animated slideOutRight'" >
            <RecipeList v-if="!$route.params.id" :recipes="recipes" @selected-recipe="setRecipe" 
                @add-recipe="addRecipeAndFocus" key="list"/>
            <RecipeDetails v-if="$route.params.id" :id="$route.params.id" key="details"/>
        </transition>
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

<style lang="scss">
    
</style>