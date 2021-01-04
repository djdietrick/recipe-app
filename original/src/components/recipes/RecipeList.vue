<template>
    <div class="list">
        <div class="list__header">
            <div class="list__header__title">Recipes</div>
            <div class="list__header__add add" @click="addRecipeAndFocus">+</div>
        </div>
        <div class="list__container">
            <div class="list__item" v-for="(item, i) in list" :key="i"
                @click="setSelectedRecipe(i)"
                :class="{ selected:  index === i}">
                <div class="list__item__text">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapGetters({
            list: 'getRecipes',
            index: 'getIndex'
        })
    },
    methods: {
        ...mapActions(['addRecipe', 'setIndex']),
        async addRecipeAndFocus() {
            await this.addRecipe();
            this.setSelectedRecipe(0);
        },
        setSelectedRecipe(i) {
            this.setIndex(i);
        }
    },
    data() {
        return {
            selectedRecipe: {},
            selectedIndex: 0
        }
    },
    created() {
        if(this.list.length != 0) {
            this.setSelectedRecipe(0);
        }
    }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';

.list {
    background-color: $color-grey-light-2;
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
        &__title {
            @extend h2;
        }
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
