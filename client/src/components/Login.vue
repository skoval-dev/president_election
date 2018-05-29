<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field 
                  v-model="email" 
                  prepend-icon="person" 
                  name="Email" 
                  label="Email" 
                  type="email"
                  :error-messages="email_errors"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field 
                    v-model="password" 
                    :append-icon="show_pass ? 'visibility' : 'visibility_off'" 
                    :append-icon-cb="() => (show_pass = !show_pass)"
                    :counter="8"
                    :type="show_pass ? 'password' : 'text'"
                    :error-messages="password_errors" 
                    name="password" 
                    prepend-icon="lock" 
                    label="Enter your password"
                    hint="At least 8 characters" 
                    min="8" 
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-alert v-model="error.show" type="error" dismissible>
                {{error.message}}
              </v-alert>
              <v-card-actions>
                <v-spacer><v-btn outline @click="transfer('signup')" color="indigo">Sign Up</v-btn></v-spacer>
                <v-btn  color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data: () => ({
      email: '',
      password: '',
      show_pass: true,
      error: {
        show: false,
        message: ''
      }
    }),
    validations: {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    },
     computed: {
      password_errors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
        !this.$v.password.required && errors.push('Password is required')
        return errors
      },
      email_errors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },
    methods: {
      submit: function () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }
        const payload = {email: this.email, password:this.password};
        this.$store.dispatch('AUTH_REQUEST', payload).then(() => {
          this.$router.push('/admin/election');
        }).catch((e) => {
          this.error.show = true;
          if (e.response) {
            this.error.message = e.response.data.message;
          } else {
            this.error.message = e.message;
          }
        })
      },
      transfer: function (route) {
        this.$router.push('/' + route);
      }
    }
  }

</script>
