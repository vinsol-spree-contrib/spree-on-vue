<template>
  <section class="orders-page">
    <div class="container">
      <h2 class="h2 page-heading text-uppercase">My Orders</h2>
      <div class="container__inner">
        <table class="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment State</th>
              <th>Shipment State</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>
                <router-link :to="'orders/' + order.id">
                  {{ order.id }}
                </router-link>
              </td>
              <td>{{order.completed_at.split('T')[0]}}</td>
              <td class="text-uppercase">{{order.state}}</td>
              <td>{{order.payment_state}}</td>
              <td>{{order.shipment_state}}</td>
              <td class="text-right">${{order.total}}</td>
            </tr>
          </tbody>
        </table>
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

