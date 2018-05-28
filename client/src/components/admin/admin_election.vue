<template>
  <div class="election">
    <h1>Manage Election</h1>
    <hr/>
    <b-container id="create-election" class="admin bv-example-row bv-example-row-flex-cols">
      <b-row class="mb-3">
      <b-col sm="2" style="border-right: 1px solid #333;">
          <button class="btn btn secondary mb-3" @click="toggle_form">Create Election</button>
          <button class="btn btn secondary mb-3" @click="show_list">Election List</button>
      </b-col>
      <b-col sm="5" offset-sm="2"  align-h="center">
          <b-form v-if="show_form" align-h="center">
            <b-form-group id="name"
                          label="Election Name"
                          label-for="name">
              <b-form-input id="name"
                            type="text"
                            v-model="form.name"
                            required
                            placeholder="Enter election name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="start_date"
                          label="Start Date:"
                          label-for="start_date">
              <b-form-input id="start_date"
                            type="date"
                            v-model="form.start_date"
                            required>
              </b-form-input>
            </b-form-group>
            <b-form-group id="end_date"
                          label="End Date:"
                          label-for="end_date">
              <b-form-input id="end_date"
                            type="date"
                            v-model="form.end_date"
                            required>
              </b-form-input>
            </b-form-group>
            <b-form-group id="state"
                          label="State:"
                          label-for="state">
              <b-form-select id="state"
                            :options="form.state.options"
                            required
                            v-model="form.state.selected">
              </b-form-select>
            </b-form-group>
            <b-form-group id="electorate_count"
                          label="Electorates Count:"
                          label-for="electorate_count">
              <b-form-input id="electorate_count"
                            type="number"
                            required
                            v-model="form.electorate_count">
              </b-form-input>
            </b-form-group>
            <b-button type="button" @click="create" variant="primary">Save</b-button>
          </b-form>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
module.exports = {
  name: "admin-election",
  data () {
    return {
      form: {
        start_date: new Date(),
        name: '',
        end_date: new Date(),
        electorate_count: 0,
        state: {
          selected:null,
          options: [
            { text: 'Select One', value: null},
            'Open', 'Closed', 'Finished'
          ]
        }
      },
      show_form: true
    }
  },
  methods: {
    toggle_form(){
      this.show_form = !this.show_form;
    },
    show_list(){
      this.show_form = !this.show_form;
    },
    create (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>