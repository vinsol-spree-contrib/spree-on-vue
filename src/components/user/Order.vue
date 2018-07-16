<template>
  <section class="my-orders" v-if="order">
    <el-row>
      <el-col :span="20" :offset="2" class="offset-vertical">
        <el-row class="page-heading-row">
          <el-col :span="20" :offset="2">
            <h2 class="h2">
              Order #{{order.number}}
            </h2>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="Object.values(addresses).length > 0">
          <el-col :span="10" :offset="2">
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

          <el-col :span="10">
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

        <el-row class="cart-page offset-vertical">
          <el-col :span="20" :offset="2">
            <el-table border :data="cartItems.line_items" style="width: 100%;">

              <el-table-column label="Product Image" align="left" width="125">
                <template slot-scope="scope">
                  <img :src="images[variants[scope.row.variant_id].image_ids[0]].small_url" alt="" class="border-image">
                </template>
              </el-table-column>

              <el-table-column label="Name" align="left" width="559px">
                <template slot-scope="scope">
                  <h3>{{ variants[scope.row.variant_id].name }}</h3>
                </template>
              </el-table-column>
              
              <el-table-column label="Quantity" align="center" width="180px">
                <template slot-scope="scope">
                  <div class="product-quantity">
                    <div class="el-input-number el-input-number--small">
                      <el-tag>{{ scope.row.quantity }}</el-tag>
                    </div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="Price" align="center" width="135px">
                <template slot-scope="scope">
                  {{ scope.row.display_amount }}
                </template>
              </el-table-column>
            </el-table>

            <el-row class="offset-vertical-small">
              <el-col :span="24" class="text-right subtotal-col">
                <h3 class="price-tag-row">
                  Shipment cost: <el-tag class="price-tag" v-if="Object.values(shipments).length > 0">${{ shipments[order.shipment_ids].cost }}</el-tag>
                </h3>
                <h3 class="price-tag-row">
                  Subtotal: <el-tag class="price-tag">${{ order.item_total }}</el-tag>
                </h3>
                <h3 class="price-tag-row">
                  Total: <el-tag class="price-tag">${{ order.payment_total }}</el-tag>
                </h3>
              </el-col>
            </el-row>
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

      shipments() {
        return this.getSingleOrder && this.getSingleOrder.shipments ? helpers.arrayToObject(this.getSingleOrder.shipments || [], "id") : {};
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
  .price-tag { min-width: 84px; }
  .price-tag-row { margin: 10px 0; }
  .offset-vertical-small { padding-top: 25px; }
</style>

