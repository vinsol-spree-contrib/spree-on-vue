<template>
  <header class="primary-header">
    <div class="container relative">
      <app-cart></app-cart>
      <app-logo></app-logo>
      <app-navigation></app-navigation>
    </div>
  </header>
</template>

<script>
  import Logo from './Logo.vue';
  import Navigation from './Navigation.vue';
  import MiniCart from './MiniCart.vue';

  export default {
    name: 'app-header',
    components: {
      appLogo: Logo,
      appNavigation: Navigation,
      appCart: MiniCart
    }
  }
</script>
