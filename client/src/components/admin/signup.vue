<template>
  <b-row class="justify-content-md-center" align-v="center">
    <b-form @submit="onSubmit" v-if="auth_show">
        <b-row align-h="center">
            <b-form-text><h1>Sign Up</h1></b-form-text>
        </b-row>
      <b-form-group id="login_email"
                    label-size="sm"
                    label="Email:"
                    label-for="login_email">
        <b-form-input id="login_email"
                      type="email"
                      size="sm"
                      v-model="form.email"
                      required
                      placeholder="exampl@mail.com">
        </b-form-input>
      </b-form-group>
      <b-form-group id="login_password"
                    label="Password:"
                    label-size="sm"
                    label-for="login_password">
        <b-form-input id="login_password"
                      type="password"
                      v-model="form.password"
                      size="sm"
                      required
                      placeholder="*****">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn btn-light">Submit</b-button>
      <b-button type="button" class="btn btn-light" @click="back_to_login">Back to login</b-button>
    </b-form>
  </b-row>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      auth_show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    back_to_login(evt) {
      return this.$store.commit('show_signup', false)
    }
  }
};
</script>