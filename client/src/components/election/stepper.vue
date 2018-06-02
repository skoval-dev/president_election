<template>
  <v-container>
    <v-stepper v-model="step" vertical v-if="!voted">
      <v-stepper-step :complete="step > 1" step="1">
        <h4>Privacy and security</h4>
        <span>Read and accept</span>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card :flat=true>
          <v-card-title>
            <span class="headline">Please read below for VERY important information regarding the Election!</span>
          </v-card-title>
          <v-card-text class="scroll-text mb-3">Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet,
            dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin
            condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.
            Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque,
            vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus.
            Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus
            magna neque pellentesque, nulla vel erat. Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus
            gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit
            leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim
            tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime
            felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum,
            quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam
            leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum
            erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
            Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non.
            Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel.
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" :flat=true @click="accept('isDisabled')" v-if="isDisabled">Accept</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click.native="step = 2" :disabled=isDisabled>Continue</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="step > 2" step="2">
        <h4>Confirmation</h4>
        <span>Should use yor personal number</span>
      </v-stepper-step>
      <v-stepper-content step="2" xs3>
        <h2 v-if="form.confirm" style="color: #1E88E5">
          Thank you, for successful confirmation!
        </h2>
        <v-layout>
          <v-flex xs3>
            <form v-if="!form.confirm">
              <v-text-field v-model="form.elect_number" :error-messages="elect_number_errors" :counter="10" label="Confirmation Number"
                required @input="$v.form.elect_number.$touch()" @blur="$v.form.elect_number.$touch()"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn @click="submit" v-if="!form.confirm">Confirm</v-btn>
            </form>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click.native="step = 3" :disabled=isDisabled_2 v-if="form.confirm">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="step > 3" step="3">
        <h4>Candidates</h4>
        <span>Short information</span>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card :flat=true class="mb-5 lighten-1">
          <v-layout justify-center column>
            <v-expansion-panel popout>
              <v-expansion-panel-content v-for="(candidate, i) in candidates" :key="i" hide-actions>
                <v-layout slot="header" align-center row spacer>
                  <v-flex sm5 md3 hidden-xs-only>
                    <strong v-html="candidate.full_name"></strong>
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <strong>Birthday:</strong>
                    <span v-html="candidate.birthday"></span>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-card>
                  <v-divider></v-divider>
                  <v-card-text v-text="candidate.intro"></v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="step = 4">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-step step="4">
        <h4>Vote</h4>
        <span>You will not be able to re-vote.</span>
      </v-stepper-step>
      <v-stepper-content step="4">
        <h4>
          Please, choose one to whom you would like to cast your vote:
        </h4>
        <v-radio-group v-model="electorate_voice._id">
          <v-radio v-for="candidate in candidates" :key="candidate._id" :label="candidate.full_name" :value="candidate._id"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="add_vote" :disabled="!electorate_voice._id">Add vote</v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-layout slot="header" align-center row flex v-if="voted">
      <v-flex xs12>
        <v-card>
          <v-card-text class="text-xs-center">
            <h1>Thank you for your choice!</h1> 
            <h2>We are very proud of your conscious position.</h2>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    maxLength
  } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],
    validations: {
      form: {
        elect_number: {
          required,
          maxLength: maxLength(10)
        }
      }
    },
    data() {
      return {
        electorate_voice: {
          _id: "",
          full_name: ''
        },
        voted: localStorage.getItem("electorate_voice") ? true : false,
        step: 1,
        isDisabled: true,
        isDisabled_2: true,
        candidates: [{
            _id: '5b0aa1903bc3662f04cca8c6',
            full_name: 'Donald Dak',
            birthday: '09.06.1934',
            intro: "Donald Duck is a cartoon character created in 1934 at Walt Disney Productions. Donald is an anthropomorphic white duck with a yellow-orange bill, legs, and feet. He typically wears a sailor shirt and cap with a bow tie. Donald is most famous for his semi-intelligible speech and his mischievous and temperamental personality. Along with his friend Mickey Mouse, Donald is one of the most popular Disney characters and was included in TV Guide's list of the 50 greatest cartoon characters of all time in 2002. He has appeared in more films than any other Disney character,[2] and is the most published comic book character in the world outside of the superhero genre."
          },
          {
            _id: '5b0aa6471aac413fb0dc69f3',
            full_name: 'Mikki Mouse',
            birthday: '18.11.1928',
            intro: "Mickey Mouse is a funny animal cartoon character and the mascot of The Walt Disney Company. He was created by Walt Disney and Ub Iwerks at the Walt Disney Studios in 1928. An anthropomorphic mouse who typically wears red shorts, large yellow shoes, and white gloves, Mickey is one of the world's most recognizable characters."
          },
          {
            _id: '5b0aaae93930200c68a7cd35',
            full_name: 'Pistol Pete',
            birthday: '12.02.1925',
            intro: "Pete (also called Peg-Leg Pete, Pistol Pete and Black Pete, among other names) is an anthropomorphic cartoon character created in 1925 by Walt Disney and Ub Iwerks. He is a character of The Walt Disney Company and often appears as a nemesis and the main antagonist in Mickey Mouse universe stories. He was originally an anthropomorphic bear but with the advent of Mickey Mouse in 1928, he was defined as a cat. Pete is the oldest continuing Disney character, having debuted three years before Mickey Mouse in the cartoon Alice Solves the Puzzle (1925)."
          }
        ],
        form: {
          elect_number: '',
          confirm: false
        }
      }
    },
    computed: {
      elect_number_errors() {
        const errors = []
        if (!this.$v.form.elect_number.$dirty) return errors
        !this.$v.form.elect_number.required && errors.push(
          'You must confirm your availability to make a vote!');
        !this.$v.form.elect_number.maxLength && errors.push('Confirmation number must be at most 10 characters long')
        return errors
      }
    },
    methods: {
      submit() {
        this.form.confirm = true;
        this.isDisabled_2 = false;
        this.$v.$touch()
      },
      accept(name) {
        return this[name] = false;
      },
      add_vote() {
        if (this.electorate_voice._id) {
          localStorage.setItem("electorate_voice", this.electorate_voice._id)
          this.voted = true;
        }
      }
    }
  }

</script>

<style>
  .scroll-text {
    overflow-y: scroll;
    height: 200px;
  }

</style>
