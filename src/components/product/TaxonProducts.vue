<template>
  <section class="home-products">
    <el-row>
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row class="page-heading-row">
          <el-col :span="24">
            <h2 class="h2 text-center">
              Online Shop
            </h2>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" v-if="products.length > 0" type="flex" justify="center" class="flex-wrap">
          <el-col :span="6" v-for="product in products" :key="product.id">
            <el-card class="product-card">
              <router-link :to="'/products/' + product.slug" tag="a" class="product-link">
                <img :src="'http://localhost:3000/' + product.master.images[0].product_url" alt="" class="taxon-image">
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

  export default {
    name: 'taxon-products',

    mounted() {
      this.$store.dispatch(types.TAXON_PRODUCTS, this.$route.params.id);
    },

    computed: {
      ...mapGetters({
        taxonProducts: types.GET_TAXON_PRODUCTS
      }),
      
      products() {
        return this.taxonProducts.products || [];
      }
    }
  }
</script>

<style>
 .taxon-image { width: 100%; }
 img { vertical-align: top; }
 .flex-wrap { flex-wrap: wrap; }
</style>
