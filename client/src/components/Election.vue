<template>
  <v-app>
    <customer-header></customer-header>
    <v-content>
      <v-container>
        <h1 class="text-xs-center">Welcome to Ukraine President Election</h1>
        <h2 class="text-xs-center mb-3">Your choice is very important for us!</h2>
        <stepper></stepper>
      </v-container>
    </v-content>
     <customer-footer></customer-footer>
  </v-app>
</template>

<script>
  import footer from './election/footer';
  import header from './election/header';
  import stepper from './election/stepper';
  export default {
    name: 'Election',
    components: {
      'customer-footer': footer,
      'customer-header': header,
      'stepper': stepper
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
