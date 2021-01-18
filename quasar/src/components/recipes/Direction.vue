<template>
    <div class="direction">
        <div class="direction__number q-mr-md">{{i + 1}})</div>
        <div v-if="editing" class="direction__area">
            <form class="form direction__form" @submit.prevent="submit">
                <q-input
                    v-model="mutableDirection"
                    outlined
                    autogrow @blur="submit"/>
                <!-- <textarea type="text" class="form__input direction__direction" v-model="mutableDirection" 
                    placeholder="New direction..." @blur="submit"/> -->
                <input type="submit" style="display:none" />
            </form>
        </div>
        <div v-else-if="direction !== ''">
            <p class="direction__text">{{direction}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        editing: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: '',
        },
        i: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            mutableDirection: this.direction
        }
    },
    methods: {
        submit() {
            this.$emit('update:direction', this.mutableDirection);
        }
    }
}
</script>

<style lang="scss">

.direction {
    display: flex;
    &__number {
        margin-top: 1rem;
    }
    &__text {
        margin-top: 1rem;
    }
    &__form {
        width: 65vw;
    }
}

</style>