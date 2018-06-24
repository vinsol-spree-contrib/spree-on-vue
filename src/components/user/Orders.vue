<template>
  <section class="container">
    <!-- {{getAllOrders}} -->
    <div class="container__inner">
      <div class="my-orders" v-for="order in orders" :key="order.id">
        <router-link :to="'orders/' + order.id">{{ order.id }}</router-link>
        {{order.completed_at.split('T')[0]}}
        {{order.state}}
        {{order.payment_state}}
        {{order.shipment_state}}
        ${{order.total}}
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'orders',

    mounted () {
      this.$store.dispatch('fetchUserOrders');
    },

    computed: {
      ...mapGetters({
        myOrders: 'getAllOrders'
      }),

      orders() {
        return (this.myOrders.orders || []).filter(function (order) {
          return order.state === "complete";
        });
      }
    }
  }
</script>

