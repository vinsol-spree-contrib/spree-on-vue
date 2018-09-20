<template>
  <el-dropdown trigger="click" class="user-options">
    <a href="javascript:void(0);" class="el-dropdown-link">
      <img src="../../assets/images/user.svg" alt="">
    </a>
    <el-dropdown-menu slot="dropdown" v-if="isAuthenticated">
      <el-dropdown-item>
        <router-link to="/profile" tag="div" class="drop-menu-item">Profile</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/addresses" tag="div" class="drop-menu-item">Address</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <div class="drop-menu-item" @click="onLogout">Logout</div>
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dropdown-menu slot="dropdown" v-else>
      <el-dropdown-item>
        <router-link to="/entry" tag="div" class="drop-menu-item">Login/Sign up</router-link>
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
        var _this = this;
        this.$confirm('Leaving too soon?.', 'Message', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'info'
        }).then(() => {
          _this.$store.dispatch('logout');
        });
      }
    }
  }
</script>

<style>
  .user-options { position: absolute !important; right: 50px; top: 50%; transform: translateY(-50%); z-index: 2; }
  .el-dropdown-menu__item { padding: 0 !important; }
  .el-dropdown-menu__item .drop-menu-item { padding: 0 20px; }
</style>
