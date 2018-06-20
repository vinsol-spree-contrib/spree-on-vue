<template>
  <main id="app">
    <app-header></app-header>
  </main>
</template>

<script>
import Header from './components/shared/Header.vue';

export default {
  name: 'app',
  components: {
    appHeader: Header
  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import './assets/css/styles.css';
</style>
