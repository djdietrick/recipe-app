<template>
    <div class="direction">
        <div class="direction__number">{{i + 1}})</div>
        <div v-if="editing" class="direction__area">
            <form class="form direction_form" @submit.prevent="submit">
                <textarea type="text" class="form__input direction__direction" v-model="mutableDirection" 
                    placeholder="New direction..." @blur="submit"/>
                <input type="submit" style="display:none" />
            </form>
        </div>
        <div v-else-if="direction !== ''">
            <p>{{direction}}</p>
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

<style lang="scss" scoped>
@import "../../styles/main.scss";
.direction {
    display: flex;
    font-size: $default-font-size;

    &__number {
        margin-right: 0.5rem;
        color: $color-grey-dark-11;
    }
    &__area {
        width: 100%;
    }
    .form__input {
        width: 85%;
        min-height: 6rem;
    }
}

</style>


