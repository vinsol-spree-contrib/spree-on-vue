<template>
  <section class="checkout">
    <div v-if="computedOrder.item_count > 0 && computedOrder.state != 'complete'">
      <!-- Login Step -->
      <aside class="checkout-step active">
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
      <aside class="checkout-step" :class="{ 'active' : computedOrder.state != 'address' && computedOrder.state != 'cart' }">
        <el-row>
          <el-col :span="16" :offset="4" class="step-container">
            <div class="step-header">
              <h2>Address Details</h2>
              <p class="mini-info" v-if="computedOrder.state != 'address' && computedOrder.state != 'cart'">
                {{ bill_address_attributes.firstname }} {{ bill_address_attributes.lastname }} <span class="divider">|</span> {{ bill_address_attributes.address1 }}, {{ bill_address_attributes.address2 }} - {{ bill_address_attributes.zipcode }}
              </p>
              <i class="el-icon-circle-check step-complete" v-if="computedOrder.state != 'address' && computedOrder.state != 'cart'"></i>
              <el-button type="primary" class="step-edit-btn" v-if="computedOrder.state != 'address' && computedOrder.state != 'cart'" @click='changeCheckoutState(order.id, "address")'>Edit Address Details</el-button>
              <span class="switch" v-if="computedOrder.state == 'address'">
                <span>Save Addesss</span>
                <el-switch v-model="saveUserAddress"></el-switch>
              </span>
            </div>
    
            <el-collapse-transition>
              <div class="step-body" v-if="computedOrder.state == 'address' || computedOrder.state == 'cart'">
                <el-row :gutter="50">
                  <el-col :span="12" class="billing-info">
                    <h3>Billing Address</h3>
    
                    <el-form ref="form">
                      <el-row :gutter="14">
                        <el-col :span="12">
                          <el-form-item>
                            <el-input placeholder="First Name*" v-model="bill_address_attributes.firstname" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.firstname']" :title="'First name ' + addressErrors['bill_address.firstname'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item>
                            <el-input placeholder="Last Name*" v-model="bill_address_attributes.lastname" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.lastname']" :title="'Last name ' + addressErrors['bill_address.lastname'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-input placeholder="Street Address*" v-model="bill_address_attributes.address1" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.address1']" :title="'Address 1 ' + addressErrors['bill_address.address1'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-input placeholder="Street Address 2" v-model="bill_address_attributes.address2" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-input placeholder="City" v-model="bill_address_attributes.city" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.city']" :title="'City name ' + addressErrors['bill_address.city'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-select v-model="bill_address_attributes.country_id" placeholder="Select Country" @change="resetBillAddressState">
                              <el-option v-for="country in computedCountries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id"></el-option>
                            </el-select>
                            <el-alert v-if="addressErrors['bill_address.country']" :title="'Country name ' + addressErrors['bill_address.country'][0]" type="error"></el-alert>
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
                            <el-alert v-if="addressErrors['bill_address.state']" :title="'State name ' + addressErrors['bill_address.state'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-input placeholder="Zipcode" v-model="bill_address_attributes.zipcode" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.zipcode']" :title="'Zipcode ' + addressErrors['bill_address.zipcode'][0]" type="error"></el-alert>  
                          </el-form-item>                          
                        </el-col>
                      </el-row>
    
                      <el-row>
                        <el-col :span="24">
                          <el-form-item>
                            <el-input placeholder="Phone" v-model="bill_address_attributes.phone" clearable></el-input>
                            <el-alert v-if="addressErrors['bill_address.phone']" :title="'Phone number ' + addressErrors['bill_address.phone'][0]" type="error"></el-alert>
                          </el-form-item>
                        </el-col>
                      </el-row>
    
                    </el-form>
    
                  </el-col>
                  <el-col :span="12">
                    <h3>Shipping Address</h3>

                    <span class="switch copy-address">
                      <span>Same as Billing Address</span>
                      <el-switch v-model="useBilling"></el-switch>
                    </span>

                    <el-collapse-transition>  
                      <el-form ref="form" v-if="!useBilling">
                        <el-row :gutter="14">
                          <el-col :span="12">
                            <el-form-item>
                              <el-input placeholder="First Name*" v-model="ship_address_attributes.firstname" clearable></el-input>
                              <el-alert v-if="addressErrors['ship_address.firstname']" :title="'First name ' + addressErrors['ship_address.firstname'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item>
                              <el-input placeholder="Last Name*" v-model="ship_address_attributes.lastname" clearable></el-input>
                              <el-alert v-if="addressErrors['ship_address.lastname']" :title="'Last name ' + addressErrors['ship_address.lastname'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>
      
                        <el-row>
                          <el-col :span="24">
                            <el-form-item>
                              <el-input placeholder="Street Address*" v-model="ship_address_attributes.address1" clearable></el-input>
                              <el-alert v-if="addressErrors['ship_address.address1']" :title="'Address 1 ' + addressErrors['ship_address.address1'][0]" type="error"></el-alert>
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
                              <el-alert v-if="addressErrors['ship_address.city']" :title="'City name ' + addressErrors['ship_address.city'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="24">
                            <el-form-item>
                              <el-select v-model="ship_address_attributes.country_id" placeholder="Select Country" @change="resetShipAddressState">
                                <el-option v-for="country in computedCountries" :key="country.id" :label="country.name + ' (' + country.iso3 + ')' " :value="country.id"></el-option>
                              </el-select>
                              <el-alert v-if="addressErrors['ship_address.country']" :title="'Country name ' + addressErrors['ship_address.country'][0]" type="error"></el-alert>
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
                              <el-alert v-if="addressErrors['ship_address.state']" :title="'State name ' + addressErrors['ship_address.state'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>
      
                        <el-row>
                          <el-col :span="24">
                            <el-form-item>
                              <el-input placeholder="Zipcode" v-model="ship_address_attributes.zipcode" clearable></el-input>
                              <el-alert v-if="addressErrors['ship_address.zipcode']" :title="'Zipcode ' + addressErrors['ship_address.zipcode'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>
      
                        <el-row>
                          <el-col :span="24">
                            <el-form-item>
                              <el-input placeholder="Phone" v-model="ship_address_attributes.phone" clearable></el-input>
                              <el-alert v-if="addressErrors['ship_address.phone']" :title="'Phone number ' + addressErrors['ship_address.phone'][0]" type="error"></el-alert>
                            </el-form-item>
                          </el-col>
                        </el-row>
      
                      </el-form>
                    </el-collapse-transition>
    
                  </el-col>
                </el-row>

                <el-row :gutter="50" class="btn-row">
                  <el-col :span="12">
                    <router-link to="/cart">
                      <el-button type="primary" class="checkout-step-btn"><i class="el-icon-d-arrow-left"></i>Back to Cart</el-button>
                    </router-link>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" class="checkout-step-btn" @click="proceedToDelivery()">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                  </el-col>
                  <span class="divider"></span>
                </el-row>
              </div>
            </el-collapse-transition>
          </el-col>
        </el-row>
      </aside>
      <!-- Address Details Step -->

      <!-- Delivery Details Step -->
      <aside class="checkout-step delivery" :class="{ 'active' : computedOrder.state != 'address' && computedOrder.state != 'delivery' && computedOrder.state != 'cart' }">
        <el-row>
          <el-col :span="16" :offset="4" class="step-container">
            <div class="step-header">
              <h2>Delivery Details</h2>
              <p class="mini-info" v-if="computedOrder.state == 'payment' || computedOrder.state == 'confirm'">
                Total Amount: <span class="bold-text">(${{ Number(computedOrder.item_total).toFixed(2) }} + ${{ Number(computedOrder.shipment_total).toFixed(2) }}) = ${{ Number(computedOrder.total).toFixed(2) }} </span>
              </p>
              <i class="el-icon-circle-check step-complete" v-if="computedOrder.state == 'payment' || computedOrder.state == 'confirm'"></i>
              <el-button type="primary" class="step-edit-btn" v-if="computedOrder.state == 'payment' || computedOrder.state == 'confirm'" @click='changeCheckoutState(order.id, "delivery")'>Edit Delivery Details</el-button>
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
                    <el-table-column label="Price" align="right" width="177">
                      <template slot-scope="scope">
                        <strong>
                          {{ variants[lineItems[scope.row].variant_id].display_price }}
                        </strong>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-row :gutter="15">
                    <div class="rate-row el-col el-col-24">
                      <el-col :span="24">
                        <h4>Select Shipping Rate</h4>
                      </el-col>
                      <el-col :span="8" v-for="(rate, rateIndex) in shipment.shipping_rate_ids" :key="rate.id">
                        <el-tag class="rate-tag">
                          <input type="radio" :value="rate" :name="'rate_' + (index + 1)" :id="'rate_' + (rateIndex + 1)" v-model="computedShippingRates[index]">
                          <span class="cus-radio"></span>
                          <label :for="'rate_' + (rateIndex + 1)">
                            {{ shippingRates[rate].name }}<strong> {{ shippingRates[rate].display_cost }}</strong>
                          </label>   
                        </el-tag>
                      </el-col>
                    </div>
                  </el-row>
                </div>

                <el-row :gutter="50" class="btn-row">
                  <el-col :span="12">
                    <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(computedOrder.id, "address")'>Edit Address Details <i class="el-icon-edit"></i></el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" class="checkout-step-btn" @click="proceedToPayment()">Continue <i class="el-icon-d-arrow-right"></i></el-button>
                  </el-col>
                  <span class="divider"></span>
                </el-row>
              </div>
            </el-collapse-transition>
          </el-col>
        </el-row>
      </aside>
      <!-- Delivery Details Step -->

      <!-- Payment Details Step -->
      <aside class="checkout-step" :class="{ 'active' : computedOrder.state == 'confirm' }">
        <el-row>
          <el-col :span="16" :offset="4" class="step-container">
            <div class="step-header">
              <h2>Payment Details</h2>
              <p class="mini-info" v-if="computedOrder.state == 'confirm'">
                Card ending in {{ modifiedNumber.slice(-4) }}
              </p>
              <i class="el-icon-circle-check step-complete" v-if="computedOrder.state == 'confirm'"></i>
              <el-button type="primary" class="step-edit-btn" v-if="computedOrder.state == 'confirm'" @click='changeCheckoutState(order.id, "payment")'>Edit Payment Details</el-button>
            </div>
    
            <el-collapse-transition>
              <div class="step-body" v-if="computedOrder.state == 'payment'">
                <el-row>
                  <el-col :span="24">
                    <h4>Select Payment method</h4>
                    <el-row :gutter="15" class="payment-row">
                      <el-col :span="8" v-for="method in computedResponse.payment_methods" :key="method.id">
                        <el-tag class="payment-tag">
                          <div class="payment-list" :class="{ 'active': paymentMethodId == method.id }">
                            <input type="radio" :value="method.id" name="payments" :id="method.name" v-model="paymentMethodId" @change="selectedPaymentMethod(method)">
                            <span class="cus-radio"></span>
                            <label :for="method.name">{{ method.name }}</label>
                          </div>
                        </el-tag>
                      </el-col>
                    </el-row>

                    <el-collapse-transition>
                      <el-row v-if="paymentMethodName == 'Credit Card'" :gutter="50" class="credit-details">
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
                                    <el-input placeholder="XXXX XXXX XXXX XXXX" v-model="number" maxlength="19" clearable @input="formatCardNumber()"></el-input>
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
                          <div class="credit-card">
                            <span class="chip"></span>
                            <h2 class="card-type">{{ cardType || 'XXXX' }}</h2>
                            <h4 class="name">{{ name || 'xxxxxx xxxxxx' }}</h4>
                            <p class="number">{{ number || 'xxxx xxxx xxxx xxxx' }}</p>
                            <p class="valid-through">Valid Thru</p>
                            <p class="expiry">  <span v-if="month < 10 && month > 0">0</span>{{ month || 'xx' }} / {{ year.slice(-2) || 'xx' }}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </el-collapse-transition>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-transition>

            <el-row class="btn-row padding-25px" :gutter="50" v-if="computedOrder.state == 'payment'">
              <el-col :span="12">
                <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(computedOrder.id, "delivery")'>Edit Delivery Details <i class="el-icon-edit"></i></el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" class="checkout-step-btn" @click="proceedToConfirm()">Continue <i class="el-icon-d-arrow-right"></i></el-button>
              </el-col>
              <span class="divider"></span>
            </el-row>
          </el-col>
        </el-row>
      </aside>
      <!-- Payment Details Step -->

      <!-- Confirm Details Step -->
      <aside class="checkout-step" v-if="computedOrder.state == 'confirm'">
        <el-row>
          <el-col :span="16" :offset="4" class="step-container">
            <div class="step-header">
              <h2>Order Summary</h2>
            </div>

            <el-collapse-transition>
              <div class="step-body" v-if="computedOrder.state == 'confirm'">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <h4>Billing Address</h4>
                    <p>{{ addressDetails[computedOrder.bill_address_id].firstname }} {{ addressDetails[computedOrder.bill_address_id].lastname }}</p>
                    <p>{{ addressDetails[computedOrder.bill_address_id].address1 }}, {{ addressDetails[computedOrder.bill_address_id].address2 }}</p>
                    <p>{{ addressDetails[computedOrder.bill_address_id].city }}, {{ computedStates[addressDetails[computedOrder.bill_address_id].state_id].name }}</p>
                    <p>{{ computedCountries[addressDetails[computedOrder.bill_address_id].country_id].name }} - {{ addressDetails[computedOrder.bill_address_id].zipcode }}</p>
                    <p>{{ addressDetails[computedOrder.bill_address_id].phone }}</p>
                  </el-col>
                  <el-col :span="6">
                    <h4>Shipping Address</h4>
                    <p>{{ addressDetails[computedOrder.ship_address_id].firstname }} {{ addressDetails[computedOrder.ship_address_id].lastname }}</p>
                    <p>{{ addressDetails[computedOrder.ship_address_id].address1 }}, {{ addressDetails[computedOrder.ship_address_id].address2 }}</p>
                    <p>{{ addressDetails[computedOrder.ship_address_id].city }}, {{ computedStates[addressDetails[computedOrder.ship_address_id].state_id].name }}</p>
                    <p>{{ computedCountries[addressDetails[computedOrder.ship_address_id].country_id].name }} - {{ addressDetails[computedOrder.ship_address_id].zipcode }}</p>
                    <p>{{ addressDetails[computedOrder.ship_address_id].phone }}</p>
                  </el-col>
                  <el-col :span="6">
                    <h4>Shipment Details</h4>
                    <p v-for="shipment in computedResponse.shipments" :key="shipment.id">
                      From {{ stockLocations[shipment.stock_location_id].name }} via {{ shippingRates[shipment.selected_shipping_rate_id].name }} ({{ shippingRates[shipment.selected_shipping_rate_id].display_cost }})
                    </p>
                  </el-col>
                  <el-col :span="6">
                    <h4>Payment Details</h4>
                    <p>Card ending in <strong>{{ modifiedNumber.slice(-4) }}</strong></p>
                    <p>Total: <strong>(${{computedOrder.total}})</strong></p>
                  </el-col>
                </el-row>

                <div v-for="shipment in computedResponse.shipments" :key="shipment.id">
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
                    <el-table-column label="Price" align="right" width="177">
                      <template slot-scope="scope">
                        <strong>
                          {{ variants[lineItems[scope.row].variant_id].display_price }}
                        </strong>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-tag class="cost-tag">
                    Shipping Cost <strong>${{shippingRates[shipment.selected_shipping_rate_id].cost}}</strong>
                  </el-tag>
                </div>
              </div>
            </el-collapse-transition>

            <el-row class="btn-row padding-25px" :gutter="50" v-if="computedOrder.state == 'confirm'">
              <el-col :span="12">
                <el-button type="primary" class="checkout-step-btn" @click='changeCheckoutState(computedOrder.id, "payment")'>Edit Payment Details <i class="el-icon-edit"></i></el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" class="checkout-step-btn" @click="placeOrder()">Place Order <i class="el-icon-d-arrow-right"></i></el-button>
              </el-col>
              <span class="divider"></span>
            </el-row>
          </el-col>
        </el-row>
      </aside>
      <!-- Confirm Details Step -->
    </div>

    <!-- <div v-if="!computedOrder.hasOwnProperty('id')" class="text-center empty-checkout">
      <div class="empty-basket-icon">
        <span class="empty-basket-icon-holder">
          <i class="el-icon-goods"></i>
          <span class="zero">0</span>
        </span>
      </div>
      <h2 class="h2">Please add items to your basket.</h2>
      <router-link to="/shop" tag="a" class="btn btn-action">
        <el-button type="primary">Continue Shopping</el-button>
      </router-link>
    </div> -->

    <!-- Order Complete Step -->
    <transition name="scale">
      <aside class="checkout-step text-center"  v-if="computedOrder.state == 'complete' && computedOrder.completed_at != null">
        <span class="order-placed">
          <i class="el-icon-circle-check"></i>
        </span>
        <h2>
          Your order has been processed successfully.
        </h2>
      </aside>
    </transition>
    <!-- Order Complete Step -->

  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';
  
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
        response: '',
        shippingRateIds: [],
        paymentMethodName: '',
        name: 'Saiyam',
        number: '4111111111111111',
        modifiedNumber: '',
        month: '5',
        year: '2022',
        verification_value: '123',
        cardType: '',
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
      var _this = this;
      
      this.$store.dispatch('fetchCountries');
      this.$store.dispatch('fetchUserCurrentOrders').then(function() {
        if(_this.computedOrder.hasOwnProperty('id')) {
        _this.response = _this.orderDetails;
        _this.order = _this.orderDetails.order;
        _this.paymentMethodId = _this.response.payment_methods[0].id;
        _this.paymentMethodName = _this.response.payment_methods[0].name;
        _this.bill_address_attributes = Object.assign(_this.bill_address_attributes, _this.addressDetails[_this.order.bill_address_id]);
        _this.ship_address_attributes = Object.assign(_this.ship_address_attributes, _this.addressDetails[_this.order.ship_address_id]);
          if(_this.order.state == "confirm" && _this.modifiedNumber == '') {
            _this.changeCheckoutState(_this.order.id, "payment");
          }
        }
      });
    },
  
    computed: {
      ...mapGetters({
        orderDetails: 'getCartItems',
        locationDetails: 'getCountries',
        addressErrors: 'getAddressErrors'
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

      shippingRates() {
        return helpers.arrayToObject((this.computedResponse.shipping_rates), "id") || {};
      },

      computedShippingRates() {
        return this.shippingRateIds = Object.keys(helpers.arrayToObject((this.computedResponse.shipments || []), 'selected_shipping_rate_id')).reverse() || [];
      },

      stockLocations() {
        return helpers.arrayToObject(this.computedResponse.stock_locations || [], "id") || {};
      }
    },
  
    methods: {
      proceedToDelivery () {
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
  
      proceedToPayment () {
        var shipmentAttributes = {},
            _this = this;

        this.computedResponse.shipments.forEach(function (shipment, index) {
          shipmentAttributes[index] = {
            "selected_shipping_rate_id": Number(_this.shippingRateIds[index]),
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

      proceedToConfirm () {
        var formData = {};
        this.modifiedNumber = this.number.replace(/ +/g, "");

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
                "number": this.modifiedNumber,
                "month": this.month,
                "year": this.year,
                "verification_value": this.verification_value,
                "name": this.name
              }
            }
          };
        }

        this.$store.dispatch('proceedToConfirmState', { 'number': this.computedOrder.id, 'paymentData': formData });
      },

      placeOrder () {
        this.$store.dispatch('completeOrder', this.computedOrder.id);
      },

      resetBillAddressState () {
        var stateIds = this.computedCountries[this.bill_address_attributes.country_id].state_ids;
        this.bill_address_attributes.state_id = stateIds[stateIds.length - 1];
      },
      
      resetShipAddressState () {
        var stateIds = this.computedCountries[this.ship_address_attributes.country_id].state_ids;
        this.ship_address_attributes.state_id = stateIds[stateIds.length - 1];
      },

      selectedPaymentMethod (method) {
        this.paymentMethodName = method.name;
      },

      formatCardNumber () {
        this.number = this.number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        if(this.number.replace(/ +/g, "").match(/(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}/)) {
          this.cardType = "Master Card";
        } else if(this.number.replace(/ +/g, "").match(/^4/)) {
          this.cardType = "Visa";
        } else if(this.number.replace(/ +/g, "").match(/^3[4|7]/)) {
          this.cardType = "American Express";
        } else {
          this.cardType = "XXXX";
        }
      },

      changeCheckoutState (orderNumber, state) {
        const formData = {
          'state': state
        }
        this.$store.dispatch('setCheckoutState', { 'number': orderNumber, 'stateData': formData });
      },
    }
  }
</script>

<style>
  .checkout { padding: 20px 0 0 0; }
  .checkout-step { padding-bottom: 20px; }
  .step-header { padding: 15px 25px 13px 25px; position: relative; transition: padding .3s; }
  .step-complete { position: absolute; left: 10px; font-size: 30px; color: rgb(231, 237, 246); top: 50%; margin-top: -15px; }
  .step-header h2 { margin: 0; font-size: 19px; text-transform: uppercase; }
  .mini-info { margin-top: 2px; margin-bottom: 0; font-size: 13px; }
  .bold-text { color: #0E4AA3; font-family: 'AvenirLTStd-Heavy'; }
  .step-container { border: 1px solid #ddd; transition: .3s; }
  .checkout-step.active .step-container { border-color: #0E4AA3; }
  .checkout-step.active .step-container, .checkout-step.active .bold-text { color: #fff; }
  .checkout-step.active .step-header { background: #0E4AA3; padding-left: 50px; }
  .step-body { padding: 0 25px; border-top: solid 1px #ddd; }
  .step-body h3 { font-size: 16px; text-transform: uppercase; padding-bottom: 25px; padding-top: 30px; }
  .step-body .cell h3 { padding-top: 0; text-transform: none; }
  .step-body h4 { margin: 20px 0 10px 0; }
  .billing-info { border-right: 1px solid #ddd; padding-bottom: 6px; }
  .checkout .el-input__inner { border-radius: 0; }
  .checkout .el-select { width: 100%; }
  .divider { position: relative; top: -1px; display: inline-block; padding: 0 2px; }
  .checkout .el-table { margin-top: 25px; }
  .credit-card { width: calc(100% - 45px); height: 230px; border-radius: 15px; background: #111; margin-top: 61px; color: #fff; }
  .credit-card .name { color: rgba(255, 255, 255, .7); position: absolute; z-index: 2; text-transform: uppercase; left: 25px; bottom: 20px; font-weight: bold; }
  .credit-card .number { color: rgba(255, 255, 255, .9); position: absolute; z-index: 2; left: 23px; bottom: 75px; margin: 0; font-size: 30px; }
  .credit-card .expiry, .credit-card .valid-through, .credit-card .card-type { color: rgba(255, 255, 255, .7); position: absolute; z-index: 2; right: 25px; bottom: 32px; font-size: 14px; margin: 0; }
  .credit-card .valid-through { bottom: 50px; font-size: 9px; }
  .credit-card .card-type { bottom: auto; top: 25px; right: 25px; left: auto; font-size: 22px; color: #fff; text-transform: uppercase; transition: .3s; }
  .rate-tag, .payment-tag { width: 100%; height: 40px; line-height: 40px; padding: 0; position: relative; }
  .rate-tag input, .payment-tag input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; margin: 0; opacity: 0; }
  .rate-tag label, .payment-tag label { padding-left: 30px; }
  .cus-radio { width: 12px; height: 12px; border-radius: 50%; background: transparent; position: absolute; left: 10px; top: 49%; border: 1px solid #0E4AA3; transition:.3s; transform: translateY(-50%); pointer-events: none; }
  .rate-tag .active .cus-radio, .rate-tag input:checked + .cus-radio, .payment-tag .active .cus-radio, .payment-tag input:checked + .cus-radio { background: #0E4AA3; }
  .rate-tag *, .payment-tag * { cursor: pointer; }
  .hide { display: none; }
  .rate-row { padding-bottom: 25px; position: relative; }
  .step-edit-btn { background: rgb(231, 237, 246); position: absolute; right: 14.5px; top: 50%; border-radius: 0; transform: translateY(-50%); color: #0E4AA3; transition: .3s; font-size: 12px; padding: 12px; min-width: 146px; }
  .step-edit-btn:hover { background: rgb(231, 237, 246); opacity: .8; color: #0E4AA3; }
  .checkout .el-button--primary:not(.step-edit-btn) { margin-top: 20px; }
  .payment-row { padding-bottom: 25px; }
  .step-body-button { padding: 0 20px 20px 20px; }
  .step-body-button .el-button--primary { margin-top: 0 !important; }
  .switch { position: absolute; right: 0; font-size: 14px; top: 50%; transform: translateY(-50%); }
  .switch span { display: inline-block; margin-right: 15px; position: relative; top: 3px; margin-top: -2px; font-weight: bold; }
  .switch .el-switch__core, .switch.copy-address .el-switch__core { margin-right: 25px; }
  .switch.copy-address { top: 25px; transform: none; }
  .checkout .checkout-step-btn { width: 100%; }
  .btn-row .checkout-step-btn { margin-top: 0 !important; }
  .btn-row { padding: 25px 0; border-top: solid 1px #ddd; position: relative; }
  .btn-row .divider { position: absolute; left: 50%; top: 0; height: 100%; width: 1px; background: #ddd; padding: 0; margin-left: -1px; }
  .btn-row .btn-row-container { position: relative; }
  .btn-row .btn-row-container:before { content: ''; position: absolute; left: 50%; transform: translateX(-50%); background: #ddd; height: 100%; width: 1px; top: 0; z-index: 1; }
  .padding-25px { margin-left: 0 !important; margin-right: 0 !important; }
  .credit-details { padding-bottom: 11px; }
  .cost-tag { margin-top: 25px; margin-bottom: 25px; }
  .empty-checkout { padding-bottom: 25px; }
  .order-placed i { font-size: 350px; color: #67c23a; margin-top: 25px; }
  .scale-enter-active, .scale-leave-active { transform: scale(1); transition: .5s; }
  .scale-enter, .scale-leave-to { transform: scale(0); opacity: 0; }
  .checkout .el-form .el-alert {  }
</style>
