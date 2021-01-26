<template>
    <q-drawer show-if-above bordered class="recipes__list">
        <q-toolbar class="q-pa-md recipes__list__toolbar">
            <q-input dense outlined placeholder="Search"></q-input>
            <q-space></q-space>
            <q-btn round color="primary" icon="control_point" size="sm" @click="$emit('add-recipe')" />
        </q-toolbar>
        <q-scroll-area class="fit recipes__list__container">
            <q-list bordered separator>
                <q-item clickable v-ripple v-for="recipe in recipes" :key="recipe.id"
                    :active="isSelected(recipe.id)" active-class="bg-blue-7 text-white"
                    @click="setRecipe(recipe)">
                    <q-item-section>{{recipe.title}}</q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
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
            selectedRecipe: null
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
    }
}
</script>

<style lang="scss">

.list {
    background-color: $deep-purple-3;
    height: 100%;
    display: grid;
    grid-template-rows: 4rem 1fr;
    grid-gap: 2rem;

    &__container {
        overflow-y: auto;
    }

    &__header {
        padding: 0.5rem 2rem;
        position: relative;
        // &__title {
        //     @extend h2;
        // }
        &__add {
            position: absolute;
            top: 1.5rem;
            right: 3rem;
        }
    }

    &__item {
        padding: 1rem 2rem;
        margin: 0.5rem 0.25rem;
        transition: 0.2s ease-in-out;
        cursor: pointer;
        width: auto;
        border-radius: 1rem;

        &:hover {
            //background-color: rgba($color-tertiary, 0.35);
        }
        &--selected {
            //background-color: $color-white;
        }
        
        &__text {
            font-size: 1.4rem;
        }
    }
}

.selected {
    //background-color: rgba($color-tertiary, 0.7);
}

</style>
