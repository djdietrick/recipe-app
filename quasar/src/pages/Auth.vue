<template>
    <div class="q-pa-xl auth">
        <q-card class="auth__card">
            <q-tabs v-model="func">
                <q-tab name="login" label="Login" />
                <q-tab name="signup" label="Signup" />
            </q-tabs>
            <q-form class="q-pa-lg" v-if="func == 'login'"
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
                <q-btn label="Submit" type="submit" color="primary"/>
            </q-form>
            <q-form v-else>

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
            confirmPassword: ''
        }
    },
    methods: {
        ...mapActions(['loginWithEmail', 'signupWithEmail']),
        async login() {
            await this.loginWithEmail({
                email: this.email,
                password: this.password
            });
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
.auth {
    &__card {
        height: 60vh;
        width: 50vw;

        q-input {
            margin-bottom: 10px;
        }
    }
}
</style>

