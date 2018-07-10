<template>
  <section class="container" v-if="order">
    <div class="container__inner">
      <h1 class="text-uppercase">
        Order- {{order.number}}
      </h1>
      <hr>

      <div class="row" v-if="Object.values(addresses).length > 0">
        <div class="col-md-3">
          <h2 class="h2">Billing Address</h2>
          <p>{{addresses[order.bill_address_id].firstname}} {{addresses[order.bill_address_id].lastname}}</p>
          <p>{{addresses[order.bill_address_id].address1}}</p>
          <p v-if="Object.values(country).length > 0">
            {{ country[addresses[order.bill_address_id].country_id].name }}
            {{ addresses[order.bill_address_id].city }}
          </p>
          <p>{{addresses[order.bill_address_id].zipcode}}</p>
          <p>{{addresses[order.bill_address_id].phone}}</p>
        </div>
        <div class="col-md-3">
          <h2 class="h2">Shipping Address</h2>
          <p>{{addresses[order.ship_address_id].firstname}} {{addresses[order.ship_address_id].lastname}}</p>
          <p>{{addresses[order.ship_address_id].address1}}</p>
          <p v-if="Object.values(country).length > 0">
            {{ country[addresses[order.ship_address_id].country_id].name }}
            {{ addresses[order.ship_address_id].city }}
          </p>
          <p>{{addresses[order.ship_address_id].zipcode}}</p>
          <p>{{addresses[order.ship_address_id].phone}}</p>
        </div>
        <div class="col-md-3">
          <h2 class="h2">Shipments</h2>
          <p>From default via UPS Ground (USD)</p>
        </div>
        <div class="col-md-3">
          <h2 class="h2">Paymant Information</h2>
          <div v-for="payment in payments" :key="payment.id">
            {{paymentMethods[payment.payment_method_id].name}} <strong>(${{order.payment_total}}</strong>)
          </div>
        </div>
      </div>
    </div>

    <section class="basket border-t" v-if="cartItems.order && cartItems.order.item_count > 0">
      
        <ul class="basket__items">
          <li class="basket-item clearfix" v-for="item in cartItems.line_items" :key="item.id">
            <div class="basket-item__image text-center">
              <a href="#">
                <img :src="images[variants[item.variant_id].image_ids[0]].small_url" class="full">
              </a>
            </div>
            <div class="basket-item__name">
              <h2 class="h2">
                <router-link :to="{ path: '/products/' + variants[item.variant_id].slug, query: { sku: variants[item.variant_id].sku } }" class="h2 variant-link">
                  {{ variants[item.variant_id].name }}
                </router-link>
              </h2>
              <p>{{ variants[item.variant_id].description }}</p>
            </div>
            <div class="basket-item__quantity">
              <h4 class="h4">Quantity</h4>
              <div class="product-quantity">
                <input type="quantity" class="quantity-input text-center" :value="item.quantity" disabled>
              </div>
            </div>
            <div class="basket-item__price">
              <h4 class="h4">Price</h4>
              <p class="price">{{ variants[item.variant_id].display_price }}</p>
            </div>
          </li>
        </ul>
        <div class="basket__details">
          <div class="basket__details__inner">
            <div class="basket__total clearfix">
              <div class="basket__subtotal">
                <p>Total</p>
              </div>
              <div class="basket__checkout">
                <p>${{ order.total }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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

<style scoped>
  .container__inner {
    padding: 25px;
  }

  h1 {
    margin: 0;
  }

  .basket-item__image, .basket-item__name, .basket-item__price, .basket-item__quantity {
    height: auto;
    min-height: 125px;
  }

  .basket-item__image img {
    height: 75px;
    margin-top: 25px;
  }

  .basket-item__name .h2,
  .basket-item .h4 {
    padding-top: 10px;
    margin-top: 0;
  }

  .basket__subtotal,
  .basket__checkout {
    height: auto;
    min-height: 1px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .h2 {
    letter-spacing: 0;
    font-size: 20px;
  }
</style>

