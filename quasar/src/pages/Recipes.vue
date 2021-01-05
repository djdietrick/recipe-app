<template>
    <q-layout view="lHh lpR fFf" class="recipes">
        <q-header></q-header>
        <q-drawer show-if-above side="left" bordered>
            <q-scroll-area class="fit">
                <q-list bordered separator>
                    <q-item clickable v-ripple v-for="recipe in recipes" :key="recipe.id"
                        :active="selectedRecipe.id === recipe.id" active-class="bg-blue-7 text-white"
                        @click="selectedRecipe = recipe">
                        <q-item-section>{{recipe.title}}</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            test
        </q-page-container>
    </q-layout>
</template>

<script>
import RecipeList from '../components/recipes/RecipeList.vue';
import RecipeDetails from '../components/recipes/RecipeDetails.vue';
import {mapGetters} from 'vuex'

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
    computed: {
        ...mapGetters({
            recipes: 'getRecipes'
        })
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
