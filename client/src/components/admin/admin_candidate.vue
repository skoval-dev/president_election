<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Create Candidate</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{form_title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="edited_item.full_name" label="Full Name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-menu
                    ref="birth_day"
                    :close-on-content-click="false"
                    v-model="birth_day"
                    :nudge-right="40"
                    :return-value.sync="edited_item.birth_day"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="edited_item.birth_day"
                      label="Birth Day"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="edited_item.birth_day" @input="$refs.birth_day.save(edited_item.birth_day)"></v-date-picker>
                  </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="edited_item.intro" label="Intro" multi-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="candidates" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item._id }}</td>
        <td class="text-xs-left">{{ props.item.full_name }}</td>
        <td class="text-xs-left">{{ props.item.birth_day }}</td>
        <td class="text-xs-left">{{ props.item.intro }}</td>
        <td class="text-xs-left">{{ props.item.votes_count }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      birth_day: false,
      end_date: false,
      states: [
        'open', 'closed', 'finished'
      ],
      headers: [{
          text: 'ID',
          align: 'left',
          value: '_id'
        },
        {
          text: 'Full Name',
          value: 'full_name'
        },
        {
          text: 'Birth Day',
          value: 'birth_day'
        },
        {
          text: 'Intro',
          value: 'intro'
        },
        {
          text: 'Votes Count',
          value: 'votes_count'
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      candidates: [],
      editedIndex: -1,
      edited_item: {
        full_name: '',
        birth_day: '',
        intro: ''
      },
      defaultItem: {
        full_name: '',
        birth_day: '',
        intro: ''
      }
    }),

    computed: {
      form_title() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        this.candidates = [{
          _id: '5b0aa1903bc3662f04cca8c6',
          full_name: 'Donald Dak',
          birth_day: '09-06-1934',
          intro: "Donald Duck is a cartoon character created in 1934 at Walt Disney Productions. Donald is an anthropomorphic white duck with a yellow-orange bill, legs, and feet. He typically wears a sailor shirt and cap with a bow tie. Donald is most famous for his semi-intelligible speech and his mischievous and temperamental personality. Along with his friend Mickey Mouse, Donald is one of the most popular Disney characters and was included in TV Guide's list of the 50 greatest cartoon characters of all time in 2002. He has appeared in more films than any other Disney character,[2] and is the most published comic book character in the world outside of the superhero genre.",
          _election: '5b0aa60f1aac413fb0dc69ed',
          votes_count: 2
        },
        {
          _id: '5b0aa6471aac413fb0dc69f3',
          full_name: 'Mikki Mouse',
          birth_day: '18-11-1928',
          intro: "Mickey Mouse is a funny animal cartoon character and the mascot of The Walt Disney Company. He was created by Walt Disney and Ub Iwerks at the Walt Disney Studios in 1928. An anthropomorphic mouse who typically wears red shorts, large yellow shoes, and white gloves, Mickey is one of the world's most recognizable characters.",
          _election: '5b0aa60f1aac413fb0dc69ed',
          votes_count: 1
        },
        {
          _id: '5b0aaae93930200c68a7cd35',
          full_name: 'Pistol Pete',
          birth_day: '12-02-1925',
          intro: "Pete (also called Peg-Leg Pete, Pistol Pete and Black Pete, among other names) is an anthropomorphic cartoon character created in 1925 by Walt Disney and Ub Iwerks. He is a character of The Walt Disney Company and often appears as a nemesis and the main antagonist in Mickey Mouse universe stories. He was originally an anthropomorphic bear but with the advent of Mickey Mouse in 1928, he was defined as a cat. Pete is the oldest continuing Disney character, having debuted three years before Mickey Mouse in the cartoon Alice Solves the Puzzle (1925).",
          _election: '5b0aa60f1aac413fb0dc69ed',
          votes_count: 1
        }
      ]},

      editItem(item) {
        this.editedIndex = this.candidates.indexOf(item)
        this.edited_item = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.candidates.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.candidates.splice(index, 1)
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.edited_item = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.candidates[this.editedIndex], this.edited_item)
        } else {
          this.candidates.push(this.edited_item)
        }
        this.close()
      }
    }
  }

</script>
