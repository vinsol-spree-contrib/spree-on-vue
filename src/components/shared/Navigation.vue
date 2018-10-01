<template>
  <nav class="main-navigation">
    <ul class="main-navigation-list">
      <router-link :to="'/' + taxon.permalink + '/' + taxon.id" v-for="taxon in allTaxons" :key="taxon.id" @click.native="showTaxonProducts(taxon.id)" tag="li" class="menu-item">
        {{ taxon.name }}
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

<style>
  .main-navigation-list { padding: 0; margin: 0; text-align: center; height: 60px; background:rgb(231, 237, 246); }
  .menu-item { display: inline-block; margin: 0 5px; padding: 0 7px; font-size: 14px; line-height: 60px; cursor: pointer; color: #2b2b2b; transition: color .3s; overflow: hidden; position: relative; }
  .menu-item:after { content: ''; position: absolute; left: 0; bottom: -5px; width: 100%; height: 3px; background: #0E4AA3; transition: .3s; }
  .menu-item.router-link-exact-active.router-link-active { color: #0E4AA3; font-family: 'AvenirLTStd-Heavy'; }
  .menu-item.router-link-exact-active.router-link-active:after { bottom: 0; }
</style>
