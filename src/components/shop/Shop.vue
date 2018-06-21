<template>
  <section class="shop">
    <section class="three-column-layout online-shop">
      <div class="container">
        <div class="container__inner">
          <h2 class="h2 text-uppercase text-center">All Products</h2>
          <div class="row narrow three-column-layout__row">
            <div class="col-md-3 col-sm-4 col-xs-12 three-column-layout__item border-l border-t text-center" v-for="product in shopProducts" :key="product.id">
              <router-link :to="'products/' + product.slug" tag="a" class="three-column-layout__link no-underline">
                <figure class="three-column-layout__figure">
                  <img :src="images[product.image_ids[0]].large_url" alt="" class="three-column-layout__image">
                </figure>
                <div class="three-column-layout__content">
                  <h3 class="three-column-layout__heading margin-0">{{ product.name }}</h3>
                  <p class="three-column-layout__text margin-0">{{ product.display_price }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pagination">
      <div class="container">
        <div class="container__inner">
          <ul class="list-inline text-center">
            <router-link to="" v-for="page in pages.total_pages" :key="page" tag="li">
              <a class="link">{{ page }}</a>
            </router-link>
          </ul>
        </div>
      </div>
    </section>
    <section class="section-divider"></section>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'shop',

    mounted() {
      this.$store.dispatch(types.FETCH_PRODUCTS, 8);
    },

    computed: {
      ...mapGetters({
        products: types.GET_PRODUCTS
      }),

      shopProducts() {
        return this.products.products || [];
      },

      images() {
        return helpers.arrayToObject(this.products.images || [], "id");
      },

      pages() {
        return this.products.meta || 0;
      }
    }
  }
</script>
