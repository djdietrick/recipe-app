<template>
    <div class="recipes__list">
        <q-toolbar class="q-pa-md recipes__list__toolbar">
            <q-input dense outlined clearable placeholder="Search" v-model="search"></q-input>
            <q-space></q-space>
            <q-btn round color="primary" icon="control_point" size="sm" @click="$emit('add-recipe')" />
        </q-toolbar>
        <div class="recipes__list__container">
            <!-- <q-scroll-area class="fit"> -->
            <q-list bordered separator>
                <q-item clickable v-ripple v-for="recipe in filteredRecipes" :key="recipe.id"
                    :active="isSelected(recipe.id)" active-class="bg-blue-7 text-white"
                    @click="setRecipe(recipe)">
                    <q-item-section>{{recipe.title}}</q-item-section>
                </q-item>
            </q-list>
        <!-- </q-scroll-area> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex';
export default {
    props: {
        recipes: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            selectedRecipe: null,
            search: null
        }
    },
    methods: {
        setRecipe(recipe) {
            this.selectedRecipe = recipe;
            this.$emit('selected-recipe', recipe);
        },
        isSelected(id) {
            return id === this.$route.params.id;
        }
    },
    computed: {
        filteredRecipes() {
            if(!this.search || this.search.length === 0) return this.recipes;
            return this.recipes.filter(recipe => {
                for(let ingredient of recipe.ingredients) {
                    if(ingredient.name.indexOf(this.search) >= 0)
                        return true;
                }
                return recipe.title.toLowerCase().indexOf(this.search) >= 0;
            })
        }
    }
}
</script>

<style lang="scss">

.recipes__list__container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

</style>
