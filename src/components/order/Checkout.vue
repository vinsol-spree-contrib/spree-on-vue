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
                </el-col>
              </el-row>
              <el-row :gutter="0" class="btns-row">
                <el-col :span="12" class="text-center">
                  <router-link to="/cart">
                    <el-button type="primary" class="checkout-step-btn"><i class="el-icon-d-arrow-left"></i>Back to Cart</el-button>
                  </router-link>
                </el-col>
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click="nextForDelivery(order.id)">Continue <i class="el-icon-d-arrow-right"></i></el-button>
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
                      <el-row :gutter="15" class="rate-row">
                        <el-col :span="24">
                          <h4>Select Shipping Rate</h4>
                        </el-col>
                        <el-col :span="8" v-for="(rate, rateIndex) in shipment.shipping_rate_ids" :key="rate.id">
                          <el-tag class="rate-tag">
                            <div class="rate-list" :class="{ 'active': selectedShippingRates.includes(shippingRates[rate].id) }">
                              <input type="radio" :value="shippingRates[rate].id" v-model="shippingRateIds[index]" :checked="shippingRates[rate].selected" :name="'rate_' + (index + 1)" :id="'rate_' + (rateIndex + 1)">
                              <span class="cus-radio"></span>
                              <label :for="'rate_' + (rateIndex + 1)">
                                {{ shippingRates[rate].name }}
                                <strong>[{{ shippingRates[rate].display_cost }}]</strong>
                              </label>
                            </div>
                          </el-tag>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0" class="btns-row">
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(order.id, "address")'>Edit Address Details <i class="el-icon-edit"></i></el-button>
                </el-col>
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click="nextForPayment(order.id)">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      </section>

      <section class="step el-row payment-step">
        <el-col :span="16" :offset="4" class="step__inner">
          <div class="step__header" :class="{ 'active': order.state == 'confirm' }">
            <h3 class="h3">Payment Details</h3>
            <p class="light-text" v-if="order.state === 'payment'">Please select your preferred mode of payment.</p>
            <el-tooltip class="item" effect="dark" content="Edit Payment details" placement="top">
              <el-button circle type="primary" class="step-edit-btn" v-if="order.state == 'confirm'" @click='changeCheckoutState(order.id, "payment")' icon="el-icon-edit"></el-button>
            </el-tooltip>
          </div>
          <el-collapse-transition>
            <div class="step__body" v-if="order.state == 'payment'">
              <el-row>
                <el-col :span="22" :offset="1">
                  <h4>Select Payment method</h4>

                  <el-row :gutter="15">
                    <el-col :span="8" v-for="(method, index) in paymentMethods" :key="method.id">
                      <el-tag class="payment-tag">
                        <div class="payment-list" :class="{ 'active': paymentMethodId == method.id }">
                          <input type="radio" :value="method.id" name="payments" :checked="index === 0 || paymentMethodId == method.id" :id="method.name" @change="selectedPaymentMethod(method)">
                          <span class="cus-radio"></span>
                          <label :for="method.name">{{ method.name }}</label>
                        </div>
                      </el-tag>
                    </el-col>
                  </el-row>

                  <el-collapse-transition>
                    <el-row v-if="this.paymentMethodName == 'Credit Card'">
                      <el-col :span="12">
                        <div class="card-form">
                          <h4>Enter Card details</h4>
                          <el-form ref="form">
                            <el-row :gutter="10">
                              <el-col :span="24">
                                <el-form-item>
                                  <el-input placeholder="Name On Card" v-model="name" clearable></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item>
                                  <el-input placeholder="Card Number" v-model="number" clearable></el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row :gutter="10">
                              <el-col :span="24">
                                <el-form-item>
                                  <el-select v-model="month" placeholder="Select Expiration Month">
                                    <el-option
                                      v-for="month in months"
                                      :key="month.value"
                                      :label="month.name"
                                      :value="month.value">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item>
                                  <el-select v-model="year" placeholder="Select Expiration Year">
                                    <el-option
                                      v-for="year in years"
                                      :key="year.id"
                                      :label="year.value"
                                      :value="year.value">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item>
                                  <el-input placeholder="Card Code" v-model="verification_value" clearable></el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </el-form>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        
                      </el-col>
                    </el-row>
                  </el-collapse-transition>
                </el-col>
              </el-row>

              <el-row :gutter="0" class="btns-row">
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(order.id, "delivery")'>Edit Delivery Details <i class="el-icon-edit"></i></el-button>
                </el-col>
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click="nextForConfirm(order.id)">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      </section>
      
      <section class="step el-row confirm-step" v-if="order.state == 'confirm'">
        <el-col :span="16" :offset="4" class="step__inner">
          <div class="step__header">
            <h3 class="h3">Order Summary</h3>
            <p class="light-text">Please confirm your order.</p>
          </div>

          <el-collapse-transition>
            <div class="step__body" v-if="order.state == 'confirm'">
              <el-row>
                <el-col :span="22" :offset="1">
                  <el-row :gutter="15">
                    <el-col :span="6">
                      <h4>Billing Address</h4>
                      <p>{{ addresses[order.bill_address_id].firstname}} {{ addresses[order.bill_address_id].lastname }}</p>
                      <p>{{ addresses[order.bill_address_id].address1}} {{ addresses[order.bill_address_id].address2 }}</p>
                      <p>{{ addresses[order.bill_address_id].city }}</p>
                      <p v-if="Object.keys(states).length > 0">{{ states[addresses[order.bill_address_id].state_id].name}}</p>
                      <p v-if="Object.keys(countries).length > 0">{{ countries[addresses[order.bill_address_id].country_id].name}}</p>
                      <p>Phone: {{ addresses[order.bill_address_id].phone }}</p>
                    </el-col>
                    <el-col :span="6">
                      <h4>Shipping Address</h4>
                      <p>{{ addresses[order.ship_address_id].firstname}} {{ addresses[order.ship_address_id].lastname }}</p>
                      <p>{{ addresses[order.ship_address_id].address1}} {{ addresses[order.ship_address_id].address2 }}</p>
                      <p>{{ addresses[order.ship_address_id].city }}</p>
                      <p v-if="Object.keys(states).length > 0">{{ states[addresses[order.ship_address_id].state_id].name}}</p>
                      <p v-if="Object.keys(countries).length > 0">{{ countries[addresses[order.ship_address_id].country_id].name}}</p>
                      <p>Phone: {{ addresses[order.ship_address_id].phone }}</p>
                    </el-col>
                    <el-col :span="6">
                      <h4>Paymnet Information</h4>
                      <p>
                        Card ending in
                        <span v-for="payment in payments" :key="payment.id" v-if="payment.state == 'checkout' ">
                          {{ sources[payment.source_id].last_digits }}
                        </span>
                      </p>
                    </el-col>
                  </el-row>
                  <el-row class="summary-row">
                    <el-col :span="24">
                      <div v-for="shipment in getCartItems.shipments" :key="shipment.id">
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
                        <h4 class="shipping-cost">Shipping cost <el-tag>$ {{shipment.cost}}</el-tag></h4>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="0" class="btns-row">
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(order.id, "payment")'>Edit Payment Details <i class="el-icon-edit"></i></el-button>
                </el-col>
                <el-col :span="12" class="text-center">
                  <el-button type="primary" class="checkout-step-btn" @click="placeOrder(order.id)">Place Order <i class="el-icon-d-arrow-right"></i></el-button>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
          
        </el-col>
      </section>
    </div>

    <div v-if="order.state == 'complete'">
      <h2 class="text-center">Your order has been processed successfully.</h2>
    </div>

  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    
    name: 'app-checkout',

    computed: {
      ...mapGetters(['getCartItems', 'getAddressErrors', 'getCountries', 'getStates', 'getUserDetails']),

      addresses() {
        return this.getCartItems && this.getCartItems.addresses ? helpers.arrayToObject( (this.getCartItems.addresses || []), "id") : {};
      },

      order() {
        return this.getCartItems && this.getCartItems.order ? this.getCartItems.order : {};
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

      payments() {
        return this.getCartItems && this.getCartItems.payments ? this.getCartItems.payments : [];
      },

      sources() {
        return this.getCartItems && this.getCartItems.sources ? helpers.arrayToObject( (this.getCartItems.sources || []), "id") : {};
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

      paymentIds() {
        return (this.paymentMethods || []).filter(function (method) {
          return method.method_type == "gateway";
        });
      },

      selectedShippingRates() {
        return (this.getCartItems.shipping_rates || []).filter(function (rate) {
          return rate.selected;
        });
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
        shippingRateIds: [],
        paymentMethodId: '',
        paymentMethodName: 'Credit Card',
        saveUserAddress: true,
        number: '',
        month: '',
        year: '',
        verification_value: '',
        name: '',
        months: [
          { id: 1, name: 'January', value: '1' },
          { id: 2, name: 'February', value: '2' },
          { id: 3, name: 'March', value: '3' },
          { id: 4, name: 'April', value: '4' },
          { id: 5, name: 'May', value: '5' },
          { id: 6, name: 'June', value: '6' },
          { id: 7, name: 'July' , value: '7' },
          { id: 8, name: 'August' , value: '8' },
          { id: 9, name: 'September' , value: '9' },
          { id: 10, name: 'October', value: '10' },
          { id: 11, name: 'November', value: '11' },
          { id: 12, name: 'December', value: '12' },
        ],
        years: [
          { id: 1, value: "2018" },
          { id: 2, value: "2019" },
          { id: 3, value: "2020" },
          { id: 4, value: "2021" },
          { id: 5, value: "2022" },
          { id: 6, value: "2023" },
          { id: 7, value: "2024" },
          { id: 8, value: "2025" },
          { id: 9, value: "2026" },
          { id: 10, value: "2027" },
          { id: 11, value: "2028" },
          { id: 12, value: "2029" },
          { id: 13, value: "2030" }
        ]
      }
    },

    mounted() {
      this.$store.dispatch('fetchCountries');
      this.setShippingRates();
    },

    created() {
      
    },

    methods: {
      setShippingRates() {
        var _this = this;
        this.selectedShippingRates.forEach(function (rate) {
          _this.shippingRateIds.push(rate.id);
        });
      },

      setPaymentIds() {
        var _this = this;
        this.paymentIds.forEach(function(method) {
          _this.paymentMethodId = method.id;
        });
      },

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
        var shipmentAttributes = {},
            _this = this;
            
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

        this.$store.dispatch('proceedToPaymentState', { 'number': orderNumber, 'deliveryData': formData }).then( function() {
          _this.paymentMethodId = _this.paymentIds[0].id;
        });
      },

      nextForConfirm (orderNumber) {
        var formData = {};

        if(this.paymentMethodName == "Check") {
          formData = {
            'order' : {
              "payments_attributes": [
                {
                  "payment_method_id": this.paymentMethodId
                }
              ]
            }
          };
        } else {
          formData = {
            'order' : {
              "payments_attributes": [
                {
                  "payment_method_id": this.paymentMethodId
                }
              ]
            },

            "payment_source" : {
              [this.paymentMethodId] : {
                "number": this.number,
                "month": this.month,
                "year": this.year,
                "verification_value": this.verification_value,
                "name": this.name
              }
            }
          };
        }
        this.$store.dispatch('proceedToConfirmState', { 'number': orderNumber, 'paymentData': formData });
      },

      placeOrder (orderNumber) {
        this.$store.dispatch('completeOrder', orderNumber);
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
      },

      selectedPaymentMethod(method) {
        this.paymentMethodId = method.id;
        this.paymentMethodName = method.name;
      },

      checkUserAddressData() {
        var _this = this;
        if(Object.values(this.addresses).length > 0) {        
          Object.assign(this.bill_address_attributes, this.addresses[this.order.bill_address_id]);
          Object.assign(this.ship_address_attributes, this.addresses[this.order.ship_address_id]);
        }
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
  .checkout h1 { margin: 0 0 35px 0; font-size: 30px; }
  .light-text { color: #9b9b9b; margin: 0; font-size: 13px; position: relative; top: 2px; }
  .step .h3 { text-transform: uppercase; padding-bottom: 2px; }
  .step__header { padding: 20px; border: 1px solid #ddd; border-bottom: 0; position: relative; }
  .checkout .el-card { border-radius: 0; box-shadow: 0 0 0 transparent; }
  .shipping { border-left: 0 !important; }
  .step__inner { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
  .step__header .switch { top: 50%; transform: translateY(-50%); }
  .checkout .checkout-step-btn { margin-top: 20px; margin-bottom: 20px; width: calc(100% - 40px); }
  .checkout .checkout-step-btn i { position: relative; top: 1px; }
  .step + .step { margin-top: 20px; }
  .step__body { border-top: 1px solid #ddd; }
  .step-edit-btn { position: absolute; z-index: 1; right: 15px; top: 50%; transform: translateY(-50%); padding-top: 0; padding-bottom: 0; }
  .step__header.active { background: rgb(231, 237, 246); }
  .step__header.active .h3 { padding: 0; position: relative; top: 1px; }
  .address-step .el-card { border: 0!important; border-bottom: solid 1px #ddd !important; }
  .address-step .el-card.billing { border-right: solid 1px #ddd !important; border-bottom: 0 !important; }
  .address-step .el-card.shipping { border-bottom: 0 !important; }
  .step__inner { border-bottom: solid 1px #ddd; }
  .step-row { border: 1px solid #ddd; border-top: 0; }
  .delivery-table { margin-top: 30px; }
  .delivery-step .step__body, .payment-step .step__body, .confirm-step .step__body { border: 1px solid #ddd; }
  .delivery-step .btns-row, .payment-step .btns-row { border-top: solid 1px #ddd; border-left: 0; border-right: 0; }
  .payment-step .btns-row { margin-top: 20px; }
  .payment-step h4 { margin: 20px 0 10px 0; }
  .payment-step label { margin-left: 10px; position: relative; top: 1px; }
  .rate-tag, .payment-tag { width: 100%; height: 40px; line-height: 40px; padding: 0; position: relative; }
  .rate-tag input, .payment-tag input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; margin: 0; opacity: 0; }
  .rate-tag label, .payment-tag label { padding-left: 30px; }
  .cus-radio { width: 12px; height: 12px; border-radius: 50%; background: transparent; position: absolute; left: 10px; top: 50%; border: 1px solid #0E4AA3; transition:.3s; transform: translateY(-50%); }
  .rate-tag .active .cus-radio, .rate-tag input:checked + .cus-radio, .payment-tag .active .cus-radio, .payment-tag input:checked + .cus-radio { background: #0E4AA3; }
  .rate-tag *, .payment-tag * { cursor: pointer; }
  .rate-row { margin: 0 0 20px 0; }
  .rate-tag .active, .payment-tag .active { pointer-events: none; }
  .border-top { border-top: solid 1px #ddd; }
  .btns-row { position: relative; border-left: solid 1px #ddd; border-right: solid 1px #ddd; }
  .btns-row .el-col:first-child { border-right: solid 1px #ddd; }
  .btns-row .el-col:first-child i { right: 3px; top: .5px; }
  .confirm-step p { margin: 10px 0; }
  .summary-row { margin-bottom: 40px; }
  .confirm-step .btns-row { border: 0; border-top: 1px solid #ddd; }
  .shipping-cost { margin-top: 20px; }
  .shipping-cost .el-tag { margin-left: 10px; position: relative; top: -2px; }
</style>
