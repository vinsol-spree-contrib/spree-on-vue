<template>
  <section class="container address">
    <form @submit.prevent="next(order.number)">
      <div class="row">
        <div class="col-md-4 col-md-offset-1">
          <h2 class="h2 text-center text-uppercase">Billing Address</h2>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="First Name" v-model="bill_address_attributes.first_name">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Last Name" v-model="bill_address_attributes.last_name">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Address" v-model="bill_address_attributes.address1">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="City" v-model="bill_address_attributes.city">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Country" v-model="bill_address_attributes.country_id">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="State" v-model="bill_address_attributes.state_id">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Zip code" v-model="bill_address_attributes.zipcode">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Contact Number" v-model="bill_address_attributes.phone">
          </div>
        </div>
        <div class="col-md-offset-2 col-md-4">
          <h2 class="h2 text-center text-uppercase">Shipping Address</h2>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="First Name" v-model="ship_address_attributes.first_name">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Last Name" v-model="ship_address_attributes.last_name">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Address" v-model="ship_address_attributes.address1">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="City" v-model="ship_address_attributes.city">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Country" v-model="ship_address_attributes.country_id">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="State" v-model="ship_address_attributes.state_id">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Zip code" v-model="ship_address_attributes.zipcode">
          </div>
          <div class="form-group">
            <input type="text" class="form-input full" placeholder="Contact Number" v-model="ship_address_attributes.phone">
          </div>
          <button type="submit">Next</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    
    name: 'app-address',

    computed: {
      ...mapGetters(['getCartItems']),

      order() {
        return this.getCartItems && this.getCartItems.order ? this.getCartItems.order : {};
      },
    },
  
    data() {
      return {
        bill_address_attributes: {
          first_name: '',
          last_name: '',
          address1: '',
          city: '',
          phone: '',
          zipcode: '',
          state_id: '',
          country_id: '',
        },

        ship_address_attributes: {
          first_name: '',
          last_name: '',
          address1: '',
          city: '',
          phone: '',
          zipcode: '',
          state_id: '',
          country_id: '',
        },
      }
    },

    methods: {
      next(orderNumber) {
        const formData = {
          bill_address_attributes: this.bill_address_attributes,
          ship_address_attributes: this.ship_address_attributes
        }
        this.$store.dispatch('proceedToDeliveryState', { 'number': orderNumber, 'addressData': formData });
      }
    }
  }
</script>
