
<template>
    <login v-if="auth.login_show"></login>
    <signup v-else-if="auth.signup_show"></signup>
</template>


<script>
import login from './login';
import signup from './signup';
//import store from '../../store/store';

export default {
  name: 'auth',
  components: {
      login,
      signup
  },
  computed: {
    auth () {
      return this.$store.state.auth
    }
  }
}
</script>