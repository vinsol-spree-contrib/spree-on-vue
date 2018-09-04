<template>
  <section class="home-products">
    <el-row>
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row class="page-heading-row">
          <el-col :span="12">
            <h2 class="h2">
              Online Shop
            </h2>
          </el-col>
          <el-col :span="12" class="text-right view-all-btn">
            <router-link to="/shop" tag="a">
              <el-button class="text-upppercase" type="primary">Shop all Products</el-button>
            </router-link>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" v-if="shopProducts.length > 0">
          <el-col :span="6" v-for="product in shopProducts" :key="product.id">
            <el-card class="product-card">
              <router-link :to="'products/' + product.slug" tag="a" class="product-link">
                <img :src="images[product.image_ids[0]].large_url" alt="">
                <div class="product-card-body">
                  <div class="bottom clearfix">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.display_price }}</p>
                  </div>
                </div>
              </router-link>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'home',

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
  .product-card .el-card__body { padding: 0; }
  .product-link { display: block; }
  .product-card-body { padding: 15px; }
  .product-card .el-card__body a { text-decoration: none; color: #2b2b2b; font-size: 14px; line-height: 24px; }
  .text-right { text-align: right; }
  .view-all-btn { padding-top: 12px; }
  .product-card { margin-bottom: 20px; }
  .text-uppercase { text-transform: uppercase; }
  .page-heading-row { padding-bottom: 10px; }
  .offset-vertical { padding: 50px 0; }
  .product-card-body h3 { min-height: 48px; }
  .el-card { border: 1px solid #ddd !important; }
</style>
