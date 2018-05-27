<template>
  <b-container class="admin bv-example-row bv-example-row-flex-cols">
      <b-row align-v="center" align-h="center" v-if="!auth" >
        <auth v-if="!auth"></auth>
      </b-row>
  </b-container>
</template>

<script>
import UserService from '../services/UserService'
import admin_nav from './admin/admin_nav';
import auth from './admin/auth';

export default {
  name: 'Admin',
  components: {
    "admin-nav": admin_nav,
    auth
  },
  data () {
    return {
      msg: 'Hi, this is and Admin page',
      auth: false
    }
  },

  created () {
    UserService.check(this.$store.state.auth.token)
      .then((response) => {
        if(!response.data.success){
          this.$store.commit('show_signup', false)
        }
      }).catch((e) => {
        console.log(e);
      })
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