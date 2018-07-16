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
            
            <div class="quantity-selector">
              <strong class="product-price">{{ currentVariant.display_price }}</strong>
              <el-input-number v-model="quantity" @change="handleChange" :min="1" :max="10" v-if="loggedIn" size="small"></el-input-number>
            </div>

            <el-tabs v-model="activeName">
              <el-tab-pane label="Description" name="first">
                <p class="product-description">{{ currentVariant.description }}</p>
              </el-tab-pane>
              <el-tab-pane label="Variants" :name="variants[1] ? 'second' : 'first'" v-if="variants.length > 1">
                <el-row :gutter="10" class="variants-row">
                  <el-col :class="{'active': !!selectedVariant && (variant.id === selectedVariant.id) }" :span="4" v-if="variants && !variant.is_master" v-for="variant in variants" :key="variant.id" @click.native="changeVariant(variant)" style="cursor: pointer;">
                    <img :src="images[variant.image_ids[0]].small_url" alt="">
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="Properties" v-if="properties.length > 1">
                <ul class="properties-list">
                  <li v-for="property in properties" :key="property.id">
                    <el-tag>
                      <strong class="text-uppercase">{{ property.presentation }}:</strong> {{ property.value }}
                    </el-tag>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
            
            <div class="product-show-buttons">
              <el-button type="primary" class="btn-add" v-if="loggedIn" @click="onAddToCart">Add to basket</el-button>
              <router-link to="/entry" v-else>
                <el-button type="primary" class="btn-add">
                  Login to add
                </el-button>
              </router-link>
            </div>

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
        activeName: 'first',
      }
    },

    watch: {
      '$route.params.slug': function() {
        this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug);
        this.selectedVariant = null;
        this.activeName = 'first';
      }
    },

    created() {
      this.$store.dispatch(types.FETCH_PRODUCT, this.$route.params.slug);
    },

    computed: {
      ...mapGetters({
        productInformation: types.GET_PRODUCT,
        cartErrors: 'getCartErrors',
        alertMessage: 'getAlertMessage',
        loggedIn: 'isAuthenticated'
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
      },

      handleChange(value) {
        console.log(value)
      }
    },
  }
</script>

<style>
  .product-image { border: 1px solid #ddd; }
  .products .offset-vertical { padding-top: 55px; }
  .product-name { font-size: 24px; line-height: 36px; margin: 0; }
  .product-price { font-size: 19px; margin-top: 20px; margin-bottom: 20px; display: inline-block; color: #0E4AA3; margin-right: 25px; position: relative; top: 2px; }
  .product-description { font-size: 14px; line-height: 22px; }
  .el-tabs__item { font-size: 16px; font-family: 'AvenirLTStd-Heavy'; }
  .el-tabs__header { margin-bottom: 5px; }
  .properties-list { padding: 0; margin: 15px -5px 15px -5px; font-size: 0; }
  .properties-list li { display: inline-block; margin: 5px; width: calc(50% - 10px); }
  .properties-list .el-tag { font-size: 13px; width: 100%; }
  .btn-add { width: 60%; height: 50px; margin-top: 12px; text-transform: uppercase; font-size: 16px; }
  .el-carousel__arrow { background: #0E4AA3; opacity: .9; }
  .el-carousel__arrow:hover { opacity: 1; background: #0E4AA3; }
  .variants-row { padding: 20px 0; }
  .variants-row .active img { box-sizing: border-box; padding: 5px; border: 2px solid #0E4AA3; }
  .quantity-selector { margin: 10px 0 15px 0; }
  .product-show-buttons { margin-top: 15px; }
</style>
