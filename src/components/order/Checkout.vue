<template>
  <section class="checkout">
    <!-- Login Step -->
    <aside class="checkout-step" :class="{ 'active' : computedOrder.email }">
      <el-row>
        <el-col :span="16" :offset="4" class="step-container">
          <div class="step-header">
            <h2>Login</h2>
            <p class="mini-info">Signed in as <span class="bold-text">{{ computedOrder.email }}</span></p>
            <i class="el-icon-circle-check step-complete"></i>
          </div>
        </el-col>
      </el-row>
    </aside>
    <!-- Login Step -->
  
    <!-- Address Details Step -->
    <aside class="checkout-step" :class="{ 'active' : computedOrder.state != 'address' }">
      <el-row>
        <el-col :span="16" :offset="4" class="step-container">
          <div class="step-header">
            <h2>Address Details</h2>
            <p class="mini-info" v-if="computedOrder.state != 'address'">
              {{ bill_address_attributes.firstname }} {{ bill_address_attributes.lastname }} <span class="divider">|</span> {{ bill_address_attributes.address1 }}, {{ bill_address_attributes.address2 }} - {{ bill_address_attributes.zipcode }}
            </p>
            <i class="el-icon-circle-check step-complete" v-if="computedOrder.state != 'address'"></i>
          </div>
  
          <el-collapse-transition>
            <div class="step-body" v-if="computedOrder.state == 'address'">
              <el-row :gutter="50">
                <el-col :span="12" class="billing-info">
                  <h3>Billing Address</h3>
  
                  <el-form ref="form">
                    <el-row :gutter="14">
                      <el-col :span="12">
                        <el-form-item>
                          <el-input placeholder="First Name*" v-model="bill_address_attributes.firstname" clearable></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item>
                          <el-input placeholder="Last Name*" v-model="bill_address_attributes.lastname" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Street Address*" v-model="bill_address_attributes.address1" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Street Address 2*" v-model="bill_address_attributes.address2" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="City" v-model="bill_address_attributes.city" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-select v-model="bill_address_attributes.country_id" placeholder="Select Country" @change="resetBillAddressState">
                            <el-option v-for="country in computedCountries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item v-if="billingStateRequired">
                          <el-select v-model="bill_address_attributes.state_id" placeholder="Select State">
                            <el-option v-for="state in computedStates" :key="state.id" :label="state.name" :value="state.id" v-if="state.country_id === bill_address_attributes.country_id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Zipcode" v-model="bill_address_attributes.zipcode" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Phone" v-model="bill_address_attributes.phone" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-button type="primary" @click="proceedToDelivery()">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                  </el-form>
  
                </el-col>
                <el-col :span="12">
                  <h3>Shipping Address</h3>
  
                  <el-form ref="form">
                    <el-row :gutter="14">
                      <el-col :span="12">
                        <el-form-item>
                          <el-input placeholder="First Name*" v-model="ship_address_attributes.firstname" clearable></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item>
                          <el-input placeholder="Last Name*" v-model="ship_address_attributes.lastname" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Street Address*" v-model="ship_address_attributes.address1" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Street Address 2*" v-model="ship_address_attributes.address2" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="City" v-model="ship_address_attributes.city" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-select v-model="ship_address_attributes.country_id" placeholder="Select Country" @change="resetShipAddressState">
                            <el-option v-for="country in computedCountries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item v-if="shippingStateRequired">
                          <el-select v-model="ship_address_attributes.state_id" placeholder="Select State">
                            <el-option v-for="state in computedStates" :key="state.id" :label="state.name" :value="state.id" v-if="state.country_id === ship_address_attributes.country_id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Zipcode" v-model="ship_address_attributes.zipcode" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                    <el-row>
                      <el-col :span="24">
                        <el-form-item>
                          <el-input placeholder="Phone" v-model="ship_address_attributes.phone" clearable></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
  
                  </el-form>
  
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      </el-row>
    </aside>
    <!-- Address Details Step -->

    <!-- Delivery Details Step -->
    <aside class="checkout-step" :class="{ 'active' : computedOrder.state != 'address' && computedOrder.state != 'delivery' }">
      <el-row>
        <el-col :span="16" :offset="4" class="step-container">
          <div class="step-header">
            <h2>Delivery Details</h2>
            <p class="mini-info">
              Total Amount: <span class="bold-text">${{ computedOrder.total }}</span>
            </p>
            <i class="el-icon-circle-check step-complete" v-if="computedOrder.state != 'address' && computedOrder.state != 'delivery'"></i>
          </div>

          <el-collapse-transition>
            <div class="step-body" v-if="computedOrder.state == 'delivery'">
              <div v-for="(shipment, index) in computedResponse.shipments" :key="shipment.id">
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
                <el-row :gutter="15" class="rate-row">
                  <el-col :span="24">
                    <h4>Select Shipping Rate</h4>
                  </el-col>
                  <el-col :span="8" v-for="(rate, rateIndex) in shipment.shipping_rate_ids" :key="rate.id">
                    <el-tag class="rate-tag">
                      <input type="radio" :value="rate" :name="'rate_' + (index + 1)" :id="'rate_' + (rateIndex + 1)" v-model="computedShippingRates[index]">
                      {{ rate }} {{ rateIndex }}
                    </el-tag>
                  </el-col>
                </el-row>
              </div>
              <el-button type="primary" class="checkout-step-btn" @click="proceedToPayment()">Continue <i class="el-icon-d-arrow-right"></i></el-button>
            </div>
          </el-collapse-transition>
        </el-col>
      </el-row>
    </aside>
    <!-- Delivery Details Step -->

    <!-- Payment Details Step -->
    <aside class="checkout-step" v-if="computedOrder.state == 'payment'">
      <el-row>
        <el-col :span="16" :offset="4" class="step-container">
          <div class="step-header">
            <h2>Payment Details</h2>
            <p class="mini-info"></p>
            <i class="el-icon-circle-check step-complete" v-if="computedOrder.state == 'confirm'"></i>
          </div>
  
          <div class="step-body">
          </div>
        </el-col>
      </el-row>
    </aside>
    <!-- Payment Details Step -->
  
  </section>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    helpers
  } from '../../store/helpers/helpers';
  
  export default {
    name: 'app-checkout',
  
    data() {
      return {
        order: '',
        paymentMethodId: '',
        bill_address_attributes: {
          firstname: '',
          lastname: '',
          address1: '',
          address2: '',
          city: '',
          phone: '',
          zipcode: '',
          state_id: '',
          country_id: ''
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
          country_id: ''
        },
        useBilling: true,
        saveUserAddress: true,
        shipmentAttributes: {},
        response: ''
      }
    },
  
    mounted() {
      var _this = this;
      this.$store.dispatch('fetchCountries');
      this.$store.dispatch('fetchUserCurrentOrders').then(function() {
        _this.response = _this.orderDetails;
        _this.order = _this.orderDetails.order;
        _this.paymentMethodId = _this.response.payment_methods[0].id;
        _this.bill_address_attributes = Object.assign(_this.bill_address_attributes, _this.addressDetails[_this.order.bill_address_id]);
        _this.ship_address_attributes = Object.assign(_this.ship_address_attributes, _this.addressDetails[_this.order.ship_address_id]);
      });
    },
  
    computed: {
      ...mapGetters({
        orderDetails: 'getCartItems',
        locationDetails: 'getCountries'
      }),
  
      computedResponse() {
        return this.orderDetails || {};
      },
  
      computedOrder() {
        return this.orderDetails.order || {};
      },
  
      computedCountries() {
        return this.computedResponse ? helpers.arrayToObject((this.locationDetails.countries || []), "id") : '';
      },
  
      computedStates() {
        return this.computedResponse ? helpers.arrayToObject((this.locationDetails.states || []), "id") : '';
      },

      billingStateRequired() {
        return this.bill_address_attributes.country_id ? this.computedCountries[this.bill_address_attributes.country_id].states_required : '';
      },

      shippingStateRequired() {
        return this.ship_address_attributes.country_id ? this.computedCountries[this.ship_address_attributes.country_id].states_required : '';
      },
  
      addressDetails() {
        return helpers.arrayToObject((this.computedResponse.addresses), "id");
      },

      lineItems() {
        return helpers.arrayToObject((this.computedResponse.line_items), "id");
      },

      images() {
        return helpers.arrayToObject(this.computedResponse.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.computedResponse.variants || [], "id");
      },

      computedShippingRates() {
        return Object.keys(helpers.arrayToObject((this.computedResponse.shipments || []), 'selected_shipping_rate_id')).reverse() || [];
      }
    },
  
    methods: {
      proceedToDelivery() {
        var _this = this;
        const formData = {
          order: {
            bill_address_attributes: this.bill_address_attributes,
            ship_address_attributes: this.ship_address_attributes,
            use_billing: this.useBilling
          },
          save_user_address: this.saveUserAddress
        }
  
        this.$store.dispatch('proceedToDeliveryState', {
          'number': this.computedOrder.id,
          'addressData': formData
        });
      },
  
      proceedToPayment() {
        var shipmentAttributes = {},
            _this = this;

        this.computedResponse.shipments.forEach(function (shipment, index) {
          shipmentAttributes[index] = {
            "selected_shipping_rate_id": Number(_this.computedShippingRates[index]),
            "id": shipment.id
          }
        });
        
        const formData = {
          order: {
            "shipments_attributes": shipmentAttributes
          }
        }

        this.$store.dispatch('proceedToPaymentState', { 'number': this.computedOrder.id, 'deliveryData': formData });
      },

      resetBillAddressState() {
        var stateIds = this.computedCountries[this.bill_address_attributes.country_id].state_ids;
        this.bill_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
      
      resetShipAddressState() {
        var stateIds = this.computedCountries[this.ship_address_attributes.country_id].state_ids;
        this.ship_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
  
    }
  }
</script>

<style>
  .checkout { padding: 20px 0 0 0; }
  .checkout-step { padding-bottom: 20px; }
  .step-header { padding: 15px 20px 13px 20px; position: relative; transition: padding .3s; }
  .step-complete { position: absolute; left: 10px; font-size: 30px; color: rgb(231, 237, 246); top: 50%; margin-top: -15px; }
  .step-header h2 { margin: 0; font-size: 19px; text-transform: uppercase; }
  .mini-info { margin-top: 2px; margin-bottom: 0; font-size: 13px; }
  .bold-text { color: #0E4AA3; font-family: 'AvenirLTStd-Heavy'; }
  .step-container { border: 1px solid #ddd; transition: .3s; }
  .checkout-step.active .step-container { border-color: #0E4AA3; }
  .checkout-step.active .step-container, .checkout-step.active .bold-text { color: #fff; }
  .checkout-step.active .step-header { background: #0E4AA3; padding-left: 50px; }
  .step-body { padding: 0 20px 30px 20px; border-top: solid 1px #ddd; }
  .step-body h3 { font-size: 16px; text-transform: uppercase; padding-bottom: 10px; padding-top: 30px; }
  .billing-info { border-right: 1px solid #ddd; }
  .checkout .el-input__inner { border-radius: 0; }
  .checkout .el-select { width: 100%; }
  .divider { position: relative; top: -1px; display: inline-block; padding: 0 2px; }
</style>
