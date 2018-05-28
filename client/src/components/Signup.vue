<template>
    <b-row class="justify-content-md-center" align-v="center">
        <form class="signup" id="login" @submit.prevent="signup">
            <h1>Sign Up</h1>
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
                <button type="submit" class="btn btn-light" align-h="center">Sign Up</button>
                <span>OR</span>
                <button type="button" class="btn btn-light" @click.prevent="transfer('login')" align-h="center">Back to Login</button>
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
    signup: function () {
        const { email, password } = this.form
        this.$store.dispatch('SIGNUP_REQUEST', this.form).then(() => {
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