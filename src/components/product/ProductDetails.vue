<template>
  <section class="product">
    <div class="container">
      <div class="container__inner">
        <div class="row narrow">
          <div class="col-md-6 product__image-container text-center">
            <!-- <img src="../../assets/images/product-img.jpg" alt="" class="product__image"> -->
          </div>
          <div class="col-md-6 text-center" v-if="currentVariant">
            <aside class="product__details">
              <h2 class="h2 product__name text-uppercase">{{ currentVariant.name }}</h2>
              <p class="product__price">{{ currentVariant.display_price }}</p>
              <!-- <p class="product__weight">300g</p> -->
              <p class="product__description">{{ currentVariant.description }}</p>
              <div class="product__add text-center">
                <a href="javascript:void(0);" class="btn btn-red">Add to basket</a>
              </div>
              <div class="product__quantity">
                <a href="javascript:void(0);" class="quantity-btn quantity-btn-minus"></a>
                <input type="text" class="quantity-input text-center" v-model="quantity">
                <a href="javascript:void(0);" class="quantity-btn quantity-btn-plus"></a>
              </div>
              <div class="variants" v-for="variant in variants" :key="variant.id" @click="changeVariant(variant)">
                <h2>{{ variant.sku }}</h2>
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
        quantity: 1,
        selectedVariant: null
      }
    },

    created() {
      this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug)
    },

    computed: {
      ...mapGetters({
        productInformation: types.GET_PRODUCT
      }),

      variants() {
        return this.productInformation && this.productInformation.variants ? this.productInformation.variants : [];
      },

      currentVariant() {
        if (this.variants && this.variants.length > 0) {
          var masterVariant = this.variants.filter(function (variant) {
            return variant.is_master;
          });
          this.selectedVariant = this.selectedVariant || masterVariant[0];
          return this.selectedVariant;
        } else {
          return null;
        }
      },
    },

    methods: {
      changeVariant(variant) {
        this.selectedVariant = variant;
      }
    }
  }
</script>
