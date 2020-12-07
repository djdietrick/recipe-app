<template>
    <div class="details">
        <div v-if="!recipe.title">
            <div class="details__placeholder">Select a recipe</div>
        </div>
        <div class="details__container" v-else>
            <div class="details__title">
                <dash-text-toggle-input placeholder="Title" v-bind:value.sync="recipe.title" />
            </div>
            <div class="details__ingredients">
                <h2 class="details__ingredients__title">Ingredients</h2>
                <div class="details__ingredients__list">
                    <Ingredient v-for="ingredient in recipe.ingredients" :key="ingredient.name" :ingredient="ingredient" :editing="editing"/>
                    <Ingredient v-bind:ingredient.sync="newIngredient" :editing="editing"/>
                </div>
            </div>
            <div class="details__directions">
                <h2 class="details__directions__title">Directions</h2>
            </div>
            <div class="details__togglebtn btn" @click="editing = !editing"
                :class="{editing: editing}">
                {{editing ? 'Save' : 'Edit'}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
const Qty = require('js-quantities');
import Ingredient from './Ingredient.vue';

export default Vue.extend({
    props: {
        recipe: {
            type: Object,
            default: {
                title: '',
                ingredients: []
            }
        }
    },
    components: {
        Ingredient
    },
    data() {
        return {
            newIngredient: {
                name: '',
                qty: '',
                unit: ''
            },
            editing: false
        }
    },
    watch: {
        newIngredient: {
            handler(i) {
                if(i.name !== '' && i.qty !== '') {
                    this.recipe.ingredients.push({
                        ...this.newIngredient,
                        qty: parseInt(this.newIngredient.qty)
                    });
                    this.newIngredient = {
                        name: '',
                        qty: '',
                        unit: ''
                    };
                }
            },
            deep: true
        }
    },
    created() {
        console.log(Qty.getKinds())
        console.log(Qty.getUnits('mass'))
    }
})
</script>

<style lang="scss">
@import '../../styles/main.scss';

.details {
    position: relative;
    padding: 2rem; 
    overflow: auto;

    &__container {
        display: grid;
        position: relative;
        grid-template-rows: 10rem minmax(20rem, 1fr) minmax(min-content,1fr);
        grid-gap: 1rem;
        height: 100%;
        width: 100%;
    }
    
    &__placeholder {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba($color-black, 0.2);
        font-size: 5rem;
    }

    &__title {
        @extend h1;
        margin-bottom: 1rem;
        border-bottom: 2px solid $color-grey-dark-2;
    }

    &__ingredients {
        border-bottom: 2px solid $color-grey-dark-2;


        &__list {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
    }

    .ingredient {
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }

    &__togglebtn {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background-color: $color-grey-dark-1 !important;
    }
    &__togglebtn.editing {
        background-color: $color-primary !important;
    }
}

</style>

