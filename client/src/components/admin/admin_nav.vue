<template>
    <b-nav pills>
        <b-nav-item to="/admin/election" active-class='active'>Election</b-nav-item>
        <b-nav-item to="/admin/candidate">Candidate</b-nav-item>
        <b-nav-item to="/admin/electorate">Electorate</b-nav-item>
        <b-col md="2" offset-md="6"><b-nav-item @click="logout">Logout</b-nav-item></b-col>
    </b-nav>
</template>
<script>
    export default {
        name: 'admin-nav',
        methods: {
            logout: function () {
                this.$store.dispatch('AUTH_LOGOUT').then(() => {
                    this.$router.push({path: '/login'})
                })
            }
        }
    }
</script>