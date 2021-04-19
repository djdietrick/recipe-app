<template>
    <div class="q-pa-xl auth">
        <q-card class="auth__card fixed-center">
            <q-tabs v-model="func">
                <q-tab name="login" label="Login" />
                <q-tab name="signup" label="Signup" />
            </q-tabs>
            <div class="auth__error" v-if="error">{{error}}</div>
            <q-form class="q-pa-lg q-gutter-md " v-if="func == 'login'"
                @submit="login">
                <q-input
                    filled
                    v-model="email"
                    label="Email"
                />
                <q-input
                    filled
                    v-model="password"
                    label="Password"
                    type="password"
                />
                <q-btn label="Login" type="submit" size="lg" color="primary" class="auth__btn"/>
            </q-form>
            <q-form class="q-pa-lg q-gutter-md" v-else
                @submit="signup">
                <q-input
                    filled
                    v-model="name"
                    label="Name"
                />
                <q-input
                    filled
                    v-model="email"
                    label="Email"
                />
                <q-input
                    filled
                    v-model="password"
                    label="Password"
                    type="password"
                />
                <q-input
                    filled
                    v-model="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    :rules="[val => val === password || 'Passwords do not match']"
                />
                <q-btn label="Signup" type="submit" size="lg" color="primary" class="auth__btn"/>
            </q-form>
        </q-card>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            func: 'login',
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            error: null
        }
    },
    methods: {
        ...mapActions(['loginWithEmail', 'signupWithEmail']),
        async login() {
            try {
                await this.loginWithEmail({
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/recipes');
            } catch(e) {
                this.error = e;
            }
            
        },
        async signup() {
            try {
                if(this.confirmPassword !== this.password) {
                    this.error = "Error: Passwords do not match.";
                    return;
                }
                await this.signupWithEmail({
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/recipes');
            } catch(e) {
                this.error = e;
            }
            
        }
    },
    watch: {
        func: function(val) {
            this.error = null;
        }
    }
}
</script>

<style lang="scss" scoped>
.auth {
    height: 100vh;
    width: 100vw;
    background-color: $primary;
    &__card {
        @media(max-width: $breakpoint-md-max) {
            height: 70vh;
            width: 90vw;
        }
        height: 60vh;
        width: 50vw;

        q-input {
            margin-bottom: 10px;
        }
    }
    &__btn {
        left: 50%;
        transform: translateX(-50%);
    }
    &__error {
        color: $negative;
        margin: 1rem;
        padding: 1rem;
        text-align: center;
        border: 2px solid $negative;
        border-radius: 1rem;
    }
}
</style>

