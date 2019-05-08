<template>
<v-app>
    <v-container>
        <v-content>
            <v-layout column>
                <v-flex xs12>
                    <h1 class="mb-4 text-xs-center">Register Your Account</h1>
                <v-form ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                <VTextField
                        v-model="userData.name"
                        label="Name"
                        type="text"
                        :rules="nameRules"
                        />
                <VTextField
                        v-model="userData.email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
                        />
                <VTextField
                        v-model="userData.password"
                        label="Password"
                        type="password"
                        :rules="passwordRules"
                        />
                <VTextField
                        v-model="userData.confirmPassword"
                        label="Confirm Password"
                        type="password"
                        :rules="confirmRules"
                        />
                   <v-progress-circular
                    color="amber"
                    indeterminate
                    v-if="loading"
                    class="mt-2"
                 ></v-progress-circular>
                <v-btn class="mt-3" color="primary" :dark="valid" @click="register" :disabled="!valid" v-if="!loading">Register</v-btn>
                <router-link to="/">Login</router-link>
                </v-form>
                </v-flex>
            </v-layout>
        </v-content>
    </v-container>
</v-app>
</template>

<script>
import AuthService from '../services/authService';

export default {
  name: 'register',
  components: {},
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      nameRules: [
        value => !!value || 'Name is required',
        value => (value && value.length >= 5) || 'Name is atleast 5 character',
      ],
      emailRules: [
        value => !!value || 'Email is required',
        value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid',
      ],
      passwordRules: [
        value => !!value || 'Password is required',
        value => (value && value.length >= 6) || 'Password is atleast 6 character',
      ],
      confirmRules: [
        value => !!value || 'Confirm is required',
        value => value == this.userData.password || 'Please check your confirm password again',
      ],
      valid: false,
      loading: false,

    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.loading = false;
      }
      this.loading = true;
      const vm = this.userData;
      const res = await AuthService.register(vm.name, vm.email, vm.password, vm.confirmPassword)
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.$refs.form.reset();
        })
        .catch((error) => {
          error.response.data.message ? alert('This email is already used') : '';
          this.loading = false;
        });
    },
  },
};
</script>
