<template>
    <b-row class="justify-content-md-center" align-v="center">
        <form class="login" @submit.prevent="login">
            <h1>Sign Up</h1>
            <label>Email</label>
            <input required v-model="form.email" type="text" placeholder="example@mail.com"/>
            <label>Password</label>
            <input required v-model="form.password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Sign Up</button>
        </form>
    </b-row>
</template>

<script>
export default {
  name: "signup",
  components: {},
  computed: {
    form() { 
        return {
            password: '',
            email: ''
        }
    }
  },
  methods: {
    signup: function () {
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
            this.$router.push('/')
        })
    }
  }
};
</script>
