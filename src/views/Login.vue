<template>
<v-app style="background-color: #F6F7F7">
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <img src="../assets/ts.png" alt="">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h1 class="judul">Login Akun Anda</h1>
          <VTextField v-model="userData.name" label="Nisn" type="number" :rules="requireRules" validate-on-blur/>
          <VTextField v-model="userData.password" label="Password"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :rules="requireRules"  class="mt-4" validate-on-blur/>
           <v-layout justify-end>
          <v-progress-circular color="amber" indeterminate v-if="loading" class="mt-2">
          </v-progress-circular>
          <v-btn class="mt-4" color="#00E676" :dark="valid" @click="login" :disabled="!valid"
            v-if="!loading">Login</v-btn>
            </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import {
  setTimeout,
} from 'timers';
import AuthService from '../services/authService';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      loading: false,
      valid: false,
      show: false,
      userData: {
        name: '',
        password: '',
      },
      requireRules: [v => !!v || 'This field is required'],
    };
  },
  mounted() {
    this.loggedIn();
  },
  methods: {
    async login(userData) {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
      this.loading = true;
      const response = await AuthService.login(this.userData.name, this.userData.password)
        .then((response) => {
          window.localStorage.setItem('token', response.data.success.token);
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 450);
        })
        .catch((err) => {
          alert(err);
          this.loading = false;
        });
    },
    loggedIn() {
      if (AuthService.loggedIn()) {
        this.$router.push('/dashboard');
      }
    },

  },
};

</script>

<style scoped>
  .judul{
    padding-top: 115px;
    padding-bottom: 50px;
  }
</style>
