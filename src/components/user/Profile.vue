<template>
  <section class="container mx-auto text-center welcome">
    <h2 class="h2">
      Welcome {{ user.email }}
    </h2>
    <div class="text-center my-8">
      <router-link tag="button" to="/orders" class="btn btn-action" @click="onViewOrders">View Orders</router-link>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'profile',

    computed: {
      ...mapGetters(['getLogedInUser', 'getUserProfileId']),

      user() {
        return this.getLogedInUser || {};
      }
    },

    methods: {
      onViewOrders() {
        this.$store.dispatch('fetchUserOrders');
      }
    },

    mounted () {
      this.$store.dispatch('fetchUser');
    }
  }
</script>

