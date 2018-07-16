<template>
  <section class="cart-page offset-vertical">
    <el-row>
      <el-col :span="18" :offset="3" v-if="cartItems.order && cartItems.order.item_count > 0">
        <h2 class="h2">Your basket</h2>
        <el-table border :data="cartItems.line_items" style="width: 100%;">

          <el-table-column label="Product Image" align="left" width="200">
            <template slot-scope="scope">
              <img :src="images[variants[scope.row.variant_id].image_ids[0]].product_url" alt="" class="border-image">
            </template>
          </el-table-column>

          <el-table-column label="Name" align="left" width="475px">
            <template slot-scope="scope">
              <h3>{{ variants[scope.row.variant_id].name }}</h3>
            </template>
          </el-table-column>
          
          <el-table-column label="Quantity" align="center" width="180px">
            <template slot-scope="scope">
              <div class="product-quantity">
                <div class="el-input-number el-input-number--small">
                  <span role="button" :class="{ 'is-disabled' : scope.row.quantity < 2  }" class="el-input-number__decrease" @click="changeQuantity(-1, variants[scope.row.variant_id].id)">
                    <i class="el-icon-minus"></i>
                  </span>
                  <span role="button" class="el-input-number__increase" @click="changeQuantity(1, variants[scope.row.variant_id].id)">
                    <i class="el-icon-plus"></i>
                  </span>
                  <div class="el-input el-input--small">
                    <input type="text" autocomplete="off" max="10" min="1" class="el-input__inner" :value="scope.row.quantity" @blur="changeQuantity(($event.target.value - scope.row.quantity), variants[scope.row.variant_id].id)">
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Price" align="center" width="135px">
            <template slot-scope="scope">
              {{ scope.row.display_amount }}
            </template>
          </el-table-column>

          <el-table-column label="Actions" align="center" width="90px">
            <template slot-scope="scope">
               <el-button type="danger" @click="deleteItem(order.id, scope.row.id)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col v-else class="empty-basket" :span="18" :offset="3">
        <h2 class="h2 text-uppercase">Your Basket is empty.</h2>
        <router-link to="/shop" tag="a" class="btn btn-action">Continue Shopping</router-link>
      </el-col>

    </el-row>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { helpers } from '../../store/helpers/helpers';

  export default {
    name: 'cart',

    computed: {
      ...mapGetters(['getCartItems', 'isAuthenticated', 'getCartErrors', 'getAlertMessage']),

      cartItems() {
        return this.getCartItems || {};
      },

      order() {
        return this.getCartItems.order || {};
      },

      lineItemCount() {
        return this.order.item_count;
      },

      images() {
        return helpers.arrayToObject(this.getCartItems.images || [], "id");
      },

      variants() {
        return helpers.arrayToObject(this.getCartItems.variants || [], "id");
      },
    },

    methods: {
      emptyBasket: function() {
        if(confirm('You are about to remove all the items from you basket.')) {
          this.$store.dispatch('emptyCurrentOrder', this.order.id)
        }
      },

      changeQuantity(itemQuantity, itemId) {
        const formData = {
          quantity: itemQuantity,
          variant_id: itemId,
          message: 'Quantity Updated'
        };
        this.$store.dispatch('addToCart', formData);
      },

      goToAddress(orderId) {
        this.$store.dispatch('proceedToAddressState', orderId);
      },
      
      deleteItem(orderNumber, lineItemId) {
        var _this = this;
        this.$store.dispatch('deleteLineItem', { 'number': orderNumber, 'lineItemId': lineItemId }).then(function () {
          _this.$message('Item removed from the basket');
        });
      }
    }
  }
</script>

<style>
  .border-image { border: 1px solid #ddd; }
  .cart-page .el-table td { vertical-align: top !important; padding: 20px 15px; }
  .item-remove { width: 100%; }
  .cart-page .is-disabled { pointer-events: none; }
</style>
