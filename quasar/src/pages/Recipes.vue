<template>
    <q-layout container view="lHh lpR fFf" class="recipes">
        <q-drawer show-if-above bordered class="recipes__list">
            <q-toolbar class="q-pa-md recipes__list__toolbar">
                <q-input dense outlined placeholder="Search"></q-input>
                <q-space></q-space>
                <q-btn round color="primary" icon="control_point" size="sm" @click="addRecipeAndFocus" />
            </q-toolbar>
            <q-scroll-area class="fit recipes__list__container">
                <q-list bordered separator>
                    <q-item clickable v-ripple v-for="recipe in recipes" :key="recipe.id"
                        :active="isSelected(recipe.id)" active-class="bg-blue-7 text-white"
                        @click="selectedRecipe = recipe">
                        <q-item-section>{{recipe.title}}</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view :key="$route.fullPath"/>
        </q-page-container>
    </q-layout>
</template>

<script>
import RecipeList from '../components/recipes/RecipeList.vue';
import RecipeDetails from '../components/recipes/RecipeDetails.vue';
import {mapGetters, mapActions} from 'vuex'

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
                    name: 'RecipeDetails',
                    params: {id}
                })
            })
        }
    },
    watch: {
        selectedRecipe: function(recipe) {
            if(recipe.id) this.$router.push({
                name: 'RecipeDetails',
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

.recipes {
    height: 93vh;
    width: 98vw;
}

</style>
