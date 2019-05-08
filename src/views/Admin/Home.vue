<template>
<v-app>
  <v-container>
    <p>hello ini dashboard</p>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-data-table
    :headers="headers"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.perusahaan }}</td>
      <td>{{ props.item.kota }}</td>
      <td>{{ props.item.alamat }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.cp }}</td>
      <td>{{ props.item.jabatan }}</td>
      <td>{{ props.item.kontak }}</td>
      <td>{{ props.item.kuota }}</td>
    </template>
  </v-data-table>
    <v-btn color="error" @click="signout" class="mt-4">Sign Out</v-btn>
    <v-layout>
       <form action="http://datakk5.herokuapp.com/import" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" class="form-control">
                <br>
                <button class="btn btn-success">Import User Data</button>

                <a class="btn btn-warning" href="http://datakk5.herokuapp.com/export">Export User Data</a>

            </form>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import axios from 'axios';
import AdminServices from '../../services/Admin/AdminServices';

export default {
  name: 'dashboard',
  data() {
    return {
      headers: [
        {
          text: 'Id',
          sortable: true,
        },
        {
          text: 'Perusahaan',

        },
        {
          text: 'Kota',

        },
        {
          text: 'Alamat',

        },
        {
          text: 'Email',

        },
        {
          text: 'CP',

        },
        {
          text: 'Jabatan',

        },
        {
          text: 'Kontak',

        },
        {
          text: 'Kuota',

        },
      ],
      data: [],
      loading: true,
      file: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    signout() {
      window.localStorage.clear();
      this.$router.push('/');
    },
    fetchData() {
      const response = AdminServices.fetchData()
        .then((response) => {
          this.data = response.data;
          this.loading = false;
        });
    },
    onFileChanged() {
      this.file = this.$refs.file.files[0];
    },
    importExcel() {
      const formData = new FormData();
      formData.append('file', this.file);
      axios.post('http://datakk5.herokuapp.com/import',
        formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
