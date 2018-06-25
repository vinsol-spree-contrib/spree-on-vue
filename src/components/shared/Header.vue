<template>
  <header class="primary-header">
    <div class="container relative">
      <app-logo></app-logo>
      <app-navigation></app-navigation>
      <app-cart></app-cart>
      <app-user></app-user>
    </div>
  </header>
</template>

<script>
  import Logo from './Logo.vue';
  import Navigation from './Navigation.vue';
  import MiniCart from './MiniCart.vue';
  import UserOptions from './UserOptions.vue';

  export default {
    name: 'app-header',
    components: {
      appLogo: Logo,
      appNavigation: Navigation,
      appCart: MiniCart,
      appUser: UserOptions
    },

    mounted() {
      this.$store.dispatch('fetchUserCurrentOrders');
    },
  }
</script>
