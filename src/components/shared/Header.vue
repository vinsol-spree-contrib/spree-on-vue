<template>
  <header class="primary-header">
    <div class="container relative">
      <app-logo></app-logo>
      <app-navigation></app-navigation>
      <app-cart></app-cart>
      <app-user></app-user>
      <app-search></app-search>
    </div>
  </header>
</template>

<script>
  import Logo from './Logo.vue';
  import Navigation from './Navigation.vue';
  import MiniCart from './MiniCart.vue';
  import UserOptions from './UserOptions.vue';
  import Search from './Search.vue';

  export default {
    name: 'app-header',
    components: {
      appLogo: Logo,
      appNavigation: Navigation,
      appCart: MiniCart,
      appUser: UserOptions,
      appSearch: Search
    },

    mounted() {
      this.$store.dispatch('fetchUserCurrentOrders');
    },
  }
</script>
