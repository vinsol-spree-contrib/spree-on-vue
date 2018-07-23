<template>
  <section class="checkout offset-vertical">
    <el-col :span="18" :offset="3">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-card class="box-card">
            <h2 class="h2">Billing Address</h2>
            <el-form ref="form">
              <el-form-item>
                <el-input placeholder="First Name" v-model="bill_address_attributes.firstname" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.firstname']" :title="'First name ' + getAddressErrors['bill_address.firstname'][0]" type="error"></el-alert>
              </el-form-item>

              <el-form-item>
                <el-input placeholder="Last Name" v-model="bill_address_attributes.lastname" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.lastname']" :title="'Last name ' + getAddressErrors['bill_address.lastname'][0]" type="error"></el-alert>
              </el-form-item>

              <el-form-item>
                <el-input placeholder="Address 1" v-model="bill_address_attributes.address1" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.address1']" :title="'Address ' + getAddressErrors['bill_address.address1'][0]" type="error"></el-alert>
              </el-form-item>

              <el-form-item>
                <el-input placeholder="Address 2 (Optional)" v-model="bill_address_attributes.address2" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-input placeholder="City" v-model="bill_address_attributes.city" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.city']" :title="'City name ' + getAddressErrors['bill_address.city'][0]" type="error"></el-alert>
              </el-form-item>
              
              <el-form-item>
                <el-select v-model="bill_address_attributes.country_id" placeholder="Select Country" @change="resetBillAddressState">
                  <el-option v-for="country in getCountries.countries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id">
                  </el-option>
                </el-select>
                <el-alert v-if="getAddressErrors['bill_address.country']" :title="'Country name ' + getAddressErrors['bill_address.country'][0]" type="error"></el-alert>
              </el-form-item>

              <el-collapse-transition>
                <el-form-item v-if="isStateRequired">
                  <el-select v-model="bill_address_attributes.state_id" placeholder="Select State">
                    <el-option v-for="state in states" :key="state.id" :label="state.name" :value="state.id" v-if="state.country_id === bill_address_attributes.country_id">
                    </el-option>
                  </el-select>
                  <el-alert v-if="getAddressErrors['bill_address.state']" :title="'State ' + getAddressErrors['bill_address.state'][0]" type="error"></el-alert>
                </el-form-item>
              </el-collapse-transition>

              <el-form-item>
                <el-input placeholder="Zipcode" v-model="bill_address_attributes.zipcode" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.zipcode']" :title="'Zipcode ' + getAddressErrors['bill_address.zipcode'][0]" type="error"></el-alert>
              </el-form-item>

              <el-form-item>
                <el-input placeholder="Phone" v-model="bill_address_attributes.phone" clearable></el-input>
                <el-alert v-if="getAddressErrors['bill_address.phone']" :title="'Phone ' + getAddressErrors['bill_address.phone'][0]" type="error"></el-alert>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="box-card">
            <h2 class="h2 relative">
              Shipping Address
              <span class="switch">
                <span>Use Billing Address</span>
                <el-switch v-model="useBilling"></el-switch>
              </span>
              
            </h2>
            <el-collapse-transition>
              <el-form ref="form" v-if="!useBilling">

                <el-form-item>
                  <el-input placeholder="First Name" v-model="ship_address_attributes.firstname" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.firstname']" :title="'First name ' + getAddressErrors['ship_address.firstname'][0]" type="error"></el-alert>
                </el-form-item>

                <el-form-item>
                  <el-input placeholder="Last Name" v-model="ship_address_attributes.lastname" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.lastname']" :title="'Last name ' + getAddressErrors['ship_address.lastname'][0]" type="error"></el-alert>
                </el-form-item>

                <el-form-item>
                  <el-input placeholder="Address" v-model="ship_address_attributes.address1" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.address1']" :title="'Address ' + getAddressErrors['ship_address.address1'][0]" type="error"></el-alert>
                </el-form-item>

                <el-form-item>
                  <el-input placeholder="Address 2 (Optional)" v-model="ship_address_attributes.address2" clearable></el-input>
                </el-form-item>

                <el-form-item>
                  <el-input placeholder="City" v-model="ship_address_attributes.city" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.city']" :title="'City name ' + getAddressErrors['ship_address.city'][0]" type="error"></el-alert>
                </el-form-item>

                <el-form-item>
                  <el-select v-model="ship_address_attributes.country_id" placeholder="Select Country" @change="resetShipAddressState">
                    <el-option v-for="country in getCountries.countries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id">
                    </el-option>
                  </el-select>
                  <el-alert v-if="getAddressErrors['ship_address.country']" :title="'Country name ' + getAddressErrors['ship_address.country'][0]" type="error"></el-alert>
                </el-form-item>

                <el-collapse-transition>
                  <el-form-item v-if="isShipStateRequired">
                    <el-select v-model="ship_address_attributes.state_id" placeholder="Select State">
                      <el-option v-for="state in states" :key="state.id" :label="state.name" :value="state.id" v-if="state.country_id === ship_address_attributes.country_id">
                      </el-option>
                    </el-select>
                    <el-alert v-if="getAddressErrors['ship_address.state']" :title="'State ' + getAddressErrors['ship_address.state'][0]" type="error"></el-alert>
                  </el-form-item>
                </el-collapse-transition>

                <el-form-item>
                  <el-input placeholder="Zipcode" v-model="ship_address_attributes.zipcode" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.zipcode']" :title="'Zipcode ' + getAddressErrors['ship_address.zipcode'][0]" type="error"></el-alert>
                </el-form-item>

                <el-form-item>
                  <el-input placeholder="Phone" v-model="ship_address_attributes.phone" clearable></el-input>
                  <el-alert v-if="getAddressErrors['ship_address.phone']" :title="'Phone ' + getAddressErrors['ship_address.phone'][0]" type="error"></el-alert>
                </el-form-item>

              </el-form>
            </el-collapse-transition>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="continue-row">
        <el-col :span="24" class="text-right">
          <el-button type="primary" class="checkout-step-btn" @click="next(order.id)">Continue</el-button>
        </el-col>
      </el-row>
    </el-col>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    
    name: 'app-checkout',

    computed: {
      ...mapGetters(['getCartItems', 'getAddressErrors', 'getCountries', 'getStates']),

      order() {
        return this.getCartItems && this.getCartItems.order ? this.getCartItems.order : {};
      },

      countries() {
        return this.getCountries && this.getCountries.countries ? helpers.arrayToObject( (this.getCountries.countries || []), "id") : {};
      },

      states() {
        return this.getCountries && this.getCountries.states ? helpers.arrayToObject( (this.getCountries.states || []), "id") : {};
      },

      isStateRequired() {
        return this.getCountries && this.getCountries.countries ? this.countries[this.bill_address_attributes.country_id].states_required : false;
      },

      isShipStateRequired() {
        return this.getCountries && this.getCountries.countries ? this.countries[this.ship_address_attributes.country_id].states_required : false;
      }
    },
  
    data() {
      return {
        bill_address_attributes: {
          firstname: '',
          lastname: '',
          address1: '',
          address2: '',
          city: '',
          phone: '',
          zipcode: '',
          state_id: '',
          country_id: null || 3
        },
        ship_address_attributes: {
          firstname: '',
          lastname: '',
          address1: '',
          address2: '',
          city: '',
          phone: '',
          zipcode: '',
          state_id: '',
          country_id: null || 3,
        },
        selectedCountryId: null,
        useBilling: true
      }
    },

    mounted() {
      this.$store.dispatch('fetchCountries');
    },

    methods: {
      next(orderNumber) {
        const formData = {
          order: {
            bill_address_attributes: this.bill_address_attributes,
            ship_address_attributes: this.ship_address_attributes,
            use_billing: this.useBilling
          }
        }
        this.$store.dispatch('proceedToDeliveryState', { 'number': orderNumber, 'addressData': formData });
      },

      resetBillAddressState(stateId) {
        var stateIds = this.countries[this.bill_address_attributes.country_id].state_ids;
        this.bill_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
      
      resetShipAddressState(stateId) {
        var stateIds = this.countries[this.ship_address_attributes.country_id].state_ids;
        this.ship_address_attributes.state_id = stateIds[stateIds.length - 1];
      }
    },
  }
</script>

<style>
  .el-select { display: block; }
  .continue-row { margin: 20px 0; }
  .switch { position: absolute; right: 30px; font-size: 14px; }
  .switch span { display: inline-block; margin-right: 15px; position: relative; top: 3px; margin-top: -2px; }
  .checkout .h2 { margin-bottom: 0; }
  .checkout form { margin-top: 20px; }
</style>
