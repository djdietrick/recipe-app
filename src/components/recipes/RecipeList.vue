<template>
    <div class="list">
        <div class="list__item" v-for="(item, i) in list" :key="i">
            <div class="list__item__text">{{item.title}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        list: {
            default: [
                {
                    title: 'Recipe'
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
    },
    data() {
        return {
            selectedRecipe: {}
        }
    },
    created() {
        if(this.list.length != 0) {
            this.selectedRecipe = this.list[0]
        }
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
        margin-top: 0.5rem;
        transition: 0.2s ease-in-out;
        cursor: pointer;
        width: 100%;

        &:hover {
            background-color: $color-white;
        }
        &--selected {
            background-color: $color-white;
        }
        
        &__text {
            font-size: 1.4rem;
        }
    }
}

</style>
