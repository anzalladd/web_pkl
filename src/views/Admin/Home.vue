<template>
<v-app>
    <p>hello ini dashboard</p>
    <v-btn color="error" @click="signout">Sign Out</v-btn>
</v-app>
</template>

<script>
export default {
    name: 'dashboard',
    components: {},
    data(){
        return{

        }
    },
    methods:{
        signout(){
            window.localStorage.clear()
            this.$router.push('/register')
        }
    }
}
</script>
