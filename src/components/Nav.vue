<template>
    <div class="nav">
        <div class="nav__group">
            <div class="nav__item" v-for="(item, i) in items" :key="i">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            items: [
                {
                    text: 'Recipes'
                },
                {
                    text: 'Lists'
                }
            ]
        }
    }
})
</script>

<style lang="scss">
@import '../styles/main.scss';
.nav {
    background-color: $color-primary-light;
    height: 100%;
    width: 100%;
    left:0;
    color: $color-white;

    &__group {
        display: flex;
        flex-direction: column;
    }

    &__item {
        width: 100%;
        background-color: $color-primary;
        padding: 2rem;
        margin-top: 2rem;
        font-size: 2rem;
        transition: 0.2s ease-in-out;
        cursor: pointer;
        
        &:hover {
            background-color: $color-primary-dark;
        }
    }
}
</style>

