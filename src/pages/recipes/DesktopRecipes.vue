<template>
    <q-layout container view="lHh lpR fFf" class="recipes--desktop">
        <q-drawer v-model="drawer" bordered class="recipes__list">
            <RecipeList :recipes="recipes" @selected-recipe="setRecipe" 
                @add-recipe="addRecipeAndFocus"/>
        </q-drawer>

        <q-page-container>
            <RecipeDetails v-if="$route.params.id" :id="$route.params.id" :key="$route.params.id" />
            <NoRecipe v-else />
        </q-page-container>
    </q-layout>
</template>

<script>
import RecipeList from '../../components/recipes/RecipeList.vue';
import RecipeDetails from '../../components/recipes/RecipeDetails.vue';
import NoRecipe from '../../components/recipes/NoRecipe.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
    components: {
        RecipeList,
        RecipeDetails,
        NoRecipe
    },
    data() {
        return {
            selectedRecipe: {},
            drawer: true
        }
    },
    computed: {
        ...mapGetters({
            recipes: 'getRecipes'
        })
    },
    methods: {
        ...mapActions(['fetchRecipes', 'addRecipe']),
        setRecipe(recipe) {
            this.selectedRecipe = recipe;
        },
        isSelected(id) {
            return id === this.$route.params.id;
        },
        addRecipeAndFocus() {
            this.addRecipe().then(id => {
                this.$router.push({
                    params: {id}
                })
            })
        }
    },
    watch: {
        selectedRecipe: function(recipe) {
            if(recipe.id) this.$router.push({
                params: { id: recipe.id}
            });
        }
    },
    created() {
        this.fetchRecipes();
    }
}
</script>

<style lang="scss">

.recipes--desktop {
    height: 93vh;
    width: 98vw;
}

.q-layout--containerized {
    height: 93vh;
}

</style>
