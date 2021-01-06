import {db} from '../../services/firebase';

const state = {
    lists: []
}

const getters = {
    getLists: (state) => state.lists
}

const mutations = {
    setLists: (state, lists) => state.lists = lists,
    addList: (state, list) => state.lists.unshift(list),
    deleteList: (state, id) => state.lists = state.lists.filter(l => l.id !== id),
    updateList: (state, list) => state.lists = state.lists.map(l => {
        if(l.id !== list.id)
            return l;
        return list;
    })
}

const actions = {
    async fetchLists({commit, rootState}) {
        if(!rootState.user)
            throw new Error("Not logged in");

        db().collection('lists').where('userId', '==', rootState.user.userId).get()
            .then((snapshot) => {
                let lists = [];
                snapshot.forEach(doc => {
                    lists.push({
                       id: doc.id,
                        ...doc.data()
                    });
                })
                commit('setLists', lists);
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}