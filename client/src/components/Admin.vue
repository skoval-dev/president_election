<template>
  <b-container class="admin bv-example-row bv-example-row-flex-cols">
    <b-row class="mb-3">
        <b-col sm></b-col>
         <b-col sm="12"  align-h="center">
          <admin-nav align-h="center"></admin-nav>
        </b-col>
        <b-col sm></b-col>
    </b-row>
    <hr/>
    <b-row>
        <b-col sm="12"  align-h="center">
          <router-view></router-view>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '../services/UserService'
import admin_nav from './admin/admin_nav';

export default {
  name: 'Admin',
  components: {
    "admin-nav": admin_nav,
  },
  data () {
    return {
      msg: 'Hi, this is and Admin page',
      auth: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>