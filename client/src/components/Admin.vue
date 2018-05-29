<template>
  
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