<template>
    <div><pre>{{outputData}}</pre></div>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
    filters: {
        prettyOutput(val) {
            return val.map(item => item.id)
        }
    },
    computed: {
        ...mapGetters({
            selectedProducts: 'getSelectedProductsFormatted'
        }),
        outputData() {
            return this.selectedProducts.map(item => item.id) 
        }
    }
}
</script>


<style>
</style>