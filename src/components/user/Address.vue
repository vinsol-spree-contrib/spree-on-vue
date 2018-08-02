<template>
  <section class="user-addresses">
    <el-row v-if="Object.keys(billAddress).length > 0 && Object.keys(shipAddress).length > 0">
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row :gutter="30">
          <el-col :span="10" :offset="2">
            <el-card class="box-card" v-if="Object.keys(billAddress).length > 0">
              <h2 class="h2">Billing Address</h2>
              <p>Name: <strong>{{ billAddress.full_name }}</strong></p>
              <p>Address: <strong>{{ billAddress.address1 }} {{ billAddress.address2 }}</strong></p>
              <p>City: <strong>{{ billAddress.city }}</strong></p>
              <p>State: <strong>{{ billAddress.state.name }}</strong></p>
              <p>Country: <strong>{{ billAddress.country.name }}</strong></p>
              <p>Zipcode: <strong>{{ billAddress.zipcode }}</strong></p>
              <p>Phone: <strong>{{ billAddress.phone }}</strong></p>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card" v-if="Object.keys(shipAddress).length > 0">
              <h2 class="h2">Shipping Address</h2>
              <p>Name: <strong>{{ shipAddress.full_name }}</strong></p>
              <p>Address: <strong>{{ shipAddress.address1 }} {{ shipAddress.address2 }}</strong></p>
              <p>City: <strong>{{ shipAddress.city }}</strong></p>
              <p>State: <strong>{{ shipAddress.state.name }}</strong></p>
              <p>Country: <strong>{{ shipAddress.country.name }}</strong></p>
              <p>Zipcode: <strong>{{ shipAddress.zipcode }}</strong></p>
              <p>Phone: <strong>{{ shipAddress.phone }}</strong></p>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-else class="pt-50">
      <h1 class="text-center">No Address found!</h1>
    </div>
  </section> 
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'addresses',

    mounted() {
      this.$store.dispatch('fetchUserDetails');
    },

    computed: {
      ...mapGetters(['getUserDetails']),

      billAddress() {
        return this.getUserDetails && this.getUserDetails.bill_address ? this.getUserDetails.bill_address : {};
      },

      shipAddress() {
        return this.getUserDetails && this.getUserDetails.ship_address ? this.getUserDetails.ship_address : {};
      }
    }
  }
</script>

<style>
  .pt-50 { padding-top: 50px; }
</style>
