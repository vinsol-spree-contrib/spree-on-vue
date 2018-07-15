<template>
  <section class="products">
    <el-row class="offset-vertical">
      <el-col :span="20" :offset="2" v-if="!!currentVariant">
        <el-row :gutter="30">
          <el-col :span="10">
            <el-carousel height="532px" indicator-position="none" v-if="productImages.length > 1">
              <el-carousel-item v-for="image in productImages" :key="image.id">
                <img :src="images[image].large_url" alt="">
              </el-carousel-item>
            </el-carousel>
            <img :src="images[productImages].large_url" alt="" v-else>
          </el-col>
          <el-col :span="11" :offset="1">
            <h2 class="h2 product-name">{{ currentVariant.name }}</h2>
            <strong class="product-price">{{ currentVariant.display_price }}</strong>
            <el-tabs v-model="activeName">
              <el-tab-pane label="Description" name="first">
                <p class="product-description">{{ currentVariant.description }}</p>
              </el-tab-pane>
              <el-tab-pane label="Properties" name="second">
                <ul class="properties-list">
                  <li v-for="property in properties" :key="property.id">
                    <el-tag>
                      <strong class="text-uppercase">{{ property.presentation }}:</strong> {{ property.value }}
                    </el-tag>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
            <div class="variants-list">
              <div class="variants" v-if="variants" v-for="variant in variants" :key="variant.id" @click="changeVariant(variant)" :title="variant.options_text">
                <img :src="images[variant.image_ids[0]].mini_url" alt="">
              </div>
            </div>
            <el-button type="primary" class="btn-add" @click="onAddToCart">Add to basket</el-button>
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
    name: 'product-details',

    data() {
      return {
        quantity: "1",
        selectedVariant: null,
        activeName: 'first'
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

      productImages() {
        if(this.currentVariant.image_ids && this.currentVariant.image_ids) {
          return this.currentVariant.image_ids && this.currentVariant.image_ids;
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
  }
</script>

<style>
  .product-image { border: 1px solid #ddd; }
  .products .offset-vertical { padding-top: 55px; }
  .product-name { font-size: 24px; line-height: 36px; margin: 0; }
  .product-price { font-size: 19px; margin-top: 20px; margin-bottom: 20px; display: block; color: #0E4AA3; }
  .product-description { font-size: 14px; line-height: 22px; }
  .el-tabs__item { font-size: 16px; font-family: 'AvenirLTStd-Heavy'; }
  .el-tabs__header { margin-bottom: 5px; }
  .properties-list { padding: 0; margin: 10px -5px 10px -5px; font-size: 0; }
  .properties-list li { display: inline-block; margin: 5px; width: calc(50% - 10px); }
  .properties-list .el-tag { font-size: 13px; width: 100%; }
  .btn-add { width: 60%; height: 55px; margin-top: 12px; text-transform: uppercase; }
  .el-carousel__arrow { background: #0E4AA3; opacity: .9; }
  .el-carousel__arrow:hover { opacity: 1; background: #0E4AA3; }
</style>
