<template>
    <div class="details">
        <div v-if="!recipe.title">
            <div class="details__placeholder">Select a recipe</div>
        </div>
        <div v-else>
            <dash-text-toggle-input placeholder="Title" v-bind:value.sync="recipe.title" textClass="details__title" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
const Qty = require('js-quantities');

export default Vue.extend({
    props: {
        recipe: {
            default: null
        }
    },
    created() {
        console.log(Qty.getKinds())
        console.log(Qty.getUnits('mass'))
    }
})
</script>

<style lang="scss">
@import '../../styles/main.scss';

.details {
    position: relative;
    &__placeholder {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba($color-black, 0.2);
        font-size: 5rem;
    }

    &__title {
        @extend h1;
        margin-left: 3rem;
    }
}

</style>

