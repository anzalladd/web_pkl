<template>
<v-app>
    <v-container>
        <v-content>
            <v-layout column>
                <v-flex xs12>
                    <h1 class="mb-4 text-xs-center">Login Your Account</h1>
                <v-form ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                <VTextField
                        v-model="userData.name"
                        label="Email"
                        type="text"
                        :rules="emailRules"
                        />
                <VTextField
                        v-model="userData.password"
                        label="Password"
                        type="password"
                        :rules="requireRules"
                        />
                   <v-progress-circular
                    color="amber"
                    indeterminate
                    v-if="loading"
                    class="mt-2"
                 ></v-progress-circular>
                <v-btn class="mt-3" color="primary" :dark="valid" @click="login" :disabled="!valid" v-if="!loading">Login</v-btn>
                </v-form>
                </v-flex>
            </v-layout>
        </v-content>
    </v-container>
</v-app>
</template>

<script>
import AuthService from '../services/authService'
import { setTimeout } from 'timers';
export default {
    name: 'login',
    components:{},
    data(){
        return{
          loading: false,
          valid: false,
          userData: {
            name: '',
            password: ''
          },
          requireRules: [ v => !!v || 'This field is required'],
          emailRules: [ value => !!value || 'Email is required',
                value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid', ]

        }
    },
    mounted(){
        this.loggedIn();
    },
    methods:{
        async login(userData){
            if(this.$refs.form.validate()){
                this.snackbar = true
            }
                this.loading = true
                const response = await AuthService.login(this.userData.name, this.userData.password)
                .then((response)=>{
                     window.localStorage.setItem('token', response.data.success.token)
                     setTimeout(()=>{
                        this.$router.push('/dashboard')   
                     },450)
                })
                .catch((err)=>{
                    alert(err)
                    this.loading = false
                })

        },
        loggedIn(){
            if(AuthService.loggedIn()){
                this.$router.push('/dashboard')
            }
        }
        
    }
}
</script>
