<template>
  <div class="basket">
    <router-link to="/cart" :class="{ 'no-pointer': isPathCart }">
      <i class="el-icon-goods"></i>
      <span class="basket-quantity" v-if="cartItems.order && cartItems.order.completed_at == null">{{ lineItemCount}}</span>
      <span class="basket-quantity" v-else>0</span>
    </router-link>
    <!-- <aside class="mini-cart">
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

    </aside> -->
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

      isPathCart() {
        return this.$route.path == '/cart';
      },
    }
  }
</script>

<style>
  .basket { position: absolute; right: 105px; top: 50%; transform: translateY(-50%); font-size: 26px; }
  .basket a { vertical-align: sub; text-decoration: none !important; }
  .basket i { color: #0E4AA3; }
  .basket-quantity { font-size: 11px; position: absolute; background: #0E4AA3; width: 20px; height: 20px; border-radius: 50%; color: #fff; text-align: center; line-height: 23px; bottom: -1px; transform: scale(.9); right: -7px; }
  .no-pointer { pointer-events: none; }
</style>

