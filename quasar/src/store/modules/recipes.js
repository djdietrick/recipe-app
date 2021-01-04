import {db} from '../../services/firebase';
import {v4 as uuidv4} from 'uuid';

const state = {
    recipes: [],
    selectedIndex: 0
}

const getters = {
    getRecipes: (state) => state.recipes,
    getSelectedRecipe: (state) => state.recipes[state.selectedIndex],
    getIndex: (state) => state.selectedIndex
}

const mutations = {
    setIndex: (state, index) => state.selectedIndex = index,
    setRecipes: (state, recipes) => state.recipes = recipes,
    addRecipe: (state, recipe) => state.recipes.unshift(recipe),
    delRecipe: (state , id) => state.recipes = state.recipes.filter((r) => r.id !== id),
    updateRecipe: (state, recipe) => state.recipes = state.recipes.map(r => {
        if(r.id !== recipe.id)
            return r;
        return recipe;
    })
}

const actions = {
    setIndex({commit}, index) {
        commit('setIndex', index)
    },
    async fetchRecipes({commit, rootState}) {
        if(!rootState.user)
            throw new Error("Not logged in");

        db.collection('recipes').where('userId', '==', rootState.user.userId).get()
            .then((snapshot) => {
                let recipes = [];
                snapshot.forEach(doc => {
                    recipes.push({
                       id: doc.id,
                        ...doc.data()
                    });
                })
                commit('setRecipes', recipes);
            })
    },
    async addRecipe({commit, rootState}) {
        if(!rootState.user)
            throw new Error("Not logged in");

        let recipe = {
            id: uuidv4(),
            title: 'New Recipe',
            ingredients: [],
            directions: [],
            userId: rootState.user.userId
        }

        await db.collection('recipes').doc(recipe.id).set(recipe);

        commit('addRecipe', recipe);
    },
    async delRecipe({commit, rootState}, id) {
        if(!rootState.user)
            throw new Error("Not logged in");

        await db.collection('recipes').doc(id).delete();

        commit('delRecipe', id);
    },
    async updateRecipe({commit, rootState}, recipe) {
        if(!rootState.user)
            throw new Error("Not logged in");
        
        console.log(recipe);

        await db.collection('recipes').doc(recipe.id).set(recipe);

        commit('updateRecipe', recipe);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
} 