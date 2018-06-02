<template>
  <v-data-table
    :headers="headers"
    :items="electorates"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item._id }}</td>
      <td class="text-xs-right">{{ props.item.voted }}</td>
      <td class="text-xs-right">{{ props.item._election }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'left',
            value: '_id'
          },
          { text: 'Voted', value: 'voted' },
          { text: 'Election', value: '_election'}
        ],
        electorates: [
          {
            _id: "5b0a8d2b210eaa30806b0a5b",
            voted: true,
            _election: "5b0a8d2b210eaa30806b0a5a"
          },
          {
            _id: "5b0a8d2b210eaa30806b0a5d",
            voted: false,
            _election: "5b0a8d2b210eaa30806b0a5a"
          },
          {
            _id: "5b0a8d2b210eaa30806b0a5e",
            voted: true,
            _election: "5b0a8d2b210eaa30806b0a5a"
          },
          {
            _id: "5b0a8d2b210eaa30806b0a5f",
            voted: false,
            _election: "5b0a8d2b210eaa30806b0a5a"
          },
          {
            _id: "5b0aa1101628fd1b50eed357",
            voted: false,
            _election: "5b0a8d2b210eaa30806b0a5a"
          },
          {
            _id: "5b0aa1101628fd1b50eed359",
            voted: true,
            _election: "5b0a8d2b210eaa30806b0a5a"
          }
        ]
      }
    }
  }
</script>
