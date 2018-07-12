<template>
  <div class="basket">
    <router-link to="/cart">
      <i class="el-icon-goods"></i>
      <!-- <span class="absolute basket-quantity text-center" v-if="cartItems.order">{{ lineItemCount }}</span> -->
    </router-link>
    <aside class="mini-cart">
      <div v-if="cartItems.order && cartItems.order.item_count > 0">
        <div class="sub-total text-center border-t">Subtotal: <strong>${{ order.total }}</strong></div>
        <div class="mini-cart-item-list">
          <div v-for="item in cartItems.line_items" :key="item.id" class="border-t clearfix minicart-item">
            <div class="minicart-img pull-left">
              <img :src="images[variants[item.variant_id].image_ids[0]].mini_url">
            </div>
            <div class="minicart-details pull-left">
              <router-link :to="{ path: '/products/' + variants[item.variant_id].slug, query: { sku: variants[item.variant_id].sku } }" class="h2 variant-link">
                {{ variants[item.variant_id].name }}
              </router-link>
              <p class="margin-0">{{ item.quantity }} x ${{ variants[item.variant_id].price }}</p>
            </div>
          </div>
        </div>
        <router-link to="/cart" class="btn btn-action btn-block" tag="a">
          View Cart
        </router-link>
      </div>

      <!-- <div v-else>
        <p class="empty-cart-message">Your Cart is empty</p>
      </div> -->
    </aside>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'mini-cart',

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
      emptyCart: function() {
        this.$store.dispatch('emptyCurrentOrder', this.order.id);
      }
    }
  }
</script>

<style>
  .basket { position: absolute; right: 100px; top: 50%; transform: translateY(-50%); font-size: 26px; }
  .basket i { color: #409eff; }
</style>

