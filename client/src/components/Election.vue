<template>
  <v-app>
    <customer-header></customer-header>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
     <customer-footer></customer-footer>
  </v-app>
</template>

<script>
  import footer from './election/footer';
  import header from './election/header';
  export default {
    name: 'Election',
    components: {
      'customer-footer': footer,
      'customer-header': header
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
