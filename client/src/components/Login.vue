<template>
    <b-row class="justify-content-md-center" align-v="center">
        <form class="login" id="login" @submit.prevent="login">
            <h1>Login</h1>
            <label class="col-form-label">Email</label>
            <input class="form-control" required v-model="form.email" type="text" placeholder="example@mail.com"/>
            <label class="col-form-label">Password</label>
            <input class="form-control" required v-model="form.password" type="password" placeholder="Password"/>
            <hr/>
            <b-alert variant="danger"
                dismissible
                :show="Boolean(error.message)"
                @dismissed="error.message=false">
                {{error.message}}
            </b-alert>
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
  data() {
      return {
          form :{
                password: '',
                email: ''
            },
            error: {
                message: ''
            }
        }
  },
  methods: {
    login: function () {
        const { email, password } = this.form
        this.$store.dispatch('AUTH_REQUEST', this.form).then(() => {
            this.$router.push('/admin')
        }).catch((e) => {
            if(e.response){
                this.error.message = e.response.data.message;
            } else  {
                this.error.message = e.message;
            } 
        })
    },
    transfer: function(route){
        this.$router.push('/'+route);
    }
  }
};
</script>