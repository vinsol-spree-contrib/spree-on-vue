<template>
  <main id="app" :class="{ 'login': isSmallHeader }">
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
    },

    watch: {
      '$route' (to, from) {
        this.$route.path == "/entry" ? '' : localStorage.removeItem('variantID');
      }
    },
  
    computed: {
      isSmallHeader() {
        return this.$route.path == "/entry" || this.$route.path == "/checkout";
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Graduate');
  @import './assets/css/styles.css';
  body {
    margin: 0;
    font-family: 'AvenirLTStd-Roman';
    min-width: 1200px;
  }
  
  #app {
    padding-top: 135px;
  }
  
  #app.login {
    padding-top: 75px;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'AvenirLTStd-Heavy';
  }
  
  body .el-main {
    padding: 0;
  }

  .el-message-box__btns .el-button--primary {
    background: #0e4aa3;
  }
</style>
