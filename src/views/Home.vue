<template>
  <v-app>
    <div id="app">
      <div class="content">
        <v-layout wrap class="balik">
          <v-flex lg6 md6 sm12 xs12>
            <router-view></router-view>
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
            <v-container>
              <v-layout justify-end align-end>
                <img src="../assets/ts_2.png" alt="ts_2">
              </v-layout>
              <v-layout column align-center>
                <h1 class="text-xs-center judul pb-5">SELAMAT DATANG DI WEB PKL <br>
                  SMK TELKOM PURWOKERTO</h1>
                <img src="../assets/ilu_1.svg" alt="ilu" class="mt-5">
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      //
    };
  },
};

</script>

<style scoped>
  #app {
    background: white;
    width: 100%;
    height: 100vh;
  }

  .judul {
    margin-top: 95px;
  }


  @media screen and (max-width: 959px) {
    .balik {

      display: flex;
      flex-direction: column-reverse !important;

    }

  }

</style>
