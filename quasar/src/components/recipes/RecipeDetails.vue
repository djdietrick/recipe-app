<template>
    <div class="recipe__details">
        <q-toolbar class="bg-secondary">
            <h5>{{recipe.title}}</h5>
        </q-toolbar>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    props: {
        id: {
            default: null
        }
    },
    data() {
        return {
            recipe: {}
        }
    },
    methods: {
        ...mapActions(['updateRecipe', 'delRecipe', 'getRecipeWithId']),
        update() {
            if(this.id) {
                this.getRecipeWithId(this.id)
                .then(recipe => this.recipe = recipe);
            }
        }
    },
    watch: {
        id: function(id) {
            this.update();
        }
    },
    created() {
        this.update();
    }
}
</script>

<style lang="scss">

.recipe__details {
    width: 100%;
    height: 100%;
}

</style>