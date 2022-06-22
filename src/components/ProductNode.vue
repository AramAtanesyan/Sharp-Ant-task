<template>
    <div :style="nodeMargin">

        <div class="product-option-row-container" :data-node="node.id">
            <span @click="toggleChildren" v-if="hasChildren" class="arrow"
                v-bind:class="{ 'arrow-right': !childrenAreVisible, 'arrow-down': childrenAreVisible }"></span>
            <input :checked="checked" v-model="checked" @change="handleCheckbox" :id="node.id" type="checkbox" v-bind:class="{ 'remove-sign': 0 }">
            <label :for="node.id">{{ node.label }}</label>
        </div>
        
        <ProductNode 
            v-if="hasChildren && childrenAreVisible" 
            v-for="child in node.children" 
            :node="child" 
            :spacing="spacing + 10" 
            :checked="checked"
        />
    </div>
</template>



<script>
export default {
    name: 'ProductNode',
    props: {
        node: {
            type: Object,
            required: true
        },
        spacing: {
            type: Number,
            default: 0
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            childrenAreVisible: false,
        }
    },
    methods: {
        toggleChildren() {
            this.childrenAreVisible = !this.childrenAreVisible;
        },

        handleCheckbox() {
            if(!this.checked) {
                this.$store.commit('removeProductFromSelected', this.node)
            } else {
                this.$store.commit('setSelectedProduct', this.node)
            }
        }
    },
    computed: {
        nodeMargin() {
            return {
                'margin-left': `${this.spacing}px`
            }
        },
        hasChildren() {
            return this.node.children?.length > 0
        }
    }
}
</script>




<style scoped lang="scss">
.product-option-row-container {
    position: relative;
    padding-left: 15px;

    .arrow-right {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #111111;
        top: 3px;
    }

    .arrow-down {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #111111;
        top: 7px;
    }

    .arrow {
        position: absolute;
        left: 0;
        width: 0;
        height: 0;

        &:hover {
            cursor: pointer;
        }
    }

    .remove-sign[type="checkbox"]:not(:checked),
    .remove-sign[type="checkbox"]:checked {
        position: absolute;
        left: 0;
        opacity: 0.01;
    }

    .remove-sign[type="checkbox"]:not(:checked)+label,
    .remove-sign[type="checkbox"]:checked+label {
        position: relative;
        padding-left: 22px;
        font-size: 11px;
        cursor: pointer;
    }

    .remove-sign[type="checkbox"]:not(:checked)+label:before,
    .remove-sign[type="checkbox"]:checked+label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 1.4em;
        height: 1.4em;
        border: 1px solid #aaa;
        background: #FFF;
        border-radius: .2em;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1), 0 0 0 rgba(203, 34, 237, .2);
        -webkit-transition: all .275s;
        transition: all .275s;
    }

    /* checked mark aspect */
    .remove-sign[type="checkbox"]:not(:checked)+label:after,
    .remove-sign[type="checkbox"]:checked+label:after {
        content: '✕';
        position: absolute;
        top: .525em;
        left: .18em;
        font-size: 1.375em;
        color: #CB22ED;
        line-height: 0;
        -webkit-transition: all .2s;
        transition: all .2s;
    }

    .remove-sign[type="checkbox"]:not(:checked)+label:after {
        opacity: 0;
        -webkit-transform: scale(0) rotate(45deg);
        transform: scale(0) rotate(45deg);
    }
}
</style>