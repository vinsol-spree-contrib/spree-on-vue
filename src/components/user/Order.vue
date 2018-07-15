<template>
  <section class="my-orders" v-if="order">
    <el-row>
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row class="page-heading-row">
          <el-col :span="24">
            <h2 class="h2">
              Order #{{order.number}}
            </h2>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="Object.values(addresses).length > 0">
          <el-col :span="12">
            <el-card class="box-card">
              <h2 class="h2"><i class="el-icon-location"></i> Billing Address</h2>
              <p>{{ addresses[order.bill_address_id].firstname }} {{ addresses[order.bill_address_id].lastname }}</p>
              <p>{{ addresses[order.bill_address_id].address1 }}</p>
              <p v-if="Object.values(country).length > 0">
                {{ country[addresses[order.bill_address_id].country_id].name }}
                {{ addresses[order.bill_address_id].city }}
              </p>
              <p>{{ addresses[order.bill_address_id].zipcode }}</p>
              <p>{{ addresses[order.bill_address_id].phone }}</p>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="box-card">
              <h2 class="h2"><i class="el-icon-location"></i> Shipping Address</h2>
              <p>{{ addresses[order.ship_address_id].firstname }} {{ addresses[order.ship_address_id].lastname }}</p>
              <p>{{ addresses[order.ship_address_id].address1 }}</p>
              <p v-if="Object.values(country).length > 0">
                {{ country[addresses[order.ship_address_id].country_id].name }}
                {{ addresses[order.ship_address_id].city }}
              </p>
              <p>{{ addresses[order.ship_address_id].zipcode }}</p>
              <p>{{ addresses[order.ship_address_id].phone }}</p>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>  
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'orders',

    mounted () {
      this.$store.dispatch('fetchSingleOrder', this.$route.params.id);
    },

    computed: {
      ...mapGetters(['getSingleOrder']),
      order() {
        return this.getSingleOrder && this.getSingleOrder.order ? this.getSingleOrder.order : {}
      },

      cartItems() {
        return this.getSingleOrder || {};
      },

      images() {
        return helpers.arrayToObject(this.getSingleOrder.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.getSingleOrder.variants || [], "id");
      },

      addresses() {
        return this.getSingleOrder ? helpers.arrayToObject(this.getSingleOrder.addresses || [], "id") : {};
      },

      country() {
        return this.getSingleOrder && this.getSingleOrder.countries ? helpers.arrayToObject(this.getSingleOrder.countries || [], "id") : {};
      },

      paymentMethods() {
        return this.getSingleOrder && this.getSingleOrder.payment_methods ? helpers.arrayToObject(this.getSingleOrder.payment_methods || [], "id") : {};
      },

      payments() {
        if(this.getSingleOrder && this.getSingleOrder.payments) {
          return this.getSingleOrder.payments.filter(function(payment) {
            return payment.state === "completed";
          });
        }
      }
      
    }
  }
</script>

<style>
  .box-card .h2 { padding-top: 0; margin-top: 0; font-size: 20px; }
  .my-orders .box-card p { margin-top: 0; margin-bottom: 0; padding-left: 26px; }
  .my-orders .box-card p + p { margin-top: 7px; }
</style>

