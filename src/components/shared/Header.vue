<template>
  <header class="primary-header">
    <section class="header-top">
      <app-logo></app-logo>
      <section class="menu-btn">
        <i class="el-icon-menu"></i>
      </section>
      <app-cart></app-cart>
      <app-user></app-user>
    </section>
    <section class="header-bottom" v-if="!isLoginView">
      <app-navigation></app-navigation>
    </section>
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

    computed: {
      isLoginView() {
        return this.$route.path == "/entry";
      },
    }
  }
</script>

<style>
  .primary-header .header-top { min-height: 75px; position: relative; background: #f5f5f5; }
  .menu-btn { position: absolute; left: 50px; top: 50%; transform: translateY(-50%); font-size: 26px; }
  .menu-btn i { color: #0E4AA3; }
  .el-message { top: 145px !important; }
</style>
