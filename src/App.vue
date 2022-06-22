<template>
  <div id="root">

    <div id="no-close-on-click-box">

      <div @click="openOpions" class="selectbox-container">
        <span v-if="!selectedProducts.length" class="placeholder-text">Select your favourites</span>

        <SelectedOptions />

        <span v-if="selectedProducts.length" @click="removeAllSelectedProducts" class="remove-icon"></span>

        <div @click="toggleOptions" class="arrow"
          v-bind:class="{ 'arrow-down': optionsAreHidden, 'arrow-up': !optionsAreHidden }">
        </div>
      </div>

      <Options v-if="!optionsAreHidden" />
    </div>

    <SelectedOptionsOutput />
  </div>
</template>

<script>

import SelectedOptions from './components/SelectedOptions'
import Options from './components/Options'
import SelectedOptionsOutput from './components/SelectedOptionsOutput'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    SelectedOptions, Options, SelectedOptionsOutput
  },
  computed: {
    ...mapGetters({
      selectedProducts: 'getSelectedProductsFormatted'
    })
  },

  methods: {
    removeAllSelectedProducts() {
      this.$store.commit('removeAllProductsFromSelected')
    },
    openOpions() {
      this.optionsAreHidden = false;
    },
    // todo: need to avoid touching the DOM
    clickOutside(e) {
      if (!e.target.closest('#no-close-on-click-box')) {
        this.optionsAreHidden = true;
      }
    },
    toggleOptions(e) {
      e.stopPropagation();
      this.optionsAreHidden = !this.optionsAreHidden
    }
  },
  // todo: need to avoid touching the DOM
  created() {
    document.addEventListener('click', this.clickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutside)
  },

  data: () => ({
    optionsAreHidden: true,
  })


}

</script>

<style lang="scss">
.selectbox-container {
  min-height: 45px;
  background: #ffffff;
  border: 1px solid #111111;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;

  .arrow {
    position: absolute;
    right: 7px;
    top: calc(50% - 10px);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    opacity: 0.3;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  .arrow-down {
    border-top: 10px solid #111111;
  }

  .arrow-up {
    border-bottom: 10px solid #111111;
  }

  .placeholder-text {
    position: absolute;
    left: 18px;
    top: 13px;
    opacity: 0.3;
  }

  .remove-icon {
    position: absolute;
    right: 0;
    opacity: 0.3;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }

    &:after {
      content: '\00d7';
      display: inline-block;
      right: 32px;
      position: absolute;
      width: 19px;
      bottom: 20px;
    }
  }


}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
