<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Create Election</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{form_title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="edited_item.election_name" label="Election Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                  <v-menu
                    ref="start_date"
                    :close-on-content-click="false"
                    v-model="start_date"
                    :nudge-right="40"
                    :return-value.sync="edited_item.start_date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="edited_item.start_date"
                      label="Start Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="edited_item.start_date" @input="$refs.start_date.save(edited_item.start_date)"></v-date-picker>
                  </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                    ref="end_date"
                    :close-on-content-click="false"
                    v-model="end_date"
                    :nudge-right="40"
                    :return-value.sync="edited_item.end_date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="edited_item.end_date"
                      label="End Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="edited_item.end_date" @input="$refs.end_date.save(edited_item.end_date)"></v-date-picker>
                  </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="states"
                  v-model="edited_item.state"
                  label="State"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="edited_item.electorate_count" label="Electorate Count"></v-text-field>
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
    <v-data-table :headers="headers" :items="elections" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item._id }}</td>
        <td class="text-xs-right">{{ props.item.election_name }}</td>
        <td class="text-xs-right">{{ props.item.start_date }}</td>
        <td class="text-xs-right">{{ props.item.end_date }}</td>
        <td class="text-xs-right">{{ props.item.state }}</td>
        <td class="text-xs-right">{{ props.item.electorate_count }}</td>
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
      start_date: false,
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
          text: 'Election Name',
          value: 'election_name'
        },
        {
          text: 'Start Date',
          value: 'start_date'
        },
        {
          text: 'End Date',
          value: 'end_date'
        },
        {
          text: 'State',
          value: 'state'
        },
        {
          text: 'Electorate Count',
          value: 'electorate_count'
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      elections: [],
      editedIndex: -1,
      edited_item: {
        election_name: '',
        start_date: '',
        end_date: '',
        state: 0,
        electorate_count: 0
      },
      defaultItem: {
        election_name: '',
        start_date: '',
        end_date: '',
        state: '',
        electorate_count: ''
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
        this.elections = [{
          _id: '5b0aa60f1aac413fb0dc69ed',
          election_name: 'Ukraine Election 2018',
          start_date: '2018-06-12',
          end_date: '2018-06-15',
          state: 'closed',
          electorate_count: '23000000'
        }]
      },

      editItem(item) {
        this.editedIndex = this.elections.indexOf(item)
        this.edited_item = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.elections.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.elections.splice(index, 1)
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
          Object.assign(this.elections[this.editedIndex], this.edited_item)
        } else {
          this.elections.push(this.edited_item)
        }
        this.close()
      }
    }
  }

</script>
