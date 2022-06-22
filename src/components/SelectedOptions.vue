<template>
    <ul>
        <li class="selected-product-item" v-for="product of selectedProducts">
            {{ product.label }}
            <span @click="removeProductFromSelected(product)" class="remove-icon"></span>
        </li>
    </ul>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
    methods: {
        removeProductFromSelected(product) {
            this.$store.commit('removeProductFromSelected', product)
        }
    },
    computed: {
        ...mapGetters({
            selectedProducts: 'getSelectedProductsFormatted'
        })
    }
}


</script>



<style scoped lang="scss">
ul {
    text-align: left;
    padding-left: 5px;
}

.selected-product-item {
    background-color: #E3F2FD;
    display: inline-block;
    width: 101px;
    font-size: 13px;
    border: 1px solid #E3F2FD;
    border-radius: 4px;
    margin-left: 7px;
    padding: 3px;
    position: relative;

    .remove-icon {
        position: absolute;
        right: 0;

        &:hover {
            cursor: pointer;
        }

        &:after {
            content: '\00d7';
            display: inline-block;
            right: 0;
            position: absolute;
            width: 19px;
            top: -2px;
            height: 19px;
            font-size: 18px;
        }
    }

}
</style>