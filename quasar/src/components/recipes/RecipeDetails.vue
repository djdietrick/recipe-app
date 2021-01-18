<template>
    <div class="recipe__details q-px-lg">
        <div class="recipe__details__header row justify-between q-py-md">
            <q-input v-if="editing" v-model="recipe.title"></q-input>
            <h4 v-else class="q-my-sm">{{recipe.title}}</h4>

            <q-btn flat :ripple="false" icon="more_vert">
                <q-menu anchor="bottom right" self="top right">
                    <q-list dense>
                        <q-item clickable>
                            <q-item-section class="q-pa-md recipe__details__menu__item" @click="editing=!editing">
                                <q-icon name="edit" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable>
                            <q-item-section class="q-pa-md recipe__details__menu__item">
                                <q-icon name="delete" @click="deleteRecipe"/>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

        </div>

        <q-separator inset />

        <div class="recipe__details__ingredients q-my-md">
            <div class="row">
                <h5 class="q-my-md">Ingredients</h5>
                <q-btn flat v-if="editing" icon="add" class="q-ml-xl" @click="addBlankIngredient"/>
            </div>
            <div class="ingredient__container" v-for="(ingredient, i) in recipe.ingredients" :key="i">
                <Ingredient :ingredient="ingredient" :editing="editing"/>
                <q-btn flat clickable v-if="editing" icon="close" size="sm" class="ingredient__delete" @click="deleteIngredient(i)"/>
            </div>
        </div>

        <q-separator inset />

        <div class="recipe__details__directions">
            <div class="row">
                <h5 class="q-my-md">Directions</h5>
                <q-btn flat v-if="editing" icon="add" class="q-ml-xl" @click="addBlankDirection"/>
            </div>
            <div v-for="(direction, i) in recipe.directions" :key="i + direction" class="direction__container q-mb-sm">
                <Direction :key="i" :direction="direction" :i="i" @update:direction="recipe.directions[i] = $event" :editing="editing" />
                <q-btn flat clickable v-if="editing" icon="close" size="sm" class="ingredient__delete q-ml-sm" @click="deleteDirection(i)"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Ingredient from './Ingredient.vue';
import Direction from './Direction.vue';
export default {
    props: {
        id: {
            default: null
        }
    },
    data() {
        return {
            recipe: {},
            editing: false
        }
    },
    components: {
        Ingredient,
        Direction
    },
    methods: {
        ...mapActions(['updateRecipe', 'delRecipe', 'getRecipeWithId']),
        update() {
            if(this.id) {
                this.getRecipeWithId(this.id)
                .then(recipe => this.recipe = recipe);
            }
        },
        addBlankIngredient() {
            this.recipe.ingredients.push({
                name: '',
                qty: '',
                unit: ''
            })
        },
        deleteIngredient(i) {
            this.recipe.ingredients.splice(i, 1);
        },
        addBlankDirection() {
            this.recipe.directions.push('');
        },
        deleteDirection(i) {
            this.recipe.directions.splice(i, 1);
        },
        deleteRecipe() {
            this.$q.dialog({
                title: "Delete",
                message: "Are you sure?",
                ok: {
                    push: true,
                    color: 'negative'
                },
                cancel: {
                    push: true
                }
            }).onOk(() => {
                this.delRecipe(this.recipe.id);
            })
        }
    },
    watch: {
        id: function(id) {
            this.update();
        },
        editing: function(val) {
            // If value switches back to false
            if(!val) {
                this.updateRecipe(this.recipe);
            }
        }
    },
    created() {
        this.update();
    },
    destroyed() {
        if(this.editing) {
            this.updateRecipe(this.recipe);
        }
    },
}
</script>

<style lang="scss">

.ingredient {
    &__container {
        display: flex;
        align-items: center;
    }
}

.direction {
    &__container {
        display: flex;
    }
}

.recipe__details {
    &__header input {
        font-size: 2rem;
    }

    &__menu__item {
        display: flex;
    }
    height: 93vh;
}


</style>