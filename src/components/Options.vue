<template>
    <ul>
        <li class="product-option" v-for="node of allProducts">

            <ProductNode :node="node" :spacing="spacing + 10" :checked="isNodeExistInSelected(node)" />
        </li>
    </ul>
</template>




<script>
import ProductNode from './ProductNode';
import { mapGetters } from 'vuex';

export default {
    components: { ProductNode },
    data() {
        return {
            spacing: 0,
        }
    },
    methods: {
        handleParentCheckbox(product) {
            //todo: need to emit data to parent componetn
        },

        isNodeExistInSelected(product) {
            const selectedProducts = this.selectedProducts;
            return selectedProducts.filter(selectedProduct => selectedProduct.id === product.id).length > 0;

        }
    },
    computed: {
        ...mapGetters({
            selectedProducts: 'getSelectedProductsFormatted',
            allProducts: 'getAllProducts'
        })
    }

}

</script>


<style scoped lang="scss">
ul {
    text-align: left;
    padding-left: 5px;
}

.product-option {
    list-style-type: none;


}
</style>