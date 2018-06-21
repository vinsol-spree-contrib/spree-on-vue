<template>
  <main id="app">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </main>
</template>

<script>
  import Header from './components/shared/Header.vue';
  import Home from './components/home/Home.vue';
  import Footer from './components/shared/Footer.vue';

  export default {
    name: 'app',
    components: {
      appHeader: Header,
      appHome: Home,
      appFooter: Footer
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Merienda');
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import './assets/css/styles.css';
</style>
