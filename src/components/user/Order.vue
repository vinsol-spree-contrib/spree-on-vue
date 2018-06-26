<template>
  <section class="container">
    <div class="container__inner">
      <div class="h2">
        In Progress
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'orders',

    mounted () {
      this.$store.dispatch('fetchSingleOrder', this.$route.params.id);
    },

    computed: {
      ...mapGetters(['getSingleOrder']),
    }
  }
</script>

