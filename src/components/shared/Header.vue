<template>
  <header class="primary-header">
    <section class="header-top">
      <app-logo></app-logo>
      <transition name="el-fade-in-linear" mode="out-in">
        <div v-if="!isLoginView">
          <app-search ></app-search>
          <app-cart></app-cart>
          <app-user></app-user>
        </div>
      </transition>
    </section>

    <el-collapse-transition>
      <section class="header-bottom" v-if="!isLoginView">
        <app-navigation></app-navigation>
      </section>
    </el-collapse-transition>
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
      !this.isCheckoutView ? this.$store.dispatch('fetchUserCurrentOrders') : false;
    },

    computed: {
      isLoginView() {
        return this.$route.path == "/entry";
      },

      isCheckoutView() {
        return this.$route.path == "/checkout";
      }
    }
  }
</script>

<style>
  .primary-header .header-top { min-height: 75px; position: relative; background: #f5f5f5; z-index: 10; }
  .menu-btn i { color: #0E4AA3; }
  .el-message { top: 145px !important; }
</style>
