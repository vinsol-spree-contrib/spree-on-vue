<template>
  <section class="my-orders">
    <div class="ordes-listing" v-if="orders.length > 0">
      <h2 class="h2 page-heading text-uppercase">My Orders</h2>
      <el-table border :data="orders" style="width: 100%">
        <el-table-column prop="id" label="Order Number" align="center"></el-table-column>
        <el-table-column label="Date" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.completed_at.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="Status" width="175" align="center"></el-table-column>
        <el-table-column prop="payment_state" label="Payment" width="175" align="center"></el-table-column>
        <el-table-column prop="shipment_state" label="Shipment State" width="175" align="center"></el-table-column>
        <el-table-column label="Total" width="125" align="right">
          <template slot-scope="scope">
            <strong>${{ scope.row.total }}</strong>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="140" align="right">
          <template slot-scope="scope">
            <router-link :to="'orders/'+ scope.row.id">
              <el-button size="medium" type="primary" plain>Details <i class="el-icon-circle-plus"></i> </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <h1>No orders found!</h1>
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
    },
  }
</script>

<style>
  th, td { text-transform: capitalize; }
</style>
