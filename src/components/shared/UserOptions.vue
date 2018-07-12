<template>
  <el-dropdown trigger="click" class="user-options">
    <a href="javascript:void(0);" class="el-dropdown-link">
      <img src="../../assets/images/user.svg" alt="">
    </a>
    <el-dropdown-menu slot="dropdown" v-if="isAuthenticated">
      <el-dropdown-item>
        <router-link to="/profile" tag="li">Profile</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <a @click="onLogout">Logout</a>
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dropdown-menu slot="dropdown" v-else>
      <el-dropdown-item>
        <router-link to="/entry" tag="li">Login/Sign up</router-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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

<style>
  .user-options { position: absolute !important; right: 50px; top: 50%; transform: translateY(-50%); z-index: 2; }
</style>
