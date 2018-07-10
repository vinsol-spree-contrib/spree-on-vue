<template>
  <section>
    <section class="three-column-layout online-shop">
      <div class="container">
        <div class="container__inner">
          <h2 class="h2 text-uppercase text-center">Online Shop</h2>
          <div class="row narrow three-column-layout__row" v-if="products.length > 0">
            <div class="col-md-4 col-sm-4 col-xs-12 three-column-layout__item border-r border-y text-center" v-for="product in products" :key="product.id">
              <router-link :to="'/products/' + product.slug" tag="a" class="three-column-layout__link no-underline">
                <figure class="three-column-layout__figure">
                  <img :src="'http://localhost:3000/' + product.master.images[0].product_url" alt="" class="three-column-layout__image">
                </figure>
              <div class="three-column-layout__content">
                <h3 class="three-column-layout__heading margin-0">{{ product.name }}</h3>
                <p class="three-column-layout__text margin-0">{{ product.display_price }}</p>
              </div>
              </router-link>
              
            </div>
          </div>
          <div v-else class="loader">
            <div class="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

<style scoped>
  .loader {
    height: calc(100vh - 225px);
    background: #fff;
    text-align: center;
    position: relative;
  }

  .lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -32px;
  margin-left: -32px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4D3636;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.three-column-layout__item {
  margin-top: -1px;
}
</style>
