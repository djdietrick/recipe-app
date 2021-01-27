<template>
    <div class="ingredient">
        <div v-if="editing">
            <form class="form ingredient__form" @submit.prevent="submit">
                <q-input outlined type="text" class="form__input ingredient__name" v-model="ingredient.name" 
                    placeholder="New ingredient" label="Name" @blur="submit"/>
                <q-input outlined type="text" class="form__input ingredient__qty" v-model="ingredient.qty" label="Qty" @blur="submit"/>
                <q-input outlined type="text" class="form__input ingredient__unit" v-model="ingredient.unit" label="Unit" @blur="submit" list="units" />
                <datalist id="units">
                    <option v-for="unit in units" :key="unit" :value="unit"/>
                </datalist>
                <input type="submit" style="display:none" />
            </form>
        </div>
        <div v-else-if="ingredient.name !== ''">
            <p>{{ingredient.name}}{{ingredient.qty != 0 || ingredient.unit !== '' ? ',' : ''}} {{ingredient.qty}} {{ingredient.unit}}</p>
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
        ingredient: {
            default: {
                name: '',
                qty: 0,
                unit: ''
            }
        }
    },
    data() {
        return {
            units: [
                'Grams','Ounce','Oz','lb','Pound','Kilogram','g','kg','Cup','Tsp','Tbsp',
                'Fluid-ounce','floz','Gallon','Liter','Milliliter','ml','L','Quart','Pint'
            ]
        }
    },
    methods: {
        submit() {
            this.$emit('update:ingredient', {
                name: this.ingredient.name.trim().toLowerCase(),
                qty: parseInt(this.ingredient.qty.trim()),
                
            });
        }
    }
}
</script>

<style lang="scss" scoped>

.ingredient {
    &__form {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        grid-gap: 5%;
    }
}    

</style>