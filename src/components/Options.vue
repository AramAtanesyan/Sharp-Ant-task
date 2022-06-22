<template>
    <ul>
        <li class="product-option" v-for="node of allProducts">

            <ProductNode 
                :node="node" 
                :spacing="spacing + 10" 
                :checked="false" 
            />
        </li>
    </ul>
</template>




<script>
import ProductNode from './ProductNode';

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
        }
    },
    computed: {
        allProducts() {
            return this.$store.getters.getAllProducts;
        }
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