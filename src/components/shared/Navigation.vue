<template>
  <nav class="primary-header__nav">
    <ul class="primary-header__links list-inline text-uppercase text-center margin-0">
      <li class="primary-header__link with-sub-menu">
        <a href="javascript:void(0);" class="link">Link</a>
        <ul class="absolute primary-header__sub-menu padding-0 text-uppercase">
          <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
          <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
          <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
        </ul>
      </li>
      <li class="primary-header__link">
        <a href="javascript:void(0);" class="link">Link</a>
      </li>
      <li class="primary-header__link">
        <a href="javascript:void(0);" class="link">Link</a>
      </li>
      <li class="primary-header__link">
        <a href="javascript:void(0);" class="link">Link</a>
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
        fetchTaxons: types.GET_TAXONS
      })
    }
  }
</script>
