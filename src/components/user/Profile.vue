<template>
  <section class="container mx-auto p-8">
    <h2 class="text-md text-grey-darkest text-center">
      Welcome {{ user.email }}
    </h2>
    <div class="text-center my-8">
      <router-link tag="button" to="/orders" class="w-1/6 h-12 btn-lg bg-grey-darkest hover:bg-grey-darker text-white font-bold py-2 px-4 rounded" @click="onViewOrders">View Orders</router-link>
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

