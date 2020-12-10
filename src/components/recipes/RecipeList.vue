<template>
    <div class="list">
        <div class="list__item" v-for="(item, i) in list" :key="i"
            @click="selectedRecipe = item"
            :class="{ selected: selectedRecipe && selectedRecipe.title === item.title}">
            <div class="list__item__text">{{item.title}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        list: {
            type: Array,
            default() {
                return [
                    {
                        title: 'Recipe',
                        ingredients: [
                            {
                                name: 'butter',
                                qty: 1,
                                unit: 'cup'
                            },
                            {
                                name: 'eggs',
                                qty: 2,
                                unit: ''
                            },
                            {
                                name: 'milk',
                                qty: '1',
                                unit: 'cup'
                            }
                        ],
                        directions: ['test']
                    },
                    {
                        title: 'Recipe2'
                    },
                    {
                        title: 'Recipe3'
                    },
                    {
                        title: 'Recipe4'
                    },
                    {
                        title: 'Recipe5'
                    }
                ]
            } 
        }
    },
    watch: {
        selectedRecipe: function(recipe) {
            if(recipe) this.$emit('selected-recipe', recipe);
        }
    },
    data() {
        return {
            selectedRecipe: {}
        }
    },
    created() {
        // if(this.list.length != 0) {
        //     this.selectedRecipe = this.list[0] as Object
        // }
    }
})
</script>

<style lang="scss">
@import '../../styles/main.scss';

.list {
    background-color: $color-grey-light-2;
    height: 100%;

    &__item {
        padding: 1rem 2rem;
        margin: 0.5rem 0.25rem;
        transition: 0.2s ease-in-out;
        cursor: pointer;
        width: auto;
        border-radius: 1rem;

        &:hover {
            background-color: rgba($color-tertiary, 0.35);
        }
        &--selected {
            background-color: $color-white;
        }
        
        &__text {
            font-size: 1.4rem;
        }
    }
}

.selected {
    background-color: rgba($color-tertiary, 0.7);
}

</style>
