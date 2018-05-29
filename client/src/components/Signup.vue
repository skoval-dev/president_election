<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign Up</v-toolbar-title>
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
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                  <v-text-field 
                    v-model="repeat_password" 
                    :append-icon="show_second_pass ? 'visibility' : 'visibility_off'" 
                    :append-icon-cb="() => (show_second_pass = !show_second_pass)"
                    :counter="8"
                    :type="show_second_pass ? 'password' : 'text'"
                    :error-messages="second_password_errors" 
                    name="repeat_password" 
                    prepend-icon="lock" 
                    label="Repeat your password"
                    hint="Password should match" 
                    @input="$v.repeat_password.$touch()"
                    @blur="$v.repeat_password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-alert v-model="error.show" type="error" dismissible>
                {{error.message}}
              </v-alert>
              <v-card-actions>
                <v-spacer><v-spacer><v-btn outline @click="transfer('login')" color="indigo"><v-icon dark left>arrow_back</v-icon>Back to login</v-btn></v-spacer></v-spacer>
                <v-btn  color="primary" @click="submit">Sign Up</v-btn>
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
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data: () => ({
      email: '',
      password: '',
      repeat_password: '',
      show_pass: true,
      show_second_pass: true,
      error: {
        show: false,
        message: ''
      }
    }),
    validations: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      repeat_password: { sameAsPassword: sameAs('password') }
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
      },
      second_password_errors () {
        const errors = []
        if (!this.$v.repeat_password.$dirty) return errors
        !this.$v.repeat_password.sameAsPassword && errors.push('Passwords must be identical.')
        return errors
      }
    },
    methods: {
      submit: function () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }
        const payload = {
          email: this.email,
          password: this.password,
          password_again: this.repeat_password
        }
          
        this.$store.dispatch('SIGNUP_REQUEST', payload).then(() => {
            this.$router.push('/admin')
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
