
export default {
    actions: {},

    mutations: {

        setSelectedProduct(state, product) {
            //todo: modify the logic
            state.selectedProducts.push(product);
        },

        removeProductFromSelected(state, product) {
            //todo: improve the logic
            let indexOfProductInSelectedList = state.selectedProducts.findIndex(item => item.id === product.id);
            if(indexOfProductInSelectedList !== -1) {
                state.selectedProducts.splice(indexOfProductInSelectedList, 1)
            } else {
                let {parent, siblings} = getSiblingsAndParent(state.products, product);
                let indexOfParentInSelectedList = state.selectedProducts.findIndex(item => item.id === parent.id);
                
                state.selectedProducts.push(...siblings);
                state.selectedProducts.splice(indexOfParentInSelectedList, 1)
            }
        },
        removeAllProductsFromSelected(state) {
            state.selectedProducts = [];
        }
    },
    state: {
        products: [{
            id: 'fruits',
            label: 'Fruits',
            children: [{
                id: 'apple',
                label: 'Apple 🍎',
                children: [
                    {
                        id: 'demirchyan',
                        label: 'demirchyan 🍎',
                        children: [
                            {
                                id: 'demirchyan_1',
                                label: 'demirchyan 1 🍎',
                            }, {
                                id: 'demirchyan_2',
                                label: 'demirchyan 2 🍎',
                            }, {
                                id: 'demirchyan_3',
                                label: 'demirchyan 3 🍎',
                            },
                        ]
                    },
                    {
                        id: 'golden',
                        label: 'golden 🍎',
                    },
                    {
                        id: 'getnaxndzor',
                        label: 'getnaxndzor 🍎',
                    }
                ]
            }, {
                id: 'grapes',
                label: 'Grapes 🍇',
            }, {
                id: 'pear',
                label: 'Pear 🍐',
            }, {
                id: 'strawberry',
                label: 'Strawberry 🍓',
            }, {
                id: 'watermelon',
                label: 'Watermelon 🍉',
            }],
        }, {
            id: 'vegetables',
            label: 'Vegetables',
            children: [{
                id: 'corn',
                label: 'Corn 🌽',
              }, {
                id: 'carrot',
                label: 'Carrot 🥕',
              }, {
                id: 'eggplant',
                label: 'Eggplant 🍆',
              }, {
                id: 'tomato',
                label: 'Tomato 🍅',
              }],
        }],
        selectedProducts: []
    },
    getters: {
        getAllProducts(state) {
            return state.products;
        },
        getSelectedProductsFormatted(state) {
            return state.selectedProducts.map(item => ({id: item.id, label: item.label}));
        }
    },

   
}


function getSiblingsAndParent(allProducts, product) {
    for(let i = 0; i < allProducts.length; i++) {
        if(!allProducts[i].hasOwnProperty('children')) {
            continue;
        }
        for(let j = 0; j < allProducts[i].children.length; j++) {
            if(allProducts[i].children[j].id === product.id) {
                return {
                    parent: allProducts[i],
                    siblings: allProducts[i].children.filter(p => p.id !== product.id)
                }
            }
        }
    }
}