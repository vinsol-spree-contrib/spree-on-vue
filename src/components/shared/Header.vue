<template>
<div>
  <section>
    <!-- <div class="container clearfix">
        <div>
          <p>Subtotal: ${{order.total}}</p>
          <p>Quantity: {{ lineItemCount }}</p>

          <div v-for="item in cartItems.line_items" :key="item.id">
            {{ variants[item.variant_id].name }}
            {{ item.quantity }} x ${{ variants[item.variant_id].price }}
            <img :src="images[variants[item.variant_id].image_ids[0]].mini_url">
          </div>
        </div>
      </div> -->
  </section>
  <header class="primary-header">
    <div class="container relative">
      <app-logo></app-logo>
      <app-navigation></app-navigation>
      <app-cart></app-cart>
      <app-user></app-user>
    </div>
  </header>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from './Logo.vue';
  import Navigation from './Navigation.vue';
  import MiniCart from './MiniCart.vue';
  import UserOptions from './UserOptions.vue';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'app-header',
    components: {
      appLogo: Logo,
      appNavigation: Navigation,
      appCart: MiniCart,
      appUser: UserOptions
    },

    computed: {
      ...mapGetters(['getCartItems']),
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

    mounted() {
      this.$store.dispatch('fetchUserCurrentOrders');
    }
  }
</script>
