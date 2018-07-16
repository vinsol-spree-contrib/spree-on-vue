<template>
  <section class="home-products">
    <el-row>
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row class="page-heading-row">
          <el-col :span="24" class="text-center">
            <h2 class="h2">
              Online Shop
            </h2>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" v-if="shopProducts.length > 0" class="products shop-products">
          <el-col :span="6" v-for="product in shopProducts" :key="product.id">
            <el-card  shadow="hover" class="product-card">
              <router-link :to="'products/' + product.slug" tag="a" class="product-link">
                <img :src="images[product.image_ids[0]].large_url" alt="" class="three-column-layout__image">
                <div class="product-card-body">
                  <div class="bottom clearfix">
                    <h3 class="three-column-layout__heading margin-0">{{ product.name }}</h3>
                    <p class="three-column-layout__text margin-0">{{ product.display_price }}</p>
                  </div>
                </div>
              </router-link>
            </el-card>
          </el-col>
        </el-row>

        <section class="pagination">
          <ul class="el-pager" v-if="pages">
            <router-link :to="{ path: '/shop', query: { page: page } }" v-for="page in pages" :key="page" @click="setCurrentPage(page)" tag="li" class="number">
              <a href="javascript:void(0);" class="link" >{{ page }}</a>
            </router-link>
          </ul>
        </section>

      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'shop',

    mounted() {
      this.fetchProducts();
      this.$route.query["page"] = this.currentPage;
    },

    watch: {
      '$route.query.page': function() {
        this.fetchProducts();
      }
    },

    computed: {
      ...mapGetters({
        products: types.GET_PRODUCTS
      }),

      currentPage() {
        return Number(this.$route.query.page) || 1;
      },

      shopProducts() {
        return this.products.products || [];
      },

      images() {
        return helpers.arrayToObject(this.products.images || [], "id");
      },

      pages() {
        return this.products.meta ? this.products.meta.total_pages : 0;
      }
    },

    methods: {
      setCurrentPage: function (page) {
        this.$route.query.page = page;
      },

      handleCurrentChange(val) {
        this.$store.dispatch(types.FETCH_PRODUCTS, {
          'page': `${val}`,
          'per_page': '4'
        });
        debugger
        this.$route.query.page = `${val}`;
      },

      fetchProducts: function (event) {
        this.$store.dispatch(types.FETCH_PRODUCTS, {
          'page': this.$route.query.page || 1,
          'per_page': '4'
        });
      }
    }
  }
</script>

<style>
  .pagination .router-link-active { background: #ddd; color: #2b2b2b; margin: 0 3px; border-radius: 2px; }
  .pagination .router-link-active a { text-decoration: none; color: #2b2b2b; display: block; }
  .pagination .router-link-exact-active { background: #0E4AA3; color: #fff; }
  .pagination .router-link-exact-active a { color: #fff !important; }
  .pagination .el-pager li { width: 30px!important; height: 30px; min-width: 30px; line-height: 31px; }
  .pagination .el-pager { width: 100%; text-align: center; margin-top: 20px; }
  .shop-products { min-height: 464px; }
</style>
