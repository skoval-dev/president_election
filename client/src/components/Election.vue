<template>
  <v-app>
    <customer-header></customer-header>
    <v-content>
      <v-container v-if="!election_finished">
        <h1 class="text-xs-center">Welcome to Ukraine President Election</h1>
        <h2 class="text-xs-center mb-3">Your choice is very important for us!</h2>
        <stepper></stepper>
      </v-container>
    </v-content>
    <v-container v-if="election_finished">
      <h1 class="text-xs-center">Ukraine Election 2018 is finished</h1>
      <h3 class="text-xs-center">The winner of 2018's election is Donald Dak</h3>
      <h3 class="text-xs-center mb-5">You can see the election results on the chart below: </h3>
      <results></results>
    </v-container>
    <customer-footer></customer-footer>
  </v-app>
</template>

<script>
  import footer from './election/footer';
  import header from './election/header';
  import stepper from './election/stepper';
  import results from './election/results';
  export default {
    name: 'Election',
    components: {
      'customer-footer': footer,
      'customer-header': header,
      'stepper': stepper,
      'results': results
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        election_finished: localStorage.getItem("election_finished") == "true",
      }
    }
  }

</script>
