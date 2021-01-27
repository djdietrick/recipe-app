import {db, auth} from '../../services/firebase';

const state = {
    user: null
}

const getters = {
    getUser: (state) => state.user,
    getDark: (state) => state.user.dark
}

const mutations = {
    setUser: (state, user) => state.user = user,
    removeUser: (state) => state.user = null,
    setDark: (state, dark) => state.user.dark = dark
}

const actions = {
    async signupWithEmail({commit}, form) {
        const cred = await auth().createUserWithEmailAndPassword(form.email, form.password);
        await db().collection('users').doc(cred.user.uid).set({
            email: form.email,
            name: form.name,
            userId: cred.user.uid,
            dark: false
        });
        const user = await db().collection('users').doc(cred.user.uid).get();
        commit('setUser', user.data());
    },
    async signupWithGoogle({commit}) {
        
    },
    async loginWithEmail({commit}, form) {
        const cred = await auth().signInWithEmailAndPassword(form.email, form.password);
        const user = await db().collection('users').doc(cred.user.uid).get();
        commit('setUser', user.data());
    },
    async logout({commit}) {
        auth().signOut().then(() => { commit('removeUser') });
    },
    async toggleDark({commit, state}) {
        await db().collection('users').doc(state.user.userId).set({
            dark: !state.user.dark
        });
        commit('setDark', !state.user.dark);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}