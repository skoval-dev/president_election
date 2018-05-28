<template>
    <b-row class="justify-content-md-center" align-v="center">
        <form class="login" @submit.prevent="login">
            <h1>Login</h1>
            <label class="col-form-label">Email</label>
            <input class="form-control" required v-model="form.email" type="text" placeholder="example@mail.com"/>
            <label class="col-form-label">Password</label>
            <input class="form-control" required v-model="form.password" type="password" placeholder="Password"/>
            <hr/>
            <div class="justify-content-md-center">
                <button type="submit" class="btn btn-light" align-h="center">Login</button>
                <span>OR</span>
                <button type="button" class="btn btn-light" @click.prevent="transfer('signup')" align-h="center">Sign Up</button>
            </div>
        </form>
    </b-row>
</template>

<script>
export default {
  name: "login",
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
    login: function () {
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
            this.$router.push('/admin')
        })
    },
    transfer: function(route){
        this.$router.push('/'+route);
    }
  }
};
</script>