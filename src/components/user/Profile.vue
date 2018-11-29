<template>
  <section class="user-profile">
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="user-email">
          <span class="welcome">Welcome</span> 
          <el-tag class="user-tag">
            {{ user.email }}
          </el-tag>
        </div>
        <div class="orders-listing" v-if="orders.length > 0">
          <h2 class="h2 page-heading">My Orders</h2>
          <el-table border :data="orders" style="width: 100%;" class="shadow">
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
          <h1 class="text-center">No orders found!</h1>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Loading } from 'element-ui';

  export default {
    name: 'profile',

    computed: {
      ...mapGetters(['getUserDetails', 'getUserProfileId', 'getAllOrders']),

      user() {
        return this.getUserDetails || {};
      },

      orders() {
        return (this.getAllOrders.orders || []).filter(function (order) {
          return order.state === "complete";
        });
      }
    },

    methods: {
      onViewOrders() {
        this.$store.dispatch('fetchUserOrders');
      }
    },

    mounted () {
      let loadingInstance = Loading.service({ fullscreen: true });
      console.log(loadingInstance);
      this.$store.dispatch('fetchUserOrders').then(function() {
        loadingInstance.close();
        console.log(loadingInstance);
      });
      this.$store.dispatch('fetchUserDetails');
    }
  }
</script>

<style>
  th, td { text-transform: capitalize; }
  .user-tag { font-size: 16px; margin-bottom: 25px; }
  .user-profile { padding-top: 50px; }
  .page-heading { font-size: 24px; text-transform: capitalize; color: #2b2b2b; }
  .shadow { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
  .user-email { text-align: center; padding-top: 15px; font-size: 17px; }
  .welcome { font-family: 'AvenirLTStd-Heavy'; display: block; padding-bottom: 10px; }
  .orders-listing { margin-top: 30px; }
  .text-center { text-align: center; }
</style>
