<template>
  <section class="user-entry">
    <div class="container">
      <form @submit.prevent="onLogin">
        <input type="text" placeholder="Email" v-model="loginEmail">
        <input type="password" placeholder="Password" v-model="loginPassword">
        <button>
          Login
        </button>
      </form>
      <form @submit.prevent="onSignUp">
        <input type="text" placeholder="Email" v-model="signUpEmail">
        <input type="password" placeholder="Password" v-model="signUpPassword">
        <input type="password" placeholder="Password Confirmation" v-model="signUpPasswordConfirmation">
        <button>
          Signup
        </button>
      </form>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as types from '../../store/types';

  export default {
    name: 'app-entry',

    data() {
      return {
        loginEmail: '',
        loginPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpPasswordConfirmation: ''
      }
    },

    methods: {
      onLogin: function () {
        const formData = {
          email: this.loginEmail,
          password: this.loginPassword
        };

        this.$store.dispatch(types.LOGIN, formData);
      },

      onSignUp: function () {
        const formData = {
          email: this.signUpEmail,
          password: this.signUpPassword,
          password_confirmation: this.signUpPasswordConfirmation
        };

        this.$store.dispatch(types.SIGNUP, formData);
      }
    }

  }
</script>

