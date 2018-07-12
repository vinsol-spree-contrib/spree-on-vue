<template>
  <section class="user-entry">
    <el-row>

      <el-col :span="6" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>Sign Up</h3>
          </div>
          <el-form ref="form">
            <el-form-item>
              <el-input placeholder="Enter your email" v-model="signupEmail" clearable></el-input>
              <div v-if="getErrors.email" class="error-text">
                Email {{ getErrors.email[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Enter your password" v-model="signupPassword" type="password" clearable></el-input>
              <div v-if="getErrors.password" class="error-text">
                Password {{ getErrors.password[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Password Confirmation" v-model="signupPassword_confirmation" type="password" clearable></el-input>
              <div v-if="getErrors.password_confirmation" class="error-text">
                It {{ getErrors.password_confirmation[0] }}
              </div>
            </el-form-item>
            <el-button type="primary" @click="onSignup">Sign Up</el-button>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>Login</h3>
          </div>
          <div v-if="isAuth" class="error-text">
            Invalid email or password
          </div>
          <el-form ref="form">
            <el-form-item>
              <el-input placeholder="Enter your email" v-model="email" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Enter your password" v-model="password" type="password" clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">
              Login
            </el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

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

<style>
  .user-entry { padding: 20px 0; position: absolute; top: 50%; width: 100%; transform: translateY(-50%); }
  h3 { margin-top: 0; margin-bottom: 0; }
</style>
