<template>
  <nav class="primary-header__nav">
    <ul class="primary-header__links list-inline text-uppercase text-center margin-0">
      <li class="primary-header__link with-sub-menu" v-for="parentTaxon in parentTaxons" :key="parentTaxon.id">
        <a href="javascript:void(0);" class="link">{{ parentTaxon.name }}</a>
      </li>
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
        taxons: types.GET_TAXONS,
        products: types.GET_PRODUCTS
      }),

      parentTaxons() {
        return this.taxons.filter(function (taxon) {
          return taxon.parent_id === null;
        });
      }
    },
  }
</script>
