<template>
    <div class="recipe__details">
        <q-scroll-area class="fit">
            <div class="q-px-md">
            <div class="recipe__details__header row justify-between q-py-md">
                <q-input class="recipe__details__header__input" v-if="editing" v-model="recipe.title"></q-input>
                <h4 v-else class="q-my-sm">{{recipe.title}}</h4>

                <q-btn v-if="!editing" flat :ripple="false" icon="more_vert" class="recipe__details__menu">
                    <q-menu auto-close anchor="bottom right" self="top right">
                        <q-list dense>
                            <q-item clickable @click="editing=!editing">
                                <q-item-section class="q-py-md recipe__details__menu__item">
                                    <q-icon name="edit" />
                                </q-item-section>
                                <q-item-section>
                                    Edit
                                </q-item-section>
                            </q-item>
                            <q-item clickable @click="deleteRecipe">
                                <q-item-section class="q-py-md recipe__details__menu__item">
                                    <q-icon name="delete" />
                                </q-item-section>
                                <q-item-section class="q-mr-sm">
                                    Delete
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn v-else class="recipe__details__menu" @click="editing = false" color="primary">
                    Save
                </q-btn>

            </div>

        <q-separator />

        <div class="recipe__details__ingredients q-my-md">
            <div class="row">
                <h5 class="q-my-md">Ingredients</h5>
                <q-btn outline v-if="editing" icon="add" class="q-ml-xl ingredient__add" color="primary" @click="addBlankIngredient"/>
            </div>
            <div class="ingredient__container" v-for="(ingredient, i) in recipe.ingredients" :key="i">
                <Ingredient :ingredient="ingredient" :editing="editing" @focused="focused = i"/>
                <q-btn flat clickable v-if="editing" icon="close" size="sm" color="primary" class="ingredient__delete" @click="deleteIngredient(i)"/>
            </div>
        </div>

        <q-separator />

        <div class="recipe__details__directions">
            <div class="row">
                <h5 class="q-my-md">Directions</h5>
                <q-btn outline v-if="editing" icon="add" class="q-ml-xl direction__add" color="primary" @click="addBlankDirection"/>
            </div>
            <div v-for="(direction, i) in recipe.directions" :key="i + direction" class="direction__container q-mb-sm">
                <Direction :key="i" :direction="direction" :i="i" @update:direction="recipe.directions[i] = $event" :editing="editing" />
                <q-btn flat clickable v-if="editing" icon="close" size="sm" color="primary" class="direction__delete" @click="deleteDirection(i)"/>
            </div>
        </div>

        <q-separator />

        <div class="recipe__details__tags q-pb-lg">
            <div class="row">
                <h5 class="q-my-md">Tags</h5>
            </div>
            <div class="row" v-if="editing">
                <q-form @submit.prevent="addTag">
                <q-input outlined type="text" class="form__input newtag" v-model="newTag" 
                    placeholder="New Tag">
                    <template v-slot:hint>
                        Press enter to add
                    </template>
                </q-input>
                </q-form>
            </div>
            <div class="tags q-mt-md">
                <div v-for="tag in recipe.tags" :key="tag">
                    <q-chip size="md" outline color="primary" v-if="!editing">{{tag[0].toUpperCase() + tag.slice(1)}}</q-chip>
                    <q-chip size="md" outline removable @remove="removeTag(tag)" color="primary" v-else>{{tag[0].toUpperCase() + tag.slice(1)}}</q-chip>
                </div>
            </div>
        </div>

        </div>
        </q-scroll-area>
        
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
            newTag: '',
            editing: false,
            focused: -1,
            newTag: ''
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
        onReturn() {
            if(this.editing && this.focused == this.recipe.ingredients.length - 1) {
                this.addBlankIngredient();
            }
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
                this.$router.push({
                    params: {id: undefined}
                })
            })
        },
        addTag(e = null) {
            if (e) e.preventDefault();
            if (this.newTag.length > 0) {
                this.newTag = this.newTag.toLowerCase();
                if(!this.recipe.tags) 
                    this.recipe.tags = [];
                if (!this.recipe.tags.includes(this.newTag)) {
                    this.recipe.tags.push(this.newTag);
                }
                this.newTag = '';
                this.updateRecipe(this.recipe);
            }
        },
        removeTag(tag) {
            if (!this.recipe.tags) return;
            let index = this.recipe.tags.indexOf(tag);
            if (index >= 0) {
                this.recipe.tags.splice(index,1);
            }
            this.updateRecipe(this.recipe);
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
        if(this.$route.query.new)
            this.editing = true
        window.addEventListener('keydown', (e) => {
            if(e.key == "Enter")
                this.onReturn();
        })
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
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    &__add {
        align-self: center;
    }
    &__delete {
        align-self: center;
        
    }
}

.direction {
    &__container {
        display: flex;
    }
    &__add {
        align-self: center;
    }
}

.recipe__details {
    &__header input {
        font-size: 2rem;
        max-width: 65vw;
    }

    &__header {
        display: grid;
        grid-template-columns: 1fr min-content;
        grid-gap: 1rem;
    }

    &__menu {
        @media(min-width: $breakpoint-md-max) {
            margin-right: 2rem;
        }
        margin-right: 1rem;

        &__item {
            display: flex;
            align-items: center;
        }
    }

    &__tags {
        display: flex;
        align-items: center;

        &__add {
            justify-self: right;
        }
    }

    height: 93vh;
}

.tags {
    display: flex;
}

</style>