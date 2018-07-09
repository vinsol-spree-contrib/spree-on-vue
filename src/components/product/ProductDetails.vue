<template>
  <section class="product">
    <div class="container">
      <div class="container__inner" v-if="!!currentVariant">
        <div class="row narrow">
          <div class="col-md-6 product__image-container text-center">
            <div class="product-image">
              <img :src="productImage" alt="">
            </div>
            <div class="variants-list">
              <div class="variants" v-for="variant in variants" :key="variant.id" @click="changeVariant(variant)" :title="variant.options_text">
                <img :src="images[variant.image_ids[0]].small_url" alt="">
              </div>
            </div>
          </div>
          <div class="col-md-6 text-center">
            <aside class="product__details">
              <h2 class="h2 product__name text-uppercase">{{ currentVariant.name }}</h2>
              <p class="product__price">{{ currentVariant.display_price }}</p>
              <p class="product__description">{{ currentVariant.description }}</p>
              <ul style="padding: 0;" class="row">
                <li v-for="property in properties" :key="property.id" class="col-md-6">
                  <div>
                    <strong class="font-heavy">{{ property.presentation }}:</strong> {{ property.value }}
                  </div>
                </li>
              </ul>
              <div class="product__quantity">
                <button class="quantity-btn quantity-btn-minus" :disabled="quantity < 2" @click="quantity--"></button>
                <input type="quantity" class="quantity-input text-center" v-model="quantity">
                <a href="javascript:void(0);" class="quantity-btn quantity-btn-plus" @click="quantity++"></a>
              </div>
              <div class="product__add text-center">
                <a href="javascript:void(0);" class="btn btn-red" @click="onAddToCart">Add to basket</a>
              </div>
              <div class="alert" v-if="!cartErrors" :class= "{ 'alert-success' : alertMessage.type === 'success' }" >
                {{alertMessage.message}}
              </div>
              <div class="alert" v-if="cartErrors && alertMessage.type === 'error'" :class= "{ 'alert-danger' : alertMessage.type === 'error' }">
                <strong>{{cartErrors}}</strong>
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
        cartErrors: 'getCartErrors',
        alertMessage: 'getAlertMessage'
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

      properties() {
        return this.productInformation && this.productInformation.product_properties ? this.productInformation.product_properties : [];
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
    },

    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('showMessage', {
        message: '',
        type: ''
      });
      next();
    }
  }
</script>
