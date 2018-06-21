<template>
  <section class="product">
    <div class="container">
      <div class="container__inner">
        <div class="row narrow">
          <div class="col-md-6">

          </div>
          <div class="co-md-6">
            
          </div>
        </div>
      </div>
    </div>
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
        productDetails: types.GET_PRODUCT
      }),
    }
  }
</script>
