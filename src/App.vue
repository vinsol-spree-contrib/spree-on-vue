<template>
  <main id="app">
    <app-header></app-header>
    <el-col :span="24" class="top-container">
      <transition name="el-fade-in-linear" mode="out-in">
        <router-view class="router-view"></router-view>
      </transition>
    </el-col>
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
    },

    created() {
      this.$store.dispatch('tryAutoLogin');
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Graduate');
  @import './assets/css/styles.css';
  body { margin: 0; font-family: 'AvenirLTStd-Roman'; }
  h1, h2, h3, h4, h5, h6 { font-family: 'AvenirLTStd-Heavy'; }
  body .el-main { padding: 0; }
</style>
