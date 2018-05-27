<template>
  <div class="admin">
    <!-- <admin-nav></admin-nav> -->
    <h2>{{msg}}</h2>
    <!-- <router-link to="/">Link to Election</router-link> -->
  </div>
</template>

<script>
import admin_nav from './admin/admin_nav';

export default {
  name: 'Admin',
  components: {
    "admin-nav": admin_nav
  },
  data () {
    return {
      msg: 'Hi, this is and Admin page'
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