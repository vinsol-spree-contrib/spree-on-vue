<template>
  <section class="container" v-if="order">
      <h2 class="h2 text-uppercase text-center">
        Order {{order.number}}
      </h2>

      <section class="basket" v-if="cartItems.order && cartItems.order.item_count > 0">
        <div class="container">
          <ul class="basket__items">
            <li class="basket-item clearfix" v-for="item in cartItems.line_items" :key="item.id">
              <div class="basket-item__image text-center">
                <a href="#">
                  <img :src="images[variants[item.variant_id].image_ids[0]].small_url" class="full">
                </a>
              </div>
              <div class="basket-item__name">
                <h2 class="h2">
                  <router-link :to="{ path: '/products/' + variants[item.variant_id].slug, query: { sku: variants[item.variant_id].sku } }" class="h2 variant-link">
                    {{ variants[item.variant_id].name }}
                  </router-link>
                </h2>
              </div>
              <div class="basket-item__quantity">
                <h4 class="h4">Quantity</h4>
                <div class="product-quantity">
                  <input type="quantity" class="quantity-input text-center" :value="item.quantity" disabled>
                </div>
              </div>
              <div class="basket-item__price">
                <h4 class="h4">Price</h4>
                <p class="price">{{ variants[item.variant_id].display_price }}</p>
              </div>
            </li>
          </ul>
          <div class="basket__details">
            <div class="basket__details__inner">
              <div class="basket__total clearfix">
                <div class="basket__subtotal">
                  <p>Subtotal</p>
                </div>
                <div class="basket__checkout">
                  <p>${{ order.total }}</p>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </section>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'orders',

    mounted () {
      this.$store.dispatch('fetchSingleOrder', this.$route.params.id);
    },

    computed: {
      ...mapGetters(['getSingleOrder']),
      order() {
        return this.getSingleOrder && this.getSingleOrder.order ? this.getSingleOrder.order : {}
      },

      cartItems() {
        return this.getSingleOrder || {};
      },

      images() {
        return helpers.arrayToObject(this.getSingleOrder.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.getSingleOrder.variants || [], "id");
      },
    }
  }
</script>

