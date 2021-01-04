<template>
    <div class="details">
        <div v-if="!recipe.title">
            <div class="details__placeholder">Select a recipe</div>
        </div>
        <div class="details__container" v-else>
            <div class="details__title">
                <div v-if="editing">
                    <form class="form details__title__form" @submit.prevent="toggleEdit">
                        <input type="text" class="form__input details__title__title" v-model="recipe.title" placeholder="Title"/>
                        <input type="submit" style="display:none" />
                    </form>
                </div>
                <div v-else>
                    {{recipe.title}}
                </div>
            </div>
            <div class="details__ingredients">
                <h2 class="details__ingredients__title">Ingredients</h2>
                <div class="details__ingredients__add add" v-if="editing"
                    @click="addBlankIngredient">+</div>
                <div class="details__ingredients__list">
                    <div v-for="(ingredient, i) in recipe.ingredients" :key="i" class="ingredient__container">
                        <Ingredient :key="i" :ingredient="ingredient" :editing="editing"/>
                        <div class="ingredient__delete delete" v-if="editing" @click="deleteIngredient(i)">x</div>
                    </div>
                </div>
            </div>
            <div class="details__directions">
                <h2 class="details__directions__title">Directions</h2>
                <div class="details__directions__add add" v-if="editing"
                    @click="addBlankDirection">+</div>
                <div class="details__directions__list">
                    <div v-for="(direction, i) in recipe.directions" :key="i + direction" class="direction__container">
                        <Direction :key="i" :direction="direction" :i="i" @update:direction="recipe.directions[i] = $event" :editing="editing" />
                        <div class="direction__delete delete" v-if="editing" @click="deleteDirection(i)">x</div>
                    </div>
                </div>
            </div>
            <div class="details__togglebtn btn" @click="toggleEdit"
                :class="{editing: editing}">
                {{editing ? 'Save' : 'Edit'}}
            </div>
            <dash-modal v-if="editing" ref="deleteModal">
                <template #trigger>
                    <div class="details__deletebtn btn">Delete</div>
                </template>
                <template #content>
                    <div class="details__deletebtn__confirm">
                        <h2 class="details__deletebtn__confirm__text">Are you sure?</h2>
                        <div class="btn btn--confirm" @click="deleteRecipe">Delete</div>
                        <div class="btn btn--cancel" @click="closeDeleteModal">Cancel</div>
                    </div>
                </template>
            </dash-modal>
        </div>
    </div>
</template>

<script>
const Qty = require('js-quantities');
import Ingredient from './Ingredient.vue';
import Direction from './Direction.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
    // props: {
    //     recipe: {
    //         type: Object,
    //         default: {
    //             title: '',
    //             ingredients: [],
    //             directions: []
    //         }
    //     }
    // },
    components: {
        Ingredient,
        Direction
    },
    data() {
        return {
            editing: false
        }
    },
    computed: {
        ...mapGetters({
            recipe: 'getSelectedRecipe'
        })
    },
    methods: {
        ...mapActions(['updateRecipe', 'delRecipe']),
        toggleEdit() {
            if(this.editing) {
                this.recipe.ingredients = this.recipe.ingredients.filter((ingredient) => {
                    return ingredient.name !== '';
                })
                this.updateRecipe(this.recipe);
                this.editing = false;
            } else {
                this.editing = true;
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
            this.delRecipe(this.recipe.id);
            this.closeDeleteModal();
            this.toggleEdit();
        },
        closeDeleteModal() {
            this.$refs.deleteModal.close();
        }
    },
    created() {
        console.log(Qty.getKinds())
        console.log(Qty.getUnits('volume'))
    }
}
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
        grid-template-rows: 8vh minmax(20rem, 40vh) minmax(min-content,42vh);
        grid-gap: 0.5rem;
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
        @extend h2;
        color: $color-primary-dark;
        border-bottom: 2px solid $color-grey-dark-2;
        text-overflow: ellipsis;

        &__form {
            max-width: 75%;
            .form__input {
                font-size: $h2-font-size;
            }
        }
    }

    &__ingredients {
        border-bottom: 2px solid $color-grey-dark-2;
        position: relative;
        overflow-y: auto;

        &__add {
            position: absolute;
            top: 1rem;
            right: 4rem;
        }

        &__list {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            flex-wrap: wrap;
        }

        &__title {
            color: $color-tertiary-dark;
        }
    }

    &__directions {
        position: relative;
        &__title {
            color: $color-tertiary-dark;
        }

        &__add {
            position: absolute;
            top: 1rem;
            right: 4rem;
        }
    }

    .ingredient {
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }
        &__container {
            position: relative;
        }
        &__delete {
            position: absolute;
            right: 4rem;
            top: 0;
        }
    }

    .direction {
        &__container {
            position: relative;
        }
        &__delete {
            position: absolute;
            right: 4rem;
            top: 0;
        }
    }

    .delete {
        padding: 0.3rem 0.9rem;
        background-color: $color-grey-dark-2;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        font-size: 1.1rem;

        &:hover {
            background-color: $color-error;
        }
    }

    &__togglebtn {
        position: absolute;
        top: 0;
        right: 2rem;
        background-color: $color-grey-dark-1 !important;
        font-size: 1.2rem !important;
    }
    &__togglebtn.editing {
        background-color: $color-primary !important;
    }

    &__deletebtn {
        position: absolute;
        top: 0;
        right: 10rem;
        background-color: $color-error !important;
        font-size: 1.2rem !important;

        &__confirm {
            height: 20vh;
            width: 40vw;
            background-color: $color-background;
            text-align: center;
            padding-top: 2rem;

            &__text {
                display: block;
                margin-bottom: 2rem;
            }
            
            .btn--cancel {
                background-color: $color-grey-dark-1 !important;
            }
            .btn--confirm {
                background-color: $color-error !important;
                margin-right: 2rem;
            }
        }
    }
}

</style>

