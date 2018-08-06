<template>
  <section class="checkout offset-vertical">
    <div v-if="order.completed_at == null">

      <el-row>
        <el-col :span="16" :offset="4">
          <h1>Checkout</h1>
        </el-col>
      </el-row>
      
      <section class="step el-row address-step">
        <el-col :span="16" :offset="4" class="step__inner">
          <div class="step__header" :class="{ 'active': order.state != 'address' }">
            <h3 class="h3">Address Details</h3>
            <p class="light-text" v-if="order.state == 'address' ">Add an address to continue.</p>
            <span class="switch" v-if="order.state == 'address'">
              <span>Save Addesss</span>
              <el-switch v-model="saveUserAddress"></el-switch>
            </span>
            <el-tooltip class="item" effect="dark" content="Edit Address details" placement="top">
              <el-button type="primary" class="step-edit-btn" v-if="order.state != 'address'" @click='changeCheckoutState(order.id, "address")' icon="el-icon-edit" circle></el-button>
            </el-tooltip>
          </div>

          <el-collapse-transition>
            <div class="step__body" v-if="order.state == 'address'">
              <el-row :gutter="0" class="step-row">
                <el-col :span="12">
                  <el-card class="box-card billing">
                    <h2 class="h2">Billing Address</h2>
                    <el-form ref="form">

                      <el-row :gutter="15">
                        <el-col :span="12">
                          <el-form-item>
                            <el-input placeholder="First Name" v-model="bill_address_attributes.firstname" clearable></el-input>
                            <el-alert v-if="getAddressErrors['bill_address.firstname']" :title="'First name ' + getAddressErrors['bill_address.firstname'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item>
                            <el-input placeholder="Last Name" v-model="bill_address_attributes.lastname" clearable></el-input>
                            <el-alert v-if="getAddressErrors['bill_address.lastname']" :title="'Last name ' + getAddressErrors['bill_address.lastname'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>

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

                      <el-form-item style="margin-bottom: 0;">
                        <el-input placeholder="Phone" v-model="bill_address_attributes.phone" clearable></el-input>
                        <el-alert v-if="getAddressErrors['bill_address.phone']" :title="'Phone ' + getAddressErrors['bill_address.phone'][0]" type="error"></el-alert>
                      </el-form-item>
                    </el-form>
                  </el-card>
                </el-col>

                <el-col :span="12">
                  <el-card class="box-card shipping">
                    <h2 class="h2 relative">
                      Shipping Address
                      <span class="switch">
                        <span>Same as Billing Address</span>
                        <el-switch v-model="useBilling"></el-switch>
                      </span>
                      
                    </h2>
                    <el-collapse-transition>
                      <el-form ref="form" v-if="!useBilling">

                        <el-row :gutter="15">
                          <el-col :span="12">
                            <el-form-item>
                              <el-input placeholder="First Name" v-model="ship_address_attributes.firstname" clearable></el-input>
                              <el-alert v-if="getAddressErrors['ship_address.firstname']" :title="'First name ' + getAddressErrors['ship_address.firstname'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item>
                              <el-input placeholder="Last Name" v-model="ship_address_attributes.lastname" clearable></el-input>
                              <el-alert v-if="getAddressErrors['ship_address.lastname']" :title="'Last name ' + getAddressErrors['ship_address.lastname'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>

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

                        <el-form-item style="margin-bottom: 0;">
                          <el-input placeholder="Phone" v-model="ship_address_attributes.phone" clearable></el-input>
                          <el-alert v-if="getAddressErrors['ship_address.phone']" :title="'Phone ' + getAddressErrors['ship_address.phone'][0]" type="error"></el-alert>
                        </el-form-item>

                      </el-form>
                    </el-collapse-transition>
                  </el-card>
                  <el-col :span="24" class="text-right">
                    <el-button type="primary" class="checkout-step-btn" @click="nextForDelivery(order.id)">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                  </el-col>
                </el-col>

                
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      </section>

      <section class="step el-row delivery-step">
        <el-col :span="16" :offset="4" class="step__inner">
          <div class="step__header" :class="{ 'active': order.state != 'address' && order.state != 'delivery' }">
            <h3 class="h3">Delivery Details</h3>
            <p class="light-text" v-if="order.state === 'delivery'">Please select the delivery cost.</p>
            <el-tooltip class="item" effect="dark" content="Edit Shipping details" placement="top">
              <el-button type="primary" class="step-edit-btn" v-if="order.state != 'delivery' && order.state != 'address'" @click='changeCheckoutState(order.id, "delivery")' icon="el-icon-edit" circle></el-button>
            </el-tooltip>
          </div>

          <el-collapse-transition>
            <div class="step__body" v-if="order.state == 'delivery'">
              <el-row>
                <el-col :span="22" :offset="1">
                  <div class="shipping-rate-list">

                    <div v-for="(shipment, index) in getCartItems.shipments" :key="shipment.id">
                      <el-table border :data="shipment.line_item_ids" class="delivery-table">
                        <el-table-column label="Product Image" align="center" width="125">
                          <template slot-scope="scope">
                            <img :src="images[variants[lineItems[scope.row].variant_id].image_ids[0]].small_url" alt="">
                          </template>
                        </el-table-column>
                        <el-table-column label="Name" align="left" width="455">
                          <template slot-scope="scope">
                            <router-link :to="'/products/' + variants[lineItems[scope.row].variant_id].slug" tag="h3" class="product-link">
                              {{ variants[lineItems[scope.row].variant_id].name }}
                            </router-link>
                          </template>
                        </el-table-column>
                        <el-table-column label="Quantity" align="center" width="150">
                          <template slot-scope="scope">
                            <el-tag>{{ lineItems[scope.row].quantity }}</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column label="Price" align="right" width="150">
                          <template slot-scope="scope">
                            <strong>
                              {{ variants[lineItems[scope.row].variant_id].display_price }}
                            </strong>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div v-for="rate in shipment.shipping_rate_ids" :key="rate.id">
                        <input type="radio" :value="shippingRates[rate].id" v-model="shippingRateIds[index]" :checked="shippingRates[rate].selected" :name="'rate_' + (index + 1)">
                        <label>{{shippingRates[rate].name}}</label>
                      </div>
                    </div>

                  </div>
                </el-col>

                <el-col :span="24" class="text-right">
                  <el-button type="primary" class="checkout-step-btn" @click="nextForPayment(order.id)">Continue</el-button>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      </section>

      <section class="step el-row payment-step">
        <el-col :span="16" :offset="4" class="step__inner">
          <div class="step__header">
            <h3 class="h3">Payment Details</h3>
            <p class="light-text" v-if="order.state === 'payment'">Please select your preferred mode of payment.</p>
            <el-button type="primary" class="step-edit-btn" v-if="order.state != 'payment' && order.state != 'delivery' && order.state != 'address'" @click='changeCheckoutState(order.id, "payment")' icon="el-icon-edit">Edit</el-button>
          </div>
          <el-collapse-transition>
            <div class="step__body" v-if="order.state == 'payment'">
              <el-row>
                <el-col :span="22" :offset="1">
                  <h4>Select Payment method</h4>
                  <div class="payment-method" v-for="method in paymentMethods" :key="method.id" v-if="method.name == 'Check' ">
                    <input type="radio" :value="method.id" name="payments" v-model="paymentMethodId" checked :id="method.name">
                    <label :for="method.name">{{ method.description }}</label>
                  </div>
                </el-col>

                <el-col :span="24" class="text-right">
                  <el-button type="primary" class="checkout-step-btn" @click="nextForConfirm(order.id)" :disabled="!paymentMethodId">Continue</el-button>
                </el-col>
              </el-row>    
            </div>
          </el-collapse-transition>
        </el-col>
      </section>
    </div>

    <div v-else>
      <h2 class="text-center">Your order has been processed successfully.</h2>
    </div>

  </section>
</template>

<script>
  import axios from 'axios';
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
      },

      lineItems() {
        return helpers.arrayToObject(this.getCartItems.line_items || [], "id");
      },

      images() {
        return helpers.arrayToObject(this.getCartItems.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.getCartItems.variants || [], "id");
      },
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

      resetBillAddressState() {
        var stateIds = this.countries[this.bill_address_attributes.country_id].state_ids;
        this.bill_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
      
      resetShipAddressState() {
        var stateIds = this.countries[this.ship_address_attributes.country_id].state_ids;
        this.ship_address_attributes.state_id = stateIds[stateIds.length - 1];
      },

      changeCheckoutState (orderNumber, state) {
        const formData = {
          'state': state
        }
        this.$store.dispatch('setCheckoutState', { 'number': orderNumber, 'stateData': formData });
      }
    },
  }
</script>

<style>
  .el-select { display: block; }
  .continue-row { margin: 20px 0; }
  .switch { position: absolute; right: 0; font-size: 14px; }
  .switch span { display: inline-block; margin-right: 15px; position: relative; top: 3px; margin-top: -2px; font-weight: bold; }
  .checkout .h2 { margin-bottom: 0; }
  .checkout form { margin-top: 20px; }
  .checkout h1 { margin: 20px 0 40px 0; }
  .light-text { color: #9b9b9b; margin: 0; font-size: 13px; position: relative; top: 2px; }
  .step .h3 { text-transform: uppercase; padding-bottom: 2px; }
  .step__header { padding: 20px; border: 1px solid #ddd; border-bottom: 0; position: relative; }
  .checkout .el-card { border-radius: 0; box-shadow: 0 0 0 transparent; }
  .shipping { border-left: 0 !important; }
  .step__inner { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
  .step__header .switch { top: 50%; transform: translateY(-50%); }
  .checkout .checkout-step-btn { margin-top: 20px; margin-bottom: 20px; margin-right: 15px; width: auto; }
  .checkout .checkout-step-btn i { position: relative; top: 1px; }
  .step + .step { margin-top: 20px; }
  .step__body { border-top: 1px solid #ddd; }
  .step-edit-btn { position: absolute; z-index: 1; right: 15px; top: 50%; transform: translateY(-50%); padding-top: 0; padding-bottom: 0; }
  .step__header.active { background: rgb(231, 237, 246); }
  .step__header.active .h3 { padding: 0; position: relative; top: 1px; }
  .address-step .el-card { border: 0!important; border-bottom: solid 1px #ddd !important; }
  .address-step .el-card.billing { border-right: solid 1px #ddd !important; border-bottom: 0 !important; }
  .step__inner { border-bottom: solid 1px #ddd; }
  .step-row { border: 1px solid #ddd; border-top: 0; }
  .delivery-table { margin-top: 30px; }
  .delivery-step .checkout-step-btn { margin-right: 40px; }
  .delivery-step .step__body, .payment-step .step__body { border: 1px solid #ddd; }
  .payment-step h4 { margin: 20px 0 10px 0; }
  .payment-step label { margin-left: 10px; position: relative; top: 1px; }
</style>
