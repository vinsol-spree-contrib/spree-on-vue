<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item v-for="(taxon, index) in allTaxons" :key="taxon.id" @click.native="showTaxonProducts(taxon.id)" :index="String(index + 1)">
      <router-link :to="'/categories/' + taxon.name + '/' + taxon.id" tag="a" class="nav-link">
        {{ taxon.name }}
      </router-link>
    </el-menu-item>
  </el-menu>
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
  .nav-link {
    display: block;
    height: 60px;
    line-height: 60px;
  }
</style>
