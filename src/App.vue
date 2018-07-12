<template>
  <main id="app">
    <app-header></app-header>
    <el-col :span="20" :offset="2">
      <router-view class="router-view"></router-view>
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
  @import './assets/css/styles.css';
  body { margin: 0; font-family:'AvenirLTStd-Roman'; }
  body .el-main { padding: 0; }
  
</style>
