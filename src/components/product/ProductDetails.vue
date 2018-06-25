<template>
  <section class="product">
    <div class="container">
      <div class="container__inner" v-if="!!currentVariant">
        <div class="row narrow">
          <div class="col-md-6 product__image-container text-center">
            <div class="product-image">
              <img :src="productImage" alt="">
              <!-- <img src="../../assets/images/product-img.jpg" alt="" v-if="!images[image]"> -->
            </div>
            <div class="variants-list">
              <div class="variants" v-for="variant in variants" :key="variant.id" @click="changeVariant(variant)">
                <img :src="images[variant.image_ids[0]].small_url" alt="">
              </div>
            </div>
          </div>
          <div class="col-md-6 text-center">
            <aside class="product__details">
              <h2 class="h2 product__name text-uppercase">{{ currentVariant.name }}</h2>
              <p class="product__price">{{ currentVariant.display_price }}</p>
              <p class="product__description">{{ currentVariant.description }}</p>
              <div class="product__quantity">
                <button class="quantity-btn quantity-btn-minus" :disabled="quantity < 2" @click="quantity--"></button>
                <input type="quantity" class="quantity-input text-center" v-model="quantity">
                <a href="javascript:void(0);" class="quantity-btn quantity-btn-plus" @click="quantity++"></a>
              </div>
              <div class="product__add text-center">
                <a href="javascript:void(0);" class="btn btn-red" @click="onAddToCart">Add to basket</a>
              </div>
              <div v-if="cartErrors" class="error-text">
                <strong>{{cartErrors.split(':')[1]}}</strong>
              </div>
            </aside>
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

    data() {
      return {
        quantity: "1",
        selectedVariant: null
      }
    },

    watch: {
      '$route.params.slug': function() {
        this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug);
      }
    },

    created() {
      this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug);
    },

    computed: {
      ...mapGetters({
        productInformation: types.GET_PRODUCT,
        cartErrors: 'getCartErrors'
      }),

      productImage() {
        if(this.currentVariant.image_ids && this.currentVariant.image_ids[0]) {
          return this.images[this.currentVariant.image_ids[0]] && this.images[this.currentVariant.image_ids[0]].product_url;
        } else {
          return ''
        }
      },

      variants() {
        return this.productInformation && this.productInformation.variants ? this.productInformation.variants : [];
      },

      images() {
        return this.productInformation && this.productInformation.images ? 
        helpers.arrayToObject( (this.productInformation.images || []), "id") : {};
      },

      currentVariant() {
        if (this.variants && this.variants.length > 0) {
          var masterVariant = this.variants.filter(function (variant) {
            return variant.is_master;
          });
          return this.selectedVariant || masterVariant[0];
        } else {
          return null;
        }
      }
    },

    methods: {
      changeVariant(variant) {
        this.selectedVariant = variant;
      },

      onAddToCart() {
        const formData = {
          quantity: this.quantity,
          variant_id: this.currentVariant.id
        };

        this.$store.dispatch('addToCart', formData);
      }
    }
  }
</script>

<style scoped>
  .loader {
    background: rgba(255,255,255,0.7);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
</style>
