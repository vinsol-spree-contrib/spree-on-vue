<template>
  <div class="brand absolute">
    <router-link to="/" tag="a">
      Spree-On-Vue
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'logo'
  }
</script>

<style>
  .brand { font-family: 'Graduate', cursive; position: absolute; left: 50%; transform: translateX(-50%) translateY(-50%); top: 50%; z-index: 1; }
  .brand a { color: #2b2b2b; font-size: 30px; text-decoration: none; text-transform: uppercase; }
</style>

