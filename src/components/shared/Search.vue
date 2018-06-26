<template>
  <section class="absolute search-section">
    <input type="text" v-model="searchTerm" @input="onSearch" class="form-input search-input" placeholder="Search">
    <img src="../../assets/images/search.svg" alt="" class="absolute search-icon">
    <ul class="absolute search-results" v-if="isVisible">
      <li v-for="product in products" :key="product.id" class="search-item" v-if="products" @click="hideSearchBox">
        <router-link :to="'/products/' + product.slug">
          <figure>
            <img :src="images[product.image_ids[0]].mini_url" alt="">
          </figure>
          <div class="search-name">
            {{ product.name }}
          </div>
        </router-link>
      </li>

      <li v-else>
        <p>No Result found. Try Again.</p>
      </li>
    </ul>
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
        isVisible: false
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
      }
    },
  }
</script>

<style scoped>
  .search-section { right: 105px; z-index: 1; top: 29px; }
  .search-section .search-icon { right: 10px; top: 50%; transform: translateY(-50%); }
  .search-section .form-input { height: 37px; transition: .25s; width: 250px; min-width: initial; padding-right: 30px; background: #fff; }
  .search-results { width: 100%; background: #fff; top: 38px; border: 1px solid #4D3636; max-height: 250px; overflow-y: auto; overflow-x: hidden; padding-left: 0; margin: 0; }
  .search-results:empty { display: none; }
  .search-results a { display: block; width: 100%; display: flex; padding: 10px; align-items: center; }
  .search-results li + li { border-top: solid 1px #E8EBE8; }
  .search-item figure { width: 40px; text-align: center; }
  .search-item img { width: 40px; }
  .search-name { font-size: 15px; color: #4D3636; padding-left: 10px; }
</style>

