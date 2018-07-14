<template>
  <section class="search-section">
    <section class="search" @click="showSearch">
      <i class="el-icon-search"></i>
    </section>
    <transition name="el-fade-in-linear" mode="out-in">
      <aside class="search-results-container" v-if="searchVisible">
        <div class="close-search" @click="hideSearch">
          <i class="el-icon-close"></i>
        </div>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-input placeholder="Search here..." v-model="searchTerm" class="search-input" @input="onSearch"></el-input>

            <el-row class="page-heading-row" v-if="products.length > 0">
              <el-col :span="24">
                <h2 class="h2">
                   {{ products.length }} product<span v-if="products.length > 1">s</span> found.
                </h2>
              </el-col>
            </el-row>
            
            <el-row :gutter="20" v-if="products.length > 0" class="search-row">
              <el-col :span="6" v-for="product in products" :key="product.id">
                <el-card class="product-card">
                  <router-link :to="'/products/' + product.slug" tag="a" class="product-link" @click.native="hideSearch">
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

            <el-row v-if="products.length === 0 && searchTerm !== '' && searchTerm.length > 2">
              <el-col>
                <h4 class="text-center">We can’t find anything related to your search. <br> Try a different search.</h4>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </aside>
    </transition>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';
  import * as types from '../../store/types';

  export default {
    name: 'Search',

    data() {
      return {
        searchTerm: '',
        isVisible: false,
        searchVisible: false
      }
    },

    computed: {
      ...mapGetters({
        searchResults: types.GET_SEARCH_RESULTS
      }),

      products: {
        get: function () {
          return this.searchResults.products || [];
        },

        set: function (emptyValue) {
          this.searchResults.products = emptyValue;
        }
      },

      isLoginView() {
        return this.$route.path == "/entry";
      },

      images() {
        return helpers.arrayToObject(this.searchResults.images || [], "id");
      }
    },

    methods: {
      onSearch: function() {
        var _this = this;
        document.body.onkeyup = function (event) {
          if (event.keyCode == 32) {
            return
          } else if (_this.searchTerm.length > 2 && event.keyCode != 32) {
              _this.$store.dispatch(types.SEARCH, _this.searchTerm);
              _this.isVisible = true;
          } else {
            _this.products = [];
            _this.isVisible = false;
          }
        }
      },

      hideSearchBox: function () {
        this.products = [];
        this.isVisible = false;
      },

      showSearch: function () {
        this.searchVisible = true;
      },

      hideSearch: function () {
        this.searchVisible = false;
        this.searchTerm = "";
        this.products = [];
      }
    },
  }
</script>

<style>
  .search { position: absolute; left: 50px; top: 50%; transform: translateY(-50%); cursor: pointer; }
  .search i { color: #0E4AA3; font-size: 23px; font-weight: 600; }
  .search-results-container { position: fixed; left: 0; top: 0; width: 100%; height: 100vh; background: rgba(255,255,255,.96); z-index: 10; overflow-y: auto; }
  .close-search { position: absolute; right: 25px; top: 25px; z-index: 5; cursor: pointer; }
  .close-search i { color: #0E4AA3; font-size: 32px; }
  .search-input input { height: 68px; padding-top: 0; padding-bottom: 0; border: 1px solid #ccc; border-radius: 0; font-size: 25px; color: #2b2b2b; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
  .search-row { padding-top: 20px; }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

