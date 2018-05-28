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

<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Login</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" @click.prevent="transfer('login')" class="active mt-3">Back to Login</b-button>
                </div>
              </b-card-body>
            </b-card>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Register</h1>
                <p class="text-muted">Get access to dark side!</p>
                <form class="login" id="login" @submit.prevent="signup">
                <b-input-group class="mb-3">
                  <input type="text" class="form-control" required placeholder="Email" v-model="form.email">
                </b-input-group>
                <b-input-group class="mb-4">
                  <input type="password" class="form-control" required v-model="form.password" placeholder="Password">
                </b-input-group>
                 <b-input-group class="mb-4">
                  <input type="password" class="form-control" required v-model="form.password_again" placeholder="Repeat Password">
                </b-input-group>
                <b-row>
                  <b-col cols="12">
                    <b-alert variant="danger"
                        dismissible
                        :show="Boolean(error.message)"
                        @dismissed="error.message=false">
                        {{error.message}}
                    </b-alert>
                    <b-button type="submit" variant="primary" class="px-4">Sign Up</b-button>
                  </b-col>
                </b-row>
                </form>
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
                password_again: '',
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