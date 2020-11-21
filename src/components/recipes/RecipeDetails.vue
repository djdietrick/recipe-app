<template>
    <div class="details">
        <div v-if="!recipe">
            
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        recipe: {
            default: null
        }
    }
})
</script>

<style lang="scss">

</style>

