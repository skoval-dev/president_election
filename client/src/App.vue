<template>
    <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
      }
    },
    created() {
      this.$store.dispatch('AUTH_CHECK_REQUEST').then().catch((e) => {
        console.log(JSON.stringify(e))
      });
    }
  }

</script>
