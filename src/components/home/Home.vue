<template>
  <!-- Online Shop -->
  <section class="home">
    <!-- <section class="three-column-layout online-shop">
      <div class="container" v-if="shopProducts.length > 0">
        <div class="container__inner">
          <h2 class="h2 text-uppercase text-center">Online Shop</h2>
          <el-row :gutter="30" type="flex" class="row-bg" justify="center">
            <el-col :span="6" v-for="product in shopProducts" :key="product.id">
              <el-card>
                <router-link :to="'products/' + product.slug" tag="a" class="three-column-layout__link no-underline">
                  <figure class="three-column-layout__figure">
                    <img :src="images[product.image_ids[0]].large_url" alt="" class="three-column-layout__image">
                  </figure>
                  <div style="padding: 14px;">
                    <h3 class="three-column-layout__heading margin-0">{{ product.name }}</h3>
                    <p class="three-column-layout__text margin-0">{{ product.display_price }}</p>
                  </div>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="three-column-layout__all border-t text-center bg-white">
          <router-link to="/shop" tag="a" class="btn btn-action">
            Shop All Products
          </router-link>
        </div>
      </div>
    </section> -->
    
  </section>
  <!-- Online Shop -->
</template>


<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'home',

    components: {
    
    },

    mounted() {
      this.$store.dispatch(types.FETCH_PRODUCTS, {
        'page': 1,
        'per_page': 4
      });
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
      }
    }
  }
</script>

<style>
  img { max-width: 100%; }
</style>
