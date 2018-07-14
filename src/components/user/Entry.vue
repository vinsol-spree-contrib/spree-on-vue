<template>
  <el-row :gutter="40" type="flex" justify="center" align="middle" class="full-height">
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>Login</h3>
        </div>
        <el-alert v-if="isAuth" title="Invalid email or password" type="error" class="login-error"></el-alert>
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
    <el-col :span="1" class="text-center or-text">
      <h2>or</h2>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>Sign Up</h3>
        </div>
        <el-form ref="form">
          <el-form-item>
            <el-input placeholder="Enter your email" v-model="signupEmail" clearable></el-input>
            <el-alert v-if="getErrors.email" :title="'Email ' + getErrors.email[0]" type="error"></el-alert>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Enter your password" v-model="signupPassword" type="password" clearable></el-input>
            <el-alert v-if="getErrors.password" :title="'Password ' + getErrors.password[0]" type="error"></el-alert>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Password Confirmation" v-model="signupPassword_confirmation" type="password" clearable></el-input>
            <el-alert v-if="getErrors.password_confirmation" :title="'It ' + getErrors.password_confirmation[0]" type="error"></el-alert>
          </el-form-item>
          <el-button type="primary" @click="onSignup">Sign Up</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
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
        var _this = this;
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
  h3 { margin-top: 0; margin-bottom: 0; }
  .text-center { text-align: center; }
  .or-text { position: relative; }
  .or-text:before, .or-text:after { content: ''; left: 50%; margin-left: -.5px; background: #d1d1d1; position: absolute; height: 75px; width: 1px; }
  .or-text:before { top: -90%; }
  .or-text:after { bottom: -90%; }
  .el-alert { padding: 0 15px; margin-top: 1px; line-height: normal; padding-top: 7px; padding-bottom: 6px; }
  .el-alert__content { padding: 0; }
  .el-alert__closebtn { display: none; }
  .login-error, .el-form-item { margin-bottom: 14px; }
</style>
