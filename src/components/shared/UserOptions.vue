<template>
  <div class="primary-header__user absolute bg-yellow-light">
    <router-link to="/entry" class="absolute primary-header__user-link">
      <img src="../../assets/images/user.svg" alt="" class="absolute">
    </router-link>
    <ul class="absolute user-options" v-if="isAuthenticated">
      <li><router-link to="/profile" tag="a">Profile</router-link></li>
      <li><a @click="onLogout">Logout</a></li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'user-options',

    computed: {
      ...mapGetters(['isAuthenticated',  'getUserProfileId']),

      userId() {
        return this.getUserProfileId;
      }
    },

    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>
