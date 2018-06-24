<template>
  <section class="container mx-auto p-8">
    <div class="flex justify-center">
      <div class="w-full max-w-xs">
        <form @submit.prevent="onSignup" class="bg-white shadow-md rounded p-8 pt-6">
          <div class="mb-4">
            <label class="block text-grey-darkest text-sm font-bold mb-2">Email</label>
            <app-input type="text" placeholder="Enter your email" v-model="email"></app-input>
            <div v-if="getErrors.email" class="bg-red-lightest border border-red-lightest text-red-dark px-2 py-1 rounded relative mt-2" role="alert">
              <strong class="text-sm">Email {{ getErrors.email[0] }}</strong>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2">Password</label>
            <app-input type="password" placeholder="Enter your password" v-model="password"></app-input>
            <div v-if="getErrors.password" class="bg-red-lightest border border-red-lightest text-red-dark px-2 py-1 rounded relative mt-2" role="alert">
              <strong class="text-sm">Password {{ getErrors.password[0] }}</strong>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-grey-darkest text-sm font-bold mb-2">Password Confirmation</label>
            <app-input type="password" placeholder="Enter your password again" v-model="password_confirmation"></app-input>
            <div v-if="getErrors.password_confirmation" class="bg-red-lightest border border-red-lightest text-red-dark px-2 py-1 rounded relative mt-2" role="alert">
              <strong class="text-sm">It {{ getErrors.password_confirmation[0] }}</strong>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-grey-darkest hover:bg-grey-darker text-white font-bold py-2 px-4 rounded">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import Input from '../shared/Input.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'signup',
    data() {
      return {
        email: "",
        password: "",
        password_confirmation: ""
      }
    },

    components: {
      appInput: Input
    },

    computed: {
      ...mapGetters(['getErrors'])
    },

    methods: {
      
    }
  }
</script>