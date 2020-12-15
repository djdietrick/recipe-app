<template>
    <div class="nav">
        <div class="nav__group">
            <router-link v-for="(item, i) in items" :key="i" class="nav__item" :to="item.to">
                {{item.text}}
            </router-link>
            <div class="nav__item" @click="logout">Logout</div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            items: [
                {
                    text: 'Recipes',
                    to: '/recipes'
                },
                {
                    text: 'Lists',
                    to: '/lists'
                }
            ]
        }
    },
    methods: {
        ...mapActions(['logout'])
    }
}
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

