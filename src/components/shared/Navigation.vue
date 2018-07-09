<template>
  <nav class="primary-header__nav">
    <ul class="primary-header__links list-inline text-uppercase text-center margin-0">
      <router-link :to="'/categories/' + taxon.name + '/' + taxon.id" class="primary-header__link with-sub-menu" v-for="taxon in allTaxons" :key="taxon.id" @click.native="showTaxonProducts(taxon.id)" tag="li">
        <a class="link">{{ taxon.name }}</a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';

  export default {
    name: 'navigation',
    
    mounted() {
      this.$store.dispatch(types.FETCH_TAXONS);
    },

    computed: {
      ...mapGetters({
        taxons: types.GET_TAXONS
      }),

      allTaxons() {
        return this.taxons.filter(function (taxon) {
          return taxon.parent_id !== null;
        });
      }
    },

    methods: {
      showTaxonProducts(id) {
        this.$store.dispatch(types.TAXON_PRODUCTS, id);
      }
    }
  }
</script>

<style scoped>
  .router-link-exact-active.router-link-active {
    background: #fff;
  }
</style>
