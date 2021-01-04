<template>
    <div class="auth">
        <h1 class="auth__title">Recipe Saver</h1>
        <dash-auth :signupFunction="signupWithEmail" :loginFunction="loginWithEmail"/>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    methods: {
        ...mapActions(['signupWithEmail', 'loginWithEmail'])
    }
}
</script>

<style lang="scss">
@import '../styles/main.scss';

.auth {
    margin-top: 10rem;

    &__title {
        margin-bottom: 0;
    }

    form .btn {
        margin-top: 1.5rem;
    }
}
    
</style>