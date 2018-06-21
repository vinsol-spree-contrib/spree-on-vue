<template>
  <section class="product-details">
    
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'product-details',

    mounted() {
      this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug);
    },

    computed: {
      ...mapGetters({
        product: types.GET_PRODUCT
      })
    }
  }
</script>
