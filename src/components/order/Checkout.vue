<template>
  <section class="checkout offset-vertical">
    <el-col :span="18" :offset="3">

      <el-row :gutter="40" v-if="order.state == 'address'">
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

        <el-col :span="24" class="text-right">
          <span class="switch">
            <span>Save Addesss</span>
            <el-switch v-model="saveUserAddress"></el-switch>
          </span>
          <el-button type="primary" class="checkout-step-btn" @click="nextForDelivery(order.id)">Continue</el-button>
        </el-col>
      </el-row>

      <el-row v-if="order.state == 'delivery'">
        <el-col :span="24">
          <h2>Select Shipping Method</h2>
        </el-col>

        <el-col :span="24">
          <div class="shipping-rate-list">

            <div v-for="(shipment, index) in getCartItems.shipments" :key="shipment.id">
              <h3>Shipping Method</h3>
              <div v-for="rate in shipment.shipping_rate_ids" :key="rate.id">
                <input type="radio" :value="shippingRates[rate].id" :name="'rate_' + (index + 1)" v-model="shippingRateIds[index]">
                <label>{{shippingRates[rate].name}}</label>
              </div>
              <br>
            </div>

          </div>
        </el-col>

        <el-col :span="24" class="text-right">
          <el-button type="primary" class="checkout-step-btn" @click="nextForPayment(order.id)">Continue</el-button>
        </el-col>
      </el-row>

      <el-row v-if="order.state == 'payment'">
        <el-col :span="24">
          <h2>Select Payment method</h2>
        </el-col>

        <el-col :span="24">
          <div class="payment-method" v-for="method in paymentMethods" :key="method.id" v-if="method.name == 'Check' ">
            <input type="radio" :value="method.id" name="payments" v-model="paymentMethodId" checked :id="method.name">
            <label :for="method.name">{{ method.description }}</label>
          </div>
        </el-col>

        <el-col :span="24" class="text-right">
          <el-button type="primary" class="checkout-step-btn" @click="nextForConfirm(order.id)" :disabled="!paymentMethodId">Continue</el-button>
        </el-col>
      </el-row>

      <el-row v-if="order.state == 'complete'">
        <el-col :span="24">
          <h2>Your order has been processed successfully</h2>
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
      ...mapGetters(['getCartItems', 'getAddressErrors', 'getCountries', 'getStates', 'getUserDetails', 'getDelivertStateData']),

      order() {
        return this.getCartItems && this.getCartItems.order ? this.getCartItems.order : {};
      },

      currentOrder() {
        return this.getDelivertStateData && this.getDelivertStateData.order ? this.getDelivertStateData.order : {};
      },

      countries() {
        return this.getCountries && this.getCountries.countries ? helpers.arrayToObject( (this.getCountries.countries || []), "id") : {};
      },

      states() {
        return this.getCountries && this.getCountries.states ? helpers.arrayToObject( (this.getCountries.states || []), "id") : {};
      },

      shippingRates() {
        return this.getCartItems && this.getCartItems.shipping_rates ? helpers.arrayToObject( (this.getCartItems.shipping_rates || []), "id") : {};
      },

      isStateRequired() {
        return this.getCountries && this.getCountries.countries ? this.countries[this.bill_address_attributes.country_id].states_required : false;
      },

      isShipStateRequired() {
        return this.getCountries && this.getCountries.countries ? this.countries[this.ship_address_attributes.country_id].states_required : false;
      },

      paymentMethods() {
        return this.getCartItems && this.getCartItems.payment_methods ? this.getCartItems.payment_methods : [];
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
          country_id: null || 232
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
          country_id: null || 232,
        },
        useBilling: true,
        shippingRateIds: [],
        paymentMethodId: null,
        saveUserAddress: true
      }
    },

    mounted() {
      var _this = this;
      this.$store.dispatch('fetchCountries');
    },

    methods: {
      nextForDelivery(orderNumber) {
        const formData = {
          order: {
            bill_address_attributes: this.bill_address_attributes,
            ship_address_attributes: this.ship_address_attributes,
            use_billing: this.useBilling
          },
          save_user_address: this.saveUserAddress
        }
        this.$store.dispatch('proceedToDeliveryState', { 'number': orderNumber, 'addressData': formData });
      },

      nextForPayment(orderNumber) {
        var shipmentAttributes = {}, _this = this;
        for(const [index, shipment] of this.getCartItems.shipments.entries()) {
          shipmentAttributes[index] = {
            "selected_shipping_rate_id": _this.shippingRateIds[index],
            "id": shipment.id
          }
        }
        
        const formData = {
          order: {
            "shipments_attributes": shipmentAttributes
          }
        }

        debugger
        this.$store.dispatch('proceedToPaymentState', { 'number': orderNumber, 'deliveryData': formData });
      },

      nextForConfirm(orderNumber) {

        const formData = {
          'order' : {
            "payments_attributes": [
              {
                "payment_method_id": this.paymentMethodId
              }
            ]
          }  
        };

        this.$store.dispatch('proceedToConfirmState', { 'number': orderNumber, 'paymentData': formData });
      },

      resetBillAddressState(stateId) {
        var stateIds = this.countries[this.bill_address_attributes.country_id].state_ids;
        this.bill_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
      
      resetShipAddressState(stateId) {
        var stateIds = this.countries[this.ship_address_attributes.country_id].state_ids;
        this.ship_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
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
  .checkout h1 { margin: 20px 0 40px 0; }
</style>
