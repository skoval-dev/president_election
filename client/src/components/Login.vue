<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <form class="login" id="login" @submit.prevent="login">
                <b-input-group class="mb-3">
                  <input type="text" class="form-control" required placeholder="Email" v-model="form.email">
                </b-input-group>
                <b-input-group class="mb-4">
                  <input type="password" class="form-control" required v-model="form.password" placeholder="Password">
                </b-input-group>
                <b-row>
                  <b-col cols="12">
                    <b-alert variant="danger"
                        dismissible
                        :show="Boolean(error.message)"
                        @dismissed="error.message=false">
                        {{error.message}}
                    </b-alert>
                    <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                  </b-col>
                </b-row>
                </form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" @click.prevent="transfer('signup')" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
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
            this.$router.push('/admin/election')
            console.log('Check login')
        }).catch((e) => {
          console.log(e);
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