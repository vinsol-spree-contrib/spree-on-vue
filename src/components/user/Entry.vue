<template>
  <section class="user-entry">
    <div class="container">
      <div class="user-entry-forms">

        <aside class="user-login-form">
          <h2 class="h2 text-uppercase text-center">Login</h2>
          <div v-if="isAuth" class="error-text">
            <strong>Invalid email or password</strong>
          </div>
          <form @submit.prevent="onLogin">
            <div class="form-group">
              <label class="block">Email</label>
              <app-input class="form-input" type="text" v-model="email"></app-input>
            </div>
            <div class="form-group">
              <label class="block">Password</label>
              <app-input class="form-input" type="password" v-model="password"></app-input>
            </div>
            <div class="form-group margin-0">
              <button class="btn btn-action btn-full">
                Login
              </button>
            </div>
          </form>
        </aside>

        <h1 class="h2 or-text">OR</h1>

        <aside class="user-signup-form">
          <form @submit.prevent="onSignup">
            <h2 class="h2 text-uppercase text-center">Signup</h2>
            <div class="form-group">
              <label class="block">Email</label>
              <app-input class="form-input" type="text" v-model="signupEmail"></app-input>
              <div v-if="getErrors.email" class="error-text">
                <strong class="text-sm">Email {{ getErrors.email[0] }}</strong>
              </div>
            </div>
            <div class="form-group">
              <label class="block">Password</label>
              <app-input class="form-input" type="password" v-model="signupPassword"></app-input>
              <div v-if="getErrors.password" class="error-text">
                <strong class="text-sm">Password {{ getErrors.password[0] }}</strong>
              </div>
            </div>
            <div class="form-group">
              <label class="block">Password Confirmation</label>
              <app-input class="form-input" type="password" v-model="signupPassword_confirmation"></app-input>
              <div v-if="getErrors.password_confirmation" class="error-text">
                <strong class="text-sm">It {{ getErrors.password_confirmation[0] }}</strong>
              </div>
            </div>
            <div class="form-group margin-0">
              <button class="btn btn-action btn-full">
                Sign up
              </button>
            </div>
          </form>
        </aside>

      </div>
    </div>
  </section>
</template>

<script>
  import Input from '../shared/Input.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'entry',
    components: {
      appInput: Input
    },
    
    data() {
      return {
        email: "",
        password: "",
        signupEmail: "",
        signupPassword: "",
        signupPassword_confirmation: ""
      }
    },

    computed: {
      ...mapGetters(['getLoginErrors', 'getErrors']),
      isAuth() {
        return this.getLoginErrors.email || this.getLoginErrors.password;
      }
    },

    methods: {
      onLogin() {
        const loginFormData = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('login', loginFormData);
      },

      onSignup() {
        const formData = {
          email: this.signupEmail,
          password: this.signupPassword,
          password_confirmation: this.signupPassword_confirmation
        }
        this.$store.dispatch('signup', formData);
      }
    }
  }
</script>
