<template>
  <section class="ccart-page">
    <h1 class="text-center text-uppercase font-black">Order State - [{{order.state}}] [{{order.id}}]</h1>
    <!-- Page heading -->
      <div v-if="cartItems.order && cartItems.order.item_count > 0">
        <section class="page-heading">
          <div class="container">
            <div class="container__inner text-center">
              <h2 class="h2 page-heading__text">Your basket</h2>
            </div>
          </div>
        </section>
        <!-- Page heading -->

        <section class="basket">
          <div class="container">
            <ul class="basket__items">
              <li class="basket-item clearfix" v-for="item in cartItems.line_items" :key="item.id">
                <div class="basket-item__image text-center">
                  <a href="#">
                    <img :src="images[variants[item.variant_id].image_ids[0]].product_url" class="full">
                  </a>
                </div>
                <div class="basket-item__name">
                  <h2 class="h2">
                    <router-link :to="{ path: '/products/' + variants[item.variant_id].slug, query: { sku: variants[item.variant_id].sku } }" class="h2 variant-link">
                      {{ variants[item.variant_id].name }}
                    </router-link>
                  </h2>
                  <p>{{ variants[item.variant_id].description }}</p>
                  <a class="btn btn-plain" @click="deleteItem(order.id, item.id)">Remove item</a>
                </div>
                <div class="basket-item__quantity">
                  <h4 class="h4">Quantity</h4>
                  <div class="product-quantity">
                    <button class="quantity-btn quantity-btn-minus" :disabled="item.quantity < 2" @click="changeQuantity(-1, variants[item.variant_id].id)"></button>
                    <input type="quantity" class="quantity-input text-center" :value="item.quantity" disabled>
                    <a href="javascript:void(0);" class="quantity-btn quantity-btn-plus" @click="changeQuantity(1, variants[item.variant_id].id)"></a>
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
                    <button class="btn btn-red" @click="emptyBasket">Empty Basket</button>
                  </div>
                  <div class="basket__checkout">
                    <p>${{ order.total }}</p>
                    <router-link :to="{ path: '/address' }" @click.native="goToAddress(order.id)" tag="li">
                      <a class="btn btn-light">Proceed to checkout</a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </section>
      </div>

      <section v-else>
        <div class="container text-center empty-basket">
          <h2 class="h2 text-uppercase">Your Basket is empty.</h2>
          <router-link to="/shop" tag="a" class="btn btn-action">Continue Shopping</router-link>
        </div>
      </section>

  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'cart',

    computed: {
      ...mapGetters(['getCartItems', 'isAuthenticated']),

      cartItems() {
        return this.getCartItems || {};
      },

      order() {
        return this.getCartItems.order || {};
      },

      lineItemCount() {
        return this.order.item_count;
      },

      images() {
        return helpers.arrayToObject(this.getCartItems.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.getCartItems.variants || [], "id");
      },
    },

    methods: {
      emptyBasket: function() {
        if(confirm('You are about to remove all the items from you basket.')) {
          this.$store.dispatch('emptyCurrentOrder', this.order.id)
        }
      },

      changeQuantity(itemQuantity, itemId) {
        const formData = {
          quantity: itemQuantity,
          variant_id: itemId
        };
        this.$store.dispatch('addToCart', formData);
      },

      goToAddress(orderId) {
        this.$store.dispatch('proceedToAddressState', orderId);
      },

      deleteItem(orderNumber, lineItemId) {
        this.$store.dispatch('deleteLineItem', { 'number': orderNumber, 'lineItemId': lineItemId });
      }
    }
  }
</script>
